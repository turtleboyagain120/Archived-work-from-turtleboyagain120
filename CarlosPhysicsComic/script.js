let currentPage = 1;
const totalPages = 7;

const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

function showPage(pageNum) {
    pages.forEach((page, index) => {
        page.style.display = index + 1 === pageNum ? 'flex' : 'none';
    });
    
    prevBtn.disabled = pageNum === 1;
    nextBtn.disabled = pageNum === totalPages;
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
});

// Auto-advance demo (optional, can be removed)
let autoTimer;
nextBtn.addEventListener('click', () => {
    clearTimeout(autoTimer);
    if (currentPage < totalPages) {
        autoTimer = setTimeout(() => {
            currentPage++;
            showPage(currentPage);
        }, 3000);
    }
});

showPage(currentPage);
