import '@/style/deck-container.css';
import * as React from "react";
import CardBack from '@@/public/card-back-red.png'
import Image from "next/image";


type cardInput = {
    hand: string;
}
function DeckContainer(props: cardInput) {

    const number :string = props.hand.slice(0, -1);
    const suit :string = props.hand.slice(-1);
    const isFacedown :boolean = !props.hand;


    if (isFacedown) {

        return (
            <div className="DeckContainer">
                <Image src={CardBack}  alt="Card Back" className="backImg"/>
            </div>
        )
    }



    return (
        <>
            <div className="DeckContainer">
                <p className="cardTop">{number}</p>
                <p className="cardMiddel">{suit}</p>
                <p className="cardBottom">{number}</p>
            </div>
        </>
    )
}

export default DeckContainer
