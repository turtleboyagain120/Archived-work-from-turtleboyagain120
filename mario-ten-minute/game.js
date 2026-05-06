(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  const elTime = document.getElementById('time');
  const elScore = document.getElementById('score');
  const elCoins = document.getElementById('coins');
  const elHearts = document.getElementById('hearts');

  const overlay = document.getElementById('overlay');
  const btnStart = document.getElementById('btnStart');
  const btnRestart = document.getElementById('btnRestart');

  // ---------- Utils ----------
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  // ---------- Game config ----------
  const TILE = 24;
  const GRAVITY = 2200; // px/s^2
  const MOVE_ACC = 2200; // px/s^2
  const MAX_SPEED = 520; // px/s
  const FRICTION = 1600; // px/s^2
  const JUMP_SPEED = 820; // px/s
  const COYOTE = 0.085; // seconds
  const JUMP_BUFFER = 0.12; // seconds

  const ENEMY_SPEED = 150;
  const ENEMY_W = 18;
  const ENEMY_H = 18;

  const PLAYER_W = 20;
  const PLAYER_H = 26;

  const SESSION_SECONDS = 600; // 10 minutes
  const FPS_SMOOTH = 0.08;

  // ---------- Input ----------
  const keys = new Set();
  let startedOnce = false;

  window.addEventListener('keydown', (e) => {
    const k = e.key;
    if (['ArrowLeft','ArrowRight','ArrowUp',' ','w','W','a','A','d','D','ArrowDown','Escape','Spacebar','Enter'].includes(k)) e.preventDefault();
    keys.add(k);
    if (!startedOnce && (k === 'Enter' || k === ' ')) {
      // allow immediate start
      startGame();
    }
  }, { passive: false });

  window.addEventListener('keyup', (e) => {
    keys.delete(e.key);
  });

  function isDown(...arr) {
    for (const a of arr) if (keys.has(a)) return true;
    return false;
  }

  // ---------- Level ----------
  // 0 empty, 1 solid, 2 hazard (spikes), 3 coin, 4 flag
  // We'll build a mostly platformed map.
  const levelRows = [
    '................................................................................................................................',
  ];

  // We'll generate a world with fixed height using a hand-crafted grid.
  // World width in tiles:
  const WORLD_W_TILES = 110;
  const WORLD_H_TILES = 20; // tile height
  const GROUND_Y = 15; // solid row index from top in tiles

  // Create grid
  const grid = Array.from({ length: WORLD_H_TILES }, () => Array.from({ length: WORLD_W_TILES }, () => 0));

  function setTile(tx, ty, v) {
    if (tx < 0 || ty < 0 || tx >= WORLD_W_TILES || ty >= WORLD_H_TILES) return;
    grid[ty][tx] = v;
  }

  // ground
  for (let x = 0; x < WORLD_W_TILES; x++) setTile(x, GROUND_Y, 1);
  // ground thickness
  for (let y = GROUND_Y + 1; y < WORLD_H_TILES; y++) {
    for (let x = 0; x < WORLD_W_TILES; x++) setTile(x, y, 1);
  }

  // platforms
  const plats = [
    // {x,y,w}
    { x: 8, y: 12, w: 8 },
    { x: 20, y: 10, w: 10 },
    { x: 38, y: 12, w: 7 },
    { x: 50, y: 9, w: 12 },
    { x: 68, y: 12, w: 9 },
    { x: 84, y: 10, w: 10 },
  ];
  for (const p of plats) {
    for (let x = p.x; x < p.x + p.w; x++) setTile(x, p.y, 1);
  }

  // spikes
  const spikes = [
    { x: 24, y: GROUND_Y - 1, w: 4 },
    { x: 46, y: GROUND_Y - 1, w: 3 },
    { x: 74, y: GROUND_Y - 1, w: 6 },
  ];
  for (const s of spikes) {
    for (let x = s.x; x < s.x + s.w; x++) setTile(x, s.y, 2);
  }

  // coins
  const coins = [];
  function spawnCoin(tx, ty) {
    coins.push({ x: tx * TILE + TILE / 2, y: ty * TILE + TILE / 2, r: 8, taken: false });
    setTile(tx, ty, 3);
  }
  const coinSpots = [
    { x: 9, y: 11 }, { x: 11, y: 11 }, { x: 13, y: 11 }, { x: 15, y: 11 },
    { x: 21, y: 9 }, { x: 23, y: 9 }, { x: 25, y: 9 }, { x: 27, y: 9 }, { x: 29, y: 9 },
    { x: 40, y: 11 }, { x: 42, y: 11 }, { x: 44, y: 11 },
    { x: 52, y: 8 }, { x: 55, y: 8 }, { x: 58, y: 8 }, { x: 61, y: 8 }, { x: 64, y: 8 },
    { x: 69, y: 11 }, { x: 71, y: 11 }, { x: 73, y: 11 },
    { x: 85, y: 9 }, { x: 87, y: 9 }, { x: 89, y: 9 }, { x: 91, y: 9 },
    { x: 95, y: 13 }, { x: 97, y: 13 },
  ];
  for (const s of coinSpots) spawnCoin(s.x, s.y);

  // flag
  const FLAG_X = 104;
  const FLAG_Y = 9;
  setTile(FLAG_X, FLAG_Y, 4);

  // enemies
  const enemies = [];
  function spawnEnemy(tx, ty, span = 140) {
    enemies.push({
      x: tx * TILE + (TILE - ENEMY_W) / 2,
      y: ty * TILE + (TILE - ENEMY_H),
      w: ENEMY_W,
      h: ENEMY_H,
      vx: ENEMY_SPEED,
      alive: true,
      leftBound: tx * TILE - 20,
      rightBound: tx * TILE + span,
    });
  }
  spawnEnemy(26, GROUND_Y - 2, 120);
  spawnEnemy(44, GROUND_Y - 2, 160);
  spawnEnemy(73, GROUND_Y - 2, 180);
  spawnEnemy(86, GROUND_Y - 2, 160);

  // ---------- Camera ----------
  const view = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    w: 0,
    h: 0,
  };

  function worldPixelW() {
    return WORLD_W_TILES * TILE;
  }

  // ---------- Collision helpers ----------
  function tileAt(px, py) {
    const tx = Math.floor(px / TILE);
    const ty = Math.floor(py / TILE);
    if (tx < 0 || ty < 0 || tx >= WORLD_W_TILES || ty >= WORLD_H_TILES) return 1; // treat outside as solid
    return grid[ty][tx];
  }

  function isSolidTile(t) {
    return t === 1;
  }

  function isHazardTile(t) {
    return t === 2;
  }

  function getFlagTile(t) {
    return t === 4;
  }

  // ---------- Player ----------
  const player = {
    x: 64,
    y: 0,
    w: PLAYER_W,
    h: PLAYER_H,
    vx: 0,
    vy: 0,
    onGround: false,
    coyote: 0,
    jumpBuffer: 0,
    facing: 1,
    invuln: 0,
    hearts: 3,
    score: 0,
    coins: 0,
    alive: true,
    stompCooldown: 0,
  };

  function resetEntitiesForRun() {
    player.x = 64;
    player.y = (GROUND_Y - 2) * TILE;
    player.vx = 0;
    player.vy = 0;
    player.onGround = false;
    player.coyote = 0;
    player.jumpBuffer = 0;
    player.facing = 1;
    player.invuln = 0;
    player.hearts = 3;
    player.score = 0;
    player.coins = 0;
    player.alive = true;
    player.stompCooldown = 0;

    for (const c of coins) c.taken = false;
    for (const e of enemies) e.alive = true;
  }

  // ---------- Timing / Run ----------
  let running = false;
  let gameOver = false;
  let win = false;
  let timeLeft = SESSION_SECONDS;

  let lastT = 0;
  let raf = 0;
  let fpsSmooth = 60;

  let smokePuffs = [];
  function puff(x, y) {
    for (let i = 0; i < 10; i++) {
      smokePuffs.push({
        x, y,
        vx: (Math.random() - 0.5) * 120,
        vy: (Math.random() - 0.5) * 140,
        life: 0.45 + Math.random() * 0.25,
        t: 0,
      });
    }
  }

  let shakeT = 0;
  let shakeMag = 0;

  function damage() {
    if (player.invuln > 0 || !player.alive) return;
    player.hearts -= 1;
    player.invuln = 1.1;
    shakeT = 0.18;
    shakeMag = 7;
    puff(player.x + player.w / 2, player.y + player.h / 2);
    if (player.hearts <= 0) {
      player.hearts = 0;
      gameOver = true;
      running = false;
      win = false;
      showOverlay(false);
    }
  }

  function finish(success) {
    win = !!success;
    gameOver = !success;
    running = false;
    showOverlay(success);
  }

  function showOverlay(success) {
    overlay.classList.remove('hidden');
    const title = overlay.querySelector('h1');
    const p = overlay.querySelector('p.lead');

    if (success) {
      title.textContent = 'You got the flag! 🎉';
      p.textContent = 'Nice run. Time stopped early.';
    } else {
      title.textContent = gameOver && player.hearts > 0 ? 'Time’s up!' : 'Game over';
      p.textContent = win ? 'You won!' : 'Stomp enemies, collect coins, and reach the flag before time runs out.';
    }
    elTime.textContent = formatTime(Math.max(0, timeLeft));
    if (timeLeft <= 0 && !success && player.hearts > 0) {
      // ensure overlay time is 0:00
    }
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`;
  }

  // ---------- Physics / Movement ----------
  function tryMoveAndCollide(dt) {
    // horizontal
    let ax = 0;
    const left = isDown('ArrowLeft','a','A');
    const right = isDown('ArrowRight','d','D');
    if (left && !right) ax = -MOVE_ACC;
    if (right && !left) ax = MOVE_ACC;

    // friction when no input
    if (!left && !right) {
      if (player.onGround) {
        if (player.vx > 0) ax = -FRICTION;
        else if (player.vx < 0) ax = FRICTION;
        else ax = 0;
      } else {
        ax = 0;
      }
    }

    player.vx += ax * dt;

    player.vx = clamp(player.vx, -MAX_SPEED, MAX_SPEED);

    if (Math.abs(player.vx) > 12) player.facing = player.vx > 0 ? 1 : -1;

    // apply x
    let nextX = player.x + player.vx * dt;

    // collision with solids on x
    if (player.vx !== 0) {
      if (player.vx > 0) {
        // right side
        const rightEdge = nextX + player.w;
        const topY = player.y + 2;
        const botY = player.y + player.h - 2;

        const tx
