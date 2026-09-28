window.addEventListener('load', () => {
    setTimeout(() => {
      const s = document.getElementById('splash');
      s.classList.add('hide');
      setTimeout(() => s.remove(), 800);
    }, 1700);
  });

  // Scroll-triggered reveal animations
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));

  // ---------- Daily Affirmation Widget ----------
  const AFF = {
    Aries:{sign:"Aries",sanskrit:"Mesha",element:"Fire Element",chakra:"Solar Plexus (Manipura)",bija:"RAM",
      quote:"I channel my fiery passion into purposeful creation. Fear dissolves before my authentic courage.",
      subText:"Mars aligns with your inner will today. Stand tall in your leadership.",
      practice:"Take 3 warrior breaths with shoulders relaxed before any critical decision."},
    Taurus:{sign:"Taurus",sanskrit:"Vrishabha",element:"Earth Element",chakra:"Heart (Anahata)",bija:"YAM",
      quote:"I am rooted in divine abundance and unshakable peace. Prosperity flows to me effortlessly.",
      subText:"Venus radiates soothing harmony across your personal and financial sanctuary.",
      practice:"Place bare feet on natural earth to ground your nervous system."},
    Gemini:{sign:"Gemini",sanskrit:"Mithuna",element:"Air Element",chakra:"Throat (Vishuddha)",bija:"HAM",
      quote:"My words carry uplifting light and magnetic resonance. I express my truth with effortless joy.",
      subText:"Mercury sharpens your mind for fruitful conversations and breakthroughs.",
      practice:"Write down three golden ideas that pop into your head before noon."},
    Cancer:{sign:"Cancer",sanskrit:"Karka",element:"Water Element",chakra:"Sacral (Svadhisthana)",bija:"VAM",
      quote:"My sensitivity is my superpower. I honor my feelings as sacred, guiding compasses.",
      subText:"The Moon showers maternal grace, protecting your home and emotional clarity.",
      practice:"Hold a glass of water for 10 seconds with love in your heart before drinking."},
    Leo:{sign:"Leo",sanskrit:"Simha",element:"Fire Element",chakra:"Solar Plexus & Crown",bija:"HRAM",
      quote:"I shine with the warm magnificence of the Sun. My presence brings joy to everyone I meet.",
      subText:"Surya Deva crowns your creative projects with magnetic authority.",
      practice:"Offer gratitude to the morning sun for 60 seconds with open palms."},
    Virgo:{sign:"Virgo",sanskrit:"Kanya",element:"Earth Element",chakra:"Throat & Heart",bija:"BUM",
      quote:"I release the burden of perfection and celebrate the sacred beauty of progress.",
      subText:"Your pragmatic discernment solves lingering bottlenecks with ease today.",
      practice:"Organize one small corner of your desk as a mindful meditation."},
    Libra:{sign:"Libra",sanskrit:"Tula",element:"Air Element",chakra:"Heart (Anahata)",bija:"SHUM",
      quote:"I am the calm center of the storm. Balance and graceful decisions unfold naturally around me.",
      subText:"Venus orchestrates gentle compromises and heartfelt mutual respect.",
      practice:"Practice 4-4-4 box breathing for 2 minutes to find balance."},
    Scorpio:{sign:"Scorpio",sanskrit:"Vrishchika",element:"Water Element",chakra:"Root & Sacral",bija:"KRAM",
      quote:"I embrace transformation with fearless grace, rising stronger from every challenge.",
      subText:"Subterranean strength flows through your intuition. Trust your inner knowing.",
      practice:"Silently forgive one past grievance and release it completely."},
    Sagittarius:{sign:"Sagittarius",sanskrit:"Dhanu",element:"Fire Element",chakra:"Crown (Sahasrara)",bija:"GUM",
      quote:"The universe is expanding my horizons. I step boldly into higher truth and opportunity.",
      subText:"Guru Brihaspati opens doors of learning, travel, and auspicious fortune.",
      practice:"Set one expansive, optimistic intention for the coming lunar cycle."},
    Capricorn:{sign:"Capricorn",sanskrit:"Makara",element:"Earth Element",chakra:"Root (Muladhara)",bija:"SHAM",
      quote:"I am patient, disciplined, and destined for enduring greatness through steady effort.",
      subText:"Saturn rewards integrity and steadfast devotion. Your persistence is your crown.",
      practice:"Acknowledge one hard-won milestone from the past year."},
    Aquarius:{sign:"Aquarius",sanskrit:"Kumbha",element:"Air Element",chakra:"Third Eye & Throat",bija:"PRAM",
      quote:"My authentic uniqueness is a gift to the collective. I align with true freedom and community.",
      subText:"Cosmic lightning sparks visionary ideas that break outdated molds.",
      practice:"Send an encouraging message of appreciation to a friend or colleague."},
    Pisces:{sign:"Pisces",sanskrit:"Meena",element:"Water Element",chakra:"Crown & Third Eye",bija:"AUM",
      quote:"I am one with the oceanic flow of divine love. Compassion heals my soul, guiding my path.",
      subText:"Neptune and Jupiter illuminate your dreams with poetic spiritual clarity.",
      practice:"Spend 5 quiet minutes listening to gentle nature sounds."}
  };
  let isSpeaking = false;
  const el = id => document.getElementById(id);
  function renderAff(){
    const s = el('moonSignSelect').value;
    const item = AFF[s];
    el('metaSignText').textContent = `${item.sign} Moon (${item.sanskrit})`;
    el('metaElement').textContent = item.element;
    el('metaBija').textContent = `Bija: "${item.bija}"`;
    el('chakraText').textContent = item.chakra;
    el('chakraFill').style.width = (58 + (item.bija.length * 11) % 38) + '%';
    el('affirmationQuote').textContent = `"${item.quote}"`;
    el('affirmationSubText').textContent = item.subText;
    el('practiceText').textContent = item.practice;
    const shareText = `✨ Daily Affirmation (${item.sign} Moon):\n"${item.quote}"\nChakra: ${item.chakra} • Bija: ${item.bija}\nPractice: ${item.practice}\n\nBook a full reading with Acharya Devika: 6294601364`;
    el('waShare').href = `https://wa.me/916294601364?text=${encodeURIComponent(shareText)}`;
  }
  el('moonSignSelect').addEventListener('change', renderAff);
  el('shuffleBtn').addEventListener('click', () => {
    el('shuffleBtn').classList.add('spin');
    setTimeout(() => el('shuffleBtn').classList.remove('spin'), 500);
    const signs = Object.keys(AFF);
    let next = signs[Math.floor(Math.random() * signs.length)];
    el('moonSignSelect').value = next;
    renderAff();
  });
  el('copyBtn').addEventListener('click', () => {
    const item = AFF[el('moonSignSelect').value];
    const text = `✨ Daily Affirmation (${item.sign} Moon):\n"${item.quote}"\nChakra: ${item.chakra} • Bija: ${item.bija}\nPractice: ${item.practice}`;
    navigator.clipboard.writeText(text).then(() => {
      el('copyBtnText').textContent = 'Copied!';
      setTimeout(() => el('copyBtnText').textContent = 'Copy', 2000);
    });
  });
  el('listenBtn').addEventListener('click', () => {
    if (!('speechSynthesis' in window)) { alert('Audio is not supported in this browser.'); return; }
    if (isSpeaking) {
      window.speechSynthesis.cancel(); isSpeaking = false;
      el('listenBtnText').textContent = 'Listen'; el('listenBtn').classList.remove('active');
      return;
    }
    window.speechSynthesis.cancel();
    const item = AFF[el('moonSignSelect').value];
    const utter = new SpeechSynthesisUtterance(`${item.sign} Moon affirmation. ${item.quote}. Today's practice: ${item.practice}`);
    utter.rate = 0.92;
    utter.onend = utter.onerror = () => {
      isSpeaking = false; el('listenBtnText').textContent = 'Listen'; el('listenBtn').classList.remove('active');
    };
    isSpeaking = true; el('listenBtnText').textContent = 'Pause'; el('listenBtn').classList.add('active');
    window.speechSynthesis.speak(utter);
  });
  renderAff();

  // ---------- Ask AI chat (uses claude.use('sample')) ----------
  let sampleFn = null;
  claude.use && claude.use('sample').then(fn => { sampleFn = fn; }).catch(() => {});
  const chatLog = el('chatLog'), chatForm = el('chatForm'), chatInput = el('chatInput'), sendBtn = el('chatSendBtn');
  function addBubble(role, text){
    const row = document.createElement('div');
    row.className = `chat-msg ${role}`;
    row.innerHTML = `<div class="bubble"></div>`;
    row.querySelector('.bubble').textContent = text;
    chatLog.appendChild(row);
    chatLog.scrollTop = chatLog.scrollHeight;
    return row.querySelector('.bubble');
  }
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const q = chatInput.value.trim();
    if (!q) return;
    addBubble('user', q);
    chatInput.value = '';
    sendBtn.disabled = true;
    const aiBubble = addBubble('ai', 'Thinking...');
    if (!sampleFn) {
      aiBubble.textContent = "The AI assistant isn't available in this view. Please message us directly on WhatsApp!";
      sendBtn.disabled = false;
      return;
    }
    try {
      const prompt = `You are a warm, concise Vedic astrology assistant on Acharya Devika's website. Answer the visitor's question in 3-4 short sentences, friendly tone. Gently suggest booking a full personal reading on WhatsApp (+91 6294601364) only if it fits naturally. Visitor question: ${q}`;
      const res = await sampleFn(prompt, {
        modelTier: 'quick', cache: false,
        onText: ({ text }) => { aiBubble.textContent = text; chatLog.scrollTop = chatLog.scrollHeight; }
      });
      aiBubble.textContent = res.text;
    } catch (err) {
      aiBubble.textContent = "Sorry, I couldn't respond right now. Please try again or message us on WhatsApp.";
    }
    sendBtn.disabled = false;
    chatLog.scrollTop = chatLog.scrollHeight;
  });
