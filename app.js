import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// 🔥 FIREBASE CREDENCIAIS (COLE AQUI SUAS CHAVES) 🔥
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

// --- AUDIO ENGINE (Sons de UI) ---
let audioCtx;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playBeep(freq = 400, type = 'square', duration = 0.1) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

// --- BACKGROUND MUSIC LOGIC ---
const bgMusic = document.getElementById('bg-music');
const btnToggleMusic = document.getElementById('btn-toggle-music');

// Quando o botão "ACCEPT" for clicado na tela de transmissão
document.getElementById('btn-accept-transmission').addEventListener('click', () => {
    initAudio(); // Libera o som de interface
    playBeep(600, 'sine', 0.2); 
    document.getElementById('transmission-prompt').style.display = 'none';
    document.getElementById('coming-soon-content').style.display = 'block';
    
    bgMusic.volume = 0.5; 
    bgMusic.play().catch(e => console.log("Audio play blocked by browser:", e));
});

// Botão para mutar/desmutar a música
btnToggleMusic.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        btnToggleMusic.innerText = "🔊 MUTE AUDIO";
    } else {
        bgMusic.pause();
        btnToggleMusic.innerText = "🔇 UNMUTE AUDIO";
    }
});

// --- IP PROTECTION (SEU IP EXATO) ---
const ALLOWED_IP = "138.94.168.160"; 

fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
        document.getElementById('loading-screen').style.display = 'none';
        
        // SE O IP FOR O SEU: Mostra a tela de Login
        if (data.ip === ALLOWED_IP) {
            document.getElementById('app-wrapper').style.display = 'block';
        } 
        // SE FOR OUTRA PESSOA: Mostra a Transmissão + Música
        else {
            document.getElementById('coming-soon-screen').style.display = 'block';
            document.getElementById('transmission-prompt').style.display = 'block';
        }
    })
    .catch(() => {
        // Se der erro de rede, joga para a tela de transmissão por segurança
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('coming-soon-screen').style.display = 'block';
        document.getElementById('transmission-prompt').style.display = 'block';
    });

// --- FIREBASE LOGIC ---
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
