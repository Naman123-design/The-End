var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var car1Img,car2Img,car3Img,car4Img;
var track1Img,groundImg
function preload(){
  car1Img = loadImage('horse1.png');
  car2Img = loadImage('horse2.png');
  car3Img = loadImage('car3.png');
  car4Img = loadImage('car4.png');
  track1Img = loadImage('track.png');
  groundImg = loadImage('ground.png');
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
    fill("black");
    stroke(10);
    strokeWeight(10)
    text("GAME HAS ENDED",displayWidth/2,displayHeight/2)
  }
}
