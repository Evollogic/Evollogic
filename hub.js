// hub.js - Lógica do Carrossel do Dashboard

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('company-carousel');
    const btnLeft = document.getElementById('scroll-left');
    const btnRight = document.getElementById('scroll-right');
    const cards = document.querySelectorAll('.company-card');
    const details = document.querySelectorAll('.company-details');

    // 🎵 Motor de Áudio para os cliques do painel
    let audioCtx;
    function playClick() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    }

    // Lógica para as setas rolarem o carrossel horizontalmente
    btnLeft.addEventListener('click', () => {
        playClick();
        carousel.scrollBy({ left: -200, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
        playClick();
        carousel.scrollBy({ left: 200, behavior: 'smooth' });
    });

    // Lógica para clicar no card e abrir os detalhes embaixo
    cards.forEach(card => {
        card.addEventListener('click', () => {
            playClick();

            // 1. Tira o brilho de todos os cards
            cards.forEach(c => c.classList.remove('active'));
            // 2. Coloca o brilho no card que você clicou
            card.classList.add('active');

            // 3. Pega o nome da empresa que tá no "data-target"
            const targetId = card.getAttribute('data-target');

            // 4. Esconde todos os textos de baixo
            details.forEach(detail => detail.classList.remove('active'));

            // 5. Tenta achar o texto da empresa clicada
            const targetDetail = document.getElementById(`${targetId}-info`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            } else {
                // Se a empresa ainda não tiver texto pronto, mostra o aviso de "LOCKED"
                document.getElementById('placeholder-info').classList.add('active');
            }
        });
    });
});
