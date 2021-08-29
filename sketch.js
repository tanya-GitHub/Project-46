const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var database;

var engine, world;

var backgroundSprite;
var backgroundImg;

var g1, g2, g3, g4;
var p1, p2, p3, p4;
var greenImg, purpleImg;

var bx = 240, by = 240;

var tokens = [];

var isClicked;
var tokenNumber;
var position;

function preload(){

    backgroundImg = loadImage("checkerboard.png");

    greenImg = loadImage("greenPiece.png");
    purpleImg = loadImage("purplePiece.png");

}

function setup(){
    var canvas = createCanvas(500, 500);
    engine = Engine.create();
    world = engine.world;

  /*  database.ref('tokens/position').on("value",(data) =>{
        g1.x = data.val();
    })*/

    backgroundImg = loadImage("checkerboard.png");
    backgroundSprite = createSprite(0, 0, 50, 50);
    backgroundSprite.addImage(backgroundImg);

    backgroundSprite.x = bx;
    backgroundSprite.y = by;

    //GREEN PIECES
    g1 = createSprite(bx - 200, by - 200, 50, 50);
    g1.addImage(greenImg);
    g1.scale = 0.032;

    g2 = createSprite(bx - 100, by - 200, 50, 50);
    g2.addImage(greenImg);
    g2.scale = 0.032;

    g3 = createSprite(bx + 100, by - 200, 50, 50);
    g3.addImage(greenImg);
    g3.scale = 0.032;

    g4 = createSprite(bx + 200, by - 200, 50, 50);
    g4.addImage(greenImg);
    g4.scale = 0.032;

    //PURPLE PIECES
    p1 = createSprite(bx - 200, by + 200, 50, 50);
    p1.addImage(purpleImg);
    p1.scale = 0.15;

    p2 = createSprite(bx - 100, by + 200, 50, 50);
    p2.addImage(purpleImg);
    p2.scale = 0.15;

    p3 = createSprite(bx + 100, by + 200, 50, 50);
    p3.addImage(purpleImg);
    p3.scale = 0.15;

    p4 = createSprite(bx + 200, by + 200, 50, 50);
    p4.addImage(purpleImg);
    p4.scale = 0.15;

    tokens = [g1, g2, g3, g4, p1, p2, p3, p4]

}

function draw(){
    database = firebase.database();

    background(255);
    Engine.update(engine);

    tokenNumberRef = database.ref('tokenNumber');
    tokenNumberRef.on("value",(data)=>{
      tokenNumber = data.val();
    })

    isClickedRef = database.ref('isClicked');
    isClickedRef.on("value",(data)=>{
      isClicked = data.val();
    })
   
    
    for(var i = 0; i < tokens.length; i++){

   
        
        if(mousePressedOver(tokens[i])){
            database.ref('/').update({
                isClicked: true,
                tokenNumber: i
            }) 

        }

            if(isClicked == true && tokenNumber == i){
                if(keyWentDown(UP_ARROW)&& tokens[i].y > 100){
                    console.log("UP");
                database.ref('tokens/position/tokenNumber '+i).set({
                    'x': tokens[i].x += 0,
                    'y': tokens[i].y += -100,
                    'isEmpty': false
                })
                }
            }

            if(isClicked == true && tokenNumber == i ){
                if(keyWentDown(DOWN_ARROW)&& tokens[i].y < 400){
                    console.log("DOWN");
                   // tokens[i].y+= 100;
                   database.ref('tokens/position/tokenNumber '+i).set({
                    'x': tokens[i].x += 0,
                        'y': tokens[i].y += +100
                    })
                }
            }

            if(isClicked == true && tokenNumber == i){
                if(keyWentDown(RIGHT_ARROW)&& tokens[i].x < 400){
                    console.log("RIGHT");
                    database.ref('tokens/position/tokenNumber '+i).set({
                        'x': tokens[i].x += +100,
                        'y': tokens[i].y += 0
                    })
                }
            }

            if(isClicked == true && tokenNumber == i ){
                if(keyWentDown(LEFT_ARROW)&& tokens[i].x > 100){
                    console.log("LEFT");
                    database.ref('tokens/position/tokenNumber '+i).set({
                        'x': tokens[i].x += -100,
                        'y': tokens[i].y += 0
                    })
                }
            }
        
    
    }
            drawSprites();

    }


