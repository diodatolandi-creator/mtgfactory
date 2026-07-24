let currentLang = 'it';
const i18n = {
    it: {
        mainTitle: "MTG Test Factory",
        chooseMode: "Scegli la Modalità di Gioco",
        modeLocal: "Gioca in Locale (vs IA)",
        modeOnline: "Gioca in Rete (P2P Umano)",
        onlineLobby: "Lobby Online (P2P)",
        serverConnecting: "Connessione al server di rete in corso...",
        serverConnected: "Connesso alla rete P2P!",
        opponentConnected: "Avversario connesso! Configura il mazzo e avvia.",
        roomIdLabel: "Il tuo ID Stanza",
        roomInstructions: "Comunica questo ID al tuo avversario oppure unisciti alla sua stanza:",
        joinBtn: "Unisciti alla Stanza",
        onlineNameLabel: "Il Tuo Nome Giocatore",
        onlineDeckLabel: "Il Tuo Mazzo Online",
        total: "Totale",
        cards: "carte",
        startOnlineBtn: "Pronto! Avvia Partita Online",
        localSetupTitle: "Configurazione Mazzi e Sideboard (Locale)",
        player1NameLabel: "Nome Giocatore 1",
        player2NameLabel: "Nome Giocatore 2 / IA",
        deck1Label: "Mazzo 1",
        side1Label: "Tuo Sideboard",
        deck2Label: "Mazzo 2",
        side2Label: "Sideboard IA",
        startLocalBtn: "Avvia Partita",
        preGameTitle: "Fase Iniziale & Determinazione Turno",
        mulliganPrompt: "Seleziona le carte da rimettere sotto al mazzo (Mulligan n.",
        keepHandBtn: "Tieni Mano / Rimetti in Fondo",
        mulliganBtn: "Mulligan (Nuova Mano)",
        whoStartsPrompt: "Scegli chi inizia:",
        chooseMeBtn: "Inizio Io",
        chooseOppBtn: "Fa iniziare l'Avversario",
        phases: ["1. STAP", "2. MANTENIMENTO", "3. ACQUISIZIONE", "4. PRINCIPALE 1", "5. COMBATTIMENTO", "6. PRINCIPALE 2", "7. FINE / END STEP"],
        sidebarTitleLocal: "Fasi Turno",
        sidebarTitleOnline: "Partita Online",
        stackTitle: "Pila",
        oppHand: "Mano Avversario",
        lands: "Terre",
        exile: "Esilio",
        graveyard: "Cimitero",
        deck: "Mazzo",
        sideboard: "Sideboard",
        myHand: "La tua Mano",
        chatTitleLocal: "Console & Chat IA",
        chatTitleOnline: "Chat Globale P2P",
        sendBtn: "Invia",
        chatPlaceholder: "Scrivi un messaggio...",
        close: "Chiudi",
        deckEmpty: "Il mazzo è vuoto!",
        life: "Vita",
        turn: "Turno",
        priority: "Priorità",
        yourTurn: "Tuo",
        yourPriority: "Tua",
        aiPriority: "Avversario",
        passPhase: "Passa Fase",
        passTurn: "Passa Turno",
        myTurnBtn: "Mio Turno",
        waitingAI: "In attesa risposta avversario...",
        exitBtn: "Esci",
        newGameBtn: "Nuova Partita",
        exitConfirm: "Vuoi davvero uscire e tornare al menu iniziale?",
        newGameConfirm: "Vuoi terminare la partita corrente per configurare una nuova partita?",
        opponentLeft: "L'avversario ha abbandonato la partita.",
        menuDrawX: "Pesca X carte",
        menuShuffle: "Rimescola",
        menuPeekX: "Guarda le prime X carte",
        menuSearchDeck: "Cerca nel mazzo",
        menuMillX: "Metti X carte al cimitero",
        menuExileX: "Metti X carte in esilio",
        menuTop: "Metti in cima",
        menuBottom: "Metti in Fondo",
        menuGy: "Metti al Cimitero",
        menuHand: "Metti in Mano",
        menuExile: "Esilia",
        menuPlay: "Gioca",
        menuTopN: "Metti in cima al mazzo come N carta",
        menuShuffleDeck: "Rimescola nel mazzo",
        menuStap: "STAP",
        menuTap: "TAP",
        menuTapForMana: "Tappa per Mana (+1)",
        menuBackToGame: "RiGioca",
        menuStackPlay: "Gioca",
        menuStackHand: "Metti in Mano",
        menuStackGy: "Metti al Cimitero",
        menuStackExile: "Esilia",
        menuPlayFaceDown: "Metti in gioco coperta",
        menuFirstCardFaceDown: "Metti in gioco la prima carta coperta",
        menuTurnFaceUp: "Gira a faccia in su",
        manaPoolLabel: "RISERVA MANA:",
        clearManaBtn: "Svuota",
        logInit: "Simulatore MTG inizializzato. Configura i mazzi e avvia la partita.",
        logLocalMode: "Modalità Locale selezionata."
    },
    en: {
        mainTitle: "MTG Play Table",
        chooseMode: "Choose Game Mode",
        modeLocal: "Play Local (vs AI)",
        modeOnline: "Play Online (P2P Human)",
        onlineLobby: "Online Lobby (P2P)",
        serverConnecting: "Connecting to network server...",
        serverConnected: "Connected to P2P network!",
        opponentConnected: "Opponent connected! Configure your deck and start.",
        roomIdLabel: "Your Room ID",
        roomInstructions: "Share this ID with your opponent or join their room:",
        joinBtn: "Join Room",
        onlineNameLabel: "Your Player Name",
        onlineDeckLabel: "Your Online Deck",
        total: "Total",
        cards: "cards",
        startOnlineBtn: "Ready! Start Online Game",
        localSetupTitle: "Deck & Sideboard Configuration (Local)",
        player1NameLabel: "Player 1 Name",
        player2NameLabel: "Player 2 Name / AI",
        deck1Label: "Deck 1",
        side1Label: "Your Sideboard",
        deck2Label: "Deck 2",
        side2Label: "AI Sideboard",
        startLocalBtn: "Start Game",
        preGameTitle: "Initial Phase & Turn Determination",
        mulliganPrompt: "Select cards to put on the bottom of your deck (Mulligan #",
        keepHandBtn: "Keep Hand / Put on Bottom",
        mulliganBtn: "Mulligan (New Hand)",
        whoStartsPrompt: "Choose who starts:",
        chooseMeBtn: "I Go First",
        chooseOppBtn: "Opponent Goes First",
        phases: ["1. UNTAP", "2. UPKEEP", "3. DRAW", "4. MAIN 1", "5. COMBAT", "6. MAIN 2", "7. END STEP"],
        sidebarTitleLocal: "Turn Phases",
        sidebarTitleOnline: "Online Match",
        stackTitle: "Stack",
        oppHand: "Opponent Hand",
        lands: "Lands",
        exile: "Exile",
        graveyard: "Graveyard",
        deck: "Deck",
        sideboard: "Sideboard",
        myHand: "Your Hand",
        chatTitleLocal: "Console & AI Chat",
        chatTitleOnline: "P2P Global Chat",
        sendBtn: "Send",
        chatPlaceholder: "Type a message...",
        close: "Close",
        deckEmpty: "Deck is empty!",
        life: "Life",
        turn: "Turn",
        priority: "Priority",
        yourTurn: "Your",
        yourPriority: "Yours",
        aiPriority: "Opponent",
        passPhase: "Pass Phase",
        passTurn: "Pass Turn",
        myTurnBtn: "My Turn",
        waitingAI: "Waiting for opponent...",
        exitBtn: "Exit",
        newGameBtn: "New Game",
        exitConfirm: "Do you really want to exit and return to the main menu?",
        newGameConfirm: "Do you want to end the current match to set up a new game?",
        opponentLeft: "The opponent has left the match.",
        menuDrawX: "Draw X cards",
        menuShuffle: "Shuffle",
        menuPeekX: "Look at top X cards",
        menuSearchDeck: "Search deck",
        menuMillX: "Put X cards into graveyard",
        menuExileX: "Exile X cards",
        menuTop: "Put on top",
        menuBottom: "Put on bottom",
        menuGy: "Put into graveyard",
        menuHand: "Put into hand",
        menuExile: "Exile",
        menuPlay: "Play",
        menuTopN: "Put on top of deck as Nth card",
        menuShuffleDeck: "Shuffle into deck",
        menuStap: "UNTAP",
        menuTap: "TAP",
        menuTapForMana: "Tap for Mana (+1)",
        menuBackToGame: "Return to battlefield",
        menuStackPlay: "Put to Battlefield",
        menuStackHand: "Put to Hand",
        menuStackGy: "Put to Graveyard",
        menuStackExile: "Exile",
        menuPlayFaceDown: "Put to battlefield face down",
        menuFirstCardFaceDown: "Put the first card face down",
        menuTurnFaceUp: "Turn face up",
        manaPoolLabel: "MANA POOL:",
        clearManaBtn: "Clear",
        logInit: "MTG Simulator initialized. Configure decks and start game.",
        logLocalMode: "Local mode selected."
    }
};

