/**
 * CORRI EUROPA - VERSIONE INTEGRALE AGGIORNATA
 * - Logica di movimento 3D Prospettica
 * - Texture asfalto deformata e tiled
 * - Turbo sticky e collisioni fisiche
 */

const europeanCapitals = [
   
 // EUROPA OCCIDENTALE
   { città: "Parigi", regione: "Francia", curiosità: "La città dell'amore, famosa per la Torre Eiffel e il Museo del Louvre." },
   { città: "Londra", regione: "Regno Unito", curiosità: "Attraversata dal Tamigi, ospita l'iconico Big Ben e Buckingham Palace." },
   { città: "Berlino", regione: "Germania", curiosità: "Famosa per la Porta di Brandeburgo e i resti del suo storico Muro." },
   { città: "Amsterdam", regione: "Paesi Bassi", curiosità: "Nota per i suoi canali, le biciclette e la casa di Anna Frank." },
   { città: "Bruxelles", regione: "Belgio", curiosità: "Sede delle principali istituzioni UE e famosa per il cioccolato." },
   { città: "Dublino", regione: "Irlanda", curiosità: "Patria della Guinness e del vivace quartiere di Temple Bar." },
   { città: "Lussemburgo", regione: "Lussemburgo", curiosità: "Una delle capitali più piccole, situata su gole profonde." },
   { città: "Monaco", regione: "Monaco", curiosità: "Famosa per il Gran Premio di F1 e il lussuoso casinò di Monte Carlo." },

   // EUROPA MERIDIONALE
   { città: "Roma", regione: "Italia", curiosità: "La Città Eterna, culla dell'Impero Romano e del Rinascimento." },
   { città: "Madrid", regione: "Spagna", curiosità: "Celebre per il Museo del Prado e la movida notturna." },
   { città: "Lisbona", regione: "Portogallo", curiosità: "Costruita su sette colli, famosa per i suoi tram gialli e il Fado." },
   { città: "Atene", regione: "Grecia", curiosità: "Culla della democrazia, dominata dal maestoso Partenone." },
   { città: "La Valletta", regione: "Malta", curiosità: "Città fortezza barocca, interamente patrimonio UNESCO." },
   { città: "San Marino", regione: "San Marino", curiosità: "Capitale della repubblica più antica del mondo, arroccata sul Monte Titano." },
   { città: "Città del Vaticano", regione: "Vaticano", curiosità: "Lo stato più piccolo del mondo, cuore della cristianità." },
   { città: "Andorra la Vella", regione: "Andorra", curiosità: "La capitale più alta d'Europa, situata nei Pirenei." },

   // EUROPA SETTENTRIONALE
   { città: "Stoccolma", regione: "Svezia", curiosità: "Costruita su 14 isole collegate da 57 ponti." },
   { città: "Oslo", regione: "Norvegia", curiosità: "Nota per i suoi parchi, musei di navi vichinghe e il design moderno." },
   { città: "Copenaghen", regione: "Danimarca", curiosità: "Sede della Sirenetta e dei colorati canali di Nyhavn." },
   { città: "Helsinki", regione: "Finlandia", curiosità: "La città bianca del Nord, affacciata sul Mar Baltico." },
   { città: "Reykjavik", regione: "Islanda", curiosità: "La capitale più a nord del mondo, terra di vulcani e geyser." },
   { città: "Tallinn", regione: "Estonia", curiosità: "Vanta uno dei centri storici medievali meglio conservati d'Europa." },
   { città: "Riga", regione: "Lettonia", curiosità: "Famosa per la sua architettura Art Nouveau e il mercato centrale." },
   { città: "Vilnius", regione: "Lituania", curiosità: "Nota per la sua grande città vecchia barocca." },

   // EUROPA CENTRALE
   { città: "Vienna", regione: "Austria", curiosità: "Città della musica classica, dei valzer e delle torte Sacher." },
   { città: "Berna", regione: "Svizzera", curiosità: "Città medievale circondata dal fiume Aare, famosa per gli orsi." },
   { città: "Praga", regione: "Repubblica Ceca", curiosità: "La città delle cento torri, famosa per il Ponte Carlo." },
   { città: "Varsavia", regione: "Polonia", curiosità: "Risorta dalle ceneri della guerra, un mix di storia e grattacieli." },
   { città: "Budapest", regione: "Ungheria", curiosità: "La perla del Danubio, famosa per i suoi bagni termali." },
   { città: "Bratislava", regione: "Slovacchia", curiosità: "Situata al confine tra tre nazioni, dominata dal suo castello." },
   { città: "Lubiana", regione: "Slovenia", curiosità: "Città verde ricca di draghi e ponti pittoreschi." },
   { città: "Vaduz", regione: "Liechtenstein", curiosità: "Piccola capitale dominata dal castello della famiglia principesca." },

   // EUROPA ORIENTALE E BALCANI
   { città: "Kiev", regione: "Ucraina", curiosità: "Famosa per le cupole dorate del monastero delle grotte." },
   { città: "Mosca", regione: "Russia", curiosità: "Sede del Cremlino e della coloratissima Piazza Rossa." },
   { città: "Bucarest", regione: "Romania", curiosità: "Nota un tempo come la 'Piccola Parigi' dell'Est." },
   { città: "Sofia", regione: "Bulgaria", curiosità: "Una delle città più antiche, costruita su sorgenti termali." },
   { città: "Belgrado", regione: "Serbia", curiosità: "La città bianca alla confluenza tra Danubio e Sava." },
   { città: "Zagabria", regione: "Croazia", curiosità: "Famosa per i suoi musei insoliti e la città alta storica." },
   { città: "Sarajevo", regione: "Bosnia", curiosità: "Punto d'incontro tra cultura orientale e occidentale." },
   { città: "Tirana", regione: "Albania", curiosità: "Celebre per i suoi edifici dai colori vivaci e Piazza Scanderbeg." },
   { città: "Skopje", regione: "Macedonia del Nord", curiosità: "Città natale di Madre Teresa, ricca di statue e ponti." },
   { città: "Podgorica", regione: "Montenegro", curiosità: "Città moderna situata tra cinque fiumi." },
   { città: "Pristina", regione: "Kosovo", curiosità: "La capitale più giovane d'Europa, vivace e dinamica." },
   { città: "Chisinau", regione: "Moldavia", curiosità: "Conosciuta per i suoi ampi parchi e la cultura del vino." },
   { città: "Minsk", regione: "Bielorussia", curiosità: "Caratterizzata da un'imponente architettura in stile impero stalinista." },

   // ALTRE (CAUCASO / CONFINE)
   { città: "Ankara", regione: "Turchia", curiosità: "Cuore pulsante della Turchia moderna, ospita il mausoleo di Atatürk." },
   { città: "Tbilisi", regione: "Georgia", curiosità: "Famosa per le terme sulfuree e il centro storico pittoresco." },
   { città: "Yerevan", regione: "Armenia", curiosità: "La città rosa, una delle più antiche del mondo abitata ininterrottamente." },
   { città: "Baku", regione: "Azerbaigian", curiosità: "Città del vento, dove grattacieli moderni incontrano mura medievali." },
   { città: "Nicosia", regione: "Cipro", curiosità: "L'ultima capitale al mondo ancora divisa da una linea verde." }
];



