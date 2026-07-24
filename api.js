/**
 * Modulo API per l'integrazione con Scryfall
 */

const SCRYFALL_BASE_URL = 'https://api.scryfall.com';

/**
 * Recupera i dati di una carta per nome esatto da Scryfall.
 * @param {string} cardName - Il nome della carta da cercare.
 * @returns {Promise<Object>} Oggetto con dati e URL immagine della carta.
 */
export async function fetchCardData(cardName) {
    try {
        const response = await fetch(`${SCRYFALL_BASE_URL}/cards/named?exact=${encodeURIComponent(cardName)}`);

        if (!response.ok) {
            throw new Error(`Carta non trovata: ${cardName}`);
        }

        const data = await response.json();

        // Gestione carte con doppio lato o immagini standard
        let imageUrl = '';
        if (data.image_uris && data.image_uris.normal) {
            imageUrl = data.image_uris.normal;
        } else if (data.card_faces && data.card_faces[0].image_uris) {
            imageUrl = data.card_faces[0].image_uris.normal;
        }

        return {
            id: data.id,
            name: data.name,
            manaCost: data.mana_cost || '',
            typeLine: data.type_line || '',
            oracleText: data.oracle_text || '',
            imageUrl: imageUrl,
            cardFaces: data.card_faces || null
        };
    } catch (error) {
        console.error(`Errore nel caricamento della carta "${cardName}":`, error);
        return {
            name: cardName,
            imageUrl: 'https://c1.scryfall.com/file/scryfall-cards/large/back/0/0/00000000-0000-0000-0000-0000-0000-0000-0000-0000-0000-000000000000.jpg',
            error: true
        };
    }
}

/**
 * Carica una lista di carte in parallelo mantenendo le quantità richieste.
 * @param {Array<{name: string, quantity: number}>} parsedDecklist
 * @returns {Promise<Array>} Array piatto di carte pronte per il mazzo.
 */
export async function loadDeckFromScryfall(parsedDecklist) {
    const deck = [];

    // Fetch in parallelo per velocizzare il caricamento del mazzo
    const fetchPromises = parsedDecklist.map(item => fetchCardData(item.name));
    const results = await Promise.all(fetchPromises);

    results.forEach((cardData, index) => {
        const qty = parsedDecklist[index].quantity;
        for (let i = 0; i < qty; i++) {
            // Clona i dati assegnando un ID unico per ogni singola istanza nel gioco
            deck.push({
                ...cardData,
                instanceId: `${cardData.name.replace(/\s+/g, '_')}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
            });
        }
    });

    return deck;
}