let gameMode = 'local';
let peer = null;
let conn = null;
let isOnlineHost = false;
let matchesPlayedCount = 0;

let playerNames = {
    player: "Giocatore",
    opponent: "IA"
};

let matchStats = {
    player: { wins: 0, losses: 0 },
    ai: { wins: 0, losses: 0 }
};

const phasesList = ['untap', 'upkeep', 'draw', 'main1', 'combat', 'main2', 'end'];

let gameState = {
    activePlayer: 'player',
    priority: 'player',
    currentPhaseIndex: 0,
    playerLife: 20,
    aiLife: 20,
    playerManaPool: { w: 0, u: 0, b: 0, r: 0, g: 0, c: 0 },
    aiManaPool: { w: 0, u: 0, b: 0, r: 0, g: 0, c: 0 },
    playerDeck: [],
    playerSideboard: [],
    playerHand: [],
    playerBattlefield: [],
    playerGraveyard: [],
    playerExile: [],
    aiDeck: [],
    aiSideboard: [],
    aiHand: [],
    aiBattlefield: [],
    aiGraveyard: [],
    aiExile: [],
    stack: [],
    mulliganCount: 0,
    selectedForBottom: new Set()
};

let hoverTimer = null;
let currentModalZone = null;
const zoomPreview = document.getElementById('zoomPreview');
const contextMenu = document.getElementById('contextMenu');

