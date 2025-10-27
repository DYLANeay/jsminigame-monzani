// Gestionnaire des décorations
export class DecorationManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.raindrops = [];
    this.initRain();
  }

  initRain() {
    // Créer des gouttes de pluie
    for (let i = 0; i < 50; i++) {
      this.raindrops.push({
        x: Math.random() * this.canvas.width * 3,
        y: Math.random() * this.canvas.height,
        speed: 3 + Math.random() * 2,
        length: 10 + Math.random() * 10,
      });
    }
  }

  updateRain() {
    this.raindrops.forEach((drop) => {
      drop.y += drop.speed;
      if (drop.y > this.canvas.height) {
        drop.y = -drop.length;
        drop.x = Math.random() * this.canvas.width * 3;
      }
    });
  }

  drawRain(ctx, cameraX) {
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 1;
    
    this.raindrops.forEach((drop) => {
      const x = drop.x - cameraX;
      // Dessiner seulement si visible
      if (x > -50 && x < this.canvas.width + 50) {
        ctx.beginPath();
        ctx.moveTo(x, drop.y);
        ctx.lineTo(x, drop.y + drop.length);
        ctx.stroke();
      }
    });
    
    ctx.restore();
  }

  drawTree(ctx, x, y, size = 1) {
    ctx.save();
    
    // Tronc - plus épais
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6 * size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 60 * size);
    ctx.stroke();
    
    // Feuillage (triangles superposés) - plus grands
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    
    // Triangle du bas
    ctx.beginPath();
    ctx.moveTo(x - 35 * size, y - 45 * size);
    ctx.lineTo(x, y - 80 * size);
    ctx.lineTo(x + 35 * size, y - 45 * size);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Triangle du milieu
    ctx.beginPath();
    ctx.moveTo(x - 30 * size, y - 70 * size);
    ctx.lineTo(x, y - 100 * size);
    ctx.lineTo(x + 30 * size, y - 70 * size);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Triangle du haut
    ctx.beginPath();
    ctx.moveTo(x - 25 * size, y - 95 * size);
    ctx.lineTo(x, y - 120 * size);
    ctx.lineTo(x + 25 * size, y - 95 * size);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
  }

  drawForest(ctx, cameraX, canvasHeight, startPos, endPos) {
    const groundY = canvasHeight - 60;
    
    // Dessiner plusieurs arbres entre startPos et endPos
    const trees = [
      { x: startPos + 100, size: 0.8 },
      { x: startPos + 250, size: 1 },
      { x: startPos + 450, size: 0.9 },
      { x: startPos + 600, size: 1.1 },
      { x: startPos + 800, size: 0.85 },
      { x: startPos + 950, size: 1 },
      { x: startPos + 1100, size: 0.95 },
    ];
    
    trees.forEach((tree) => {
      const treeX = tree.x - cameraX;
      // Dessiner seulement si visible
      if (treeX > -100 && treeX < this.canvas.width + 100) {
        this.drawTree(ctx, treeX, groundY, tree.size);
      }
    });
  }

  drawBook(ctx, x, y, open = false) {
    ctx.save();
    
    if (open) {
      // Livre ouvert - plus grand
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(x - 40, y - 25, 35, 50);
      ctx.fillRect(x + 5, y - 25, 35, 50);
      
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 40, y - 25, 35, 50);
      ctx.strokeRect(x + 5, y - 25, 35, 50);
      
      // Pages
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(x - 35, y - 18 + i * 12);
        ctx.lineTo(x - 10, y - 18 + i * 12);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x + 10, y - 18 + i * 12);
        ctx.lineTo(x + 35, y - 18 + i * 12);
        ctx.stroke();
      }
    } else {
      // Livre fermé - plus grand
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(x - 25, y - 35, 50, 70);
      
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 25, y - 35, 50, 70);
      
      // Titre
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 18, y - 18);
      ctx.lineTo(x + 18, y - 18);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - 18, y);
      ctx.lineTo(x + 18, y);
      ctx.stroke();
    }
    
    ctx.restore();
  }

  drawKindle(ctx, x, y) {
    ctx.save();
    
    // Corps de la Kindle - plus grand
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(x - 35, y - 45, 70, 90);
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.strokeRect(x - 35, y - 45, 70, 90);
    
    // Écran - plus grand
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(x - 30, y - 40, 60, 72);
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 30, y - 40, 60, 72);
    
    // Texte sur l'écran
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.moveTo(x - 25, y - 32 + i * 10);
      ctx.lineTo(x + 25, y - 32 + i * 10);
      ctx.stroke();
    }
    
    ctx.restore();
  }

  drawTrash(ctx, x, y) {
    ctx.save();
    
    // Poubelle - plus grande
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    
    // Corps
    ctx.beginPath();
    ctx.moveTo(x - 25, y - 15);
    ctx.lineTo(x - 20, y + 35);
    ctx.lineTo(x + 20, y + 35);
    ctx.lineTo(x + 25, y - 15);
    ctx.closePath();
    ctx.stroke();
    
    // Couvercle
    ctx.beginPath();
    ctx.moveTo(x - 28, y - 15);
    ctx.lineTo(x + 28, y - 15);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x - 12, y - 25);
    ctx.lineTo(x + 12, y - 25);
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Symboles toxiques - plus grand
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.fillText('☠', x, y + 15);
    
    ctx.restore();
  }

  drawNumbers(ctx, x, y, value) {
    ctx.save();
    
    ctx.font = 'bold 60px Courier New';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.textAlign = 'center';
    ctx.fillText(value, x, y);
    
    ctx.restore();
  }

  drawQuestionMark(ctx, x, y) {
    ctx.save();
    
    ctx.font = 'bold 100px Courier New';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.textAlign = 'center';
    ctx.fillText('?', x, y);
    
    ctx.restore();
  }

  drawCheckmark(ctx, x, y) {
    ctx.save();
    
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(x - 30, y);
    ctx.lineTo(x - 10, y + 20);
    ctx.lineTo(x + 30, y - 30);
    ctx.stroke();
    
    ctx.restore();
  }

  draw(ctx, cameraX, characterX, canvasHeight) {
    // Zone 1 (0-1200): Début - Kindle
    if (characterX < 1800) {
      const kindleX = 800 - cameraX;
      if (kindleX > -100 && kindleX < this.canvas.width + 100) {
        this.drawKindle(ctx, kindleX, canvasHeight / 2);
      }
    }

    // Zone 2 (1200-2400): Question - point d'interrogation unique
    if (characterX > 600 && characterX < 3000) {
      const q1 = 1900 - cameraX;
      if (q1 > -100 && q1 < this.canvas.width + 100) {
        this.drawQuestionMark(ctx, q1, canvasHeight / 2);
      }
    }

    // Zone 3 (2400-3600): Livre papier - livres et arbres
    if (characterX > 1800 && characterX < 4200) {
      // Livres
      const books = [
        { x: 2800, open: false },
        { x: 3000, open: true },
        { x: 3200, open: false },
      ];
      
      books.forEach((book) => {
        const bookX = book.x - cameraX;
        if (bookX > -100 && bookX < this.canvas.width + 100) {
          this.drawBook(ctx, bookX, canvasHeight / 2, book.open);
        }
      });

      // Arbres en arrière-plan
      this.drawForest(ctx, cameraX, canvasHeight, 2600, 3600);
      
      // Pluie légère
      this.updateRain();
      this.drawRain(ctx, cameraX);
    }

    // Zone 4 (3600-4800): Liseuse - Kindles multiples
    if (characterX > 3000 && characterX < 5400) {
      const kindles = [4000, 4300, 4600];
      kindles.forEach((pos) => {
        const kX = pos - cameraX;
        if (kX > -100 && kX < this.canvas.width + 100) {
          this.drawKindle(ctx, kX, canvasHeight / 2 + 20);
        }
      });
    }

    // Zone 5 (4800-6000): Déchets - poubelles
    if (characterX > 4200 && characterX < 6600) {
      const trashes = [5100, 5400, 5700];
      trashes.forEach((pos) => {
        const tX = pos - cameraX;
        if (tX > -100 && tX < this.canvas.width + 100) {
          this.drawTrash(ctx, tX, canvasHeight - 100);
        }
      });
    }

    // Zone 6 (6000-7200): Point de bascule - nombres
    if (characterX > 5400 && characterX < 7800) {
      const numbers = [
        { x: 6300, value: '25' },
        { x: 6500, value: '50' },
        { x: 6700, value: '10' },
      ];
      
      numbers.forEach((num) => {
        const nX = num.x - cameraX;
        if (nX > -100 && nX < this.canvas.width + 100) {
          this.drawNumbers(ctx, nX, canvasHeight / 2, num.value);
        }
      });
    }

    // Zone 7 (7200-8400): Nuance - livres + Kindles mélangés
    if (characterX > 6600 && characterX < 9000) {
      const mix = [
        { x: 7500, type: 'book' },
        { x: 7700, type: 'kindle' },
        { x: 7900, type: 'book' },
        { x: 8100, type: 'kindle' },
      ];
      
      mix.forEach((item) => {
        const iX = item.x - cameraX;
        if (iX > -100 && iX < this.canvas.width + 100) {
          if (item.type === 'book') {
            this.drawBook(ctx, iX, canvasHeight / 2 + 20, false);
          } else {
            this.drawKindle(ctx, iX, canvasHeight / 2 + 20);
          }
        }
      });
    }

    // Zone 8 (8400-9600): Conclusion - checkmarks
    if (characterX > 7800) {
      const checks = [8800, 9100];
      checks.forEach((pos) => {
        const cX = pos - cameraX;
        if (cX > -100 && cX < this.canvas.width + 100) {
          this.drawCheckmark(ctx, cX, canvasHeight / 2);
        }
      });
    }
  }
}
