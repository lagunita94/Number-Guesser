const game = document.querySelector('.game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// give min and max values and winning value
let min = 1,
max = 10,
winningNum = getRandom(min, max),
guessesLeft = 3;
//assign min and max values
minNum.textContent = min;
maxNum.textContent = max;
// play again event
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})
//listen for submit
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    //validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`please enter a number between ${min} and ${max}`, 'red');    
    } 
    //check if won
    if(guess === winningNum){
        gameOver(true, `${winningNum} is correct!! YOU WIN`);
    } else {
        // reduce guesses
        guessesLeft-=1;
        if(guessesLeft === 0){
            
            gameOver(false, `Game Over, You Lost!!! The Correct answer was ${winningNum}`);
        } else {
            //clear input
            guessInput.value = '';
            // answer wrong game continues
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            //change border color
            guessInput.style.borderColor = 'red';
        }
    }
})
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    //change border color
    guessInput.style.borderColor = color;
    //input disabled
    guessInput.disabled = true;
    //set message
    setMessage(msg, color)
    //play again
    guessBtn.value = "play again";
    //add class
    guessBtn.className+= "play-again";
}
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
// get random number
function getRandom(min, max){
     return Math.floor(Math.random()*(max-min + 1) + min);
}
