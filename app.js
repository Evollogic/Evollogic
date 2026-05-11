import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// 🔥 FIREBASE CREDENCIAIS (Preencha aqui de novo) 🔥
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

// 🛡️ SEU IP EXATO AQUI 🛡️
const ALLOWED_IP = "138.942.318.160"; 

// --- AUDIO ENGINE ---
let audioCtx;
function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}
function playBeep(freq = 400, type = 'square', duration = 0.1) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + duration);
}

// --- TERMINAL BOOT ANIMATION ---
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
            charIndex++;
            if (charIndex === text.length) {
                clearInterval(typingInterval);
                lineIndex++;
                setTimeout(typeTerminal, 300); 
            }
        }, 20); 
    } else {
        verifyIP(); // Chama o IP após terminar de digitar
    }
}

// Inicia a animação assim que a tela abre
window.onload = () => {
    setTimeout(typeTerminal, 500);
};

// --- VERIFICAÇÃO DE IP ---
function verifyIP() {
    let resultLine = document.createElement("p");
    resultLine.style.margin = "5px 0";
    terminalText.appendChild(resultLine);

    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
            resultLine.innerHTML = `> IP IDENTIFIED: ${data.ip}`;
            
            setTimeout(() => {
                // Esconde o terminal
                document.getElementById('terminal-boot').style.display = 'none';
                
                // Redireciona de acordo com o IP
                if (data.ip === ALLOWED_IP) {
                    document.getElementById('app-wrapper').style.display = 'block';
                } else {
                    document.getElementById('coming-soon-screen').style.display = 'block';
                    document.getElementById('transmission-prompt').style.display = 'block';
                }
            }, 1000); 
        })
        .catch(() => {
            // Em caso de falha de rede
            document.getElementById('terminal-boot').style.display = 'none';
            document.getElementById('coming-soon-screen').style.display = 'block';
            document.getElementById('transmission-prompt').style.display = 'block';
        });
}

// --- BACKGROUND MUSIC & TRANSMISSION ---
const bgMusic = document.getElementById('bg-music');
const btnToggleMusic = document.getElementById('btn-toggle-music');

document.getElementById('btn-accept-transmission').addEventListener('click', () => {
    initAudio(); 
    playBeep(600, 'sine', 0.2); 
    document.getElementById('transmission-prompt').style.display = 'none';
    document.getElementById('coming-soon-content').style.display = 'block';
    
    bgMusic.volume = 0.5; 
    bgMusic.play().catch(e => console.log("Audio block:", e));
});

btnToggleMusic.addEventListener('click', () => {
    initAudio();
    if (bgMusic.paused) {
        bgMusic.play();
        btnToggleMusic.innerText = "🔊 MUTE AUDIO";
    } else {
        bgMusic.pause();
        btnToggleMusic.innerText = "🔇 UNMUTE AUDIO";
    }
});

// --- FIREBASE AUTH ---
onAuthStateChanged(auth, (user) => {
    const loginScreen = document.getElementById('login-screen');
    const secretHub = document.getElementById('secret-hub');
    if (user) {
        loginScreen.style.display = 'none';
        secretHub.style.display = 'block';
    } else {
        loginScreen.style.display = 'block';
        secretHub.style.display = 'none';
    }
});

document.getElementById('btn-login').addEventListener('click', () => {
    initAudio();
    playBeep(800, 'sine');
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    
    signInWithEmailAndPassword(auth, email, pass)
        .catch(() => {
            playBeep(100, 'sawtooth', 0.5);
            document.getElementById('error-message').style.display = 'block';
        });
});

document.getElementById('btn-logout').addEventListener('click', () => {
    initAudio();
    playBeep(300, 'square');
    signOut(auth);
});
