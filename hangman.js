const maxAttempts = 6;
let attempts = 0;
let chosenWord = "";
let hiddenWordArray = [];
let wrongGuesses = [];

async function fetchRandomWord() {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await response.json();
    return data[0];
}

async function initializeGame() {
    attempts = 0;
    wrongGuesses = [];
    chosenWord = await fetchRandomWord();
    hiddenWordArray = Array(chosenWord.length).fill("_");

    document.getElementById("hiddenWord").textContent = hiddenWordArray.join(" ");
    document.getElementById("wrongGuesses").textContent = "";
    document.getElementById("remainingAttempts").textContent = `Remaining Attempts: ${maxAttempts - attempts}`;
    document.getElementById("message").textContent = "";
    document.getElementById("guessInput").disabled = false;

    const canvas = document.getElementById("hangmanCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function makeGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (guess.length !== 1 || !guess.match(/[a-z]/i)) {
        alert("Please enter a single letter.");
        return;
    }

    if (wrongGuesses.includes(guess) || hiddenWordArray.includes(guess)) {
        document.getElementById("message").textContent = "You have already guessed that letter.";
        return;
    }

    document.getElementById("message").textContent = ""; // Clear message on valid input

    if (chosenWord.includes(guess)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === guess) {
                hiddenWordArray[i] = guess;
            }
        }
    } else {
        wrongGuesses.push(guess);
        attempts++;
        drawHangman(attempts);
    }

    document.getElementById("hiddenWord").textContent = hiddenWordArray.join(" ");
    document.getElementById("wrongGuesses").textContent = `Wrong Guesses: ${wrongGuesses.join(", ")}`;
    document.getElementById("remainingAttempts").textContent = `Remaining Attempts: ${maxAttempts - attempts}`;

    checkGameStatus();
}

function checkGameStatus() {
    if (hiddenWordArray.join("") === chosenWord) {
        document.getElementById("message").textContent = "Congratulations! You won!";
        document.getElementById("guessInput").disabled = true;
        setTimeout(initializeGame, 3000); // Restart the game after 3 seconds
    } else if (attempts >= maxAttempts) {
        document.getElementById("message").textContent = `Game Over! The word was ${chosenWord}.`;
        document.getElementById("guessInput").disabled = true;
        setTimeout(initializeGame, 3000); // Restart the game after 3 seconds
    }
}

function drawHangman(attempt) {
    const canvas = document.getElementById("hangmanCanvas");
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    switch (attempt) {
        case 1:
            // Draw the base
            ctx.beginPath();
            ctx.moveTo(10, 190);
            ctx.lineTo(190, 190);
            ctx.stroke();
            break;
        case 2:
            // Draw the pole
            ctx.beginPath();
            ctx.moveTo(50, 190);
            ctx.lineTo(50, 10);
            ctx.lineTo(130, 10);
            ctx.lineTo(130, 30);
            ctx.stroke();
            break;
        case 3:
            // Draw the head
            ctx.beginPath();
            ctx.arc(130, 50, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 4:
            // Draw the body
            ctx.beginPath();
            ctx.moveTo(130, 70);
            ctx.lineTo(130, 130);
            ctx.stroke();
            break;
        case 5:
            // Draw the arms
            ctx.beginPath();
            ctx.moveTo(130, 90);
            ctx.lineTo(100, 110);
            ctx.moveTo(130, 90);
            ctx.lineTo(160, 110);
            ctx.stroke();
            break;
        case 6:
            // Draw the legs
            ctx.beginPath();
            ctx.moveTo(130, 130);
            ctx.lineTo(110, 160);
            ctx.moveTo(130, 130);
            ctx.lineTo(150, 160);
            ctx.stroke();
            break;
    }
}

// Add event listener for Enter key
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("guessInput").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            makeGuess();
        }
    });
    initializeGame();
});
