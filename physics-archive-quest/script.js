(() => {
  const $ = (id) => document.getElementById(id);

  const screenGame = $('screen-game');
  const screenQuiz = $('screen-quiz');
  const screenResult = $('screen-result');

  const livesEl = $('lives');
  const scoreEl = $('score');
  const progressEl = $('progress');

  const timeLeftEl = $('timeLeft');
  const bestEl = $('best');

  const startBtn = $('startBtn');
  const skipToQuizBtn = $('skipToQuizBtn');

  const player = $('player');
  const facility = $('facility');
  const warning = $('warning');

  const livesAtStart = 3;

  // Quiz DOM
  const qTotal = $('qTotal');
  const qIndex = $('qIndex');
  const questionText = $('questionText');
  const answersEl = $('answers');
  const submitAnswer = $('submitAnswer');
  const nextBtn = $('nextBtn');
  const feedback = $('feedback');
  const barFill = $('barFill');
  const qprogressText = $('qprogressText');

  const finalScore = $('finalScore');
  const playAgain = $('playAgain');

  // Note content (corrupted / archived vibe)
  const NOTE_BASE = `I just work. They say I am as slow as a turtle who came back from the dead....... AGAIN, but the slowness is worth it.

This feels archived: not because it’s old, but because it’s compiled—repeated cycles that settle into something dependable.

Return loops instead of fresh starts.
Quiet capability over hype.
Pace as proof: slowness that becomes momentum.`;

  function corruptText(text) {
    // deterministic-ish corruption based on input length
    const chars = text.split('');
    const rate = Math.min(0.18, 12 / Math.max(60, text.length));
    let seed = text.length * 9301 + 49297;
    const rand = () => {
      seed = (seed * 233280 + 49297) % 1000000007;
      return seed / 1000000007;
    };
    const glitch = ['░', '▒', '▓', '█', '�', '*', '˙', '…'];
    for (let i = 0; i < chars.length; i++) {
      if (rand() < rate) {
        chars[i] = glitch[Math.floor(rand() * glitch.length)];
      }
    }
    return chars.join('').replace(/\s+/g, ' ').trim();
  }

  // --- Quiz ---
  const quizQuestions = [
    {
      q: 'Which statement best describes Newton\'s First Law (Law of Inertia)?',
      choices: [
        'For every action there is an equal and opposite reaction.',
        'An object keeps moving at constant velocity unless acted on by a net external force.',
        'Force equals mass times acceleration for all situations.',
        'Energy cannot be created or destroyed.',
      ],
      correctIndex: 1,
    },
    {
      q: 'A car of mass 1200 kg speeds up from rest to 20 m/s in 5 seconds. What is its approximate acceleration?',
      choices: [
        '4 m/s²',
        '2 m/s²',
        '10 m/s²',
        '50 m/s²',
      ],
      correctIndex: 2,
    },
    {
      q: 'If you double the mass of an object but apply the same force, how does the acceleration change?',
      choices: ['It doubles.', 'It halves.', 'It stays the same.', 'It becomes zero.'],
      correctIndex: 1,
    },
    {
      q: 'A projectile is launched horizontally. Which statement is true?',
      choices: [
        'Horizontal acceleration is constant and nonzero.',
        'Vertical acceleration is zero.',
        'Horizontal velocity stays constant (ignoring air resistance).',
        'Both horizontal and vertical accelerations are zero.',
      ],
      correctIndex: 2,
    },
    {
      q: 'An object moves in a circle at constant speed. What is its acceleration?',
      choices: [
        'Zero, because speed is constant.',
        'Constant in magnitude and always directed toward the center.',
        'Constant in direction and magnitude away from the center.',
        'Depends only on mass, not speed.',
      ],
      correctIndex: 1,
    },
    {
      q: 'Two resistors are connected in series. If one resistor has resistance R and the other also has R, what is total resistance?',
      choices: ['R', '2R', 'R/2', '4R'],
      correctIndex: 1,
    },
    {
      q: 'A spring is stretched by 0.10 m. If the spring constant is 50 N/m, what is the force (Hooke\'s Law)?',
      choices: ['5 N', '0.5 N', '50 N', '500 N'],
      correctIndex: 0,
    },
    {
      q: 'Which quantity is a vector (has both magnitude and direction)?',
      choices: ['Temperature', 'Speed', 'Velocity', 'Energy'],
      correctIndex: 2,
    },
    {
      q: 'A 2 kg object has momentum p = 10 kg·m/s. What is its velocity?',
      choices: ['5 m/s', '2 m/s', '20 m/s', '0.2 m/s'],
      correctIndex: 0,
    },
    {
      q: 'If work is done on an object, which relationship is most accurate?',
      choices: [
        'Work changes kinetic energy (W = ΔK).',
        'Work always equals momentum.',
        'Work is only stored as temperature.',
        'Work and energy are unrelated.',
      ],
      correctIndex: 0,
    },
  ];

  let quizIdx = 0;
  let quizScore = 0;
  let quizLocked = false;

  function setScreen(mode) {
    screenGame.classList.toggle('hidden', mode !== 'game');
    screenQuiz.classList.toggle('hidden', mode !== 'quiz');
    screenResult.classList.toggle('hidden', mode !== 'result');
  }

  function renderQuizQuestion() {
    const total = quizQuestions.length;
    qTotal.textContent = total;
    qIndex.textContent = quizIdx + 1;
    const item = quizQuestions[quizIdx];

    questionText.textContent = item.q;
    answersEl.innerHTML = '';
    feedback.textContent = '';
    nextBtn.classList.add('hidden');
    submitAnswer.classList.remove('hidden');

    const groupName = `q_${quizIdx}`;

    item.choices.forEach((c, i) => {
      const id = `${groupName}_${i}`;
      const wrap = document.createElement('div');
      wrap.className = 'answer';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = groupName;
      input.id = id;
      input.value = String(i);

      const label = document.createElement('label');
      label.htmlFor = id;
      label.textContent = c;

      wrap.appendChild(input);
      wrap.appendChild(label);
      answersEl.appendChild(wrap);
    });

    // progress UI
    const correctSoFar = quizScore;
    qprogressText.textContent = `${correctSoFar} questions correct`;
    const pct = (correctSoFar / total) * 100;
    barFill.style.width = `${pct}%`;
  }

  function getSelectedChoice() {
    const groupName = `q_${quizIdx}`;
    const checked = document.querySelector(`input[name="${groupName}"]:checked`);
    return checked ? Number(checked.value) : null;
  }

  function finishQuiz() {
    setScreen('result');
    finalScore.textContent = String(quizScore);

    // corrupted note only at 10/10
    const noteEl = $('note');
    noteEl.textContent = quizScore === 10 ? corruptText(NOTE_BASE) : NOTE_BASE;

    playAgain.focus();
  }

  submitAnswer.addEventListener('click', () => {
    if (quizLocked) return;
    const selected = getSelectedChoice();
    if (selected === null) {
      feedback.textContent = 'Pick an answer first.';
      return;
    }

    quizLocked = true;
    const item = quizQuestions[quizIdx];

    const correct = selected === item.correctIndex;
    if (correct) quizScore += 1;

    scoreEl.textContent = String(quizScore);
    progressEl.textContent = `${quizScore}/${quizQuestions.length}`;

    feedback.textContent = correct ? 'Correct.' : 'Incorrect.';

    // show next
    submitAnswer.classList.add('hidden');
    nextBtn.classList.remove('hidden');

    const total = quizQuestions.length;
    const pct = (quizScore / total) * 100;
    barFill.style.width = `${pct}%`;
    qprogressText.textContent = `${quizScore} questions correct`;
  });

  nextBtn.addEventListener('click', () => {
    quizLocked = false;
    quizIdx += 1;
    if (quizIdx >= quizQuestions.length) {
      finishQuiz();
      return;
    }
    renderQuizQuestion();
  });

  playAgain.addEventListener('click', () => {
    quizIdx = 0;
    quizScore = 0;
    quizLocked = false;
    scoreEl.textContent = '0';
    progressEl.textContent = `0/${quizQuestions.length}`;
    bestEl.textContent = '0';
    stopGame();
    startRun();
    setScreen('game');
  });

  // --- Micro game ---
  const arena = document.querySelector('.arena');

  let timeLeft = 25_000; // ms
  let rafId = 0;
  let lastTs = 0;

  let lives = livesAtStart;
  let playerX = 0.5; // 0..1

  let facilityX = 0.75;
  let facilityDir = -1;

  const PLAYER_MIN = 0.05;
  const PLAYER_MAX = 0.95;
  const FACILITY_MIN = 0.12;
  const FACILITY_MAX = 0.88;

  // movement tuning (empiric) based on original ms-per-tick values
  const PLAYER_SPEED = 0.018; // per ~55ms original tick
  const FACILITY_SPEED = 0.015; // per ~60ms original interval

  let keys = new Set();
  let collisionCooldown = 0; // ms
  let warningBaseOpacity = 0.85;

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function arenaRectWidth() {
    return arena.getBoundingClientRect().width;
  }

  function updatePlayer() {
    playerX = clamp(playerX, PLAYER_MIN, PLAYER_MAX);
    const w = arenaRectWidth();
    const px = w * playerX;
    player.style.left = `${px}px`;
  }

  function updateFacility() {
    const w = arenaRectWidth();
    const fx = w * facilityX;
    facility.style.right = `${(w - fx)}px`;
  }

  function advanceToQuiz() {
    stopGame();
    setScreen('quiz');
    quizIdx = 0;
    quizScore = 0;
    quizLocked = false;
    scoreEl.textContent = '0';
    progressEl.textContent = `0/${quizQuestions.length}`;
    renderQuizQuestion();
  }

  function tick(ts) {
    if (!lastTs) lastTs = ts;
    const dt = Math.min(48, ts - lastTs); // clamp huge dt
    lastTs = ts;

    if (timeLeft <= 0) {
      advanceToQuiz();
      return;
    }

    timeLeft -= dt;
    timeLeftEl.textContent = (timeLeft / 1000).toFixed(1);

    // scale input relative to original base values
    const baseDt = 55;
    const stepMul = dt / baseDt;

    const moveL = (keys.has('ArrowLeft') || keys.has('a') || keys.has('A') || keys.has('h') || keys.has('H')) ? -1 : 0;
    const moveR = (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) ? 1 : 0;
    const dir = moveL + moveR;
    if (dir !== 0) {
      playerX += dir * PLAYER_SPEED * stepMul;
      updatePlayer();
    }

    // facility motion (matches original bounds)
    const baseDtF = 60;
    facilityX += facilityDir * FACILITY_SPEED * (dt / baseDtF);
    if (facilityX <= FACILITY_MIN) {
      facilityX = FACILITY_MIN;
      facilityDir = 1;
    }
    if (facilityX >= FACILITY_MAX) {
      facilityX = FACILITY_MAX;
      facilityDir = -1;
    }
    updateFacility();

    // proximity + warning pulse
    const pr = player.getBoundingClientRect();
    const fr = facility.getBoundingClientRect();
    const pCenterX = pr.left + pr.width / 2;
    const fCenterX = fr.left + fr.width / 2;
    const close = Math.abs(pCenterX - fCenterX) < 80;
    warning.style.opacity = close ? '1' : String(warningBaseOpacity);

    // cooldown to prevent multi-hit in one proximity
    collisionCooldown -= dt;

    if (collisionCooldown <= 0 && close && timeLeft > 0) {
      const dx = Math.abs(pCenterX - fCenterX);
      if (dx < 18) {
        collisionCooldown = 260;
        lives -= 1;
        livesEl.textContent = String(lives);

        warning.classList.add('flash');
        setTimeout(() => warning.classList.remove('flash'), 140);

        timeLeft -= 2200;

        const ring = $('hitRing');
        if (ring) {
          ring.style.opacity = '1';
          ring.style.transform = 'translate3d(-50%,-50%,0) scale(1)';
          // lightweight visual pulse without layout
          ring.animate(
            [
              { transform: 'translate3d(-50%,-50%,0) scale(0.2)', opacity: 0 },
              { transform: 'translate3d(-50%,-50%,0) scale(1.2)', opacity: 0.95 },
              { transform: 'translate3d(-50%,-50%,0) scale(2.6)', opacity: 0 },
            ],
            { duration: 240, easing: 'cubic-bezier(.2,.9,.2,1)', fill: 'forwards' }
          );
        }

        if (lives <= 0) {
          advanceToQuiz();
          return;
        }
      }
    }

    rafId = requestAnimationFrame(tick);
  }

  function startRun() {
    // reset
    lives = livesAtStart;
    livesEl.textContent = String(lives);
    scoreEl.textContent = '0';
    progressEl.textContent = `0/${quizQuestions.length}`;

    timeLeft = 25_000;
    timeLeftEl.textContent = '25.0';

    facilityX = 0.75;
    facilityDir = -1;
    playerX = 0.5;

    collisionCooldown = 0;
    warningBaseOpacity = 0.85;

    updatePlayer();
    updateFacility();

    // warning visible
    warning.style.display = 'block';
    warning.classList.remove('flash');

    // cancel any previous loop
    if (rafId) cancelAnimationFrame(rafId);
    lastTs = 0;
    rafId = requestAnimationFrame(tick);
  }

  function stopGame() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    lastTs = 0;
    keys.clear();
  }

  // Extra: prevent background animation from continuing after leaving game
  // (quiz/result screens)
  const screens = [screenGame, screenQuiz, screenResult];
  function syncAnimationVisibility() {
    const isGame = !screenGame.classList.contains('hidden');
    const appFx = document.querySelector('.arenaFx');
    if (appFx) appFx.style.opacity = isGame ? '1' : '0';
  }
  syncAnimationVisibility();

  const _setScreen = setScreen;
  setScreen = (mode) => {
    _setScreen(mode);
    syncAnimationVisibility();
  };

  function onKeyDown(e) {
    keys.add(e.key);
  }
  function onKeyUp(e) {
    keys.delete(e.key);
  }

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  startBtn.addEventListener('click', () => {
    setScreen('game');
    startRun();
  });

  skipToQuizBtn.addEventListener('click', () => {
    stopGame();
    setScreen('quiz');
    quizIdx = 0;
    quizScore = 0;
    quizLocked = false;
    scoreEl.textContent = '0';
    progressEl.textContent = `0/${quizQuestions.length}`;
    renderQuizQuestion();
  });

  // Initial render state
  (function init() {
    // place at correct positions after layout
    setTimeout(() => {
      updatePlayer();
      updateFacility();
      livesEl.textContent = String(livesAtStart);
      scoreEl.textContent = '0';
      progressEl.textContent = `0/${quizQuestions.length}`;
    }, 0);

    // start in game screen
    setScreen('game');
  })();
})();

