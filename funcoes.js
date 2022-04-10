const cardBoard = document.querySelector("#cardboard");
const pontuacao = document.querySelector("#pontos");
let ponto = 0;
const images = [
    '0.jpg',
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg'
];

let cardHTML = '';

images.forEach(img => {
    cardHTML += `
     <div class="memoria-card" data-card="${img}">
        <img class="frente" src="img/${img}">
        <img class="verso" src="img/memorize.jpg">
     </div> 
     `
});

cardBoard.innerHTML = cardHTML + cardHTML;

const cards = document.querySelectorAll(".memoria-card");
let firstCard, secondCard;
let lockCard = false;

function flipCard(){
    if(lockCard) return false;
    this.classList.add("flip");

    if(!firstCard){
        firstCard = this;

        return false;
    }
    secondCard = this;

    checkForMatch();
}
function checkForMatch(){
   let isMatch = firstCard.dataset.card === secondCard.dataset.card;
   
   if(isMatch){
       ponto = ponto + 1;
       pontuacao.innerText = ponto;

       if(ponto === 10){
        alert("PARABÉNS!!! Você conseguiu!")
    }
   }

    !isMatch ? disableCards() : resetCards(!isMatch); 
}

function disableCards(){
    lockCard = true;

    setTimeout(() => { 
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

       resetCards();
    }, 1000);
}

(function aleatorio(){
    cards.forEach(card =>{
        let rand = Math.floor(Math.random() * 20);
        card.style.order = rand;
    })
})()

function resetCards(isMatch){
    if(isMatch){
        firstCard.removeEvenListener("click", flipCard);
        secondCard.removeEvenListener("click", flipCard);
    }
    [firstCard, secondCard, lockCard] = [null, null, false];
}

cards.forEach(card => card.addEventListener("click", flipCard));