type PlayerData = {
    player: string,
    general: string,
    board : {
        card: string,
        x: number,
        y: number,
    }[],
    basicCount: number,
};