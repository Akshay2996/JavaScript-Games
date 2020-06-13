// Setting up the game using Phaser Framework

let prize_config = {
  count: 12,
  prize_names: [
    "3000 Credits",
    "35% OFF on the Course",
    "Hard Luck. Try Again!",
    "70% OFF on the Course",
    "Swagpack",
    "100% OFF on the Course",
    "Netflix Subscription for 2 months",
    "50% OFF on the Course",
    "Amazon Voucher worth 💲2000 ",
    "2 Extra Spin",
    "CB Tshirt",
    "CB Book",
  ],
};

let config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 720,
  backgroundColor: 0xffcc00,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  audio: {
    disableWebAudio: true,
  },
  pixelArt: false,
};

let game = new Phaser.Game(config);

// preload() -> To load Assets
function preload() {
  // load an image
  this.load.image("background", "Assets/back.jpg");
  this.load.image("wheel", "Assets/wheel.png");
  this.load.image("stand", "Assets/stand.png");
  this.load.image("pin", "Assets/pin.png");
  this.load.image("button", "Assets/spin-n-win-logo.png");
  this.load.audio("wheelsound", "Assets/SpinwheelSound.mp3");
}

// create() -> To create the game
function create() {
  // create the image
  let W = game.config.width;
  let H = game.config.height;
  console.log(this);

  this.add.sprite(W / 2, H / 2, "background");

  let stand = this.add.sprite(W / 2, H / 2 + 250, "stand");
  stand.setScale(0.25);

  let pin = this.add.sprite(W / 2, H / 2 - 250, "pin");
  pin.setScale(0.25);
  pin.depth = 1; // works as a Z-Index

  let button = this.add.sprite(W / 2, H - 30, "button");
  button.setScale(0.12);
  button.setInteractive();

  this.wheel = this.add.sprite(W / 2, H / 2, "wheel");
  this.wheel.setScale(0.25);

  this.wheelSound = this.sound.add("wheelsound");

  // event listener for mouse click in Phaser
  button.on("pointerdown", spinwheel, this);

  // Create text object
  font_style = {
    font: "bold 30px Montserrat",
    textAlign: "center",
    color: "red",
  };
  this.game_text = this.add.text(10, 10, "Welcome to Spin & Win", font_style);
}

// update() -> To update the game
function update() {
  console.log("In Update");
  //    this.wheel.angle += 1;
}

// spinwheel() -> To start & stop the wheel from spinning
function spinwheel() {
  console.log("Time to click the wheel");
  // play the sound when spinwheel function starts
  this.wheelSound.play();

  let rounds = Phaser.Math.Between(3, 5);

  // 12 items => 360/12 = 30
  let extra_degrees = Phaser.Math.Between(0, 11) * 30;

  let total_angle = rounds * 360 + extra_degrees;
  // calculation of which prize will come
  let index =
    prize_config.count -
    1 -
    Math.floor(extra_degrees / (360 / prize_config.count));

  // Creating the animation in phaser
  let tween = this.tweens.add({
    targets: this.wheel,
    angle: total_angle,
    ease: "Cubic.easeOut",
    duration: 6000,
    callbackScope: this,
    onComplete: function () {
      this.game_text.setText("You have got " + prize_config.prize_names[index]);
      //   this.wheelSound.stop();
    },
  });
}