/* ==========================================================
   INCOLLA DA QUI FINO ALLA FINE DEL FILE
   (Sostituisce tutto il vecchio codice dopo europeanCapitals)
   ========================================================== */

const soundSbanda = new Audio('sbanda.mp3');
soundSbanda.volume = 0.5;
const soundAccelera = new Audio('accelera.mp3');
soundAccelera.volume = 0.5;

// --- CONFIGURAZIONE STRADA E LINEE ---
const ROAD_SETTINGS = {
    START_Y_PERCENT: 26.5,      // Altezza orizzonte
    
    // 1. TRAPEZIO STRADA (Asfalto/Sfondo strada.png)
    ROAD_WIDTH_TOP: 50,         
    ROAD_WIDTH_BOTTOM: 400,     
    
    // --- PARAMETRI TEXTURE E DEFORMAZIONE 3D ---
    TEXTURE_TILE_SIZE: 100,     
    TEXTURE_SPEED_FACTOR: 1500, 
    ROAD_PERSPECTIVE: 1500,      
    ROAD_TILT: 15,              
    ROAD_OPACITY: 0.2,          // <--- SETTATA AL 50% COME RICHIESTO
    
    // 2. TRAPEZIO LINEE (Le strisce bianche divisorie)
    LINES_WIDTH_TOP: 8,        
    LINES_WIDTH_BOTTOM: 165,    
    
    ROTATION_DEG: -10,           
    PERSPECTIVE_POWER: 5,       
    NUM_SEGMENTS: 12            
};

