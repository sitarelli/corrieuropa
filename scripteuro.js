/**
 * CORRI EUROPA - VERSIONE INTEGRALE AGGIORNATA
 * - Logica di movimento 3D Prospettica
 * - Texture asfalto deformata e tiled
 * - Turbo sticky e collisioni fisiche
 */

const europeanCapitals = [
   // EUROPA OCCIDENTALE (OVEST)
   { città: "Parigi", regione: "Francia", zona: "OVEST", curiosità: "La città dell'amore, famosa per la Torre Eiffel e il Museo del Louvre." },
   { città: "Londra", regione: "Regno Unito", zona: "OVEST", curiosità: "Attraversata dal Tamigi, ospita l'iconico Big Ben e Buckingham Palace." },
   { città: "Berlino", regione: "Germania", zona: "CENTRO", curiosità: "Famosa per la Porta di Brandeburgo e i resti del suo storico Muro." },
   { città: "Amsterdam", regione: "Paesi Bassi", zona: "OVEST", curiosità: "Nota per i suoi canali, le biciclette e la casa di Anna Frank." },
   { città: "Bruxelles", regione: "Belgio", zona: "OVEST", curiosità: "Sede delle principali istituzioni UE e famosa per il cioccolato." },
   { città: "Dublino", regione: "Irlanda", zona: "OVEST", curiosità: "Patria della Guinness e del vivace quartiere di Temple Bar." },
   { città: "Lussemburgo", regione: "Lussemburgo", zona: "OVEST", curiosità: "Una delle capitali più piccole, situata su gole profonde." },
   { città: "Monaco", regione: "Monaco", zona: "OVEST", curiosità: "Famosa per il Gran Premio di F1 e il lussuoso casinò di Monte Carlo." },

   // EUROPA MERIDIONALE (SUD)
   { città: "Roma", regione: "Italia", zona: "SUD", curiosità: "La Città Eterna, culla dell'Impero Romano e del Rinascimento." },
   { città: "Madrid", regione: "Spagna", zona: "SUD", curiosità: "Celebre per il Museo del Prado e la movida notturna." },
   { città: "Lisbona", regione: "Portogallo", zona: "SUD", curiosità: "Costruita su sette colli, famosa per i suoi tram gialli e il Fado." },
   { città: "Atene", regione: "Grecia", zona: "SUD", curiosità: "Culla della democrazia, dominata dal maestoso Partenone." },
   { città: "La Valletta", regione: "Malta", zona: "SUD", curiosità: "Città fortezza barocca, interamente patrimonio UNESCO." },
   { città: "San Marino", regione: "San Marino", zona: "SUD", curiosità: "Capitale della repubblica più antica del mondo, arroccata sul Monte Titano." },
   { città: "Città del Vaticano", regione: "Vaticano", zona: "SUD", curiosità: "Lo stato più piccolo del mondo, cuore della cristianità." },
   { città: "Andorra la Vella", regione: "Andorra", zona: "SUD", curiosità: "La capitale più alta d'Europa, situata nei Pirenei." },

   // EUROPA SETTENTRIONALE (NORD)
   { città: "Stoccolma", regione: "Svezia", zona: "NORD", curiosità: "Costruita su 14 isole collegate da 57 ponti." },
   { città: "Oslo", regione: "Norvegia", zona: "NORD", curiosità: "Nota per i suoi parchi, musei di navi vichinghe e il design moderno." },
   { città: "Copenaghen", regione: "Danimarca", zona: "NORD", curiosità: "Sede della Sirenetta e dei colorati canali di Nyhavn." },
   { città: "Helsinki", regione: "Finlandia", zona: "NORD", curiosità: "La città bianca del Nord, affacciata sul Mar Baltico." },
   { città: "Reykjavik", regione: "Islanda", zona: "NORD", curiosità: "La capitale più a nord del mondo, terra di vulcani e geyser." },
   { città: "Tallinn", regione: "Estonia", zona: "NORD", curiosità: "Vanta uno dei centri storici medievali meglio conservati d'Europa." },
   { città: "Riga", regione: "Lettonia", zona: "NORD", curiosità: "Famosa per la sua architettura Art Nouveau e il mercato centrale." },
   { città: "Vilnius", regione: "Lituania", zona: "NORD", curiosità: "Nota per la sua grande città vecchia barocca." },

   // EUROPA CENTRALE (CENTRO)
   { città: "Vienna", regione: "Austria", zona: "CENTRO", curiosità: "Città della musica classica, dei valzer e delle torte Sacher." },
   { città: "Berna", regione: "Svizzera", zona: "CENTRO", curiosità: "Città medievale circondata dal fiume Aare, famosa per gli orsi." },
   { città: "Praga", regione: "Repubblica Ceca", zona: "CENTRO", curiosità: "La città delle cento torri, famosa per il Ponte Carlo." },
   { città: "Varsavia", regione: "Polonia", zona: "CENTRO", curiosità: "Risorta dalle ceneri della guerra, un mix di storia e grattacieli." },
   { città: "Budapest", regione: "Ungheria", zona: "CENTRO", curiosità: "La perla del Danubio, famosa per i suoi bagni termali." },
   { città: "Bratislava", regione: "Slovacchia", zona: "CENTRO", curiosità: "Situata al confine tra tre nazioni, dominata dal suo castello." },
   { città: "Lubiana", regione: "Slovenia", zona: "CENTRO", curiosità: "Città verde ricca di draghi e ponti pittoreschi." },
   { città: "Vaduz", regione: "Liechtenstein", zona: "CENTRO", curiosità: "Piccola capitale dominata dal castello della famiglia principesca." },

   // EUROPA ORIENTALE E BALCANI (EST)
   { città: "Kiev", regione: "Ucraina", zona: "EST", curiosità: "Famosa per le cupole dorate del monastero delle grotte." },
   { città: "Mosca", regione: "Russia", zona: "EST", curiosità: "Sede del Cremlino e della coloratissima Piazza Rossa." },
   { città: "Bucarest", regione: "Romania", zona: "EST", curiosità: "Nota un tempo come la 'Piccola Parigi' dell'Est." },
   { città: "Sofia", regione: "Bulgaria", zona: "EST", curiosità: "Una delle città più antiche, costruita su sorgenti termali." },
   { città: "Belgrado", regione: "Serbia", zona: "EST", curiosità: "La città bianca alla confluenza tra Danubio e Sava." },
   { città: "Zagabria", regione: "Croazia", zona: "EST", curiosità: "Famosa per i suoi musei insoliti e la città alta storica." },
   { città: "Sarajevo", regione: "Bosnia", zona: "EST", curiosità: "Punto d'incontro tra cultura orientale e occidentale." },
   { città: "Tirana", regione: "Albania", zona: "EST", curiosità: "Celebre per i suoi edifici dai colori vivaci e Piazza Scanderbeg." },
   { città: "Skopje", regione: "Macedonia del Nord", zona: "EST", curiosità: "Città natale di Madre Teresa, ricca di statue e ponti." },
   { città: "Podgorica", regione: "Montenegro", zona: "EST", curiosità: "Città moderna situata tra cinque fiumi." },
   { città: "Pristina", regione: "Kosovo", zona: "EST", curiosità: "La capitale più giovane d'Europa, vivace e dinamica." },
   { città: "Chisinau", regione: "Moldavia", zona: "EST", curiosità: "Conosciuta per i suoi ampi parchi e la cultura del vino." },
   { città: "Minsk", regione: "Bielorussia", zona: "EST", curiosità: "Caratterizzata da un'imponente architettura in stile impero stalinista." },

   // ALTRE (CAUCASO / CONFINE)
   { città: "Ankara", regione: "Turchia", zona: "EST", curiosità: "Cuore pulsante della Turchia moderna, ospita il mausoleo di Atatürk." },
   { città: "Tbilisi", regione: "Georgia", zona: "EST", curiosità: "Famosa per le terme sulfuree e il centro storico pittoresco." },
   { città: "Yerevan", regione: "Armenia", zona: "EST", curiosità: "La città rosa, una delle più antiche del mondo abitata ininterrottamente." },
   { città: "Baku", regione: "Azerbaigian", zona: "EST", curiosità: "Città del vento, dove grattacieli moderni incontrano mura medievali." },
   { città: "Nicosia", regione: "Cipro", zona: "EST", curiosità: "L'ultima capitale al mondo ancora divisa da una linea verde." }
];

