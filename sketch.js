let squares=[];
let mic;
let sound_1,sound_2;


function preload(){
  sound_1=loadSound('2.wav');
  sound_2=loadSound('1.wav'); 
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  loadImage('bg3.jpg',img=>{
    image(img,0,0,width,height); 
    
  });
  
//set up oscillator and microphone  

  mic= new p5.AudioIn();
  mic.start();
	let osc_1,osc_2;
	
	function noisePulse (){
  osc_1.amp(0.5,1);
  osc_1.fade(0,2);
	}

	function tonePulse (){
  let delay = new p5.Delay();
  osc_2.setType(1);
  delay.process(osc_2,0.1,0.5,2000);
  osc_2.amp(0.5,0.2);
  osc_2.fade(0,0.5);
  osc_2.freq(233.08);
  
}
  osc_1 = new p5.Noise('brown');
  osc_1.amp(0);
  osc_1.start();
  
  osc_2 = new p5.TriOsc();
  osc_2.amp(0);
  osc_2.start();
  
  
  for(let i=0;i<10;i++){
    squares.push(new Square((10+i)*width/30,0));
  }
  
//clock
  function displayTime(){
  let h = hour();
  let m = minute();
  let s = second();
  let display_text = createElement('time',h+':0'+m+':'+s);
  
  display_text.position(random(2*width/3,width),random(height/3,2*height/3));
  display_text.style('color','rgba(100,100,100,0.1)');
  display_text.style('font-family','Monaco');
  if(m<10){
    display_text.html(h+':0'+m+':'+s);
  }else if(s<10){
    display_text.html(h+':'+m+':0'+s);
  }else{
    display_text.html(h+':'+m+':'+s);
    setInterval(displayTime,60000);
  }   
}
  displayTime();

//sentence
  
let sentence = createP("There was the grave misconception that she required a fishing hook-shaped object the length of her arm for penetration.");

sentence.position(width/6,height/3);
sentence.style('font-family','Monaco');
sentence.style('font-size','16');
sentence.style('color','rgb(0, 255, 0)');
sentence.style('background-color','gray');
sentence.style('padding','2px');
sentence.style('border','inset black 2px');

  
 //some percussion samples
  
  let button_1= createButton('#');
  button_1.position(5*width/6+10,0);
  button_1.style('width',width/6+'px');
  button_1.style('height',height/6+'px');
  button_1.style('border','solid');
  button_1.style('border-color','#ffd900');
  button_1.style('color','white');
  button_1.style('background','#333333'); 
  button_1.style('font-size','2em');
  button_1.style('opacity','0.9');
  button_1.mousePressed(function (){
    playSound(sound_1);
  });
  
  let button_2= createButton('$');
  button_2.position(0,5*height/6);
  button_2.style('width',width/6+'px');
  button_2.style('height',height/6+'px');
  button_2.style('border','solid');
  button_2.style('border-color','#ffd900');
  button_2.style('color','black');
  button_2.style('background','#cccccc'); 
  button_2.style('font-size','2em');
  button_2.style('font-family','Courier');
  button_2.style('opacity','0.8');
  button_2.mousePressed(function (){
    playSound(sound_2);
  });
  
  //Type things for their own sake
  
  let typeit = createInput('');
  typeit.position(2*width/3+10,2*height/3-60);
  typeit.style('background-color','black');
  typeit.style('color','#dddddd');
  
  //Screen reader stuff
  
  let invisible_message = createP('N n? nro o! ob li? ttts!');
  
  invisible_message.position(width/2,height/2);
  
  invisible_message.style('opacity','0');
	
	invisible_message.style('font-size','1px');
  
  let invisible_button_1 = createButton('Treasure');
  
  invisible_button_1.position(width/4,height/4);
  
  invisible_button_1.style('opacity','0');
	
	invisible_button_1.style('width','1px');
	
	invisible_button_1.style('height','1px');
  
  invisible_button_1.mousePressed(messageAlert);
	
	
  
  let invisible_button_2 = createButton('More treasure');
  
  invisible_button_2.position(3*width/4,3*height/4);
  
  invisible_button_2.style('opacity','0');
	
	invisible_button_2.style('width','1px');
	
	invisible_button_2.style('height','1px');
  
  invisible_button_2.mousePressed(function (){
    setInterval(noisePulse,5000);
  });
  
let invisible_button_3 = createButton('Even more treasure');
  invisible_button_3.position(3*width/4,5*height/6);
  
  invisible_button_3.style('opacity','0');
	
	invisible_button_2.style('width','1px');
	
	invisible_button_2.style('height','1px');
  
  invisible_button_3.mousePressed(function (){
    setInterval(tonePulse,4000);
  });
  

}


