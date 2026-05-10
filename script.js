const cardDiv = document.getElementById("card");
const startBtn = document.getElementById("startBtn");

const overlay = document.getElementById("overlay");

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
let keepCount = false;

/* =========================
   CRIAR DECK
========================= */

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

/* =========================
   CRIAR SHOE
========================= */

function createShoe(decks = 6){

  shoe = [];

  for(let i = 0; i < decks; i++){

    shoe.push(...createDeck());

  }

  shuffle(shoe);
}

/* =========================
   EMBARALHAR
========================= */

function shuffle(array){

  for(let i = array.length - 1; i > 0; i--){

    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* =========================
   VALOR HI-LO
========================= */

function getCardValue(card){

  if(["2","3","4","5","6"].includes(card.value)){
    return 1;
  }

  if(["10","J","Q","K","A"].includes(card.value)){
    return -1;
  }

  return 0;
}

/* =========================
   ROUND
========================= */

async function startRound(){

  startBtn.classList.add("hidden");

  resultText.textContent = "";

  overlay.classList.add("hidden");

  countInput.value = "";

  if(!keepCount){
  runningCount = 0;
}

  let cardsToShow = 20;

  for(let i = 0; i < cardsToShow; i++){

    if(shoe.length === 0){
      createShoe();
    }

    const card = shoe.pop();

    runningCount += getCardValue(card);

    /* RESETAR ANIMAÇÃO */

    cardDiv.classList.remove("animate");

    void cardDiv.offsetWidth;

    cardDiv.classList.add("animate");

    /* MOSTRAR CARTA */

    cardDiv.textContent = `${card.value}${card.suit}`;

    /* COR */

    if(["♥","♦"].includes(card.suit)){

      cardDiv.classList.add("red");
      cardDiv.classList.remove("black");

    }
    else{

      cardDiv.classList.add("black");
      cardDiv.classList.remove("red");

    }

    await sleep(650);
  }

  /* FINAL */

  cardDiv.textContent = "?";

  cardDiv.classList.remove("red");
  cardDiv.classList.remove("black");

  overlay.classList.remove("hidden");
}

/* =========================
   BOTÃO INICIAR
========================= */

startBtn.addEventListener("click", () => {

  startRound();

});

/* =========================
   CONFIRMAR RESPOSTA
========================= */

submitBtn.addEventListener("click", () => {

  if(countInput.value === "") return;

  const userAnswer = Number(countInput.value);

  overlay.classList.add("hidden");

  if(userAnswer === runningCount){

    resultText.textContent =
      "🔥 Correto!";
  }
  else{

    resultText.textContent =
      `❌ Errado! Running Count era ${runningCount}`;
  }

  startBtn.textContent = "Jogar Novamente";

  startBtn.classList.remove("hidden");

});

/* =========================
   SLEEP
========================= */

function sleep(ms){

  return new Promise(resolve => setTimeout(resolve, ms));

}

/* =========================
   INICIAR SHOE
========================= */

createShoe();
