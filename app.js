// 🛡️ SEU IP REAL (Te leva pro Hub) 🛡️
// Mudei para o seu IP real para você poder entrar e ver o novo Dashboard
const ALLOWED_IP = "138.94.168.160"; 

// ==========================================
// 🎵 MOTOR DE ÁUDIO (SOM HACKER + ECO) 🎵
// ==========================================
let audioCtx;

function initAudio() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

// Som de digitação do Terminal (Teclado mecânico rápido)
function playTerminalTick() {
    if (!audioCtx || audioCtx.state !== 'running') return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200 + Math.random() * 300, audioCtx.currentTime); 
    
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02); 
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.02);
}

// Som Sci-Fi com ECO (Para o botão MUTE/UNMUTE e Navegação de Empresas)
function playEchoSound() {
    if (!audioCtx || audioCtx.state !== 'running') return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const delay = audioCtx.createDelay(); // Efeito de Eco
    const feedback = audioCtx.createGain(); // Duração do Eco

    delay.delayTime.value = 0.15; // Velocidade da repetição
    feedback.gain.value = 0.4;    // Intensidade da repetição

    // Conectando os nós de áudio
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    gain.connect(delay);
    delay.connect(audioCtx.destination);
    delay.connect(feedback);
    feedback.connect(delay);

    // Frequência do som (Pew!)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
}

// ==========================================
// 💻 ANIMAÇÃO DO TERMINAL 💻
// ==========================================
const terminalText = document.getElementById('terminal-text');
const bootSequence = [
    "EVOLLOGIC_OS v1.0",
    "INITIALIZING SECURE KERNEL...",
    "MOUNTING VIRTUAL DRIVES... [OK]",
    "ESTABLISHING PROTOCOLS... [OK]",
    "> RESOLVING INCOMING IP ADDRESS..."
];

let lineIndex = 0;

function typeTerminal() {
    if (lineIndex < bootSequence.length) {
        let p = document.createElement("p");
        p.style.margin = "5px 0";
        if(terminalText) terminalText.appendChild(p);
        
        let text = bootSequence[lineIndex];
        let charIndex = 0;
        
        let typingInterval = setInterval(() => {
            if(p) p.innerHTML += text.charAt(charIndex);
            playTerminalTick(); // Toca o clique do teclado
            charIndex++;
            
            if (charIndex === text.length) {
                clearInterval(typingInterval);
                lineIndex++;
                setTimeout(typeTerminal, 300); // Pausa entre linhas
            }
        }, 30);
    } else {
        verifyIP(); // Terminou de digitar? Verifica o IP!
    }
}

// BOTÃO INICIAR SISTEMA (INDEX.HTML)
const btnStartBoot = document.getElementById('btn-start-boot');
if (btnStartBoot) {
    btnStartBoot.addEventListener('click', () => {
        initAudio(); 
        playEchoSound(); 
        document.getElementById('init-screen').style.display = 'none';
        document.getElementById('terminal-boot').style.display = 'block';
        setTimeout(typeTerminal, 500); 
    });
}

