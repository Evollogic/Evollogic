// 🛡️ IP FALSO PARA TESTE 🛡️
const ALLOWED_IP = "0.0.0.0"; 

// ==========================================
// 🎵 MOTOR DE ÁUDIO (SOM HACKER + ECO) 🎵
// ==========================================
let audioCtx;

function initAudio() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
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

// Som Sci-Fi com ECO (Para o botão MUTE/UNMUTE)
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
        terminalText.appendChild(p);
        
        let text = bootSequence[lineIndex];
        let charIndex = 0;
        
        let typingInterval = setInterval(() => {
            p.innerHTML += text.charAt(charIndex);
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

// BOTÃO INICIAR SISTEMA
document.getElementById('btn-start-boot').addEventListener('click', () => {
    initAudio(); 
    playEchoSound(); // Toca o eco para confirmar o clique
    document.getElementById('init-screen').style.display = 'none';
    document.getElementById('terminal-boot').style.display = 'block';
    setTimeout(typeTerminal, 500); 
});

// ==========================================
// 🔍 VERIFICAÇÃO DE IP 🔍
// ==========================================
function verifyIP() {
    let resultLine = document.createElement("p");
    resultLine.style.margin = "5px 0";
    terminalText.appendChild(resultLine);

    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
            resultLine.innerHTML = `> IP IDENTIFIED: ${data.ip}`;
            
            setTimeout(() => {
                document.getElementById('terminal-boot').style.display = 'none';
                
                if (data.ip === ALLOWED_IP) {
                    document.getElementById('app-wrapper').style.display = 'block';
                } else {
                    document.getElementById('coming-soon-screen').style.display = 'block';
                    document.getElementById('transmission-prompt').style.display = 'block';
                }
            }, 1500); 
        })
        .catch(() => {
            resultLine.innerHTML = `> NETWORK FIREWALL DETECTED. BYPASSING...`;
            setTimeout(() => {
                document.getElementById('terminal-boot').style.display = 'none';
                document.getElementById('coming-soon-screen').style.display = 'block';
                document.getElementById('transmission-prompt').style.display = 'block';
            }, 1500);
        });
}

// ==========================================
// 🎵 CONTROLE DE MÚSICA 🎵
// ==========================================
const bgMusic = document.getElementById('bg-music');

// Botão ACCEPT da transmissão
document.getElementById('btn-accept-transmission').addEventListener('click', () => {
    initAudio();
    playEchoSound();
    document.getElementById('transmission-prompt').style.display = 'none';
    document.getElementById('coming-soon-content').style.display = 'block';
    
    bgMusic.volume = 0.5; 
    bgMusic.play().catch(e => console.log("Erro de áudio:", e));
});

// Botão de MUTE / UNMUTE (COM O EFEITO DE ECO!)
document.getElementById('btn-toggle-music').addEventListener('click', (e) => {
    initAudio();
    playEchoSound(); // GERA O SOM DE ECO!
    
    if (bgMusic.paused) {
        bgMusic.play();
        e.target.innerText = "🔊 MUTE AUDIO";
    } else {
        bgMusic.pause();
        e.target.innerText = "🔇 UNMUTE AUDIO";
    }
});
