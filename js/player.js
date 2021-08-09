let video5js = document.getElementById('video5js');

let vid;

let mappedVol;
let playheadMapped;

var toggleView = false;
var viewSwitch = false;

/* video aspect ratio */
var vRatio = document.getElementById('v5js').getAttribute('ratio');
var ratioSelector = vRatio;

/* default player size */
var defaultPlayerWidth = 800;
//document.getElementById('v5js').getAttribute('vwidth');
var defaultPlayerHeight = defaultPlayerWidth / ratioSelector;

/* interactive player size */
var vpw = defaultPlayerWidth;
var vph = defaultPlayerHeight;

/* video width -> 1.777 needet to keep 16:9 aspect ratio */
var vidw = vpw;
var vidh = vpw / ratioSelector;

/* playback status */
var playing = 0;

/* video quality availability, standard quality required */
vQuality = document.getElementById('v5js').getAttribute('vqa');

var vidq = 1;

var mWheel = 1000;

var videosrc = document.getElementById('v5js').getAttribute('cnt') + /* "." + vidq +*/ ".mp4";
var textcard = document.getElementById('v5js').getAttribute('card') + /* "." + vidq +*/ ".mp4";

let nowViewing;

var mouseMoving;
var intro;
var playingCard = 0;

let introBegin = parseInt(document.getElementById('v5js').getAttribute('introbegin'));
let introEnd = parseInt(document.getElementById('v5js').getAttribute('introend'));
let serieName = document.getElementById('v5js').getAttribute('serie');
let episodeName = document.getElementById('v5js').getAttribute('episode');
let episodeNumber = document.getElementById('v5js').getAttribute('episodenumber')


var vScale = 30;

let playBtn;
let gradientBg;

function preload() {
  vid = createVideo(videosrc);
  card = createVideo(textcard);
  gradientBg = loadImage('assets/gradient.png')
  forma = loadFont('https://use.typekit.net/af/e64b68/00000000000000003b9ae4ef/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3');
}

function setup() {
  let canvas = createCanvas(vpw, vph);
  canvas.parent('video5js');
  vid.hide();
  card.hide();
  vid.size(vidw, vidh);
  card.size(vidw, vidh);

  noStroke();

  var refresh = int(document.getElementById('v5js').getAttribute('fps'));
  frameRate(refresh);
  nowViewing = vid
  nowViewing.volume(0.5)

}

function draw() {

  if (nowViewing == card & nowViewing.duration() == nowViewing.time()) {
    nowViewing = vid
    nowViewing.time(0)
    nowViewing.play()
    nowViewing.time(introEnd)
    playingCard = 0;
  }

  mappedVol = map(mouseX, vpw-190, vpw-90, 0, 1);
  playheadMapped = map(mouseX, 80, vpw-210, 0, nowViewing.duration());


  background(0);
  completion = nowViewing.time() / nowViewing.duration();
  nowViewing.size(vidw,vidh)

  //reverseMap = map(playheadMapped, 0, 100, )

  push()
  if (toggleView == false) {
    translate(0, (vph - vidh) / 2);
    image(nowViewing, 0, 0, vidw, vidh);
  } else {
    translate(0, (vph - (vpw / ratioSelector)) / 2);
    image(nowViewing, 0, 0, vpw, vpw / ratioSelector);
  }
  pop()

  angleMode(DEGREES);

  if (mouseY > vph-100 & mouseY < vph){
    image(gradientBg, 0,vph-(vph/4)+30, vpw, vph/4)
    push()
      translate(vpw,vph/4)
      rotate(180)
      image(gradientBg, 0,30, vpw, vph/4)
    pop()
    push()
      textSize(20)
      textFont(forma)
      text(serieName + ": " + episodeName, 40, 55)
      fill('rgba(255,255,255, 0.5)')
      textSize(15)
      text('Episodio ' + episodeNumber, 40, 75)
    pop()

    push()
      if (mouseX > 30 && mouseX < 60){
        fill(255,255,255)
      } else {
      fill('rgba(255,255,255, 0.5)')
      }
      translate(45,vph-47)
        if (playing == 0){
          //console.log(playBtn);
          triangle(-10,-10,10,0,-10,10)
        } else {
          rect(-8,-10, 5, 20)
          rect(2,-10, 5, 20)
        }
    pop()
  push()
    translate(vpw-150, vph-115)
    fill('rgba(255,255,255, 0.5)')
    if(mouseX < vpw-23 & mouseX > vpw-76 & mouseY < vph - 29 & mouseY > vph - 70){
      fill('rgba(255,255,255, 1)')
    }
    scale(0.75)
    beginShape()
      vertex(119, 87);
      vertex(119, 75);
      vertex(135, 75);
      vertex(135, 79);
      vertex(122, 79);
      vertex(122, 87);
    endShape(CLOSE)
    translate(280,185)
    scale(-1)
    beginShape()
      vertex(119, 87);
      vertex(119, 75);
      vertex(135, 75);
      vertex(135, 79);
      vertex(122, 79);
      vertex(122, 87);
    endShape(CLOSE)
    translate(280,0)
    scale(-1,1)
    beginShape()
      vertex(119, 87);
      vertex(119, 75);
      vertex(135, 75);
      vertex(135, 79);
      vertex(122, 79);
      vertex(122, 87);
    endShape(CLOSE)
    translate(280,185)
    scale(-1,-1)
    beginShape()
      vertex(119, 87);
      vertex(119, 75);
      vertex(135, 75);
      vertex(135, 79);
      vertex(122, 79);
      vertex(122, 87);
    endShape(CLOSE)
  pop()
  }



  if (nowViewing == vid && nowViewing.time() > introBegin && nowViewing.time() < introEnd) {
    intro =1
  } else {
    intro = 0
  }
  if (mouseY > vph-100 & mouseY < vph & intro == 0 & playingCard==0){

  }

  if (mouseY > vph-100 & mouseY < vph & intro == 0 & playingCard==0){

    push()
    noStroke();
    fill('rgba(255,255,255, 0.5)');
    rect(80, vph - 50, vpw-290, 5, 100);
    rect(vpw-185, vph - 50, 100, 5, 100)

    fill('rgba(0,94,176, 0.90)');
    rect(80, vph - 50, completion * (vpw-290), 5, 100);
    rect(vpw-185, vph - 50, nowViewing.volume()*100, 5, 100)

    if (mouseY > vph - 60 & mouseY < vph - 40 & mouseX > 80 & mouseX < vpw-200) {

      fill(255)
      //strokeWeight(4);
      circle(completion * (vpw-290) + 80, vph - 47.5, 10);
    }
    if (mouseY > vph - 60 & mouseY < vph - 40 & mouseX > vpw-185 & mouseX < vpw-90) {
      fill(255)
      //strokeWeight(4);
      rect((nowViewing.volume()*100)+(vpw-190), vph - 52.5, 4,10);
    }

    pop()
}

if (intro == 1) {
  push()
  fill(255,50,0)
  textSize(30)
  textAlign(RIGHT)
  textFont(forma)
  text("SKIP INTRO", vpw-100, vph-35)
  pop()
}

  fill(255,255,255);
  text(vpw-mouseX, 300, 100);
  text(vph-mouseY, 350, 100);
  text(nowViewing.time() + " / " + nowViewing.duration(), 250, 150);

}