function draw() {

  // Polygon stuffs
  push();
  noFill();
  for( let i = 0; i< 100 ; i++){
    if( i % 2 === 0){
      stroke(i);
    }else{
      stroke(random(220,255));
    }
    polygon(0+i,0+i,i/3,3*i);
  }
  pop();
  

  push();
  noFill();
  for( let i = 0; i< 100 ; i++){
    strokeWeight(0.5);
    if( i % 3 === 0){
      stroke(i);
    }else{
      stroke(random(0,55));
    }
    polygon(width/2,height/2,i/30,i);
  }
  pop();
  
  
//Different things in the panels
  
  let time=1000;
  
  for(let i=0;i<2;i++){
    for(let j=0;j<2;j++){
      push();
      stroke(255, 217, 0);
      strokeWeight(10);
      line((i+1)*width/3,0,(i+1)*width/3,height);
      line(0,(j+1)*height/3,width,(j+1)*height/3);
      pop();
    }
  }

//blue points
  push();
  let from=color(25, 105, 209);
  let to=color(102, 168, 255);
  let strokeOne=lerpColor(from,to,random(1));
  stroke(strokeOne);
  strokeWeight(2);
  point(random(width/3)-2,random(height/3)-2);
  pop();
  
  for(let i=0;i<squares.length;i++){
    squares[i].display();
    squares[i].move();
  }
//text in the center
  push();
  textAlign(CENTER);
  let from_1=color(232, 93, 0);
  let to_1=color(255, 233, 219);
  let between = map(mouseX,0,width,0,1);
  let col = lerpColor(from_1,to_1,between);
  fill(col);
  textSize(24);
  textFont('Courier New');
  textStyle(BOLDITALIC);
  text('Nrobllits',width/2,height/2);
  pop();
  
 //microphone responsive squiggles and ellipses  
  push();
  noFill();
  let micLevel=mic.getLevel();
  let from_2=color(255, 247, 0);
  let to_2 =color(138, 106, 0);
  let between_1=lerpColor(from_2,to_2,micLevel);
  stroke(between_1); 
  let vertX = map(micLevel,0,1,width/3,2*width/3);
  let vertY = map(micLevel,0,1,2*height/3,height);
  beginShape();
  for(let i=0;i<5;i++){
    for(let j=0;j<5;j++){
      vertex(vertX+i*micLevel*30,vertY+j*micLevel*30);
    }
  }
  endShape();

  pop();
  

  if(micLevel>0.1){
    push();
    a=255;
    let fromThree=color(132, 0, 255);
    fromThree.setAlpha(a);
    let toThree=color(138, 106, 0); 
    toThree.setAlpha(a);
    let between_2=lerpColor(fromThree,toThree,micLevel);
    fill(between_2);
    stroke(0,a);
    ellipse(random(width/3+10,2*width/3-10),random(2*height/3+10,height),width/100,height/100);
    if(millis()-time>1000){
      a=0;
      }
    pop();
  }
//assorted polygons with looping colors  
  push();
  for(let i=0;i<6;i++){
     for(let j=0;j<3;j++){
       stroke(255);
       let from_1 = color(97, 255, 139);
       let to_1 = color(38, 100, 59);
       let between_1 = lerpColor(from_1,to_1,sin(millis()/1000));
       let from_2 = color(255);
       let to_2 = color(0);
       let between_2 = lerpColor(from_2,to_2,cos(millis()/1000));
       stroke(between_2);      
       fill(between_1);
       polygon(2*width/3+i*40+15,2*height/3+j*45+15,i+j+3,width/100);
     }
  }
  pop();

//nested rectangles
  
  push();
  for(let i=0;i<100;i++){
    noFill();
    stroke(255, 217, 0);
    rect(0,height/3,200/i,100/i);
  }
  
  pop();
  

  
}

//bouncing purple squares

class Square {
  constructor (x,y){
    this.x=x;
    this.y=y;
    this.size=width/100+height/100;
    this.xspeed=1;
    this.yspeed=1;
  }
  display(){
    fill(132, 0, 255);
    strokeWeight(0.5);
    rect(this.x,this.y,this.size,this.size);
  }
  
