/*globals createCanvas, ship, click, rect, restartsound, img,
 * rect, bg, soundicon, settingstitle, settingbutton, backbutton, homebutton,
 * createSlider, titleimage, loadImage, RGB, mode, soundFormats, mySound,
 * loadSound, highscore, colorMode, HSB, random, width, height,
 * background, ellipse, mouseX, mouseY, text, collideCircleCircle, createButton,
 * textFont, backgroundColor, color, textSize, fill,  image, imageMode,
 * playbutton, playAgain, playGame, pop, settings, titleScreen,
 * CENTER, noStroke, clear, square, bg1, titleImage, Title,
 * TitleScreen, playbutton, changeScreen, playagainbutton, ship1, ship2, ship3,
 * frameRate, Ship, keyCode, RIGHT_ARROW, LEFT_ARROW, createImage, createImg,
 * Galgaship, Alien1, Alien2, Alien2, Alien3, Alien4, Aliens,
 * collideRectRect, keyIsPressed, fill, 
 */

let ship,
  backgroundColor,
  coinX,
  coinY,
  score,
  time,
  gameIsOver,
  hit,
  button,
  timeLimit,
  img,
  bg,
  playbutton,
  volumeSlider,
  ship1photo,
  ship2photo,
  ship3photo,
  ship1button,
  ship2button,
  ship3button;

let Aliens = [];
let Lasers = [];

// data
gameIsOver = false;
mode = 0; // 0 = title screen 1 = game
score = 0;

function preload() {
  //background
  soundFormats('mp3');
  mySound = loadSound(
    'https://cdn.glitch.com/de7b474c-5603-4af4-99ea-8da78463dae6%2F01_Title%20Screen.mp3?v=1628231903499'
  );
  img = loadImage(
    "https://cdn.glitch.com/2fd2eed3-50e9-467b-bb2e-c11c64202f61%2Fbg1.jpg?v=1627351104429"
  );
  //titleImage = loadImage('')
  Title = loadImage(
    "https://cdn.glitch.com/2fd2eed3-50e9-467b-bb2e-c11c64202f61%2Flogo_si.png?v=1627452207170"
  );
  Alien1 = loadImage(
    "https://cdn.glitch.com/b62c8d42-6a71-4e46-967f-bba249fc76ec%2Fa1.png?v=1628099606212"
  );
  Alien2 = loadImage(
    "https://cdn.glitch.com/b62c8d42-6a71-4e46-967f-bba249fc76ec%2Fa2.png?v=1628099613667"
  );
  Alien3 = loadImage(
    "https://cdn.glitch.com/b62c8d42-6a71-4e46-967f-bba249fc76ec%2Fal3.png?v=1628099620333"
  );
  Alien4 = loadImage(
    "https://cdn.glitch.com/b62c8d42-6a71-4e46-967f-bba249fc76ec%2FA4.png?v=1628099629225"
  );  
  Galgaship = loadImage(
    "https://cdn.glitch.com/b62c8d42-6a71-4e46-967f-bba249fc76ec%2Fgalaga-ship-png-Transparent-Images.png?v=1628099636617"
  );
  //ship
  ship2 = loadImage(
    "https://cdn.glitch.com/de7b474c-5603-4af4-99ea-8da78463dae6%2Fspaceship3.png?v=1627929404693"
  );
  ship3 = loadImage(
    "https://cdn.glitch.com/2fd2eed3-50e9-467b-bb2e-c11c64202f61%2Fspaceship3.png?v=1627536236733"
  );
}

function setup() {
  mySound.play(); // dont forget to un comment this audio 
  // image(Galgaship, 0, 0);
  createCanvas(600, 600);
  colorMode(RGB);
  textFont("Prompt");
  textSize(10);
  image(img, 0, 0);
  image(Title, 100, 90, 400, 90);
  frameRate(10);
  //imageMode(CENTER);
  ship = new Ship();

  // play button
  button = createButton("PLAY");
  button.position(260, 270);
  button.size(100, 50);
  button.mousePressed(changeScreen);
  
  // home button
  homebutton = createButton("HOME");
  homebutton.position(50, 60);
  homebutton.size(50, 50);
  homebutton.mousePressed(home);

  // ship 1 button
  ship1button = createButton("PLAY SHIP 1");
  ship1button.position(105, 200);
  ship1button.size(100, 50);
  ship1button.mousePressed(shipbutton1);

  // ship 2 button
  ship2button = createButton("PLAY SHIP 2")
  ship2button.position(295, 300);
  ship2button.size(100, 50);
  ship2button.mousePressed(shipbutton1);

  // ship 3 button
  ship3button = createButton("PLAY SHIP 3");
  ship3button.position(420, 200);
  ship3button.size(100, 50);
  ship3button.mousePressed(shipbutton1);
}

