# Documentazione Personale

## Introduzione
Questa documentazione ti aiuterà a capire i vari concetti utilizzati nel progetto "Django-Vue Todo". Ogni sezione spiega perché e come vengono utilizzate determinate tecnologie e moduli.

## Backend - Django e DRF

### Models
I modelli in Django sono definiti nella cartella `backend/todos/models.py`. Abbiamo il modello `Todo` che rappresenta un'attività nel nostro database. Ogni `Todo` ha attributi come `title`, `description`, `completed`, `created_at`, ecc. Django gestisce automaticamente il database e crea una tabella `Todo` basata sul nostro modello.

### Serializers
I serializer sono definiti in `backend/todos/serializers.py` e sono utilizzati per convertire i nostri modelli in formati JSON che possono essere facilmente inviati e ricevuti via HTTP. In DRF, i serializer agiscono in modo simile a form nel senso che vengono utilizzati per la convalida degli input.

### Viewsets
Definiti in `backend/todos/views.py`, i viewset in DRF forniscono un'interfaccia ad alto livello per interagire con i modelli. Possono gestire operazioni CRUD comuni senza bisogno di molto codice aggiuntivo.

## Frontend - Vue.js

### Componenti
In Vue, tutto è un componente. Puoi vederlo in `frontend/src/App.vue` e altri file all'interno della cartella `components`. Un esempio è l'uso di `<Navigation>` e `<Footer>` per separare parti della UI.

### Store e Composables
Vue 3 introduce i composables che permettono di gestire lo stato e la logica fuori dai componenti stessi. Utilizziamo un `store` definito in `useTodoStore` per manager lo stato dell'app.

### Integrazione e Comunicazione
Nel file `frontend/package.json` notiamo l'utilizzo di librerie come `axios` per gestire le chiamate HTTP al backend Django. `axios` è una libreria molto comune per gestire le richieste HTTP in un'architettura separata client/server.

## Configurazione e Build

### Vite
Essendo un sostituto moderno di Webpack, Vite è usato nel nostro progetto per gestire la build dell'app Vue. Viene configurato per supportare TypeScript e il CSS moderno.

### TypeScript ed ESLint
TypeScript è usato per aggiungere tipi ai nostri JavaScript, rendendo il codice più robusto e meno propenso a bug. Inoltre, `ESLint` è utilizzato per garantire la qualità del codice e mantenere uno stile consistente nel progetto.

## Conclusione
Spero che questo documento ti aiuti a capire meglio le tecnologie e i design pattern utilizzati in questo progetto. Non esitare a modificare e arricchire il codice man mano che approfondisci la tua conoscenza!
