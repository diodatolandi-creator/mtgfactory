/**
 * Main Controller - Orchestratore del Simulatore MTG
 */

import { fetchCardData, loadDeckFromScryfall } from './api.js';
import { initP2P, sendP2PAction } from './p2p.js';
import { gameState as importedGameState, nextPhase } from './game-logic.js';
import { addLog, updateConnectionStatus } from './ui.js';

let gameState = {
    ...importedGameState,
    p1Deck: [],
    p2Deck: [],
    p1Hand: [],
    p2Hand: [],
    p1Battlefield: [],
    p2Battlefield: [],
    p1Graveyard: [],
    p2Graveyard: [],
    p1Exile: [],
    p2Exile: [],
    p1Sideboard: [],
    p2Sideboard: [],
    startingPlayer: "",
    mulliganCount: 0
};

// Variabili di stato globale per Vita e Mana Pool (Giocatore e Avversario)
let playerLife = 20;
let oppLife = 20;
let playerMana = { W: 0, U: 0, B: 0, R: 0, G: 0, C: 0 };
let oppMana = { W: 0, U: 0, B: 0, R: 0, G: 0, C: 0 };

// ==========================================
// GESTIONE DELLE FASI DEL TURNO
// ==========================================
const turnPhases = [
    { id: "p_untap", name: "1. STAP" },
{ id: "p_upkeep", name: "2. MANTENIMENTO" },
{ id: "p_draw", name: "3. ACQUISIZIONE" },
{ id: "p_main1", name: "4. PRINCIPALE 1" },
{ id: "p_combat", name: "5. COMBATTIMENTO" },
{ id: "p_main2", name: "6. PRINCIPALE 2" },
{ id: "p_end", name: "7. FINE / END STEP" }
];

let currentPhaseIndex = 2; // Indice 2 corrisponde a "3. ACQUISIZIONE"

function aggiornaVisualizzazioneFasi() {
    turnPhases.forEach((phase, index) => {
        const el = document.getElementById(phase.id);
        if (el) {
            if (index === currentPhaseIndex) {
                el.classList.add("active-phase");
            } else {
                el.classList.remove("active-phase");
            }
        }
    });

    const actionBtn = document.getElementById("actionButton");
    if (actionBtn) {
        if (currentPhaseIndex === turnPhases.length - 1) {
            actionBtn.innerText = "Passa Turno";
            actionBtn.style.background = "#e74c3c";
        } else {
            actionBtn.innerText = "Cambia Fase";
            actionBtn.style.background = "#27ae60";
        }
    }
}

function initPhaseController() {
    const actionBtn = document.getElementById("actionButton");
    if (actionBtn) {
        actionBtn.onclick = () => {
            currentPhaseIndex = (currentPhaseIndex + 1) % turnPhases.length;
            aggiornaVisualizzazioneFasi();
            addLog(`Fase cambiata a: ${turnPhases[currentPhaseIndex].name}`, 'info');
        };
    }
}

// ==========================================
// INIZIALIZZAZIONE & EVENT BINDING
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    addLog('Inizializzazione applicazione...', 'info');

    try {
        initP2P(handleIncomingP2PAction, updateConnectionStatus);
    } catch(e) {
        console.warn("PeerJS non pronto o non configurato:", e);
    }

    // 1. Clicca "Gioca in Locale"
    const btnModeLocal = document.getElementById("btnModeLocal");
    if (btnModeLocal) {
        btnModeLocal.onclick = () => {
            console.log("-> Selezionato Locale");
            document.getElementById("modeSelectScreen")?.classList.add("hidden");
            document.getElementById("setupScreen")?.classList.remove("hidden");
        };
    }

    // 2. Clicca "Gioca in Rete"
    const btnModeOnline = document.getElementById("btnModeOnline");
    if (btnModeOnline) {
        btnModeOnline.onclick = () => {
            console.log("-> Selezionato Online");
            document.getElementById("modeSelectScreen")?.classList.add("hidden");
            document.getElementById("onlineSetupScreen")?.classList.remove("hidden");
        };
    }

    // 3. Clicca "Avvia Partita"
    const btnStartLocal = document.getElementById("txtStartLocalBtn");
    if (btnStartLocal) {
        btnStartLocal.onclick = () => {
            console.log("-> Avvio Partita Locale");
            avviaLancioDado();
        };
    }

    // 4. Bottone Esci
    const exitBtn = document.getElementById("exitGameBtn");
    if (exitBtn) {
        exitBtn.onclick = () => location.reload();
    }
});

