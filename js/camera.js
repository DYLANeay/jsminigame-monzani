// Classe de la caméra
export class Camera {
  constructor() {
    this.x = 0;
    this.targetX = 0;
    this.smoothing = 0.1;
  }

  update(character, canvas, worldLength) {
    // Mise à jour de la caméra (reste centrée sur le personnage)
    this.targetX = character.x - canvas.width / 2;
    this.targetX = Math.max(
      0,
      Math.min(this.targetX, worldLength - canvas.width)
    );

    // Lissage de la caméra
    this.x += (this.targetX - this.x) * this.smoothing;
  }
}
