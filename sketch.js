const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg;
var friend, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    

    box1 = new Box(1115,320,70,70);
    box2 = new Box(870,320,70,70);
    pig1 = new Pig(990, 350);
    log1 = new Log(975,260,300, PI/2);

    box3 = new Box(570,320,70,70); 
    box4 = new Box(789,320,70,70);
    pig2 = new Pig(680,350);
    log2 = new Log(680,260,300,PI/2);

   box5 = new Box(719,220,70,70);
   box6 = new Box(950,220,70,70);
   pig3 = new Pig2(835,240);
   log3 = new Log(830,190,300,PI/2);

   box7 = new Box(850,170,70,70);
   log4 = new Log(830,180,150, PI/7);
    log5 = new Log(870,180,150, -PI/7);


    

    friend = new Friend(155,200);
     //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(friend.body,{x:155, y:200});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }else{
        background("black");
    }

    
        noStroke();
        textSize(35)
        fill("Black")
        text("Score  " + score, width-180, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    pig2.score();
    log2.display();

    
    box5.display();
    box6.display();
    log3.display();
    pig3.display();
    pig3.score();
    log4.display();


    log5.display();
    box7.display();

    friend.display();
    
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(friend.body, {x: mouseX , y: mouseY});
        console.log("Launching the friend");
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        friend.trajectory = [];
     Matter.Body.setPosition(friend.body, {x: 200 , y: 50});
     Matter.Body.setAngularVelocity(friend.body,0);
       slingshot.attach(friend.body);
       gameState = "onSling";
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0300 && hour<=2000 ){
        bg = "sprites/bg2.jpg";
    }
     else{
        bg = "sprites/bg3.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}