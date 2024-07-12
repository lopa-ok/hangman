const words = ["arcade", "hangman", "coding", "developer"];
const maxAttempts = 6;
let attempts = 0;
let chosenWord = words[Math.floor(Math.random() * words.length)];
let hiddenWordArray = Array(chosenWord.length).fill("_");
let wrongGuesses = [];

document.getElementById("hiddenWord").textContent = hiddenWordArray.join(" ");
document.getElementById("remainingAttempts").textContent = `Remaining Attempts: ${maxAttempts - attempts}`;

function makeGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (guess.length !== 1 || !guess.match(/[a-z]/i)) {
        alert("Please enter a single letter.");
        return;
    }

    if (wrongGuesses.includes(guess) || hiddenWordArray.includes(guess)) {
        alert("You have already guessed that letter.");
        return;
    }

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
    } else if (attempts >= maxAttempts) {
        document.getElementById("message").textContent = `Game Over! The word was ${chosenWord}.`;
        document.getElementById("guessInput").disabled = true;
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