/* --- RISORSE AUDIO --- */
const soundSbanda = new Audio('sbanda.mp3');
const soundAccelera = new Audio('accelera.mp3');

const bgMusic = new Audio('europa.mp3');
bgMusic.loop = true; 
bgMusic.volume = 0.4; // Volume al 40%

soundSbanda.volume = 0.5;
soundAccelera.volume = 0.1;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playWinSound() {
    if (state.isMuted) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine'; 
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
}

/* --- CONFIGURAZIONE --- */
const ROAD_SETTINGS = {
    START_Y_PERCENT: 30.5,
    ROAD_WIDTH_TOP: 80,
    ROAD_WIDTH_BOTTOM: 700,
    TEXTURE_TILE_SIZE: 100,
    TEXTURE_SPEED_FACTOR: 2900,
    ROAD_PERSPECTIVE: 1500,
    ROAD_TILT: 15,
    ROAD_OPACITY: 0.3,
    LINES_WIDTH_TOP: 15,
    LINES_WIDTH_BOTTOM: 220,
    ROTATION_DEG: 170,
    PERSPECTIVE_POWER: 9,
    NUM_SEGMENTS: 15
};

const CONSTANTS = {
    NORMAL_SPEED: 0.0019,
    TURBO_SPEED: 0.03,
    EXIT_SPEED: 0.055
};