// ==========================================
// PARSER & UTILS
// ==========================================
function parseDecklist(text) {
    if (!text) return [];
    const normalizedText = text.replace(/\\n/g, '\n');
    return normalizedText.trim().split("\n").flatMap(line => {
        const trimmed = line.trim();
        if (!trimmed) return [];
        const match = trimmed.match(/^(\d+)\s+(.+)$/);
        if (match) {
            return Array(parseInt(match[1], 10)).fill(match[2].trim());
        }
        return [trimmed];
    });
}

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ==========================================
// ZOOM HOVER & HUD HELPERS
// ==========================================
function attachZoomListeners(element, cardName) {
    element.onmouseenter = (e) => {
        let zoomPreview = document.getElementById("card-zoom-global");
        if (!zoomPreview) {
            zoomPreview = document.createElement("div");
            zoomPreview.id = "card-zoom-global";
            zoomPreview.className = "card-zoom-preview";
            document.body.appendChild(zoomPreview);
        }
        zoomPreview.innerHTML = `<img src="https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}&format=image&version=normal" alt="${cardName}">`;
        zoomPreview.style.display = "block";
        positionZoom(e, zoomPreview);
    };

    element.onmousemove = (e) => {
        const zoomPreview = document.getElementById("card-zoom-global");
        if (zoomPreview) positionZoom(e, zoomPreview);
    };

        element.onmouseleave = () => {
            const zoomPreview = document.getElementById("card-zoom-global");
            if (zoomPreview) zoomPreview.style.display = "none";
        };
}

function positionZoom(e, preview) {
    const x = e.clientX + 15;
    const y = e.clientY - 150;
    preview.style.left = `${Math.min(window.innerWidth - 240, x)}px`;
    preview.style.top = `${Math.max(10, y)}px`;
}

// Funzioni di Gestione Vita e Mana (Giocatore e Avversario)
function modificaVita(val) {
    playerLife = Math.max(0, playerLife + val);
    const lifeEl = document.getElementById("playerLife");
    if (lifeEl) lifeEl.innerText = playerLife;
}

function modificaVitaOpp(val) {
    oppLife = Math.max(0, oppLife + val);
    const lifeEl = document.getElementById("oppLife");
    if (lifeEl) lifeEl.innerText = oppLife;
}

function modificaMana(colore, val) {
    playerMana[colore] = Math.max(0, playerMana[colore] + val);
    const manaEl = document.getElementById(`mana${colore}`);
    if (manaEl) manaEl.innerText = playerMana[colore];
}

function modificaManaOpp(colore, val) {
    oppMana[colore] = Math.max(0, oppMana[colore] + val);
    const manaEl = document.getElementById(`oppMana${colore}`);
    if (manaEl) manaEl.innerText = oppMana[colore];
}

window.modificaVita = modificaVita;
window.modificaVitaOpp = modificaVitaOpp;
window.modificaMana = modificaMana;
window.modificaManaOpp = modificaManaOpp;

// ==========================================
// MENU CONTESTUALE GLOBALE
// ==========================================
document.addEventListener("click", () => {
    const menu = document.getElementById("contextMenu");
    if (menu) menu.innerHTML = "";
});

function mostraMenuContestuale(e, opzioni) {
    e.preventDefault();
    e.stopPropagation();

    let menu = document.getElementById("contextMenu");
    if (!menu) {
        menu = document.createElement("div");
        menu.id = "contextMenu";
        document.body.appendChild(menu);
    }

    menu.innerHTML = "";
    menu.className = "context-menu";
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;

    opzioni.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "context-menu-item";
        btn.innerText = opt.label;
        btn.onclick = (ev) => {
            ev.stopPropagation();
            menu.innerHTML = "";
            opt.action();
        };
        menu.appendChild(btn);
    });
}