window.onclick = function() {
    if (contextMenu) contextMenu.style.display = 'none';
};

function updateActionBtnText() {
    const actionBtn = document.getElementById('actionButton');
    if (!actionBtn) return;
    const t = i18n[currentLang];

    if (gameState.priority === 'player') {
        actionBtn.textContent = t.passPhase;
        actionBtn.disabled = false;
    } else {
        actionBtn.textContent = t.waitingAI;
        actionBtn.disabled = true;
    }
}

function updateUI() {
    const t = i18n[currentLang];

    document.getElementById('playerLife').textContent = gameState.playerLife;
    document.getElementById('opponentLife').textContent = gameState.aiLife;

    document.getElementById('playerDeckCount').textContent = gameState.playerDeck.length;
    document.getElementById('playerSideboardCount').textContent = gameState.playerSideboard.length;
    document.getElementById('aiDeckCount').textContent = gameState.aiDeck.length;

    document.getElementById('aiHandCount').textContent = gameState.aiHand.length;

    const aiLandCount = gameState.aiBattlefield.filter(c => c.typeLine && c.typeLine.toLowerCase().includes('land')).length;
    document.getElementById('aiLandCount').textContent = aiLandCount;

    document.getElementById('stackCount').textContent = gameState.stack.length;

    document.getElementById('turnIndicator').textContent = (gameState.activePlayer === 'player') ? t.yourTurn : playerNames.opponent;
    document.getElementById('priorityIndicator').textContent = (gameState.priority === 'player') ? t.yourPriority : t.aiPriority;

    phasesList.forEach((phase, idx) => {
        const pBox = document.getElementById(`p_${phase}`);
        if (pBox) {
            pBox.classList.remove('active-player', 'active-opponent');
            if (idx === gameState.currentPhaseIndex) {
                pBox.classList.add(gameState.activePlayer === 'player' ? 'active-player' : 'active-opponent');
            }
        }
    });

    const pMana = gameState.playerManaPool;
    document.getElementById('playerManaDisplay').textContent = `W:${pMana.w} U:${pMana.u} B:${pMana.b} R:${pMana.r} G:${pMana.g} C:${pMana.c}`;

    const aMana = gameState.aiManaPool;
    document.getElementById('aiManaDisplay').textContent = `W:${aMana.w} U:${aMana.u} B:${aMana.b} R:${aMana.r} G:${aMana.g} C:${aMana.c}`;

    const pBattlefieldLandDOM = document.getElementById('playerBattlefieldLand');
    const pBattlefieldNonLandDOM = document.getElementById('playerBattlefieldNonLand');
    pBattlefieldLandDOM.innerHTML = '';
    pBattlefieldNonLandDOM.innerHTML = '';

    gameState.playerBattlefield.forEach((card, idx) => {
        const dom = createCardDOM(card, 'battlefield', idx);
        if (card.typeLine && card.typeLine.toLowerCase().includes('land')) {
            pBattlefieldLandDOM.appendChild(dom);
        } else {
            pBattlefieldNonLandDOM.appendChild(dom);
        }
    });

    const aiBattlefieldLandDOM = document.getElementById('aiBattlefieldLand');
    const aiBattlefieldNonLandDOM = document.getElementById('aiBattlefieldNonLand');
    aiBattlefieldLandDOM.innerHTML = '';
    aiBattlefieldNonLandDOM.innerHTML = '';

    gameState.aiBattlefield.forEach((card, idx) => {
        const dom = createCardDOM(card, 'ai_battlefield', idx, true);
        if (card.typeLine && card.typeLine.toLowerCase().includes('land')) {
            aiBattlefieldLandDOM.appendChild(dom);
        } else {
            aiBattlefieldNonLandDOM.appendChild(dom);
        }
    });

    const playerHandDOM = document.getElementById('playerHand');
    playerHandDOM.innerHTML = '';
    gameState.playerHand.forEach((card, idx) => {
        playerHandDOM.appendChild(createCardDOM(card, 'hand', idx));
    });

    renderTopZoneSlot('playerGraveyardSlot', gameState.playerGraveyard);
    renderTopZoneSlot('playerExileSlot', gameState.playerExile);
    renderTopZoneSlot('aiGraveyardSlot', gameState.aiGraveyard);
    renderTopZoneSlot('aiExileSlot', gameState.aiExile);

    updateActionBtnText();
}