  move(){
    if(this.x<width/3 || this.x>2*width/3-12){
      this.xspeed*=-1;
    }
    
    if(this.y<0 || this.y>height/3-11){
      this.yspeed*=-1;
  }
      this.x+=this.xspeed;
      this.y+=this.yspeed;
    }
}


// start the microphone
function mousePressed(){
  userStartAudio();
}

function polygon(x,y,n,r){
  let angle=TWO_PI/n;
  beginShape();
  for(let i=0;i<TWO_PI;i+=angle){
    vertex(x+r*cos(i),y+r*sin(i));
  }
  endShape(CLOSE);

}

function playSound(audio){
  audio.play();
  
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
  loadImage('bg3.jpg',img=>{
    image(img,0,0,width,height); 
    
    for(let i=0;i<10;i++){
    squares.push(new Square((10+i)*width/30,0));
  }
  
 // Disrupt everything with duplication
    
 let button_1= createButton('#');
  button_1.position(5*width/6+10,0);
  button_1.style('width',width/6+'px');
  button_1.style('height',height/6+'px');
  button_1.style('border','solid');
  button_1.style('border-color','#ffd900');
  button_1.style('color','white');
  button_1.style('background','#333333'); 
  button_1.style('font-size','2em');
  button_1.style('opacity','0.9');
  button_1.mousePressed(function (){
    playSound(sound_1);
  });
  
  let button_2= createButton('$');
  button_2.position(0,5*height/6);
  button_2.style('width',width/6+'px');
  button_2.style('height',height/6+'px');
  button_2.style('border','solid');
  button_2.style('border-color','#ffd900');
  button_2.style('color','black');
  button_2.style('background','#cccccc'); 
  button_2.style('font-size','2em');
  button_2.style('font-family','Courier');
  button_2.style('opacity','0.8');
  button_2.mousePressed(function (){
    playSound(sound_2);
  });
  
  
  let typeit = createInput('');
  typeit.position(2*width/3+10,2*height/3-60);
  typeit.style('background-color','black');
  typeit.style('color','#dddddd');
  
  let invisible_message = createP('N n? nro o! ob li? ttts!');
  
  invisible_message.position(width/2,height/2);
  
  invisible_message.style('opacity','0');
	
	invisible_message.style('font-size','1px');
  
  let invisible_button_1 = createButton('Trrrrrrrreasure');
  
  invisible_button_1.position(width/4,height/4);
  
  invisible_button_1.style('opacity','0');
	
	invisible_button_1.style('width','1px');
	
	invisible_button_1.style('height','1px');
  
  invisible_button_1.mousePressed(messageAlert);
	
	
  
  let invisible_button_2 = createButton('Moreeeeee treasure');
  
  invisible_button_2.position(3*width/4,3*height/4);
  
  invisible_button_2.style('opacity','0');
	
	invisible_button_2.style('width','1px');
	
	invisible_button_2.style('height','1px');
  
  invisible_button_2.mousePressed(function (){
    setInterval(noisePulse,5000);
  });
  
let invisible_button_3 = createButton('Even moooooore treasure');
  invisible_button_3.position(3*width/4,5*height/6);
  
  invisible_button_3.style('opacity','0');
	
	invisible_button_2.style('width','1px');
	
	invisible_button_2.style('height','1px');
  
  invisible_button_3.mousePressed(function (){
    setInterval(tonePulse,4000);
  });
  
  });

}
//Screen reader stuff
function messageAlert(){
  alert('err ! err err err  err err err ! err err err  err err !err ! err err err  err err !  arr  err err ! err err err  err err ! err ! err err err  err err  orr err ! err err err  err err !err ! err err err  err err err  urr !   irr  urr arr err err   ! err  err   err  err  werr   herr   jerr   kerr   kerr !  derr   ferr  gerr lerr merr serr ! zerr   cerr  varr   berr nerr  ! yerr  rerr  terr  perr   nerr zorr  tirr  err err !err ! err err err  err err ! err err ! err err err  err err ! err err ! err err err  err err!err ! err err err  err err !  orr orr  err  orr Mommy, why am I sneezing? Mommy, why am I sneezing? Mommy, why am I sneezing? Mommy, why am I sneezing? Mommy, why am I sneezing? 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20! ha ha ha ha ha ha ha ha ho ho ho ho ho ho hoo!' );
}

