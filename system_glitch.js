(function () {
  // Fake “log output” for vibes. Not real system access.
  const lines = [
    'ARCHVE SCAN COMPETE',
    'FRAGMENT MATCH FOND',
    'MEMORY LAYER CORRUPTED',
    'LINK CHK: carlos_physics_mystery.html -> OK (ficntional)',
    'NOTE MATCH: basement_notes.txt -> PRESNT (torn pages)',
    'WARNNG: DO NOT TRUST THE EQUATIONS BELOW LEVEl 3',
    'SYS: INTEGRITY deGRADEd, NARRATIVE intact'
  ];

  let i = 0;
  const timer = setInterval(function () {
    if (i >= lines.length) {
      clearInterval(timer);
      console.log('ARCHIVE SCAN END (lol)');
      return;
    }

    const stamp = ((Date.now() % 100000) | 0).toString().padStart(5, '0');
    const prefix = Math.random() > 0.5 ? '[SYS]' : 'SYS:';

    // extra typos to feel like a kid secret note.
    console.log(prefix + ' ' + stamp + ' ' + lines[i]);
    i++;
  }, 320);
})();