function renderTopZoneSlot(slotId, cardList) {
    const slot = document.getElementById(slotId);
    if (!slot) return;
    slot.innerHTML = '';
    if (cardList.length > 0) {
        const lastCard = cardList[cardList.length - 1];
        if (lastCard.image) {
            const img = document.createElement('img');
            img.src = lastCard.image;
            img.className = 'card-img';
            slot.appendChild(img);
        } else {
            addFallback(slot, lastCard);
        }
    }
}

// UTILITY MANIPOLAZIONE MAZZI & CARTE
function parseDeckList(text) {
    if (!text) return [];
    const lines = text.split('\n');
    let cards = [];
    let idCounter = 1;

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        const match = line.match(/^(\d+)\s+(.+)$/);
        const count = match ? parseInt(match[1]) : 1;
        const name = match ? match[2].trim() : line;

        for (let i = 0; i < count; i++) {
            cards.push({
                id: `card_${idCounter++}_${Math.random().toString(36).substr(2, 5)}`,
                       name: name,
                       typeLine: name.toLowerCase().includes('land') || name.toLowerCase().includes('isola') || name.toLowerCase().includes('pianura') || name.toLowerCase().includes('palude') || name.toLowerCase().includes('montagna') || name.toLowerCase().includes('foresta') ? 'Land' : 'Spell',
                       image: '',
                       tapped: false,
                       faceDown: false
            });
        }
    }
    return cards;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function drawCards(targetPlayer, count) {
    const deck = targetPlayer === 'player' ? gameState.playerDeck : gameState.aiDeck;
    const hand = targetPlayer === 'player' ? gameState.playerHand : gameState.aiHand;

    for (let i = 0; i < count; i++) {
        if (deck.length > 0) {
            hand.push(deck.pop());
        } else {
            logAction(`Mazzo di ${targetPlayer === 'player' ? playerNames.player : playerNames.opponent} vuoto!`);
            break;
        }
    }
}

