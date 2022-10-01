// Words
const wordList = [
  {
    word: "HTML",
    hint: "Markup language",
  },
  {
    word: "Rome",
    hint: "Italian capital",
  },
  {
    word: "Messi",
    hint: "Best football player in the world",
  },
  {
    word: "Foo Fighters",
    hint: "Famous rock band",
  },
  {
    word: "Football",
    hint: "Famous sport",
  },
];

// Get elements
const inputs = document.querySelector(".inputs"),
  hintLabel = document.querySelector(".hint-label"),
  remainingGuessesLabel = document.querySelector(".remaining-guesses-label"),
  resetBtn = document.querySelector(".reset-btn");

function startGame() {
  // Retrieve random word from wordList
  let randomObj = getRandomWord(),
    hint = randomObj ? randomObj.hint : null,
    word = randomObj ? randomObj.word : null;

  if (randomObj) {
    if (hintLabel) {
      hintLabel.innerHTML = "Hint: " + "<b>" + hint + "</b>";
    }

    if (inputs) {
      // ! Clean child's
      inputs.innerHTML = "";

      for (let i = 0; i < word.length; i++) {
        // Create input element
        let input = document.createElement("input");
        // Set CSS
        input.setAttribute("class", ".inputs input");

        input.disabled = true;
        input.value = word.charAt(i);

        inputs.append(input);
      }
    }
  }
}

startGame();

// Start game on reset button click
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    startGame();
  });
}

function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
