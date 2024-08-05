# Guida al Progetto

Questo progetto è diviso in due parti principali: il frontend che mostra la grafica dei menù generati e il backend che richiama i dati dal DB. Di seguito troverai le istruzioni per configurare e avviare ciascuna parte. La grafica dei menù è generata utilizzando dati provenienti da un servizio esterno e il database utilizzato è Amazon RDS.

## Frontend

Il frontend è sviluppato con Vue.js. Segui questi passi per configurare e avviare il frontend del progetto.

### Configurazione del Progetto
Per installare le dipendenze necessarie, esegui nella cartella frontend:
```bash
npm install
```

### Compilazione e Hot-Reload per lo Sviluppo
Per avviare il server di sviluppo con hot-reload, esegui:
```bash
npm run serve
```
Tecnologia utilizzata: Vue.js

### Compilazione e Minificazione per la Produzione
Per compilare il progetto per la produzione, esegui:
```bash
npm run build
```

## Backend

Il backend è sviluppato con Node.js ed Express. Segui questi passi per configurare e avviare il backend del progetto.

### Configurazione del Progetto
Per installare le dipendenze necessarie, esegui nella cartella backend:
```bash
npm install
```   

### Avvio del Server
Per avviare il server, esegui:
```bash
node server.js
```
Tecnologia utilizzata: Node.js + Express

## Dati e Database

La grafica dei menù è creata utilizzando i dati presi da:
[https://gestionale-menu-mamma-elvira-1bd41f37f5f9.herokuapp.com/](https://gestionale-menu-mamma-elvira-1bd41f37f5f9.herokuapp.com/)

Il database da cui i dati sono presi è Amazon RDS.
il sito hosting è Heroku app.