// LOGICA PRE-GAME & LANCI DADI
function startGame() {
    const p1Name = document.getElementById('p1NameInput')?.value || "Giocatore";
    const p2Name = document.getElementById('p2NameInput')?.value || "IA";
    playerNames.player = p1Name;
    playerNames.opponent = p2Name;

    // Parsing e mescolamento mazzi
    gameState.playerDeck = parseDeckList(document.getElementById('playerDeckInput')?.value || "");
    gameState.playerSideboard = parseDeckList(document.getElementById('playerSideboardInput')?.value || "");
    gameState.aiDeck = parseDeckList(document.getElementById('aiDeckInput')?.value || "");
    gameState.aiSideboard = parseDeckList(document.getElementById('aiSideboardInput')?.value || "");

    shuffleArray(gameState.playerDeck);
    shuffleArray(gameState.aiDeck);

    startPreGame();
}

function startPreGame() {
    const setupScreen = document.getElementById('setupScreen');
    const onlineSetupScreen = document.getElementById('onlineSetupScreen');
    const preGameScreen = document.getElementById('preGameScreen');

    if (setupScreen) setupScreen.style.display = 'none';
    if (onlineSetupScreen) onlineSetupScreen.style.display = 'none';
    if (preGameScreen) preGameScreen.style.display = 'flex';

    logAction("Inizio fase Pre-Game. Lancio dei dadi in corso...");
    rollDiceForStart();
}

function rollDiceForStart() {
    let pRoll = 0, aiRoll = 0;

    // Risolve eventuali pareggi
    while (pRoll === aiRoll) {
        pRoll = Math.floor(Math.random() * 6) + 1;
        aiRoll = Math.floor(Math.random() * 6) + 1;
    }

    logAction(`Lancio dado: ${playerNames.player} fa ${pRoll}, ${playerNames.opponent} fa ${aiRoll}.`);

    const preGamePrompt = document.getElementById('whoStartsPrompt') || document.getElementById('preGamePrompt');
    const preGameControls = document.getElementById('preGameControls');

    if (pRoll > aiRoll) {
        logAction(`${playerNames.player} ha vinto il lancio del dado! Scegli chi inizia.`);
        if (preGamePrompt) preGamePrompt.textContent = `${playerNames.player} ha vinto il dado (${pRoll} vs ${aiRoll}). Scegli chi inizia:`;
        if (preGameControls) preGameControls.style.display = 'block';
    } else {
        logAction(`${playerNames.opponent} ha vinto il lancio del dado (${aiRoll} vs ${pRoll}).`);
        const aiChoice = Math.random() > 0.5 ? 'opponent' : 'player'; // l'IA sceglie di iniziare o far iniziare
        const choiceText = aiChoice === 'opponent' ? playerNames.opponent : playerNames.player;
        logAction(`${playerNames.opponent} decide che comincerà: ${choiceText}`);
        setStartingPlayer(aiChoice);
    }
}

function setStartingPlayer(player) {
    const startingPlayer = player === 'opponent' ? 'ai' : player;
    gameState.activePlayer = startingPlayer;
    gameState.priority = startingPlayer;
    gameState.currentPhaseIndex = 0;

    const starterName = (startingPlayer === 'player') ? playerNames.player : playerNames.opponent;
    logAction(`Giocatore iniziale stabilito: ${starterName}`);

    // Pescata iniziale di 7 carte per ciascun giocatore
    gameState.playerHand = [];
    gameState.aiHand = [];
    drawCards('player', 7);
    drawCards('ai', 7);

    // Nasconde schermata iniziale ed entra in partita
    const preGameScreen = document.getElementById('preGameScreen');
    const preGameModal = document.getElementById('preGameModal');
    if (preGameScreen) preGameScreen.style.display = 'none';
    if (preGameModal) preGameModal.style.display = 'none';

    const gameBoard = document.getElementById('gameBoard');
    if (gameBoard) gameBoard.style.display = 'flex';

    updateUI();
}

