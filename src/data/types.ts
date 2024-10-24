export type CardType = {
    id: number,
    type: "basic" | "general" | "hero" 
}

export interface PlayerData {
    player: number;
    board: {
        card: CardType,
        x: number,
        y: number,
    }[];
    hand: CardType[],
    generals: {
        selected: boolean,
        choices: number[],
    },
    basicCount: number;
}