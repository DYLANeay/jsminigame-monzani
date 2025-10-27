// Classe du personnage
export class Character {
  constructor(canvas) {
    this.x = 100;
    this.y = canvas.height - 180;
    this.width = 60;
    this.height = 120;
    this.speed = 3;
    this.isWalking = false;
    this.animationFrame = 0;
    this.animationSpeed = 0.2;
    this.currentEmotion = 'neutral'; // État émotionnel du personnage
    this.blinkTimer = 0;
    this.isBlinking = false;
  }

  // Définir l'émotion du personnage
  setEmotion(emotion) {
    this.currentEmotion = emotion;
  }

  update(keys, autoWalk, worldLength) {
    this.isWalking = false;

    // Mouvement automatique ou manuel
    if (autoWalk || keys.ArrowRight) {
      if (this.x < worldLength) {
        this.x += this.speed;
        this.isWalking = true;
      }
    }

    if (keys.ArrowLeft && !autoWalk) {
      if (this.x > 0) {
        this.x -= this.speed;
        this.isWalking = true;
      }
    }

    // Animation
    if (this.isWalking) {
      this.animationFrame += this.animationSpeed;
    }

    // Animation de clignement des yeux
    this.blinkTimer += 0.05;
    if (this.blinkTimer > 3) {
      this.isBlinking = true;
      if (this.blinkTimer > 3.2) {
        this.isBlinking = false;
        this.blinkTimer = 0;
      }
    }
  }

  draw(ctx, cameraX) {
    ctx.save();

    const x = this.x - cameraX;
    const y = this.y;

    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Tête - Cercle parfaitement rond
    const headRadius = 22;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, headRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // Cheveux/détail sur la tête (à l'intérieur du cercle)
    ctx.save();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 12, y - 18);
    ctx.quadraticCurveTo(x - 6, y - 20, x, y - 20);
    ctx.quadraticCurveTo(x + 6, y - 20, x + 12, y - 18);
    ctx.stroke();
    ctx.restore();

    // Dessiner le visage selon l'émotion
    this.drawFace(ctx, x, y);