const CONSTANTS = {
    NORMAL_SPEED: 0.0019,
    TURBO_SPEED: 0.03,
    EXIT_SPEED: 0.055
};

let state = {
    isPlaying: false,
    score: 0,
    lives: 3,
    currentLane: 1,
    currentTarget: null,
    cityQueue: [],      // Coda delle città per il giro completo
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
const overlayWin = document.getElementById('overlay-win') || document.createElement('div'); // Fallback se non esiste l'ID
const lastErrorDisplay = document.getElementById('last-error-display');
const didYouKnowText = document.getElementById('did-you-know-text');

// --- GESTIONE INPUT ---
function init() {
    document.addEventListener('keydown', handleInput);
    let touchStartX = 0; let touchStartY = 0;
    gameViewport.addEventListener('touchstart', e => { 
        touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY;
    }, {passive: false});
    gameViewport.addEventListener('touchend', e => {
        if (!state.isPlaying) return;
        const touchEndX = e.changedTouches[0].clientX; const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX; const diffY = touchStartY - touchEndY; 
        if (diffY > 60) activateTurbo();
        else if (Math.abs(diffX) > 40) { if (diffX > 0) moveRight(); else moveLeft(); }
        else { if (touchEndX < window.innerWidth / 2) moveLeft(); else moveRight(); }
    }, {passive: false});
}

function handleInput(e) {
    if (!state.isPlaying) return;
    if (e.key === 'ArrowLeft') moveLeft();
    if (e.key === 'ArrowRight') moveRight();
    if (e.key === 'ArrowUp') activateTurbo();
}

function activateTurbo() {
    if (!state.isTurbo && state.waveActive) {
        soundAccelera.play(); state.isTurbo = true; playerEl.classList.add('turbo-active');
    }
}

function moveLeft() { if (state.currentLane > 0) { state.currentLane--; updatePlayerPosition(); } }
function moveRight() { if (state.currentLane < 2) { state.currentLane++; updatePlayerPosition(); } }
function updatePlayerPosition() {
    playerEl.className = ''; playerEl.classList.add('lane-' + state.currentLane);
    if(state.isTurbo) playerEl.classList.add('turbo-active');
}
function updateScore() { scoreEl.innerText = 'PUNTI: ' + state.score; }
function updateLives() { livesEl.innerText = '❤️'.repeat(state.lives); }

init();

// --- GESTIONE GRAFICA STRADA ---

function initRoad() {
    let roadSurface = document.getElementById('road-surface');
    if (!roadSurface) {
        roadSurface = document.createElement('div');
        roadSurface.id = 'road-surface';
        gameViewport.insertBefore(roadSurface, particlesContainer || gameViewport.firstChild);
    }

    roadSurface.style.cssText = `
        position: absolute;
        bottom: -50px;
        left: 50%;
        width: 150%; 
        height: ${100 - ROAD_SETTINGS.START_Y_PERCENT + 15}%; 
        background-image: url('img/strada.png'); 
        background-repeat: repeat;
        background-size: ${ROAD_SETTINGS.TEXTURE_TILE_SIZE}px ${ROAD_SETTINGS.TEXTURE_TILE_SIZE}px;
        background-color: #333;
        opacity: ${ROAD_SETTINGS.ROAD_OPACITY}; /* TRASPARENZA 50% */
        transform-origin: bottom center;
        transform: translateX(-50%) perspective(${ROAD_SETTINGS.ROAD_PERSPECTIVE}px) rotateX(${ROAD_SETTINGS.ROAD_TILT}deg);
        clip-path: polygon(
            calc(50% - ${ROAD_SETTINGS.ROAD_WIDTH_TOP / 2}px) 0%, 
            calc(50% + ${ROAD_SETTINGS.ROAD_WIDTH_TOP / 2}px) 0%, 
            calc(50% + ${ROAD_SETTINGS.ROAD_WIDTH_BOTTOM / 2}px) 100%, 
            calc(50% - ${ROAD_SETTINGS.ROAD_WIDTH_BOTTOM / 2}px) 100%
        );
        z-index: -5; 
        pointer-events: none;
    `;

    const oldLines = document.querySelectorAll('.road-line');
    oldLines.forEach(l => l.remove());
    state.roadLines = [];
    const lineSides = [-1, 1]; 
    lineSides.forEach(side => {
        for (let i = 0; i < ROAD_SETTINGS.NUM_SEGMENTS; i++) {
            const line = document.createElement('div');
            line.classList.add('road-line');
            line.style.cssText = `
                position: absolute;
                background-color: rgba(255, 255, 255, 0.9);
                width: 6px; height: 40px; 
                transform-origin: top center; z-index: -4;
            `;
            gameViewport.insertBefore(line, particlesContainer);
            state.roadLines.push({ element: line, progress: i / ROAD_SETTINGS.NUM_SEGMENTS, side: side });
        }
    });
}

// --- LOGICA DI GIOCO ---

function startGame() {


    // GESTIONE RICHIESTA SCHERMO INTERO FULLSCREEN:
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log("Errore fullscreen:", err);
        });
    }
    state.isPlaying = true; 
    state.score = 0; 
    state.lives = 3; 
    state.isTurbo = false;
    state.gates = []; 
    state.currentLane = 1; 
    state.lastTime = performance.now();
    state.waveActive = false; 
    state.textureOffset = 0;

    // Inizializza la coda mescolando le capitali (Giro completo)
    state.cityQueue = [...europeanCapitals].sort(() => Math.random() - 0.5);

    updateScore(); updateLives(); updatePlayerPosition();
    entitiesContainer.innerHTML = ''; particlesContainer.innerHTML = '';
    initRoad(); 
    
    overlayStart.classList.add('hidden'); 
    overlayOver.classList.add('hidden');
    if (document.getElementById('overlay-win')) document.getElementById('overlay-win').classList.add('hidden');

    startNextRound();
    if (state.animationFrameId) cancelAnimationFrame(state.animationFrameId);
    requestAnimationFrame(loop);
}

