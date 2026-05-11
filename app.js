import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// 🔥 FIREBASE CREDENCIAIS (COLE AQUI) 🔥
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
const ALLOWED_IP = "138.94.168.160";

// --- AUDIO ENGINE (Sons Hacker) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTechSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    
    if (type === 'type') { // Som de teclado
        osc.type = 'square'; osc.frequency.setValueAtTime(800 + Math.random()*200, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start(); osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'success') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        osc.start(); osc.stop(audioCtx.currentTime + 0.5);
    } else if (type === 'error') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    }
}

// --- TERMINAL BOOT SEQUENCE ---
const terminalText = document.getElementById('terminal-text');
const bootSequence = [
    "INITIALIZING KERNEL...",
    "MOUNTING VIRTUAL DRIVES... [OK]",
    "ESTABLISHING SECURE PROTOCOLS... [OK]",
    "PINGING IDENTIFICATION SERVER...",
    "> RESOLVING IP ADDRESS..."
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
            playTechSound('type');
            charIndex++;
            if (charIndex === text.length) {
                clearInterval(typingInterval);
                lineIndex++;
                setTimeout(typeTerminal, 400); // Pausa entre as linhas
            }
        }, 30); // Velocidade da digitação
    } else {
        // Quando terminar de digitar, verifica o IP
        verifyIP();
    }
}

// Inicia a animação assim que a tela carrega
window.onload = () => {
    setTimeout(typeTerminal, 500);
};

// --- IP VERIFICATION LOGIC ---
function verifyIP() {
    let resultLine = document.createElement("p");
    resultLine.style.margin = "5px 0";
    terminalText.appendChild(resultLine);

    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
            document.getElementById('terminal-boot').style.display = 'none'; // Esconde o terminal
            
            if (data.ip === ALLOWED_IP) {
                document.getElementById('app-wrapper').style.display = 'block';
                playTechSound('success');
            } else {
                document.getElementById('coming-soon-screen').style.display = 'block';
                document.getElementById('transmission-prompt').style.display = 'block';
            }
        })
        .catch(() => {
            document.getElementById('terminal-boot').style.display = 'none';
            document.getElementById('coming-soon-screen').style.display = 'block';
            document.getElementById('transmission-prompt').style.display = 'block';
        });
}

// --- BACKGROUND MUSIC & TRANSMISSION LOGIC ---
const bgMusic = document.getElementById('bg-music');
const btnToggleMusic = document.getElementById('btn-toggle-music');

document.getElementById('btn-accept-transmission').addEventListener('click', () => {
    playTechSound('success');
    document.getElementById('transmission-prompt').style.display = 'none';
    document.getElementById('coming-soon-content').style.display = 'block';
    
    bgMusic.volume = 0.5; 
    bgMusic.play().catch(e => console.log("Audio blocked", e));
});

btnToggleMusic.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        btnToggleMusic.innerText = "🔊 MUTE AUDIO";
    } else {
        bgMusic.pause();
        btnToggleMusic.innerText = "🔇 UNMUTE AUDIO";
    }
});

// --- FIREBASE AUTH LOGIC ---
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
    playTechSound('type');
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    
    signInWithEmailAndPassword(auth, email, pass)
        .then(() => playTechSound('success'))
        .catch(() => {
            playTechSound('error');
            document.getElementById('error-message').style.display = 'block';
        });
});

document.getElementById('btn-logout').addEventListener('click', () => {
    playTechSound('type');
    signOut(auth);
});
