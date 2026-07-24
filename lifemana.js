let playerLife = 20;
let playerMana = { W: 0, U: 0, B: 0, R: 0, G: 0, C: 0 };

function modificaVita(val) {
    playerLife += val;
    document.getElementById("playerLife").innerText = playerLife;
}

function modificaMana(colore, val) {
    playerMana[colore] = Math.max(0, playerMana[colore] + val);
    document.getElementById(`mana${colore}`).innerText = playerMana[colore];
}
