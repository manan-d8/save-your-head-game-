var xloc;
var loc;
var arr = [];
var a = [];
let points=0;
let showpoints=Math.floor(points/10);
let stopgame = false;
let regame = false;
let touchon = false;
function setup() {

  let size = floor(windowWidth/70);
  //createCanvas(640, 480);
createCanvas(windowWidth, windowHeight-10);
  for (let i = 0; i < size; i++) {
    let x = random(20,width-20);
    let y = 0;
    let r = random(10, 20);
    let dy = random(1, 7);
    let R = 255;
    let G = random(69,140);
    let B = random(0,80);
    let b = new circle(x, y, r,dy,R,G,B);
    arr.push(b);
  }
  var r = new player(width/2, windowHeight-100);
  a.push(r);
}
function draw() {
  smooth();
  background(255,255,153);
  textSize(40);
  stroke(255);
  text('SAVE YOUR HEAD',width/2-width/6.5,40);
 for (let i = 0; i < arr.length; i++) {
   //balllll ....................
   arr[i].move();
    arr[i].show();
   if(arr[i].y>height)
    {
      arr[i].y = -100;
      arr[i].x = random(20,width-20);
      points++;
    }
  }
  //playerrrr...............
  //a[0].movep();
  a[0].y = height-50;
  if ((keyIsDown(LEFT_ARROW))&& a[0].x > 20) {
    a[0].x-=5;
  }
  if ((keyIsDown(RIGHT_ARROW))&& a[0].x < width-20) {
     a[0].x+=5;
  }
  if (touchon == true) {
     a[0].x =loc;
  }
  // if(touchon == false) {
  //
  // }
  a[0].showp();

  //collisen ...............
  for (let i = 0; i < arr.length; i++){
    if(arr[i].y>height/4){
    let d = dist(a[0].x, a[0].y, arr[i].x, arr[i].y);
    if(arr[i].r+10>d){
     // print('intersect');
      pausegame();
    }
    }
  }
  //point counter............
  showpoints=floor(points/10);
  textSize(40);
  stroke(255);
  text(showpoints,10,40);

  //pause game......
  if(stopgame == true){
   noLoop();}

   //..................

}
class circle {
  constructor(x, y, r,dy,R,G,B) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dy=dy;
    this.R=R;
    this.G=G;
    this.B=B;
  }
  move() {
  //  this.x = this.x + random(-2, 2);
    // this.y = this.y + random(1,5);
    this.y = this.y +this.dy;
  }

  show() {
    stroke(255);
    strokeWeight(0);
    fill(this.R,this.G,this.B);
    ellipse(this.x, this.y, this.r * 2,this.r * 2+this.r);
    strokeWeight(7);
    stroke(this.R,this.G,this.B);
    line(this.x, this.y,this.x, this.y -this.r * 3);
    triangle(this.x-this.r, this.y-this.r*3, this.x, this.y-this.r*2,this.x+this.r, this.y-this.r*3);
  }
}
class player{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //this.r = r;
  }
  movep() {
  // this.x = mouseX;
  // // this.x = touchX;
  // this.y = height-50;
  }

  showp() {
    stroke(0,0,0);
    strokeWeight(6);
    ellipse(this.x, this.y,20);
    rect(this.x-3, this.y+10,6,25);
    rect(this.x-20, this.y+10,40,5);
    strokeWeight(7);
    line(this.x, this.y+30,this.x+9, this.y+50);
    line(this.x, this.y+30,this.x-9, this.y+50);
  }
}
function pausegame()
{
  		//noLoop();
  		stopgame = true;
 			background(255,0,0);
   		textSize(80);
      textAlign('CENTER');
  		text('o0pssss.....',width/2-200,height/2);
  		text('score : '+showpoints,width/2-200,height/2+100);
      points=0;
  		regame = true;
  		//loop();
}
function mousePressed() {
  stopgame=false;
}
function mouseReleased() {
 	 loop();
  if(regame == true)
  resat();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function resat(){
 document.location.reload();
}
function keyTyped() {
  if (key === 'r') {
   	resat();
  } else {
  }
}
function touchMoved(event){
  //print(event.screenX);
  // console.log(event);
  console.log(event.screenX);
   xloc = event.screenX;
  console.log(event.screenX);
  console.log('====>'+screen.width);
	loc = map (xloc,0,screen.width,0,width);
  console.log('xloc:'+xloc+'loc:'+loc);
   touchon = true;
}
function touchEnded(){
   touchon = false;
}
