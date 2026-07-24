/**
 * Modulo UI per l'aggiornamento dell'interfaccia di gioco
 */

import { gameState } from './game-logic.js';

/**
 * Aggiunge un messaggio alla console di log
 */
export function addLog(message, type = 'info') {
    const logContainer = document.getElementById('log-container');
    if (!logContainer) return;

    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    entry.textContent = `[${time}] ${message}`;

    logContainer.appendChild(entry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

/**
 * Aggiorna il badge del P2P nell'header
 */
export function updateConnectionStatus(info) {
    const statusBadge = document.getElementById('connection-status');
    if (!statusBadge) return;

    switch (info.status) {
        case 'hosting':
            statusBadge.textContent = 'Hosting (In attesa...)';
            statusBadge.className = 'status-badge status-offline';
            addLog(`Stanza creata! Invia questo link all'avversario: ${info.link}`, 'info');
            break;
        case 'connected':
            statusBadge.textContent = 'Connesso';
            statusBadge.className = 'status-badge status-online';
            addLog('Connessione P2P stabilita con l\'avversario!', 'info');
            break;
        case 'disconnected':
            statusBadge.textContent = 'Disconnesso';
            statusBadge.className = 'status-badge status-offline';
            addLog('L\'avversario si è disconnesso.', 'danger');
            break;
        case 'error':
            statusBadge.textContent = 'Errore Rete';
            statusBadge.className = 'status-badge status-offline';
            addLog(`Errore P2P: ${info.error}`, 'danger');
            break;
    }
}

/**
 * Disegna una carta nel DOM
 */
export function createCardElement(cardData, isOpponent = false) {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.dataset.instanceId = cardData.instanceId || '';

    if (cardData.facedown) {
        cardEl.classList.add('facedown');
    } else if (cardData.imageUrl) {
        cardEl.style.backgroundImage = `url('${cardData.imageUrl}')`;
    }

    // Toggle TAP / UNTAP al click
    cardEl.addEventListener('click', () => {
        if (!isOpponent) {
            cardEl.classList.toggle('tapped');
        }
    });

    return cardEl;
}

/**
 * Renderizza le carte all'interno di una zona del campo
 */
export function renderZone(zoneId, cardsArray, isOpponent = false) {
    const zoneEl = document.getElementById(zoneId);
    if (!zoneEl) return;

    // Mantieni il titolo della zona
    const titleEl = zoneEl.querySelector('.zone-title');
    zoneEl.innerHTML = '';
    if (titleEl) zoneEl.appendChild(titleEl);

    cardsArray.forEach(card => {
        const cardEl = createCardElement(card, isOpponent);
        zoneEl.appendChild(cardEl);
    });
}
