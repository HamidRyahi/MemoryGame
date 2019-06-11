/*
 * Create a list that holds all of your cards
 */
const listOfCards = ["fa fa-android", "fa fa-android", "fa fa-windows", "fa fa-windows", "fa fa-apple", "fa fa-apple", "fa fa-linux", "fa fa-linux", "fa fa-skype", "fa fa-skype", "fa fa-tumblr", "fa fa-tumblr", "fa fa-instagram", "fa fa-instagram", "fa fa-youtube", "fa fa-youtube"];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cardsContainer = document.querySelector('.deck');
function startGame() {
	shuffle(listOfCards);
	for (let oneCard of listOfCards) {
		const card = document.createElement('li');
		card.classList.add('card');
		card.innerHTML = `<i class="${oneCard}"></i>`;
		cardsContainer.appendChild(card);
		click(card);
	}
}
let isFirstClick = true;
let openedCards = [];
let numOfMached = 0;
let moves = 0;
const movesCounter = document.querySelector('.moves');
const starsContainer = document.querySelector('.stars');
function click(card) {
	 // display the card's symbol
	function displayCardSymbol() {
		card.classList.add('open', 'show');
	}
	// add the card to a *list* of "open" cards
	function addToOpenedCards() {
		openedCards.push(card);
	}
	// if the cards do match, lock the cards in the open position
	function match() {
		openedCards.forEach( function(card) {
			card.classList.add('match');
		});
		numOfMached = numOfMached + 2;
		openedCards = [];
	}
	// if the cards do not match, remove the cards from the list and hide the card's symbol
	function hideCardSymbol() {
		setTimeout(function () {
			openedCards.forEach(function(card) {
				card.classList.remove('open', 'show');
				card.removeAttribute("style");
			});
			openedCards = [];
		}, 500);
		openedCards.forEach(function(card) {
			card.setAttribute('style', 'background: #ff5d00');
		});
		openedCards.forEach(function(card) {
			card.setAttribute('style', 'background: #ff5d00');
		});

	}
	// if all cards have matched, this will display a restart button that allows the player to reset the game board, the timer, and the star rating.
	function isAllmatch() {
		if (numOfMached === 16) {
			setTimeout(function () {
				document.querySelector('.modal').style.display = 'block';
				document.querySelector('.ratingScore').innerHTML = starsContainer.innerHTML;
				document.querySelector('.restartN2').innerHTML = restartButton.innerHTML;
				document.querySelector('.restartN2').addEventListener('click', function() {
					reset();
				});
				document.querySelector('.timeScore').innerHTML = timerContainer.innerHTML;
				document.querySelector('.minuteScore').innerHTML = minutesContainer.innerHTML;
			}, 200);
			clearInterval(secondsTimer);
			clearInterval(minutesTimer);
		}
	}
	// increment the move counter and display it on the page
	function addMove() {
		moves++;
		movesCounter.innerHTML = moves;
	}
	 // This will remove one star from the stars rating after some number of moves 
	function rating() {
		starsContainer.firstElementChild;
		const firstStar = starsContainer.firstElementChild;
		if (moves === 14 || moves === 18 || moves === 22 || moves === 26) {
			starsContainer.removeChild(firstStar);
		}
	}
	//set up the event listener for a card. If a card is clicked:
	card.addEventListener('click', function() {
		// This will check if this click is the first one in this game session, if true the startTimer function will fire
		if(isFirstClick) {
  		    startTimer();
  		    isFirstClick = false;
 		}
		displayCardSymbol();
		addToOpenedCards();
		// if the list already has another card, check to see if the two cards match
		if (openedCards.length === 2) {
			if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
				match();
				isAllmatch();
				addMove();
				rating();
			} else {
				hideCardSymbol();
				addMove();
				rating();
			}
		} else if (openedCards.length === 3) {
			openedCards[2].classList.remove('open', 'show');
		}
	});
}


const timerContainer = document.querySelector(".timer");
const minutesContainer = document.querySelector('.minutesContainer')
let totalSeconds = 0;
let totalMinutes = 0;
timerContainer.innerHTML = totalSeconds;

function startTimer() {
	// this timer will add 1 to the totalSeconds cariable evey 1 second
    secondsTimer = setInterval(function() {
        totalSeconds++;
        timerContainer.innerHTML = totalSeconds;
    }, 1000);

    //  this timer will add 1 to the totalMinutes variable every 1 minute
    //  after doing that it will reset the totalSeconds variable to -1 for the timer to be accurate
    minutesTimer = setInterval(function() {
        totalMinutes++;
        minutesContainer.innerHTML = totalMinutes;
        totalSeconds = -1;
    }, 60000);

}


//This will add an event listener to the restart button and fire the reset function if clicked
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function() {
	reset();
});


// This function will reset the cards on the page, empty the opened cards array,
// set the number of matched cards and number of moves made by the player to 0,
// set the moves counter on the page to 0, reset the number of stars to 5,
// stop the timer, reset the first click boolean to true, hide the modal and fire the startGame function.
function reset() {
	cardsContainer.innerHTML = "";
	openedCards = [];
	numOfMached = 0;
	moves = 0;
	movesCounter.innerHTML = moves;
	starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
	<li><i class="fa fa-star"></i></li>
	<li><i class="fa fa-star"></i></li>
	<li><i class="fa fa-star"></i></li>
	<li><i class="fa fa-star"></i></li>`;
	clearInterval(secondsTimer);
	clearInterval(minutesTimer);
	isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds;
    totalMinutes = 0;
    minutesContainer.innerHTML = totalMinutes;
   	document.querySelector('.modal').style.display = 'none';
	startGame();
}


// This will fire the startGame function
startGame();