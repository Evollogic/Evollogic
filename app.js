// 🛡️ SEU IP REAL (Te leva pro Hub) 🛡️
const ALLOWED_IP = "194.33.45.208"; 

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
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
}

// ==========================================
// 💻 ANIMAÇÃO DO TERMINAL (INDEX.HTML) 💻
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
    if (!terminalText) return; 

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

// BOTÃO INICIAR SISTEMA (INDEX.HTML)
const btnStartBoot = document.getElementById('btn-start-boot');
if (btnStartBoot) {
    btnStartBoot.addEventListener('click', () => {
        initAudio(); 
        playEchoSound(); 
        let initScreen = document.getElementById('init-screen');
        let terminalBoot = document.getElementById('terminal-boot');
        
        if(initScreen) initScreen.style.display = 'none';
        if(terminalBoot) terminalBoot.style.display = 'block';
        setTimeout(typeTerminal, 500); 
    });
}

// ==========================================
// 🔍 VERIFICAÇÃO DE IP & REDIRECIONAMENTO 🔍
// ==========================================
function verifyIP() {
    let resultLine = document.createElement("p");
    resultLine.style.margin = "5px 0";
    if (terminalText) terminalText.appendChild(resultLine);

    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
            resultLine.innerHTML = `> IP IDENTIFIED: ${data.ip}`;
            
            setTimeout(() => {
                if (data.ip === ALLOWED_IP) {
                    // 🚀 AQUI ESTÁ A CORREÇÃO PRINCIPAL 🚀
                    // Redireciona diretamente para a página do Hub
                    window.location.href = "hub.html"; 
                } else {
                    // SE NÃO FOR O SEU IP: Trava na tela de música
                    let terminalBoot = document.getElementById('terminal-boot');
                    let comingSoon = document.getElementById('coming-soon-screen');
                    let transmissionPrompt = document.getElementById('transmission-prompt');
                    
                    if (terminalBoot) terminalBoot.style.display = 'none';
                    if (comingSoon) comingSoon.style.display = 'block';
                    if (transmissionPrompt) transmissionPrompt.style.display = 'block';
                }
            }, 1500); 
        })
        .catch(() => {
            resultLine.innerHTML = `> NETWORK FIREWALL DETECTED. BYPASSING...`;
            setTimeout(() => {
                let terminalBoot = document.getElementById('terminal-boot');
                let comingSoon = document.getElementById('coming-soon-screen');
                let transmissionPrompt = document.getElementById('transmission-prompt');
                
                if (terminalBoot) terminalBoot.style.display = 'none';
                if (comingSoon) comingSoon.style.display = 'block';
                if (transmissionPrompt) transmissionPrompt.style.display = 'block';
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
        let prompt = document.getElementById('transmission-prompt');
        let content = document.getElementById('coming-soon-content');
        
        if(prompt) prompt.style.display = 'none';
        if(content) content.style.display = 'block';
        
        if(bgMusic) {
            bgMusic.volume = 0.5; 
            bgMusic.play().catch(e => console.log("Erro de áudio:", e));
        }
    });
}

if (btnToggleMusic) {
    btnToggleMusic.addEventListener('click', (e) => {
        initAudio();
        playEchoSound(); 
        
        if (bgMusic && bgMusic.paused) {
            bgMusic.play();
            e.target.innerText = "🔊 MUTE AUDIO";
        } else if (bgMusic) {
            bgMusic.pause();
            e.target.innerText = "🔇 UNMUTE AUDIO";
        }
    });
}