function startNextRound() {
    // Verifichiamo se ci sono ancora città nella coda
    if (state.cityQueue.length === 0) {
        showWinScreen();
        return;
    }

    pickNewMission(); 
    spawnGates();
    state.waveActive = true; 
    state.isTurbo = false; 
    playerEl.classList.remove('turbo-active');
}

function pickNewMission() {
    // Prendiamo la prossima città dalla coda (senza rimetterla dentro se indovinata)
    state.currentTarget = state.cityQueue.shift();
    targetDisplay.innerText = state.currentTarget.città;
    targetDisplay.classList.add('visible');
}

function spawnGates() {
    const correct = state.currentTarget.regione;
    let w1, w2;
    do { w1 = europeanCapitals[Math.floor(Math.random() * europeanCapitals.length)].regione; } while (w1 === correct);
    do { w2 = europeanCapitals[Math.floor(Math.random() * europeanCapitals.length)].regione; } while (w2 === correct || w2 === w1);
    const options = [correct, w1, w2].sort(() => Math.random() - 0.5);
    options.forEach((text, index) => {
        const gate = document.createElement('div');
        gate.classList.add('gate'); gate.innerText = text;
        entitiesContainer.appendChild(gate);
        state.gates.push({ element: gate, progress: 0, laneIndex: index, laneOffset: index - 1, isCorrect: (text === correct), active: true, hit: false, crashed: false });
    });
}

