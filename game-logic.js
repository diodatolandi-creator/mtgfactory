/**
 * Modulo per la gestione dello stato e delle regole di gioco
 */

export const gameState = {
    myLife: 20,
    opponentLife: 20,
    myMana: { W: 0, U: 0, B: 0, R: 0, G: 0, C: 0 },
    turnPhase: 'UNTAP', // UNTAP, DRAW, MAIN1, COMBAT, MAIN2, END
    wins: 0,
    losses: 0,
    myDeck: [],
    myHand: [],
    myBattlefield: [],
    myGraveyard: [],
    myExile: []
};

export const PHASES = ['UNTAP', 'DRAW', 'MAIN1', 'COMBAT', 'MAIN2', 'END'];

/**
 * Modifica i punti vita
 */
export function changeLife(amount, isOpponent = false) {
    if (isOpponent) {
        gameState.opponentLife += amount;
        return gameState.opponentLife;
    } else {
        gameState.myLife += amount;
        return gameState.myLife;
    }
}

/**
 * Modifica la riserva di mana
 */
export function updateMana(color, amount) {
    if (gameState.myMana.hasOwnProperty(color)) {
        gameState.myMana[color] = Math.max(0, gameState.myMana[color] + amount);
    }
    return gameState.myMana;
}

/**
 * Svuota il mana pool
 */
export function clearManaPool() {
    Object.keys(gameState.myMana).forEach(color => {
        gameState.myMana[color] = 0;
    });
    return gameState.myMana;
}

/**
 * Passa alla fase successiva del turno
 */
export function nextPhase() {
    const currentIndex = PHASES.indexOf(gameState.turnPhase);
    const nextIndex = (currentIndex + 1) % PHASES.length;
    gameState.turnPhase = PHASES[nextIndex];
    return gameState.turnPhase;
}

/**
 * Lancia un dado a N facce
 */
export function rollDice(sides = 20) {
    return Math.floor(Math.random() * sides) + 1;
}

/**
 * Lancia una moneta
 */
export function flipCoin() {
    return Math.random() < 0.5 ? 'Testa' : 'Croce';
}
