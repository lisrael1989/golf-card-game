const { createDeck, shuffleDeck, drawCard, addToDiscardPile, selectRandomPlayer, printBoard } = require('./utils.js');

function startGame() {
  let deck = shuffleDeck(createDeck());
  let discardPile = [];
  let players = [
    { name: 'player1', hand: [] },
    { name: 'player2', hand: [] },
  ];

  players.forEach((player) => {
    for (let i = 0; i < 4; i++) {
      player.hand.push({ ...drawCard(deck), faceUp: false });
    }
  });

  addToDiscardPile(discardPile, drawCard(deck));

  let currentPlayer = selectRandomPlayer(players);

  console.log('Game started!');
  console.log(`${currentPlayer.name} starts the game.`);

  printBoard(players, discardPile);
}

startGame();

console.log('app.js loaded');
