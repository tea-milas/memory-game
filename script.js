let score = 0;
let moves = 0;
let scoreBoard = document.getElementById("score")
let movesBoard = document.getElementById("moves")
let cardsGrid = document.getElementById("cards");
let openCard;
let openCardChild;
let firstCard;
let twoCards = [];
let intervalID;


const deckOfCards = [
    {name: "leaf1", img: "./assets/img/leaf1.png"},
    {name: "leaf2", img: "./assets/img/leaf2.png"},
    {name: "leaf3", img: "./assets/img/leaf3.png"},
    {name: "leaf4", img: "./assets/img/leaf4.png"},
    {name: "leaf5", img: "./assets/img/leaf5.png"},
    {name: "leaf6", img: "./assets/img/leaf6.png"},
    {name: "leaf7", img: "./assets/img/leaf7.png"},
    {name: "leaf8", img: "./assets/img/leaf8.png"},
    {name: "leaf9", img: "./assets/img/leaf9.png"},
    {name: "leaf1", img: "./assets/img/leaf1.png"},
    {name: "leaf2", img: "./assets/img/leaf2.png"},
    {name: "leaf3", img: "./assets/img/leaf3.png"},
    {name: "leaf4", img: "./assets/img/leaf4.png"},
    {name: "leaf5", img: "./assets/img/leaf5.png"},
    {name: "leaf6", img: "./assets/img/leaf6.png"},
    {name: "leaf7", img: "./assets/img/leaf7.png"},
    {name: "leaf8", img: "./assets/img/leaf8.png"},
    {name: "leaf9", img: "./assets/img/leaf9.png"}
]
//---------------------------------SHOW/HIDE SECTIONS-----------------------------------------------------
const showLanding = () => {
    document.getElementById("landing").classList.remove("hidden");
    document.getElementById("game_section").classList.add("hidden");
}

const showGameSection = () => {
    document.getElementById("game_section").classList.remove("hidden");
    document.getElementById("landing").classList.add("hidden");
}

const showLoseMsg = () => {
    document.getElementById("message-lose").classList.remove("hidden");
    document.getElementById("message-lose").classList.add("visible");
}

const showWinMsg = () => {
    document.getElementById("message-win").classList.remove("hidden");
    document.getElementById("message-win").classList.add("visible");
}

const hideLoseMsg = () => {
    document.getElementById("message-lose").classList.add("hidden");
    document.getElementById("message-lose").classList.remove("visible");
}

const hideWinMsg = () => {
    document.getElementById("message-win").classList.add("hidden");
    document.getElementById("message-win").classList.remove("visible");
}

// ------------------------------START GAME--------------------------------------------------------------
const startGame = () => {
    
    createGame();
    showGameSection();

    let twoMinutes = 60 * 2 ,                                    
    display = document.getElementById("countdown_time");

    startCountdown(twoMinutes, display);
}

//-----------------------------------COUNTDOWN------------------------------------------------------------
const startCountdown = (duration, display) => {
    let timer = duration, minutes, seconds;

    intervalID = setInterval(() => {
        minutes = parseInt(timer / 60);
        seconds = parseInt(timer % 60);
       
        if (seconds < 10){
            seconds = "0" + seconds
        } 

        display.innerHTML = minutes + ":" + seconds;

        if (--timer < 0) {
            showLoseMsg();
            clearInterval(intervalID);
        } 

    },1000);
}
//-------------------------------------STOP COUNTDOWN-----------------------------------------------------
const stopCountdown = () => {
    console.log("TIME STOP PLS")
    clearInterval(intervalID);
}
//--------------------------------------SHUFFLE ARRAY------------------------------------------------------

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//-------------------------------------CREATE  CARDS---------------------------------------------------------
const createGame = () => {
    shuffleArray(deckOfCards);

    deckOfCards.forEach((card,index) => { 
        let div = document.createElement("div");
        div.setAttribute("data-leaf", card.name);
        div.className = "card back-side flip";
        div.innerHTML = `<img id="${index}" src="${card.img}" alt="${card.name}" class="hidden"></img>`; 
        cardsGrid.appendChild(div);   
    })

    //---------------------------------ADD CLICK EVENT TO THE CARD--------------------------------------------
    //get node list
    divs = document.querySelectorAll("div");
    //turn it into an array
    let cardsArray = Array.from(divs);
    //go through the array and add event listener to every item
    cardsArray.forEach(card => card.addEventListener("click", clickedCard));
}

//-------------------------------CLICKED CARD-----------------------------------------------------------------
    
const clickedCard = (event) => { 
    // gets the name so we know which leaf was clicked  (leaf1,leaf2....)
    const leaf = event.target.getAttribute("data-leaf");

    if (event.target.classList.contains("matched")) {
        return;
    }
    
    twoCards.push(leaf)
    matchCards(leaf,event);
}

//-----------------------------------MATCH CARDS--------------------------------------------------------------

const matchCards = (leaf,event) => {
    if (twoCards.length == 1) {
        // remove from the div
        event.target.classList.remove("back-side")
        // remove from the img
        event.target.childNodes[0].classList.remove("hidden");
        console.log("event.target.childNodes[0] ",event.target.childNodes[0])

        openCard = leaf;
        openCardChild = event.target.childNodes[0];
        firstCard = event.target;
        console.log("first card is: ", firstCard)

    } else if (twoCards.length == 2) {
        event.target.classList.remove("back-side")
        event.target.childNodes[0].classList.remove("hidden");
        
        if (openCard == leaf){
            console.log("WIN")
            addScore();

            firstCard.classList.add("matched");
            openCardChild.classList.add("matched")
            event.target.classList.add("matched");
            event.target.childNodes[0].classList.add("matched")
            
            openCard = undefined;
            twoCards = [];
        } else {
            console.log("TRY AGAIN")
            //turns first card face down
            setTimeout(() => firstCard.classList.add("back-side") ,1000);
            setTimeout(() => openCardChild.classList.add("hidden") ,1000);
            //turns second card face down
            setTimeout(() => event.target.childNodes[0].classList.add("hidden") ,1000);
            setTimeout(() => event.target.classList.add("back-side") ,1000);
            
            openCard = undefined;
            setTimeout(() => twoCards = [] ,1000);
        }
    } 

    addMoves();
}    


//-------------------------------------------ADD SCORE + MOVES------------------------------------------
const addScore = () => {
    if (score ==  8) {
        document.getElementById("totalMoves").innerHTML = moves + 1;
        scoreBoard.innerHTML = score + 1;
        showWinMsg();
        stopCountdown();

    } else {
        score = score + 1;
        scoreBoard.innerHTML = score;
    }
}

const addMoves = () => {
    moves = moves + 1;
    movesBoard.innerHTML = moves;
}
//----------------------------------------CLEAR BOARD-----------------------------------------------------
const clearBoard = () => {
    cardsGrid.innerHTML = "";
    score = 0;
    moves = 0; 
    movesBoard.innerHTML = 0; 
    scoreBoard.innerHTML = 0; 
}

//---------------------------------------PLAY AGAIN--------------------------------------------------------
const replay = () => {
    hideWinMsg();
    hideLoseMsg();
    clearBoard();
    startGame();
}

const toStart = () => {
    hideWinMsg();
    hideLoseMsg();
    clearBoard();
    showLanding();
}