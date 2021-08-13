//unordered list where the player's guessed letter will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
//The text input where the player will guess a letter
const inputLetter = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display
const remainingGuessElement = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display
const remainigGuessSpan = document.querySelector("span");
//The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

//starting guess word to test out-use let since word would change
let word = "magnolia";
//variable for saving guessed letters-use let since array will change leter
let guessedLetters = [];
//create global variable for number of guesses player can make-use let since remaining number changes
let remainingGuesses = 8;

//getting a random word from text file
const getWord = async function(){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")
    const words = await res.text();
    //console.log(words);
    const wordArray = words.split("\n")
    //console.log(wordArray);

    //grab random index
    const randomIndex = Math.floor(Math.random() * wordArray.length-1);
    //console.log(randomIndex);

    //use randomIndex to grab random word
    const randomWord = wordArray[randomIndex].trim();
    console.log(randomWord);
    word = randomWord;
    placeHolder(word);
}   

//fire off the game
getWord();

// Write a Function to Add Placeholders "•" for Each Letter
const placeHolder = function(word){
    const arrayOfWord = [];
    for(let letter of word){
        //console.log(letter);
        arrayOfWord.push("•");
    } 
    wordInProgress.innerText = arrayOfWord.join(""); 
};



//Add an Event Listener for the Button
guessButton.addEventListener("click", function(e){
    e.preventDefault();

    //empty message element
    message.innerText = "";
    //grab input value
    const guess = inputLetter.value;
   
    //make sure that it is a single letter
    const validatedGuess = validateInput(guess);
    //console.log(validatedGuess);
    
    /*makeGuess runs only when validateGuess returns single letter
    if other than single letter is entered, if statetment will be false
    so makeGuess function will not run*/ 
    if (validatedGuess){
        //console.log(validatedGuess)
        makeGuess(validatedGuess);
    }
    inputLetter.value = ""; //clearing the input field
})

//validate the input information
const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0 ){
        message.innerText ="Please input a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter just one letter.";
    } else if(!input.match(acceptedLetter)){
        message.innerText = "Please enter letters from a-z";
    } else {
        return input;
    }
}

// function to check if same letter is entered twice
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
      message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
      guessedLetters.push(guess);
      console.log(guessedLetters);
      countGuessesRemaining(guess);
      updateGuessedLetters(guessedLetters);   
      updateWordInProgress(guessedLetters);
    }
  };

//create a function to show the guessed letters
const updateGuessedLetters = function(array){
    guessedLettersElement.innerHTML = "";
    for(let letter of array){
        const li = document.createElement("li")
        li.innerText = letter;
       guessedLettersElement.append(li);
    }
};

//create a function to update the word in progress
const updateWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    //console.log(wordUpper);
    //create variable to split the word string into an array
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    
    //variable for saving word in progress letters
    const wordInProgressLetters = [];

    //check if wordArray contains letters from the guessedLetters
    for(let letter of wordArray) {
        if (guessedLetters.includes(letter)){
            wordInProgressLetters.push(letter);
        } else {
            wordInProgressLetters.push("•");
        }
    }
    wordInProgress.innerText = wordInProgressLetters.join("");
    checkWin(wordInProgressLetters);
}

//create a function to count Guesses remaining
const countGuessesRemaining = function(guess){
     const wordUpper = word.toUpperCase();

         if (!wordUpper.includes(guess)){
             message.innerText = `Sorry, the word has no ${guess}.`;
             remainingGuesses -=1;
             //console.log(remainingGuesses);
            } else {
                message.innerText = `Good guess! The word has the letter ${guess}.`;
            }

    if(remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainigGuessSpan.innerText = `${remainingGuesses} guess`;
    } else if (remainingGuesses >1){
        remainigGuessSpan.innerText = `${remainingGuesses} guess`;
    };
}


//create a function to check if the player won
const checkWin = function(array){
    if (array.join("") === word.toUpperCase()){
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
        message.classList.add("win");
        startOver();
    }
};

//hide or appear some elements after player lose the game
const startOver = function(){
    guessButton.classList.add("hide");
    remainingGuessElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
}

//play again button click event
playAgainButton.addEventListener("click", function(){
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML ="";
    remainingGuesses = 8;
    guessedLetters = [];
    remainigGuessSpan.innerText = `${remainingGuesses} guess`;
    guessButton.classList.remove("hide");
    remainingGuessElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    guessedLettersElement.classList.remove("hide");
    getWord();
});

