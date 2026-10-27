const story = [
  {
    eyebrow: 'A NOTE FROM MY HEART',
    heading: 'For My Love',
    subheading: '♡  my favorite hello, my hardest goodbye  ♡',
    message: 'If I could give you one thing in this world, it would be the ability to see yourself through my eyes. Then you would understand why you mean so much to me.',
    ornament: '✧･ﾟ: *✧･ﾟ:* ♡ *:･ﾟ✧*:･ﾟ✧',
  },
  {
    eyebrow: 'THERE IS SO MUCH TO LOVE',
    heading: 'What I Like In You Most',
    subheading: "It's the little things that make you extraordinary.",
    message: "It's not just one thing. It's the beautiful way you make ordinary moments feel special, the kindness in your heart, and the comfort I find just by being close to you.",
    ornament: '୨୧  little things, endless reasons  ୨୧',
    watermark: { image: 'what-i-like-watermark.jpeg', className: 'story-watermark-like' },
  },
  {
    eyebrow: 'IF I HAD TO CHOOSE',
    heading: 'You',
    subheading: 'In you, I like you most.',
    message: "Not a perfect version of you, not a version you think the world wants to see—just you. Your real, wonderful, sometimes silly, always precious self. That's the person my heart chooses.",
    ornament: '♡ just you, always you ♡',
    watermark: { image: 'you-watermark.jpeg', className: 'story-watermark-you' },
  },
  {
    eyebrow: 'THE WINDOWS TO YOUR SOUL',
    heading: 'Your Eyes',
    subheading: 'I could get lost in them and never ask for directions.',
    message: "Your eyes have a kind of magic I can't explain. Sometimes one look from you says more than a thousand words, and when they light up with happiness, my whole world feels a little brighter.",
    ornament: '✧ eyes full of stars ✧',
    watermark: { image: 'your-eyes-watermark.jpeg', className: '' },
  },
  {
    eyebrow: 'MY FAVORITE SIGHT',
    heading: 'Your Smile',
    subheading: 'My sunshine on even the cloudiest day.',
    message: 'Your smile is my favorite kind of beautiful. It makes the world feel softer, turns my bad days around, and reminds me that happiness can be as simple as seeing you smile.',
    ornament: '☼ a little sunshine, just for me ☼',
    watermark: { image: 'your-smile-watermark.jpeg', className: 'story-watermark-smile' },
  },
  {
    eyebrow: 'I COULD LISTEN FOREVER',
    heading: 'How You Speak',
    subheading: 'Even the simplest words sound special from you.',
    message: "I love hearing you talk—your stories, your excitement, your random little thoughts, and even the way you say my name. I don't just listen to your words; I love the feeling of being close to you when you share them with me.",
    ornament: 'ღ your voice feels like home ღ',
  },
];

const heartStage = document.getElementById('heart-stage');
const heartButton = document.getElementById('heart-button');
const contentStage = document.getElementById('content-stage');
const eyebrow = document.getElementById('story-eyebrow');
const watermark = document.getElementById('story-watermark');
const ornament = document.getElementById('story-ornament');
const heading = document.getElementById('story-heading');
const subheading = document.getElementById('story-subheading');
const message = document.getElementById('story-message');
const progress = document.querySelector('.progress');
const progressFill = document.getElementById('progress-fill');
const stepCount = document.getElementById('step-count');
const nextButton = document.getElementById('next-button');
const nextLabel = document.getElementById('next-label');
const loveSong = document.getElementById('love-song');
const musicButton = document.getElementById('music-button');
const musicLabel = document.getElementById('music-label');
const welcomeScreen = document.getElementById('welcome-screen');
const envelopeScene = document.getElementById('envelope-scene');
const envelopeButton = document.getElementById('envelope-button');
const letterCard = document.getElementById('letter-card');
const openHeartButton = document.getElementById('open-heart-button');
const storySite = document.getElementById('story-site');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let currentStep = -1;
let opening = false;

function playEntryAnimation(element) {
  element.classList.remove('entering');
  void element.offsetWidth;
  element.classList.add('entering');
}

