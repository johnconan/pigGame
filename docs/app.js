let scores, roundScore, activePlayer, gameInit, finishScore;

let score0 = document.getElementById('score-0');
let score1 = document.getElementById('score-1');
let current0 = document.getElementById('current-0');
let current1 = document.getElementById('current-1');
let dice = document.querySelector('.dice');
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

const init = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameInit = true;
  finishScore = 100;
  buttonScore.removeAttribute('disabled');


  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.style.display = 'none';
  playerPanel0.classList.remove('active');
  playerPanel1.classList.remove('active');
  playerPanel0.classList.add('active');
  document.getElementById(`name-0`).textContent = 'Игрок 1';
  document.getElementById(`name-1`).textContent = 'Игрок 2';
  playerPanel0.classList.remove('winner');
  playerPanel1.classList.remove('winner');

}

init();

const activePlayerFunc = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    
    playerPanel0.classList.toggle('active');
    playerPanel1.classList.toggle('active');
    dice.style.display = 'none';
}


document.querySelector('.btn-roll').addEventListener('click', () => {

  buttonScore.setAttribute('disabled', 'disabled');

  if (gameInit) {
    let diceDOM = document.querySelector('.dice');
    let dice = Math.floor(Math.random() * 6) + 1;

    diceDOM.style.display = 'block';
    
    diceDOM.src = `dice-${dice}.png`;
  
    if (dice !== 1) {
      roundScore += dice;
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
  
    if (scores[activePlayer] >= finishScore) {
      document.getElementById(`name-${activePlayer}`).textContent = 'ПОБЕДА!';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      dice.style.display = 'none';
      gameInit = false;

    } else {
      activePlayerFunc();
    }
  }

})

document.querySelector('.btn-new').addEventListener('click', init);




