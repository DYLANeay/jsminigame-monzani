export class Renderer {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  clear() {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground(cameraX) {}

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

  drawCredits(cameraX) {
    // Position des crédits dans le monde (après le dernier point d'histoire à 9600)
    const creditsWorldX = 9900;

    // Position à l'écran
    const screenX = creditsWorldX - cameraX;

    // Ne dessiner que si visible à l'écran
    if (screenX > -200 && screenX < this.canvas.width + 200) {
      this.ctx.save();
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      this.ctx.font = '14px Courier New';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Dylan Eray', screenX, this.canvas.height / 2 - 20);
      this.ctx.fillText('M53-2', screenX, this.canvas.height / 2 + 5);
      this.ctx.restore();
    }
  }
}
