// Parse URL parameters
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const blockedUrl = urlParams.get('url') || 'No URL provided';
    const reasonCode = urlParams.get('c') || 'Unknown';
    
    const urlEl = document.getElementById('blockedUrl');
    const reasonEl = document.getElementById('reasonCode');
    
    // Truncate very long URLs for display
    const displayUrl = blockedUrl.length > 200 ? blockedUrl.substring(0, 200) + '...' : blockedUrl;
    urlEl.textContent = displayUrl;
    urlEl.title = blockedUrl; // Show full URL on hover
    reasonEl.textContent = reasonCode === 'UNKN' ? 'Unknown category' : reasonCode;
    
    // Modal handling
    const requestBtn = document.getElementById('requestBtn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    
    requestBtn.addEventListener('click', function() {
        modal.classList.add('active');
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Sign out link
    const signOutLink = document.getElementById('signOutLink');
    signOutLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'https://login.live.com/logout.srf';
    });
});

