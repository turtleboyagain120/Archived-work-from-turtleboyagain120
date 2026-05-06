(() => {
  const urlsInput = document.getElementById('urlsInput');
  const embedBtn = document.getElementById('embedBtn');
  const clearBtn = document.getElementById('clearBtn');
  const statusEl = document.getElementById('status');
  const gridEl = document.getElementById('iframesGrid');

  const presetButtons = Array.from(document.querySelectorAll('[data-preset]'));
  const allPresetsBtn = document.getElementById('allPresetsBtn');

  const normalizeLocalUrl = (raw) => {
    if (!raw) return null;
    let s = String(raw).trim();
    if (!s) return null;

    // Allow user to type without protocol
    if (!/^https?:\/\//i.test(s)) {
      if (s.startsWith('localhost') || s.startsWith('127.0.0.1') || s.startsWith('[::1]')) {
        s = `http://${s}`;
      }
    }

    let u;
    try {
      u = new URL(s);
    } catch {
      return null;
    }

    const hostOk =
      u.hostname === 'localhost' || u.hostname === '127.0.0.1' || u.hostname === '[::1]';
    if (!hostOk) return null;

    // Only http(s) for browser iframes
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;

    return u.toString();
  };

  const parseLines = (text) => {
    return String(text)
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .map(normalizeLocalUrl)
      .filter(Boolean);
  };

  const setStatus = (msg, kind = 'neutral') => {
    statusEl.textContent = msg;
    statusEl.style.color =
      kind === 'error' ? 'var(--danger)' : kind === 'ok' ? 'var(--accent2)' : 'var(--muted)';
  };

  const createIframeCard = (url) => {
    const card = document.createElement('div');
    card.className = 'iframeCard';

    const top = document.createElement('div');
    top.className = 'iframeTop';

    const urlEl = document.createElement('div');
    urlEl.className = 'iframeUrl';
    urlEl.title = url;
    urlEl.textContent = url;

    const rm = document.createElement('button');
    rm.className = 'removeBtn';
    rm.type = 'button';
    rm.setAttribute('aria-label', 'Remove iframe');
    rm.textContent = '×';
    rm.addEventListener('click', () => {
      card.remove();
      setStatus('Removed one embed.');
    });

    top.appendChild(urlEl);
    top.appendChild(rm);

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.loading = 'lazy';

    card.appendChild(top);
    card.appendChild(iframe);
    return card;
  };

  const embedAll = () => {
    const urls = parseLines(urlsInput.value);
    gridEl.innerHTML = '';

    if (urls.length === 0) {
      setStatus('Paste at least one valid localhost URL (one per line).', 'error');
      return;
    }

    // Deduplicate while preserving order
    const seen = new Set();
    const unique = [];
    for (const u of urls) {
      if (!seen.has(u)) {
        seen.add(u);
        unique.push(u);
      }
    }

    unique.forEach((u) => gridEl.appendChild(createIframeCard(u)));

    setStatus(`Embedded ${unique.length} local site(s) using iframe src.`, 'ok');
  };

  const clearAll = () => {
    gridEl.innerHTML = '';
    urlsInput.value = '';
    setStatus('Cleared.', 'neutral');
    urlsInput.focus();
  };

  embedBtn.addEventListener('click', embedAll);
  clearBtn.addEventListener('click', clearAll);

  urlsInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') embedAll();
  });

  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const port = btn.getAttribute('data-preset');
      const entry = `http://localhost:${port}`;

      const current = parseLines(urlsInput.value);
      const exists = current.includes(entry);
      if (!exists) {
        const lines = urlsInput.value.trim().length
          ? urlsInput.value.split(/\r?\n/)
          : [];
        lines.push(entry);
        urlsInput.value = lines.join('\n');
      }
      setStatus(`Added preset: ${entry}`);
    });
  });

  if (allPresetsBtn) {
    allPresetsBtn.addEventListener('click', () => {
      const entries = presetButtons
        .map((b) => b.getAttribute('data-preset'))
        .filter(Boolean)
        .map((port) => `http://localhost:${port}`);

      const current = parseLines(urlsInput.value);
      const currentSet = new Set(current);

      for (const entry of entries) {
        if (!currentSet.has(entry)) {
          current.push(entry);
          currentSet.add(entry);
        }
      }

      urlsInput.value = current.join('\n');
      setStatus(`Added all presets (${entries.length}).`, 'ok');
    });
  }

  setStatus('Ready. Paste localhost URLs, then click Embed.', 'neutral');
})();

