const cardDiv = document.getElementById("card");
const startBtn = document.getElementById("startBtn");

const answerArea = document.getElementById("answerArea");
const countInput = document.getElementById("countInput");

const submitBtn = document.getElementById("submitBtn");
const resultText = document.getElementById("result");

const suits = ["♠", "♥", "♦", "♣"];

const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];

let shoe = [];
let runningCount = 0;

function createDeck(){

  let deck = [];

  for(let suit of suits){

    for(let value of values){

      deck.push({
        value:value,
        suit:suit
      });

    }

  }

  return deck;
}

function createShoe(decks = 6){

  shoe = [];

  for(let i = 0; i < decks; i++){

    shoe.push(...createDeck());

  }

  shuffle(shoe);
}

function shuffle(array){

  for(let i = array.length - 1; i > 0; i--){

    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getCardValue(card){

  if(["2","3","4","5","6"].includes(card.value)){
    return 1;
  }

  if(["10","J","Q","K","A"].includes(card.value)){
    return -1;
  }

  return 0;
}

async function startRound(){

  startBtn.classList.add("hidden");

  resultText.textContent = "";

  answerArea.classList.add("hidden");

  countInput.value = "";

  runningCount = 0;

  let cardsToShow = 20;

  for(let i = 0; i < cardsToShow; i++){

    if(shoe.length === 0){
      createShoe();
    }

    const card = shoe.pop();

    runningCount += getCardValue(card);

    cardDiv.textContent = `${card.value}${card.suit}`;

    if(["♥","♦"].includes(card.suit)){
      cardDiv.classList.add("red");
      cardDiv.classList.remove("black");
    }
    else{
      cardDiv.classList.add("black");
      cardDiv.classList.remove("red");
    }

    await sleep(700);
  }

  cardDiv.textContent = "?";

  cardDiv.classList.remove("red");
  cardDiv.classList.remove("black");

  answerArea.classList.remove("hidden");

}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

startBtn.addEventListener("click", () => {

  startRound();

});

submitBtn.addEventListener("click", () => {

  const userAnswer = Number(countInput.value);

  if(userAnswer === runningCount){

    resultText.textContent = "🔥 Correto!";
  }
  else{

    resultText.textContent =
      `❌ Errado! Running Count era ${runningCount}`;
  }

  startBtn.textContent = "Jogar Novamente";

  startBtn.classList.remove("hidden");

});
 
createShoe();
