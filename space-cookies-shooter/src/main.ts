import './styles/ui-theme.css';
import PhaserGame from './game/PhaserGame';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.id = 'game-container';
  document.body.appendChild(container);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const game = new PhaserGame(container);
});
