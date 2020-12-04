var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstaclesGroup;
var cloudsGroup;
var score = 0;
var gameState = "play";
var gameOver, gameOverImage;
var restart, restartImage;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")

}

function setup() {
  createCanvas(600, 200);

  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -2;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  restart = createSprite(300, 130, 10, 10);
  restart.addImage("restart", restartImage);
  restart.visible = false;
  restart.scale = 0.5;

  gameOver = createSprite(300, 80, 10, 10);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.5;
}

function draw() {
  background(255);

  if (gameState === "play") {

    ground.velocityX = -6 - score / 100;

    if (keyDown("space") && trex.y >= 161.5) {
      trex.velocityY = -10;
    }
    console.log(trex.y);
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    score = score+Math.round(getFrameRate()/35);
    spawnClouds();
    spawnObstacles();
    if (trex.isTouching(obstaclesGroup)) {
      gameState = "end";
    }
  } else if (gameState === "end") {
    gameOver.visible = true;
    restart.visible = true;

    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    //change the trex animation
    trex.changeAnimation("trex_collided", trex_collided);

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }
  if (mousePressedOver(restart)) {
    reset();
  }

  trex.collide(invisibleGround);
  text("score:" + score, 500, 50);
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    console.log(cloud.y);
    cloud.addImage("cloud", cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacles = createSprite(600, 165, 10, 10);
    obstacles.velocityX = -6 - score / 100;
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacles.addImage("obstacle1", obstacle1)
        break;
      case 2:
        obstacles.addImage("obstacle2", obstacle2)
        break;
      case 3:
        obstacles.addImage("obstacle3", obstacle3)
        break;
      case 4:
        obstacles.addImage("obstacle4", obstacle4)
        break;
      case 5:
        obstacles.addImage("obstacle5", obstacle5)
        break;
      case 6:
        obstacles.addImage("obstacle6", obstacle6)
        break;
    }
    obstacles.scale = 0.5;
    obstacles.lifetime = 300;
    obstaclesGroup.add(obstacles);
  }
}

function reset() {
  gameState = "play";

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  trex.changeAnimation("running", trex_running);

  score = 0;

}