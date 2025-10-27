// Configuration du canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Éléments DOM
const storyOverlay = document.getElementById('story-overlay');
const autoBtn = document.getElementById('autoBtn');

// Image d'arrière-plan
const backgroundImage = new Image();
backgroundImage.src = 'back.jpg'; // Changez ce nom pour votre image
let imageLoaded = false;
backgroundImage.onload = () => {
  imageLoaded = true;
};

// Configuration du jeu
const config = {
  characterSpeed: 3,
  storyInterval: 1200, // Tous les 1200 pixels - beaucoup plus d'espace!
  autoWalk: false,
};

// Personnage en bâton
const character = {
  x: 100,
  y: canvas.height - 120,
  width: 4,
  height: 50,
  speed: config.characterSpeed,
  isWalking: false,
  animationFrame: 0,
  animationSpeed: 0.4,
};

// Caméra
const camera = {
  x: 0,
  targetX: 0,
};

// Points d'histoire - espacés de 1200 pixels
const storyPoints = [
  {
    position: 1200,
    type: 'text',
    title: 'Le Début',
    content:
      'Il était une fois, dans un monde simple et blanc, un voyageur qui commença son périple...',
  },
  {
    position: 2400,
    type: 'text',
    title: 'La Découverte',
    content:
      'Au fil de sa marche, il découvrit que chaque pas le rapprochait de sa destinée.',
  },
  {
    position: 3600,
    type: 'text',
    title: 'La Réflexion',
    content:
      "Il s'arrêta un instant pour contempler le chemin parcouru. Tant de choses avaient changé.",
  },
  {
    position: 4800,
    type: 'text',
    title: "L'Espoir",
    content:
      "L'horizon s'éclaircissait. Il sentait qu'il approchait de quelque chose d'important.",
  },
  {
    position: 6000,
    type: 'text',
    title: 'La Fin du Voyage',
    content:
      'Et finalement, après tout ce chemin, il comprit que le voyage lui-même était la destination.',
  },
];

let worldLength = 6500; // Longueur totale du monde - beaucoup plus long!
let currentStoryIndex = 0;
let storyShown = new Set();

// Gestion des touches
const keys = {
  ArrowLeft: false,
  ArrowRight: false,
};

window.addEventListener('keydown', (e) => {
  if (e.key in keys) {
    keys[e.key] = true;
    e.preventDefault();
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key in keys) {
    keys[e.key] = false;
    e.preventDefault();
  }
});

// Bouton auto
autoBtn.addEventListener('click', () => {
  config.autoWalk = !config.autoWalk;
  autoBtn.textContent = `Auto: ${config.autoWalk ? 'ON' : 'OFF'}`;
  autoBtn.classList.toggle('active');
});

// Redimensionnement
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  character.y = canvas.height - 100;
});

// Dessiner le personnage en bâton (stick figure)
function drawCharacter() {
  ctx.save();

  const x = character.x - camera.x;
  const y = character.y;

  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Tête (cercle)
  ctx.beginPath();
  ctx.arc(x, y - 10, 8, 0, Math.PI * 2);
  ctx.stroke();

  // Corps (ligne verticale)
  ctx.beginPath();
  ctx.moveTo(x, y - 2);
  ctx.lineTo(x, y + 25);
  ctx.stroke();

  // Bras
  ctx.beginPath();
  ctx.moveTo(x - 10, y + 8);
  ctx.lineTo(x, y + 5);
  ctx.lineTo(x + 10, y + 8);
  ctx.stroke();

  // Jambes avec animation
  if (character.isWalking) {
    const legAngle = Math.sin(character.animationFrame) * 0.4;

    // Jambe gauche
    ctx.beginPath();
    ctx.moveTo(x, y + 25);
    ctx.lineTo(x - 8 + Math.sin(character.animationFrame) * 8, y + 45);
    ctx.stroke();

    // Jambe droite
    ctx.beginPath();
    ctx.moveTo(x, y + 25);
    ctx.lineTo(x + 8 - Math.sin(character.animationFrame) * 8, y + 45);
    ctx.stroke();
  } else {
    // Jambes statiques
    ctx.beginPath();
    ctx.moveTo(x, y + 25);
    ctx.lineTo(x - 6, y + 45);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y + 25);
    ctx.lineTo(x + 6, y + 45);
    ctx.stroke();
  }

  ctx.restore();
}

// Dessiner le sol minimaliste
function drawGround() {
  // Ligne de sol simple
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - 60);
  ctx.lineTo(canvas.width, canvas.height - 60);
  ctx.stroke();
}