function mouseWheel(event) {
    mWheel += event.delta;
}

function mousePressed() {
  if (mouseY <= vph & mouseX <= vpw){

  if (mouseY < vph - 25 & mouseY > vph - 65 & mouseX > 20 & mouseX < 70) {
    if (playing == 0) {
      play();
      redraw();
    }
    else {
      pause();
   }
  }



  if (mouseY > vph - 60 & mouseY < vph - 40 & mouseX > 80 & mouseX < vpw-180 & intro==0 & playingCard==0) {
    //nowViewing.time((mouseX / width) * nowViewing.duration());
    nowViewing.time(playheadMapped);
  }

  if (mouseY > vph - 90 & mouseY < vph - 40 & mouseX > vpw-185 & mouseX < vpw-60 & intro==0 & playingCard==0) {
    if (mappedVol > 1){
      mappedVol = 1
    }
    nowViewing.volume(mappedVol);
  }

  //rect(vpw-160, vph - 50, nowViewing.volume()*10, 5, 100)

  if (mouseX < vpw-91 & mouseX > vpw-260 & mouseY < vph - 29 & mouseY > vph - 70 & intro==1) {
    if (nowViewing = vid) {
      playingCard = 1;
      pause()
      nowViewing = card
      play();
    }
  }

  }

  if(mouseX < vpw-23 & mouseX > vpw-76 & mouseY < vph - 29 & mouseY > vph - 70){
    viewSwitch = true;

      let fs = fullscreen();
      fullscreen(!fs);
  }

}

// function mouseDragged(){
//       mouseMoving = true;
// }

// function doubleClicked() {
//   if (mouseY <= vph & mouseX <= vpw){
//
//
//   viewSwitch = true;
//
//   let fs = fullscreen();
//   fullscreen(!fs);
//   }
// }

function keyTyped() {
  if (key === 'a') {
   nowViewing.time(5)
  }
}


function windowResized() {

  if (viewSwitch == true){
    toggleView = !toggleView;
  }

  if (toggleView == true) {
    resizeCanvas(windowWidth, windowHeight);

    vpw = window.innerWidth;
    vph = window.innerHeight;

    redraw();
    document.body.style.overflow = "hidden"
    video5js.style.position = "absolute"
    video5js.style.left= "0"
    video5js.style.top= "0"
  } else {

    vpw = defaultPlayerWidth;
    vph = defaultPlayerHeight;

    resizeCanvas(vpw, vph);

    redraw();
    document.body.style.overflow = ""
    video5js.style = ""
    viewSwitch = false;
  }
}

function play() {
  playing = 1;
  nowViewing.play();
}

function pause() {
  playing = 0;
  nowViewing.pause();
}
