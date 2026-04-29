(function () {
  const CFG = {
    spacing: 110,
    maxRadius: 30,
    minRadius: 22,
    cycleMs: 32000,
    pulseMin: 0.9,
    colonyLight: [240, 228, 200],
    colonyDark: [230, 228, 220],
    bgLight: '#131940',
    bgDark: '#101114',
    targetFps: 30,
    driftAmp: 3,           // px of wander around the grid cell
    driftPeriodMs: 22000,  // slow base period for drift
    flashPeriodMin: 18000, // each colony flashes every 18–90s
    flashPeriodMax: 90000,
    flashDutyCycle: 0.10,  // fraction of the cycle spent flashing
    flashStrength: 0.55,   // extra brightness at flash peak
    flashGrow: 0.18,       // extra size at flash peak (fraction of radius)
  };

  const canvas = document.createElement('canvas');
  canvas.id = 'colonies-bg';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;display:block;';
  const ctx = canvas.getContext('2d', { alpha: false });

  let colonies = [];
  let w = 0;
  let h = 0;
  let dpr = 1;
  let rafId = null;
  let lastDraw = 0;

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function genColonies() {
    colonies = [];
    const rand = mulberry32(0xc01017);
    const cols = Math.ceil(w / CFG.spacing) + 2;
    const rows = Math.ceil(h / CFG.spacing) + 2;
    const gridW = cols * CFG.spacing;
    const gridH = rows * CFG.spacing;
    const originX = (w - gridW) / 2 + CFG.spacing / 2;
    const originY = (h - gridH) / 2 + CFG.spacing / 2;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const sizeRoll = rand();
        const maxR =
          CFG.minRadius + sizeRoll * (CFG.maxRadius - CFG.minRadius);
        const flashPeriod =
          CFG.flashPeriodMin +
          rand() * (CFG.flashPeriodMax - CFG.flashPeriodMin);
        colonies.push({
          x: originX + col * CFG.spacing,
          y: originY + row * CFG.spacing,
          maxR: maxR,
          phase: rand() * CFG.cycleMs,
          opacity: 0.55 + rand() * 0.25,
          driftSeed: rand() * Math.PI * 2,
          driftXFreq: 0.8 + rand() * 0.5,
          driftYFreq: 0.8 + rand() * 0.5,
          flashPeriod: flashPeriod,
          flashOffset: rand() * flashPeriod,
        });
      }
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    genColonies();
  }

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function bgColor() {
    return isDark() ? CFG.bgDark : CFG.bgLight;
  }

  function colonyColor() {
    return isDark() ? CFG.colonyDark : CFG.colonyLight;
  }

  function draw(now) {
    ctx.fillStyle = bgColor();
    ctx.fillRect(0, 0, w, h);

    const [cr, cg, cb] = colonyColor();
    const pulseRange = 1 - CFG.pulseMin;
    const driftBase = (now / CFG.driftPeriodMs) * Math.PI * 2;
    for (let i = 0; i < colonies.length; i++) {
      const c = colonies[i];
      const phase = ((now + c.phase) % CFG.cycleMs) / CFG.cycleMs;
      const pulseScale =
        CFG.pulseMin + pulseRange * 0.5 * (1 - Math.cos(phase * Math.PI * 2));

      // flash envelope: most of the cycle = 0, short sine bump near the end
      const fp = ((now + c.flashOffset) % c.flashPeriod) / c.flashPeriod;
      let flash = 0;
      if (fp > 1 - CFG.flashDutyCycle) {
        const t = (fp - (1 - CFG.flashDutyCycle)) / CFG.flashDutyCycle;
        flash = Math.sin(t * Math.PI);
      }

      const r = c.maxR * (pulseScale + flash * CFG.flashGrow);
      const dx = Math.sin(driftBase * c.driftXFreq + c.driftSeed) * CFG.driftAmp;
      const dy =
        Math.cos(driftBase * c.driftYFreq + c.driftSeed * 1.7) * CFG.driftAmp;
      const cx = c.x + dx;
      const cy = c.y + dy;

      const opacity = Math.min(1, c.opacity + flash * CFG.flashStrength);

      const grad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
      grad.addColorStop(0, `rgba(${cr},${cg},${cb},${opacity})`);
      grad.addColorStop(0.6, `rgba(${cr},${cg},${cb},${opacity * 0.82})`);
      grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    const now = Date.now();
    const frameInterval = 1000 / CFG.targetFps;
    if (now - lastDraw >= frameInterval) {
      lastDraw = now;
      draw(now);
    }
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    document.body.prepend(canvas);
    resize();
    window.addEventListener('resize', resize, { passive: true });
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      draw(Date.now());
    } else {
      rafId = requestAnimationFrame(loop);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else if (!rafId && !mq.matches) {
        rafId = requestAnimationFrame(loop);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
