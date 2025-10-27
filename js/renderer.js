// Gestionnaire du rendu
export class Renderer {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  clear() {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground(cameraX) {
    // Background now rendered by decorations system
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
