export interface PlayerData {
    player: number;
    board: {
        card: string,
        x: number,
        y: number,
    }[];
    generals: {
        selected: boolean,
        choices: number[],
    },
    basicCount: number;
}