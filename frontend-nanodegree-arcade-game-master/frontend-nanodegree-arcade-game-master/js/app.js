// Enemies our player must avoid
alert("welcome to the frogger game");// welcome message
var x=prompt(" enter player name");//to get the name of player who is playing the game

var time;
//this time variable we declare globally to save the value of dt,because we need to multiply dt with speed of player to get the distance.



var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
 // x,y are the coordinates of the enemy on canvas which we pass to this enemy function.
   this.x=x;
   this.y=y;

    this.speed=speed;


    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
 
};

// Update the enemy's position, required method for game

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
  
   
    this.pos=this.x+(this.speed)*dt;//we calculate the position 
   if(this.pos<=490) // canvas width is 505 given in engine.js,if postion is less than 490 means within the canvas 
    //then we move the enemy.

    {

    this.x=this.x+this.speed*dt;
}
    else//and if it goes greater than canvas then again we restart the enemy 
    {
        this.x=-50;
    }
   

   time=dt;//we are copying the value of dt to time so that we can use it further.
   

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player=function(a,b,speed1)
{
// a,b are the coordintes of player.
//speed1 is the spped of player that we pass in the player function
this.a=a;
this.b=b;
this.speed1=speed1;
this.sprite='images/char-cat-girl.png';


};

//in this function we get the key which is  pressed by the player playing the game

player.prototype.handleInput=function(keyp){
    this.pos1=this.a+(this.speed1*time);
    this.pos2=this.b+(this.speed1*time);

  if(keyp== 'up' && this.pos2>50)
   {
// if user presses up and it is within the canvas then it moves upwards.thats why we give the condition,so that player not goes above the given canvas
     this.b=this.b-(this.speed1*time);




    }
    
   

   
  if(keyp== 'right'&& this.pos1<=420)
     {
       this.a=this.a+(this.speed1*time);
    

    }


  
   if(keyp== 'left' && this.pos1>=10)
      { this.a=this.a-(this.speed1*time);
      
       } 
 
       
    if(keyp== 'down' && this.pos2<=425)
           {this.b=this.b+(this.speed1*time);
    
      }

    if(this.b<=30)
    {
      this.reset();
      
     
    }  

  };

  //here we are checking the collision between enemy and player and if collision
  //occurs we call the reset function.
  player.prototype.update=function()

{
  var i;
for ( i = 0; i < allEnemies.length; i++) {
        if( (this.a - allEnemies[i].x <20) && (this.a -allEnemies[i].x> -20) && (this.b - allEnemies[i].y <45)&& this.b -allEnemies[i].y>-45){
            this.reset();
        }
    }
// if the enemy and player collides with each other means their coordinates gets equal then player restart from the beginning.
//we  here use  for loop because we have multiple enemies in the given allenemies array.
};


player.prototype.reset=function()
  {// if collision occurs it resets the coordinates
    this.a=200;
    this.b=425;

  };


player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
};

var allEnemies=[new Enemy(0,100,300),
    new Enemy(0,200,250),
    new Enemy(0,250,200),

    ];// array of enemies and passing the values of coordinates and speed.
var player=new player(150,425,1500);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//when collision occurs between enemy and palyer





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
