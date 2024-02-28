let size = 30;
let y = 0;
let speed = 400;

// hello

function setup() {
  createCanvas(windowWidth, windowHeight);
  //frameRate(10)
}

function draw() {
  //background(220);
  textSize(size)
  for(let i = 0; i < width; i+=size) {
    text('🌹', i + random(-20, 20), (y + i) % (height + size));
  }
  y+=speed;
  
  if(y > height + size) {
    y = 0;
    size = random(2, windowWidth)
    speed = random(6, 100);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}