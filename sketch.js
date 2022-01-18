var gamestate= "play"
var score= 0
function preload(){
    arrowImg=loadImage("arrow0.png")
    bombImg=loadImage("bomb.png")
    bowImg=loadImage("bow0.png")
    pathImg=loadImage("Road.png")
    gameOverImg= loadImage("gameOver.png")
    swordImg= loadImage("sword.png")
    pebbleImg= loadImage("obstacle2.png")
}
function setup(){
    createCanvas(1200,300)
    bombGrp= new Group()
    arrowGrp= new Group()
    swordGrp= new Group()
    pebbleGrp= new Group()
    path= createSprite(100,150)
    path.addImage(pathImg)
    path.velocityX= 5
    bow= createSprite(1100,150)
    bow.addImage(bowImg)
    bow.scale= 1
    
}

function draw(){
 if (gamestate=="play"){
    if (path.x>1200){
        path.x=0
    }
    if (keyDown("DOWN_ARROW")){
        bow.y=bow.y+5
    }
    if (keyDown("UP_ARROW")){
        bow.y=bow.y-5
    }
    if (keyDown("SPACE")){
       createArrows()
    }
    spawnGunmen()
    spawnSwords()
    spawnPebbles()
    if (arrowGrp.isTouching(bombGrp)){
        arrow.destroy()
        bomb.destroy()
        score= score+2
    }  
    if (bow.isTouching(bombGrp)){
        gamestate= "end"
    } 
    if (bow.isTouching(pebbleGrp)){
        gamestate= "end"
    }  
    if (arrowGrp.isTouching(swordGrp)){
        arrow.destroy()
        swords.destroy()
        score= score+2
    }  
    if (bow.isTouching(swordGrp)){
        gamestate= "end"
    }  
 }else if (gamestate=="end"){
    bow.destroy()
    path.destroy()
    gameOver= createSprite(600,100)
    gameOver.addImage(gameOverImg)
    path.velocityX= 0
    bombGrp.setVelocityXEach(0)
    arrowGrp.setVelocityXEach(0)
    swordGrp.setVelocityXEach(0)
    pebbleGrp.setVelocityXEach(0)
 }
 text ("score: "+ score, 1100, 50)
 drawSprites()
}
function spawnGunmen(){
    if(frameCount%150==0){
        bomb= createSprite(0,random(0,300))
        bomb.addImage(bombImg)
        bomb.velocityX= 5
        bomb.scale= 0.1
        bomb.setLifetime= 1100/5
        bombGrp.add(bomb)
    }
}
function createArrows(){
    arrow= createSprite(bow.x,bow.y)
    arrow.addImage(arrowImg)
    arrow.scale= 0.3
    arrow.setCollider("rectangle",0,0,50,10)
    arrow.velocityX= -17
    arrowGrp.add(arrow)
}
function spawnSwords(){
    if (frameCount%100==0){
        swords= createSprite(0, random(0,300))
        swords.addImage(swordImg)
        swords.scale=0.1
        swords.velocityX= 12
        swords.setLifetime= 1200/12
        swordGrp.add(swords)
    }
}
function spawnPebbles(){
    if (frameCount%50==0){
        pebble= createSprite(0, random(0,300))
        pebble.addImage(pebbleImg)
        pebble.scale=0.1
        pebble.velocityX= 10
        pebble.setCollider("circle",0,0,10)
        pebble.setLifetime= 1200/12
        pebbleGrp.add(pebble)
    }
}
