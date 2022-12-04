const squares = [];
let mic;
let sound1;
let sound2;

function preload() {
  sound1 = loadSound('drumSample1.wav');
  sound2 = loadSound('drumSample2.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadImage('backgroundImage.jpg', (img) => {
    image(img, 0, 0, width, height);
  });

  // set up oscillator and microphone
  mic = new p5.AudioIn();
  mic.start();
  let osc1;
  let osc2;

  function noisePulse() {
    osc1.amp(0.5, 1);
    osc1.fade(0, 2);
  }

  function tonePulse() {
    const delay = new p5.Delay();
    osc2.setType(1);
    delay.process(osc2, 0.1, 0.5, 2000);
    osc2.amp(0.5, 0.2);
    osc2.fade(0, 0.5);
    osc2.freq(233.08);
  }
  osc1 = new p5.Noise('brown');
  osc1.amp(0.1);
  osc1.start();

  osc2 = new p5.TriOsc();
  osc2.amp(0.1);
  osc2.start();

  for (let i = 0; i < 10; i++) {
    squares.push(new Square(((10 + i) * width) / 30, 0));
  }

  // clock
  function displayTime() {
    const hours = hour();
    const minutes = minute();
    const seconds = second();
    const displayText = createElement('time', `${hours}:0${minutes}:${seconds}`);
    const displayTextPositionX = random((2 * width) / 3, width);
    const displayTextPositionY = random(height / 3, (2 * height) / 3);

    displayText.position(displayTextPositionX, displayTextPositionY);
    displayText.class('time');
    if (minutes < 10) {
      displayText.html(`${hours}:0${minutes}:${seconds}`);
    } else if (seconds < 10) {
      displayText.html(`${hours}:${minutes}:0${seconds}`);
    } else {
      displayText.html(`${hours}:${minutes}:${seconds}`);
      setInterval(displayTime, 60000);
    }
  }
  displayTime();

  // random sentence
  const sentence = createP('There was the grave misconception that she required a fishing hook-shaped object the length of her arm.');

  sentence.position(width / 6, height / 3);
  sentence.class('sentence');

  // some percussion samples from the song
  const button1 = createButton('#');
  button1.position((5 * width) / 6 + 10, 0);
  button1.style('width', `${width / 6}px`);
  button1.style('height', `${height / 6}px`);
  button1.class('button-dark');
  button1.mousePressed(() => {
    playSound(sound1);
  });

  const button2 = createButton('$');
  button2.position(0, (5 * height) / 6);
  button2.style('width', `${width / 6}px`);
  button2.style('height', `${height / 6}px`);
  button2.class('button-light');
  button2.mousePressed(() => {
    playSound(sound2);
  });

  // Type things for their own sake
  const typeIt = createInput('');
  typeIt.position((2 * width) / 3 + 10, (2 * height) / 3 - 60);
  typeIt.class('input');
  typeIt.attribute('data-cy', 'type');

  // Screen reader stuff
  const invisibleIntro = createP('You have found the invisible hidden treasure. Keep digging!\ Due to fear, one of the inhabitants excreted a pixel, grass, and antifreeze-filled sheet from a small tail.\ It also featured the nine things it had consumed recently:\ word salad, polygon pastries, never-ending pasta, an extra dark, large form, ocean sprinkles,\ zigzags in circle sauce, sound-filled cement buns, a nested skeleton');
  invisibleIntro.position(0, width / 2);
  invisibleIntro.class('invisible');

  const invisibleMessage = createP('nn ?aihcat! sue');
  invisibleMessage.position(width / 2, height / 2);
  invisibleMessage.class('invisible');

  const invisibleButton1 = createButton('Treasure');
  invisibleButton1.position(width / 4, height / 4);
  invisibleButton1.class('invisible');
  invisibleButton1.mousePressed(messageAlert);

  const invisibleButton2 = createButton('More treasure');
  invisibleButton2.position((3 * width) / 4, (3 * height) / 4);
  invisibleButton2.class('invisible');
  invisibleButton2.mousePressed(() => {
    setInterval(noisePulse, 5000);
  });

  const invisibleButton3 = createButton('Even more treasure');
  invisibleButton3.position((3 * width) / 4, (5 * height) / 6);
  invisibleButton3.class('invisible');
  invisibleButton3.mousePressed(() => {
    setInterval(tonePulse, 4000);
  });
}

