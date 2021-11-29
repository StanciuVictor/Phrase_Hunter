let game;

const resetBtn = document.getElementById('btn__reset');
const qwerty = document.getElementById('qwerty');
const keyboard = document.querySelectorAll('.keyrow button');

// Start a new game when user clicks the 'Start Game' button
resetBtn.addEventListener('click', () => {
  game = new Game();
  game.startGame();
  // console.log(`Active Phrase - phrase: ${game.activePhrase.phrase}`);
});

// Listen for clicked letters
qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    game.handleInteraction(e.target);
  }
});

// Listen for typed keys
window.addEventListener('keyup', (e) => {
  [...keyboard].forEach(key => {
    if (key.textContent === e.key) {
      game.handleInteraction(key);
    }
  });
});