function keepHand() {
    logAction(`${playerNames.player} tiene la mano iniziale.`);
    // L'IA decide a sua volta se tenere
    logAction(`${playerNames.opponent} tiene la mano iniziale.`);

    const preGameScreen = document.getElementById('preGameScreen');
    if (preGameScreen) preGameScreen.style.display = 'none';

    const gameBoard = document.getElementById('gameBoard');
    if (gameBoard) gameBoard.style.display = 'flex';

    updateUI();
}

function takeMulligan() {
    gameState.mulliganCount++;
    logAction(`${playerNames.player} sceglie Mulligan #${gameState.mulliganCount}.`);

    // Rimette la mano nel mazzo e rimescola
    gameState.playerDeck.push(...gameState.playerHand);
    gameState.playerHand = [];
    shuffleArray(gameState.playerDeck);

    // Pesca nuova mano di 7 carte
    drawCards('player', 7);

    updateUI();
}

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll(`input[name^="lang_"]`).forEach(el => { el.checked = (el.value === lang); });
    updateUITexts();
}

function updateUITexts() {
    const t = i18n[currentLang];
    document.getElementById('mainTitle').textContent = t.mainTitle;
    document.getElementById('txtChooseMode').textContent = t.chooseMode;
    document.getElementById('btnModeLocal').textContent = t.modeLocal;
    document.getElementById('btnModeOnline').textContent = t.modeOnline;
    document.getElementById('txtOnlineLobby').textContent = t.onlineLobby;
    document.getElementById('txtRoomIdLabel').textContent = t.roomIdLabel;
    document.getElementById('txtRoomInstructions').textContent = t.roomInstructions;
    document.getElementById('txtJoinBtn').textContent = t.joinBtn;
    document.getElementById('txtOnlineNameLabel').textContent = t.onlineNameLabel;
    document.getElementById('txtOnlineDeckLabel').textContent = t.onlineDeckLabel;
    document.getElementById('txtTotalLabel').textContent = t.total;
    document.getElementById('txtCardsLabel').textContent = t.cards;
    document.getElementById('txtStartOnlineBtn').textContent = t.startOnlineBtn;
    document.getElementById('txtLocalSetupTitle').textContent = t.localSetupTitle;
    document.getElementById('txtPlayer1NameLabel').textContent = t.player1NameLabel;
    document.getElementById('txtPlayer2NameLabel').textContent = t.player2NameLabel;
    document.getElementById('txtDeck1Label').textContent = t.deck1Label;
    document.getElementById('txtTotalLabel2').textContent = t.total;
    document.getElementById('txtCardsLabel2').textContent = t.cards;
    document.getElementById('txtSide1Label').textContent = t.side1Label;
    document.getElementById('txtDeck2Label').textContent = t.deck2Label;
    document.getElementById('txtTotalLabel3').textContent = t.total;
    document.getElementById('txtCardsLabel3').textContent = t.cards;
    document.getElementById('txtSide2Label').textContent = t.side2Label;
    document.getElementById('txtStartLocalBtn').textContent = t.startLocalBtn;
    document.getElementById('txtPreGameTitle').textContent = t.preGameTitle;
    document.getElementById('txtKeepHandBtn').textContent = t.keepHandBtn;
    document.getElementById('txtMulliganBtn').textContent = t.mulliganBtn;
    document.getElementById('txtChooseMeBtn').textContent = t.chooseMeBtn;
    document.getElementById('txtChooseOppBtn').textContent = t.chooseOppBtn;
    document.getElementById('txtWhoStartsPrompt').textContent = t.whoStartsPrompt;
    document.getElementById('sidebarTitle').textContent = gameMode === 'local' ? t.sidebarTitleLocal : t.sidebarTitleOnline;
    document.getElementById('stackSidebarTitle').textContent = t.stackTitle;
    document.getElementById('txtOppHandLabel').textContent = t.oppHand;
    document.getElementById('txtCardsLabel4').textContent = t.cards;
    document.getElementById('txtLandsLabel').textContent = t.lands;
    document.getElementById('txtExileLabel1').textContent = t.exile;
    document.getElementById('txtGyLabel1').textContent = t.graveyard;
    document.getElementById('txtDeckLabel1').textContent = t.deck;
    document.getElementById('txtExileLabel2').textContent = t.exile;
    document.getElementById('txtGyLabel2').textContent = t.graveyard;
    document.getElementById('txtDeckLabel2').textContent = t.deck;
    document.getElementById('txtSideLabel2').textContent = t.sideboard;
    document.getElementById('txtMyHandLabel').textContent = t.myHand;
    document.getElementById('chatTitle').textContent = gameMode === 'local' ? t.chatTitleLocal : t.chatTitleOnline;
    document.getElementById('txtSendBtn').textContent = t.sendBtn;
    document.getElementById('consoleInput').placeholder = t.chatPlaceholder;
    document.getElementById('modalCloseBtn').textContent = t.close;
    document.getElementById('playerLifeLabel').textContent = t.life;
    document.getElementById('opponentLifeLabel').textContent = t.life;
    document.getElementById('turnIndicatorText').textContent = t.turn;
    document.getElementById('priorityIndicatorText').textContent = t.priority;
    document.getElementById('exitGameBtn').textContent = t.exitBtn;
    document.getElementById('newGameBtn').textContent = t.newGameBtn;
    document.getElementById('txtManaPoolLabel').textContent = t.manaPoolLabel;
    document.getElementById('btnClearMana').textContent = t.clearManaBtn;

    const phasesListKeys = ['untap', 'upkeep', 'draw', 'main1', 'combat', 'main2', 'end'];
    phasesListKeys.forEach((phase, idx) => {
        const elem = document.getElementById(`p_${phase}`);
        if (elem) elem.textContent = t.phases[idx];
    });

        updateActionBtnText();
}

