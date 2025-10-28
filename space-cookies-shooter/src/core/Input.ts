import Phaser from 'phaser';

export interface InputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  fire: boolean;
  dash: boolean;
  autofire: boolean;
}

export type BindingMap = Record<string, string>;

export default class InputManager {
  scene: Phaser.Scene;
  bindings: BindingMap;
  state: InputState;
  autofireEnabled: boolean;
  gamepadEnabled: boolean;
  gamepad?: Phaser.Input.Gamepad.Gamepad;

  constructor(scene: Phaser.Scene, bindings: BindingMap, autoFire = false, gamepadEnabled = true) {
    this.scene = scene;
    this.bindings = bindings;
    this.autofireEnabled = autoFire;
    this.gamepadEnabled = gamepadEnabled;
    this.state = { up: false, down: false, left: false, right: false, fire: false, dash: false, autofire: autoFire };
    this.registerListeners();
  }

  registerListeners(): void {
    this.scene.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      this.handleKey(event.code, true);
    });
    this.scene.input.keyboard?.on('keyup', (event: KeyboardEvent) => {
      this.handleKey(event.code, false);
    });

    this.scene.input.on('pointerdown', () => {
      this.state.fire = true;
    });

    this.scene.input.on('pointerup', () => {
      this.state.fire = false;
    });

    this.scene.input.gamepad?.on('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
      if (!this.gamepad && this.gamepadEnabled) {
        this.gamepad = pad;
      }
    });
  }

  handleKey(code: string, pressed: boolean): void {
    Object.entries(this.bindings).forEach(([action, binding]) => {
      if (binding === code) {
        if (action === 'autofire' && pressed) {
          this.autofireEnabled = !this.autofireEnabled;
          this.state.autofire = this.autofireEnabled;
        } else if (action in this.state) {
          (this.state as Record<string, boolean>)[action] = pressed;
        }
      }
    });
  }

  update(): InputState {
    if (this.gamepad && this.gamepadEnabled) {
      const pad = this.gamepad;
      const threshold = 0.2;
      this.state.left = pad.leftStick.x < -threshold;
      this.state.right = pad.leftStick.x > threshold;
      this.state.up = pad.leftStick.y < -threshold;
      this.state.down = pad.leftStick.y > threshold;
      this.state.fire = pad.buttons[0]?.pressed || this.autofireEnabled;
      this.state.dash = pad.buttons[1]?.pressed ?? false;
    }
    if (this.autofireEnabled) {
      this.state.fire = true;
    }
    return this.state;
  }
}
