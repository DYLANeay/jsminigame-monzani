// Gestionnaire du rendu
export class Renderer {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.backgroundImage = new Image();
    this.backgroundImage.src = 'back.jpg';
    this.imageLoaded = false;

    this.backgroundImage.onload = () => {
      this.imageLoaded = true;
    };
  }

  clear() {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground(cameraX) {
    // Image d'arrière-plan si chargée
    if (this.imageLoaded) {
      this.ctx.save();
      this.ctx.globalAlpha = 1;

      const imgX = 500 - cameraX;
      const imgY = this.canvas.height / 2 - 200;
      const imgWidth = 400;
      const imgHeight = 400;

      if (imgX + imgWidth > 0 && imgX < this.canvas.width) {
        this.ctx.drawImage(
          this.backgroundImage,
          imgX,
          imgY,
          imgWidth,
          imgHeight
        );
      }

      this.ctx.restore();
    }

    // Texte "WELCOME" en arrière-plan
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.font = 'bold 120px Courier New';
    this.ctx.textAlign = 'right';
    this.ctx.textBaseline = 'middle';
    const textX = this.canvas.width - 50 - cameraX;
    this.ctx.fillText('WELCOME', textX, this.canvas.height / 2);
    this.ctx.restore();
  }

  drawGround() {
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvas.height - 60);
    this.ctx.lineTo(this.canvas.width, this.canvas.height - 60);
    this.ctx.stroke();
  }

  drawProgress(characterX, worldLength) {
    this.ctx.fillStyle = '#000000';
    this.ctx.font = '11px Courier New';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(
      `${Math.round((characterX / worldLength) * 100)}%`,
      this.canvas.width - 20,
      30
    );
  }
}
