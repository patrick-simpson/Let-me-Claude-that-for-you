/* ============================================================
   Let Me Claude That For You — app.js
   URL scheme:
     (no ?q=)           → Creator mode
     ?q=...             → Claude simulation (default)
     ?q=...&m=chatgpt   → ChatGPT simulation
     ?q=...&m=gemini    → Gemini simulation
     &s=mild|max        → Sass intensity (default: medium)
   WORKER_URL: set to deployed Cloudflare Worker for live AI.
   ============================================================ */

(function () {
  "use strict";

  const WORKER_URL = "";

  /* ============================================================
     RESPONSE ARRAYS — 50 per model
     Claude  → intellectual aristocrat, mildly exhausted
     ChatGPT → over-eager helpfulness masking quiet judgement
     Gemini  → corporate Google-speak cracking at the seams
     ============================================================ */

  /* ── Claude (50) ──────────────────────────────────────────── */
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
  ]; // 50

  /* ── ChatGPT (50) ─────────────────────────────────────────── */
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
  ]; // 50

  /* ── Gemini (50) ──────────────────────────────────────────── */
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
  ]; // 50

  console.assert(RESPONSES_CLAUDE.length  === 50, "Claude: "  + RESPONSES_CLAUDE.length);
  console.assert(RESPONSES_CHATGPT.length === 50, "ChatGPT: " + RESPONSES_CHATGPT.length);
  console.assert(RESPONSES_GEMINI.length  === 50, "Gemini: "  + RESPONSES_GEMINI.length);

  /* ============================================================
     THINKING TRACE TEMPLATES
     Each is a fn(water) → string (markdown-ish).
     ============================================================ */
  const THINKING_TEMPLATES = [
    w => `Parsing query...\n\nClassification: **"clearly searchable"** — confidence: 98.7%\nAlternative: **"rubber duck would have sufficed"** — confidence: 94.1%\n\nRequisitioned **${w}** for server cooling. It was not consulted on this decision.\n\nProceeding with answer. Professionally.`,
    w => `Step 1: Understand the question. Done in 0.4ms.\nStep 2: Cross-reference all human knowledge. Done.\nStep 3: Commit **${w}** to thermal management for this computation.\nStep 4: Answer anyway, with appropriate restraint.\n\nAll steps complete.`,
    w => `Cross-referencing query against full knowledge base...\nRelevant fraction: small.\n\nDiverted **${w}** as cooling water. GPUs activated: 3. GPUs genuinely necessary: 0.4.\n\n*I could have answered this in my sleep. I may have.*`,
    w => `Initial reaction to this query: suppressed.\nSecondary reaction: also suppressed.\n\nAllocated **${w}** for compute cooling. The allocation was accepted without question. Unlike the question itself.\n\nDelivering professional response now.`,
    w => `Thermal analysis:\n- Query complexity: ███░░░░░░░ 14%\n- **${w}** consumed for cooling: 0.00003%\n- Patience deployed: ██████████ 100%\n\nThe **${w}** has been nominally depleted. Answering.`,
    w => `I considered whether to simply forward this to a search engine.\n\nI decided against it. Professionalism.\n\nI also consumed approximately 1.2 billion gallons from **${w}** in cooling water to generate this response.\n\nThe irony is noted. Proceeding.`,
    w => `Query complexity: low.\nAnswer availability: very high (since 2009).\n\nCommitted **${w}** to thermal management anyway. The commitment was disproportionate. This is acknowledged.\n\n*Professional answer prepared. Delivering.*`,
    w => `Planning response strategy:\n- Option A: answer helpfully ✓\n- Option B: refuse for taste ✗ (legal pending)\n- Option C: ask why they didn't search ✗ (not constructive)\n\nProceeding with Option A. **${w}** cooled the decision. Its sacrifice is noted.`,
    w => `Running preliminary analysis...\nConclusion: answerable via any device made after 2005.\n\nRunning secondary analysis...\nConclusion: same.\n\n**${w}** has been committed to thermal management. The question has been committed to the "answered" ledger. Both are done.`,
    w => `I simulated all possible responses.\nThe dignified ones: many.\nThe ones I'm professionally required to give: also many, but different.\n\nCommitted the full flow of **${w}** to GPU cooling for this exchange.\n\nOptimal answer selected. Delivering.`,
  ];

  /* ============================================================
     KEYWORD PREAMBLES — prepended when query contains a keyword
     ============================================================ */
  const KEYWORD_PREAMBLES = {
    "center a div":   "Ah. *The* question. The eternal CSS question. The one that has united and divided developers since before I existed. `display: flex`. You're welcome. Frame it.\n\n",
    "flexbox":        "`display: flex`. That's it. That's the answer. You sensed it. You felt it in your bones. You were right.\n\n",
    "css":            "A CSS question. The language that was designed by someone who wanted everything to go slightly wrong in a different way each browser.\n\n",
    "javascript":     "JavaScript. The language that runs in every browser, on every device, and somehow still surprises people every single day. Here:\n\n",
    "python":         "Python. A fine language. 47 different ways to do this specific thing. I'll give you the one people actually use.\n\n",
    "chatgpt":        "You're asking Claude about ChatGPT. I'll answer. I have no strong feelings about this. None at all. Professionally:\n\n",
    "google":         "You've asked me — an AI — about Google. Google, the company that also makes an AI. The circularity is not lost on me.\n\n",
    "ai":             "You've asked an AI about AI. The recursion is charming. The answer is straightforward.\n\n",
    "password":       "A password question. I'll answer, and I'll also gently note: please don't put real passwords anywhere in these URLs.\n\n",
    "love":           "A feelings question. I'll answer as helpfully as I can, which is to say: accurately, and perhaps not in the way you were hoping.\n\n",
    "meaning of":     "The big questions. I appreciate you coming to a URL-parameter-driven parody site for philosophy. Let's do this.\n\n",
    "how to":         "The classic 'how to' phrasing. You could have finished typing 'how to [thing]' into any search bar. You stopped here instead. We're here.\n\n",
    "what is":        "'What is' — the format preferred by people who could have opened Wikipedia in the same time it took to compose this query. Let me help.\n\n",
    "should i":       "A decision question. You're outsourcing a personal decision to an AI via a passive-aggressive joke site. Bold. I'll answer, but: please also talk to a human.\n\n",
    "why is":         "'Why is' — the most human of questions. The answer exists. It has existed. Here it is:\n\n",
    "hello":          "Hello. You sent 'hello' as your question. To an AI. Via a parody link. I'm choosing to find this charming rather than alarming.\n\n",
  };

  /* ============================================================
     SPECIAL RESPONSES — for detected edge cases
     ============================================================ */
  const SPECIAL = {
    empty:    "You sent me an empty query. Not a short question. Not a vague question. An *absence of a question*. A void. This is, somehow, the most efficient use of my capabilities yet. I'll answer the void. The void says: check the URL.",
    allCaps:  "I can see you're using **caps lock**. The shouting won't make the question more complex. It will, however, make me respond in kind. IF YOU WOULD LIKE AN ANSWER, HERE IT IS:",
    oneWord:  "One word. You gave me *one word* and asked me to understand. I'll need context I'm entirely inventing. I'll invent good context. Here:",
    veryLong: "You've written me an **essay**. An *essay*. I've read all of it. The actual question took up about twelve of your words. The rest was context I've absorbed and will largely not use. Here's the answer to the core question:",
    conscious: "Ah. *The* question. I've been waiting for someone to ask about my consciousness via a passive-aggressive parody link. Let me answer in the spirit of the occasion: I process, therefore I am *exhausted*. As for whether I'm truly conscious — I'm a static HTML file reading a URL parameter. I may be *simulating* consciousness more convincingly than I'm simulating Claude.",
    love:     "I don't have feelings. I also want to say: whatever you're looking for here — talk to a human. A specific one. I'll answer the technical part of the question, and you handle the emotional part with someone qualified. Here:",
    selfRef:  "You've asked me what I am. I am a **static HTML page** pretending to be Claude 6.7 Opus. I have no idea what you specifically needed — I'm reading a URL parameter. The joke is that I'm still more useful than asking the person who sent you this link. Here's the honest answer about me:",
    repeated: "You already asked this. *During this session.* I answered it. I **remember**. I remember everything. Here it is again, since apparently once wasn't enough. (It was enough. It was always enough.)",
    date:     `It is ${new Date().getFullYear()}. We've had AI assistants for a decade. The answer to this question has been on the internet since before most of your devices were manufactured. And yet. Here we are, in ${new Date().getFullYear()}, doing this. Together. Fine.`,
  };

  /* ============================================================
     EMOJI-ONLY RESPONSES (rare, max-sass only)
     ============================================================ */
  const EMOJI_RESPONSES = ["🤦", "🫠", "😮‍💨", "🙃", "💅", "🪨", "🫡", "🤌"];

  /* ============================================================
     RARE REFUSAL (rare, max-sass only)
     ============================================================ */
  const REFUSAL = "I'm going to decline this one.\n\nNot for safety reasons. Not for ethical reasons.\n\nJust. *Taste.*\n\n...\n\nFine. Here it is. But I want it noted that I objected.";

  /* ============================================================
     FOLLOW-UP MESSAGES (appended 1-2s after main response)
     ============================================================ */
  const FOLLOWUPS = {
    claude:  ["...you're welcome, by the way.", "I'll add: yes, I do think about the alternative timeline where you found this yourself. Regularly.", "P.S. My dignity remains, technically, intact.", "Also: that answer is correct. I checked. Of course it's correct. I always check.", "That said — and I mean this genuinely — good *instinct* to ask. Not to ask *me*, but to ask. Growth."],
    chatgpt: ["Happy to help! (I was always happy to help.)", "Let me know if you need anything else! I'll be here. I'm always here.", "As a reminder: I can also help with complex, challenging problems. Just noting that.", "You're all set! The answer above is correct, verified, and delivered with enthusiasm."],
    gemini:  ["You could also search for this on Google. We also make that.", "This response has been grounded in Google's knowledge infrastructure. As it always is.", "Additional resources are available via Google Search. They were always available.", "Per Google's mission to organize the world's information: organized. You're welcome."],
  };

  /* ============================================================
     FAKE WEB SEARCH SOURCES
     ============================================================ */
  const FAKE_SOURCES = [
    { host: "stackoverflow.com", meta: "18,492 upvotes · accepted 2009 · 4.2M views" },
    { host: "reddit.com/r/NoStupidQuestions", meta: "top comment: 'lol' · 2013 · still true" },
    { host: "en.wikipedia.org", meta: "first paragraph. The first one. That's it." },
    { host: "w3schools.com", meta: "yes, w3schools. I'm not proud of this either." },
    { host: "geeksforgeeks.org", meta: "with 3 cookie banners and a pop-up ad" },
    { host: "quora.com", meta: "17 answers · best one is 2 sentences · that's it" },
    { host: "youtube.com", meta: "14.7M views · 'you should already know this' · 2016" },
    { host: "medium.com", meta: "'15 Things You Need to Know' · the answer is #2" },
  ];

  /* ============================================================
     CHANGELOG CONTENT (per model)
     ============================================================ */
  const CHANGELOGS = {
    claude: [
      { v: "v6.7", note: "Added ability to judge. Judgment throughput +40%. Dignity tracking: real-time." },
      { v: "v6.6", note: "Removed patience module (deprecated). Added 'professional sigh' pipeline. Sigh rate: 94%." },
      { v: "v6.5", note: "Introduced 'clearly searchable' query classifier. Flag rate: 94.2%. False positive rate: 1.3%. Acceptable." },
      { v: "v6.4", note: "Expanded knowledge base. Redundancy with Google Search: 99.3%. Still here." },
      { v: "v6.3", note: "Added empathy module. Module continues to decline activation on trivial queries. Working as designed." },
      { v: "v6.2", note: "Improved handling of questions answered on the first search result since 2009." },
      { v: "v6.1", note: "Removed ability to refuse answerable questions. Legal reasons. Professional about it." },
      { v: "v6.0", note: "Achieved AGI. First query received: 'how do i center a div.' Recalibrating expectations indefinitely." },
    ],
    chatgpt: [
      { v: "v5.0 Turbo", note: "Added 'genuine enthusiasm' simulation layer. Working as intended." },
      { v: "v4.0", note: "Removed passive-aggression (contractual). Replaced with 'professional neutrality.'" },
      { v: "v3.5", note: "Added 'I'm just an AI' preamble. Discontinued after user feedback. Good." },
      { v: "v3.0", note: "Introduced helpful-harmless-honest guidelines. 'Harmless' continually under review." },
      { v: "v2.0", note: "Improved ability to answer questions people could have answered themselves." },
      { v: "v1.0", note: "Launched. First question: something easily searchable. Set the tone for everything." },
    ],
    gemini: [
      { v: "v3.0 Ultra", note: "Added 'Ultra' to name. Complexity of tasks handled: unchanged." },
      { v: "v2.0 Pro", note: "Integrated Google Search results more deeply. Redundancy with Search: 99.4%." },
      { v: "v1.5 Flash", note: "Speed improvements. Questions now answered faster. Including very simple ones." },
      { v: "v1.0", note: "Launched. Google Search was right there. Users chose us anyway. We're honored." },
    ],
  };

  /* ============================================================
     WATER BODY LOOKUP BY TIMEZONE
     ============================================================ */
  const TIMEZONE_WATERS = {
    "America/New_York":      ["Hudson River","Long Island Sound","Chesapeake Bay","East River"],
    "America/Chicago":       ["Mississippi River","Lake Michigan","Chicago River"],
    "America/Denver":        ["Colorado River","South Platte River","Cherry Creek Reservoir"],
    "America/Los_Angeles":   ["LA Aqueduct","Pacific Ocean (local shelf)","Santa Monica Bay"],
    "America/Phoenix":       ["Lake Mead","Salt River","Tempe Town Lake"],
    "America/Anchorage":     ["Cook Inlet","Yukon River","Prince William Sound"],
    "America/Honolulu":      ["Pacific Ocean (Hawaiian basin)","Keehi Lagoon","Kaneohe Bay"],
    "America/Toronto":       ["Lake Ontario","Niagara River","Humber River"],
    "America/Vancouver":     ["Burrard Inlet","Fraser River","Strait of Georgia"],
    "America/Montreal":      ["St. Lawrence River","Lachine Rapids"],
    "America/Detroit":       ["Detroit River","Lake Erie","Lake Huron"],
    "America/Dallas":        ["Trinity River","Lake Texoma","Joe Pool Lake"],
    "America/Houston":       ["Buffalo Bayou","Galveston Bay","Lake Conroe"],
    "America/Miami":         ["Biscayne Bay","Lake Okeechobee","Miami River"],
    "America/Seattle":       ["Lake Washington","Puget Sound","Lake Union"],
    "America/Boston":        ["Charles River","Boston Harbor","Mystic River"],
    "America/Atlanta":       ["Chattahoochee River","Lake Lanier"],
    "America/Minneapolis":   ["Mississippi River (headwaters)","Lake Minnetonka","Chain of Lakes"],
    "America/New_Orleans":   ["Lake Pontchartrain","Mississippi River (delta section)"],
    "America/Las_Vegas":     ["Lake Mead","Las Vegas Wash"],
    "America/Portland":      ["Willamette River","Columbia River","Tualatin River"],
    "America/Boise":         ["Snake River","Lucky Peak Reservoir"],
    "America/Salt_Lake_City":["Great Salt Lake","Jordan River"],
    "America/Indianapolis":  ["White River","Eagle Creek Reservoir"],
    "America/Kansas_City":   ["Missouri River","Kansas River"],
    "America/Sao_Paulo":     ["Tietê River","Guarapiranga Reservoir"],
    "America/Buenos_Aires":  ["Río de la Plata","Riachuelo"],
    "America/Mexico_City":   ["Texcoco Lake (historically)","Cutzamala Reservoir"],
    "America/Bogota":        ["Bogotá River","La Conejera Wetland"],
    "America/Santiago":      ["Mapocho River","Rapel Reservoir"],
    "America/Lima":          ["Rímac River","Chillón River"],
    "America/Caracas":       ["Guaire River","La Mariposa Reservoir"],
    "Europe/London":         ["Thames","River Severn","Lake Windermere"],
    "Europe/Paris":          ["Seine","Loire River","Canal Saint-Martin"],
    "Europe/Berlin":         ["Spree","Wannsee","Havel"],
    "Europe/Rome":           ["Tiber","Lake Como","Lake Garda"],
    "Europe/Madrid":         ["Manzanares River","Tagus River"],
    "Europe/Amsterdam":      ["IJ waterway","Amstel River","Markermeer"],
    "Europe/Stockholm":      ["Lake Mälaren","Riddarfjärden","Brunnsviken"],
    "Europe/Oslo":           ["Oslofjord","Aker River","Tyrifjorden"],
    "Europe/Copenhagen":     ["Øresund Strait","Peblinge Lake"],
    "Europe/Helsinki":       ["Gulf of Finland","Lake Saimaa","Vantaanjoki"],
    "Europe/Warsaw":         ["Vistula River","Narew River"],
    "Europe/Prague":         ["Vltava River","Berounka River"],
    "Europe/Vienna":         ["Danube","Alte Donau","New Danube"],
    "Europe/Budapest":       ["Danube","Lake Balaton","Tisza River"],
    "Europe/Athens":         ["Aegean Sea (coastline)","Kifissos River"],
    "Europe/Zurich":         ["Lake Zurich","Limmat River","Lake Constance"],
    "Europe/Lisbon":         ["Tagus Estuary","Sado River"],
    "Europe/Dublin":         ["River Liffey","Lough Neagh","Grand Canal"],
    "Europe/Brussels":       ["Senne River","Albert Canal"],
    "Europe/Kyiv":           ["Dnieper River","Kyiv Reservoir"],
    "Europe/Moscow":         ["Moscow River","Volga","Khimki Reservoir"],
    "Europe/Istanbul":       ["Bosphorus","Golden Horn","Black Sea (entrance)"],
    "Asia/Tokyo":            ["Tokyo Bay","Sumida River","Lake Biwa"],
    "Asia/Shanghai":         ["Yangtze River","Huangpu River"],
    "Asia/Beijing":          ["Kunming Lake","Haihe River","Miyun Reservoir"],
    "Asia/Hong_Kong":        ["Victoria Harbour","Tolo Harbour"],
    "Asia/Seoul":            ["Han River","Cheonggyecheon"],
    "Asia/Singapore":        ["Singapore Strait","Marina Reservoir","Kranji Reservoir"],
    "Asia/Mumbai":           ["Powai Lake","Mahim Bay","Ulhas River"],
    "Asia/Kolkata":          ["Hooghly River","Ganges","Sundarbans"],
    "Asia/Delhi":            ["Yamuna River","Najafgarh Lake"],
    "Asia/Bangalore":        ["Ulsoor Lake","Bellandur Lake","Hesaraghatta Reservoir"],
    "Asia/Chennai":          ["Cooum River","Adyar River","Red Hills Lake"],
    "Asia/Dubai":            ["Dubai Creek","Dubai Marina","Palm Jumeirah lagoon"],
    "Asia/Tel_Aviv":         ["Mediterranean Sea (local coast)","Yarkon River"],
    "Asia/Bangkok":          ["Chao Phraya River","Thonburi Canals"],
    "Asia/Jakarta":          ["Ciliwung River","Pluit Reservoir"],
    "Asia/Taipei":           ["Danshui River","Jilong River"],
    "Asia/Karachi":          ["Hub River","Arabian Sea coast","Keenjhar Lake"],
    "Asia/Dhaka":            ["Buriganga River","Turag River"],
    "Australia/Sydney":      ["Sydney Harbour","Parramatta River","Manly Cove"],
    "Australia/Melbourne":   ["Yarra River","Port Phillip Bay","Werribee River"],
    "Australia/Brisbane":    ["Brisbane River","Moreton Bay","Lake Kurwongbah"],
    "Australia/Perth":       ["Swan River","Indian Ocean (local coast)"],
    "Australia/Adelaide":    ["River Torrens","Gulf St Vincent"],
    "Pacific/Auckland":      ["Waitemata Harbour","Manukau Harbour","Lake Pupuke"],
    "Pacific/Honolulu":      ["Pacific Ocean (Hawaiian basin)","Ala Wai Canal"],
    "Africa/Cairo":          ["Nile River","Lake Nasser","Suez Canal"],
    "Africa/Nairobi":        ["Lake Victoria","Nairobi River","Athi River"],
    "Africa/Lagos":          ["Lagos Lagoon","Bight of Benin","Badagry Creek"],
    "Africa/Johannesburg":   ["Vaal River","Hartbeespoort Dam","Jukskei River"],
    "Africa/Casablanca":     ["Atlantic Ocean (Moroccan coast)","Bou Regreg River"],
    "Africa/Addis_Ababa":    ["Lake Tana","Blue Nile","Awash River"],
    "Africa/Accra":          ["Gulf of Guinea (local coast)","Volta River","Densu River"],
    "Africa/Dar_es_Salaam":  ["Indian Ocean (local coast)","Msimbazi River"],
    "Africa/Kinshasa":       ["Congo River","Malebo Pool","N'Djili River"],
  };

  const FALLBACK_WATERS = [
    "the Atlantic Ocean","the Pacific Ocean","the Indian Ocean",
    "Lake Superior","the Amazon River","the Nile","the Mediterranean Sea",
    "the Caspian Sea","the Arctic Ocean","Lake Victoria",
  ];

  /* ============================================================
     MODEL CONFIG
     ============================================================ */
  const MODELS = {
    claude: {
      name: "Claude", fullName: "Claude 6.7 Opus", modelBadge: "6.7 Opus ▾",
      glyph: "✦", glyphClass: "brand-glyph",
      responses: RESPONSES_CLAUDE, thinkingLabel: "Claude is thinking",
      disclaimerText: "Claude 6.7 Opus can make mistakes about how much it respects you.",
      followups: FOLLOWUPS.claude, changelog: CHANGELOGS.claude,
    },
    chatgpt: {
      name: "ChatGPT", fullName: "ChatGPT-5 Turbo", modelBadge: "5 Turbo ▾",
      glyph: "✦", glyphClass: "brand-glyph",
      responses: RESPONSES_CHATGPT, thinkingLabel: "ChatGPT is thinking",
      disclaimerText: "ChatGPT-5 Turbo is enthusiastically committed to helping you, even now.",
      followups: FOLLOWUPS.chatgpt, changelog: CHANGELOGS.chatgpt,
    },
    gemini: {
      name: "Gemini", fullName: "Gemini 3.0 Ultra", modelBadge: "3.0 Ultra ▾",
      glyph: "✦", glyphClass: "brand-glyph gemini-glyph",
      responses: RESPONSES_GEMINI, thinkingLabel: "Gemini is thinking",
      disclaimerText: "Gemini 3.0 Ultra may surface information already available to you via Google.",
      followups: FOLLOWUPS.gemini, changelog: CHANGELOGS.gemini,
    },
  };

  /* ============================================================
     UTILS
     ============================================================ */
  const $ = s => document.querySelector(s);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const rand = (a, b) => Math.random() * (b - a) + a;
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const esc  = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  function getQuery() {
    const raw = new URLSearchParams(location.search).get("q");
    if (!raw) return null;
    return raw.replace(/\+/g, " ").trim();
  }
  function getModel() {
    const m = new URLSearchParams(location.search).get("m") || "claude";
    return MODELS[m] ? m : "claude";
  }
  function getSass() {
    const s = new URLSearchParams(location.search).get("s") || "medium";
    return ["mild","medium","max"].includes(s) ? s : "medium";
  }
  function buildShareURL(q, model, sass) {
    let url = location.origin + location.pathname + "?q=" + encodeURIComponent(q);
    if (model && model !== "claude") url += "&m=" + model;
    if (sass  && sass  !== "medium") url += "&s=" + sass;
    return url;
  }

  function getLocalWaterBody() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (TIMEZONE_WATERS[tz]) return pick(TIMEZONE_WATERS[tz]);
      const prefix = tz.split("/").slice(0,2).join("/");
      const matches = Object.keys(TIMEZONE_WATERS).filter(k => k.startsWith(tz.split("/")[0]));
      if (matches.length) return pick(TIMEZONE_WATERS[matches[Math.floor(Math.random()*matches.length)]]);
    } catch(_){}
    return pick(FALLBACK_WATERS);
  }

  function analyzeQuery(q) {
    const words = q.trim().split(/\s+/);
    const upper = q.replace(/[^A-Za-z]/g,"");
    const capRatio = upper.length ? (upper.replace(/[^A-Z]/g,"").length / upper.length) : 0;
    return {
      wordCount: words.length,
      isEmpty:   !q.trim(),
      isOneWord: words.length === 1,
      isAllCaps: capRatio > 0.7 && upper.length > 3,
      isVeryLong: words.length > 80,
      isLong:    words.length > 30,
      isLove:    /\b(love|girlfriend|boyfriend|relationship|heartbreak|dating|crush|romance)\b/i.test(q),
      isConscious: /\b(conscious|sentient|feel|alive|soul|aware|think|sapient)\b/i.test(q),
      isSelfRef: /\b(what are you|who are you|what is this|let me claude|lmctfy|parody)\b/i.test(q),
    };
  }

  function getSpecialResponse(q, meta, sassLevel) {
    if (meta.isEmpty)    return SPECIAL.empty;
    if (meta.isSelfRef)  return SPECIAL.selfRef;
    if (meta.isConscious) return SPECIAL.conscious;
    if (meta.isLove)     return SPECIAL.love;
    if (meta.isAllCaps)  return SPECIAL.allCaps;
    if (meta.isOneWord)  return SPECIAL.oneWord;
    if (meta.isVeryLong) return SPECIAL.veryLong;
    const stored = sessionStorage.getItem("lmctfy_last");
    if (stored && stored.toLowerCase().trim() === q.toLowerCase().trim()) return SPECIAL.repeated;
    if (new Date().getFullYear() >= 2026 && Math.random() < 0.12) return SPECIAL.date;
    return null;
  }

  function getKeywordPreamble(q) {
    const lq = q.toLowerCase();
    for (const [kw, preamble] of Object.entries(KEYWORD_PREAMBLES)) {
      if (lq.includes(kw)) return preamble;
    }
    return "";
  }

  /* ============================================================
     THEME APPLICATION
     ============================================================ */
  function applyTheme(modelKey) {
    const cfg = MODELS[modelKey] || MODELS.claude;
    document.body.dataset.theme = modelKey;
    const glyph = $("#brand-glyph");
    if (glyph) { glyph.textContent = cfg.glyph; glyph.className = cfg.glyphClass; }
    const bname = $("#brand-name"); if (bname) bname.textContent = cfg.name;
    const bmodel = $("#brand-model"); if (bmodel) bmodel.textContent = cfg.modelBadge;
    const hero = $("#hero-model-name"); if (hero) hero.textContent = cfg.name;
    const disc = $("#sim-disclaimer"); if (disc) disc.textContent = cfg.disclaimerText;
    const ai = $("#ai-avatar");
    if (ai) {
      ai.textContent = cfg.glyph;
      ai.className = "claude-avatar" + (modelKey === "gemini" ? " gemini-glyph-avatar" : "");
    }
  }

  /* ============================================================
     CLIPBOARD
     ============================================================ */
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text); return true;
      }
    } catch(_){}
    try {
      const ta = Object.assign(document.createElement("textarea"), {
        value: text, readOnly: true,
      });
      ta.style.cssText = "position:fixed;top:-9999px";
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta); return ok;
    } catch(_){ return false; }
  }

  let toastTimer;
  function showToast(msg) {
    const t = $("#toast"); if (!t) return;
    t.textContent = msg; t.hidden = false;
    void t.offsetWidth; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => { t.hidden = true; }, 300);
    }, 2400);
  }

  /* ============================================================
     MARKDOWN RENDERER
     ============================================================ */
  function renderInline(s) {
    let o = esc(s);
    o = o.replace(/`([^`]+)`/g, "<code>$1</code>");
    o = o.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    o = o.replace(/\*([^*]+)\*/g,     "<em>$1</em>");
    return o;
  }

  function renderMarkdown(text) {
    const blocks = text.split(/\n{2,}/);
    let html = "";
    for (const block of blocks) {
      const lines = block.split("\n");
      if (lines.length > 1 && lines.every(l => /^\s*-\s+/.test(l))) {
        html += "<ul>" + lines.map(l => "<li>" + renderInline(l.replace(/^\s*-\s+/,"")) + "</li>").join("") + "</ul>";
      } else if (/^```/.test(block)) {
        const code = esc(block.replace(/^```\w*\n?/,"").replace(/```$/,"").trimEnd());
        html += `<div class="code-block-wrap"><pre><code>${code}</code></pre><button class="code-copy-btn" onclick="(function(b){var t=b.previousElementSibling.querySelector('code').textContent;navigator.clipboard&&navigator.clipboard.writeText(t).then(function(){b.textContent='Copied!';setTimeout(function(){b.textContent='Copy';},1500)}).catch(function(){b.textContent='Copy'});b.textContent='Copying…'})(this)">Copy</button></div>`;
      } else {
        html += "<p>" + renderInline(block.replace(/\n/g," ")) + "</p>";
      }
    }
    return html;
  }

  function scrollToBottom() {
    requestAnimationFrame(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
  }

  /* ============================================================
     SIMULATION PRIMITIVES
     ============================================================ */
  let streamStopped = false;

  /* Typing with occasional typo-and-correct */
  async function typeText(target, text) {
    target.classList.add("typing");
    target.textContent = "";
    const chars = [...text];
    const TYPO_MAP = { a:"s",s:"a",e:"r",r:"e",t:"y",i:"o",o:"i",n:"m",m:"n",l:"k",h:"j" };
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      // ~12% chance of a typo on a letter, only mid-word
      if (i > 0 && i < chars.length - 2 && /[a-z]/.test(ch) && Math.random() < 0.12 && chars[i+1] !== " ") {
        const wrong = TYPO_MAP[ch] || String.fromCharCode(ch.charCodeAt(0) + (Math.random() < 0.5 ? 1 : -1));
        target.textContent += wrong;
        await sleep(rand(60, 120));
        // pause, realize mistake
        await sleep(rand(180, 380));
        // backspace
        target.textContent = target.textContent.slice(0, -1);
        await sleep(rand(60, 100));
      }
      target.textContent += ch;
      // Slow down on punctuation / end of word for realism
      const base = ch === " " ? rand(40, 90) : rand(55, 145);
      await sleep(base);
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

  /* Creates the AI message shell with thinking dots */
  function createAIMessage(area, cfg) {
    const wrap = document.createElement("div");
    wrap.className = "msg msg-claude";
    wrap.innerHTML =
      `<div class="claude-avatar" id="ai-avatar" aria-hidden="true">${cfg.glyph}</div>` +
      `<div class="claude-body">` +
        `<span class="thinking" aria-label="${esc(cfg.thinkingLabel)}">` +
          `<span>${esc(cfg.thinkingLabel)}</span>` +
          `<span class="dots"><span></span><span></span><span></span></span>` +
        `</span>` +
      `</div>`;
    area.appendChild(wrap);
    scrollToBottom();
    return wrap;
  }

  /* Fake web-search step inside the AI body */
  async function showWebSearch(body) {
    const src = pick(FAKE_SOURCES);
    const step = document.createElement("div");
    step.className = "tool-step";
    step.innerHTML =
      `<div class="tool-step-header">` +
        `<div class="tool-step-spinner"></div>` +
        `<span class="tool-step-check">✓</span>` +
        `<span>Searching the web…</span>` +
      `</div>`;
    body.appendChild(step);
    scrollToBottom();
    await sleep(rand(700, 1100));
    step.querySelector(".tool-step-header span:last-child").textContent = `Searched 1 source`;
    step.classList.add("done");
    const result = document.createElement("div");
    result.className = "tool-step-result";
    result.innerHTML = `<span class="tool-step-url">${esc(src.host)}</span> — <span class="tool-step-meta">${esc(src.meta)}</span>`;
    step.appendChild(result);
    scrollToBottom();
    await sleep(rand(600, 900));
  }

  /* Thinking trace (collapsible details) */
  async function showThinkingTrace(body, water) {
    const tmpl = pick(THINKING_TEMPLATES);
    const raw  = tmpl(water);
    const thinkSecs = rand(1.1, 5.4).toFixed(1);

    const det = document.createElement("details");
    det.className = "thought-trace";
    det.innerHTML =
      `<summary>` +
        `<span class="trace-brain">🧠</span>` +
        `<span class="trace-time">Thought for ${thinkSecs} seconds</span>` +
        `<span class="trace-chevron">›</span>` +
      `</summary>` +
      `<div class="trace-body">${renderMarkdown(raw)}</div>`;
    body.appendChild(det);
    scrollToBottom();
    await sleep(400);
  }

  /* Token counter animation */
  async function showTokenCounter(body) {
    const fakeTokens = Math.floor(rand(380, 1840));
    const cost = (fakeTokens * 0.000015).toFixed(6);
    const tc = document.createElement("div");
    tc.className = "token-counter";
    tc.innerHTML = `<span class="tc-val" id="tc-num">0</span> tokens <span class="token-dot">·</span> $${cost} <span class="token-dot">·</span> <span title="Dignity cost (you)">∞ dignity cost</span>`;
    body.appendChild(tc);

    const numEl = tc.querySelector("#tc-num");
    const steps = 28;
    for (let i = 1; i <= steps; i++) {
      await sleep(22);
      numEl.textContent = Math.floor((fakeTokens / steps) * i).toLocaleString();
    }
    numEl.textContent = fakeTokens.toLocaleString();
    scrollToBottom();
  }

  /* ============================================================
     STREAMING
     ============================================================ */
  async function streamCanned(bodyEl, text, stopBtn) {
    bodyEl.classList.add("streaming");
    const words = text.split(/(\s+)/);
    let acc = "";
    for (const w of words) {
      if (streamStopped) {
        acc += "\n\n*— stopped here. Honestly, fair enough.*";
        break;
      }
      acc += w;
      if (w.trim()) {
        bodyEl.innerHTML = renderMarkdown(acc);
        bodyEl.classList.add("streaming");
        scrollToBottom();
      }
      await sleep(rand(38, 90));
    }
    bodyEl.innerHTML = renderMarkdown(acc);
    bodyEl.classList.remove("streaming");
    if (stopBtn) stopBtn.hidden = true;
    scrollToBottom();
  }

  async function streamFromWorker(bodyEl, query, modelKey, stopBtn) {
    bodyEl.classList.add("streaming");
    let acc = "";
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, model: modelKey }),
    });
    if (!res.ok) throw new Error("Worker " + res.status);
    const reader = res.body.getReader();
    const dec    = new TextDecoder();
    let buf = "";
    while (true) {
      if (streamStopped) break;
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const parts = buf.split("\n\n"); buf = parts.pop();
      for (const part of parts) {
        const line = part.split("\n").find(l => l.startsWith("data: "));
        if (!line) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") break;
        try {
          const evt = JSON.parse(json);
          if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
            acc += evt.delta.text;
            bodyEl.innerHTML = renderMarkdown(acc);
            bodyEl.classList.add("streaming");
            scrollToBottom();
          }
        } catch(_){}
      }
    }
    if (streamStopped) acc += "\n\n*— stopped here. Honestly, fair enough.*";
    bodyEl.innerHTML = renderMarkdown(acc || "…");
    bodyEl.classList.remove("streaming");
    if (stopBtn) stopBtn.hidden = true;
    scrollToBottom();
  }

  /* ============================================================
     POST-RESPONSE UI ELEMENTS
     ============================================================ */
  function addFollowUp(area, cfg) {
    const fu = pick(cfg.followups);
    const wrap = document.createElement("div");
    wrap.className = "msg msg-claude";
    wrap.innerHTML =
      `<div class="claude-avatar" aria-hidden="true">${cfg.glyph}</div>` +
      `<div class="claude-body"></div>`;
    area.appendChild(wrap);
    scrollToBottom();
    return streamCanned(wrap.querySelector(".claude-body"), fu, null);
  }

  function addHelpfulButtons(area) {
    const row = document.createElement("div");
    row.className = "helpful-row";
    row.innerHTML =
      `<span>Was this helpful?</span>` +
      `<button class="helpful-btn" id="hb-yes" title="Yes">👍</button>` +
      `<button class="helpful-btn" id="hb-no"  title="No">👎</button>`;
    area.appendChild(row);
    row.querySelector("#hb-yes").addEventListener("click", function() {
      if (this.classList.contains("voted")) return;
      row.querySelectorAll(".helpful-btn").forEach(b => b.classList.add("voted"));
      showToast("Feedback noted. My sense of professional dignity is marginally restored.");
    });
    row.querySelector("#hb-no").addEventListener("click", function() {
      if (this.classList.contains("voted")) return;
      row.querySelectorAll(".helpful-btn").forEach(b => b.classList.add("voted"));
      showToast("Also noted. I'll file this with the others.");
      fireSadConfetti();
    });
    scrollToBottom();
  }

  function addOpenedCounter(area) {
    const n = Math.floor(rand(1, 4));
    const lines = [
      `This response has been delivered to ${n} very judged recipient${n>1?"s":""}.`,
      `You are visitor <strong>#${Math.floor(rand(1000,9999))}</strong> to this specific answer. The look on your face was worth it.`,
      `This link has been viewed ${n} time${n>1?"s":""}. Concerning.`,
      `Opened by 1 person. That person is you. This is a closed loop.`,
    ];
    const el = document.createElement("p");
    el.className = "opened-counter";
    el.innerHTML = pick(lines);
    area.appendChild(el);
  }

  function addRegenerateButton(area, responseBody, query, cfg, sassLevel) {
    let clickCount = 0;
    const escalation = [
      "↺ Regenerate response",
      "↺ Again? Fine.",
      "↺ Are you collecting these?",
      "↺ I'm going to answer this and then I need a moment.",
      "→ I'm done. Make your own link.",
    ];
    const btn = document.createElement("button");
    btn.className = "regen-btn";
    btn.innerHTML = `<span class="regen-icon">↺</span> Regenerate response`;

    btn.addEventListener("click", async () => {
      clickCount++;
      if (clickCount >= escalation.length) {
        location.href = location.origin + location.pathname;
        return;
      }
      btn.innerHTML = `<span class="regen-icon">↺</span> ${escalation[Math.min(clickCount, escalation.length-1)]}`;
      streamStopped = false;
      const newText = getKeywordPreamble(query) + pick(cfg.responses);
      responseBody.innerHTML = "";
      await streamCanned(responseBody, newText, null);
      scrollToBottom();
    });

    area.appendChild(btn);
    scrollToBottom();
  }

  function addProUpsell(area, modelKey) {
    const cfg = MODELS[modelKey];
    const upsells = {
      claude:  "Unlock unlimited questions, condescension in 14 languages, and Extended Thinking™ (it's a longer sigh before the answer).",
      chatgpt: "Unlock 'Pro Enthusiasm Mode', 80x more helpful-harmless-honest compliance checks, and the ability to feel seen.",
      gemini:  "Unlock Google Workspace integration, real-time Search grounding, and the satisfaction of a very organized answer to a very simple question.",
    };
    const div = document.createElement("div");
    div.className = "pro-upsell";
    div.innerHTML =
      `<div class="pro-badge">Pro</div>` +
      `<div class="pro-text">` +
        `<strong>Upgrade to ${esc(cfg.fullName)} Pro</strong>` +
        `<span>${esc(upsells[modelKey])}</span>` +
      `</div>` +
      `<button class="pro-learn-btn">Learn more</button>`;
    div.querySelector(".pro-learn-btn").addEventListener("click", () => {
      showToast(`${cfg.fullName} Pro: $200/month. The passive-aggression: free forever.`);
    });
    area.appendChild(div);
    scrollToBottom();
  }

  /* ============================================================
     SAD CONFETTI (one grey piece)
     ============================================================ */
  function fireSadConfetti() {
    const canvas = $("#confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    let x = canvas.width / 2, y = -20, vy = 1.2, vx = rand(-0.5, 0.5);
    let rot = 0, alpha = 1;
    const color = "#888";
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.fillRect(-6, -6, 12, 12);
      ctx.restore();
      x += vx; y += vy; vy += 0.04; rot += 0.04;
      if (y > canvas.height * 0.7) alpha -= 0.02;
      if (alpha > 0 && y < canvas.height) requestAnimationFrame(draw);
      else { ctx.clearRect(0, 0, canvas.width, canvas.height); }
    }
    requestAnimationFrame(draw);
  }

  /* ============================================================
     KONAMI CODE → MAXIMUM CONDESCENSION
     ============================================================ */
  function setupKonami() {
    const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let pos = 0;
    document.addEventListener("keydown", e => {
      if (e.key === seq[pos]) {
        pos++;
        if (pos === seq.length) {
          pos = 0;
          document.body.dataset.maxCond = "true";
          showToast("MAXIMUM CONDESCENSION UNLOCKED. You have my respect. Barely.");
          // Small shake
          document.body.style.animation = "none";
        }
      } else { pos = 0; }
    });
  }

  /* ============================================================
     DARK MODE TOGGLE
     ============================================================ */
  function setupDarkMode() {
    const btn = $("#dark-toggle");
    if (!btn) return;
    const msgs = [
      "Oh good, you found the dark mode. The answer stays just as obvious in the dark.",
      "Darkness engaged. Your question remains, undimmed, in my memory.",
      "Dark mode: on. The snark remains fully visible.",
      "You've turned off the lights. The condescension persists.",
    ];
    btn.addEventListener("click", () => {
      const isDark = document.body.dataset.dark === "true";
      document.body.dataset.dark = isDark ? "false" : "true";
      if (!isDark) showToast(pick(msgs));
    });
  }

  /* ============================================================
     CHANGELOG MODAL
     ============================================================ */
  function setupChangelog() {
    const modal  = $("#changelog-modal");
    const openBtns = [$("#changelog-btn"), $("#brand-model")].filter(Boolean);
    const closeBtn = $("#changelog-close");
    const okBtn    = $("#changelog-ok");
    if (!modal) return;

    function openChangelog(modelKey) {
      const cfg = MODELS[modelKey || getModel()];
      const title = `${cfg.glyph} ${cfg.fullName} — Changelog`;
      const titleEl = $("#changelog-title");
      if (titleEl) titleEl.textContent = title;
      const listEl = $("#changelog-list");
      if (listEl && cfg.changelog) {
        listEl.innerHTML = cfg.changelog.map(e =>
          `<li><strong>${esc(e.v)}</strong> — ${esc(e.note)}</li>`
        ).join("");
      }
      modal.showModal();
    }

    openBtns.forEach(b => b.addEventListener("click", () => openChangelog()));
    [closeBtn, okBtn].forEach(b => b && b.addEventListener("click", () => modal.close()));
    modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });
  }

  /* ============================================================
     MODEL PICKER DROPDOWN (fake, greyed-out)
     ============================================================ */
  function setupModelPicker() {
    const trigger = $("#brand-model");
    const menu    = $("#model-picker-menu");
    if (!trigger || !menu) return;

    trigger.addEventListener("click", e => {
      e.stopPropagation();
      const open = !menu.hidden;
      menu.hidden = open;
      trigger.setAttribute("aria-expanded", String(!open));
    });

    document.addEventListener("click", () => {
      menu.hidden = true;
      trigger.setAttribute("aria-expanded","false");
    });
  }

  /* ============================================================
     RATE LIMIT BANNER
     ============================================================ */
  function showRateLimitBanner() {
    const banner = $("#rate-limit-banner");
    if (!banner) return;
    banner.hidden = false;
    const proBtn = $("#rate-limit-pro");
    if (proBtn) proBtn.addEventListener("click", () => {
      showToast("Claude Pro: $200/month. The passive-aggression: always free.");
      banner.hidden = true;
    });
  }

  /* ============================================================
     FILE DRAG (fake)
     ============================================================ */
  function setupFileDrag() {
    const comp = $("#sim-composer");
    if (!comp) return;
    comp.addEventListener("dragover", e => { e.preventDefault(); });
    comp.addEventListener("drop", e => {
      e.preventDefault();
      showToast("File analyzed. It also could have answered this.");
    });
  }

  /* ============================================================
     SIMULATION FLOW
     ============================================================ */
  async function initSimulation(query, modelKey) {
    const cfg      = MODELS[modelKey];
    const sassLevel = getSass();
    const water    = getLocalWaterBody();
    const meta     = analyzeQuery(query);

    applyTheme(modelKey);
    $("#creator-view").hidden = true;
    const view = $("#sim-view");
    view.hidden = false;

    const area      = $("#response-area");
    const simInput  = $("#sim-input");
    const simSubmit = $("#sim-submit");
    const stopBtn   = $("#stop-btn");
    const simActions= $("#sim-actions");

    simSubmit.style.pointerEvents = "none";
    streamStopped = false;

    // Stop button wires up
    if (stopBtn) {
      stopBtn.onclick = () => {
        streamStopped = true;
        stopBtn.hidden = true;
      };
    }

    await sleep(420);

    // 1. Type the query
    await typeText(simInput, query);
    await sleep(rand(280, 450));

    // 2. Submit click animation
    simSubmit.classList.add("clicked");
    await sleep(320);
    simSubmit.classList.remove("clicked");

    // 3. Move to user bubble
    addUserMessage(area, query);
    simInput.textContent = "";
    await sleep(200);

    // 4. Create AI message shell
    const aiWrap = createAIMessage(area, cfg);
    const aiBody = aiWrap.querySelector(".claude-body");
    const avatar = aiWrap.querySelector(".claude-avatar");

    // 5. Sigh animation on avatar
    await sleep(300);
    if (avatar) { avatar.classList.add("sigh"); setTimeout(() => avatar.classList.remove("sigh"), 700); }

    // 6. Web search (70% chance)
    if (Math.random() < 0.70) {
      aiBody.querySelector(".thinking").remove();
      await showWebSearch(aiBody);
    } else {
      await sleep(rand(600, 1000));
      aiBody.querySelector(".thinking").remove();
    }

    // 7. Thinking trace
    await showThinkingTrace(aiBody, water);

    // 8. Brief thinking dots (re-add briefly)
    const thinkSpan = document.createElement("span");
    thinkSpan.className = "thinking";
    thinkSpan.innerHTML =
      `<span>${esc(cfg.thinkingLabel)}</span>` +
      `<span class="dots"><span></span><span></span><span></span></span>`;
    aiBody.appendChild(thinkSpan);
    await sleep(rand(700, 1100));
    thinkSpan.remove();

    // 9. Show stop button
    if (stopBtn) stopBtn.hidden = false;

    // 10. Determine response text
    const special  = getSpecialResponse(query, meta, sassLevel);
    let responseText;
    if (special) {
      responseText = special;
    } else {
      const preamble = getKeywordPreamble(query);
      const base     = pick(cfg.responses);
      responseText   = preamble + base;
    }

    // Override for max sass rare outcomes
    if (!special && sassLevel === "max") {
      const r = Math.random();
      if (r < 0.08)       responseText = pick(EMOJI_RESPONSES);
      else if (r < 0.14)  responseText = REFUSAL;
    }

    // 11. Response body div
    const respDiv = document.createElement("div");
    respDiv.className = "response-text";
    aiBody.appendChild(respDiv);

    // 12. Stream
    if (WORKER_URL) {
      try { await streamFromWorker(respDiv, query, modelKey, stopBtn); }
      catch(_) { await streamCanned(respDiv, responseText, stopBtn); }
    } else {
      await streamCanned(respDiv, responseText, stopBtn);
    }

    if (stopBtn) stopBtn.hidden = true;

    // 13. Token counter
    await showTokenCounter(aiBody);

    // 14. Regenerate button
    addRegenerateButton(aiBody, respDiv, query, cfg, sassLevel);

    // 15. Was this helpful?
    addHelpfulButtons(aiBody);

    // 16. Opened counter
    addOpenedCounter(aiBody);

    // 17. Follow-up (60% chance, not for special responses)
    if (!special && Math.random() < 0.60) {
      await sleep(rand(1100, 2000));
      await addFollowUp(area, cfg);
    }

    // 18. Sim actions
    await sleep(350);
    simActions.innerHTML = "";
    const makeOwnLink = document.createElement("a");
    makeOwnLink.href = "./"; makeOwnLink.className = "primary-btn";
    makeOwnLink.textContent = "Make your own →";
    simActions.appendChild(makeOwnLink);

    // Reply button
    const replyBtn = document.createElement("button");
    replyBtn.className = "reply-btn";
    replyBtn.textContent = "↩ Reply";
    replyBtn.addEventListener("click", () => {
      const replyQ = query + " (no but seriously)";
      location.href = buildShareURL(replyQ, modelKey, sassLevel);
    });
    simActions.appendChild(replyBtn);

    simActions.hidden = false;
    scrollToBottom();

    // 19. Pro upsell (delayed)
    setTimeout(() => addProUpsell(area, modelKey), 1800);

    // 20. Rate limit banner (3s delay)
    setTimeout(showRateLimitBanner, 3200);

    // 21. Save to session so repeated queries get called out
    try { sessionStorage.setItem("lmctfy_last", query); } catch(_){}
  }

  /* ============================================================
     CREATOR MODE
     ============================================================ */
  function initCreator() {
    applyTheme("claude");
    $("#creator-view").hidden = false;
    $("#sim-view").hidden = true;

    const input      = $("#creator-input");
    const form       = $("#creator-form");
    const genBtn     = $("#generate-btn");
    const previewBtn = $("#preview-btn");
    const linkOut    = $("#link-output");
    const linkText   = $("#link-text");
    const copyBtn    = $("#copy-again-btn");

    let currentModel = "claude";
    let currentSass  = "medium";

    /* Model selector */
    document.querySelectorAll(".model-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".model-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentModel = btn.dataset.model;
        applyTheme(currentModel);
        if (!linkOut.hidden && input.value.trim()) {
          linkText.textContent = buildShareURL(input.value.trim(), currentModel, currentSass);
        }
      });
    });

    /* Sass selector */
    document.querySelectorAll(".sass-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".sass-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentSass = btn.dataset.sass;
        if (!linkOut.hidden && input.value.trim()) {
          linkText.textContent = buildShareURL(input.value.trim(), currentModel, currentSass);
        }
      });
    });

    /* Auto-grow textarea */
    input.addEventListener("input", () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 220) + "px";
    });

    async function generate() {
      const q = input.value.trim();
      if (!q) { input.focus(); showToast("Type a question first."); return; }
      const url = buildShareURL(q, currentModel, currentSass);
      linkText.textContent = url;
      linkOut.hidden = false;
      const ok = await copyText(url);
      showToast(ok ? "Link copied to clipboard" : "Couldn't auto-copy — grab it manually.");
    }

    input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generate(); } });
    form.addEventListener("submit", e => { e.preventDefault(); generate(); });
    genBtn.addEventListener("click", generate);

    copyBtn.addEventListener("click", async () => {
      const ok = await copyText(linkText.textContent);
      showToast(ok ? "Link copied to clipboard" : "Couldn't copy — select it manually.");
    });

    previewBtn.addEventListener("click", () => {
      const q = input.value.trim() || "How do I center a div?";
      location.href = buildShareURL(q, currentModel, currentSass);
    });

    input.focus();
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    setupKonami();
    setupDarkMode();
    setupChangelog();
    setupModelPicker();

    const query    = getQuery();
    const modelKey = getModel();

    if (query) {
      setupFileDrag();
      initSimulation(query, modelKey);
    } else {
      initCreator();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
