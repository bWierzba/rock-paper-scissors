// zmienne

const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playersPick: "",
    aisPick: '',
}

const hands = [...document.querySelectorAll('.select img')]

// funkcje 

function handSelection() {
    game.playersPick = this.dataset.option
    hands.forEach(hand => hand.classList.remove('selected'))
    this.classList.add('selected')
}

function computersPick() {
    return hands[Math.floor(Math.random() * 3)].dataset.option
}

function checkResult(player, ai) {
    if (player === ai) {
        return 'draw';
    }
    else if ((player === 'paper' && ai === 'rock') || (player === 'rock' && ai === 'scissors') || (player === 'scissors' && ai === 'paper')) {
        return 'win';
    }
    else {
        return 'loss';
    }
}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-pick"]').textContent = player;
    document.querySelector('[data-summary="ai-pick"]').textContent = ai;
    document.querySelector('.games span').textContent = ++gameSummary.numbers

    if (result === 'win') {
        document.querySelector('.wins span').textContent = ++gameSummary.wins
        document.querySelector('[data-summary="who-won"]').textContent = 'PLAYER'
    }
    if (result === 'loss') {
        document.querySelector('.lost span').textContent = ++gameSummary.losses
        document.querySelector('[data-summary="who-won"]').textContent = 'COMPUTER'
    }
    if (result === 'draw') {
        document.querySelector('.ties span').textContent = ++gameSummary.draws
        document.querySelector('h2').textContent = 'DRAW'
    }
}

function endGame() {
    document.querySelector(`[data-option="${game.playersPick}"]`).classList.remove('selected')
    game.playersPick = ''
}

function play() {
    if (!game.playersPick) {
        return alert('choose!');
    }
    game.aisPick = computersPick();
    const gameResult = checkResult(game.playersPick, game.aisPick);
    publishResult(game.playersPick, game.aisPick, gameResult);
    endGame();
}

//eventListners

hands.forEach(hand => hand.addEventListener('click', handSelection))
document.querySelector('.start').addEventListener('click', play)

