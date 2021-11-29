class Phrase {
  constructor (phrase) {
    // String containing the phrase to be guessed, in lowercase
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Displays the phrase. Goes through every letter of the phrase and adds letter placeholder 
   * (li element, including any id or class attributes needed) to the display when the game 
   * starts
   */
  addPhraseToDisplay () {
    // Select the ul element where the li elements with characters will be added
    const phraseUl = document.querySelector('#phrase ul');

    // For every char in phrase, check if char is letter or space and add li element accordingly
    for (let i = 0; i < this.phrase.length; i++) {
      // If char is letter
      if (this.phrase.charAt(i) !== ' ') {
        const liHTML = document.createElement('li');
        liHTML.classList.add('hide', 'letter', this.phrase.charAt(i));
        liHTML.textContent = this.phrase.charAt(i);
        // console.log("It's a letter");
        phraseUl.appendChild(liHTML);

        // If char is space
      } else if (this.phrase.charAt(i) === ' ') {
        const liHTML = document.createElement('li');
        liHTML.classList.add('space');
        liHTML.textContent = ' ';
        // console.log("It's a space");
        phraseUl.appendChild(liHTML);
      }
    }
  }

  /**
  * Checks if passed letter is in phrase
  * @param {string} letter - Letter to check
  */
  checkLetter (letter) {
    return this.phrase.includes(letter);
  }

  /**
  * Displays passed letter on screen after a match is found
  * @param {string} letter - Letter to display
  */
  showMatchedLetter (letter) {
    // Get NodeList with every li element with mathcing letter
    const matchLetter = document.querySelectorAll(`#phrase li.${letter}`);

    // Make the NodeList an array and for every letter remove .hide, add .show
    [...matchLetter].forEach(letter => {
      letter.classList.remove('hide');
      letter.classList.add('show');
    });
  }
}

/*
const phrase = new Phrase('mama are mere')
phrase.addPhraseToDisplay()
phrase.checkLetter('a')
phrase.checkLetter('x')
const txt = 'a'
document.querySelectorAll(`#phrase li.${txt}`)
*/