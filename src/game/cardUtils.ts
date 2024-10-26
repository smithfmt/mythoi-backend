import { cards } from "../data/cards";
import { Attribute, CardType, PopulatedCardData } from "../data/types";
import { fillBlankAttribute, fillConnections, shuffle } from "../utils";

export const generateCard = (card:CardType) => {
    const { id, type:cardType } = card;
    const { img, name, atk, hp, connect, red, green, blue, ability, style, cost, desc, type } = cards[cardType][id];
    
    let attributes:Attribute[] = [];
    switch (type) {
        case "monster":
            for (let i=0;i<4;i++) {
                attributes.push("Div");
            }
            break;
        case "god":
            for (let i=0;i<5;i++) {
                attributes.push("Div");
            }
            break;
        default:
            for (let i=0;i<red;i++) {
                attributes.push("Str");
            }
            for (let i=0;i<green;i++) {
                attributes.push("Agi");
            }
            for (let i=0;i<blue;i++) {
                attributes.push("Int");
            }
            break;
    };
    const shuffledAttributes = shuffle(attributes);
    const costs:Attribute[] = shuffledAttributes.slice(0,cost);
    const connections = shuffledAttributes.length>4?shuffledAttributes.slice(0,4):shuffledAttributes.length<4? shuffle(fillConnections(shuffledAttributes)): shuffledAttributes
    const sides = {
        top: {
            connect: connections[0]!=="blank",
            attribute: connections[0]!=="blank"?connections[0]:fillBlankAttribute(0,shuffledAttributes),
        },
        right: {
            connect: connections[1]!=="blank",
            attribute: connections[1]!=="blank"?connections[1]:fillBlankAttribute(1,shuffledAttributes),
        },
        bottom: {
            connect: connections[2]!=="blank",
            attribute: connections[2]!=="blank"?connections[2]:fillBlankAttribute(2,shuffledAttributes),
        },
        left: {
            connect: connections[3]!=="blank",
            attribute: connections[3]!=="blank"?connections[3]:fillBlankAttribute(3,shuffledAttributes),
        }
    };

    const populatedCard: PopulatedCardData = {
        id, img, name, atk, hp, ability, style, desc, type,
        sides, cost: costs,
    };
    return populatedCard;
};