function selectMode(mode) {
    gameMode = mode;
    document.getElementById('modeSelectScreen').style.display = 'none';
    if (mode === 'local') {
        document.getElementById('setupScreen').style.display = 'flex';
        updateCounts();
        logAction(i18n[currentLang].logLocalMode);
    } else {
        document.getElementById('onlineSetupScreen').style.display = 'flex';
        updateOnlineCounts();
        if (typeof initPeerJS === 'function') initPeerJS();
    }
    updateUITexts();
}

function createCardDOM(card, zoneName, index, isReadOnly = false) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper' + (card.tapped ? ' tapped' : '') + (card.faceDown ? ' face-down' : '');

    if (!isReadOnly && (zoneName === 'hand' || zoneName === 'battlefield')) {
        wrapper.setAttribute('draggable', 'true');
        wrapper.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({ cardId: card.id, sourceZone: zoneName, index: index }));
        };
    }

    const backFace = document.createElement('div');
    backFace.className = 'card-back-face';
    wrapper.appendChild(backFace);

    if (card.image) {
        const img = document.createElement('img');
        img.src = card.image;
        img.className = 'card-img';
        img.onerror = () => { img.remove(); addFallback(wrapper, card); };
        wrapper.appendChild(img);
    } else {
        addFallback(wrapper, card);
    }

    if (!isReadOnly) {
        attachCardEvents(wrapper, card, zoneName, index);
    }
    return wrapper;
}

function addFallback(wrapper, card) {
    const fallback = document.createElement('div');
    fallback.className = 'card-fallback';
    fallback.textContent = card.name;
    wrapper.appendChild(fallback);
}

function allowDrop(ev) { ev.preventDefault(); }

function dropCard(ev, targetZone) {
    ev.preventDefault();
    const dataStr = ev.dataTransfer.getData('text/plain');
    if (!dataStr) return;
    const data = JSON.parse(dataStr);
    const cardId = data.cardId;
    const sourceZone = data.sourceZone;

    let sourceArray = (sourceZone === 'hand') ? gameState.playerHand : gameState.playerBattlefield;
    if (!sourceArray) return;

    const cardIndex = sourceArray.findIndex(c => c.id === cardId);
    if (cardIndex === -1) return;

    let card = sourceArray.splice(cardIndex, 1)[0];

    if (targetZone === 'hand') {
        gameState.playerHand.push(card);
        logAction(`Spostata in mano: ${card.name}`);
    } else if (targetZone === 'battlefield_land' || targetZone === 'battlefield_nonland') {
        gameState.playerBattlefield.push(card);
        logAction(`Spostata nel campo: ${card.name}`);
    }

    updateUI();
}

