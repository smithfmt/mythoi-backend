import { generals } from "../data/cards";

export const generatePlayerGenerals = (totalPlayers: number) => {
    const shuffledGenerals = generals.map(g => g.id).sort(() => 0.5 - Math.random());
    const generalsPerPlayer = Math.min(3, Math.floor(generals.length / totalPlayers));
    let playerGenerals: number[][] = [];
    for (let i=0; i<totalPlayers; i++) {
        playerGenerals.push(shuffledGenerals.splice(0,generalsPerPlayer));
    }
    return playerGenerals;
};