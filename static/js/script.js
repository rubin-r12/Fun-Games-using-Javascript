// Challenge1- Age In Days
function ageInDays(){
    var birthYear = prompt('Which year were you born?');
    var noofdays = (2020 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ noofdays + ' days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1); 
}
function reset(){
    document.getElementById("ageInDays").remove();
}

// Challenge2: Cat Generator
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// Challenge3: Rock, Paper, Scissors
function rpsGame(yourChoice){
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt(3));
    console.log('Computer Choice: ',botChoice);
    results = decideWinner(humanChoice, botChoice);
    console.log(results);
    message = finalMessage(results);
    rpsFrontEnd(yourChoice.id, botChoice, message)
}

function randToRpsInt(num){
    return Math.floor(Math.random() * num);
}

function numberToChoice(number){
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper':1, 'scissors':0.5, 'rock':0}
    };
    
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    
    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0) {
        return {'message': 'You Lost!', 'color':'red'};
    } else if (yourScore === 0.5){
        return {'message': 'You Tied!', 'color':'yellow'};
    } else {
        return {'message': 'You Won!', 'color':'green'};
    }
}


function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    // Removing all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 weight=150 style='box-shadow: -2px 22px 36px -3px rgba(46,54,194,1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px padding: 30px'>" + finalMessage['message'] + "</h1>" 
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 weight=150 style='box-shadow: 0px 9px 26px 4px rgba(237,31,17,1);'>"

    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
} 

// Challenge 4: Change the color of all buttons
var all_buttons = document.getElementsByTagName('button');


var copyAllButtons = [];
for (let i=0; i< all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}


function buttonColorChange(buttonThingy) {
    if (buttonThingy.value == 'red') {
        buttonsRed();
    } else if (buttonThingy.value == 'green') {
        buttonsGreen();
    } else if (buttonThingy.value == 'reset') {
        buttonColorReset();
    } else if (buttonThingy.value == 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for(let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-danger");
    }
}

function buttonsGreen() {
    for(let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-success");
    }
}

function buttonColorReset() {
    for(let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    for(let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[randToRpsInt(7)]);
    }
}

//Challenge 5: BlackJack
let blackjackGame = {
    'you': {'scoreSpan': "#your-blackjack-result", 'div': '#your-box','score': 0},
    'dealer': {'scoreSpan': "dealer-blackjack-result", 'div': '#dealer-box','score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    let card = randomCard();
    console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    console.log(YOU['score']);
}

function showCard(card, activePlayer) {
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    cardImage.style.height = '100px';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackjackDeal() {
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for (i=0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }
    for (i=0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer) {
    //if adding 11 keeps me below 21, add 11. Otherwise, add 1
    if(card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];        
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    document.querySelector(activePlayer['scoreSpan']).innerHTML = activePlayer['score'];
}