function renderStep(animate = false) {
  const isRevealed = currentStep >= 0;
  const item = isRevealed ? story[currentStep] : null;

  heartStage.hidden = isRevealed;
  contentStage.hidden = !isRevealed;
  nextButton.hidden = !isRevealed;
  progress.setAttribute('aria-valuenow', String(isRevealed ? currentStep + 1 : 0));
  progressFill.style.width = `${isRevealed ? ((currentStep + 1) / story.length) * 100 : 0}%`;
  stepCount.textContent = `A tiny love story · ${isRevealed ? currentStep + 1 : 1} of ${story.length}`;
  eyebrow.textContent = item?.eyebrow ?? 'MY FAVORITE PERSON';

  if (item) {
    heading.textContent = item.heading;
    subheading.textContent = item.subheading;
    message.textContent = item.message;
    ornament.textContent = item.ornament;

    if (item.watermark) {
      watermark.hidden = false;
      watermark.className = `story-watermark ${item.watermark.className}`.trim();
      watermark.style.backgroundImage = `url("./images/${item.watermark.image}")`;
    } else {
      watermark.hidden = true;
      watermark.style.backgroundImage = 'none';
    }

    nextLabel.textContent = currentStep === story.length - 1 ? 'Read it all again' : 'Next little secret';
  }

  if (animate) playEntryAnimation(isRevealed ? contentStage : heartStage);
}

function makeFloatingHearts() {
  if (reduceMotion.matches) return;

  const symbols = ['♡', '♥', '✧', 'ღ'];
  const bounds = heartButton.getBoundingClientRect();
  for (let index = 0; index < 13; index += 1) {
    const particle = document.createElement('span');
    particle.className = 'floating-heart';
    particle.setAttribute('aria-hidden', 'true');
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = `${bounds.left + bounds.width / 2 + (Math.random() - 0.5) * 170}px`;
    particle.style.top = `${bounds.top + bounds.height / 2 + (Math.random() - 0.5) * 80}px`;
    particle.style.fontSize = `${14 + Math.random() * 18}px`;
    particle.addEventListener('animationend', () => particle.remove(), { once: true });
    document.body.append(particle);
    window.setTimeout(() => particle.remove(), 2200);
  }
}

function syncMusicButton() {
  const isPlaying = !loveSong.paused;
  musicButton.setAttribute('aria-pressed', String(isPlaying));
  musicButton.setAttribute('aria-label', isPlaying ? 'Pause song' : 'Play song');
  musicLabel.textContent = isPlaying ? 'Pause song' : 'Play our song';
}

loveSong.addEventListener('play', syncMusicButton);
loveSong.addEventListener('pause', syncMusicButton);
loveSong.addEventListener('ended', syncMusicButton);

musicButton.addEventListener('click', () => {
  if (loveSong.paused) {
    loveSong.play().catch(syncMusicButton);
  } else {
    loveSong.pause();
  }
});

heartButton.addEventListener('click', () => {
  if (opening || currentStep !== -1) return;
  opening = true;
  heartButton.disabled = true;
  heartButton.classList.add('broken');
  makeFloatingHearts();
  loveSong.play().catch(syncMusicButton);

  window.setTimeout(() => {
    currentStep = 0;
    opening = false;
    heartButton.disabled = false;
    heartButton.classList.remove('broken');
    renderStep(true);
  }, reduceMotion.matches ? 0 : 430);
});

nextButton.addEventListener('click', () => {
  if (currentStep === story.length - 1) {
    currentStep = -1;
    renderStep(true);
    heartButton.focus();
    return;
  }

  currentStep = Math.min(currentStep + 1, story.length - 1);
  renderStep(true);
});

envelopeButton.addEventListener('click', () => {
  if (envelopeScene.classList.contains('is-open')) return;
  envelopeScene.classList.add('is-open');
  envelopeButton.setAttribute('aria-expanded', 'true');
  letterCard.inert = false;
  letterCard.setAttribute('aria-hidden', 'false');
  window.setTimeout(() => openHeartButton.focus(), reduceMotion.matches ? 0 : 720);
});

openHeartButton.addEventListener('click', () => {
  welcomeScreen.classList.add('leaving');
  const transitionDuration = reduceMotion.matches ? 0 : 420;
  window.setTimeout(() => {
    welcomeScreen.hidden = true;
    storySite.hidden = false;
    playEntryAnimation(storySite);
    heartButton.focus();
  }, transitionDuration);
});

renderStep();
