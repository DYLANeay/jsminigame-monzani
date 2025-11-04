// Gestionnaire des décorations
export class DecorationManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.raindrops = [];
    this.initRain();

    // Charger les 4 photos personnelles
    this.photos = [];
    this.photoStates = [false, false, false, false]; // État de chargement

    for (let i = 1; i <= 4; i++) {
      const img = new Image();
      img.src = `images/photo${i}.jpg`;
      img.onload = () => {
        this.photoStates[i - 1] = true;
      };
      img.onerror = () => {
        console.log(`Photo ${i} not found - showing placeholder`);
      };
      this.photos.push(img);
    }
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
      // Livre ouvert - style reconnaissable
      // Page gauche
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(x - 45, y - 30, 40, 60);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 45, y - 30, 40, 60);

      // Page droite
      ctx.fillRect(x + 5, y - 30, 40, 60);
      ctx.strokeRect(x + 5, y - 30, 40, 60);

      // Reliure centrale
      ctx.beginPath();
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x, y + 30);
      ctx.lineWidth = 2;
      ctx.stroke();

      // Lignes de texte sur page gauche
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(x - 40, y - 20 + i * 10);
        ctx.lineTo(x - 10, y - 20 + i * 10);
        ctx.stroke();
      }

      // Lignes de texte sur page droite
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(x + 10, y - 20 + i * 10);
        ctx.lineTo(x + 40, y - 20 + i * 10);
        ctx.stroke();
      }

      // Effet de profondeur des pages
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x - 45 - i, y + 30);
        ctx.lineTo(x - 45 - i, y + 30 - i * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + 45 + i, y + 30);
        ctx.lineTo(x + 45 + i, y + 30 - i * 2);
        ctx.stroke();
      }
    } else {
      // Livre fermé - style reconnaissable avec tranche
      // Couverture
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(x - 28, y - 40, 56, 80);

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 28, y - 40, 56, 80);

      // Tranche visible sur le côté droit
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.moveTo(x + 28, y - 40);
      ctx.lineTo(x + 32, y - 38);
      ctx.lineTo(x + 32, y + 38);
      ctx.lineTo(x + 28, y + 40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Pages visibles sur la tranche
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.moveTo(x + 28, y - 35 + i * 5);
        ctx.lineTo(x + 32, y - 37 + i * 5);
        ctx.stroke();
      }

      // Titre sur la couverture
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x - 20, y - 25);
      ctx.lineTo(x + 20, y - 25);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x - 20, y - 10);
      ctx.lineTo(x + 20, y - 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x - 15, y + 5);
      ctx.lineTo(x + 15, y + 5);
      ctx.stroke();
    }

    ctx.restore();
  }

  drawKindle(ctx, x, y) {
    ctx.save();

    // Corps de la Kindle - design reconnaissable tablette moderne
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(x - 38, y - 52, 76, 104);

    // Bordure pour donner l'aspect tablette
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.strokeRect(x - 38, y - 52, 76, 104);

    // Écran e-ink (blanc grisâtre)
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(x - 32, y - 46, 64, 84);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 32, y - 46, 64, 84);

    // Simulation de texte sur l'écran e-ink
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
      const lineY = y - 35 + i * 9;
      ctx.beginPath();
      ctx.moveTo(x - 28, lineY);
      ctx.lineTo(x + 28, lineY);
      ctx.stroke();
    }

    // Bouton power en bas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.arc(x, y + 45, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();

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

  drawPhoto(ctx, img, x, y, width, height, loaded, description) {
    ctx.save();

    if (loaded) {
      // Dessiner la photo réelle
      ctx.drawImage(img, x - width / 2, y - height / 2, width, height);

      // Cadre fin autour de la photo
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - width / 2, y - height / 2, width, height);
    } else {
      // Placeholder avec bordure en pointillés
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x - width / 2, y - height / 2, width, height);

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.strokeRect(x - width / 2, y - height / 2, width, height);
      ctx.setLineDash([]);

      // Texte du placeholder
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.font = '16px Courier New';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Photo placeholder', x, y - 10);

      if (description) {
        ctx.font = '12px Courier New';
        ctx.fillText(description, x, y + 10);
      }
    }

    ctx.restore();
  }

  drawSources(ctx, x, y) {
    ctx.save();
    
    // Titre
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 16px Courier New';
    ctx.textAlign = 'left';
    ctx.fillText('SOURCES', x, y);
    
    // Ligne sous le titre
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + 5);
    ctx.lineTo(x + 350, y + 5);
    ctx.stroke();
    
    // Liste des sources
    const sources = [
      'L\'Avenir du Bon - Liseuse vs livre papier',
      'Mavana - Impacts environnementaux',
      'ENAP - Lecture et environnement',
      'CIRAIG - Analyse cycle de vie',
      'Librinova - eBook vs livre papier',
      'Greenweez - Livre vs liseuse',
      'Springer - Étude 2017',
      'Springer - Étude 2011 (1)',
      'Springer - Étude 2011 (2)'
    ];
    
    ctx.font = '10px Courier New';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    
    sources.forEach((source, index) => {
      const yPos = y + 25 + (index * 15);
      // Puce
      ctx.fillText('•', x, yPos);
      // Texte
      ctx.fillText(source, x + 15, yPos);
    });
    
    // Note en bas
    ctx.font = '9px Courier New';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillText('Consultez le README pour les liens complets', x, y + 165);
    
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

    // Zone 3 (2400-3600): Livre papier - UN seul livre ouvert
    if (characterX > 1800 && characterX < 4200) {
      // Photo 1: Pile de livres vue de dessus à 45°
      const photo1X = 3000 - cameraX;
      if (photo1X > -250 && photo1X < this.canvas.width + 250) {
        this.drawPhoto(
          ctx,
          this.photos[0],
          photo1X,
          canvasHeight / 2,
          400,
          300,
          this.photoStates[0],
          'Stack of books'
        );
      }

      // Arbres en arrière-plan
      this.drawForest(ctx, cameraX, canvasHeight, 2600, 3600);

      // Pluie légère
      this.updateRain();
      this.drawRain(ctx, cameraX);
    }

    // Zone 4 (3600-4800): Liseuse - UNE seule Kindle
    if (characterX > 3000 && characterX < 5400) {
      // Photo 2: Kindle écran allumé 3/4
      const photo2X = 4300 - cameraX;
      if (photo2X > -250 && photo2X < this.canvas.width + 250) {
        this.drawPhoto(
          ctx,
          this.photos[1],
          photo2X,
          canvasHeight / 2,
          400,
          300,
          this.photoStates[1],
          'Kindle e-reader'
        );
      }
    }

    // Zone 5 (4800-6000): Déchets - poubelles
    if (characterX > 4200 && characterX < 6600) {
      // Photo 3: Vieux appareils électroniques cassés
      const photo3X = 5400 - cameraX;
      if (photo3X > -250 && photo3X < this.canvas.width + 250) {
        this.drawPhoto(
          ctx,
          this.photos[2],
          photo3X,
          canvasHeight / 2,
          400,
          300,
          this.photoStates[2],
          'E-waste'
        );
      }

      // Poubelles autour de la photo
      const trashes = [5100, 5700];
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
      // Photo 4: Main tenant livre ET Kindle côte à côte
      const photo4X = 8900 - cameraX;
      if (photo4X > -250 && photo4X < this.canvas.width + 250) {
        this.drawPhoto(
          ctx,
          this.photos[3],
          photo4X,
          canvasHeight / 2,
          400,
          300,
          this.photoStates[3],
          'Book & Kindle together'
        );
      }

      // Checkmarks autour de la photo
      const checks = [8600, 9200];
      checks.forEach((pos) => {
        const cX = pos - cameraX;
        if (cX > -100 && cX < this.canvas.width + 100) {
          this.drawCheckmark(ctx, cX, canvasHeight / 2);
        }
      });
    }

    // Zone finale (9600+): Sources
    if (characterX > 9000) {
      const sourcesX = 9800 - cameraX;
      if (sourcesX > -400 && sourcesX < this.canvas.width + 400) {
        this.drawSources(ctx, sourcesX, canvasHeight / 2 - 80);
      }
    }
  }
}
