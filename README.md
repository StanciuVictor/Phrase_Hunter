# Phrase_Hunter

Object Oriented JavaScript Game

## Phrase class

### Constructor

- **phrase** - This is the actual phrase the Phrase object is representing. This property is set to the phrase parameter, but converted to all lower case.

### Methods

- **addPhraseToDisplay()** - Adds letter placeholders to the display when the game starts. Each letter is presented by an empty box, one li element for each letter. When the player correctly guesses a letter, the empty box is replaced with the matched letter (see the _showMatchedLetter()_ method below).

- **checkLetter()** - Checks to see if the letter selected by the player matches a letter in the phrase.

- **showMatchedLetter()** - Reveals the letter(s) on the board that matches the player's selection.

## Game class

### Constructor

- **missed** - Used to track the number of missed guesses by the player. The initial value is 0, since no guesses have been made at the start of the game.
- **phrases** - An array of Phrase objects to use with the game. A phrase only includes letters and spaces - no numbers, punctuation or other special characters.
- **activePhrase** - This is the Phrase object that's currently in play. The initial value is null. Within the _startGame()_ method, this property is set to the Phrase object returned from a call to the _getRandomPhrase()_ method.

### Methods

- **startGame()** - Hides the start screen overlay, calls the _getRandomPhrase()_ method, and sets the _activePhrase_ property with the chosen phrase. It also adds that phrase to the board by calling the _addPhraseToDisplay()_ method on the _activePhrase_ property.
- **getRandomPhrase()** - Randomly retrieves one of the phrases stored in the phrases array and returns it.
- **handleInteraction()** - Controls most of the game logic. It checks to see if the button clicked by the player matches a letter in the phrase, and then directs the game based on a correct or incorrect guess. This method:
  - Disables the selected letter's onscreen keyboard button;
  - If the phrase does not include the guessed letter, calls the _removeLife()_ method.
  - If the phrase includes the guessed letter, calls the _showMatchedLetter()_ method on the phrase, then calls the _checkForWin()_ method. If the player has won the game, also calls the _gameOver()_ method.
- **removeLife()** - Removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image (found in the images folder) and increments the missed property. If the player has five missed guesses (i.e they're out of lives), then ends the game by calling the _gameOver()_ method.
- **checkForWin()** - Checks to see if the player has revealed all of the letters in the active phrase.
- **gameOver()** - Displays the original start screen overlay, and depending on the outcome of the game, updates the overlay with a friendly win or loss message and a gif.

## Style Changes

### CSS

- Added background color to the .main-container;
- Added styling for the gif file displayed at the end of the game;
- Modified border and background color of the buttons with class .key;
- Modified background color of pressed keys (dark blue - correct, light blue - incorrect)
- Added font-weight to guessed letters;
- Modified color of placeholders.

### Others

- Modified Game.js so that it displays the gif at the end of the game;
- Added the <img> tag in the index.html for the gif.