// ==========================================
// 🔍 VERIFICAÇÃO DE IP & REDIRECIONAMENTO 🔍
// ==========================================
function verifyIP() {
    let resultLine = document.createElement("p");
    resultLine.style.margin = "5px 0";
    if(terminalText) terminalText.appendChild(resultLine);

    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
            resultLine.innerHTML = `> IP IDENTIFIED: ${data.ip}`;
            
            setTimeout(() => {
                if (data.ip === ALLOWED_IP) {
                    // SE FOR O SEU IP: Abre o Dashboard
                    let terminalBoot = document.getElementById('terminal-boot');
                    let appWrapper = document.getElementById('app-wrapper');
                    if(terminalBoot) terminalBoot.style.display = 'none';
                    if(appWrapper) appWrapper.style.display = 'flex';
                } else {
                    // SE NÃO FOR O SEU IP: Trava na tela de música
                    let terminalBoot = document.getElementById('terminal-boot');
                    let comingSoon = document.getElementById('coming-soon-screen');
                    let promptMsg = document.getElementById('transmission-prompt');
                    
                    if(terminalBoot) terminalBoot.style.display = 'none';
                    if(comingSoon) comingSoon.style.display = 'block';
                    if(promptMsg) promptMsg.style.display = 'block';
                }
            }, 1500); 
        })
        .catch(() => {
            resultLine.innerHTML = `> NETWORK FIREWALL DETECTED. BYPASSING...`;
            setTimeout(() => {
                let terminalBoot = document.getElementById('terminal-boot');
                let comingSoon = document.getElementById('coming-soon-screen');
                let promptMsg = document.getElementById('transmission-prompt');
                
                if(terminalBoot) terminalBoot.style.display = 'none';
                if(comingSoon) comingSoon.style.display = 'block';
                if(promptMsg) promptMsg.style.display = 'block';
            }, 1500);
        });
}

// ==========================================
// 🎵 CONTROLE DE MÚSICA (INDEX.HTML) 🎵
// ==========================================
const bgMusic = document.getElementById('bg-music');
const btnAcceptTransmission = document.getElementById('btn-accept-transmission');
const btnToggleMusic = document.getElementById('btn-toggle-music');

if (btnAcceptTransmission) {
    btnAcceptTransmission.addEventListener('click', () => {
        initAudio();
        playEchoSound();
        document.getElementById('transmission-prompt').style.display = 'none';
        document.getElementById('coming-soon-content').style.display = 'block';
        
        if(bgMusic) {
            bgMusic.volume = 0.5; 
            bgMusic.play().catch(e => console.log("Erro de áudio:", e));
        }
    });
}

if (btnToggleMusic) {
    btnToggleMusic.addEventListener('click', (e) => {
        initAudio();
        playEchoSound(); // GERA O SOM DE ECO!
        
        if (bgMusic && bgMusic.paused) {
            bgMusic.play();
            e.target.innerText = "🔊 MUTE AUDIO";
        } else if (bgMusic) {
            bgMusic.pause();
            e.target.innerText = "🔇 UNMUTE AUDIO";
        }
    });
}

// ==========================================
// 🏢 NAVEGAÇÃO DE EMPRESAS (HUB.HTML) - CARROSSEL 🏢
// ==========================================

// Lógica dos Botões de Scroll do Carrossel
const track = document.getElementById('track');
const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');

if (btnLeft && btnRight && track) {
    btnLeft.addEventListener('click', () => {
        initAudio();
        playEchoSound(); // Efeito sonoro do sistema ao clicar
        track.scrollBy({ left: -200, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
        initAudio();
        playEchoSound(); 
        track.scrollBy({ left: 200, behavior: 'smooth' });
    });
}

// Lógica de clicar no card e mostrar a página da empresa
document.querySelectorAll('.empresa-card').forEach(card => {
    card.addEventListener('click', (e) => {
        initAudio();
        playEchoSound(); 
        
        // currentTarget garante que pegamos o card inteiro, mesmo clicando no texto/imagem
        const clickedCard = e.currentTarget;

        // Remove a classe ativa de todos
        document.querySelectorAll('.empresa-card').forEach(i => i.classList.remove('active'));
        
        // Adiciona a classe ativa no clicado
        clickedCard.classList.add('active');
        
        const targetId = clickedCard.getAttribute('data-target');
        
        // Esconde todos os perfis
        document.querySelectorAll('.company-profile').forEach(profile => profile.classList.remove('active'));
        
        // Mostra o perfil correspondente
        const targetProfile = document.getElementById(`${targetId}-profile`);
        if (targetProfile) {
            targetProfile.classList.add('active');
        } else {
            // Failsafe: se não tiver o perfil ainda, mostra o placeholder de bloqueado
            let placeholder = document.getElementById('placeholder-profile');
            if(placeholder) placeholder.classList.add('active');
        }
    });
});
