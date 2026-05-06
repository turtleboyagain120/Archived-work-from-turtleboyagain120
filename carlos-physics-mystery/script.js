let currentPage = 1;
const totalPages = 30;

function updatePage() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.classList.toggle('active', index + 1 === currentPage);
    });
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
    
    const prevBtn = document.querySelector('button[onclick="prevPage()"]');
    const nextBtn = document.querySelector('button[onclick="nextPage()"]');
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updatePage();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePage();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', updatePage);
