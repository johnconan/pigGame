const audio = new Audio();

let scores, roundScore, activePlayer, gameInit, finishScore;

let score0 = document.getElementById('score-0');
let score1 = document.getElementById('score-1');
let current0 = document.getElementById('current-0');
let current1 = document.getElementById('current-1');
let playerPanel0 = document.querySelector(`.player-0-panel`);
let playerPanel1 = document.querySelector(`.player-1-panel`);

let finishScoreValue = document.querySelector('.finish-score');
let buttonScore = document.querySelector('.button-score');

buttonScore.addEventListener('click', (event) => {
  if (finishScoreValue.value === '') {
    event.preventDefault();
    finishScoreValue.classList.add('border-error');
    finishScoreValue.style.padding = '9px';
    alert('Счет не должен быть пустым! По умолчанию играем до 100');
  } else {
    finishScore = finishScoreValue.value;
    finishScoreValue.value = '';
  }
})

finishScoreValue.addEventListener('input', () => {
  finishScoreValue.classList.remove('border-error');  
})

const bgSoundInit = () => {
  audio.src = 'music/for-background.mp3';
  audio.volume = 0.05;
  audio.autoplay = true;
  audio.muted = false;
}

const init = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameInit = true;
  finishScore = 100;
  buttonScore.removeAttribute('disabled');

  bgSoundInit();

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';
  playerPanel0.classList.remove('active');
  playerPanel1.classList.remove('active');
  playerPanel0.classList.add('active');
  document.getElementById(`name-0`).textContent = 'Игрок 1';
  document.getElementById(`name-1`).textContent = 'Игрок 2';
  playerPanel0.classList.remove('winner');
  playerPanel1.classList.remove('winner');

}

init();

const audioWinner = () => {
  audio.src = 'music/winner.mp3';
  audio.volume = 0.2;
  audio.autoplay = true;
}

const audioHold = () => {
  const audio = new Audio();
  audio.src = 'music/hold.wav';
  audio.volume = 0.3;
  audio.play();
}

const noSoundBackground = () => {
  audio.muted = true;
  document.querySelector('.no-sound').style.display = 'none';
  document.querySelector('.yes-sound').style.display = 'block';
}

const yesSoundBackground = () => {
  audio.muted = false;
  document.querySelector('.no-sound').style.display = 'block';
  document.querySelector('.yes-sound').style.display = 'none';
}

document.querySelector('.yes-sound').addEventListener('click', yesSoundBackground);

document.querySelector('.no-sound').addEventListener('click', noSoundBackground);


const activePlayerFunc = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    
    playerPanel0.classList.toggle('active');
    playerPanel1.classList.toggle('active');

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}


document.querySelector('.btn-roll').addEventListener('click', () => {

  buttonScore.setAttribute('disabled', 'disabled');

  if (gameInit) {
    let diceDOM1 = document.querySelector('#dice-1');
    let diceDOM2 = document.querySelector('#dice-2');

    let randomDice1 = Math.floor(Math.random() * 6) + 1;
    let randomDice2 = Math.floor(Math.random() * 6) + 1;

    diceDOM1.style.display = 'block';
    diceDOM2.style.display = 'block';

    const audio = new Audio();
    audio.src = 'music/broke-dice.mp3';
    audio.volume = 0.3;
    audio.play();
    
    diceDOM1.src = `img/dice-${randomDice1}.png`;
    diceDOM2.src = `img/dice-${randomDice2}.png`;
  
    if (randomDice1 !== 1 && randomDice2 !== 1) {
      roundScore += randomDice1 + randomDice2;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
      activePlayerFunc();
    }
  }

})


document.querySelector('.btn-hold').addEventListener('click', () => {

  buttonScore.setAttribute('disabled', 'disabled');

  if (gameInit) {
    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    audioHold();
    if (scores[activePlayer] >= finishScore) {
      document.getElementById(`name-${activePlayer}`).textContent = 'ПОБЕДА!';
      audioWinner();
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      document.querySelector('#dice-1').style.display = 'none';
      document.querySelector('#dice-2').style.display = 'none';
      gameInit = false;
    } else {
      activePlayerFunc();
    }
  }

})

document.querySelector('.btn-new').addEventListener('click', init);