function draw() {
  // Polygon stuff
  push();
  noFill();
  for (let i = 0; i < 100; i++) {
    if (i % 2 === 0) {
      stroke(i);
    } else {
      stroke(random(220, 255));
    }
    polygon(0 + i, 0 + i, i / 3, 3 * i);
  }
  pop();

  push();
  noFill();
  for (let i = 0; i < 100; i++) {
    strokeWeight(0.5);
    if (i % 3 === 0) {
      stroke(i);
    } else {
      stroke(random(0, 55));
    }
    polygon(width / 2, height / 2, i / 30, i);
  }
  pop();

  // Different things in the panels
  const time = 1000;

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      push();
      stroke(255, 217, 0);
      strokeWeight(10);
      line(((i + 1) * width) / 3, 0, ((i + 1) * width) / 3, height);
      line(0, ((j + 1) * height) / 3, width, ((j + 1) * height) / 3);
      pop();
    }
  }

  // blue points
  push();
  const from = color(25, 105, 209);
  const to = color(102, 168, 255);
  const stroke1 = lerpColor(from, to, random(1));
  stroke(stroke1);
  strokeWeight(2);
  point(random(width / 3) - 2, random(height / 3) - 2);
  pop();

  for (let i = 0; i < squares.length; i++) {
    squares[i].display();
    squares[i].move();
  }
  // text in the center
  push();
  textAlign(CENTER);
  const from1 = color(232, 93, 0);
  const to1 = color(255, 233, 219);
  const between1 = map(mouseX, 0, width, 0, 1);
  const col = lerpColor(from1, to1, between1);
  fill(col);
  textSize(24);
  textFont('Courier New');
  textStyle(BOLDITALIC);
  text('naihcatsue', width / 2, height / 2);
  pop();

  // microphone responsive squiggles and ellipses
  push();
  noFill();
  const micLevel = mic.getLevel();
  const from2 = color(255, 247, 0);
  const to2 = color(138, 106, 0);
  const between2 = lerpColor(from2, to2, micLevel);
  stroke(between2);
  const vertX = map(micLevel, 0, 1, width / 3, (2 * width) / 3);
  const vertY = map(micLevel, 0, 1, (2 * height) / 3, height);
  beginShape();
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      vertex(vertX + i * micLevel * 30, vertY + j * micLevel * 30);
    }
  }
  endShape();

  pop();

  if (micLevel > 0.1) {
    push();
    let alpha = 255;
    const from3 = color(132, 0, 255);
    from3.setAlpha(alpha);
    const to3 = color(138, 106, 0);
    to3.setAlpha(alpha);
    const between3 = lerpColor(from3, to3, micLevel);
    fill(between3);
    stroke(0, alpha);
    const micGeneratedEllipseWidth = random(width / 3 + 10, (2 * width) / 3 - 10);
    const micGeneratedEllipseHeight = random((2 * height) / 3 + 10, height);
    ellipse(micGeneratedEllipseWidth, micGeneratedEllipseHeight, width / 100, height / 100);
    if (millis() - time > 1000) {
      alpha = 0;
    }
    pop();
  }
  // assorted polygons with looping colors
  push();
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      stroke(255);
      const from4 = color(97, 255, 139);
      const to4 = color(38, 100, 59);
      const between4 = lerpColor(from4, to4, sin(millis() / 1000));
      const from5 = color(255);
      const to5 = color(0);
      const between5 = lerpColor(from5, to5, cos(millis() / 1000));
      stroke(between4);
      fill(between5);
      const polygonOffsetX = (2 * width) / 3 + i * 40 + 15;
      const polygonOffsetY = (2 * height) / 3 + j * 45 + 15;
      polygon(polygonOffsetX, polygonOffsetY, i + j + 3, width / 100);
    }
  }
  pop();

  // nested rectangles
  push();
  for (let i = 0; i < 100; i++) {
    noFill();
    stroke(255, 217, 0);
    rect(0, height / 3, 200 / i, 100 / i);
  }
  pop();
}

// bouncing purple squares
class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = width / 100 + height / 100;
    this.xspeed = 1;
    this.yspeed = 1;
  }

  display() {
    fill(132, 0, 255);
    strokeWeight(0.5);
    rect(this.x, this.y, this.size, this.size);
  }

  move() {
    if (this.x < width / 3 || this.x > (2 * width) / 3 - 12) {
      this.xspeed *= -1;
    }

    if (this.y < 0 || this.y > height / 3 - 11) {
      this.yspeed *= -1;
    }

    this.x += this.xspeed;
    this.y += this.yspeed;
  }
}

// start the microphone
function mousePressed() {
  userStartAudio();
}

function polygon(xOffset, yOffset, numberOfSides, radius) {
  const angle = TWO_PI / numberOfSides;
  beginShape();
  for (let i = 0; i < TWO_PI; i += angle) {
    vertex(xOffset + radius * cos(i), yOffset + radius * sin(i));
  }
  endShape(CLOSE);
}

function playSound(audio) {
  audio.play();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  loadImage('backgroundImage.jpg', (img) => {
    image(img, 0, 0, width, height);
  });
}
// Screen reader stuff
function messageAlert() {
  alert('err ! err err err  err err err !\ err err err  err err !err ! err err err  err err !\  arr  err err ! err err err  err err ! err !\ err err err  err err  orr err ! err err err  err err !err !\ err err err  err err err  urr !   irr  urr arr err err   !\ err  err   err  err  werr   herr   jerr   kerr   kerr !\  derr   ferr  gerr lerr merr serr !\ zerr   cerr  varr   berr nerr  ! yerr  rerr  terr  perr   nerr zorr  tirr  err err !err !\ err err err  err err ! err err !\ err err err  err err ! err err !\ err err err  err err!err ! err err err  err err !\  orr orr  err  orr Mommy, why am I sneezing?\ Mommy, why am I sneezing?\ Mommy, why am I sneezing? Mommy, why am I sneezing?\ Mommy, why am I sneezing?\ 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20!\ ha ha ha ha ha ha ha ha ho ho ho ho ho ho hoo!');
}
