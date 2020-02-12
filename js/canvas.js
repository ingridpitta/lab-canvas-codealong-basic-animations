let myObstacles = [];

let myGameArea = {
  canvas: document.createElement("canvas"),
  frames: 0,
  start: function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function() {
    clearInterval(this.interval);
  },
};

class Component {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.heigth = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
  }

  update = () => {
    let ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.heigth);
  };

  newPos = () => {
    this.x += this.speedX;
    this.y += this.speedY;
  };
}

let player = new Component(30, 30, "red", 0, 110);

function updateGameArea() {
  myGameArea.clear();
  player.newPos();
  player.update();

  updateObstacles();
}

function updateObstacles() {
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  myGameArea.frames += 1;
  if (myGameArea.frames % 120 === 0) {
    let x = myGameArea.canvas.width;
    let minHeight = 20;
    let maxHeight = 200;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    let minGap = 50;
    let maxGap = 200;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Component(10, height, "green", x, 0));
    myObstacles.push(
      new Component(10, x - height - gap, "green", x, height + gap)
    );
  }
}

myGameArea.start();

document.onkeydown = e => {
  switch (e.keyCode) {
    case 38:
      player.speedY -= 1;
      break;
    case 40:
      player.speedY += 1;
      break;
    case 37:
      player.speedX -= 1;
      break;
    case 39:
      player.speedX += 1;
      break;
  }
};

document.onkeyup = e => {
  player.speedX = 0;
  player.speedY = 0;
};
