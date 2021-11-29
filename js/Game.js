class Game {
  constructor () {
    // The number of missed guesses
    this.missed = 0;
    // All phrases in the game
    this.phrases = this.createPhrases();
    // The phrase that must be guessed
    this.activePhrase = null;
    // Game status so that the keyup event is disregarded after the game ends
    this.status = 'play';
  }

  /**
  * Creates phrases to be used in game
  * @return {array} An array of new Phrase objects that could be used in the game
  */
  createPhrases () {
    return [
      new Phrase('Luck be in the air tonight'),
      new Phrase('Third time is a charm'),
      new Phrase('Rome was not built in a day'),
      new Phrase('Good things come to those who wait'),
      new Phrase('Better Late Than Never'),
      new Phrase('Bad News Travel Fast'),
      new Phrase('A Problem Shared is a Problem Halved'),
      new Phrase('Do not count your chickens before they have hatched'),
      new Phrase('You will catch more flies with honey than with vinegar'),
      new Phrase('The early bird catches the worm'),
      new Phrase('Strike while the iron is hot')
    ];
  }

  /**
  * Selects random phrase from phrases property
  * @return {Object} Phrase object chosen to be used
  */
  getRandomPhrase () {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /**
  * Begins game by selecting a random phrase and displaying it to user
  */
  startGame () {
    this.status = 'play';
    // Resetting the gameboard between games
    // Remove all placeholders
    document.querySelector('#phrase ul').innerHTML = '';

    // Resetting keyboard classes
    const keyboard = document.querySelectorAll('.keyrow .key');
    [...keyboard].forEach(key => {
      key.className = 'key';
      key.disabled = false;
    });

    // Resetting the lives
    const lives = document.querySelectorAll('[src="images/lostHeart.png"]');
    [...lives].forEach(life => life.src = 'images/liveHeart.png');

    // Hide the start screen overlay,
    document.getElementById('overlay').style.display = 'none';

    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  /**
  * Removes a life from the scoreboard
  * Increases the value of the missed property
  * Checks if player has remaining lives and ends game if player is out
  */
  removeLife () {
    // Lose a life
    const life = document.querySelector('[src="images/liveHeart.png"]');
    life.src = 'images/lostHeart.png';

    this.missed++;
    // console.log(`missed: ${this.missed}`);

    // If the player is out of lives, game over
    if (this.missed === 5) {
      game.gameOver();
    }
  }

  /**
  * Checks for winning move
  * @return {boolean} True if game has been won, false if game wasn't won
  */
  checkForWin () {
    // Get NodeList of hidden letters
    const phraseLetters = document.querySelectorAll('#phrase .hide');
    // console.log(`check win: ${phraseLetters.length}`);
    // If there are no hidden letters, the game is won
    return phraseLetters.length === 0;
  }

  /**
  * Displays game over message
  */
  gameOver () {
    const overlay = document.getElementById('overlay');
    overlay.style.display = '';
    const h1 = document.getElementById('game-over-message');
    const gif = document.getElementById('gif');
    this.status = 'stop';

    // If game is won
    if (this.checkForWin()) {
      h1.textContent = 'Game Won!';
      overlay.className = 'win';
      gif.src = 'images/winner.gif';
      gif.style.display = 'inline';
      // If game is lost
    } else {
      h1.textContent = 'Game Lost!';
      overlay.className = 'lose';
      gif.src = 'images/loser.gif';
      gif.style.display = 'inline';
    }
  }

  /**
  * Handles onscreen keyboard button clicks
  * Checks to see if the button clicked by the player matches a letter in the phrase 
  * then directs the game based on a correct or incorrect guess
  * 
  * @param {HTMLButtonElement} button - The clicked button element
  */
  handleInteraction (button) {

    // console.log(this.activePhrase.checkLetter(button.textContent));

    // If button is not disabled and game is not stopped, keep playing
    if (!button.disabled && this.status === 'play') {

      // If the phrase includes the guessed letter
      if (this.activePhrase.checkLetter(button.textContent)) {

        // Add .chosen to the selected button
        button.classList.add('chosen');

        // Display the guessed letter
        this.activePhrase.showMatchedLetter(button.textContent);

        // If game is won, call gameOver
        if (this.checkForWin()) {
          this.gameOver();
        }

        // If the phrase does not include the guessed letter
      } else {

        // Add .wrong to the selected button
        button.classList.add('wrong');

        this.removeLife();
      }

      // Disable the selected letter's onscreen keyboard button
      button.disabled = true;
    }

    // console.log(button);
  }
}