// ==========================================
// LOGICA D20, SELEZIONE E MULLIGAN
// ==========================================
function avviaLancioDado() {
    const p1Name = document.getElementById("player1NameInput")?.value || "Giocatore";
    const p2Name = document.getElementById("player2NameInput")?.value || "IA";

    let rollP1 = 0, rollP2 = 0;
    while (rollP1 === rollP2) {
        rollP1 = Math.floor(Math.random() * 20) + 1;
        rollP2 = Math.floor(Math.random() * 20) + 1;
    }

    const winnerName = rollP1 > rollP2 ? p1Name : p2Name;
    document.getElementById("setupScreen")?.classList.add("hidden");

    let modal = document.getElementById("dice-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "dice-modal";
        modal.className = "modal-overlay";
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
    <div class="modal-card" style="text-align: center; padding: 25px; background: #1e1e1e; color: #fff; border-radius: 8px; max-width: 400px; margin: auto;">
    <h2 style="color: #f39c12;">🎲 Lancio del D20</h2>
    <div style="display: flex; gap: 15px; margin: 20px 0;">
    <div style="background: #2b2b2b; padding: 15px; border-radius: 8px; flex: 1;">
    <div>${p1Name}</div>
    <div style="font-size: 2em; color: #3498db; font-weight: bold;">${rollP1}</div>
    </div>
    <div style="background: #2b2b2b; padding: 15px; border-radius: 8px; flex: 1;">
    <div>${p2Name}</div>
    <div style="font-size: 2em; color: #e74c3c; font-weight: bold;">${rollP2}</div>
    </div>
    </div>
    <p style="color: #2ecc71; font-weight: bold;">🏆 ${winnerName} vince il lancio!</p>
    <p>Chi vuoi far iniziare?</p>
    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;">
    <button id="btnStartMe" style="padding: 10px; background: #f39c12; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">Fai iniziare ${winnerName}</button>
    <button id="btnStartOpp" style="padding: 10px; background: #3498db; border:none; border-radius:4px; font-weight:bold; cursor:pointer; color:#fff;">Fai iniziare l'Avversario</button>
    </div>
    </div>`;

    modal.classList.remove("hidden");
    modal.style.display = "flex";

    document.getElementById("btnStartMe").onclick = () => avviaTavoloDiGioco(winnerName);
    document.getElementById("btnStartOpp").onclick = () => avviaTavoloDiGioco(winnerName === p1Name ? p2Name : p1Name);
}

function avviaTavoloDiGioco(whoStarts) {
    const diceModal = document.getElementById("dice-modal");
    if (diceModal) {
        diceModal.classList.add("hidden");
        diceModal.style.display = "none";
    }

    const p1Raw = document.getElementById("playerDeckInput")?.value || "";
    const p2Raw = document.getElementById("aiDeckInput")?.value || "";

    gameState.p1Deck = shuffle(parseDecklist(p1Raw));
    gameState.p2Deck = shuffle(parseDecklist(p2Raw));
    gameState.startingPlayer = whoStarts;
    gameState.mulliganCount = 0;

    pescaManoIniziale();
}

function pescaManoIniziale() {
    gameState.p1Hand = gameState.p1Deck.splice(0, 7);
    gameState.p2Hand = gameState.p2Deck.splice(0, 7);

    addLog(`Pescate 7 carte iniziali.`, 'info');
    mostraSchermataMulligan();
}

function mostraSchermataMulligan() {
    let mulliganModal = document.getElementById("mulligan-modal");
    if (!mulliganModal) {
        mulliganModal = document.createElement("div");
        mulliganModal.id = "mulligan-modal";
        mulliganModal.className = "modal-overlay";
        document.body.appendChild(mulliganModal);
    }

    const carteHTML = gameState.p1Hand.map(carta => `
    <div class="card-item-img" style="width: 100px; height: 140px; background: #252525; border: 2px solid #444; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
    <img src="https://api.scryfall.com/cards/named?exact=${encodeURIComponent(carta)}&format=image&version=normal" alt="${carta}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
    <span style="display:none; font-size:10px; color:#fff; text-align:center; padding:4px;">${carta}</span>
    </div>
    `).join("");

    mulliganModal.innerHTML = `
    <div class="modal-card mulligan-card" style="text-align: center;">
    <h3>Mano Iniziale (${gameState.p1Hand.length} Carte)</h3>
    <p style="margin-bottom: 15px; color: #AAA;">
    Inizia: <strong>${gameState.startingPlayer}</strong> | Mulligan effettuati: ${gameState.mulliganCount}
    </p>
    <div class="hand-display" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
    ${carteHTML}
    </div>
    <div class="button-group" style="margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
    <button id="btn-keep" style="padding: 10px 15px; background: #2ecc71; border:none; cursor:pointer; font-weight:bold; border-radius:4px; color:#fff;">Tieni Mano (Keep)</button>
    <button id="btn-mulligan" style="padding: 10px 15px; background: #e74c3c; border:none; cursor:pointer; font-weight:bold; border-radius:4px; color:#fff;">Mulligan</button>
    </div>
    </div>`;

    mulliganModal.classList.remove("hidden");
    mulliganModal.style.display = "flex";

    document.getElementById("btn-keep").onclick = () => {
        if (gameState.mulliganCount > 0) {
            gestisciBottomCards(gameState.mulliganCount);
        } else {
            mulliganModal.classList.add("hidden");
            mulliganModal.style.display = "none";
            addLog(`Mano tenuta a 7 carte. La partita ha inizio!`, 'success');
            entraNelTabellone();
        }
    };

    document.getElementById("btn-mulligan").onclick = () => {
        if (gameState.mulliganCount >= 6) {
            alert("Limite massimo di mulligan raggiunto!");
            return;
        }
        gameState.p1Deck.push(...gameState.p1Hand);
        gameState.p1Hand = [];
        gameState.p1Deck = shuffle(gameState.p1Deck);
        gameState.mulliganCount++;
        pescaManoIniziale();
    };
}

function gestisciBottomCards(cardsToPutBack) {
    const modal = document.querySelector("#mulligan-modal .modal-card");
    let selectedIndices = [];

    modal.innerHTML = `
    <h3>London Mulligan: Seleziona ${cardsToPutBack} carta/e da mettere in fondo</h3>
    <p style="margin-bottom: 15px; color: #AAA;">
    Selezionate: <span id="selected-count" style="color: #F39C12; font-weight: bold;">0</span>/${cardsToPutBack}
    </p>
    <div class="hand-display" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
    ${gameState.p1Hand.map((c, index) => `
        <div class="card-item-img card-selectable" data-index="${index}" style="width: 100px; height: 140px; background: #252525; border: 2px solid #444; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;">
        <img src="https://api.scryfall.com/cards/named?exact=${encodeURIComponent(c)}&format=image&version=normal" alt="${c}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <span style="display:none; font-size:10px; color:#fff; text-align:center; padding:4px;">${c}</span>
        </div>
        `).join('')}
        </div>
        <div class="button-group" style="margin-top: 20px;">
        <button id="btn-confirm-bottom" style="padding: 10px 15px; background: #f39c12; border:none; cursor:not-allowed; font-weight:bold; border-radius:4px; opacity:0.5;" disabled>
        Conferma e Metti in Fondo
        </button>
        </div>`;

        const countSpan = document.getElementById("selected-count");
        const confirmBtn = document.getElementById("btn-confirm-bottom");
        const cardElements = modal.querySelectorAll(".card-selectable");

        cardElements.forEach(el => {
            el.onclick = () => {
                const idx = parseInt(el.dataset.index, 10);
                const isSelected = selectedIndices.includes(idx);

                if (isSelected) {
                    selectedIndices = selectedIndices.filter(i => i !== idx);
                    el.style.outline = "none";
                } else {
                    if (selectedIndices.length < cardsToPutBack) {
                        selectedIndices.push(idx);
                        el.style.outline = "3px solid #f39c12";
                    }
                }

                countSpan.innerText = selectedIndices.length;
                if (selectedIndices.length === cardsToPutBack) {
                    confirmBtn.disabled = false;
                    confirmBtn.style.opacity = "1";
                    confirmBtn.style.cursor = "pointer";
                } else {
                    confirmBtn.disabled = true;
                    confirmBtn.style.opacity = "0.5";
                    confirmBtn.style.cursor = "not-allowed";
                }
            };
        });

        confirmBtn.onclick = () => {
            if (selectedIndices.length !== cardsToPutBack) return;

            selectedIndices.sort((a, b) => b - a);
            selectedIndices.forEach(idx => {
                const [removedCard] = gameState.p1Hand.splice(idx, 1);
                gameState.p1Deck.push(removedCard);
            });

            const mulliganModal = document.getElementById("mulligan-modal");
            if (mulliganModal) {
                mulliganModal.classList.add("hidden");
                mulliganModal.style.display = "none";
            }

            addLog(`Mano accettata dopo ${cardsToPutBack} mulligan.`, 'success');
            entraNelTabellone();
        };
}

function entraNelTabellone() {
    document.getElementById("gameLayout")?.classList.remove("hidden");
    aggiornaContatoriZone();
    renderizzaManoGiocatore();
    renderizzaCampoGiocatore();
    inizializzaInterazioneZoneServizio();

    // Inizializza le fasi partendo da Acquisizione (Indice 2)
    currentPhaseIndex = 2;
    aggiornaVisualizzazioneFasi();
    initPhaseController();
}

function aggiornaContatoriZone() {
    const deckEl = document.getElementById("deckCount");
    const sideEl = document.getElementById("sideboardCount");

    if (deckEl) deckEl.innerText = gameState.p1Deck.length;
    if (sideEl) sideEl.innerText = gameState.p1Sideboard.length;

    const oppDeckEl = document.getElementById("oppDeckCount");
    const oppGraveEl = document.getElementById("oppGraveyardCount");
    const oppExileEl = document.getElementById("oppExileCount");

    if (oppDeckEl) oppDeckEl.innerText = gameState.p2Deck.length;
    if (oppGraveEl) oppGraveEl.innerText = gameState.p2Graveyard.length;
    if (oppExileEl) oppExileEl.innerText = gameState.p2Exile.length;

    // Aggiorna anche le anteprime visive di cimitero, esilio e pila con i rispettivi contatori
    aggiornaAnteprimaZoneServizio();

    renderizzaManoAvversario();
}

// ==========================================
// RENDERING & INTERAZIONI MANO / CAMPO / ZONE
// ==========================================
function renderizzaManoGiocatore() {
    const handContainer = document.getElementById("playerHand");
    if (!handContainer) return;
    handContainer.innerHTML = "";

    gameState.p1Hand.forEach((cardName, index) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card-item-img";

        const img = document.createElement("img");
        img.alt = cardName;
        img.title = cardName;
        img.src = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}&format=image&version=normal`;

        img.onerror = () => {
            img.style.display = "none";
            const fallbackTxt = document.createElement("span");
            fallbackTxt.style.fontSize = "10px";
            fallbackTxt.style.color = "#fff";
            fallbackTxt.innerText = cardName;
            cardDiv.appendChild(fallbackTxt);
        };

        cardDiv.appendChild(img);
        attachZoomListeners(cardDiv, cardName);

        cardDiv.onclick = (e) => {
            mostraMenuContestuale(e, [
                {
                    label: "Gioca carta",
                    action: async () => {
                        gameState.p1Hand.splice(index, 1);

                        try {
                            const response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`);
                            const data = await response.json();

                            const typeLine = data.type_line || "";
                            const isLand = typeLine.toLowerCase().includes("land");

                            if (isLand) {
                                // Se è una terra, viene aggiunta al campo e renderizzata nella riga inferiore (terre)
                                if (!gameState.p1Lands) gameState.p1Lands = [];
                                gameState.p1Lands.push(cardName);
                                addLog(`Giocata terra ${cardName} nella zona inferiore.`, 'info');
                                renderizzaCampoGiocatore();
                            } else {
                                if (!gameState.stack) gameState.stack = [];
                                gameState.stack.push(cardName);
                                addLog(`Magia ${cardName} lanciata in Pila.`, 'info');
                            }
                        } catch (err) {
                            console.warn("Impossibile verificare il tipo carta da Scryfall, invio di default in Pila:", err);
                            if (!gameState.stack) gameState.stack = [];
                            gameState.stack.push(cardName);
                        }

                        aggiornaContatoriZone();
                        renderizzaManoGiocatore();
                    }
                },
                {
                    label: "Metti nel Cimitero",
                    action: () => {
                        gameState.p1Hand.splice(index, 1);
                        gameState.p1Graveyard.push(cardName);
                        addLog(`Scartata ${cardName} nel cimitero.`, 'info');
                        aggiornaContatoriZone();
                        renderizzaManoGiocatore();
                    }
                },
                {
                    label: "Esilia",
                    action: () => {
                        gameState.p1Hand.splice(index, 1);
                        gameState.p1Exile.push(cardName);
                        addLog(`Esiliata ${cardName} dalla mano.`, 'info');
                        aggiornaContatoriZone();
                        renderizzaManoGiocatore();
                    }
                }
            ]);
        };

        handContainer.appendChild(cardDiv);
    });
}

function renderizzaCampoGiocatore() {
    const nonLandRow = document.getElementById("playerBattlefieldNonLand");
    const landRow = document.getElementById("playerBattlefieldLand");
    if (!nonLandRow || !landRow) return;

    nonLandRow.innerHTML = "";
    landRow.innerHTML = "";

    // Renderizza permanenti non terra
    gameState.p1Battlefield.forEach((cardName, index) => {
        const cardDiv = creaElementoCartaCampo(cardName, index, false);
        nonLandRow.appendChild(cardDiv);
    });

    // Renderizza le terre nella zona inferiore
    if (!gameState.p1Lands) gameState.p1Lands = [];
    gameState.p1Lands.forEach((cardName, index) => {
        const cardDiv = creaElementoCartaCampo(cardName, index, true);
        landRow.appendChild(cardDiv);
    });
}

function creaElementoCartaCampo(cardName, index, isLand) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card-item-img";

    const img = document.createElement("img");
    img.alt = cardName;
    img.src = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}&format=image&version=normal`;
    cardDiv.appendChild(img);
    attachZoomListeners(cardDiv, cardName);

    cardDiv.onclick = (e) => {
        mostraMenuContestuale(e, [
            {
                label: "TAP / STAP",
                action: () => {
                    cardDiv.style.transform = cardDiv.style.transform === "rotate(90deg)" ? "rotate(0deg)" : "rotate(90deg)";
                    addLog(`Tappato/Stappato ${cardName}.`, 'info');
                }
            },
            {
                label: "Rimbalza in Mano",
                action: () => {
                    if (isLand) {
                        gameState.p1Lands.splice(index, 1);
                    } else {
                        gameState.p1Battlefield.splice(index, 1);
                    }
                    gameState.p1Hand.push(cardName);
                    addLog(`Ripresa in mano ${cardName}.`, 'info');
                    renderizzaCampoGiocatore();
                    renderizzaManoGiocatore();
                }
            },
            {
                label: "Metti nel Cimitero",
                action: () => {
                    if (isLand) {
                        gameState.p1Lands.splice(index, 1);
                    } else {
                        gameState.p1Battlefield.splice(index, 1);
                    }
                    gameState.p1Graveyard.push(cardName);
                    addLog(`Messo nel cimitero ${cardName}.`, 'info');
                    aggiornaContatoriZone();
                    renderizzaCampoGiocatore();
                }
            }
        ]);
    };

    return cardDiv;
}

function renderizzaManoAvversario() {
    const oppHandContainer = document.getElementById("oppHand");
    if (!oppHandContainer) return;
    oppHandContainer.innerHTML = "";

    gameState.p2Hand.forEach(() => {
        const cardBack = document.createElement("div");
        cardBack.className = "card-back-shape";
        oppHandContainer.appendChild(cardBack);
    });
}

function inizializzaInterazioneZoneServizio() {
    const deckZone = document.getElementById("deckZone");
    if (deckZone) {
        deckZone.onclick = (e) => {
            mostraMenuContestuale(e, [
                {
                    label: "Pesca Carta",
                    action: () => {
                        if (gameState.p1Deck.length > 0) {
                            const carta = gameState.p1Deck.shift();
                            gameState.p1Hand.push(carta);
                            addLog(`Pescata 1 carta dal mazzo.`, 'info');
                            aggiornaContatoriZone();
                            renderizzaManoGiocatore();
                        }
                    }
                },
                {
                    label: "Mescila",
                    action: () => {
                        gameState.p1Deck = shuffle(gameState.p1Deck);
                        addLog(`Mazzo mescolato.`, 'success');
                    }
                }
            ]);
        };
    }

    const graveyardZone = document.getElementById("graveyardZone");
    if (graveyardZone) {
        graveyardZone.onclick = (e) => {
            mostraMenuContestuale(e, [
                {
                    label: "Visualizza Cimitero",
                    action: () => apriModaleZona("Cimitero", gameState.p1Graveyard)
                }
            ]);
        };
    }

    const exileZone = document.getElementById("exileZone");
    if (exileZone) {
        exileZone.onclick = (e) => {
            mostraMenuContestuale(e, [
                {
                    label: "Visualizza Esilio",
                    action: () => apriModaleZona("Esilio", gameState.p1Exile)
                }
            ]);
        };
    }

    const stackZone = document.getElementById("stackZone");
    if (stackZone) {
        stackZone.onclick = (e) => {
            mostraMenuContestuale(e, [
                {
                    label: "Visualizza Pila",
                    action: () => apriModaleZona("Pila", gameState.stack || [])
                }
            ]);
        };
    }
}

function apriModaleZona(titolo, listaCarte, tipoZona) {
    let modal = document.getElementById("zoneModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "zoneModal";
        modal.className = "modal-overlay hidden";
        modal.innerHTML = `
        <div class="modal-card" style="max-width: 700px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 id="zoneModalTitle" style="color: #f39c12; margin:0;"></h3>
        <button id="modalCloseBtn" style="background:#c0392b; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">X</button>
        </div>
        <div id="zoneModalBody" style="display: flex; gap: 10px; flex-wrap: wrap; max-height: 400px; overflow-y: auto; justify-content: center;"></div>
        </div>`;
        document.body.appendChild(modal);
    }

    document.getElementById("zoneModalTitle").innerText = `${titolo} (${listaCarte.length})`;
    const body = document.getElementById("zoneModalBody");
    body.innerHTML = "";

    if (listaCarte.length === 0) {
        body.innerHTML = `<p style="color:#aaa; text-align:center; width:100%;">Zona vuota</p>`;
    } else {
        listaCarte.forEach((cardName, index) => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "card-item-img";
            cardDiv.style.cursor = "pointer";
            cardDiv.style.position = "relative";

            const img = document.createElement("img");
            img.src = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}&format=image&version=normal`;
            cardDiv.appendChild(img);
            attachZoomListeners(cardDiv, cardName);

            // Aggiungiamo l'interazione stile "mano" tramite menu contestuale al click
            cardDiv.onclick = (e) => {
                mostraMenuContestuale(e, [
                    {
                        label: "Gioca / Lancia carta",
                        action: async () => {
                            listaCarte.splice(index, 1);
                            modal.classList.add("hidden");

                            try {
                                const response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`);
                                const data = await response.json();
                                const isLand = (data.type_line || "").toLowerCase().includes("land");

                                if (isLand) {
                                    if (!gameState.p1Lands) gameState.p1Lands = [];
                                    gameState.p1Lands.push(cardName);
                                    addLog(`Giocata terra ${cardName} dalla zona ${titolo}.`, 'info');
                                    renderizzaCampoGiocatore();
                                } else {
                                    // Le magie non terra vanno sulla riga superiore del campo di battaglia
                                    if (!gameState.p1Battlefield) gameState.p1Battlefield = [];
                                    gameState.p1Battlefield.push(cardName);
                                    addLog(`Risolta magia ${cardName} sul campo di battaglia superiore.`, 'info');
                                    renderizzaCampoGiocatore();
                                }
                            } catch (err) {
                                // Fallback di sicurezza: in caso di errore di rete, va comunque sul campo superiore
                                if (!gameState.p1Battlefield) gameState.p1Battlefield = [];
                                gameState.p1Battlefield.push(cardName);
                                renderizzaCampoGiocatore();
                            }

                            aggiornaContatoriZone();
                        }
                    },
                    {
                        label: "Riprendi in Mano",
                        action: () => {
                            listaCarte.splice(index, 1);
                            gameState.p1Hand.push(cardName);
                            addLog(`Ripresa in mano ${cardName} da ${titolo}.`, 'info');
                            aggiornaContatoriZone();
                            renderizzaManoGiocatore();
                            modal.classList.add("hidden");
                        }
                    },
                    {
                        label: "Metti nel Cimitero",
                        action: () => {
                            if (listaCarte !== gameState.p1Graveyard) {
                                listaCarte.splice(index, 1);
                                gameState.p1Graveyard.push(cardName);
                                addLog(`Spostata ${cardName} nel Cimitero.`, 'info');
                                aggiornaContatoriZone();
                                modal.classList.add("hidden");
                            }
                        }
                    },
                    {
                        label: "Esilia",
                        action: () => {
                            if (listaCarte !== gameState.p1Exile) {
                                listaCarte.splice(index, 1);
                                gameState.p1Exile.push(cardName);
                                addLog(`Esiliata ${cardName}.`, 'info');
                                aggiornaContatoriZone();
                                modal.classList.add("hidden");
                            }
                        }
                    }
                ]);
            };

            body.appendChild(cardDiv);
        });
    }

    modal.classList.remove("hidden");
    const closeBtn = document.getElementById("modalCloseBtn");
    if (closeBtn) {
        closeBtn.onclick = () => modal.classList.add("hidden");
    }
}

