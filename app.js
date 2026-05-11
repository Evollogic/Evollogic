import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_ID",
    appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🛡️ IP FALSO PARA VOCÊ TESTAR A TELA DO MUTE E DA MÚSICA 🛡️
const ALLOWED_IP = "0.0.0.0"; 

// ==========================================
// 🎵 SINTETIZADOR DE ÁUDIO HACKER 🎵
// ==========================================
let audioCtx;

function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

// 1. Som de digitação do Terminal (Estilo Hollywood)
function playTerminalTick() {
    if (!audioCtx || audioCtx.state !== 'running') return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(1500 + Math.random() * 500, audioCtx.currentTime); // Tick agudo
    
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02); // Bem curtinho
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.02);
}

// 2. Som Sci-Fi com ECO (Para o botão de Mute/Unmute)
function playEchoSound() {
    if (!audioCtx || audioCtx.state !== 'running') return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const delay = audioCtx.createDelay(); // Criador do Eco
    const feedback = audioCtx.createGain(); // Controla o tempo que o eco dura

    // Configurando o Eco
    delay.delayTime.value = 0.15; // Velocidade do eco
    feedback.gain.value = 0.4;    // Intensidade do eco

    // Ligando os cabos virtuais (Oscilador -> Gain -> Saída + Eco)
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    gain.connect(delay);
    delay.connect(audioCtx.destination);
    delay.connect(feedback);
    feedback.connect(delay);

    // Configurando o som (Um "Pew" futurista)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.2);

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
            playTerminalTick(); // TOCA O SOM DO TECLADO AQUI
            charIndex++;
            
            if (charIndex === text.length) {
                clearInterval(typingInterval);
                lineIndex++;
                setTimeout(typeTerminal, 300);
            }
        }, 30);
    } else {
        verifyIP();
    }
}

// O BOTÃO INICIAL PARA LIBERAR O ÁUDIO E COMEÇAR O TERMINAL
document.getElementById('btn-start-boot').addEventListener('click', () => {
    initAudio(); 
    playEchoSound(); // Toca o eco ao iniciar também pra dar um efeito legal
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
        });
}

// ==========================================
// 🎵 MÚSICA E BOTÃO COM ECO 🎵
// ==========================================
const bgMusic = document.getElementById('bg-music');

document.getElementById('btn-accept-transmission').addEventListener('click', () => {
    document.getElementById('transmission-prompt').style.display = 'none';
    document.getElementById('coming-soon-content').style.display = 'block';
    
    bgMusic.volume = 0.5; 
    bgMusic.play().catch(e => console.log("Erro de áudio:", e));
});

// AQUI ESTÁ O BOTÃO DE MUTE/UNMUTE
document.getElementById('btn-toggle-music').addEventListener('click', (e) => {
    initAudio();
    playEchoSound(); // CHAMA O SOM COM ECO!
    
    if (bgMusic.paused) {
        bgMusic.play();
        e.target.innerText = "🔊 MUTE AUDIO";
    } else {
        bgMusic.pause();
        e.target.innerText = "🔇 UNMUTE AUDIO";
    }
});