let state = {
    isPlaying: false,
    isMuted: false,
    score: 0,
    lives: 3,
    currentLane: 1,
    currentTarget: null,
    cityQueue: [],
    gates: [],
    roadLines: [],
    lastTime: 0,
    isTurbo: false,
    waveActive: false,
    animationFrameId: null,
    textureOffset: 0
};

// Riferimenti DOM
const playerEl = document.getElementById('player');
const entitiesContainer = document.getElementById('entities-container');
const scoreEl = document.getElementById('score-display');
const livesEl = document.getElementById('lives-display');
const targetDisplay = document.getElementById('target-display');
const gameViewport = document.getElementById('game-viewport');
const particlesContainer = document.getElementById('particles-container');
const overlayStart = document.getElementById('overlay-start');
const overlayOver = document.getElementById('overlay-over');
const overlayWin = document.getElementById('overlay-win') || document.createElement('div');
const lastErrorDisplay = document.getElementById('last-error-display');
const didYouKnowText = document.getElementById('did-you-know-text');

/* --- GESTIONE INPUT (MOUSE + TOUCH + TASTIERA) --- */
/* --- GESTIONE INPUT (CORRETTA) --- */
function init() {
    document.addEventListener('keydown', handleInput);

   // GESTIONE MOUSE AGGIORNATA
gameViewport.addEventListener('mousedown', e => {
    if (!state.isPlaying) return;

    // Se premiamo il tasto SINISTRO (button 0), spostiamo l'auto
    if (e.button === 0) {
        const rect = gameViewport.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        
        // Qui puoi anche applicare il restringimento dell'area se vuoi
        if (clickX < width * 0.40) state.currentLane = 0;
        else if (clickX > width * 0.60) state.currentLane = 2;
        else state.currentLane = 1;
        
        updatePlayerPosition();
    } 
    // Se premiamo il tasto DESTRO (button 2), attiviamo SOLO il turbo
    else if (e.button === 2) {
        activateTurbo();
    }
});

// Fondamentale: impedisce l'apertura del menu del browser con il tasto destro
gameViewport.addEventListener('contextmenu', e => e.preventDefault());

    // TOUCH (Turbo e Spostamento)
    let touchStartX = 0;
    let touchStartY = 0; // <--- Dichiarata correttamente

    gameViewport.addEventListener('touchstart', e => { 
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY; // <--- QUESTA ERA LA RIGA MANCANTE
    }, {passive: false});

    gameViewport.addEventListener('touchend', e => {
        if (!state.isPlaying) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = touchStartY - touchEndY; // Differenza positiva = swipe verso l'alto

        // 1. Controllo TURBO (Swipe verso l'alto di almeno 60px)
        if (diffY > 60) {
            activateTurbo();
        } 
        // 2. Controllo SPOSTAMENTO (Swipe laterale)
        else if (Math.abs(diffX) > 40) {
            if (diffX > 0) moveRight(); else moveLeft();
        } 
        // 3. Controllo TAP (Pressione singola come il mouse)
        else {
            const rect = gameViewport.getBoundingClientRect();
            const tapX = touchEndX - rect.left;
            if (tapX < rect.width * 0.33) state.currentLane = 0;
            else if (tapX > rect.width * 0.66) state.currentLane = 2;
            else state.currentLane = 1;
            updatePlayerPosition();
        }
    }, {passive: false});

    // GESTORE MUTE
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            state.isMuted = !state.isMuted;
            muteBtn.innerText = state.isMuted ? '🔇' : '🔊';
            soundSbanda.muted = state.isMuted;
            soundAccelera.muted = state.isMuted;
bgMusic.muted = state.isMuted;
            if (!state.isMuted && state.isPlaying) bgMusic.play().catch(e => {});
            muteBtn.blur();
        });
    }
}
function handleInput(e) {
    if (!state.isPlaying) return;
    if (e.key === 'ArrowLeft') moveLeft();
    if (e.key === 'ArrowRight') moveRight();
    if (e.key === 'ArrowUp') activateTurbo();
}

