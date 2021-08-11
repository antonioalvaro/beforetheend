let canvas;
let charon;
let ang = 0;
let v1;
let v2;
let countdown = 100;
let start;
let charonX;
let charonY;

function preload(){
  charon = loadImage("assets/charon.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0)
  canvas.style("z-index", "-1")
  angleMode(DEGREES)
  frameRate(60)
}

function draw() {

  ang = 1 + frameCount/2

  if (ang == 240) {
    frameCount=0
  }

  let v1 = createVector(1, 0, 0);
  let v2 = createVector(mouseX, mouseY, 0);


  background(16,7,42);

  stroke("rgba(213,6,29,0.5)")
  strokeWeight(3)
  noFill()
  circle(0,0, windowHeight)
  circle(0,0, windowHeight*2)
  circle(0,0, windowHeight*3)
  circle(0,0, windowHeight*4)

  let angle = v1.angleBetween(v2)

  if (countdown == 100){
    charonX= mouseX
    charonY= mouseY
  }

  if (int(angle) == ang) {
    print("ok")
    start=1;
  }

  if (start == 1) {
    countdown = countdown -1;
    push()
    //strokeWeight(1)
    stroke("rgba(213,6,29,0.7)")
    drawingContext.setLineDash([5, 15]);
    //line(0,0,charonX,charonY)
    pop()
    tint(255, countdown*5)
    image(charon, charonX-50, charonY-50, 100,100)
  }

  if (countdown == 0) {
    countdown=100
    start=0
  }

  //text(int(angle) + " " + ang , 300,300)
  //text(countdown , 200,300)

  rotate(ang)
  line(0,0,windowWidth*2,0)
  stroke(213,6,29)
  rotate(-0.2)
  line(0,0,windowWidth*2,0)
  rotate(-0.2)
  line(0,0,windowWidth*2,0)
  rotate(-0.2)
  line(0,0,windowWidth*2,0)
  rotate(-0.2)
  line(0,0,windowWidth*2,0)
  rotate(-0.2)
  line(0,0,windowWidth*2,0)
  rotate(-0.2)
  line(0,0,windowWidth*2,0)
  stroke("rgba(213,6,29,0.9)")
  rotate(-0.5)
  line(0,0,windowWidth*2,0)
  stroke("rgba(213,6,29,0.8)")
  rotate(-0.5)
  line(0,0,windowWidth*2,0)
  stroke("rgba(213,6,29,0.7)")
  rotate(-0.5)
  line(0,0,windowWidth*2,0)
  stroke("rgba(213,6,29,0.6)")
  rotate(-0.5)
  line(0,0,windowWidth*2,0)
  stroke("rgba(213,6,29,0.5)")
  rotate(-0.5)
  line(0,0,windowWidth*2,0)
  stroke("rgba(213,6,29,0.4)")
  rotate(-0.5)
  line(0,0,windowWidth*2,0)
  stroke("rgba(213,6,29,0.3)")
  rotate(-0.5)
  line(0,0,windowWidth*2,0)
  stroke("rgba(213,6,29,0.2)")
  rotate(-0.5)
  line(0,0,windowWidth*2,0)
  stroke("rgba(213,6,29,0.1)")
  rotate(-0.5)
  line(0,0,windowWidth*2,0)

  fill(16,7,42)
  circle(0,0, 100,100);
  background("rgba(16,7,42, 0.5)");

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
