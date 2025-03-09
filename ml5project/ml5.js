// Adapted from https://github.com/ousecTic/ml5js-course/blob/main/FINAL/rock-paper-scissors-game/index.html
let video;
let classifier;
let modelUrl = 'https://teachablemachine.withgoogle.com/models/pReEs_9md/';
let userChoice = "";
let startButton;
let choices = ["up", "down"];
let words = ['i', 'I', 'l', '|', ',', '!']
let fallingWords = [];
let fireworks = [];
let result = "";

function setup() {
    createCanvas(640, 480);
    
  // Set up the video capture
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    classifier = ml5.imageClassifier(modelUrl + 'model.json', modelLoaded);
    for (let i = 0; i < 10; i++) {
        fallingWords.push({
            text: random(words),
            x: random(width),
            y: random(-100, 0),
            speed: random(2, 6),
            color: color(random(50, 150), random(150, 255), random(200, 255))
        });
    }
}

function modelLoaded() {
  console.log('Model Loaded!');
  classifyGesture(); // Start gesture classification immediately
}

function classifyGesture() {
  classifier.classify(video, (results) => {
    userChoice = results[0].label; // Update hand gesture detection
    classifyGesture(); // Keep classifying continuously
  });
}

function draw() {
  background(220);

  // Draw the video feed as the canvas backdrop
  image(video, 0, 0, width, height);

  fill(255, 0, 0);
  textSize(24);
  text('Put your hands up or down.', 10, 30);
  
  // Update result dynamically based on userChoice
  if (userChoice === "up") {
    result = "explode";
  } else if (userChoice === "down") {
    result = "rain";
  }

  // Trigger effects based on result
  if (result === "explode") {
    explosion();
  } else if (result === "rain") {
    rain();
  }
}

function rain() {
  noStroke();

  // Add new letters dynamically for heavier rain effect
  if (random(1) < 0.2) { 
    fallingWords.push({
      text: random(words),
      x: random(width),
      y: random(-100, 0),
      speed: random(2, 6),
      color: color(random(50, 150), random(150, 255), random(200, 255))
    });
  }

  for (let i = fallingWords.length - 1; i >= 0; i--) {
    let word = fallingWords[i];

    // Update position
    word.y += word.speed;

    // Draw the falling word
    fill(word.color);
    textSize(32);
    text(word.text, word.x, word.y);

    // Remove letters that fall off the screen
    if (word.y > height) {
      fallingWords.splice(i, 1);
    }
  }
}

function explosion() {
  if (random(1) < 0.1) { 
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

class Firework {
  constructor() {
    this.particles = [];
    this.explode();
  }

  explode() {
    let x = random(width);
    let y = random(20, 50); // Fireworks explode near the top
    for (let i = 0; i < 80; i++) { // Increased number of particles
      this.particles.push(new Particle(x, y));
    }
  }

  update() {
    for (let p of this.particles) {
      p.update();
    }
    this.particles = this.particles.filter(p => !p.done());
  }

  show() {
    for (let p of this.particles) {
      p.show();
    }
  }

  done() {
    return this.particles.length === 0;
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(2, 5)); // Increased speed and spread
    this.lifespan = 255;
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.vel.mult(0.95); // Slow down over time
    this.pos.add(this.vel);
    this.lifespan -= 4;
  }

  show() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
    ellipse(this.pos.x, this.pos.y, 8); // Increased particle size
  }

  done() {
    return this.lifespan <= 0;
  }
}