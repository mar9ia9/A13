// Funzione per analizzare il token JWT ed estrarre il payload
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Recupera il token JWT dal cookie
function getJwtToken() {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'jwt') {
            return value;
        }
    }
    return null;
}

// Funzione per calcolare la differenza di tempo tra le partite in minuti
function calculateTimeDifference(startedAt, closedAt) {
    if (!closedAt) {
        return 0;
    }
    const startTimestamp = new Date(startedAt).getTime();
    const closedTimestamp = new Date(closedAt).getTime();
    return (closedTimestamp - startTimestamp) / 60000; // Differenza in minuti
}

document.addEventListener("DOMContentLoaded", function () {
    const jwtToken = getJwtToken();
    if (!jwtToken) {
        console.error('JWT token non trovato.');
        return;
    }

    // Decodifica il token JWT per ottenere i dati utente
    const userData = parseJwt(jwtToken);

    // Estrae nome, cognome ed email dai claims del token JWT
    const nome = userData.nome;
    const cognome = userData.cognome;
    const email = userData.sub; // L'email è memorizzata nel subject (sub)
    const userId = userData.userId; // L'ID utente è memorizzato come claim

    // Mostra il nome, cognome ed email dell'utente nel profilo
    document.getElementById("nome").textContent = nome;
    document.getElementById("cognome").textContent = cognome;
    document.getElementById("email").textContent = email;

    // Effettua una richiesta per ottenere i dati aggiuntivi (punteggi, partite giocate, tempo totale)
    fetch('/games')
        .then(response => response.json())
        .then(gameData => {
            const accountStats = {};

            // Elaboriamo i dati del gioco per ogni account
            gameData.data.forEach(entry => {
                const timeDifference = calculateTimeDifference(entry.startedAt, entry.closedAt);

                entry.players.forEach(player => {
                    const accountId = player.accountId;

                    // Aggiunge o aggiorna i dati relativi al conteggio delle partite e al tempo totale
                    if (!accountStats[accountId]) {
                        accountStats[accountId] = { count: 1, totalTime: timeDifference, score: entry.score || 0 };
                    } else {
                        accountStats[accountId].count++;
                        accountStats[accountId].totalTime += timeDifference;
                        accountStats[accountId].score += entry.score || 0;
                    }
                });
            });

            // Mostra i dati dell'utente loggato
            const userStats = accountStats[userId];
            if (userStats) {
                document.getElementById("userDetailsTable").style.display = "block";

                const tableBody = document.querySelector("#userDetailsTable tbody");
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${userStats.score}</td>
                    <td>${userStats.count}</td>
                    <td>${userStats.totalTime.toFixed(2)}</td>
                `;
                tableBody.appendChild(row);
            } else {
                // Mostra il messaggio "Nessuna partita giocata" se non ci sono dati
                document.getElementById("userDetailsTable").style.display = "block";
                document.getElementById("noGamesMessage").style.display = "block";
            }
        })
        .catch(error => {
            console.error('Errore durante la richiesta dei dati:', error);
        });
});

function redirectToPagemain() { // Funzione per tornare alla pagina principale
    window.location.href = "/main";
}
