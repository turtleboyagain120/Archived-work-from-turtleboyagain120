// ============================================
// WEBSITE UNBLOCKER - HORRIBLE METHODS
// Warning: This code is intentionally terrible
// ============================================

function setStatus(msg) {
    const el = document.getElementById('status');
    el.innerHTML = msg;
    el.style.borderColor = '#' + Math.floor(Math.random()*16777215).toString(16);
}

function getUrl() {
    let url = document.getElementById('urlInput').value.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    return url;
}

function isChecked(id) {
    return document.getElementById(id).checked;
}

// Method 1: Nested Inception Iframes
// Create iframe inside iframe inside iframe...
function method1_inception(url) {
    const container = document.createElement('div');
    container.className = 'method-frame';
    container.innerHTML = '<div class="method-title">Method 1: Nested Inception Iframes</div>';
    
    const outer = document.createElement('iframe');
    outer.sandbox = 'allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation';
    outer.style.width = '100%';
    outer.style.height = '200px';
    outer.style.border = '5px solid red';
    
    // Build nested iframe HTML
    const innerHtml = `
        <iframe 
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation"
            style="width:100%;height:100%;border:5px solid blue"
            srcdoc="<!DOCTYPE html>
                <html>
                <body style='margin:0'>
                    <iframe 
                        sandbox='allow-same-origin allow-scripts allow-forms allow-popups'
                        style='width:100%;height:150px;border:5px solid green'
                        src='${url}'
                    ></iframe>
                </body>
                </html>"
        ></iframe>
    `;
    
    outer.srcdoc = `<!DOCTYPE html><html><body style="margin:0">${innerHtml}</body></html>`;
    container.appendChild(outer);
    return container;
}

// Method 2: Base64 Soup
// Encode everything in base64 multiple times
function method2_base64Soup(url) {
    const container = document.createElement('div');
    container.className = 'method-frame';
    container.innerHTML = '<div class="method-title">Method 2: Base64 Soup</div>';
    
    // Triple base64 encode because one is never enough
    const b1 = btoa(url);
    const b2 = btoa(b1);
    const b3 = btoa(b2);
    
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '200px';
    iframe.style.border = '5px dotted orange';
    
    // Decode through eval chain
    const script = `
        var d1 = atob(atob(atob('${b3}')));
        document.write('<iframe src=\"' + d1 + '\" style=\"width:100%;height:100%;border:0\"></iframe>');
    `;
    
    iframe.srcdoc = `<!DOCTYPE html>
        <html>
        <body>
            <script>${script}<\/script>
        </body>
        </html>`;
    
    container.appendChild(iframe);
    return container;
}

// Method 3: document.write Madness
// Build content character by character using terrible string concatenation
function method3_documentWrite(url) {
    const container = document.createElement('div');
    container.className = 'method-frame';
    container.innerHTML = '<div class="method-title">Method 3: document.write Madness</div>';
    
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '200px';
    iframe.style.border = '5px dashed purple';
    
    // Obfuscate the URL using char codes
    let charCodes = [];
    for (let i = 0; i < url.length; i++) {
        charCodes.push(url.charCodeAt(i));
    }
    
    const script = `
        var cc = [${charCodes.join(',')}];
        var u = '';
        for (var i = 0; i < cc.length; i++) {
            u += String.fromCharCode(cc[i]);
        }
        var html = '<' + 'ifr' + 'ame sr' + 'c="' + u + '" sty' + 'le="wi' + 'dth:10' + '0%;he' + 'ight:1' + '00%;bo' + 'rder:0' + '"></' + 'ifra' + 'me>';
        document.write(html);
    `;
    
    iframe.srcdoc = `<!DOCTYPE html><html><body><script>${script}<\/script></body></html>`;
    container.appendChild(iframe);
    return container;
}

