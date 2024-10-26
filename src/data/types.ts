import { cards } from "./cards"

export type CardType = {
    id: number,
    type: keyof typeof cards,
}

export interface PlayerData {
    player: number;
    board: {
        card: PopulatedCardData,
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

export type CardData = {
    id: number;
    img: string;
    name: string;
    atk: number;
    hp: number;
    connect: number;
    red: number;
    green: number;
    blue: number;
    type: string;
    ability: string;
    style: string;
    cost: number;
    desc: string;
};
  
export type CardsObject = {
    [key in 'basic' | 'general' | 'hero']: {
        [key: number]: CardData;
    };
};

export type Attribute = "Str" | "Int" | "Agi" | "Mon" | "Div";

export type PopulatedCardData = {
    id: number;
    img: string;
    name: string;
    atk: number;
    hp: number;
    sides: {
        top: {
            connect: boolean;
            attribute: Attribute;
        };
        right: {
            connect: boolean;
            attribute: Attribute;
        };
        bottom: {
            connect: boolean;
            attribute: Attribute;
        };
        left: {
            connect: boolean;
            attribute: Attribute;
        };
    };
    type: string;
    ability: string;
    style: string;
    cost: Attribute[];
    desc: string;
}