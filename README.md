# CashFlow365 AI Controller — Next.js (Vercel-ready)

Live chat interface answering financial questions about Beer, Food, Wine,
Spirits, and Personnel Cost — grounded in real data, powered by **Azure
OpenAI (gpt-4o)** via **LangChain.js**.

## ⚠️ Rotate your Azure key first

A real `AZURE_OPENAI_API_KEY` and a HuggingFace token were shared in plain
text in chat while building this. Treat both as compromised:
1. Azure Portal → your OpenAI resource → **Keys and Endpoint** → regenerate.
2. HuggingFace → Settings → Access Tokens → revoke the old one, create a new one (not used in this app, but rotate it anyway since it was exposed).

Use the **new** key below — never the one pasted earlier.

## What's inside

- `lib/data.js` — central data store, all real figures (Beer/Food/Wine/Spirits/Personnel Cost, 2023–2025) plus the rule engine thresholds. Edit this file only to update numbers or add a category.
- `app/api/chat/route.js` — Next.js Route Handler (Node runtime) using `AzureChatOpenAI` from `@langchain/openai`. Builds the grounded system prompt from `lib/data.js` on every request.
- `components/Chat.js` + `app/page.js` — the branded chat UI (client component), calling `/api/chat`.
- `.env.example` — copy to `.env.local`, fill in your Azure values.

## Run locally

```bash
npm install
cp .env.example .env.local
# edit .env.local with your real (rotated) Azure OpenAI key + endpoint
npm run dev
```

Open **http://localhost:3000**.

## Deploy to Vercel (free tier)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo.
3. Vercel auto-detects Next.js — no build config needed.
4. In **Project Settings → Environment Variables**, add:
   - `AZURE_OPENAI_API_KEY`
   - `AZURE_OPENAI_ENDPOINT` (e.g. `https://your-resource-name.openai.azure.com/`)
   - `AZURE_OPENAI_DEPLOYMENT_NAME` (`gpt-4o`)
   - `AZURE_OPENAI_API_VERSION` (`2024-02-15-preview`)
5. Deploy. Vercel gives you a public URL like
   `https://cashflow365-ai-controller.vercel.app` — that's your shareable link.

Or via CLI:

```bash
npm i -g vercel
vercel
vercel env add AZURE_OPENAI_API_KEY
vercel env add AZURE_OPENAI_ENDPOINT
vercel env add AZURE_OPENAI_DEPLOYMENT_NAME
vercel env add AZURE_OPENAI_API_VERSION
vercel --prod
```

## Swapping providers later

The API route only touches `AzureChatOpenAI` in `app/api/chat/route.js`.
Swapping to plain OpenAI, Anthropic, or another Azure deployment means
changing that one file — `lib/data.js` and the frontend never need to change.

## Updating the data

Edit `lib/data.js` only. The API route rebuilds its grounding prompt from
that file on every request, so numbers can be updated (or a new category
added) without touching the route handler or the UI.
