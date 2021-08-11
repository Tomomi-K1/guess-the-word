//unordered list where the player's guessed letter will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
//The text input where the player will guess a letter
const inputLetter = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display
const remainingGuess = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display
const remainigGuessSpan = document.querySelector("span");
//The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

//starting guess word to test out
const word = "magnolia";

//variable for saving guessed letters
const guessedLetters = [];

// Write a Function to Add Placeholders "•" for Each Letter
const placeHolder = function(word){
    const arrayOfWord = [];
    for(let letter of word){
        console.log(letter);
        arrayOfWord.push("•");
    } 
    wordInProgress.innerText = arrayOfWord.join(""); 
}

placeHolder(word);

//Add an Event Listener for the Button
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const guess = inputLetter.value;
    //console.log(guess);
    inputLetter.value = ""; //clearing the input field
    
    //empty message element
    message.innerHTML = "";
    
    const validatedGuess = validateInput(guess);
    //console.log(validatedGuess);

    makeGuess(validatedGuess);



})

//validate the input information
const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input === ""){
        message.innerText ="Please input a letter.";
    } else if (input.length >=2) {
        message.innerText = "Please enter just one letter.";
    } else if(!input.match(acceptedLetter)){
        message.innerText = "Please enter letters from a-z";
    } else {
        return input;
    }
}

const makeGuess = function(letter){
       const upperCaseLetter = letter.toUpperCase();
    if (guessedLetters.includes(upperCaseLetter)){
        message.innerText = "You already guessed that letter, silly. Try Again.";
    } else {
        guessedLetters.push(upperCaseLetter);
    };
    console.log(guessedLetters);
}