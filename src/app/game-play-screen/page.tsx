"use client"

import {useState} from "react";
import getCardValue from "@/component/get-card-value";
import {createDeck, shuffleDeck} from "@/component/create-shufle-card";
import DeckContainer from "@/component/deck-container";
import {motion} from "motion/react";


function GameFlow() {

    const [players, setPlayers] = useState<{
        id: number;
        name: string;
        hand: (string | undefined)[];
        bet: number;
    }[]>
    ([]);

    const [randomCard, setRandomCard] = useState<null | string>(null);
    const [wonLossStatus, setWonLossStatus] = useState("Waiting for status");
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [bankAmount, setBankAmount] = useState(1000);
    const [currentBet, setCurrentBet] = useState(50);
    const [roundTurn, setRoundTurn] = useState(0);
    const [randomCardAnimation, setRandomCardAnimation] = useState(false);


    function createPlayers(players: string[]) {
        const deck = shuffleDeck(createDeck());
        const newPlayers = [];

        for (let i = 0; i < 4; i++) {
            const name = players[i];
            const hand = [deck.pop(), deck.pop()];
            const coins = 500;
            newPlayers.push({id: i, name: name, hand: hand, bet: coins});
        }

        // return newPlayers;

        setPlayers(newPlayers);

    }

    function handleStartGame() {

        const playerNameInput: string[] = [];

        while (playerNameInput.length < 4) {
            const newPlayerName = prompt(`Please enter player ${playerNameInput.length + 1}`)

            if (newPlayerName === null) {
                break;
            }

            if (!newPlayerName?.trim()) {
                continue;
            }

            playerNameInput.push(newPlayerName);
        }

        if (playerNameInput.length < 4) {
            return;
        }

        createPlayers(playerNameInput);
        setCurrentPlayerIndex(0);
        setWonLossStatus("Game started!");
        setRandomCard(null);
        setBankAmount(1000);
        setCurrentBet(50);
        setRoundTurn(0);
    }

    function shufflePlayersCards() {
        if (players.length === 0) return;
        const deck = shuffleDeck(createDeck());
        const updatedPlayers = players.map((player) => ({
            ...player,
            hand: [deck.pop(), deck.pop()],
        }));
        setPlayers(updatedPlayers);
        setRandomCard((prev) => prev || null);
        setWonLossStatus("All players received new cards!");
    }

    function nextTurn() {
        const nextIndex = (currentPlayerIndex + 1) % players.length;
        const newRoundTurn = roundTurn + 1;

        setCurrentPlayerIndex(nextIndex);
        setRoundTurn(newRoundTurn);

        if (newRoundTurn % players.length === 0) {
            // A full round completed
            shufflePlayersCards();
        }
    }

    function bet() {
        if (players.length === 0 || currentBet <= 0) return;

        const updatedPlayers = [...players];
        const currentPlayer = updatedPlayers[currentPlayerIndex];

        const playersBets: { idx: number; betAmount: number; hand: (string | undefined)[] }[] = [];

        playersBets.push({
            idx: currentPlayerIndex,
            betAmount: currentBet,
            hand: currentPlayer.hand,
        });

        let tempBankAmount = bankAmount - currentBet;
        let nxtPlayerIndex = currentPlayerIndex + 1;

        while (nxtPlayerIndex < players.length && tempBankAmount > 0) {
            const nextPlayerBet = prompt(
                `Enter your bet amount Player ${nxtPlayerIndex + 1} (${players[nxtPlayerIndex]?.name})`
            );

            // Guard against null or non-numeric input
            if (nextPlayerBet === null) {
                nxtPlayerIndex += 1;
                continue;
            }

            const betInput = Number(nextPlayerBet);

            if (isNaN(betInput)) {
                alert("Please enter a number only");
                continue;
            }

            const currentPlayer = players[nxtPlayerIndex];

            if (betInput > currentPlayer.bet) {
                setWonLossStatus(`${currentPlayer.name} tried to bet more than they have.`);
                continue;
            }

            if (betInput > tempBankAmount) {
                setWonLossStatus(`Bank doesn't have enough coins. Max allowed: ${tempBankAmount}`);
                continue;
            }

            playersBets.push({
                idx: nxtPlayerIndex,
                betAmount: betInput,
                hand: currentPlayer.hand,
            });

            nxtPlayerIndex += 1;
            tempBankAmount -= 0;
        }

// 🔄 Draw a card safely
        const deck: string[] = shuffleDeck(createDeck());
        const card: string | undefined = deck.pop();

        if (card !== undefined) {
            setRandomCard(card);
        }

// 💥 GUARD AGAINST undefined BEFORE accessing card values
        const [card1, card2] = currentPlayer.hand ?? [];

        if (card && card1 && card2) {
            const val1 = getCardValue(card1);
            const val2 = getCardValue(card2);
            const valRand = getCardValue(card);

            const isBetween =
                (valRand > val1 && valRand < val2) || (valRand < val1 && valRand > val2);

            let tempBank2 = bankAmount;
            let tempPlayers = [...players];

            playersBets.forEach((bets) => {
                if (isBetween) {
                    tempPlayers = tempPlayers.map((prev) => {
                        if (prev.id === bets.idx) {
                            return {
                                ...prev,
                                bet: prev.bet + bets.betAmount,
                            };
                        }
                        return prev;
                    });

                    tempBank2 -= bets.betAmount;
                } else {
                    tempPlayers = tempPlayers.map((prev) => {
                        if (prev.id === bets.idx) {
                            return {
                                ...prev,
                                bet: prev.bet - bets.betAmount,
                            };
                        }
                        return prev;
                    });

                    tempBank2 += bets.betAmount;
                }
            });

            setBankAmount(tempBank2);
            setPlayers(tempPlayers);
            setRandomCardAnimation(!randomCardAnimation);

            setTimeout(() => {
                setRandomCardAnimation(false);
                setRandomCard(null)
            }, 2000);

            setTimeout(() => {
                nextTurn();
            }, 2000);
        }

        setCurrentBet(50);
    }

    function passTurn() {
        if (players.length === 0) return;
        setWonLossStatus(`${players[currentPlayerIndex].name} passed their turn.`);
        nextTurn();
        setRandomCard(null);
    }

    return (
        <div className=" " >
            <h2>The Banker 💰</h2>
            <div>
                <button onClick={handleStartGame}>Start New Game</button>
                <button onClick={shufflePlayersCards} disabled={players.length === 0}>
                    Shuffle Cards
                </button>
                <h3>Bank: {bankAmount} 💰</h3>
            </div>

            <div style={{display: players.length === 0 ? "none" : "flex"}}>
                <h3>Random Card: <motion.div drag animate={{
                    y: randomCardAnimation ? 120 : 0,
                    x: randomCardAnimation ? 400 : 0,
                    rotate: randomCardAnimation ? 360 : 0,
                    scale: randomCardAnimation ? 3.5 : 1
                }}>

                    <DeckContainer hand={randomCard || ""}/>

                </motion.div></h3>

                <h3>Status: {wonLossStatus}</h3>
            </div>

            {
                players.length === 0 ? (
                    <div>
                        <h1>
                            please start the game
                        </h1>
                    </div>
                ) : (
                    <div className="grid grid-cols-4">
                        {players.map((player, index) => (
                            <div
                                key={index}
                                id="playerDetails"
                                className={index === currentPlayerIndex ? "activePlayer" : ""}
                            >
                                <h3>👤 {player.name}</h3>
                                <div className={index === currentPlayerIndex ? "" : "MakeTheCardBlurry"}>
                                    <DeckContainer hand={player.hand[0] ?? ""}></DeckContainer></div>
                                <p className={index === currentPlayerIndex ? "" : "MakeTheCardBlurry"}>
                                    <DeckContainer hand={player.hand[1] ?? ""}></DeckContainer></p>
                                <p> Coins:💸 {player.bet}</p>
                            </div>
                        ))}

                        <div>
                            <label>
                                Enter Bet Amount:
                                <input
                                    type="number"
                                    min="1"
                                    max={Math.min(players[currentPlayerIndex]?.bet || 1, bankAmount)}
                                    value={currentBet}
                                    onChange={(e) => setCurrentBet(Number(e.target.value))}
                                    disabled={players.length === 0}
                                />
                            </label>
                            <button className="bg-white p-2 rounded-xl" onClick={bet} disabled={players.length === 0 || currentBet <= 0}>
                                Bet
                            </button>
                        </div>

                        <div>
                            <h3>🎯 Turn: {players[currentPlayerIndex]?.name || "None"}</h3>
                            <button onClick={passTurn} disabled={players.length === 0} >
                                Pass
                            </button>
                        </div>
                    </div>
                )
            }
        </div>

    );
}

export default GameFlow;
