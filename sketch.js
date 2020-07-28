//Create variables here
var hungryDog, happyDog, database, foodStock, lastFedTime, isFed = false, readState

var bedroom, garden, washroom, gameState


function preload()
{
  //load images here
  hungryDog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")

  bedroom = loadImage("images2/Bed Room.png")
  garden = loadImage("images2/Garden.png")
  washroom = loadImage("images2/Wash Room.png")
}

function setup() {
  createCanvas(800, 800);
  
  dog = createSprite(500,250,10,10)
  dog.scale = 0.25
  dog.addImage(hungryDog)

  foodObj = new Food(foodStock,lastFedTime);
  
  feed = createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })

}


function draw() {  



  if(gameState!=="Hungry"){
  
    feed.hide();
    addFood.hide();
    dog.visible=false;
  }else{
    background(46,139,87)
    dog.visible = true;
    feed.show();
    addFood.show();
    foodObj.display();

  }
  
  currentTime=hour();
  if(currentTime===(lastFedTime+1)){
    update("Playing")
    foodObj.garden();
  }else if(currentTime===(lastFedTime+2)){
    update("Sleeping")
    foodObj.bedroom();
  }else if(currentTime>(lastFedTime+2) && currentTime<=(lastFedTime+4)){
    update("Bathing")
    foodObj.washroom();
  }else{
    update("Hungry")
    foodObj.display();

  }

  
  fill(255,255,254)
  textSize(15)

  lastFedTime = foodObj.getLastFedTime();  

  if(lastFedTime>12){
    text("Last Feed : "+ lastFedTime%12 + "PM", 350,30)
  }else if(lastFedTime === 0){
    text("Last Feed : 12 AM", 350,30)
  }else{
    text("Last Feed : "+ lastFedTime+ "AM",350,30)
  }


  
  drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);
  foodStock = foodObj.getFoodStock()-1;
  foodObj.updateFoodStock(foodStock);
  isFed = true;
}

function addFoods(){
  dog.addImage(hungryDog);
  foodStock = foodObj.getFoodStock()+1;
  foodObj.updateFoodStock(foodStock)
  isFed = false;
}

function update(state){
  database.ref('/').update({
    gameState: state
  })
}
