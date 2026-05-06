document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const pageInfo = document.getElementById('page-info');
    let currentPage = 0;

    function showPage(index) {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        pages.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });
        pageInfo.textContent = `Page ${index + 1} of 30`;
        drawCanvas(index);
    }

let animationFrame;
let animTime = 0;

function drawCanvas(pageIndex) {
    const canvas = pages[pageIndex].querySelector('.panel-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#87CEEB'; // Sky blue
    animTime += 0.1;

    // Fancy background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98D8C8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Simple comic drawings based on page
    switch (pageIndex) {
            case 0: // Carlos walking animation at home
                // Fancy house with shine
                ctx.shadowColor = '#FFD700';
                ctx.shadowBlur = 20;
                ctx.fillStyle = '#FFEBCD';
                ctx.fillRect(200, 300, 400, 300);
                ctx.shadowBlur = 0;
                ctx.strokeRect(200, 300, 400, 300);
                // Door
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(380, 450, 40, 100);
                
                // Walking Carlos animation
                const legOffset = Math.sin(animTime * 10) * 10;
                ctx.save();
                ctx.translate(400 + Math.sin(animTime * 3) * 5, 350); // Slight bob
                ctx.shadowColor = '#00FF00';
                ctx.shadowBlur = 10;
                // Head
                ctx.beginPath();
                ctx.arc(0, -60, 30, 0, Math.PI * 2);
                ctx.fillStyle = '#FFDAB9';
                ctx.fill();
                ctx.stroke();
                // Eyes
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(-10, -65, 4, 0, Math.PI * 2);
                ctx.arc(10, -65, 4, 0, Math.PI * 2);
                ctx.fill();
                // Body
                ctx.fillStyle = '#4169E1';
                ctx.fillRect(-15, -30, 30, 60);
                // Arms
                ctx.lineTo(-15, 0);
                ctx.lineTo(-30, 20);
                ctx.moveTo(15, 0);
                ctx.lineTo(30, 20);
                ctx.stroke();
                // Legs walking
                ctx.fillStyle = '#000';
                ctx.fillRect(-10, 30, 8, legOffset + 30);
                ctx.fillRect(2, 30, 8, -legOffset + 30);
                ctx.restore();
                break;
            case 1: // Finding notepad
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(300, 250, 200, 150);
                ctx.strokeRect(300, 250, 200, 150);
                // Notepad
                ctx.fillStyle = '#FFFFE0';
                ctx.fillRect(350, 300, 100, 140);
                ctx.strokeRect(350, 300, 100, 140);
                break;
            case 3: // Physics laws revelation
                ctx.font = 'bold 40px Arial';
                ctx.fillStyle = '#FF0000';
                ctx.fillText('PHYSICS SECRETS!', 200, 200);
                break;
            case 4: // Car driving animation
                // Road moving
                ctx.fillStyle = '#333';
                ctx.fillRect(0, 400, canvas.width, 200);
                for (let i = 0; i < canvas.width; i += 100) {
                    ctx.fillStyle = (Math.floor(i / 50 + animTime * 5) % 2) ? '#FFF' : '#000';
                    ctx.fillRect(i, 450, 50, 10);
                }
                // Driving car with bob
                ctx.save();
                ctx.translate(250 + Math.sin(animTime * 4) * 20, 370 + Math.sin(animTime * 6) * 3);
                ctx.shadowColor = '#FF0000';
                ctx.shadowBlur = 15;
                ctx.fillStyle = '#FF0000';
                ctx.fillRect(-80, 0, 160, 60);
                ctx.shadowBlur = 0;
                ctx.strokeRect(-80, 0, 160, 60);
                // Wheels spinning
                ctx.save();
                ctx.translate(-50, 60);
                ctx.rotate(animTime * 20);
                ctx.beginPath();
                ctx.arc(0, 0, 25, 0, Math.PI * 2);
                ctx.fillStyle = '#000';
                ctx.fill();
                ctx.restore();
                ctx.save();
                ctx.translate(50, 60);
                ctx.rotate(animTime * 20);
                ctx.beginPath();
                ctx.arc(0, 0, 25, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                // Carlos driving
                ctx.fillStyle = '#FFDAB9';
                ctx.beginPath();
                ctx.arc(0, -20, 20, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
                break;
            case 8: // Back home traffic
                ctx.fillStyle = '#8B0000';
                ctx.fillRect(50, 300, 700, 200);
                ctx.strokeRect(50, 300, 700, 200);
                break;
            case 9: // Fancy explosion
                ctx.fillStyle = '#666';
                ctx.fillRect(200, 300, 400, 200);
                ctx.strokeRect(200, 300, 400, 200);
                // Animated explosion particles
                ctx.shadowColor = '#FF4500';
                ctx.shadowBlur = 30;
                for (let i = 0; i < 20; i++) {
                    const angle = (i / 20) * Math.PI * 2 + animTime * 2;
                    const dist = 50 + Math.sin(animTime * 5 + i) * 50;
                    ctx.fillStyle = `hsl(${Math.sin(animTime * 3 + i) * 30 + 10}, 100%, 50%)`;
                    ctx.beginPath();
                    ctx.arc(400 + Math.cos(angle) * dist, 250 + Math.sin(angle) * dist, 8, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.shadowBlur = 0;
                break;
            case 10: // Hotdog smell
                // Hotdog cloud
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.ellipse(400, 200, 80, 40, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                break;
            case 11: // Glowing magic ring
                ctx.shadowColor = '#00FFFF';
                ctx.shadowBlur = 40;
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    ctx.arc(400, 350, 50 + i * 10, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(0, 255, 255, ${0.5 - i * 0.2})`;
                    ctx.lineWidth = 5;
                    ctx.stroke();
                }
                ctx.shadowBlur = 0;
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(400, 350, 50, 0, Math.PI * 2);
                ctx.fillStyle = '#00FFFF';
                ctx.fill();
                ctx.stroke();
                // Sparkles
                for (let i = 0; i < 5; i++) {
                    ctx.fillStyle = '#FFFF00';
                    ctx.fillRect(380 + Math.sin(animTime * 10 + i) * 20, 320 + Math.cos(animTime * 8 + i) * 20, 4, 4);
                }
                break;
            case 13: // Facility attack
                // Angry building
                ctx.fillStyle = '#808080';
                ctx.fillRect(200, 200, 400, 400);
                ctx.strokeRect(200, 200, 400, 400);
                // Angry eyes
                ctx.fillStyle = '#FF0000';
                ctx.beginPath();
                ctx.arc(300, 250, 20, 0, Math.PI * 2);
                ctx.arc(500, 250, 20, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 20: // Chainsaw
                ctx.fillStyle = '#C0C0C0';
                ctx.fillRect(300, 300, 200, 50);
                ctx.strokeRect(300, 300, 200, 50);
                // Chain teeth
                for (let i = 0; i < 10; i++) {
                    ctx.fillRect(305 + i*20, 280, 10, 30);
                }
                break;
            case 22: // Earth center
                // Earth layers
                ctx.fillStyle = '#8B4513';
                ctx.beginPath();
                ctx.arc(400, 300, 150, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#FF0000';
                ctx.beginPath();
                ctx.arc(400, 300, 80, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                break;
            case 23: // Red giant ball
                ctx.fillStyle = '#FF0000';
                ctx.beginPath();
                ctx.arc(400, 300, 120, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                break;
            case 24: // Flashy Rickroll
                ctx.shadowColor = '#00FF00';
                ctx.shadowBlur = 50;
                ctx.font = `bold ${60 + Math.sin(animTime * 10) * 10}px Arial`;
                ctx.fillStyle = '#00FF00';
                ctx.textAlign = 'center';
                ctx.fillText('RICKROLLED!', 400, 350);
                ctx.shadowBlur = 0;
                // Dancing Rickroll ball
                ctx.save();
                ctx.translate(400, 400 + Math.sin(animTime * 5) * 20);
                ctx.rotate(animTime * 2);
                ctx.beginPath();
                ctx.arc(0, 0, 60 + Math.sin(animTime * 3) * 10, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${(animTime * 20) % 360}, 100%, 50%)`;
                ctx.fill();
                ctx.strokeStyle = '#FFF';
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.restore();
                break;
            default:
                // Fancy default Carlos with idle animation
                ctx.save();
                ctx.shadowColor = '#4169E1';
                ctx.shadowBlur = 15;
                ctx.translate(400 + Math.sin(animTime * 2) * 3, 300 + Math.cos(animTime * 1.5) * 2);
                // Head
                ctx.beginPath();
                ctx.arc(0, -50, 35, 0, Math.PI * 2);
                ctx.fillStyle = '#FFDAB9';
                ctx.fill();
                ctx.stroke();
                // Body
                ctx.fillStyle = '#4169E1';
                ctx.fillRect(-20, -15, 40, 70);
                // Arms waving
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(-20, 0);
                ctx.lineTo(-40 + Math.sin(animTime * 4) * 10, 20 + Math.cos(animTime * 4) * 5);
                ctx.moveTo(20, 0);
                ctx.lineTo(40 - Math.sin(animTime * 4) * 10, 20 - Math.cos(animTime * 4) * 5);
                ctx.stroke();
                // Legs
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.moveTo(-15, 55);
                ctx.lineTo(-15 + Math.sin(animTime * 3) * 8, 90);
                ctx.moveTo(15, 55);
                ctx.lineTo(15 - Math.sin(animTime * 3) * 8, 90);
                ctx.stroke();
                ctx.restore();
        }

        // Fancy speech bubble with glow
        ctx.shadowColor = '#FFF';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#FFF8DC';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(80, 50, 640, 80, 15);
        ctx.moveTo(650, 90);
        ctx.lineTo(620, 130);
        ctx.lineTo(660, 120);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#000';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Comic Page ${pageIndex + 1}`, 400, 95);
    }

    function animate() {
        drawCanvas(currentPage);
        animationFrame = requestAnimationFrame(animate);
    }

    animate();

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        } else if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Initial show
    showPage(0);
});
