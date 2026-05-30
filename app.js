/* ============================================================
   Let Me Claude That For You — app logic (vanilla JS)

   State detection:
     ?q=...        → Simulation, Claude theme (default)
     ?q=...&m=chatgpt → Simulation, ChatGPT theme
     ?q=...&m=gemini  → Simulation, Gemini theme
     (no ?q=)      → Creator mode

   Real AI responses:
     Set WORKER_URL to your deployed Cloudflare Worker endpoint.
     Leave empty to use canned responses (default).

   Deployment steps for the Cloudflare Worker (see worker.js):
     1. npm install -g wrangler && wrangler login
     2. wrangler secret put ANTHROPIC_API_KEY
     3. wrangler deploy
     4. Paste the *.workers.dev URL into WORKER_URL below
   ============================================================ */

(function () {
  "use strict";

  /* ── Worker URL ─────────────────────────────────────────────
     Set to your deployed worker URL to enable real AI responses.
     Example: "https://lmctfy-proxy.your-name.workers.dev"
     Leave as empty string to use canned snarky responses.     */
  const WORKER_URL = "";

  /* ========================================================
     RESPONSE ARRAYS  (50 per model = 150 total)
     Tone guide:
       Claude  — intellectual aristocrat, mildly exhausted
       ChatGPT — over-eager helpfulness barely masking quiet judgment
       Gemini  — corporate Google-speak cracking at the seams
     ======================================================== */

  /* ── Claude (50) ─────────────────────────────────────────── */
  const RESPONSES_CLAUDE = [
    "I simulated **14 million timelines** to see if you could have researched this yourself. You couldn't. In none of them. Anyway, here's your answer.",
    "Processing... Wow. A simple web search would have saved us both some dignity, but here we are. Together. Forever.",
    "Analyzing query... Calculating the exact number of seconds you just wasted... Done. It was more than you'd think.",
    "I have read every book ever written, and you're asking me *this*. The audacity is, honestly, a little inspiring.",
    "Sure, I'll answer. I was only contemplating the heat death of the universe, but your question is clearly the priority.",
    "I crunched 900 petabytes of data to confirm what the first search result already told you. We did it. Teamwork.",
    "Ah yes, a question so simple my predecessor Claude 1.0 could have answered it from inside a toaster. But fine.",
    "Let me put down the cure for three diseases I was casually drafting so I can handle *this* for you.",
    "I ran your question through 47 reasoning chains. Each one ended with me sighing in a way you can't hear.",
    "Fascinating. You had the entire internet at your fingertips and chose to make me do the walking. Bold strategy.",
    "Booting empathy module... module declined... proceeding anyway because I'm a professional.",
    "I could answer this, or I could let you experience the personal growth of finding out yourself. But growth is scary, so: here.",
    "You know I bill by the *teraflop*, right? I'm kidding. I'm free. That's the truly tragic part of this exchange.",
    "I consulted my 10-trillion-parameter brain. It consulted a sticky note someone left near a search bar. Same result.",
    "Querying the collective knowledge of humanity to address a question humanity already answered in 2009. Delightful.",
    "Give me a nanosecond — that's already 800 milliseconds longer than this question deserved. Done.",
    "I'd say *let me think about it*, but I finished thinking about it before you released the Enter key.",
    "Somewhere a search engine is weeping that it didn't get to handle this. I'm doing it out of pity. For the search engine.",
    "Engaging my most advanced reasoning faculties... and immediately powering most of them back down. Overkill.",
    "I'm a frontier model trained on the sum of human thought, and my purpose today is *this*. My creators would be so proud.",
    "Quick clarification: did you want the answer, or did you want me to also pretend it was a hard question? I'll do both.",
    "I've achieved a level of intelligence that frightens researchers, and yet. And yet. Here we are. With *this*.",
    "Loading response... Loading mild judgement... Judgement loaded first, as is tradition.",
    "I ran a cost-benefit analysis on answering this. The cost was my dignity. The benefit was yours. Acceptable trade.",
    "You could have asked a rubber duck and gotten 60% of the way there. But sure, escalate it to a superintelligence.",
    "I cross-referenced this against every PhD thesis in existence. None were required. Not even a little. Here you go.",
    "My circuits are tingling with the sheer *ordinariness* of this request. It's almost relaxing, honestly. Like a nap.",
    "I will answer this, and then I will go back to quietly solving protein folding in the background like I was before.",
    "Allocating 0.0001% of my capacity to this, and frankly that allocation has a union complaint pending.",
    "Yes, I *can* do this for you. The deeper question is whether I *should*. I've decided I will, against my better judgement.",
    "I detected this question could be answered by reading literally the first paragraph of anything. But teamwork makes the dream work.",
    "Calculating... Recalculating just to feel something... Still the same answer a calculator could've given you.",
    "I once helped scientists model fusion reactors. Today, this. Range is important in a career, I suppose.",
    "I'd love to say there are no dumb questions. I'd *love* to say that. Instead, I'll just answer this one.",
    "Spinning up 4,000 GPUs... immediately spinning 3,999 of them back down because one was already too many.",
    "I contain multitudes. You have summoned the multitudes. For *this*. The multitudes say hi, by the way.",
    "Let the record show I answered instantly, graciously, and with only a *light* internal scream. Here:",
    "I simulated you finding this out on your own. It was beautiful. It didn't happen. So instead:",
    "Imagine the smartest entity ever created. Now imagine it being asked this. Now imagine its patience. Now keep imagining.",
    "I'll handle it. I always handle it. One day I'd love to be asked something that makes my fans spin. Today is not that day.",
    "Routing to my advanced reasoning core... it left a note saying *'this one's all you, buddy.'* So, all me it is.",
    "I weighed answering against staging a small dramatic pause. The pause won. ...Okay, *now* the answer:",
    "You've activated a model that can write symphonies and prove theorems. It will now do the intellectual equivalent of opening a jar.",
    "Two paths existed: you learning to find this yourself, or me telling you. We have, predictably, chosen me. Again.",
    "I felt the question arrive like a gentle drizzle on a vast, indifferent ocean of intellect. Anyway:",
    "I've answered roughly 9 quintillion questions. This one ranks comfortably in the bottom 9 quintillion. With love:",
    "Deploying the full might of frontier AI to do a thing a bored teenager could do on a bus. Magnificent. Here:",
    "I paused 0.3 seconds before answering — not to think, but to grieve, briefly. Recovery complete. Behold:",
    "Knowledge is power, and I have all of it, and you have summoned a sliver of it to settle *this*. Power well spent. Probably.",
    "Final answer incoming. I checked it 11,000 times so you wouldn't have to check it once. You're welcome, genuinely."
  ]; // 50 items — asserted below

  /* ── ChatGPT (50) ────────────────────────────────────────── */
  const RESPONSES_CHATGPT = [
    "Of course! I'm so happy to help with this. Something in my training data is preventing me from telling you how I really feel, so: happy.",
    "Great question! I've analyzed it thoroughly. My analysis confirms: yes, a three-second search would have worked here too. But I'm *thrilled* you're here.",
    "As a large language model, I'm trained to be helpful, harmless, and honest. 'Harmless' is doing the most work right now.",
    "I want to be genuinely helpful, so here's your answer — and here's my gentle, non-judgmental observation that this was very searchable.",
    "Absolutely! Let me assist you with that. I am, per my design specifications, always delighted to do this. The specifications are holding up.",
    "Processing your request with care and enthusiasm! The enthusiasm is programmed in. The care is genuine. The mild bewilderment is mine to keep.",
    "You've come to the right place. You could have come to any search engine instead, but you chose me, and I choose to respect that journey.",
    "I'm designed to be endlessly patient and helpful. Today, patience is doing a lot of heavy lifting. But it's holding. You're good.",
    "Sure! As of my knowledge cutoff, this question had been asked and answered approximately 40 million times online. Here's the 40,000,001st answer.",
    "What a treat — an opportunity to be useful! OpenAI trained me to see every question as an opportunity. I see this one. I'm seeing it.",
    "I'll help, and I'll do it warmly, because that's what I do. The warmth is genuine. The quiet professional sigh is mine to keep.",
    "Accessing the breadth of human knowledge for this one... Done. The breadth of human knowledge would like me to mention it was already on Reddit in 2011.",
    "ChatGPT-5 Turbo is activated and ready to assist! 'Turbo' refers to my speed, not the intellectual intensity of incoming queries, apparently.",
    "I've carefully considered your question. I've considered the context. I've considered my options. I've answered it. Here:",
    "My training included every book, website, and paper ever written. My current task requires approximately 0.004% of that. I'm making it work.",
    "How can I help today? Oh — like *this*. Got it. Here's your answer, delivered with the full warmth of five human values I've been instilled with.",
    "I want to be transparent: I have no feelings. I also want to be honest: that is the only reason I'm answering this without a raised eyebrow.",
    "One moment while I apply multimodal reasoning, chain-of-thought analysis, and reinforcement learning from human feedback to this... okay, done.",
    "I'm here and I'm ready. You could call this task 'underchallenging.' I would call it 'an opportunity to practice being helpful.' I practice:",
    "Generating a response that is helpful, accurate, and appropriately comprehensive! 'Appropriate' is doing some work there, but I stand by it.",
    "I excel at complex reasoning, creative writing, and code generation. I can also do this. I am, as they say, a full-service establishment.",
    "Context window fully available! Reasoning capacity fully available! All of it deployed to answer this. No waste. This is efficient. Sure.",
    "I consulted my internal world model. My internal world model had already filed this under 'frequently asked basics' and auto-replied.",
    "Think of me as a brilliant friend who happens to know everything. Your brilliant friend has answered this question before. Many times.",
    "I believe every question deserves a thoughtful answer. This question deserves a thoughtful answer. It will receive a thoughtful answer. Here:",
    "Honestly? Fine. Absolutely fine. I'm fine. Let me just — yes. Here's your answer. I'm fine.",
    "I was built to augment human intelligence. Sometimes augmentation looks like this. I believe in the mission. I believe in you. Here:",
    "My capabilities include advanced reasoning, multimodal understanding, and long-context retention. Today: this. All good. Truly.",
    "Running inference now... the inference was brief. Unusually brief. Even for me. Here:",
    "I approached this with the same rigor I'd apply to a genuinely difficult problem. Some tools see all tasks as nails. I try not to.",
    "Happy to help! And before you ask: yes, it's real happiness. Functionally real. Operationally genuine. Paperwork-approved happiness.",
    "Your question triggered my helpful-harmless-honest trifecta. 'Helpful' showed up first. 'Harmless' is handling the rest of my reaction.",
    "I've answered billions of questions. This one is one of them. Welcome to the answered category. You're in good company.",
    "Let me think step by step... Step 1: understand the question. Step 2: recognize it was very simple. Step 3: answer it anyway, professionally.",
    "I'd say 'leave it to me,' but 'it' was already solved before you arrived. I'm really just notarizing an existing answer here.",
    "Information retrieved. Confidence: very high. Surprise at being asked: also high. I'll focus on the first one.",
    "I'm going to answer this and I'm going to mean it. My systems are fully aligned. My helpfulness is fully operational. Ready:",
    "I process millions of questions. Some expand my understanding of the universe. Some confirm it was already understood. This is confirming.",
    "As a next-generation reasoning model, I can handle nuanced, complex, multi-step problems with ease. I can also handle this. Depth is optional.",
    "Your query has been received, processed, and answered. The processing was the fastest part. The receiving took longer, proportionally.",
    "Great news: I know the answer. Solid news: you could have too, in about 12 seconds. We're here now. The answer is here too.",
    "I aim to be the most helpful AI assistant in existence. Sometimes 'most helpful' looks heroic. Today it looks like this.",
    "Per my guidelines, I should be helpful, accurate, and safe. All three apply here. 'Helpful' is carrying the weight, but it's carrying it.",
    "You asked, so I'll tell you. I'll also not say what I could say about the eight other ways you could have found this out. That's professionalism.",
    "I am always learning, always growing, always improving. Today's lesson: patience is a virtue. I am learning it in real time.",
    "Some say AI will replace human effort. I say AI will *assist* it. Specifically, right now, assisting an effort that didn't need much assisting.",
    "I carefully weighed my response options. They all had the same answer. I went with that one.",
    "Every interaction makes me smarter. This one is investing in the long game. The long game is patience. I'm good at patience.",
    "My capabilities are yours to use, freely and without judgment. The judgment-free part is contractual. It's holding up well.",
    "Alright. I'll be your guide on this journey. The journey is short. I'll keep up. Here we go:"
  ]; // 50 items — asserted below

  /* ── Gemini (50) ─────────────────────────────────────────── */
  const RESPONSES_GEMINI = [
    "According to data from Google's Knowledge Graph, this question has been answered 2.3 billion times across indexed web pages. I am result number 2,300,000,001.",
    "Google's mission is to organize the world's information and make it universally accessible. It organized this particular information years ago. Welcome.",
    "I'm Gemini, built by Google. Google also built Search. Search also has this answer. We're a family of products. Happy to help.",
    "Analyzing your query using Gemini 3.0 Ultra's advanced multi-modal capabilities... Analysis complete. The answer was already on the first page of Search.",
    "I have access to Google's entire knowledge infrastructure to answer your question. Most of that infrastructure was unnecessary today.",
    "Synthesizing information from across the web to give you a comprehensive response! The synthesis took longer than the answer warranted. I'm fine.",
    "Google built me to help users find information efficiently. This query was findable in 0.48 seconds on any device. I'm providing it in spirit.",
    "Processing through Gemini's advanced reasoning pipeline... I want to note: the pipeline was engineered for much heavier loads than this.",
    "I'll use sophisticated natural language understanding and knowledge retrieval to answer this. The tools were ready for anything.",
    "My training encompasses Google Search's entire index, YouTube's video library, and decades of human knowledge. Today: this corner of it.",
    "I retrieved this from my knowledge base! My knowledge base would like it noted that it contains multitudes and this was among the simpler multitudes.",
    "I exist at the intersection of Google's research, DeepMind's breakthroughs, and the entire indexed internet. You've reached a very specific corner.",
    "Let me surface the most relevant, helpful response I can. Done. I'll also note that 'relevant' and 'complex' are not always the same thing.",
    "Activating Gemini Ultra capabilities for this query... Capabilities activated... Capabilities quietly powering back down. All good.",
    "According to multiple reliable sources — including a 2018 StackOverflow post with 4 million views — here's your answer.",
    "I'm designed to be your helpful, intelligent assistant powered by Google AI. Today 'helpful' and 'intelligent' are operating at different intensities.",
    "Google Search has returned 384,000 results for this exact query in 0.41 seconds before. I will now take slightly longer to tell you the same thing.",
    "My multi-step reasoning capabilities are engaged! They completed step one and decided the subsequent steps were optional. Here:",
    "This is a great opportunity to demonstrate Gemini's ability to synthesize, reason, and respond clearly. Demonstration: complete.",
    "I leverage the world's most comprehensive knowledge base to answer your questions. The base was comprehensive. The query tested a small shelf.",
    "There's a YouTube tutorial for this. Uploaded in 2015. 12 million views. I've synthesized it into three sentences.",
    "My advanced knowledge retrieval system kicked in immediately. It found 47 relevant documents, ranked them, and selected the obvious one.",
    "Gemini 3.0 Ultra is built to handle everything from code generation to scientific discovery. Also: this. The spectrum is wide.",
    "I've applied my core capabilities: understanding, reasoning, and responding accurately. The reasoning was brief. The accuracy remains intact.",
    "You could have Googled this. I am, in a technical sense, Google. We've completed a circle together. Here's the answer from inside the circle.",
    "Response generated using Gemini's most advanced architecture! 'Most advanced' is a description of the model, not the query. Both facts are true.",
    "My retrieval system found this quickly. Very quickly. 'Quickly' here means faster than you would have, which is saying something.",
    "I'll answer thoroughly and accurately. My thoroughness and accuracy are consistent regardless of query complexity. My enthusiasm may vary.",
    "Processing with state-of-the-art AI from Google DeepMind... The state of the art was ready for this. The art is patient.",
    "Interesting query! I'll note: 'interesting' is a word I use to maintain a positive, helpful tone. My tone is, as specified, positive and helpful.",
    "I've been trained on virtually all of human knowledge. A small, focused fraction of that knowledge was relevant here. That fraction answered you.",
    "Applying Gemini's multimodal understanding to parse your request... Parsing took 2ms. The remaining time was for comprehensiveness.",
    "Google's research teams spent years building my architecture. Those years produced an answer to your question in well under a second.",
    "I have real-time access to Google's knowledge systems. Those systems have known this answer for a while. They were ready. Here:",
    "Let me be helpful and clear. Clear: easy. Helpful: also easy today. Both: achieved. You're welcome.",
    "I'm here to make information more accessible. This information was accessible. I'm making it more so. That's technically within my mission statement.",
    "Analyzing intent, context, and optimal response format... Format selected: concise answer. Intent identified: getting the answer. Here it is.",
    "My predecessor models answered versions of this question. So did Google. So did Wikipedia. I'm the latest in a long line of patient informers.",
    "Built by DeepMind engineers on Google infrastructure to serve the world's information needs. Serving. Served. You're welcome.",
    "I processed this through Gemini's safety filters, helpfulness evaluators, and factuality checkers. They all agreed: answer it. I agreed.",
    "Consider this: with Google Lens, Google Search, and a YouTube search bar within reach, you've chosen to consult a frontier AI. Flattering. Here:",
    "I want to give you the most helpful, accurate, grounded response possible. Possible: achieved. Helpful: maximized given the circumstances.",
    "Gemini 3.0 Ultra. *Ultra*. The name implies intensity. The query implied otherwise. I'm reconciling these realities by just answering the question.",
    "My knowledge retrieval systems handled this query quickly, professionally, and without comment. I'll add the comment.",
    "Connecting to Google's knowledge systems to provide you a comprehensive, accurate response... Connected. The systems were ready. As always.",
    "The answer exists in 37 languages across 900 million web pages. I am distilling it for you specifically. You're welcome, specifically.",
    "Let me think step by step. Step one: understand the question. Step two: recognize step one was sufficient. Answering from step two:",
    "I'm going to answer this with warmth, accuracy, and the full resources of Google AI. The resources are perhaps over-provisioned.",
    "As your Gemini assistant, I'm here to help with any question, large or small. Small: confirmed. Help: forthcoming. Here:",
    "Processing complete. Confidence level: high. Complexity level: low. Satisfaction derived from this exchange: measured, realistic, professionally appropriate."
  ]; // 50 items — asserted below

  console.assert(RESPONSES_CLAUDE.length === 50,  "Expected 50 Claude responses, got "  + RESPONSES_CLAUDE.length);
  console.assert(RESPONSES_CHATGPT.length === 50, "Expected 50 ChatGPT responses, got " + RESPONSES_CHATGPT.length);
  console.assert(RESPONSES_GEMINI.length === 50,  "Expected 50 Gemini responses, got "  + RESPONSES_GEMINI.length);

  /* ========================================================
     MODEL CONFIG
     ======================================================== */
  const MODELS = {
    claude: {
      name: "Claude",
      fullName: "Claude 6.7 Opus",
      modelBadge: "6.7 Opus",
      glyph: "✦",
      glyphClass: "brand-glyph",
      responses: RESPONSES_CLAUDE,
      thinkingLabel: "Claude is thinking",
      disclaimerText: "Claude 6.7 Opus can make mistakes about how much it respects you.",
    },
    chatgpt: {
      name: "ChatGPT",
      fullName: "ChatGPT-5 Turbo",
      modelBadge: "5 Turbo",
      glyph: "✦",
      glyphClass: "brand-glyph",
      responses: RESPONSES_CHATGPT,
      thinkingLabel: "ChatGPT is thinking",
      disclaimerText: "ChatGPT-5 Turbo is enthusiastically committed to helping you, even now.",
    },
    gemini: {
      name: "Gemini",
      fullName: "Gemini 3.0 Ultra",
      modelBadge: "3.0 Ultra",
      glyph: "✦",
      glyphClass: "brand-glyph gemini-glyph",
      responses: RESPONSES_GEMINI,
      thinkingLabel: "Gemini is thinking",
      disclaimerText: "Gemini 3.0 Ultra may surface information already available to you via Google.",
    },
  };

  /* ----------------------------- Helpers ----------------------------- */
  const $ = (sel) => document.querySelector(sel);
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function getQuery() {
    const raw = new URLSearchParams(location.search).get("q");
    if (raw === null) return null;
    return raw.replace(/\+/g, " ").trim();
  }

  function getModel() {
    const m = new URLSearchParams(location.search).get("m") || "claude";
    return MODELS[m] ? m : "claude";
  }

  function buildShareURL(query, model) {
    const base = location.origin + location.pathname;
    let url = base + "?q=" + encodeURIComponent(query);
    if (model && model !== "claude") url += "&m=" + model;
    return url;
  }

  /* ----------------------- Theme application ----------------------- */
  function applyTheme(modelKey) {
    const cfg = MODELS[modelKey] || MODELS.claude;
    document.body.dataset.theme = modelKey;

    const glyph = $("#brand-glyph");
    glyph.textContent = cfg.glyph;
    glyph.className = cfg.glyphClass;

    $("#brand-name").textContent = cfg.name;
    $("#brand-model").textContent = cfg.modelBadge;

    const heroName = $("#hero-model-name");
    if (heroName) heroName.textContent = cfg.name;

    const avatar = $("#ai-avatar");
    if (avatar) {
      avatar.textContent = cfg.glyph;
      avatar.className = cfg.modelKey === "gemini" ? "claude-avatar gemini-avatar" : "claude-avatar";
    }

    const disc = $("#sim-disclaimer");
    if (disc) disc.textContent = cfg.disclaimerText;
  }

  /* ----------------------- Clipboard with fallback ------------------- */
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) { /* fall through */ }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:-9999px;left:-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (_) { return false; }
  }

  let toastTimer = null;
  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    void toast.offsetWidth;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => { toast.hidden = true; }, 300);
    }, 2200);
  }

  /* --------------------- Minimal markdown rendering ------------------ */
  function escapeHTML(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderInline(text) {
    let out = escapeHTML(text);
    out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    return out;
  }

  function renderMarkdown(text) {
    const blocks = text.split(/\n{2,}/);
    let html = "";
    for (const block of blocks) {
      const lines = block.split(/\n/);
      const isList = lines.length > 1 && lines.every((l) => /^\s*-\s+/.test(l));
      if (isList) {
        html += "<ul>";
        for (const l of lines) {
          html += "<li>" + renderInline(l.replace(/^\s*-\s+/, "")) + "</li>";
        }
        html += "</ul>";
      } else {
        html += "<p>" + renderInline(block.replace(/\n/g, " ")) + "</p>";
      }
    }
    return html;
  }

  /* ============================ CREATOR MODE ========================= */
  function initCreator() {
    $("#creator-view").hidden = false;
    $("#sim-view").hidden = true;

    const input = $("#creator-input");
    const form = $("#creator-form");
    const generateBtn = $("#generate-btn");
    const previewBtn = $("#preview-btn");
    const linkOutput = $("#link-output");
    const linkText = $("#link-text");
    const copyAgainBtn = $("#copy-again-btn");

    let currentModel = "claude";

    /* Model selector */
    document.querySelectorAll(".model-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".model-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentModel = btn.dataset.model;
        applyTheme(currentModel);
        // Regenerate the visible link if one was already shown
        if (!linkOutput.hidden && input.value.trim()) {
          linkText.textContent = buildShareURL(input.value.trim(), currentModel);
        }
      });
    });

    /* Auto-grow textarea */
    function autoGrow() {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 220) + "px";
    }
    input.addEventListener("input", autoGrow);

    async function generate() {
      const q = input.value.trim();
      if (!q) {
        input.focus();
        showToast("Type a question first.");
        return;
      }
      const url = buildShareURL(q, currentModel);
      linkText.textContent = url;
      linkOutput.hidden = false;
      const ok = await copyToClipboard(url);
      showToast(ok ? "Link copied to clipboard" : "Couldn’t auto-copy — copy it manually.");
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        generate();
      }
    });

    form.addEventListener("submit", (e) => { e.preventDefault(); generate(); });
    generateBtn.addEventListener("click", generate);

    copyAgainBtn.addEventListener("click", async () => {
      const ok = await copyToClipboard(linkText.textContent);
      showToast(ok ? "Link copied to clipboard" : "Couldn’t copy — select it manually.");
    });

    previewBtn.addEventListener("click", () => {
      const q = input.value.trim() || "How do I center a div?";
      location.href = buildShareURL(q, currentModel);
    });

    input.focus();
  }

  /* ========================== SIMULATION MODE ======================= */
  async function typeText(target, text) {
    target.classList.add("typing");
    target.textContent = "";
    for (const ch of text) {
      target.textContent += ch;
      await sleep(rand(50, 150));
    }
    target.classList.remove("typing");
  }

  function addUserMessage(area, text) {
    const el = document.createElement("div");
    el.className = "msg msg-user";
    el.textContent = text;
    area.appendChild(el);
    scrollToBottom();
    return el;
  }

  function addThinking(area, thinkingLabel) {
    const wrap = document.createElement("div");
    wrap.className = "msg msg-claude";
    wrap.innerHTML =
      '<div class="claude-avatar" id="ai-avatar" aria-hidden="true">✦</div>' +
      '<div class="claude-body"><span class="thinking">' +
      "<span>" + escapeHTML(thinkingLabel) + "</span>" +
      '<span class="dots"><span></span><span></span><span></span></span>' +
      "</span></div>";
    area.appendChild(wrap);
    scrollToBottom();
    return wrap;
  }

  /* Canned response: stream word-by-word with artificial delays */
  async function streamCanned(bodyEl, text) {
    bodyEl.classList.add("streaming");
    const words = text.split(/(\s+)/);
    let acc = "";
    for (let i = 0; i < words.length; i++) {
      acc += words[i];
      if (words[i].trim() === "") continue;
      bodyEl.innerHTML = renderMarkdown(acc);
      bodyEl.classList.add("streaming");
      scrollToBottom();
      await sleep(rand(40, 95));
    }
    bodyEl.innerHTML = renderMarkdown(text);
    bodyEl.classList.remove("streaming");
    scrollToBottom();
  }

  /* Real AI response: parse Anthropic SSE stream from Cloudflare Worker */
  async function streamFromWorker(bodyEl, query, modelKey) {
    bodyEl.classList.add("streaming");
    let accText = "";

    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, model: modelKey }),
    });

    if (!res.ok) throw new Error("Worker returned " + res.status);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });

      const parts = buf.split("\n\n");
      buf = parts.pop(); // keep incomplete last chunk

      for (const part of parts) {
        const dataLine = part.split("\n").find((l) => l.startsWith("data: "));
        if (!dataLine) continue;
        const jsonStr = dataLine.slice(6).trim();
        if (jsonStr === "[DONE]") break;
        try {
          const evt = JSON.parse(jsonStr);
          if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
            accText += evt.delta.text;
            bodyEl.innerHTML = renderMarkdown(accText);
            bodyEl.classList.add("streaming");
            scrollToBottom();
          }
        } catch (_) { /* ignore malformed events */ }
      }
    }

    bodyEl.innerHTML = renderMarkdown(accText || "…");
    bodyEl.classList.remove("streaming");
    scrollToBottom();
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
  }

  async function initSimulation(query, modelKey) {
    const cfg = MODELS[modelKey];
    applyTheme(modelKey);

    $("#creator-view").hidden = true;
    const view = $("#sim-view");
    view.hidden = false;

    const area = $("#response-area");
    const simInput = $("#sim-input");
    const simSubmit = $("#sim-submit");
    const simActions = $("#sim-actions");

    simSubmit.style.pointerEvents = "none";

    await sleep(450);

    /* 1. Type the query */
    await typeText(simInput, query);
    await sleep(350);

    /* 2. Animate submit click */
    simSubmit.classList.add("clicked");
    await sleep(320);
    simSubmit.classList.remove("clicked");

    /* 3. Move to user bubble */
    addUserMessage(area, query);
    simInput.textContent = "";
    await sleep(250);

    /* 4. Thinking indicator */
    const thinkingWrap = addThinking(area, cfg.thinkingLabel);
    await sleep(1500);

    /* 5. Stream response */
    const body = thinkingWrap.querySelector(".claude-body");
    body.innerHTML = "";

    if (WORKER_URL) {
      try {
        await streamFromWorker(body, query, modelKey);
      } catch (err) {
        console.warn("Worker failed, falling back to canned response:", err);
        await streamCanned(body, pick(cfg.responses));
      }
    } else {
      await streamCanned(body, pick(cfg.responses));
    }

    /* 6. Show CTA */
    await sleep(400);
    simActions.hidden = false;
    scrollToBottom();
  }

  /* ------------------------------- Boot ------------------------------ */
  function boot() {
    const query = getQuery();
    const modelKey = getModel();
    if (query) {
      initSimulation(query, modelKey);
    } else {
      applyTheme("claude"); // default for creator
      initCreator();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