function alienrow() {
  //Alien rows
  let startX = 80;
  let startY = 80;
  for (var i = 0; i < 6; i++) {
    Aliens[i] = new Alien(i * startX + 120, startY, Alien1, Alien2, 5);
  }
 startY+= 100;
    for (var i = 0; i < 6; i++) {
    Aliens.push(new Alien(i * startX + 120, startY, Alien3, Alien4, 5));
  }
}

function draw() {
  image(img, 0, 0);

  if (mode == 0) {
    image(Title, 100, 90, 400, 90);
    button.show(); 
    homebutton.hide();
    ship1button.hide();
    ship2button.hide();
    ship3button.hide();
  }
  if (mode == 1) {
    homebutton.show();
    button.hide();
    ship1button.show();
    ship2button.show();
    ship3button.show();

    shipphoto();
  }
  if (mode == 2) {
    button.hide();
    homebutton.show();

    shipbutton1();
    
    text(`Score: ${score}`, 20, 55);
  }
}

function collision() {
  hit = collideRectRect(100, 250, 50, 50);
  if (hit && !gameIsOver) {
    score += 1;
  }
}

function xyz() {
  for (var o = 0; o < 6; o++) {
    let alien = Aliens[o];
      alien.show();
      alien.move();
   }
}

function changeScreen() {
  mode = 1;
  image(img, 0, 0);
  homebutton.show();
  button.hide();
}

function home() {
  mode = 0;
  image(Title, 100, 90, 400, 90);
  button.show();
  homebutton.hide();
  playagainbutton.hide();
}

function shipbutton1() {
  mode = 2;
  button.hide(); 
  homebutton.show();
  
  alienrow();
  xyz();
  collision();
  
  if (ship1button.pressed == true)
    mode = 2;
    ship1button.hide();
    ship.show();
  if (ship2button.pressed == true)
    mode = 2;
    ship2button.hide();
    ship.show();
  if (ship3button.pressed == true)
    mode = 2;
    ship3button.hide();
    ship.show();
}

function shipphoto() {
  ship1photo = image(Galgaship, 120, 250, 70, 70);
  ship2photo = image(ship2, 310, 350, 70, 70);
  ship3photo = image(ship3, 430, 250, 70, 70);
}

function keyReleased() {
  ship.setDir(0);
}

//movements
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}



class Ship {
  constructor() {
    //dir = direction
    this.x = width / 2;
    this.y = height - 60;
    this.width = 60;
    this.height = 60;
    this.xdir = 0;
  }

  show() {
    image(Galgaship, this.x, this.y, 60, 60);
  }

  move() {
    if (keyIsPressed === true) {
      if (keyCode === RIGHT_ARROW) {
        this.x += 8;
      } else if (keyCode === LEFT_ARROW) {
        this.x -= 8;
      }
    }
  }
  setDir(dir) {
    this.xdir = dir;
  }
}

class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.h = 50;
    this.w = 50;
    this.alive = true;
    this.Alien1 = Alien1;
    this.Alien = Alien2;
    this.currentImg = "A";
    //this.pts = pointValue;

    this.raduis = 20;
    this.xdir = 1;
  }

  show() {
    //the alien will show is the alien is alive so before collision
    if (this.alive) {
      if (this.currentImg === "A") {
        image(this.Alien1, this.x, this.y, this.w, this.h);
      }
      if (this.currentImg === "B") {
        image(this.Alien2, this.x, this.y, this.w, this.h);
      }
      if (this.x + this.w > width) {
        this.xdir = -1;
      } else if (this.x < 0) {
        this.xdir = 1;
      }
    }
  }
  move() {
    this.x = this.x + this.xdir;
  }
}