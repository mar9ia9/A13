# A13 - Versione migliorata

Di seguito una descrizione riasuntiva del nostro lavoro. 
Tutte le informazioni nel dettaglio e la descrizione della campagna di test (tramite test case table) si possono trovare nella 𝒅𝒐𝒄𝒖𝒎𝒆𝒏𝒕𝒂𝒛𝒊𝒐𝒏𝒆 completa (𝐷𝑜𝑐𝑢𝑚𝑒𝑛𝑡𝑎𝑧𝑖𝑜𝑛𝑒 𝐴13_𝑣𝑒𝑟𝑠𝑖𝑜𝑛𝑒_𝑚𝑖𝑔𝑙𝑖𝑜𝑟𝑎𝑡𝑎) da noi prodotta, presente nella ripository, con anche una descrizione generale del progetto, dei diagrammi con le parti interessate e una pratica guida all'installazione e all'utilizzo dell'applicazione.

---

Il nostro team (composto da Monti Maria M63001468 - Santoro Emanuele M63001549 - Mondillo Angelica M63001482) ha intrapreso un ruolo nel miglioramento e nella stabilizzazione del front-end del sistema di gioco educativo ENACTEST. Il nostro contributo vuole avere un impatto diretto sulla qualità e sulla funzionalità della piattaforma, risolvendo problemi chiave di usabilità e introducendo nuove feature per migliorare l'esperienza utente. Il lavoro ha richiesto un'attenta analisi dell'architettura esistente. In particolare, siamo intervenuti sui Task T5, T2-3, T1 e abbiamo utilizzato alcune informazioni provenienti dal T4.

Implementazioni:

Nel corso dello sviluppo, ci siamo focalizzati sull'implementazione dei seguenti requisiti fondamentali:

- R1 - Profilo Utente (Vedi Issue #15): Abbiamo introdotto una nuova pagina dedicata al profilo utente, che raccoglie informazioni come nome, cognome, punteggi, partite giocate e tempo totale di gioco. Questa funzionalità offre ai giocatori una visione personalizzata delle proprie prestazioni e rappresenta un punto centrale per l'interazione utente.
  
- R2 - Pulsante di Salvataggio nell'Editor (Vedi Issue #10): È stato risolto un problema cruciale che causava la perdita di modifiche nel codice testato. Ora il sistema salva correttamente il codice modificato dall'utente, garantendo la persistenza delle informazioni fino al momento della compilazione o del refresh della pagina.

- R3 - Ottimizzazione della Combinazione di Colori (Vedi Issue #9): Per migliorare l’accessibilità e la leggibilità, abbiamo rivisto la combinazione di colori dell'interfaccia, rendendo l'editor più intuitivo e facile da utilizzare, con un contrasto ottimizzato per i temi chiaro e scuro.

- R4 - Nome Classe Automatico: Abbiamo automatizzato il processo di inserimento del nome della classe al momento del caricamento del file. Questo ha semplificato notevolmente l'esperienza dell'amministratore, eliminando la necessità di inserimenti manuali e riducendo il rischio di errori.

- R5 - Gestione del Refresh della Pagina (Vedi Issue #11 e #6): Abbiamo risolto un grave bug che causava la perdita di dati e crash dell'applicazione durante il refresh della pagina. Ora il sistema memorizza lo stato dell’editor e dei file in lavorazione, permettendo agli utenti di riprendere il lavoro da dove lo avevano lasciato senza inconvenienti.

Campagna di Test:

Una parte cruciale del nostro lavoro è stata la campagna di test di concorrenza, finalizzata a verificare la stabilità del sistema in situazioni di utilizzo simultaneo da parte di più giocatori. Abbiamo eseguito test approfonditi per simulare l’accesso concorrente al filesystem condiviso (Volume T8), identificando e risolvendo potenziali criticità legate alla gestione delle risorse. Questo ha garantito che il sistema possa gestire efficacemente un numero elevato di utenti senza compromettere le prestazioni o la coerenza dei dati.



https://github.com/user-attachments/assets/53769e56-85bc-47ce-9d20-666a667a281b