function attachCardEvents(element, card, zoneName, index) {
    element.oncontextmenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        showContextMenu(e, card, zoneName, index);
    };
}

function showContextMenu(e, card, zoneName, index) {
    if (!contextMenu) return;
    contextMenu.innerHTML = '';
    contextMenu.style.display = 'block';
    contextMenu.style.left = e.clientX + 'px';
    contextMenu.style.top = e.clientY + 'px';

    const addOption = (text, callback) => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.textContent = text;
        div.onclick = (ev) => {
            ev.stopPropagation();
            contextMenu.style.display = 'none';
            callback();
        };
        contextMenu.appendChild(div);
    };

    if (zoneName === 'battlefield') {
        addOption(card.tapped ? "STAP" : "TAP", () => {
            card.tapped = !card.tapped;
            updateUI();
        });
        addOption("Metti al Cimitero", () => {
            gameState.playerBattlefield.splice(index, 1);
            gameState.playerGraveyard.push(card);
            logAction(`Messa al cimitero dal campo: ${card.name}`);
            updateUI();
        });
    } else if (zoneName === 'hand') {
        addOption("Gioca carta", () => {
            gameState.playerHand.splice(index, 1);
            gameState.playerBattlefield.push(card);
            logAction(`Giocata carta dalla mano: ${card.name}`);
            updateUI();
        });
    }
}

function updateCounts() {
    const pDeck = document.getElementById('playerDeckInput');
    const pSide = document.getElementById('playerSideboardInput');
    const aiDeck = document.getElementById('aiDeckInput');
    const aiSide = document.getElementById('aiSideboardInput');

    if (pDeck) document.getElementById('playerDeckTotal').textContent = calculateTextTotal(pDeck.value);
    if (pSide) document.getElementById('playerSideTotal').textContent = calculateTextTotal(pSide.value);
    if (aiDeck) document.getElementById('aiDeckTotal').textContent = calculateTextTotal(aiDeck.value);
    if (aiSide) document.getElementById('aiSideTotal').textContent = calculateTextTotal(aiSide.value);
}

function updateOnlineCounts() {
    const oDeck = document.getElementById('onlineDeckInput');
    const oSide = document.getElementById('onlineSideboardInput');

    if (oDeck) document.getElementById('onlineDeckTotal').textContent = calculateTextTotal(oDeck.value);
    if (oSide) document.getElementById('onlineSideTotal').textContent = calculateTextTotal(oSide.value);
}

function calculateTextTotal(text) {
    if (!text) return 0;
    const lines = text.split('\n');
    let total = 0;
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        const match = line.match(/^(\d+)\s+(.+)$/);
        total += match ? parseInt(match[1]) : 1;
    }
    return total;
}

function logAction(message, sender = 'SISTEMA') {
    const logBox = document.getElementById('logBox');
    if (!logBox) return;
    const time = new Date().toLocaleTimeString();
    const div = document.createElement('div');
    div.style.marginBottom = '6px';
    div.style.borderBottom = '1px solid #2a2a2a';
    div.style.paddingBottom = '4px';
    let color = '#f39c12';
    if (sender === playerNames.player) color = '#3498db';
    else if (sender === playerNames.opponent) color = '#e74c3c';
    div.innerHTML = `<span style="color:#888; font-size:11px;">[${time}]</span> <strong style="color:${color};">${sender}:</strong> ${message}`;
    logBox.appendChild(div);
    logBox.scrollTop = logBox.scrollHeight;
}

function resetToMainMenu() {
    if (confirm(i18n[currentLang].exitConfirm)) {
        location.reload();
    }
}

window.onload = () => {
    updateCounts();
    updateOnlineCounts();
    logAction(i18n[currentLang].logInit);
};