function loop(currentTime) {
    if (!state.isPlaying) return;
    const dt = Math.min((currentTime - state.lastTime) / 16.67, 2);
    state.lastTime = currentTime;

    // Se un'ondata è finita (tutti i cartelli usciti), passa alla prossima città
    if (state.gates.length === 0 && state.isPlaying) {
        startNextRound();
    }

    const currentSpeed = (state.isTurbo) ? CONSTANTS.TURBO_SPEED : CONSTANTS.NORMAL_SPEED;
    let perceivedSpeed = state.gates.length > 0 && (!state.waveActive || state.gates[0].hit) ? CONSTANTS.EXIT_SPEED : currentSpeed;

    // 1. SCORRIMENTO TEXTURE STRADA
    state.textureOffset += perceivedSpeed * dt * ROAD_SETTINGS.TEXTURE_SPEED_FACTOR; 
    const roadSurface = document.getElementById('road-surface');
    if (roadSurface) roadSurface.style.backgroundPosition = `center ${state.textureOffset}px`;

    // 2. SCORRIMENTO LINEE
    state.roadLines.forEach(line => {
        line.progress += perceivedSpeed * dt;
        if (line.progress > 1) line.progress -= 1; 
        const visualP = Math.pow(line.progress, ROAD_SETTINGS.PERSPECTIVE_POWER);
        const topPos = ROAD_SETTINGS.START_Y_PERCENT + (visualP * (100 - ROAD_SETTINGS.START_Y_PERCENT));
        const currentLineWidthSpread = ROAD_SETTINGS.LINES_WIDTH_TOP + (visualP * (ROAD_SETTINGS.LINES_WIDTH_BOTTOM - ROAD_SETTINGS.LINES_WIDTH_TOP));
        const xPos = (gameViewport.offsetWidth / 2) + ((currentLineWidthSpread / 2) * line.side);
        const scale = 0.1 + (visualP * 1.5); 
        const rotation = ROAD_SETTINGS.ROTATION_DEG * line.side; 
        line.element.style.top = topPos + '%';
        line.element.style.left = xPos + 'px';
        line.element.style.opacity = visualP < 0.1 ? visualP * 10 : (visualP > 0.9 ? 1 - ((visualP - 0.9) * 10) : 1);
        line.element.style.transform = `translate(-50%, 0) scale(${scale}) rotate(${rotation}deg)`;
    });

    // 3. MOVIMENTO CARTELLI
    for (let i = state.gates.length - 1; i >= 0; i--) {
        let g = state.gates[i];
        let moveSpeed = (!state.waveActive || g.hit) ? CONSTANTS.EXIT_SPEED : currentSpeed;
        g.progress += moveSpeed * dt;
        
        const topPos = ROAD_SETTINGS.START_Y_PERCENT + (g.progress * (100 - ROAD_SETTINGS.START_Y_PERCENT));
        const scale = 0.02 + g.progress * 1.2;
        const xPos = (gameViewport.offsetWidth / 2) + (g.laneOffset * (130 * scale)); 
        
        g.element.style.top = topPos + '%'; 
        g.element.style.left = xPos + 'px';
        
        let transformString = `translate(-50%, -100%) scale(${scale})`;
        if (g.crashed) { transformString += ` rotate(${g.progress * 100}deg) skew(20deg)`; g.element.style.opacity = Math.max(0, 1 - (g.progress - 0.8)); }
        else if (!g.hit) { g.element.style.opacity = g.progress < 0.1 ? g.progress * 10 : 1; }
        g.element.style.transform = transformString;

        if (state.waveActive && g.active && !g.hit && g.progress >= 0.81) { if (g.laneIndex === state.currentLane) handleCollision(g); }
        if (g.progress > 1.5) { g.element.remove(); state.gates.splice(i, 1); }
    }
    state.animationFrameId = requestAnimationFrame(loop);
}

function handleCollision(g) {
    g.active = false; g.hit = true; state.waveActive = false; 
    if (g.isCorrect) {
        soundAccelera.play(); state.isTurbo = true; playerEl.classList.add('turbo-active');
        state.score += 100; updateScore(); playerEl.classList.add('glow-active');
        state.gates.forEach(other => { if(other !== g) other.element.style.opacity = '0.4'; });
        setTimeout(() => playerEl.classList.remove('glow-active'), 600);
    } else {
        soundSbanda.play(); state.lives--; updateLives();
        g.crashed = true; g.element.style.zIndex = "100"; 
        playerEl.classList.add('crash-active'); createSmoke();
        setTimeout(() => playerEl.classList.remove('crash-active'), 500);
        state.isTurbo = false; playerEl.classList.remove('turbo-active');

        // Se sbaglia, rimettiamo la città in fondo alla coda per riprovare più tardi
        state.cityQueue.push(state.currentTarget);

        if (state.lives <= 0) gameOver(g.element.innerText);
    }
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
    cancelAnimationFrame(state.animationFrameId);
    targetDisplay.classList.remove('visible');
    const winOverlay = document.getElementById('overlay-win');
    if (winOverlay) winOverlay.classList.remove('hidden');
    else alert("GRANDE! HAI COMPLETATO TUTTO IL GIRO!"); 
}

function gameOver(wrongTxt) {
    state.isPlaying = false; cancelAnimationFrame(state.animationFrameId);
    targetDisplay.classList.remove('visible');
    lastErrorDisplay.innerHTML = `Hai scelto <b>${wrongTxt}</b>.<br>La risposta corretta era <b>${state.currentTarget.regione}</b>.`;
    if(state.currentTarget.curiosità) didYouKnowText.textContent = state.currentTarget.curiosità;
    overlayOver.classList.remove('hidden');
}

function resetToStart() { overlayOver.classList.add('hidden'); overlayStart.classList.remove('hidden'); if(document.getElementById('overlay-win')) document.getElementById('overlay-win').classList.add('hidden'); entitiesContainer.innerHTML = ''; }