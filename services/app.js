const { createDeck, shuffleDeck, drawCard, addToDiscardPile, selectRandomPlayer } = require('./utils.js');
const readline = require('readline');

startGame();

function printBoard(players, discardPile) {
  console.log('--- Game Board ---');
  players.forEach((player) => {
    console.log(
      `${player.name}'s hand: `,
      player.hand.map((card) => (card.faceUp ? `${card.value} of ${card.suit}` : '🃏'))
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
    rl.question('Choose a card to replace (1-4):\n', (index) => {
      let replacedCard = player.hand[index];
      if (!replacedCard.faceUp) {
        player.hand[index] = { ...newCard, faceUp: true };
        addToDiscardPile(discardPile, replacedCard);
        endTurn();
      } else {
        console.log('This card is already face up,try again');
        replaceCard(player, newCard);
      }
    });
  }

  function endTurn() {
    currentPlayer = currentPlayer.name === 'player1' ? players[1] : players[0];
    playTurn();
  }
  playTurn();
}
1;