function handleIncomingP2PAction(data) {
    console.log("P2P Message:", data);
}

function aggiornaAnteprimaZoneServizio() {
    // Funzione di supporto per aggiornare una singola zona di servizio
    const aggiornaSingolaZona = (elementId, lista, titoloZona) => {
        const zoneEl = document.getElementById(elementId);
        if (!zoneEl) return;

        // Puliamo e impostiamo lo stile del contenitore principale della zona affinché gestisca bene l'interno
        zoneEl.style.position = "relative";
        zoneEl.style.display = "flex";
        zoneEl.style.flexDirection = "column";
        zoneEl.style.alignItems = "center";
        zoneEl.style.justifyContent = "center";

        const ultimaCarta = lista[lista.length - 1];

        // Svuotiamo e ricreiamo il contenuto interno in modo pulito
        zoneEl.innerHTML = "";

        if (ultimaCarta) {
            const img = document.createElement("img");
            img.src = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(ultimaCarta)}&format=image&version=normal`;
            img.alt = ultimaCarta;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            img.style.borderRadius = "4px";
            zoneEl.appendChild(img);
        } else {
            const emptyTxt = document.createElement("span");
            emptyTxt.style.fontSize = "11px";
            emptyTxt.style.color = "#aaa";
            emptyTxt.innerText = "Vuota";
            zoneEl.appendChild(emptyTxt);
        }

        // Cerchiamo o creiamo il contatore appena sotto la zona (evitando sovrapposizioni)
        let countId = elementId + "CounterBadge";
        let badge = document.getElementById(countId);
        if (!badge) {
            badge = document.createElement("div");
            badge.id = countId;
            // Posizionamento pulito appena sotto il blocco della zona
            badge.style.position = "absolute";
            badge.style.bottom = "-22px";
            badge.style.left = "50%";
            badge.style.transform = "translateX(-50%)";
            badge.style.background = "rgba(0, 0, 0, 0.85)";
            badge.style.color = "#fff";
            badge.style.padding = "1px 6px";
            badge.style.fontSize = "10px";
            badge.style.borderRadius = "3px";
            badge.style.whiteSpace = "nowrap";
            badge.style.zIndex = "5";
            zoneEl.appendChild(badge);
        }
        badge.innerText = `${lista.length} ${titoloZona}`;
    };

    aggiornaSingolaZona("graveyardZone", gameState.p1Graveyard, "cimitero");
    aggiornaSingolaZona("exileZone", gameState.p1Exile, "esilio");

    if (!gameState.stack) gameState.stack = [];
    aggiornaSingolaZona("stackZone", gameState.stack, "pila");
}
