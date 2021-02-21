let start = false;
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

// ------------------------------START GAME--------------------------------------------------------------
const startGame = () => {
    start = true;
    
    createGame();
    document.getElementById("game_section").classList.remove("hidden");
    document.getElementById("landing").classList.add("hidden");

    

    if (start) {
        console.log("heyaaaa I'm starting the game")

        let twoMinutes = 60 * 2 ,                                    
        display = document.getElementById("countdown_time");

        console.log()
        startCountdown(twoMinutes, display);
    }
}

//-----------------------------------COUNTDOWN------------------------------------------------------------
const startCountdown = (duration, display) => {
    let timer = duration, minutes, seconds;

    intervalID = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        if (seconds < 10){
            seconds = "0" + seconds
        } else {
            seconds = seconds;
        }

        display.textContent = minutes + ":" + seconds;

        console.log("timer is ", timer, duration)

        if (--timer < 0) {
            document.getElementById("message-lose").classList.remove("hidden");
            document.getElementById("message-lose").classList.add("visible");
            clearInterval(intervalID);
        } 

    },1000);
}
//-------------------------------STOP COUNTDOWN------------------------------------------------------------

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

//-------------------------------------CREATE  CARDS------------------------------------------------------------
const createGame = () => {
    console.log("creating the boardd")
    shuffleArray(deckOfCards);

    deckOfCards.forEach((card,index) => { 
        let div = document.createElement("div");
        div.setAttribute("data-leaf", card.name);
        div.className = "card back-side flip";
        div.innerHTML = `<img id="${index}" src="${card.img}" alt="${card.name}" class="hidden"></img>`; 
        cardsGrid.appendChild(div);   
    })

    //---------------------------------ADD CLICK EVENT TO THE CARD---------------------------
    //get node list
    divs = document.querySelectorAll("div");
    //turn it into an array
    let cardsArray = Array.from(divs);
    //go through the array and add event listener to every item
    cardsArray.forEach(card => card.addEventListener("click", clickedCard));
}




//-------------------------------CLICKED CARD--------------------------------------------------------------
    
const clickedCard = (event) => { 
    console.log("ok ok", event.target)
    // gets the name so we know which leaf was clicked
    const leaf = event.target.getAttribute("data-leaf");
    console.log("leaf is",leaf)

    if (event.target.classList.contains("matched")) {
        console.log("MISTAKEEE", leaf)
        return;
    }
    
    twoCards.push(leaf)

    matchCards(leaf,event);
}
//-----------------------------------MATCH CARDS---------------------------------------

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
        console.log(score)
        document.getElementById("totalMoves").innerHTML = moves + 1;
        scoreBoard.innerHTML = score + 1;
        document.getElementById("message-win").classList.remove("hidden");
        document.getElementById("message-win").classList.add("visible");
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


//---------------------------------------PLAY AGAIN----------------------------------------------------------
const replay = () => {
    document.getElementById("message-win").classList.add("hidden");
    document.getElementById("message-win").classList.remove("visible");

    document.getElementById("message-lose").classList.add("hidden");
    document.getElementById("message-lose").classList.remove("visible");

    cardsGrid.innerHTML = "";
    score = 0;
    moves = 0; 
    movesBoard.innerHTML = 0; 
    scoreBoard.innerHTML = 0; 
    startGame();
}

