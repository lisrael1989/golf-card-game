# Golf Card Game - Web Version

This is a browser-based implementation of the Golf Card Game. Two human players take turns drawing and discarding cards. The objective is to have the lowest score by the end of the game, with face-up cards revealed as the game progresses.

## Table of Contents

- [Game Rules](#game-rules)
- [Features](#features)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Scoring](#scoring)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Game Rules

1. **Objective**: The goal of the game is to have the lowest score after all cards in both players' hands are face-up.
2. **Cards**:
   - Each player has 4 cards in their hand, initially face down.
   - Players take turns drawing a card and either replacing one of their face-down cards or discarding the drawn card.
3. **Card Values**:
   - Number cards (2-10): Face value.
   - Ace: 1 point.
   - 7: 0 points.
   - Jack: -1 point.
   - Queen: 12 points.
   - King: 13 points.
4. **End Game**: When all cards in both players' hands are face-up, the game ends and scores are calculated.

## Features

- **Two-Player Game**: This game supports two human players taking turns.
- **Automatic Turn Switching**: After a player takes an action, the turn automatically switches to the other player.
- **Card Replacement and Discard**: Players can choose to replace a face-down card with a drawn card or discard the card.
- **End Game Logic**: The game ends automatically when all cards are face-up, and the player with the lowest score wins.

## Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/golf-card-game.git
   \`\`\`
2. Navigate to the project directory:
   \`\`\`bash
   cd golf-card-game
   \`\`\`
3. Open the \`index.html\` file in your web browser to start the game.

## How to Play

1. Open the game in your browser.
2. Player 1 starts the game.
3. On each player's turn, they can:
   - Draw a card from the deck and either replace one of their face-down cards or discard the drawn card.
4. After performing an action, the turn automatically switches to the other player.
5. The game continues until all cards in both players' hands are face-up.
6. At the end of the game, the scores are calculated, and the player with the lowest score wins.

## Scoring

- **Number Cards (2-10)**: Face value.
- **Ace**: 1 point.
- **7**: 0 points.
- **Jack**: -1 point.
- **Queen**: 12 points.
- **King**: 13 points.
- **Pairs**: A pair of matching cards (other than 7 or Jack) in a player's hand cancels out and scores 0 points.

## Technologies Used

- **HTML5**: Structure of the web page.
- **JavaScript (ES6)**: Game logic and interactions.
- **Git**: Version control.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have suggestions for improvements or new features.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