function activateTurbo() {
    if (!state.isTurbo && state.waveActive) {
        if (!state.isMuted) soundAccelera.play();
        state.isTurbo = true;
        playerEl.classList.add('turbo-active');
    }
}

function moveLeft() { if (state.currentLane > 0) { state.currentLane--; updatePlayerPosition(); } }
function moveRight() { if (state.currentLane < 2) { state.currentLane++; updatePlayerPosition(); } }

function updatePlayerPosition() {
    playerEl.className = '';
    playerEl.classList.add('lane-' + state.currentLane);
    if(state.isTurbo) playerEl.classList.add('turbo-active');
}

function updateScore() { scoreEl.innerText = 'PUNTI: ' + state.score; }
function updateLives() { livesEl.innerText = '❤️'.repeat(state.lives); }

/* --- LOGICA DI GIOCO --- */

function initRoad() {
    let roadSurface = document.getElementById('road-surface');
    if (!roadSurface) {
        roadSurface = document.createElement('div');
        roadSurface.id = 'road-surface';
        gameViewport.insertBefore(roadSurface, particlesContainer || gameViewport.firstChild);
    }
    roadSurface.style.cssText = `
        position: absolute; bottom: -50px; left: 50%; width: 150%;
        height: ${100 - ROAD_SETTINGS.START_Y_PERCENT + 15}%;
        background-image: url('img/strada.png'); background-repeat: repeat;
        background-size: ${ROAD_SETTINGS.TEXTURE_TILE_SIZE}px ${ROAD_SETTINGS.TEXTURE_TILE_SIZE}px;
        background-color: #333; opacity: ${ROAD_SETTINGS.ROAD_OPACITY};
        transform-origin: bottom center;
        transform: translateX(-50%) perspective(${ROAD_SETTINGS.ROAD_PERSPECTIVE}px) rotateX(${ROAD_SETTINGS.ROAD_TILT}deg);
        clip-path: polygon(calc(50% - ${ROAD_SETTINGS.ROAD_WIDTH_TOP/2}px) 0%, calc(50% + ${ROAD_SETTINGS.ROAD_WIDTH_TOP/2}px) 0%, calc(50% + ${ROAD_SETTINGS.ROAD_WIDTH_BOTTOM/2}px) 100%, calc(50% - ${ROAD_SETTINGS.ROAD_WIDTH_BOTTOM/2}px) 100%);
        z-index: -5; pointer-events: none;
    `;
    state.roadLines = [];
    document.querySelectorAll('.road-line').forEach(l => l.remove());
    [-1, 1].forEach(side => {
        for (let i = 0; i < ROAD_SETTINGS.NUM_SEGMENTS; i++) {
            const line = document.createElement('div');
            line.classList.add('road-line');
            line.style.cssText = `position: absolute; background-color: rgba(255,255,255,0.9); width: 6px; height: 40px; transform-origin: top center; z-index: -4;`;
            gameViewport.insertBefore(line, particlesContainer);
            state.roadLines.push({ element: line, progress: i / ROAD_SETTINGS.NUM_SEGMENTS, side: side });
        }
    });
}

