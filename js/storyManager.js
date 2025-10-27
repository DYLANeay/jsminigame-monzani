// Gestionnaire des histoires
export class StoryManager {
  constructor(storyPoints, storyOverlay, character) {
    this.storyPoints = storyPoints;
    this.storyOverlay = storyOverlay;
    this.storyShown = new Set();
    this.character = character;

    // Mapping des émotions par index d'histoire
    this.emotions = [
      'neutral', // 0 - Le Début (nouveau - achat de la Kindle)
      'curious', // 1 - La Question (étude écologique)
      'neutral', // 2 - Le Livre Papier
      'thoughtful', // 3 - La Liseuse
      'worried', // 4 - Les Déchets Électroniques
      'surprised', // 5 - Le Point de Bascule
      'contemplative', // 6 - La Nuance
      'wise', // 7 - La Conclusion
    ];
  }

  check(characterX) {
    this.storyPoints.forEach((point, index) => {
      if (
        !this.storyShown.has(index) &&
        characterX >= point.position - 20 &&
        characterX <= point.position + 20
      ) {
        this.show(point, index);
      }
    });
  }

  show(storyPoint, index) {
    if (this.storyShown.has(index)) return;

    this.storyShown.add(index);

    // Changer l'émotion du personnage
    if (this.character && this.emotions[index]) {
      this.character.setEmotion(this.emotions[index]);
    }

    if (storyPoint.type === 'text') {
      this.storyOverlay.innerHTML = `
        <h2>${storyPoint.title}</h2>
        <p>${storyPoint.content}</p>
      `;
    } else if (storyPoint.type === 'image') {
      this.storyOverlay.innerHTML = `
        <h2>${storyPoint.title}</h2>
        <img src="${storyPoint.imageSrc}" alt="${storyPoint.title}">
        <p>${storyPoint.content || ''}</p>
      `;
    }

    this.storyOverlay.classList.add('visible');

    // Cacher après 4 secondes
    setTimeout(() => {
      this.storyOverlay.classList.remove('visible');
    }, 4000);
  }

  drawMarkers(ctx, cameraX, canvasHeight) {
    this.storyPoints.forEach((point, index) => {
      const x = point.position - cameraX;

      // Ne dessiner que les marqueurs visibles
      if (x > -50 && x < ctx.canvas.width + 50) {
        // Marqueur simple - petit carré
        ctx.strokeStyle = this.storyShown.has(index) ? '#CCCCCC' : '#000000';
        ctx.lineWidth = this.storyShown.has(index) ? 1 : 2;
        ctx.strokeRect(x - 5, canvasHeight - 85, 10, 10);

        // Ligne verticale vers le sol
        ctx.strokeStyle = this.storyShown.has(index) ? '#EEEEEE' : '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, canvasHeight - 75);
        ctx.lineTo(x, canvasHeight - 60);
        ctx.stroke();
      }
    });
  }
}
