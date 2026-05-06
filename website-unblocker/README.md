# Website Unblocker (Horrible Methods Edition)

A satirical, intentionally terrible website unblocker that attempts to load external URLs inside iframes using questionable and hacky techniques.

## Features (Anti-Features?)

This project demonstrates **8 horrible methods** to try to load a website inside an iframe:

1. **Nested Inception Iframes** - Iframes inside iframes inside iframes. It goes deeper.
2. **Base64 Soup** - Triple base64 encoding because security through obscurity works, right?
3. **document.write Madness** - Building HTML by concatenating strings character-by-character using `String.fromCharCode`.
4. **Blob URL Redirect Chain** - A chain of 3 blob URLs that redirect to each other with timeouts.
5. **Data URI Meta Refresh** - Serving a page via data URI that uses `<meta http-equiv="refresh">`.
6. **window.open() Inside Iframe** - Attempting popup windows from inside a sandboxed iframe.
7. **Form POST Target** - POSTing to a hidden form targeting the iframe.
8. **Service Worker Promise (Broken)** - Pretending service workers will magically bypass CORS (they won't).

## Design Choices

- **Comic Sans MS** font because professionalism is overrated.
- **Blinking title** because subtlety is for cowards.
- **Rainbow gradient background** because why not.
- **Ridiculous CSS borders** (ridge, groove, inset, dashed, dotted, double) all over the place.
- **Inline styles mixed with external CSS** for maximum chaos.
- **eval-adjacent patterns** via `document.write` and dynamic script injection.

## Does It Work?

**Short answer:** No, not really.

**Long answer:** Modern browsers have security features (X-Frame-Options, CSP, CORS, Same-Origin Policy) that prevent most of these techniques from working on arbitrary websites. This project is a humorous demonstration of what *not* to do. It will work for sites that explicitly allow iframe embedding, but those didn't need unblocking in the first place.

## How to Use

1. Open `index.html` in your browser.
2. Enter a URL (defaults to `https://example.com`).
3. Click **"UNBLOCK (TRUST ME)"**.
4. Watch the chaos unfold.
5. Marvel as most methods fail spectacularly.

## Disclaimer

This is a **parody/educational project** showcasing bad coding practices and failed iframe bypass techniques. It is not intended to actually bypass network filters or security controls. The methods shown are intentionally flawed and will not work against properly configured security policies.