function startGame() {

// --- MODIFICA PER FULLSCREEN iOS/SAFARI ---
    let doc = document.documentElement;
    if (doc.requestFullscreen) {
        doc.requestFullscreen().catch(() => {});
    } else if (doc.webkitRequestFullscreen) { 
        /* Questo è il comando specifico per iPhone/Safari */
        doc.webkitRequestFullscreen();
    }
    // ------------------------------------------



    state.isPlaying = true; 

bgMusic.currentTime = 0;
    if (!state.isMuted) bgMusic.play().catch(e => {});



state.score = 0; state.lives = 3; state.isTurbo = false;
    state.gates = []; state.currentLane = 1; state.lastTime = performance.now();
    state.cityQueue = [...europeanCapitals].sort(() => Math.random() - 0.5);
    updateScore(); updateLives(); updatePlayerPosition();
    entitiesContainer.innerHTML = ''; particlesContainer.innerHTML = '';
    initRoad();
    overlayStart.classList.add('hidden'); overlayOver.classList.add('hidden');
    if (document.getElementById('overlay-win')) document.getElementById('overlay-win').classList.add('hidden');
    startNextRound();
    if (state.animationFrameId) cancelAnimationFrame(state.animationFrameId);
    requestAnimationFrame(loop);
}

function startNextRound() {
    if (state.cityQueue.length === 0) { showWinScreen(); return; }
    state.currentTarget = state.cityQueue.shift();
    targetDisplay.innerText = state.currentTarget.città;
    targetDisplay.classList.add('visible');
    spawnGates();
    state.waveActive = true; state.isTurbo = false;
    playerEl.classList.remove('turbo-active');
}

function spawnGates() {
    const correct = state.currentTarget;
    let cands = europeanCapitals.filter(c => c.zona === correct.zona && c.regione !== correct.regione);
    if (cands.length < 2) cands = europeanCapitals.filter(c => c.regione !== correct.regione);
    cands.sort(() => Math.random() - 0.5);
    const opts = [correct.regione, cands[0].regione, cands[1].regione].sort(() => Math.random() - 0.5);
    opts.forEach((text, index) => {
        const gate = document.createElement('div');
        gate.classList.add('gate');
// --- INIZIO MODIFICA GRAFICA BANDIERE ---
        const filename = getFlagFilename(text);
        gate.style.backgroundImage = `url('europa/${filename}')`; // Cartella specifica europa
        gate.style.backgroundSize = 'cover';
        gate.style.backgroundPosition = 'center';
        gate.style.border = '2px solid white';
        gate.style.color = 'white';
        gate.style.textShadow = '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000';
        gate.style.fontWeight = 'bold';
        // --- FINE MODIFICA GRAFICA BANDIERE ---
        gate.innerText = text;
        entitiesContainer.appendChild(gate);
        state.gates.push({ element: gate, progress: 0, laneIndex: index, laneOffset: (index - 1), isCorrect: (text === correct.regione), crashed: false, active: true });
    });
}

function handleCollision(g) {
    g.active = false; g.hit = true; state.waveActive = false;
    if (g.isCorrect) {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        playWinSound();
        state.isTurbo = true; playerEl.classList.add('turbo-active');
        state.score += 100; updateScore();
        playerEl.classList.add('glow-active');
        state.gates.forEach(o => { if(o !== g) o.element.style.opacity = '0.4'; });
        setTimeout(() => playerEl.classList.remove('glow-active'), 600);
    } else {
        if (!state.isMuted) soundSbanda.play();
        showErrorPopup(state.currentTarget.regione);
        state.lives--; updateLives();
        g.crashed = true; g.element.style.zIndex = "100";
        playerEl.classList.add('crash-active'); createSmoke();
        setTimeout(() => playerEl.classList.remove('crash-active'), 500);
        state.isTurbo = false; playerEl.classList.remove('turbo-active');
        state.cityQueue.push(state.currentTarget);
        if (state.lives <= 0) gameOver(g.element.innerText);
    }
}

