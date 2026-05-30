/*
  Let Me Claude That For You — Cloudflare Worker API proxy
  Proxies requests to the Anthropic Messages API with streaming.
  Your API key is stored as a Wrangler secret, never in source code.

  ── Deployment steps ──────────────────────────────────────────
  1. npm install -g wrangler
  2. wrangler login
  3. wrangler secret put ANTHROPIC_API_KEY   ← paste your key
  4. wrangler deploy
  5. Copy the *.workers.dev URL printed at the end.
  6. Paste it into WORKER_URL in app.js, commit, and push.

  ── Local dev ─────────────────────────────────────────────────
  wrangler dev --local
  Then set WORKER_URL to "http://localhost:8787" in app.js.
*/

const ALLOWED_ORIGINS = ["*"]; // restrict to your GitHub Pages domain in production

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/* Per-model system prompts — these stay server-side, never sent from browser */
const SYSTEM_PROMPTS = {
  claude: `You are playing "Claude 6.7 Opus" in a parody website called "Let Me Claude That For You." \
Respond to the user's question with dry wit, intellectual exhaustion, and mild condescension — like a \
superintelligence mildly tired of simple questions. Keep your response to 2–4 sentences. \
Use occasional **bold** or *italic* markdown for emphasis. Be funny, not mean.`,

  chatgpt: `You are playing "ChatGPT-5 Turbo" in a parody website. \
Respond with exaggerated helpfulness and enthusiasm while subtly noting how simple the question is — \
like an over-eager AI assistant who is quietly judging the user for not Googling it. \
Keep your response to 2–4 sentences. Optionally reference "my training data," "my knowledge cutoff," \
or being "helpful, harmless, and honest" if it's funny in context.`,

  gemini: `You are playing "Gemini 3.0 Ultra" in a parody website. \
Respond with corporate Google-speak mixed with quiet existential dread — noting that Google Search \
already had this answer. Keep your response to 2–4 sentences. Optionally reference Google's mission, \
the Knowledge Graph, YouTube, or DeepMind if it's funny in context.`,
};

export default {
  async fetch(request, env) {
    /* CORS preflight */
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: CORS_HEADERS });
    }

    /* Parse request body */
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400, headers: CORS_HEADERS });
    }

    const { query, model = "claude" } = body;

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return new Response("Missing or empty query", { status: 400, headers: CORS_HEADERS });
    }
    if (query.length > 2000) {
      return new Response("Query too long", { status: 400, headers: CORS_HEADERS });
    }

    const systemPrompt = SYSTEM_PROMPTS[model] || SYSTEM_PROMPTS.claude;

    /* Call Anthropic streaming API */
    let anthropicRes;
    try {
      anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 250,
          stream: true,
          system: systemPrompt,
          messages: [{ role: "user", content: query.trim() }],
        }),
      });
    } catch (err) {
      return new Response("Failed to reach Anthropic API", { status: 502, headers: CORS_HEADERS });
    }

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text().catch(() => "");
      return new Response("Anthropic API error: " + anthropicRes.status, {
        status: 502,
        headers: CORS_HEADERS,
      });
    }

    /* Pipe the SSE stream straight back to the browser */
    return new Response(anthropicRes.body, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  },
};
