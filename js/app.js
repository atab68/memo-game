

const cards = document.querySelectorAll('.card');

//Clear Deck function

function clearDeck() {
    cards.length= 0;
}
//Store Cards
let hasFlippedCard = false;
let lockBoard = false;
let matchedCards = [];
let firstCard, secondCard;

let time_results = document.getElementById('time_results');
let moves_results = document.getElementById('moves_results');
let modal_reset_btn = document.querySelector('.button-yes');



/*=================
Declare flipCard()
=================*/

function flipCard() {
    //Start time when card was clicked
    if(initialClick === false) {
        initialClick = true;
        setTimer();
    }

    if(lockBoard) return;
    if(this === firstCard) return;
   
    this.classList.add('open', 'show');

    if(!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
   }
    //second click
   
    secondCard = this;
    checkForMatch();
     isOver();
}

function checkForMatch() {
    let isMatch = firstCard.innerHTML === secondCard.innerHTML;
    //do cards match?
    if(isMatch){
        firstCard.classList.add('match');
        secondCard.classList.add('match');
        matchedCards.push(firstCard, secondCard);
        
        disableCards();
        return;
    } 
        unflipCards(); 
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('open', 'show');
        secondCard.classList.remove('open', 'show');

        resetBoard();
    }, 1500)
}

/*====================
*Rating
======================*/
const starsContainer = document.querySelector(".stars");

starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
function rating(){
  switch(moves) {
    case 35:
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    break;
    case 40:
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
      break;
  }
}

/*==================
  *Add moves
  ===================*/
  const movesContainer = document.querySelector(".moves")
  let moves = 0;
  movesContainer.innerHTML = 0;
 function addMove(){
    moves++;
    movesContainer.innerHTML = moves; 
    //Set the rating 
    rating();
  }

  /*===============
  Start and Stop Timer function
  =================*/
  let initialClick = false;
  let timerScore = document.getElementById('time');
  var time = 0;
  var timer;

  function setTimer() {
    timer = setInterval(function() {
        time++;
        timerScore.textContent = time;
    }, 1000);
  }


function clearTimer() {
    clearInterval(timer)
};



/*================
The firsCard and secondCard need to be reset after each round,
creating resetBoard function
===================*/
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard, ] = [null, null,];
};

/*=====================
Reset the game
=======================*/
const restartBtn = document.querySelector(".restart");

restartBtn.addEventListener('click', reloadGame);
modal_reset_btn.addEventListener('click', reloadGame);

/*=============
Reload the page
==============*/

function reloadGame() {
    location.reload();
}
/*==============
isOver
=============*/
let isGameOver = false;
function isOver() {
    let all = true;
    $('.card').each(function() {
        return all = $(this).hasClass('match');
    })
    if(all) {
        document.querySelector('.bg-modal').style.display = 'flex';
        moves_results.innerText = moves;
        time_results.innerText = time;
        isGameOver =true;
        clearTimer();
    }
}

document.querySelector('.close-btn').addEventListener('click', function() {
    document.querySelector('.bg-modal').style.display = 'none';
})

/*======================
Sets the info in the modal
======================*/
function gameOver() {
    isOver();
    clearTimer();
}
//Attach click event every card
cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', addMove));


(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();


