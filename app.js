/* ============================================================
   Let Me Claude That For You — app logic (vanilla JS)
   Two states driven by the ?q= URL parameter:
     • Creator  — type a question, generate & copy a shareable link
     • Simulation — type out the query, "think", and stream a snarky reply
   ============================================================ */

(function () {
  "use strict";

  /* --------------------------------------------------------
     50 distinct snarky responses. Tone: a hyper-intelligent
     AI mildly exhausted by trivial human questions.
     -------------------------------------------------------- */
  const RESPONSES = [
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
  ];

  // Sanity: the spec requires exactly 50 responses.
  console.assert(RESPONSES.length === 50, "Expected 50 responses, got " + RESPONSES.length);

  /* ----------------------------- Helpers ----------------------------- */
  const $ = (sel) => document.querySelector(sel);
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function buildShareURL(query) {
    const base = location.origin + location.pathname;
    return base + "?q=" + encodeURIComponent(query);
  }

  function getQuery() {
    const raw = new URLSearchParams(location.search).get("q");
    if (raw === null) return null;
    // URLSearchParams already decodes %xx; collapse "+" just in case of legacy links.
    return raw.replace(/\+/g, " ").trim();
  }

  /* ----------------------- Clipboard with fallback ------------------- */
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) { /* fall through to legacy path */ }

    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (_) {
      return false;
    }
  }

  let toastTimer = null;
  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    // force reflow so the transition runs even on rapid re-trigger
    void toast.offsetWidth;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => { toast.hidden = true; }, 300);
    }, 2200);
  }

  /* --------------------- Minimal markdown rendering ------------------ */
  // Supports: paragraphs, **bold**, *italic*, `code`, and "- " bullet lists.
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
      const isList = lines.every((l) => /^\s*-\s+/.test(l));
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
    const view = $("#creator-view");
    view.hidden = false;
    $("#sim-view").hidden = true;

    const input = $("#creator-input");
    const form = $("#creator-form");
    const generateBtn = $("#generate-btn");
    const previewBtn = $("#preview-btn");
    const linkOutput = $("#link-output");
    const linkText = $("#link-text");
    const copyAgainBtn = $("#copy-again-btn");

    // Auto-grow the textarea as the user types.
    function autoGrow() {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 220) + "px";
    }
    input.addEventListener("input", autoGrow);

    function currentQuery() {
      return input.value.trim();
    }

    async function generate() {
      const q = currentQuery();
      if (!q) {
        input.focus();
        showToast("Type a question first.");
        return;
      }
      const url = buildShareURL(q);
      linkText.textContent = url;
      linkOutput.hidden = false;
      const ok = await copyToClipboard(url);
      showToast(ok ? "Link copied to clipboard" : "Couldn't auto-copy — copy it manually.");
    }

    // Enter submits (Shift+Enter makes a newline).
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
      showToast(ok ? "Link copied to clipboard" : "Couldn't copy — select it manually.");
    });

    previewBtn.addEventListener("click", () => {
      const q = currentQuery() || "How do I center a div?";
      location.href = buildShareURL(q);
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

  function addThinking(area) {
    const wrap = document.createElement("div");
    wrap.className = "msg msg-claude";
    wrap.innerHTML =
      '<div class="claude-avatar" aria-hidden="true">✦</div>' +
      '<div class="claude-body"><span class="thinking">' +
      "<span>Claude is thinking</span>" +
      '<span class="dots"><span></span><span></span><span></span></span>' +
      "</span></div>";
    area.appendChild(wrap);
    scrollToBottom();
    return wrap;
  }

  async function streamResponse(bodyEl, text) {
    bodyEl.classList.add("streaming");
    const words = text.split(/(\s+)/); // keep whitespace tokens
    let acc = "";
    for (let i = 0; i < words.length; i++) {
      acc += words[i];
      if (words[i].trim() === "") continue; // don't re-render on pure whitespace
      bodyEl.innerHTML = renderMarkdown(acc);
      bodyEl.classList.add("streaming");
      scrollToBottom();
      await sleep(rand(40, 95));
    }
    bodyEl.innerHTML = renderMarkdown(text);
    bodyEl.classList.remove("streaming");
    scrollToBottom();
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
  }

  async function initSimulation(query) {
    $("#creator-view").hidden = true;
    const view = $("#sim-view");
    view.hidden = false;

    const area = $("#response-area");
    const simInput = $("#sim-input");
    const simSubmit = $("#sim-submit");
    const simActions = $("#sim-actions");

    // 1. Input is inherently non-editable (a div), but lock the button too.
    simSubmit.style.pointerEvents = "none";

    // Small beat before "the user" starts typing.
    await sleep(450);

    // 2. Type the query out character-by-character.
    await typeText(simInput, query);
    await sleep(350);

    // 3. Animate the submit button being clicked.
    simSubmit.classList.add("clicked");
    await sleep(320);
    simSubmit.classList.remove("clicked");

    // Move the query into a user bubble and clear the composer.
    addUserMessage(area, query);
    simInput.textContent = "";
    await sleep(250);

    // 4. Pulsing "thinking" indicator for ~1.5s.
    const thinkingWrap = addThinking(area);
    await sleep(1500);

    // 5. Replace thinking with the streamed snarky response.
    const body = thinkingWrap.querySelector(".claude-body");
    body.innerHTML = "";
    await streamResponse(body, pick(RESPONSES));

    // Reveal the "make your own" call to action.
    await sleep(400);
    simActions.hidden = false;
    scrollToBottom();
  }

  /* ------------------------------- Boot ------------------------------ */
  function boot() {
    const query = getQuery();
    if (query) {
      initSimulation(query);
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