// Method 4: Blob URL Redirect Chain
// Create a chain of blob URLs that redirect to each other
function method4_blobChain(url) {
    const container = document.createElement('div');
    container.className = 'method-frame';
    container.innerHTML = '<div class="method-title">Method 4: Blob URL Redirect Chain</div>';
    
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '200px';
    iframe.style.border = '5px inset lime';
    
    // Create chain of 3 blob URLs
    const html3 = `<!DOCTYPE html><html><body>
        <iframe src="${url}" style="width:100%;height:100%;border:0"></iframe>
    </body></html>`;
    const blob3 = new Blob([html3], {type: 'text/html'});
    const url3 = URL.createObjectURL(blob3);
    
    const html2 = `<!DOCTYPE html><html><body>
        <script>window.location.href = '${url3}';<\/script>
    </body></html>`;
    const blob2 = new Blob([html2], {type: 'text/html'});
    const url2 = URL.createObjectURL(blob2);
    
    const html1 = `<!DOCTYPE html><html><body>
        <script>setTimeout(function(){ window.location.href = '${url2}'; }, 100);<\/script>
    </body></html>`;
    const blob1 = new Blob([html1], {type: 'text/html'});
    const url1 = URL.createObjectURL(blob1);
    
    iframe.src = url1;
    container.appendChild(iframe);
    return container;
}

// Method 5: Data URI Meta Refresh
// Use data URI with meta refresh to redirect
function method5_dataUriMeta(url) {
    const container = document.createElement('div');
    container.className = 'method-frame';
    container.innerHTML = '<div class="method-title">Method 5: Data URI Meta Refresh</div>';
    
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '200px';
    iframe.style.border = '5px outset pink';
    
    // Build a data URI page that meta-refreshes to target
    const page = `<!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="refresh" content="0; url=${url}">
            <style>body{background:#000;color:#0f0;font-family:monospace;padding:20px}</style>
        </head>
        <body>
            <marquee>LOADING... PLEASE WAIT... OR DON'T...</marquee>
            <p>If nothing happens, <a href="${url}" target="_top">click here</a></p>
        </body>
        </html>`;
    
    iframe.src = 'data:text/html;base64,' + btoa(page);
    container.appendChild(iframe);
    return container;
}

// Method 6: window.open() Inside Iframe
// Try to open the URL using window.open inside a sandboxed iframe
function method6_windowOpen(url) {
    const container = document.createElement('div');
    container.className = 'method-frame';
    container.innerHTML = '<div class="method-title">Method 6: window.open() Inside Iframe</div>';
    
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '200px';
    iframe.style.border = '5px groove cyan';
    
    const script = `
        try {
            var w = window.open('${url}', '_blank');
            if (w) {
                document.body.innerHTML = '<h2>Opened in new window!</h2>';
            } else {
                document.body.innerHTML = '<h2>Popup blocked! Trying direct...</h2>';
                setTimeout(function(){
                    var a = document.createElement('a');
                    a.href = '${url}';
                    a.target = '_top';
                    a.click();
                }, 1000);
            }
        } catch(e) {
            document.body.innerHTML = '<h2>Error: ' + e.message + '</h2>';
        }
    `;
    
    iframe.srcdoc = `<!DOCTYPE html><html><body style="margin:0;background:#111;color:#fff;font-family:monospace;padding:20px">
        <p>Attempting window.open()...</p>
        <script>${script}<\/script>
    </body></html>`;
    
    container.appendChild(iframe);
    return container;
}

// Method 7: Form POST Target
// Create a form that posts to the iframe
function method7_formPost(url) {
    const container = document.createElement('div');
    container.className = 'method-frame';
    container.innerHTML = '<div class="method-title">Method 7: Form POST Target</div>';
    
    const iframe = document.createElement('iframe');
    iframe.name = 'formTarget_' + Date.now();
    iframe.style.width = '100%';
    iframe.style.height = '200px';
    iframe.style.border = '5px ridge gold';
    
    const formWrapper = document.createElement('div');
    const form = document.createElement('form');
    form.action = url;
    form.method = 'POST';
    form.target = iframe.name;
    form.style.display = 'none';

    const hackInput = document.createElement('input');
    hackInput.type = 'hidden';
    hackInput.name = 'hack';
    hackInput.value = 'true';

    const timestampInput = document.createElement('input');
    timestampInput.type = 'hidden';
    timestampInput.name = 'timestamp';
    timestampInput.value = String(Date.now());

    form.appendChild(hackInput);
    form.appendChild(timestampInput);
    formWrapper.appendChild(form);
    
    container.appendChild(iframe);
    container.appendChild(formWrapper);
    
    // Auto submit the form after a delay
    setTimeout(() => {
        const form = formWrapper.querySelector('form');
        if (form) form.submit();
    }, 500);
    
    return container;
}

