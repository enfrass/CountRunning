const cardDiv = document.getElementById("card");

const speedRange =
  document.getElementById("speedRange");

const speedValue =
  document.getElementById("speedValue");

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");

const overlay = document.getElementById("overlay");

const countInput = document.getElementById("countInput");

const submitBtn = document.getElementById("submitBtn");

const resultText = document.getElementById("result");

/* =========================
   CARTAS
========================= */

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

/* =========================
   VARIÁVEIS
========================= */

let shoe = [];

let runningCount = 0;

let keepCount = false;

let cardSpeed = Number(speedRange.value);
speedValue.textContent = cardSpeed;

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
   SISTEMA HI-LO
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

  continueBtn.classList.add("hidden");

  resultText.textContent = "";

  overlay.classList.add("hidden");

  countInput.value = "";

  /* RESETAR SOMENTE
     SE NÃO ESTIVER
     CONTINUANDO */

  if(!keepCount){

    runningCount = 0;
  }

  let cardsToShow = 20;

  for(let i = 0; i < cardsToShow; i++){

    /* RESHUFFLE */

    if(shoe.length === 0){

      createShoe();

      runningCount = 0;

      keepCount = false;
    }

    const card = shoe.pop();

    runningCount += getCardValue(card);

    /* RESETAR ANIMAÇÃO */

    cardDiv.classList.remove("animate");

    void cardDiv.offsetWidth;

    cardDiv.classList.add("animate");

    /* MOSTRAR CARTA */

    cardDiv.textContent =
      `${card.value}${card.suit}`;

    /* COR DA CARTA */

    if(["♥","♦"].includes(card.suit)){

      cardDiv.classList.add("red");
      cardDiv.classList.remove("black");

    }
    else{

      cardDiv.classList.add("black");
      cardDiv.classList.remove("red");
    }
     await sleep(cardSpeed);
  }

  /* FINAL DA RODADA */

  cardDiv.textContent = "?";

  cardDiv.classList.remove("red");
  cardDiv.classList.remove("black");

  overlay.classList.remove("hidden");
}

/* =========================
   BOTÃO INICIAR
========================= */

startBtn.addEventListener("click", () => {

  keepCount = false;

  continueBtn.classList.add("hidden");

  startRound();

});

/* =========================
   BOTÃO CONTINUAR
========================= */

continueBtn.addEventListener("click", () => {

  keepCount = true;

  continueBtn.classList.add("hidden");

  startRound();

});

/* =========================
   CONFIRMAR RESPOSTA
========================= */

submitBtn.addEventListener("click", () => {

  if(countInput.value === "") return;

  const userAnswer =
    Number(countInput.value);

  overlay.classList.add("hidden");

  /* ACERTOU */

  if(userAnswer === runningCount){

    resultText.textContent =
      "🔥 Correto!";

    continueBtn.classList.remove("hidden");
  }

  /* ERROU */

  else{

    resultText.textContent =
      `❌ Errado! Running Count era ${runningCount}`;

    keepCount = false;

    startBtn.textContent =
      "Jogar Novamente";

    startBtn.classList.remove("hidden");
  }

});

/* =========================
   SLEEP
========================= */

function sleep(ms){

  return new Promise(resolve =>
    setTimeout(resolve, ms)
  );
}
/* =========================
   VELOCIDADE
========================= */

speedRange.addEventListener("input", () => {

  cardSpeed = Number(speedRange.value);

  speedValue.textContent = cardSpeed;

});
/* =========================
   INICIAR SHOE
========================= */

createShoe();
