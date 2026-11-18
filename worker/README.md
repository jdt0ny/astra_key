# ASTRA assistant Worker

Proxy serverless per l'assistente AI del terminale. Tiene la chiave Groq fuori dal browser e inoltra solo le ultime 12 battute della conversazione.

## Perché serve

Il sito è statico su GitHub Pages: una chiave API nel bundle sarebbe pubblica. Il Worker fa da tramite autenticato tra il browser e Groq.

## Setup

Serve un account Cloudflare (piano gratuito) e una chiave Groq da <https://console.groq.com/keys>.

```bash
cd worker

# 1. Login Cloudflare
npx wrangler@latest login

# 2. Imposta il link Calendly/Cal.com in wrangler.toml (BOOKING_URL)

# 3. Metti la chiave Groq come secret (non finisce nel repository)
npx wrangler@latest secret put GROQ_API_KEY

# 4. Deploy
npx wrangler@latest deploy
```

Wrangler stampa un URL simile a `https://astra-assistant.<sottodominio>.workers.dev`. L'endpoint da usare nel frontend è quell'URL + `/chat`:

```bash
# nella root del progetto
cp .env.example .env
# modifica VITE_ASSISTANT_ENDPOINT con l'URL reale
npm run dev
```

Sul repository GitHub aggiungi le variabili **Settings → Secrets and variables → Actions → Variables**:

- `VITE_ASSISTANT_ENDPOINT` = `https://astra-assistant.<sottodominio>.workers.dev/chat`
- `VITE_BOOKING_URL` = lo stesso link Calendly/Cal.com messo in `wrangler.toml`

La workflow di Pages le passa alla build.

## Sviluppo locale

```bash
cd worker
cp .dev.vars.example .dev.vars   # inserisci GROQ_API_KEY
npx wrangler@latest dev
```

Poi imposta in `.env`:

```dotenv
VITE_ASSISTANT_ENDPOINT=http://localhost:8787/chat
```

L'origine `http://localhost:5173` è già autorizzata in `wrangler.toml`.

## Configurazione

| Variabile | Dove | Descrizione |
| --- | --- | --- |
| `GROQ_API_KEY` | secret Cloudflare | Chiave API Groq. Obbligatoria. |
| `BOOKING_URL` | `wrangler.toml` | Link Calendly/Cal.com inserito nel prompt. |
| `MODEL` | `wrangler.toml` | Modello Groq (default `openai/gpt-oss-120b`). |
| `ALLOWED_ORIGINS` | `wrangler.toml` | Origini CORS separate da virgola. |

Il link del calendario va impostato anche in `VITE_BOOKING_URL` per il frontend, perché il comando `book` funziona anche senza Worker. I due valori devono combaciare.

## Sicurezza e privacy

- La chiave resta nel secret Cloudflare.
- CORS limitato alle origini configurate (GitHub Pages e localhost).
- Messaggi limitati a 12 battute da 1.000 caratteri e body a 20 KB.
- Rate limit best-effort di 12 richieste/minuto per IP, per isolate. Per una protezione più solida abilita una regola di **Cloudflare WAF → Rate limiting** sul percorso `/chat`.
- I messaggi non vengono salvati dal Worker e non vengono loggati; vengono comunque inviati a Groq per generare la risposta. Non inserire dati sensibili.
- Il Worker non ha binding a database o storage.