// Dessiner les marqueurs d'histoire minimalistes
function drawStoryMarkers() {
  storyPoints.forEach((point, index) => {
    const x = point.position - camera.x;

    // Ne dessiner que les marqueurs visibles
    if (x > -50 && x < canvas.width + 50) {
      // Marqueur simple - petit carré
      ctx.strokeStyle = storyShown.has(index) ? '#CCCCCC' : '#000000';
      ctx.lineWidth = storyShown.has(index) ? 1 : 2;
      ctx.strokeRect(x - 5, canvas.height - 85, 10, 10);

      // Ligne verticale vers le sol
      ctx.strokeStyle = storyShown.has(index) ? '#EEEEEE' : '#000000';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, canvas.height - 75);
      ctx.lineTo(x, canvas.height - 60);
      ctx.stroke();
    }
  });
}

// Afficher une histoire
function showStory(storyPoint, index) {
  if (storyShown.has(index)) return;

  storyShown.add(index);

  if (storyPoint.type === 'text') {
    storyOverlay.innerHTML = `
            <h2>${storyPoint.title}</h2>
            <p>${storyPoint.content}</p>
        `;
  } else if (storyPoint.type === 'image') {
    storyOverlay.innerHTML = `
            <h2>${storyPoint.title}</h2>
            <img src="${storyPoint.imageSrc}" alt="${storyPoint.title}">
            <p>${storyPoint.content || ''}</p>
        `;
  }

  storyOverlay.classList.add('visible');

  // Cacher après 4 secondes
  setTimeout(() => {
    storyOverlay.classList.remove('visible');
  }, 4000);
}

// Vérifier les points d'histoire
function checkStoryPoints() {
  storyPoints.forEach((point, index) => {
    if (
      !storyShown.has(index) &&
      character.x >= point.position - 20 &&
      character.x <= point.position + 20
    ) {
      showStory(point, index);
    }
  });
}

// Mettre à jour le jeu
function update() {
  character.isWalking = false;

  // Mouvement automatique ou manuel
  if (config.autoWalk || keys.ArrowRight) {
    if (character.x < worldLength) {
      character.x += character.speed;
      character.isWalking = true;
    }
  }

  if (keys.ArrowLeft && !config.autoWalk) {
    if (character.x > 0) {
      character.x -= character.speed;
      character.isWalking = true;
    }
  }

  // Animation
  if (character.isWalking) {
    character.animationFrame += character.animationSpeed;
  }

  // Mise à jour de la caméra (reste centrée sur le personnage)
  camera.targetX = character.x - canvas.width / 2 + character.width / 2;
  camera.targetX = Math.max(
    0,
    Math.min(camera.targetX, worldLength - canvas.width)
  );

  // Lissage de la caméra
  camera.x += (camera.targetX - camera.x) * 0.1;

  // Vérifier les points d'histoire
  checkStoryPoints();
}

// Dessiner le jeu
function draw() {
  // Effacer le canvas - fond blanc pur
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Image d'arrière-plan si chargée
  if (imageLoaded) {
    ctx.save();
    ctx.globalAlpha = 1; // Opacité de l'image (0.3 = 30%)

    // Position de l'image dans le monde (affectée par la caméra)
    const imgX = 500 - camera.x; // Position X dans le monde
    const imgY = canvas.height / 2 - 200; // Centré verticalement
    const imgWidth = 400; // Largeur de l'image
    const imgHeight = 400; // Hauteur de l'image

    // Dessiner l'image seulement si elle est visible
    if (imgX + imgWidth > 0 && imgX < canvas.width) {
      ctx.drawImage(backgroundImage, imgX, imgY, imgWidth, imgHeight);
    }

    ctx.restore();
  }

  // Texte "WELCOME" en arrière-plan - positionné à droite dans le monde
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.font = 'bold 120px Courier New';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  // Position fixe dans le monde (affecté par la caméra)
  const textX = canvas.width - 50 - camera.x;
  ctx.fillText('WELCOME', textX, canvas.height / 2);
  ctx.restore();

  // Dessiner les éléments
  drawStoryMarkers();
  drawGround();
  drawCharacter();

  // Indicateur de progression minimaliste
  ctx.fillStyle = '#000000';
  ctx.font = '11px Courier New';
  ctx.textAlign = 'right';
  ctx.fillText(
    `${Math.round((character.x / worldLength) * 100)}%`,
    canvas.width - 20,
    30
  );
}

// Boucle de jeu
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Démarrer le jeu
gameLoop();
