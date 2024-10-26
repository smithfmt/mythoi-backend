import { Attribute } from "./data/types";

export function shuffle(array:any[]) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const fillConnections = (array:any[]) => {
    while (array.length<4) {
        array.push("blank");
    }
    return array;
};

export const fillBlankAttribute = (index:number, costs:any[]) => {
    let res:Attribute;
    let clockwise = Math.random()>0.5;
    switch (index) {
        case 0:
            res = clockwise ? 
                costs[1] !== "blank" ? costs[1] : costs[3] !== "blank" ? costs[3] : costs[2]:
                costs[3] !== "blank" ? costs[3] : costs[1] !== "blank" ? costs[1] : costs[2];
            break;
        case 1:
            res = clockwise ? 
                costs[2] !== "blank" ? costs[2] : costs[0] !== "blank" ? costs[0] : costs[3]:
                costs[0] !== "blank" ? costs[0] : costs[2] !== "blank" ? costs[2] : costs[3];
            break;
        case 2:
            res = clockwise ? 
                costs[3] !== "blank" ? costs[3] : costs[1] !== "blank" ? costs[1] : costs[0]:
                costs[1] !== "blank" ? costs[1] : costs[3] !== "blank" ? costs[3] : costs[0];
            break;
        default:
            res = clockwise ? 
                costs[0] !== "blank" ? costs[0] : costs[2] !== "blank" ? costs[2] : costs[1]:
                costs[2] !== "blank" ? costs[2] : costs[0] !== "blank" ? costs[0] : costs[1];
            break;
    }
    return res;
};