function loop(currentTime) {
    if (!state.isPlaying) return;
    const dt = Math.min((currentTime - state.lastTime) / 16.67, 2);
    state.lastTime = currentTime;
    if (state.gates.length === 0 && state.isPlaying) startNextRound();
    const speed = state.isTurbo ? CONSTANTS.TURBO_SPEED : CONSTANTS.NORMAL_SPEED;
    const pSpeed = state.gates.length > 0 && (!state.waveActive || state.gates[0].hit) ? CONSTANTS.EXIT_SPEED : speed;
    state.textureOffset += pSpeed * dt * ROAD_SETTINGS.TEXTURE_SPEED_FACTOR;
    const road = document.getElementById('road-surface');
    if (road) road.style.backgroundPosition = `center ${state.textureOffset}px`;
    state.roadLines.forEach(l => {
        l.progress += pSpeed * dt; if (l.progress > 1) l.progress -= 1;
        const vP = Math.pow(l.progress, ROAD_SETTINGS.PERSPECTIVE_POWER);
        const top = ROAD_SETTINGS.START_Y_PERCENT + (vP * (100 - ROAD_SETTINGS.START_Y_PERCENT));
        const w = ROAD_SETTINGS.LINES_WIDTH_TOP + (vP * (ROAD_SETTINGS.LINES_WIDTH_BOTTOM - ROAD_SETTINGS.LINES_WIDTH_TOP));
        l.element.style.top = top + '%';
        l.element.style.left = ((gameViewport.offsetWidth / 2) + ((w / 2) * l.side)) + 'px';
        l.element.style.transform = `translate(-50%, 0) scale(${0.1 + vP * 1.5}) rotate(${ROAD_SETTINGS.ROTATION_DEG * l.side}deg)`;
    });
    for (let i = state.gates.length - 1; i >= 0; i--) {
        let g = state.gates[i];
        g.progress += ( (!state.waveActive || g.hit) ? CONSTANTS.EXIT_SPEED : speed ) * dt;
        const top = ROAD_SETTINGS.START_Y_PERCENT + (g.progress * (100 - ROAD_SETTINGS.START_Y_PERCENT));
        const sc = 0.02 + g.progress * 1.2;
        g.element.style.top = top + '%';
        g.element.style.left = ((gameViewport.offsetWidth / 2) + (g.laneOffset * (175 * sc))) + 'px';
        let tr = `translate(-50%, -100%) scale(${sc})`;
        if (g.crashed) tr += ` rotate(${g.progress * 100}deg) skew(20deg)`;
        g.element.style.transform = tr;
        if (state.waveActive && g.active && !g.hit && g.progress >= 0.81 && g.laneIndex === state.currentLane) handleCollision(g);
        if (g.progress > 1.5) { g.element.remove(); state.gates.splice(i, 1); }
    }
    state.animationFrameId = requestAnimationFrame(loop);
}

function createSmoke() {
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('div'); p.classList.add('smoke-particle');
        p.style.left = [30, 50, 70][state.currentLane] + '%'; p.style.bottom = '180px';
        p.style.marginLeft = ((Math.random() - 0.5) * 60) + 'px';
        const size = 15 + Math.random() * 25; p.style.width = size + 'px'; p.style.height = size + 'px';
        particlesContainer.appendChild(p); setTimeout(() => p.remove(), 800);
    }
}

function showWinScreen() {
    state.isPlaying = false; 
bgMusic.pause();
cancelAnimationFrame(state.animationFrameId);
    targetDisplay.classList.remove('visible');
    const win = document.getElementById('overlay-win');
    if (win) win.classList.remove('hidden'); else alert("HAI VINTO!");
}

function gameOver(wrong) {
    state.isPlaying = false; 
bgMusic.pause();
cancelAnimationFrame(state.animationFrameId);
    targetDisplay.classList.remove('visible');
    lastErrorDisplay.innerHTML = `Hai scelto <b>${wrong}</b>.<br>Era <b>${state.currentTarget.regione}</b>.`;
    if(state.currentTarget.curiosità) didYouKnowText.textContent = state.currentTarget.curiosità;
    overlayOver.classList.remove('hidden');
}

function resetToStart() { overlayOver.classList.add('hidden'); overlayStart.classList.remove('hidden'); entitiesContainer.innerHTML = ''; }

function showErrorPopup(correct) {
    const pop = document.getElementById('feedback-pop');
    if (!pop) return;
    pop.innerHTML = "NO!<br>ERA: " + correct;
    pop.classList.remove('hidden');
    setTimeout(() => pop.classList.add('visible'), 10);
    setTimeout(() => { pop.classList.remove('visible'); setTimeout(() => pop.classList.add('hidden'), 300); }, 2500);
}

// --- NUOVA FUNZIONE PER I NOMI FILE ---
function getFlagFilename(regionName) {
    // Pulisce il nome per farlo coincidere con i file nella cartella europa (es: "Regno Unito" -> "regno_unito.png")
    let cleanName = regionName.replace(/^[^\wÀ-ÿ]+/, "").trim(); 
    return cleanName.toLowerCase().replace(/ /g, "_").replace(/'/g, "") + ".png";
}



// Avvio
init();