    // Cou (commence sous le cercle)
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y + headRadius);
    ctx.lineTo(x, y + 30);
    ctx.stroke();

    // Corps (ligne verticale)
    ctx.beginPath();
    ctx.moveTo(x, y + 30);
    ctx.lineTo(x, y + 70);
    ctx.stroke();

    // Bras avec animation
    if (this.isWalking) {
      const armSwing = Math.sin(this.animationFrame) * 15;

      // Bras gauche
      ctx.beginPath();
      ctx.moveTo(x, y + 35);
      ctx.lineTo(x - 15, y + 55 + armSwing);
      ctx.stroke();

      // Bras droit
      ctx.beginPath();
      ctx.moveTo(x, y + 35);
      ctx.lineTo(x + 15, y + 55 - armSwing);
      ctx.stroke();
    } else {
      // Bras statiques
      ctx.beginPath();
      ctx.moveTo(x, y + 35);
      ctx.lineTo(x - 15, y + 55);
      ctx.lineTo(x - 15, y + 65);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y + 35);
      ctx.lineTo(x + 15, y + 55);
      ctx.lineTo(x + 15, y + 65);
      ctx.stroke();
    }

    // Jambes avec animation
    if (this.isWalking) {
      const legSwing = Math.sin(this.animationFrame) * 20;

      // Jambe gauche
      ctx.beginPath();
      ctx.moveTo(x, y + 70);
      ctx.lineTo(x - 10 + legSwing, y + 110);
      ctx.stroke();

      // Jambe droite
      ctx.beginPath();
      ctx.moveTo(x, y + 70);
      ctx.lineTo(x + 10 - legSwing, y + 110);
      ctx.stroke();
    } else {
      // Jambes statiques
      ctx.beginPath();
      ctx.moveTo(x, y + 70);
      ctx.lineTo(x - 10, y + 110);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y + 70);
      ctx.lineTo(x + 10, y + 110);
      ctx.stroke();
    }

    ctx.restore();
  }

  // Dessiner le visage selon l'émotion
  drawFace(ctx, x, y) {
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 2;

    switch (this.currentEmotion) {
      case 'curious': // Question - curieux
        // Yeux grands ouverts
        if (!this.isBlinking) {
          ctx.beginPath();
          ctx.arc(x - 7, y - 3, 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 7, y - 3, 4, 0, Math.PI * 2);
          ctx.stroke();
          // Pupilles
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(x - 7, y - 3, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + 7, y - 3, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(x - 10, y - 3);
          ctx.lineTo(x - 4, y - 3);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 4, y - 3);
          ctx.lineTo(x + 10, y - 3);
          ctx.stroke();
        }
        // Bouche en O
        ctx.beginPath();
        ctx.arc(x, y + 5, 5, 0, Math.PI * 2);
        ctx.stroke();
        break;

      case 'thoughtful': // Réflexion - pensif
        // Sourcils pensifs
        ctx.beginPath();
        ctx.moveTo(x - 12, y - 8);
        ctx.lineTo(x - 5, y - 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 12, y - 8);
        ctx.lineTo(x + 5, y - 10);
        ctx.stroke();
        // Yeux mi-clos
        if (!this.isBlinking) {
          ctx.beginPath();
          ctx.arc(x - 7, y - 2, 3, 0, Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + 7, y - 2, 3, 0, Math.PI);
          ctx.fill();
        }
        // Bouche neutre
        ctx.beginPath();
        ctx.moveTo(x - 8, y + 8);
        ctx.lineTo(x + 8, y + 8);
        ctx.stroke();
        break;

      case 'worried': // Inquiet - déchets électroniques
        // Sourcils inquiets
        ctx.beginPath();
        ctx.moveTo(x - 12, y - 10);
        ctx.lineTo(x - 5, y - 8);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 12, y - 10);
        ctx.lineTo(x + 5, y - 8);
        ctx.stroke();
        // Yeux larges
        if (!this.isBlinking) {
          ctx.beginPath();
          ctx.arc(x - 7, y - 3, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + 7, y - 3, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        // Bouche inquiète (arc inversé)
        ctx.beginPath();
        ctx.arc(x, y + 12, 8, Math.PI + 0.3, Math.PI * 2 - 0.3);
        ctx.stroke();
        break;

      case 'surprised': // Surpris - point de bascule
        // Sourcils levés
        ctx.beginPath();
        ctx.arc(x - 7, y - 10, 5, Math.PI, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + 7, y - 10, 5, Math.PI, Math.PI * 2);
        ctx.stroke();
        // Yeux grands ouverts
        if (!this.isBlinking) {
          ctx.beginPath();
          ctx.arc(x - 7, y - 3, 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 7, y - 3, 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(x - 7, y - 3, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + 7, y - 3, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        // Bouche surprise
        ctx.beginPath();
        ctx.arc(x, y + 5, 6, 0, Math.PI * 2);
        ctx.stroke();
        break;

      case 'contemplative': // Contemplatif - nuance
        // Sourcils légèrement froncés
        ctx.beginPath();
        ctx.moveTo(x - 12, y - 9);
        ctx.lineTo(x - 5, y - 9);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 12, y - 9);
        ctx.lineTo(x + 5, y - 9);
        ctx.stroke();
        // Yeux regardant de côté
        if (!this.isBlinking) {
          ctx.beginPath();
          ctx.arc(x - 5, y - 3, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + 9, y - 3, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        // Petite moue
        ctx.beginPath();
        ctx.moveTo(x - 6, y + 8);
        ctx.quadraticCurveTo(x, y + 6, x + 6, y + 8);
        ctx.stroke();
        break;

      case 'wise': // Sage - conclusion
        // Sourcils détendus
        ctx.beginPath();
        ctx.moveTo(x - 12, y - 9);
        ctx.quadraticCurveTo(x - 8, y - 10, x - 4, y - 9);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 12, y - 9);
        ctx.quadraticCurveTo(x + 8, y - 10, x + 4, y - 9);
        ctx.stroke();
        // Yeux bienveillants
        if (!this.isBlinking) {
          ctx.beginPath();
          ctx.arc(x - 7, y - 2, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + 7, y - 2, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        // Sourire sage
        ctx.beginPath();
        ctx.arc(x, y + 3, 10, 0.2, Math.PI - 0.2);
        ctx.stroke();
        break;

      default: // neutral - livre papier
        // Yeux normaux
        if (!this.isBlinking) {
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(x - 7, y - 3, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + 7, y - 3, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(x - 10, y - 3);
          ctx.lineTo(x - 4, y - 3);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 4, y - 3);
          ctx.lineTo(x + 10, y - 3);
          ctx.stroke();
        }
        // Sourire léger
        ctx.beginPath();
        ctx.arc(x, y + 4, 8, 0.3, Math.PI - 0.3);
        ctx.stroke();
        break;
    }
  }

  updateCanvasHeight(canvas) {
    this.y = canvas.height - 180;
  }
}
