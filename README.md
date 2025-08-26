# 🎯 Django REST Framework + Vue.js 3 – Interview Documentation (Updated)

> **Context & intent**
>
> Questo progetto nasce come **esercizio pratico** per imparare velocemente **Django/DRF** e **Vue 3**. Alcune scelte sono volutamente **pragmatiche** (non ottimali in produzione) per concentrarmi su **funzionalità** e **learning outcomes**: CRUD end‑to‑end, autenticazione a token, store reattivo, validazioni base e integrazione API. Nelle sezioni seguenti evidenzio sia ciò che funziona sia ciò che migliorerei in una versione production‑ready.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Backend Deep Dive – Django REST Framework](#backend-deep-dive--django-rest-framework)
3. [Frontend Deep Dive – Vue.js 3](#frontend-deep-dive--vuejs-3)
4. [Key Technical Decisions](#key-technical-decisions)
5. [Problem-Solving Examples](#problem-solving-examples)
6. [Interview Q\&A Preparation](#interview-qa-preparation)
7. [Code Architecture Patterns](#code-architecture-patterns)
8. [Performance Considerations](#performance-considerations)
9. [Reality Check: Deliberate Trade‑offs & Improvements](#reality-check-deliberate-tradeoffs--improvements)

---

## 🎯 Project Overview

**Stack & cartelle**

* **Backend (DRF)**: `ben/` – Django + Django REST Framework, TokenAuth, CORS, pagination.
* **Frontend (Vue 3)**: `fen/` – Vite, TypeScript, Pinia (persisted), Tailwind, Vee‑Validate + Zod, Axios con interceptor.

**Proxy dev** (Vite): richieste verso `/api` proxate a `http://localhost:8000` (vedi `fen/vite.config.ts`).

**Endpoint principali**

* Todos: `GET/POST /api/todos/`, `GET/PATCH/DELETE /api/todos/:id/`
* Auth: `POST /api/auth/sign-up/`, `POST /api/auth/sign-in/`, `POST /api/auth/log-out/`, `GET/PATCH /api/auth/profile/:id/`

### Core Features Implemented

✅ **CRUD Todos** con **pagination DRF** (PageNumber, `PAGE_SIZE=20`)
✅ **Auth** con **TokenAuthentication** DRF (token restituito da sign‑in/sign‑up)
✅ **Store reattivo** (Pinia) con **persistenza** e contatori derivati
✅ **Interceptors Axios** per header `Authorization: Token <token>`
✅ **Form validation** con **Zod + Vee‑Validate** (auth e profilo)
✅ **Tailwind** con modalità **dark/light**, UI responsiva

> **Nota:** La lista Todos nel frontend usa i **risultati paginati** (`results`) ma al momento non espone UI per cambiare pagina: scelta consapevole per concentrarmi sul flusso CRUD end‑to‑end.

---

## 🔧 Backend Deep Dive – Django REST Framework

### 1) Settings & infrastruttura (`ben/todo_project/settings.py`)

* **App**: `todos`, `userAuth` + `rest_framework`, `rest_framework.authtoken`, `corsheaders`.
* **REST\_FRAMEWORK**: `TokenAuthentication`, `AllowAny` (globale – semplificazione), `JSONRenderer`, `PageNumberPagination (PAGE_SIZE=20)`.
* **CORS**: origini dev abilitate su `localhost:5173/3000`, `CORS_ALLOW_ALL_ORIGINS = DEBUG`.
* **DB**: `dj_database_url` con fallback SQLite.

> *Perché così*: impostazioni minime per mettere in piedi velocemente auth a token, API JSON pulite e CORS per il client Vite.

### 2) Modello Todos (`ben/todos/models.py`)

```python
class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    @property
    def is_overdue(self):
        return False  # placeholder per future estensioni
```

### 3) Serializers (`ben/todos/serializers.py`)

* **`TodoSerializer`**: lettura completa + campo di sola lettura `is_overdue`.
* **`TodoCreateSerializer`**: campi limitati per **create** (titolo/descrizione).
* **`TodoUpdateSerializer`**: update parziale con campi opzionali (es. `completed`).

> *Perché separati*: validazione stretta in scrittura, rappresentazione completa in lettura, API coerenti.

### 4) ViewSet Todos (`ben/todos/views.py`)

* **`get_serializer_class()`** seleziona il serializer in base all’azione (`create`, `update/partial_update`, altrimenti full).
* **`create(...)`**: valida con create‑serializer, **salva**, poi risponde con **serializer completo** per restituire **ID e timestamps** appena creati.
* **`destroy(...)`/`perform_destroy`**: 204 No Content pulito.

### 5) URL routing

* `ben/todo_project/urls.py`: `path("api/todos/", include("todos.urls"))`
* `ben/todos/urls.py`: `DefaultRouter` con base vuota → RESTful `"/api/todos/"` e `"/api/todos/:id/"`.

### 6) Autenticazione utente (`ben/userAuth/*`)

* **Serializers**

  * `UserPublicSerializer`: mappa `firstName/lastName` → `first_name/last_name` Django.
  * `SignUpSerializer`: controlli di unicità + **validator** password (`userAuth/validators.py`).
  * `SignInSerializer`: valida credenziali e restituisce `user`.
* **Views / Endpoints**

  * `POST /api/auth/sign-up/` → crea utente, restituisce `{ token, user }`.
  * `POST /api/auth/sign-in/` → autentica, restituisce `{ token, user }`.
  * `POST /api/auth/log-out/` → invalida **Token** corrente (richiede auth).
  * `GET/PATCH /api/auth/profile/:id/` (**`ProfileViewSet`**) → protetto con `TokenAuthentication` + `IsAuthenticated`.

> **⚠️ Nota importante**: `DEFAULT_PERMISSION_CLASSES = AllowAny` a livello globale è una semplificazione didattica. I controller sensibili (profilo) impostano permessi espliciti, ma **manca un filtro object‑level** (es. limitare il profilo all’utente corrente). Vedi la sezione *Trade‑offs* per come lo migliorerei.

---

## 🎨 Frontend Deep Dive – Vue.js 3

### 1) Tipi principali (`fen/src/types/*`)

* **`Todo`**: include `is_overdue` e timestamps.
* **`ApiListResponse<T>`**: typing per risposte paginabili DRF (`count`, `next`, `previous`, `results`).
* **`AuthResponse`**: `{ user, token }`.

### 2) API service & Interceptors (`fen/src/services/api.ts`)

* **BaseURL**: `/api` (proxy Vite verso Django in dev).
* **Request interceptor**: legge `token` dallo store e setta `Authorization: Token <token>`.
* **Response interceptor**: gestione errori 5xx con event‑bus (sezione *Trade‑offs* sul bus mancante/minimale).

### 3) Servizi specifici

* **Todos** (`fen/src/services/todo/todoApi.ts`): `getAll`, `getById`, `create`, `update (PATCH)`, `delete`, `toggleComplete`.
* **Auth** (`fen/src/services/auth/authApi.ts`): `signUp`, `signIn`, `logOut` (chiama endpoint DRF).
* **Profile** (`fen/src/services/profile/profileApi.ts`): `getUserInfo`, `patchUserGeneralInfo`, `patchUserCredentialInfo`.

### 4) Stato globale con Pinia (persisted)

* **User Store** (`fen/src/stores/userStore/userStore.ts`):

  * Stato minimo `{ user, token }`, getter `isAuth` e **persistenza** (plugin `pinia-plugin-persistedstate`).
  * Azioni (`action.ts`): `userSignIn`, `userSignUp`, `userLogout` (invia log‑out al backend **prima** di resettare lo store per evitare 401), patch profilo.
* **Todo Store** (`fen/src/stores/todoStore/`):

  * Stato `{ todos, isLoading, error }`, getters derivati (`completedCount`, `activeCount`, etc.).
  * Azioni CRUD contro `TodoService` (caricamento da `results` paginati, aggiornamenti ottimistici semplici).

### 5) Routing & guardie (`fen/src/routes.ts`)

* Guardie che reindirizzano l’utente **autenticato** dalla landing verso la dashboard; protezione di route **private** (dashboard/profile) in assenza di `token`.

### 6) Form & validazioni (Zod + Vee‑Validate)

* **SignIn/SignUp**: schemi in `fen/src/pages/Auth/SignIn/SignIn.schema.ts` e `SignUp.schema.ts` costruiti da `schemas/user.ts` (password policy allineata al backend).
* **Profile**: form con patch parziali al profilo autenticato.

### 7) UI & styling

* **Tailwind** con component classes (`.btn`, `.card`, ecc.), **dark mode**, layout responsive.
* Pagine: **TodoPage** (input + lista), **Auth (SignIn/SignUp)** con immagini/hero, **Dashboard** con widget di esempio, **Profile** per aggiornare dati utente.

---

## 🔍 Key Technical Decisions

### 1) DRF ViewSet + Serializers separati

* **Perché**: velocizza CRUD standard, separa responsabilità (create/update vs read‑model), garantisce **risposte coerenti** (es. `create` → ritorna il record completo).

### 2) TokenAuth DRF (scelta didattica)

* **Perché**: più semplice da integrare rapidamente rispetto a flussi JWT con refresh, e coerente con l’header `Authorization: Token` usato dagli interceptor.

### 3) Pinia persistito per auth

* **Perché**: implementazione rapida di “remember me” e ripristino sessione in dev. **Trade‑off** di sicurezza accettato per scopo didattico (vedi *Reality check*).

### 4) Vite proxy `/api`

* **Perché**: DX ottima in locale, nessun CORS complesso durante lo sviluppo, alias `@` → `src` per import puliti.

---

## 🚨 Problem-Solving Examples

### Problema 1 – POST Todo restituiva dati parziali

**Sintomo**: dopo `POST /api/todos/`, il client non riceveva `id/created_at`.

**Causa**: serializer per create con campi limitati.

**Fix**: validare con `TodoCreateSerializer`, salvare e rispondere con `TodoSerializer` completo:

```python
# ben/todos/views.py
serializer = self.get_serializer(data=request.data)
serializer.is_valid(raise_exception=True)
instance = serializer.save()
return Response(TodoSerializer(instance).data, status=201)
```

**Risultato**: coerenza tra `POST` e `GET` immediata.

### Problema 2 – 401 in logout

**Sintomo**: `POST /api/auth/log-out/` tornava 401 se lo store client resettava il token prima della chiamata.

**Fix**: chiamare il logout **prima** di `this.$reset()` nello store, così il backend vede l’`Authorization` valido.

### Problema 3 – Stato duplicato/composable multipli

**Sintomo**: contatori non sincronizzati.

**Fix**: centralizzare in **Pinia** (singleton store) e derivare i conteggi con getters.

### Problema 4 – Tipi Axios & paginazione DRF

**Sintomo**: confusione su `AxiosResponse` e shape liste.

**Fix**: tipi espliciti `ApiListResponse<T>` e ritorni tipizzati per `results`, evitando import diretti di `AxiosResponse` nelle firme pubbliche.

---

## 💡 Interview Q\&A Preparation

### Django REST Framework

**Q: Come gestisci la validazione?**
**A:** Field‑level (opzioni dei campi), object‑level (`validate()`), validator custom (es. `validate_strong_password`), e – se serve – `clean()` a livello di modello.

**Q: ViewSets vs APIView?**
**A:** ViewSet per CRUD standard con router automatici; APIView quando serve controllo fine sugli HTTP verb o orchestrazioni non CRUD.

**Q: Come gestisci permessi e sicurezza?**
**A:** A livello di view (`permission_classes`), globale (settings), e **object‑level** quando i record sono “owned” (miglioria pianificata qui per il profilo utente).

### Vue 3

**Q: Composition API vs Options API?**
**A:** Composition API raggruppa per **feature** (riuso, testing, TS migliore). Options è più entry‑level; si possono mescolare.

**Q: Stato globale?**
**A:** Pinia (ufficiale) per store tipizzati e persistenza opzionale. In questo progetto: `userStore` + `todoStore` con azioni asincrone.

**Q: TypeScript nel front?**
**A:** Tipi come documentazione viva, refactoring sicuro, contratti coerenti con l’API (`Todo`, `ApiListResponse<T>`, `AuthResponse`).

### Full‑stack

**Q: CORS in dev?**
**A:** `django-cors-headers` + Vite proxy `/api` → UX dev semplice, nessuna configurazione complicata.

**Q: Come garantisci coerenza dei contratti?**
**A:** Tipi TS allineati ai serializer DRF; in futuro generazione da OpenAPI.

**Q: Error handling cross‑stack?**
**A:** Status code DRF chiari; interceptor Axios con bus eventi per errori 5xx e messaggi UX.

---

## 🏗️ Code Architecture Patterns

### Repository Pattern – servizi API

```ts
export class TodoService {
  static async getAll() { /* chiama /api/todos/ → ApiListResponse<Todo> */ }
  static async create(data) { /* POST */ }
  static async update(id, data) { /* PATCH */ }
  static async delete(id) { /* DELETE */ }
}
```

### Facade Pattern – store

```ts
export const useTodoStore = defineStore('todo', {
  state: () => ({ todos: [], isLoading: false, error: null }),
  getters: { completedCount(){ return this.todos.filter(t=>t.completed).length }},
  actions: { loadTodos, createTodo, updateTodo, deleteTodo, toggleTodo }
})
```

### Observer Pattern – reattività Vue

* `ref`, `computed` e getters Pinia aggiornano automaticamente i componenti iscritti.

### MVC – Django

* **Model** (`Todo`), **View** (`TodoViewSet/SignInView/...`), **Controller** (router DRF + `urls.py`).

---

## ⚡ Performance Considerations

### Backend

1. **Pagination** (già attiva) per liste lunghe
2. **Indice** su campi query‑driven quando introdotti (es. `due_date`)
3. **Select\_related/prefetch\_related** quando compariranno relazioni
4. **Caching** (es. Redis) per endpoint hot

### Frontend

1. **Code‑splitting** dinamico delle route (già presente)
2. **Memoization** su calcoli costosi (getters sono economici qui)
3. **Virtual list** se i todos diventano migliaia

### Network

1. **Compression** (Gzip/Brotli)
2. **HTTP/2** e CDN statici
3. **Batching** di update massivi (es. toggle multipli)

---

## 🧭 Reality Check: Deliberate Trade‑offs & Improvements

### Cosa **non è ottimale** (volutamente) e **perché**

* **Token lato client come semplice stringa** (Pinia persist → localStorage):

  * *Perché*: velocizzare autenticazione in dev e testare interceptor.
  * *Rischio*: esposizione a XSS, nessuna rotazione/refresh.
* **`DEFAULT_PERMISSION_CLASSES = AllowAny`** globale:

  * *Perché*: ridurre la frizione iniziale per endpoint pubblici.
  * *Rischio*: dimenticanze su view sensibili. Alcune view (Profile) sono protette, ma **manca object‑level permission**.
* **ProfileViewSet** espone `User` senza restringere *owner‑only*:

  * *Perché*: demo rapida di `ModelViewSet`.
  * *Rischio*: con token valido si può leggere/patchare utenti not‑self (non OK in prod).
* **Event bus errori**: referenziato ma non completato a livello di file (`/lib/mitt/error-bus`):

  * *Perché*: focus su interceptor e payload error standard.
  * *Effetto*: alcune notifiche globali non compaiono.
* **Paginazione UI non esposta** (anche se lato API è già attiva):

  * *Perché*: priorità al flusso CRUD base.
  * *Effetto*: si carica solo `results` della prima pagina.
* **Validazione password**: forte lato backend, **conferma password** lato front minimale:

  * *Perché*: allineare velocemente la UX.
  * *Effetto*: UX migliorabile (messaggi, debounce, metri di forza password).

### Cosa ho voluto imparare (e ho fatto)

* **Django/DRF**: Model/ViewSet/Serializers multipli, TokenAuth, routing con `DefaultRouter`, pagination.
* **Vue 3**: Composition API, store **Pinia** tipizzato e **persist**, route guard, form con **Vee‑Validate + Zod**.
* **Integrazione end‑to‑end**: Axios con interceptor, Vite proxy, CORS, tipi condivisi (`Todo`, `AuthResponse`, `ApiListResponse`).

### Come la porterei **verso produzione**

1. **JWT + refresh** (es. `djangorestframework-simplejwt`) con **cookie HttpOnly + SameSite** oppure sessione sicura; nessun token in localStorage.
2. **DEFAULT\_PERMISSION\_CLASSES = IsAuthenticated** + **object‑level permissions** (es. profilo → `get_queryset` limitato a `request.user`, `perform_update` su self).
3. **CSRF** correttamente gestito per rotte state‑changing se si usa session auth/cookie.
4. **RBAC** e `IsOwnerOrReadOnly` per risorse “owned”.
5. **Validazioni front** più ricche (password meter, conferma password con refine) allineate al backend.
6. **Error bus** completato + **toast** coerenti, logging con correlation‑id.
7. **UI paginazione** (next/prev), filtri e ricerca server‑side.
8. **OpenAPI schema** + **codegen TS** per tipi client sempre aggiornati.
9. **Test**: unit (serializers, utils), API (pytest + DRF), e e2e (Playwright/Cypress).
10. **Config**: `.env` per base URL API in prod, ALLOWED\_HOSTS stretti, rate‑limit (es. DRF throttling) per endpoints auth.

> **Messaggio chiave per il colloquio**: ho scelto **consapevolmente** alcune scorciatoie per **massimizzare l’apprendimento** di DRF e Vue 3 in poco tempo. So **cosa** non è production‑grade e soprattutto **come** portarcelo.

---

## 🧪 Demo script (talk‑track rapido)

1. **Sign‑up / Sign‑in** → ispeziono Network: vedo `{ token, user }` e header `Authorization` nelle richieste successive.
2. **Crea todo** → mostro che la risposta contiene `id/created_at` (fix del create).
3. **Toggle & Delete** → store si aggiorna, contatori cambiano.
4. **Profile patch** → mostro la richiesta autenticata e il salvataggio.
5. **Logout** → chiamata al backend **prima** del reset store (niente 401), poi redirect.

---

## 🧾 Appendix – File chiave

* **Backend**: `ben/todo_project/settings.py`, `ben/todo_project/urls.py`, `ben/todos/{models,serializers,views,urls}.py`, `ben/userAuth/{serializers,views,validators,urls}.py`
* **Frontend**: `fen/src/services/{api,auth,profile,todo}`, `fen/src/stores/{userStore,todoStore}`, `fen/src/pages/{Auth,Todo,Profile,Dashboard}`, `fen/src/routes.ts`, `fen/vite.config.ts`

---

*Ultimo aggiornamento: Agosto 2025*
