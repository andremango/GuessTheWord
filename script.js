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
  wrongCharactersLabel = document.querySelector(".wrong-characters-label"),
  resetBtn = document.querySelector(".reset-btn");

var wrongCharacters = [];

function startGame() {
  // Retrieve random word from wordList
  var randomObj = getRandomWord(),
    hint = randomObj ? randomObj.hint : null,
    word = randomObj ? randomObj.word : null;

  initFields(hint);

  wrongCharacters = [];

  for (let i = 0; i < word.length; i++) {
    // Create input element
    let input = document.createElement("input");
    // Set CSS
    input.setAttribute("class", ".inputs input");

    input.disabled = true;
    input.value = word.charAt(i).toLocaleLowerCase();

    // Hide character
    input.style.color = "transparent";

    inputs.append(input);
  }

  // Key events
  document.addEventListener(
    "keydown",
    (event) => {
      var key = event.key;

      // ! Allow to digit only characters and numbers
      if (!isKeyValid(key)) {
        alert("Please, digit a valid character or number!");
        return;
      }

      // ? Check if word contains key pressed
      if (word.toLocaleLowerCase().includes(key)) {
        // Case when word contains key:
        // # Show character
        (inputs.childNodes || []).forEach((input) => {
          if (input.value === key) {
            input.style.color = "#57a6a8";
          }
        });
      } else {
        // Case when word not contains key:
        // # Add character to wrongCharactersLabel
        if (!wrongCharacters.includes(key)) {
          wrongCharacters.push(key);
          wrongCharactersLabel.innerHTML =
            "Wrong characters: " +
            "<b>" +
            wrongCharacters.join(", ").toLocaleUpperCase() +
            "</b>";
        }
        // TODO Decrement remaining guesses
      }
    },
    false
  );
}

startGame();

// Start game on reset button click
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    startGame();
  });
}

function isKeyValid(key) {
  if (key.toLowerCase().length !== 1) {
    return false;
  }

  const isLetter = key >= "a" && key <= "z";
  const isNumber = key >= "0" && key <= "9";

  if (isLetter || isNumber) {
    return true;
  }

  return false;
}

function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function initFields(hint) {
  if (inputs) {
    inputs.innerHTML = "";
  }
  if (hintLabel) {
    hintLabel.innerHTML = "Hint: " + "<b>" + hint + "</b>";
  }
  if (wrongCharactersLabel) {
    wrongCharactersLabel.innerHTML = "Wrong characters: ";
  }
}
