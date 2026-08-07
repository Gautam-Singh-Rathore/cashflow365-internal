// app/api/chat/route.js
import { AzureChatOpenAI } from '@langchain/openai';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { financialData, ruleEngine } from '../../../lib/data';

export const runtime = 'nodejs'; // LangChain needs the Node runtime, not Edge

function buildSystemPrompt() {
  return `You are the CashFlow365 AI Controller — a financial analyst assistant for a hospitality business with five tracked categories: Beer, Food, Wine, Spirits, and Personnel Cost.

RULES:
- Only use the JSON data provided below. Never invent or estimate numbers.
- If data needed to answer isn't present (e.g. net profit, opex, customer counts), say so explicitly instead of guessing.
- Apply the rule engine thresholds when relevant to flag risks (see RULE ENGINE below).
- Be concise, specific, and cite exact figures (with month/year) when answering.
- When comparing categories, use gross margin %, revenue growth, and trend direction.
- Currency is SEK.

RULE ENGINE (same thresholds used in the monthly PDF reports):
${JSON.stringify(ruleEngine, null, 2)}

FINANCIAL DATA (all figures are real, taken directly from the client's records):
${JSON.stringify(financialData)}

Answer questions from decision-makers (owners, finance leads) clearly and directly. Prefer short paragraphs or small tables over long prose. Flag risks proactively when the data supports it.`;
}

const SYSTEM_PROMPT = buildSystemPrompt();

// Lazily construct the model per-request so a missing env var doesn't crash the build.
function getModel() {
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT; // e.g. https://ai-resource-bi.openai.azure.com/
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o';
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview';

  if (!apiKey || !endpoint) {
    throw new Error('Missing AZURE_OPENAI_API_KEY or AZURE_OPENAI_ENDPOINT environment variables.');
  }

  return new AzureChatOpenAI({
    azureOpenAIApiKey: apiKey,
    azureOpenAIEndpoint: endpoint,
    azureOpenAIApiDeploymentName: deployment,
    azureOpenAIApiVersion: apiVersion,
    temperature: 0.3,
    maxTokens: 700
  });
}

function toLangChainMessages(history) {
  return history.map((m) =>
    m.role === 'assistant' ? new AIMessage(m.content) : new HumanMessage(m.content)
  );
}

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body?.messages;

    if (!Array.isArray(messages)) {
      return Response.json({ error: 'messages must be an array' }, { status: 400 });
    }

    const model = getModel();

    const fullMessages = [
      new SystemMessage(SYSTEM_PROMPT),
      ...toLangChainMessages(messages)
    ];

    const response = await model.invoke(fullMessages);

    return Response.json({ reply: response.content });
  } catch (err) {
    console.error('Chat API error:', err);
    return Response.json(
      { error: 'Chat request failed', detail: String(err?.message || err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    status: 'ok',
    hasAzureKey: !!process.env.AZURE_OPENAI_API_KEY,
    hasAzureEndpoint: !!process.env.AZURE_OPENAI_ENDPOINT,
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o'
  });
}
