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

// 🛡️ IP FALSO PARA TESTE (Como não é o seu, ele vai bloquear e mostrar a música)
const ALLOWED_IP = "0.0.0.0"; 

// --- MOTOR DE ÁUDIO ---
let audioCtx;

function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

// Som realista de terminal digitando
function playTypingSound() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'square';
    // Frequência aleatória para simular teclas diferentes
    osc.frequency.setValueAtTime(400 + Math.random() * 200, audioCtx.currentTime); 
    
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
}

// --- SEQUÊNCIA DO TERMINAL ---
const terminalText = document.getElementById('terminal-text');
const bootSequence = [
    "> INITIATING EVOLLOGIC_OS V2.4",
    "> BYPASSING MAIN FIREWALL... [SUCCESS]",
    "> EXTRACTING CLIENT IP DATA...",
    "> ANALYZING SECURITY CLEARANCE..."
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
            playTypingSound(); // CHAMA O SOM DA TECLA AQUI!
            charIndex++;
            
            if (charIndex === text.length) {
                clearInterval(typingInterval);
                lineIndex++;
                setTimeout(typeTerminal, 400); // Pausa para ler a linha
            }
        }, 40); // Velocidade do teclado
    } else {
        verifyIP();
    }
}

// 1. O usuário clica no botão "INICIAR SISTEMA" para liberar o áudio
document.getElementById('btn-start-boot').addEventListener('click', () => {
    initAudio(); // Libera as caixas de som no navegador
    document.getElementById('init-screen').style.display = 'none';
    document.getElementById('terminal-boot').style.display = 'block';
    typeTerminal(); // Começa a digitar com som!
});

// --- VERIFICAÇÃO DE IP ---
function verifyIP() {
    let resultLine = document.createElement("p");
    resultLine.style.margin = "5px 0";
    terminalText.appendChild(resultLine);

    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
            resultLine.innerHTML = `> TARGET IP FOUND: ${data.ip}`;
            
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

// --- MÚSICA DE FUNDO ---
const bgMusic = document.getElementById('bg-music');

document.getElementById('btn-accept-transmission').addEventListener('click', () => {
    document.getElementById('transmission-prompt').style.display = 'none';
    document.getElementById('coming-soon-content').style.display = 'block';
    
    bgMusic.volume = 0.5; 
    bgMusic.play().catch(e => console.log("Erro de áudio:", e));
});

document.getElementById('btn-toggle-music').addEventListener('click', (e) => {
    if (bgMusic.paused) {
        bgMusic.play();
        e.target.innerText = "🔊 MUTE AUDIO";
    } else {
        bgMusic.pause();
        e.target.innerText = "🔇 UNMUTE AUDIO";
    }
});
