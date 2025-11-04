// Point d'entrée principal du jeu
import { config } from './config.js';
import { Character } from './character.js';
import { Camera } from './camera.js';
import { storyPoints } from './storyData.js';
import { StoryManager } from './storyManager.js';
import { Renderer } from './renderer.js';
import { InputManager } from './input.js';
import { DecorationManager } from './decorations.js';

class Game {
  constructor() {
    // Canvas setup
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // DOM elements
    this.storyOverlay = document.getElementById('story-overlay');
    this.autoBtn = document.getElementById('autoBtn');

    // Game components
    this.character = new Character(this.canvas);
    this.camera = new Camera();
    this.storyManager = new StoryManager(
      storyPoints,
      this.storyOverlay,
      this.character
    );
    this.renderer = new Renderer(this.ctx, this.canvas);
    this.inputManager = new InputManager();
    this.decorationManager = new DecorationManager(this.canvas);

    this.setupUI();
    this.setupResize();


    this.gameLoop();
  }

  setupUI() {
    this.autoBtn.addEventListener('click', () => {
      config.autoWalk = !config.autoWalk;
      this.autoBtn.textContent = `Auto: ${config.autoWalk ? 'ON' : 'OFF'}`;
      this.autoBtn.classList.toggle('active');
    });
  }

  setupResize() {
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.character.updateCanvasHeight(this.canvas);
    });
  }

  update() {
    const keys = this.inputManager.getKeys();

    // Update character
    this.character.update(keys, config.autoWalk, config.worldLength);

    // Update camera
    this.camera.update(this.character, this.canvas, config.worldLength);

    // Check story points
    this.storyManager.check(this.character.x);
  }

  draw() {
    // Clear canvas
    this.renderer.clear();

    // Draw background elements
    this.renderer.drawBackground(this.camera.x);

    // Draw decorations (before other elements)
    this.decorationManager.draw(
      this.ctx,
      this.camera.x,
      this.character.x,
      this.canvas.height
    );

    // Draw story markers
    this.storyManager.drawMarkers(this.ctx, this.camera.x, this.canvas.height);

    // Draw ground
    this.renderer.drawGround();

    // Draw character
    this.character.draw(this.ctx, this.camera.x);

    // Draw UI
    this.renderer.drawProgress(this.character.x, config.worldLength);
    this.renderer.drawCredits(this.camera.x);
  }

  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
}

// Start the game when DOM is ready
new Game();
