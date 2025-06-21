let words = [
  "Apple", "Chair", "Table", "River", "Jungle", "House", "Rocket", "Castle",
  "Bridge", "Planet", "Candle", "Forest", "Island", "Pirate", "Monkey", "Window",
  "Anchor", "Breeze", "Ocean", "Flames",
  "Wano", "Devilfruit", "Marine", "Treasure", "Bounty", "Sea", "Grandline",
  "Shadow", "System", "Dungeon", "Hunter", "Gate", "Monarch", "Statue",
  "Demon", "Hashira", "Blade", "Nichirin", "Breath", "Slayer", "Crow",
  "Titan", "Survey", "Paradise", "Marley", "Basement", "Wall", "Colossal"
];


let buttons = document.querySelectorAll(".cell");


let start = document.getElementById("start");
let homepage = document.getElementById("homepage");
let gameboard = document.getElementById("container");
let wordContainer = document.getElementById("word-container");
let gameResult = document.getElementById("game-result");
let playAgain = document.getElementById("play-again");
let word = document.getElementById("word");
let hangman = document.getElementById("hangman");
 let lose = new Audio('audio/lose-bg.mp3');
let win = new Audio('audio/win-bg.mp3');
let cheer = new Audio('audio/cheer.mp3');
 let gameBg = new Audio('audio/game-music.mp3');

let index = Math.floor(Math.random() * words.length);
let blank = [];
let lives = 6;
let correctLetter = true;

start.addEventListener("click", startGame);
playAgain.addEventListener("click", () => {
    resetGame();
    gameResult.style.display = "none";
    gameboard.style.display = "flex";
});

function checker(letter){
    let flag = false;   
    for(let i = 0; i < words[index].length; i++){ 
    let currentLetter = words[index][i];
    if (currentLetter.toUpperCase() === letter) {  
        blank[i].innerHTML = letter;
        blank[i].classList.add('reveal-animation');
        flag = true;
        correctSound();
        correctLetter = true;
    }
    }
    if (flag == false){
        correctLetter = false;
        lives--;
        balloonPop();
        hangman.src = `img/balloon-${lives}.png`;
    }
    if (isWordGuessed(blank) || lives <= 0) {
    setTimeout(() => {
        disableAllButtons();
        showResult();
    }, 500);
}
    
    
}

function startGame(){
    homepage.style.display = "none";
    gameboard.style.display = "flex";
    randomWord();
    gameBgMusic();
buttons.forEach(button => {

  button.addEventListener("click", () => {

    const clickedLetter = button.textContent;
    
    button.classList.add("clicked");
    checker(clickedLetter);
    if(correctLetter){
        button.style.transition = "0.3s";
        button.style.backgroundColor = "green";
        button.style.color = "white";
    } else{
        button.style.transition = "0.3s";
        button.style.backgroundColor = "red";
        button.style.color = "white";
    }
    button.disabled = true;
    
  });
 
});
}

function resetGame() {
    index = Math.floor(Math.random() * words.length);
    blank = [];
    lives = 6;
    correctLetter = true;
    lose.pause();
    lose.currentTime = 0;
    win.pause();
    gameBgMusic();
    win.currentTime = 0;
    hangman.style.animation = "upDown 2s infinite"
    hangman.classList.remove("falling-down");
    hangman.src = `img/balloon-${lives}.png`;
    wordContainer.innerHTML = "";
    buttons.forEach(button => {
        button.classList.remove("clicked");
        button.disabled = false;
        button.style.backgroundColor = "";
        button.style.color = "";
    });
    randomWord();
    
}

function randomWord() {
    for(let i = 0; i < words[index].length; i++){
        let letterSlot = document.createElement("h1");
        letterSlot.innerHTML = "_";
        wordContainer.appendChild(letterSlot);
        blank.push(letterSlot);
    }
}

function showResult() {
    
    word.textContent = words[index];
   
    let result = document.getElementById("result");
    let resultText = document.getElementById("result-text");
    let resultImage = document.querySelector(".result-image");
    let bg = document.querySelector(".background-behind-img");
    
    

    if (isWordGuessed(blank)) {
        disableAllButtons();
        cheer.currentTime = 0;
        cheer.play();
         gameBg.pause();
    gameBg.currentTime = 0;
    setTimeout(() => {
        winBg();
        gameResult.style.display = "block";
    gameboard.style.display = "none";
        result.textContent = "YUN OH! NICE GALING.";
    result.style.color = "#00FFFF";
    bg.style.background = "radial-gradient(circle, #00ffff88, #00000000 70%)";
    resultText.innerHTML = `You have successfully guessed the word <span style="color:#00FFFF; font-weight:bold; text-transform:uppercase; font-family:Montserrat, sans-serif">${words[index]}</span>.`;
    resultImage.style.width = "200px";
    resultImage.src = "img/alive.png"; 
    }, 1500);
    } else {
        disableAllButtons();
    fallingDown();
    
    setTimeout(() => {
        loseBg();
         gameResult.style.display = "block";
    gameboard.style.display = "none";
       hangman.classList.add("falling-down");
    result.textContent = "HALA, LAGOT KA!";
    result.style.color = "#ff1e1e";
    bg.style.background = "radial-gradient(circle, #ff1e1e, #00000000 70%)";
    resultText.innerHTML = `You have failed to guess the word <span style="color:#ff1e1e; font-weight:bold; text-transform:uppercase; font-family:Montserrat, sans-serif">${words[index]}</span>.`;
    resultImage.src = "img/dead.png";
    setDeadImageSize(); 
    }, 5000);
     
   
    
}
 
}

function isWordGuessed(blank) {
    for (let i = 0; i < blank.length; i++) {
        if (blank[i].innerHTML === "_") {
            return false; 
        }
    }
    
    return true; 
}

function balloonPop(){
    let balloonPop = new Audio('audio/balloon-pop.mp3');
    balloonPop.currentTime = 0;
    balloonPop.play();
}

function fallingDown(){
    
    let falling = new Audio('audio/falling-down.mp3');
    let hitGround = new Audio('audio/hit-ground.mp3');
    
    hangman.style.animation = "fallingDown 4s ease-in-out forwards";
   gameBg.pause();
    gameBg.currentTime = 0;
    falling.currentTime = 0;
    falling.play();
    hitGround.currentTime = 0;
    setTimeout(() => {
        hitGround.play();
    }, 3800);
}
function loseBg(){
    gameBg.pause();
    gameBg.currentTime = 0;
    lose.currentTime = 0;
    lose.play();
}
function winBg(){
    gameBg.pause();
    gameBg.currentTime = 0;
    win.currentTime = 0;
    win.play();
}
function gameBgMusic(){
   
    gameBg.currentTime = 0;
    gameBg.play();
}
function disableAllButtons() {
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function correctSound() {
    let correct = new Audio('audio/correct.mp3');
    correct.currentTime = 0;
    correct.play();
}
function setDeadImageSize() {
    let resultImage = document.querySelector('.result-image');
    if (!resultImage || resultImage.src.indexOf('dead.png') === -1) return;
    if (window.innerWidth <= 600) {
        resultImage.style.width = "500px";
    } else if(window.innerWidth <= 800) {
        resultImage.style.width = "600px";
    }   else if (window.innerWidth <= 900) {
        resultImage.style.width = "800px";
    } else if (window.innerWidth <= 1081) {
        resultImage.style.width = "900px";
    } else {
        resultImage.style.width = "1000px";
    }
}
window.addEventListener('resize', setDeadImageSize);