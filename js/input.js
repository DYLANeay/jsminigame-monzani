// Gestionnaire des entrées utilisateur
export class InputManager {
  constructor() {
    this.keys = {
      ArrowLeft: false,
      ArrowRight: false,
    };

    this.setupKeyboardEvents();
  }

  setupKeyboardEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.key in this.keys) {
        this.keys[e.key] = true;
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key in this.keys) {
        this.keys[e.key] = false;
        e.preventDefault();
      }
    });
  }

  getKeys() {
    return this.keys;
  }
}
