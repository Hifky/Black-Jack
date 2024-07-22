let deck = [];
let playerHand = [];
let dealerHand = [];
let gameOver = false;

function createDeck() {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({suit, value});
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCard(hand) {
    const card = deck.pop();
    hand.push(card);
    return card;
}

function getHandValue(hand) {
    let value = 0;
    let aces = 0;
    for (let card of hand) {
        if (card.value === 'A') {
            aces++;
            value += 11;
        } else if (['K', 'Q', 'J'].includes(card.value)) {
            value += 10;
        } else {
            value += parseInt(card.value);
        }
    }
    while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
    }
    return value;
}

function renderHand(hand, elementId) {
    const handElement = document.getElementById(elementId);
    handElement.innerHTML = '';
    for (let card of hand) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerText = `${card.value}${card.suit}`;
        handElement.appendChild(cardElement);
    }
}

function checkForEndOfGame() {
    const playerValue = getHandValue(playerHand);
    const dealerValue = getHandValue(dealerHand);
    
    if (playerValue > 21) {
        alert('プレイヤーはバーストしました！ディーラーの勝ちです。');
        gameOver = true;
    } else if (dealerValue > 21) {
        alert('ディーラーはバーストしました！プレイヤーの勝ちです。');
        gameOver = true;
    } else if (dealerValue >= 17) {
        if (playerValue > dealerValue) {
            alert('プレイヤーの勝ちです！');
        } else if (playerValue < dealerValue) {
            alert('ディーラーの勝ちです！');
        } else {
            alert('引き分けです！');
        }
        gameOver = true;
    }
}

document.getElementById('hit-button').addEventListener('click', function() {
    if (gameOver) return;
    dealCard(playerHand);
    renderHand(playerHand, 'player-hand');
    checkForEndOfGame();
});

document.getElementById('stand-button').addEventListener('click', function() {
    if (gameOver) return;
    while (getHandValue(dealerHand) < 17) {
        dealCard(dealerHand);
    }
    renderHand(dealerHand, 'dealer-hand');
    checkForEndOfGame();
});

document.getElementById('restart-button').addEventListener('click', function() {
    deck = [];
    playerHand = [];
    dealerHand = [];
    gameOver = false;
    createDeck();
    shuffleDeck();
    dealCard(playerHand);
    dealCard(playerHand);
    dealCard(dealerHand);
    renderHand(playerHand, 'player-hand');
    renderHand(dealerHand, 'dealer-hand');
});

createDeck();
shuffleDeck();
dealCard(playerHand);
dealCard(playerHand);
dealCard(dealerHand);
renderHand(playerHand, 'player-hand');
renderHand(dealerHand, 'dealer-hand');
