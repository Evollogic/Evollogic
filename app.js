import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// 🛡️ IP FALSO PARA TESTAR A TELA DO MUTE E DA MÚSICA 🛡️
const ALLOWED_IP = "0.0.0.0"; 

// ==========================================
// 🎵 SINTETIZADOR DE ÁUDIO HACKER 🎵
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

// 1. Som de digitação do Terminal
function playTerminalTick() {
    if (!audioCtx || audioCtx.state !== 'running') return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(1500 + Math.random() * 500, audioCtx.currentTime); 
    
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02); 
    
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
    const delay = audioCtx.createDelay(); 
    const feedback = audioCtx.createGain(); 

    delay.delayTime.value = 0.15; 
    feedback.gain.value = 0.4;    

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    gain.connect(delay);
    delay.connect(audioCtx.destination);
    delay.connect(feedback);
    feedback.connect(delay);

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
            playTerminalTick(); 
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

// O BOTÃO INICIAL
document.getElementById('btn-start-boot').addEventListener('click', () => {
    initAudio(); 
    playEchoSound(); 
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
            resultLine.innerHTML = `> NETWORK ERROR. FALLBACK ENGAGED.`;
            setTimeout(() => {
                document.getElementById('terminal-boot').style.display = 'none';
                document.getElementById('coming-soon-screen').style.display = 'block';
                document.getElementById('transmission-prompt').style.display = 'block';
            }, 1500);
        });
}

// ==========================================
// 🎵 MÚSICA E BOTÃO COM ECO 🎵
// ==========================================
const bgMusic = document.getElementById('bg-music');

document.getElementById('btn-accept-transmission').addEventListener('click', () => {
    initAudio();
    playEchoSound();
    document.getElementById('transmission-prompt').style.display = 'none';
    document.getElementById('coming-soon-content').style.display = 'block';
    
    bgMusic.volume = 0.5; 
    bgMusic.play().catch(e => console.log("Erro de áudio:", e));
});

document.getElementById('btn-toggle-music').addEventListener('click', (e) => {
    initAudio();
    playEchoSound(); // O SOM DO ECO AQUI!
    
    if (bgMusic.paused) {
        bgMusic.play();
        e.target.innerText = "🔊 MUTE AUDIO";
    } else {
        bgMusic.pause();
        e.target.innerText = "🔇 UNMUTE AUDIO";
    }
});

// ==========================================
// 🔥 FIREBASE (Blindado contra erros) 🔥
// ==========================================
let auth;
try {
    const firebaseConfig = {
        apiKey: "SUA_API_KEY_AQUI", // Mesmo vazio, não vai travar o resto do site
        authDomain: "SEU_AUTH_DOMAIN",
        projectId: "SEU_PROJECT_ID",
        storageBucket: "SEU_STORAGE_BUCKET",
        messagingSenderId: "SEU_MESSAGING_ID",
        appId: "SEU_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);

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

} catch (error) {
    console.error("Aviso: Firebase não configurado corretamente.", error);
}

document.getElementById('btn-login').addEventListener('click', () => {
    initAudio();
    playEchoSound();
    
    if(!auth) {
        document.getElementById('error-message').innerText = "[!] FIREBASE OFFLINE";
        document.getElementById('error-message').style.display = 'block';
        return;
    }

    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    
    signInWithEmailAndPassword(auth, email, pass)
        .catch(() => {
            playEchoSound();
            document.getElementById('error-message').style.display = 'block';
        });
});

document.getElementById('btn-logout').addEventListener('click', () => {
    initAudio();
    playEchoSound();
    if(auth) signOut(auth);
});
