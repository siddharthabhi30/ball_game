const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight*0.8;
let count=25;
let second=0;
// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Shape(x, y, velX, velY , exists){
  this.x=x;
  this.y=y;
  this.velX=velX;
  this.velY=velY;
  this.exists=true;


}


function Evilcircle(x, y,exists){
  Shape.call(this, x, y, 6, 6, exists);
  this.color = 'white';
  this.size = 10;
}
Evilcircle.prototype=Object.create(Shape.prototype);
Evilcircle.prototype.constructor=Evilcircle;


Evilcircle.prototype.draw=function(){
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();

}

Evilcircle.prototype.checkBounds = function() {
  console.log( this.size, width)
  if ((this.x + this.size) >= width) {
    this.x -= this.size;  }

  else if ((this.x - this.size) <= 0) {
    this.x += this.size;  }

  if ((this.y + this.size) >= height) {
    this.y -= this.size;  }

 else if ((this.y - this.size) <= 0) {
  this.y += this.size;
  }

}
let eviil=new Evilcircle(random(0,width),random(0,height),true);
eviil.size=6;
window.onkeydown = function(e) {
    if (e.key === 'a') {
      eviil.x -= eviil.velX;
    } else if (e.key === 'd') {
      eviil.x += eviil.velX;
    } else if (e.key === 'w') {
      eviil.y -= eviil.velY;
    } else if (e.key === 's') {
      eviil.y += eviil.velY;
    }
  }


  Evilcircle.prototype.collisionDetect = function() {
    
   
    for (let j = 0; j < balls.length; j++) {
      if (balls[j].exists) {
     
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].exists = false;
         count--;
         if(count==0){
           alert(`you did it in ${second} seconds`)
         }
        }
      }
    }
  }



function Ball(x, y, velX, velY, color, size,exists) {
  Shape.call(this,x,y,velX,velY,exists);
  this.color = color;
  this.size = size;
}
Ball.prototype=Object.create(Shape.prototype);
Ball.prototype.constructor=Ball;
Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
 
  if ((this.x + this.size) >= width) {
   
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

let balls = [];

while (balls.length < 25) {
  let size = random(3,12);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    true
  );

  balls.push(ball);
}

function loop() {
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  for(let i = 0; i < balls.length; i++) {
    if(balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
    else{
      balls[i].x=eviil.x;
      balls[i].y=eviil.y;
    }
  }
  eviil.draw();
  eviil.checkBounds();
  eviil.collisionDetect();
  document.querySelector("p").innerText=count;

  requestAnimationFrame(loop);
}
loop();
let upp=false;
let downn=false;
let leftt =false;
let rightt=false
function up(){
  upp=true;
  
 downn=false;
 leftt =false;
 rightt=false


};


function down(){
  upp=false;
  
  downn=true;
  leftt =false;
  rightt=false

} ;

function left(){
  upp=false;
  
 downn=false;
 leftt =true;
 rightt=false
} ;

function right(){
  upp=false;
 downn=false;
 leftt =false;
 rightt=true;
} ;


function showTime(){
  second+=1;
  document.querySelectorAll("p")[1].innerText=second;

}
let our=setInterval(showTime,1000);
function none(){
  upp=false;
  downn=false;
  leftt =false;
  rightt=false;
  
}
function move(){
  if (leftt) {
    eviil.x -= eviil.velX;
  } else if (rightt) {
    eviil.x += eviil.velX;
  } else if (upp) {
    eviil.y -= eviil.velY;
  } else if (downn) {
    eviil.y += eviil.velY;
  }

}

let timer=setInterval(move,40);