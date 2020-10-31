class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(400,200);
    car1.addImage("c1",car1Img);
   // car1.scale = 0.2
    car2 = createSprite(400,300);
    car2.addImage("c2",car2Img);  
  //  car2.scale = 0.2
   /* car3 = createSprite(500,200);
    car3.addImage("c3",car3Img);
    car4 = createSprite(700,200);
    car4.addImage("c4",car4Img);*/
    cars = [car1, car2];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(groundImg);
     // image(track1Img, 0,-displayHeight*4,displayWidth, displayHeight*5);
      //index of the array
      var index = 0;
      //x and y position of the cars
      var y = 175;
      var x;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 200;
        //use data form the database to display the cars in y direction
        x = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("brown")
          stroke(5)
          strokeWeight(5)
          ellipse(x,y,100,100);
          cars[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = cars[index-1].x
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

if(player.distance > 3000){
gameState = 2
}

    drawSprites();

  }
  
  end(){

    console.log("GAME HAS ENDED")
  }
}
