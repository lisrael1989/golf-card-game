const {
  createDeck,
  shuffleDeck,
  drawCard,
  addToDiscardPile,
  selectRandomPlayer,
  calculateScore,
} = require('./utils.js');
const readline = require('readline');

startGame();

function printBoard(players, discardPile) {
  console.log('--- Game Board ---');
  players.forEach((player) => {
    console.log(
      `${player.name}'s hand: `,
      player.hand.map((card, index) => `${card.faceUp ? `${card.value} of ${card.suit}` : '🃏'}`)
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

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function playTurn() {
    printBoard(players, discardPile);
    console.log(`${currentPlayer.name}'s turn`);
    rl.question('Choose action: (1) Draw card from deck, (2) Take card from discard pile\n', (input) => {
      if (input === '1') {
        let drawnCard = drawCard(deck);
        console.log(`You drew: ${drawnCard.value} of ${drawnCard.suit}`);
        rl.question('Choose: (1) Replace one face-down card, (2) Discard drawn card\n', (choice) => {
          if (choice === '1') {
            replaceCard(currentPlayer, drawnCard);
          } else {
            addToDiscardPile(discardPile, drawnCard);
            endTurn();
          }
        });
      } else if (input === '2') {
        let topDiscard = discardPile.pop();
        console.log(`You took: ${topDiscard.value} of ${topDiscard.suit}`);
        replaceCard(currentPlayer, topDiscard);
      } else {
        console.log('invalid choice,try again');
        playTurn();
      }
    });
  }

  function replaceCard(player, newCard) {
    rl.question('Choose a card to replace (1-4):\n', (input) => {
      let index = parseInt(input) - 1;
      if (index >= 0 && index < 4) {
        let replacedCard = player.hand[index];
        if (!replacedCard.faceUp) {
          player.hand[index] = { ...newCard, faceUp: true };
          addToDiscardPile(discardPile, replacedCard);
          endTurn();
        } else {
          console.log('This card is already face up,try again');
          replaceCard(player, newCard);
        }
      } else {
        console.log('invalid choice,try again');
        replaceCard(player, newCard);
      }
    });
  }

  function endTurn() {
    if (players.some((player) => player.hand.every((card) => card.faceUp === true))) {
      endGame();
    } else {
      currentPlayer = currentPlayer.name === 'player1' ? players[1] : players[0];
      playTurn();
    }
  }

  function endGame() {
    console.log('--- Final board ---');
    printBoard(players, discardPile);

    players.forEach((player) => {
      let score = calculateScore(player.hand);
      console.log(`${player.name}'s score: ${score}`);
    });

    let winner = players[0].score > players[1].score ? players[0] : players[1];
    console.log(`Winner: ${winner.name}`);

    rl.question('Play again? (y/n)\n', (input) => {
      if (input.toLowerCase() === 'y') {
        startGame();
      } else {
        rl.close();
      }
    });
  }
  playTurn();
}
