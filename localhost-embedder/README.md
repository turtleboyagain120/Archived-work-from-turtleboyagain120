# Localhost Embedder

Embeds one or more **localhost** websites using an `iframe` with the `src` attribute.

## Files
- `index.html` - UI
- `styles.css` - styling
- `src/embedder.js` - logic

## Get the project (GitHub)
### Option A: Download ZIP (easiest)
1. Open this repository on GitHub.
2. Click the **Code** button (usually green) near the top-right.
3. Click **Download ZIP**.
4. After the download finishes, **unzip/extract** it:
   - **Windows (File Explorer)**:
     - Right-click the downloaded `.zip` file → **Extract All…**
     - Choose a folder → **Extract**
   - **Windows (PowerShell)** (optional):
     - Open PowerShell in the folder where the ZIP was downloaded
     - Run: `Expand-Archive -Path .\your-repo.zip -DestinationPath .\your-repo -Force`
   - **macOS / Linux**:
     - Open Terminal in the folder where the ZIP was downloaded
     - Run: `unzip your-repo.zip -d your-repo`

After extracting, go into the project folder and open `index.html` (see **Run** below).

### Option B: Clone with Git (optional)
If you have Git installed:
1. Open a terminal/command prompt.
2. Run:
   - `git clone https://github.com/<owner>/<repo>.git`
3. Then:
   - `cd <repo-folder>`
4. Open `index.html` (see **Run** below).

## Run
1. Start your local site(s) (examples: `http://localhost:3000`, `http://localhost:8080`, etc.).
2. Open `index.html` in your browser.
3. Paste localhost URLs **one per line**.
4. Click **Embed**.

## Notes
- Some apps block iframe embedding using `X-Frame-Options` or CSP `frame-ancestors`.
- If that happens, the iframe will show an error from the embedded site.