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

// 🛡️ IP FALSO PARA TESTAR A TELA DE BLOQUEIO 🛡️
const ALLOWED_IP = "0.0.0.0"; 

// --- CONTROLE DE ÁUDIO ---
const bgMusic = document.getElementById('bg-music');

// Função para iniciar a música (precisa de clique por regra do navegador)
document.getElementById('btn-accept-transmission').addEventListener('click', () => {
    document.getElementById('transmission-prompt').style.display = 'none';
    document.getElementById('coming-soon-content').style.display = 'block';
    
    bgMusic.volume = 0.6;
    bgMusic.play().catch(e => console.error("Erro ao tocar som:", e));
});

// --- ANIMAÇÃO TERMINAL ---
const terminalText = document.getElementById('terminal-text');
const bootSequence = [
    "> SCANNING PORTALS...",
    "> BYPASSING FIREWALL... [OK]",
    "> EXTRACTING IP DATA...",
    "> VERIFYING CLEARANCE..."
];

let lineIndex = 0;
function typeTerminal() {
    if (lineIndex < bootSequence.length) {
        let p = document.createElement("p");
        terminalText.appendChild(p);
        let text = bootSequence[lineIndex];
        let charIndex = 0;
        let interval = setInterval(() => {
            p.innerHTML += text.charAt(charIndex);
            charIndex++;
            if (charIndex === text.length) {
                clearInterval(interval);
                lineIndex++;
                setTimeout(typeTerminal, 300);
            }
        }, 30);
    } else {
        checkAccess();
    }
}

function checkAccess() {
    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
            document.getElementById('terminal-boot').style.display = 'none';
            // Como seu IP não é 0.0.0.0, ele vai cair no ELSE (Tela de Bloqueio)
            if (data.ip === ALLOWED_IP) {
                document.getElementById('app-wrapper').style.display = 'block';
            } else {
                document.getElementById('coming-soon-screen').style.display = 'block';
                document.getElementById('transmission-prompt').style.display = 'block';
            }
        });
}

window.onload = () => setTimeout(typeTerminal, 500);
