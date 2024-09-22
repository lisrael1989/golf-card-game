function createDeck() {
  const suits = ['♥️', '♦️', '♣️', '♠️'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  let deck = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function drawCard(deck) {
  return deck.pop();
}

function addToDiscardPile(discardPile, card) {
  discardPile.push(card);
}

function calculateScore(hand) {
  let score = 0;

  hand.forEach((card) => {
    if (card.value === '7') {
      score += 0;
    } else if (card.value === 'Jack') {
      score -= 1;
    } else if (card.value === 'Queen') {
      score += 12;
    } else if (card.value === 'King') {
      score += 13;
    } else {
      score += parseInt(card.value, 10) || 0;
    }
  });

  return score;
}

function selectRandomPlayer(players) {
  return players[Math.floor(Math.random() * players.length)];
}

module.exports = {
  createDeck,
  shuffleDeck,
  drawCard,
  addToDiscardPile,
  calculateScore,
  selectRandomPlayer,
};
