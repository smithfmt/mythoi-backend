import { CardsObject } from "./types";

export const cards: CardsObject = {
    basic: {
        1: { id: 1, weight: 4, img : ["Warrior 1","Warrior 2","Warrior 3","Warrior 4","Warrior 5"], name : "Warrior", atk : 2, hp : 2, connect : 2, red : 0, green : 0, blue : 0, type : "basic", ability : "Soldier", style : "Passive", cost : 0, desc : "A brave soldier for your army",},
        2: { id: 2, weight: 3, img : ["Archer 1","Archer 2","Archer 3","Archer 4"], name : "Archer", atk : 2, hp : 1, connect : 2, red : 0, green : 0, blue : 0, type : "basic", ability : "Ranged", style : "Passive", cost : 0, desc : "All attacks are ranged",},
        3: { id: 3, weight: 3, img : ["Horseman 1","Horseman 2","Horseman 3","Horseman 4"], name : "Horseman", atk : 3, hp : 2, connect : 2, red : 0, green : 0, blue : 0, type : "basic", ability : "Charge", style : "Bolt", cost : 0, desc : "Can always attack first",},
        4: { id: 4, weight: 2, img : ["Helmet 1", "Helmet 2"], name : "Helmet", atk : 0, hp : 0, connect : 1, red : 0, green : 0, blue : 0, type : "basic", ability : "Equipment", style : "Passive", cost : 0, desc : "A trusty helmet",},
        5: { id: 5, weight: 2, img : ["Shield 1", "Shield 2"], name : "Shield", atk : 0, hp : 0, connect : 1, red : 0, green : 0, blue : 0, type : "basic", ability : "Equipment", style : "Passive", cost : 0, desc : "A tough shield",},
        6: { id: 6, weight: 2, img : ["Sword 1", "Sword 2"], name : "Sword", atk : 0, hp : 0, connect : 1, red : 0, green : 0, blue : 0, type : "basic", ability : "Equipment", style : "Passive", cost : 0, desc : "A sharp sword",},
    },
    hero: {
        1: { id: 1, img : "Heracles", name : "Heracles", atk : 6, hp : 9, connect : 4, red : 3, green : 1, blue : 0, type : "hero", ability : "Strength of the Gods", style : "Bolt", cost : 3, desc : "Deal +3 dmg on first attack",},
        2: { id: 2, img : "Perseus", name : "Perseus", atk : 4, hp : 8, connect : 4, red : 1, green : 2, blue : 1, type : "hero", ability : "Medusa's Gaze", style : "Bolt", cost : 3, desc : "Stun 2 Enemies",},
        3: { id: 3, img : "Achilles", name : "Achilles", atk : 5, hp : 9, connect : 4, red : 4, green : 0, blue : 0, type : "hero", ability : "Quelling Blade", style : "Passive", cost : 3, desc : "Deal +2 dmg against units who have lost hp",},
        4: { id: 4, img : "Jason", name : "Jason", atk : 3, hp : 5, connect : 4, red : 1, green : 1, blue : 2, type : "hero", ability : "Heroic Connections", style : "Passive", cost : 3, desc : "Heroes cost 1 less card to recruit",},
        5: { id: 5, img : "Odysseus", name : "Odysseus", atk : 4, hp : 8, connect : 4, red : 0, green : 1, blue : 3, type : "hero", ability : "Set Trap", style : "Bolt", cost : 3, desc : "Stun or deal 2 dmg to an enemy or swap 2 enemy cards",},
        6: { id: 6, img : "Diomedes", name : "Diomedes", atk : 5, hp : 8, connect : 4, red : 2, green : 2, blue : 0, type : "hero", ability : "Battle Hunger", style : "Passive", cost : 3, desc : "Diomedes takes -1 dmg from non heroes",},
        7: { id: 7, img : "Ajax", name : "Ajax", atk : 5, hp : 10, connect : 4, red : 3, green : 1, blue : 0, type : "hero", ability : "Bulwark", style : "Passive", cost : 3, desc : "Connected cards receive one less dmg when attacked",},
        8: { id: 8, img : "Minos", name : "Minos", atk : 3, hp : 6, connect : 3, red : 3, green : 0, blue : 0, type : "hero", ability : "Royal Hatred", style : "Passive", cost : 2, desc : "Deal +2 dmg to blue cards",},
        9: { id: 9, img : "Nestor", name : "Nestor", atk : 2, hp : 7, connect : 3, red : 0, green : 0, blue : 3, type : "hero", ability : "Age-old Wisdom", style : "Bolt", cost : 2, desc : "Switch 2 enemy cards and heal 2 dmg on an ally",},
        10: {id: 10,img : "Atalanta", name : "Atalanta", atk : 4, hp : 4, connect : 3, red : 0, green : 3, blue : 0, type : "hero", ability : "Swift-footed Archer", style : "Passive", cost : 2, desc : "Attacks are ranged and can always attack first",},
        11: {id: 11,img : "Medea", name : "Medea", atk : 1, hp : 5, connect : 3, red : 1, green : 0, blue : 2, type : "hero", ability : "Nullify", style : "Bolt", cost : 2, desc : "Stun an enemy and deal 2 dmg",},
        12: {id: 12,img : "Ariadne", name : "Ariadne", atk : 1, hp : 4, connect : 2, red : 0, green : 1, blue : 1, type : "hero", ability : "Loyal Companion", style : "Bolt", cost : 1, desc : "Can heal two dmg on an ally",},
        13: {id: 13,img : "Hippolyta", name : "Hippolyta", atk : 5, hp : 5, connect : 4, red : 0, green : 4, blue : 0, type : "hero", ability : "Master Huntress", style : "Passive", cost : 3, desc : "Attacks are ranged and deal +1 dmg",},
        14: {id: 14,img : "Penelope", name : "Penelope", atk : 1, hp : 4, connect : 2, red : 0, green : 0, blue : 2, type : "hero", ability : "Faithful", style : "Bolt", cost : 1, desc : "Can heal two dmg on an ally",},
        15: {id: 15,img : "Meleager", name : "Meleager", atk : 4, hp : 5, connect : 3, red : 2, green : 1, blue : 0, type : "hero", ability : "Hunter's Instinct", style : "Passive", cost : 2, desc : "Takes -1 dmg from units with less attack than him",},
        16: {id: 16,img : "Bellerophon", name : "Bellerophon", atk : 4, hp : 4, connect : 3, red : 1, green : 2, blue : 0, type : "hero", ability : "Monster Hunter", style : "Passive", cost : 2, desc : "Immune to dmg from monsters",},
        17: {id: 17,img : "Daedalus", name : "Daedalus", atk : 1, hp : 4, connect : 3, red : 0, green : 0, blue : 3, type : "hero", ability : "Master Craftsman", style : "Bolt", cost : 2, desc : "Switch two enemy cards",},
        18: {id: 18,img : "Pandora", name : "Pandora", atk : 1, hp : 3, connect : 2, red : 0, green : 1, blue : 1, type : "hero", ability : "Chaotic Curiosity", style : "Bolt", cost : 1, desc : "Roll dice : if 3<X deal +X/2 dmg else take X dmg",},
        19: {id: 19,img : "Cassandra", name : "Cassandra", atk : 1, hp : 3, connect : 2, red : 0, green : 0, blue : 2, type : "hero", ability : "Cursed Prophecy", style : "Passive", cost : 1, desc : "Prevent an enemy ability, then die",},
        20: {id: 20,img : "Neoptolemus", name : "Neoptolemus", atk : 4, hp : 5, connect : 3, red : 3, green : 0, blue : 0, type : "hero", ability : "His Father's Rage", style : "Passive", cost : 2, desc : "Deal +2 dmg to blue cards",},
        21: {id: 21,img : "Clytemnestra", name : "Clytemnestra", atk : 2, hp : 3, connect : 2, red : 2, green : 0, blue : 0, type : "hero", ability : "Hero Slayer", style : "Passive", cost : 1, desc : "Deal +5 dmg to heroes",},
        22: {id: 22,img : "Orpheus", name : "Orpheus", atk : 1, hp : 4, connect : 2, red : 0, green : 1, blue : 1, type : "hero", ability : "Master of Music", style : "Bolt", cost : 1, desc : "Heal all units by one",},
        23: {id: 23,img : "Patroclus", name : "Patroclus", atk : 3, hp : 7, connect : 3, red : 2, green : 0, blue : 1, type : "hero", ability : "Brotherly Love", style : "Passive", cost : 2, desc : "Take dmg in place of another",},
        24: {id: 24,img : "Theseus", name : "Theseus", atk : 5, hp : 8, connect : 4, red : 1, green : 2, blue : 1, type : "hero", ability : "Liberator of Athens", style : "Passive", cost : 3, desc : "Reduces dmg from incoming attacks by 1",},
        25: {id: 25,img : "Alcibiades", name : "Alcibiades", atk : 3, hp : 2, connect : 2, red : 1, green : 0, blue : 1, type : "hero", ability : "Disloyal", style : "Passive", cost : 1, desc : "On first death transfer to the killer's team with 1 health",},
        26: {id: 26,img : "Hippolytus", name : "Hippolytus", atk : 2, hp : 4, connect : 2, red : 0, green : 2, blue : 0, type : "hero", ability : "Call of the Wild", style : "Passive", cost : 1, desc : "Monsters cost -1 card to recruit",},
        27: {id: 27,img : "Cecrops", name : "Cecrops", atk : 1, hp : 4, connect : 2, red : 0, green : 0, blue : 2, type : "hero", ability : "Experienced Ruler", style : "Bolt", cost : 2, desc : "Draw a basic card",},
        28: {id: 28,img : "Menelaus", name : "Menelaus", atk : 5, hp : 7, connect : 4, red : 3, green : 1, blue : 0, type : "hero", ability : "Duelist", style : "Bolt", cost : 3, desc : "Attack an enemy until one dies, take -1 dmg per attack",},
        29: {id: 29,img : "Helen", name : "Helen", atk : 1, hp : 5, connect : 3, red : 1, green : 1, blue : 1, type : "hero", ability : "Casus Belli", style : "Bolt", cost : 1, desc : "Place in the enemy army, all surrounding cards take +1 dmg",},
        30: {id: 30,img : "Brasidas", name : "Brasidas", atk : 3, hp : 6, connect : 3, red : 2, green : 0, blue : 1, type : "hero", ability : "Master Tactician", style : "Passive", cost : 2, desc : "You can rearrange your army at any point in a battle",},
        31: {id: 31,img : "Orestes", name : "Orestes", atk : 3, hp : 5, connect : 3, red : 3, green : 0, blue : 0, type : "hero", ability : "Vengeful", style : "Passive", cost : 2, desc : "Everytime Orestes is attacked, he deals x2 his attack back",},
        32: {id: 32,img : "Oedipus", name : "Oedipus", atk : 3, hp : 5, connect : 3, red : 0, green : 2, blue : 1, type : "hero", ability : "Ill-Fated", style : "Passive", cost : 2, desc : "Deal +2 dmg to red cards but -2 dmg to blue",},
        33: {id: 33,img : "Tiresias", name : "Tiresias", atk : 0, hp : 4, connect : 2, red : 0, green : 0, blue : 2, type : "hero", ability : "Foresight", style : "Passive", cost : 1, desc : "Prevent an enemy ability, then die",},
        34: {id: 34,img : "Hector", name : "Hector", atk : 5, hp : 8, connect : 4, red : 2, green : 1, blue : 1, type : "hero", ability : "Sweeping Attack", style : "Bolt", cost : 3, desc : "Deal 1 dmg to all connected cards, 2 if they are green",},
        35: {id: 35,img : "Paris", name : "Paris", atk : 4, hp : 5, connect : 3, red : 2, green : 1, blue : 0, type : "hero", ability : "Master Archer", style : "Passive", cost : 2, desc : "Attacks are ranged, deal +1 to red cards",},
        36: {id: 36,img : "Hecuba", name : "Hecuba", atk : 1, hp : 4, connect : 3, red : 0, green : 1, blue : 2, type : "hero", ability : "Royal Influence", style : "Bolt", cost : 2, desc : "Can heal 2 dmg on an ally",},
        37: {id: 37,img : "Peleus", name : "Peleus", atk : 3, hp : 4, connect : 3, red : 0, green : 2, blue : 1, type : "hero", ability : "Divine favour", style : "Passive", cost : 3, desc : "Reduces the cost of recruiting gods by 1 card",},
    // Gods
        38: {id: 38,img : "Dionysus", name : "Dionysus", atk : 4, hp : 10, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "Festival Rites", style : "Passive", cost : 5, desc : "All soldiers have +1 atk and take -1 dmg",},
        39: {id: 39,img : "Zeus", name : "Zeus", atk : 7, hp : 12, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "Thunderer's Wrath", style : "Bolt", cost : 5, desc : "Deal 10 dmg to a mortal enemy",},
        40: {id: 40,img : "Athena", name : "Athena", atk : 6, hp : 10, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "Warrior Goddess", style : "Passive", cost : 5, desc : "Every time Athena kills an enemy, she is healed by 2",},
        41: {id: 41,img : "Poseidon", name : "Poseidon", atk : 6, hp : 12, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "Earthquake", style : "Bolt", cost : 5, desc : "Deal 1 damage to all enemies",},
        42: {id: 42,img : "Hades", name : "Hades", atk : 5, hp : 12, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "Lord of the Dead", style : "Passive", cost : 5, desc : "On defeat, place the last two killed units in your army",},
        43: {id: 43,img : "Hera", name : "Hera", atk : 4, hp : 12, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "Queen of the Gods", style : "Passive", cost : 5, desc : "Deal x2 dmg to heroes",},
        44: {id: 44,img : "Ares", name : "Ares", atk : 4, hp : 10, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "Thirst for War", style : "Passive", cost : 5, desc : "When Ares' health is below 50%, he deals x2 dmg",},
        45: {id: 45,img : "Aphrodite", name : "Aphrodite", atk : 4, hp : 10, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "Divine Feminine", style : "Passive", cost : 5, desc : "All female cards deal x2 dmg",},
        46: {id: 46,img : "Apollo", name : "Apollo", atk : 5, hp : 10, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "God of Healing", style : "Bolt", cost : 5, desc : "Heal 4 hp on an ally, all attacks are ranged",},
        47: {id: 47,img : "Demeter", name : "Demeter", atk : 3, hp : 9, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "Bountiful Harvest", style : "Bolt", cost : 5, desc : "Draw a basic card and heal 4 hp on an ally",},
        48: {id: 48,img : "Hermes", name : "Hermes", atk : 4, hp : 10, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "Swift Footed", style : "Passive", cost : 5, desc : "All Green cards deal +1 dmg",},
        49: {id: 49,img : "Hephaestus", name : "Hephaestus", atk : 3, hp : 9, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "Divine Engineering", style : "Bolt", cost : 5, desc : "Stun 2 enemies and choose an ally to be taunted",},
        50: {id: 50,img : "Artemis", name : "Artemis", atk : 5, hp : 10, connect : 4, red : 0, green : 0, blue : 0, type : "god", ability : "Goddess of the Hunt", style : "Passive", cost : 5, desc : "All attacks are ranged, deal +2 dmg to monsters",},
    // Monsters
        51: {id: 51,img : "Cyclops", name : "Cyclops", atk : 7, hp : 8, connect : 4, red : 0, green : 0, blue : 0, cost: 4, type : "monster", style : "Bolt", ability : "Devour", desc : "Eat a soldier",},
        52: {id: 52,img : "Minotaur", name : "Minotaur", atk : 5, hp : 8, connect : 4, red : 0, green : 0, blue : 0, cost: 4, type : "monster", style : "Bolt", ability : "Savage Roar", desc : "Deal 1 dmg to all non-red cards in the enemy's army",},
        53: {id: 53,img : "Hydra", name : "Hydra", atk : 3, hp : 10, connect : 4, red : 0, green : 0, blue : 0, cost: 4, type : "monster", style : "Passive", ability : "Poisoned Blood", desc : "The killer of the Hydra takes 5 dmg",},
        54: {id: 54,img : "Medusa", name : "Medusa", atk : 4, hp : 9, connect : 4, red : 0, green : 0, blue : 0, cost: 4, type : "monster", style : "Passive", ability : "Stone Gaze", desc : "Any unit which attacks Medusa is stunned",},
        55: {id: 55,img : "CretanBull", name : "Cretan Bull", atk : 4, hp : 8, connect : 4, red : 0, green : 0, blue : 0, cost: 4, type : "monster", style : "Bolt", ability : "Charge", desc : "Can always attack first, first attack deals +2 dmg",},
        56: {id: 56,img : "Cerberus", name : "Cerberus", atk : 5, hp : 10, connect : 4, red : 0, green : 0, blue : 0, cost: 4, type : "monster", style : "Bolt", ability : "Triple Threat", desc : "Attack your target 3 times",},
        57: {id: 57,img : "Chimera", name : "Chimera", atk : 6, hp : 9, connect : 4, red : 0, green : 0, blue : 0, cost: 4, type : "monster", style : "Bolt", ability : "Breath Fire", desc : "Deal 2 dmg to connecting cards",},
        58: {id: 58,img : "NemeanLion", name : "Nemean Lion", atk : 5, hp : 7, connect : 4, red : 0, green : 0, blue : 0, cost: 4, type : "monster", style : "Passive", ability : "Thick Skinned", desc : "Reduces all incoming dmg by 1",},
    },
    general: {
        1: {id: 1, img : "Agamemnon", name : "Agamemnon", atk : 2, hp : 10, connect : 4, red : 4, green : 0, blue : 0, type : "general", ability : "Leader of the Greeks", style : "Passive", cost : 0, desc : "All soldiers deal +1 dmg",},
        2: {id: 2, img : "Pericles", name : "Pericles", atk : 1, hp : 10, connect : 4, red : 0, green : 1, blue : 3, type : "general", ability : "Voice of Democracy", style : "Passive", cost : 0, desc : "Connected soldiers deal +2 dmg",},
        3: {id: 3, img : "Leonidas", name : "Leonidas", atk : 2, hp : 10, connect : 4, red : 3, green : 1, blue : 0, type : "general", ability : "Spartan Warcry", style : "Passive", cost : 0, desc : "Leonidas must be killed first by the enemy",},
        4: {id: 4, img : "Priam", name : "Priam", atk : 1, hp : 10, connect : 4, red : 1, green : 1, blue : 2, type : "general", ability : "Royal Wealth", style : "Bolt", cost : 0, desc : "Draw 5 basic cards on your first turn",},
        5: {id: 5, img : "Alexander", name : "Alexander", atk : 2, hp : 10, connect : 4, red : 0, green : 2, blue : 2, type : "general", ability : "Overwhelming Odds", style : "Passive", cost : 0, desc : "The last unit in the army has x2 attack",},
        6: {id: 6, img : "Dido", name : "Dido", atk : 2, hp : 10, connect : 4, red : 2, green : 0, blue : 2, type : "general", ability : "Ill-Fated Queen", style : "Passive", cost : 0, desc : "On death, Dido's killer dies as well",},
        7: {id: 7, img : "Cadmus", name : "Cadmus", atk : 2, hp : 10, connect : 4, red : 1, green : 2, blue : 1, type : "general", ability : "Founder's Spirit", style : "Passive", cost : 0, desc : "When all connections are filled, deal x2 dmg",},
        8: {id: 8, img : "Aeneas", name : "Aeneas", atk : 2, hp : 10, connect : 4, red : 2, green : 1, blue :1, type : "general", ability : "Divine Protection", style : "Passive", cost : 0, desc : "The first unit to die is resurrected at half hp",},
    }
}