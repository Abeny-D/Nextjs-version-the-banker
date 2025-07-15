function getCardValue(card: string): number {
    const faceCardMap: { [key: string]: number } = { A: 1, J: 11, Q: 12, K: 13 };
    const match = card.match(/\d+|[JQKA]/); // directly on the string
    const value = match ? match[0] : '0';

    return faceCardMap[value] ?? parseInt(value);
}


export default getCardValue;