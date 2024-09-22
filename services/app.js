const {
  createDeck,
  shuffleDeck,
  drawCard,
  addToDiscardPile,
  selectRandomPlayer,
  calculateScore,
} = require('./utils.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

startGame();

function printBoard(players, discardPile) {
  console.log('--- Game Board ---');
  players.forEach((player) => {
    console.log(
      `${player.name}'s hand: `,
      player.hand.map((card) => (card.faceUp ? `${card.value} of ${card.suit}` : '🃏')).join(', ')
    );
  });
  console.log(
    'Discard Pile top card:',
    discardPile.length
      ? `${discardPile[discardPile.length - 1].value} of ${discardPile[discardPile.length - 1].suit}`
      : 'Empty'
  );
}

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

  playTurn(players, discardPile, deck, currentPlayer);
}

function playTurn(players, discardPile, deck, currentPlayer) {
  printBoard(players, discardPile);
  console.log(`${currentPlayer.name}'s turn`);

  rl.question('Choose action: (1) Draw card from deck, (2) Take card from discard pile\n', (input) => {
    if (input === '1') {
      let drawnCard = drawCard(deck);
      console.log(`You drew: ${drawnCard.value} of ${drawnCard.suit}`);

      rl.question('Choose: (1) Replace one face-down card, (2) Discard drawn card\n', (choice) => {
        if (choice === '1') {
          replaceCard(currentPlayer, drawnCard, discardPile, players, deck);
        } else {
          addToDiscardPile(discardPile, drawnCard);
          endTurn(players, discardPile, deck, currentPlayer);
        }
      });
    } else if (input === '2') {
      let topDiscard = discardPile.pop();
      console.log(`You took: ${topDiscard.value} of ${topDiscard.suit}`);
      replaceCard(currentPlayer, topDiscard, discardPile, players, deck);
    } else {
      console.log('invalid choice,try again');
      playTurn(players, discardPile, deck, currentPlayer);
    }
  });
}

function replaceCard(player, newCard, discardPile, players, deck) {
  rl.question('Choose a card to replace (1-4):\n', (input) => {
    let index = parseInt(input) - 1;
    if (index >= 0 && index < 4) {
      let replacedCard = player.hand[index];
      if (!replacedCard.faceUp) {
        player.hand[index] = { ...newCard, faceUp: true };
        addToDiscardPile(discardPile, replacedCard);
        endTurn(players, discardPile, deck, player);
      } else {
        console.log('This card is already face up,try again');
        replaceCard(player, newCard, discardPile, players, deck);
      }
    } else {
      console.log('invalid choice,try again');
      replaceCard(player, newCard, discardPile, players, deck);
    }
  });
}

function endTurn(players, discardPile, deck, currentPlayer) {
  if (players.every((player) => player.hand.every((card) => card.faceUp === true))) {
    endGame(players, discardPile);
  } else {
    currentPlayer = currentPlayer.name === 'player1' ? players[1] : players[0];
    playTurn(players, discardPile, deck, currentPlayer);
  }
}

function endGame(players, discardPile) {
  console.log('--- Final board ---');
  printBoard(players, discardPile);

  players.forEach((player) => {
    let score = calculateScore(player.hand);
    player.score = score;
    console.log(`${player.name}'s score: ${score}`);
  });

  let winner = players[0].score < players[1].score ? players[0] : players[1];
  console.log(`Winner 🥇: ${winner.name}`);

  rl.question('Play again? (y/n)\n', (input) => {
    if (input.toLowerCase() === 'y') {
      console.log('--- New game ---');

      startGame();
    } else {
      console.log('Thank you for playing!');

      rl.close();
    }
  });
}
