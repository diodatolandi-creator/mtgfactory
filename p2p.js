/**
 * Modulo P2P per la connessione multiplayer basata su PeerJS
 */

let peer = null;
let connection = null;
let onActionReceivedCallback = null;

/**
 * Inizializza il nodo PeerJS e gestisce sia la creazione della stanza (Host)
 * sia la connessione a una stanza esistente (Client).
 * @param {Function} onActionCallback - Callback eseguita quando si riceve un'azione dall'avversario.
 * @param {Function} onStatusChange - Callback per aggiornare lo stato di connessione nell'interfaccia.
 */
export function initP2P(onActionCallback, onStatusChange) {
    onActionReceivedCallback = onActionCallback;

    const urlParams = new URLSearchParams(window.location.search);
    const targetRoomId = urlParams.get('room');

    if (!targetRoomId) {
        // --- MODALITÀ HOST ---
        const hostId = 'mtg-sim-' + Math.random().toString(36).substring(2, 9);
        peer = new Peer(hostId);

        peer.on('open', (id) => {
            const inviteLink = `${window.location.origin}${window.location.pathname}?room=${id}`;
            onStatusChange({ status: 'hosting', link: inviteLink, peerId: id });
        });

        peer.on('connection', (conn) => {
            connection = conn;
            setupConnectionHandlers(onStatusChange);
        });

    } else {
        // --- MODALITÀ CLIENT (GUEST) ---
        peer = new Peer();

        peer.on('open', () => {
            connection = peer.connect(targetRoomId);
            setupConnectionHandlers(onStatusChange);
        });
    }

    peer.on('error', (err) => {
        console.error('Errore P2P:', err);
        onStatusChange({ status: 'error', error: err });
    });
}

/**
 * Configura gli eventi di ricezione dati e disconnessione sulla socket P2P.
 */
function setupConnectionHandlers(onStatusChange) {
    connection.on('open', () => {
        onStatusChange({ status: 'connected', peerId: connection.peer });
    });

    connection.on('data', (data) => {
        if (onActionReceivedCallback) {
            onActionReceivedCallback(data);
        }
    });

    connection.on('close', () => {
        onStatusChange({ status: 'disconnected' });
    });
}

/**
 * Invia un'azione di gioco all'avversario.
 * @param {string} type - Tipo di azione (es. 'PLAY_CARD', 'TAP_CARD', 'CHANGE_LIFE')
 * @param {Object} payload - Dati legati all'azione
 */
export function sendP2PAction(type, payload = {}) {
    if (connection && connection.open) {
        connection.send({ type, payload, timestamp: Date.now() });
    } else {
        console.warn('Impossibile inviare l\'azione: Connessione P2P non attiva.');
    }
}