// Method 8: Service Worker Promise (Broken)
// Pretends to use service workers but does nothing useful
function method8_serviceWorker(url) {
    const container = document.createElement('div');
    container.className = 'method-frame';
    container.innerHTML = '<div class="method-title">Method 8: Service Worker Promise (Broken)</div>';
    
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '200px';
    iframe.style.border = '5px dotted brown';
    
    const swCode = btoa(`
        self.addEventListener('fetch', event => {
            event.respondWith(fetch(event.request));
        });
    `);
    
    const script = `
        (async function() {
            document.body.innerHTML = '<h3>Attempting Service Worker registration...</h3>';
            try {
                if ('serviceWorker' in navigator) {
                    // This won't work from data/blob URLs but let's try anyway
                    const blob = new Blob([atob('${swCode}')], {type: 'application/javascript'});
                    const swUrl = URL.createObjectURL(blob);
                    const reg = await navigator.serviceWorker.register(swUrl);
                    document.body.innerHTML += '<p>Registered! (probably not working)</p>';
                    
                    setTimeout(() => {
                        window.location.href = '${url}';
                    }, 2000);
                } else {
                    document.body.innerHTML += '<p>Service Workers not supported. Falling back...</p>';
                    setTimeout(() => {
                        document.body.innerHTML += '<iframe src=\"${url}\" style=\"width:100%;height:100px;border:0\"></iframe>';
                    }, 1000);
                }
            } catch(e) {
                document.body.innerHTML = '<h3>Service Worker Failed (expected):</h3><p>' + e.message + '</p>';
                document.body.innerHTML += '<p>Here is a consolation iframe:</p>';
                document.body.innerHTML += '<iframe src=\"${url}\" style=\"width:100%;height:100px;border:0\"></iframe>';
            }
        })();
    `;
    
    iframe.srcdoc = `<!DOCTYPE html><html><body style="margin:0;background:#1a1a1a;color:#ff0;font-family:monospace;padding:20px">
        <script>${script}<\/script>
    </body></html>`;
    
    container.appendChild(iframe);
    return container;
}

// Main unblock function
function unblock() {
    const container = document.getElementById('iframeContainer');
    const url = getUrl();
    
    setStatus(`Initializing horrible methods for: ${url}...`);
    container.innerHTML = '';
    
    setTimeout(() => {
        if (isChecked('method1')) container.appendChild(method1_inception(url));
        if (isChecked('method2')) container.appendChild(method2_base64Soup(url));
        if (isChecked('method3')) container.appendChild(method3_documentWrite(url));
        if (isChecked('method4')) container.appendChild(method4_blobChain(url));
        if (isChecked('method5')) container.appendChild(method5_dataUriMeta(url));
        if (isChecked('method6')) container.appendChild(method6_windowOpen(url));
        if (isChecked('method7')) container.appendChild(method7_formPost(url));
        if (isChecked('method8')) container.appendChild(method8_serviceWorker(url));
        
        setStatus('All horrible methods deployed! Check results above. (Spoiler: most won\'t work due to browser security)');
    }, 500);
}

// Initialize with some console spam
console.log('%cWARNING', 'color:red;font-size:50px');
console.log('%cThis is a horrible website unblocker.', 'color:orange;font-size:20px');
console.log('%cDo not use this in production.', 'color:yellow;font-size:20px');
console.log('%cOr anywhere, really.', 'color:green;font-size:20px');

