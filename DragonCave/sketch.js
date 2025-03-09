let roomImage;
let zones = [
  { name: "Dragon", x: 300, y: 300, w: 400, h: 300, message: "The dragon looks angry.", 
    options: ["Talk to the dragon", "Run away"], responses: ["The dragon ignores you.", "You ran away safely."], clicked: [false, false] },
  { name: "Gold", x: 200, y: 570, w: 600, h: 200, message: "You shouldn't touch that, the dragon is sitting on it.", 
    options: ["Try to take some", "Leave quietly"], responses: ["The dragon roars! Better back off.", "You wisely leave it alone."], clicked: [false, false] },
  { name: "Treasure", x: 0, y: 660, w: 500, h: 200, message: "Those look full of precious materials.", 
    options: ["Take the treasure", "Leave it"], responses: ["You took the treasure!", "You left it behind."], clicked: [false, false] },
  { name: "Bats", x: 240, y: 75, w: 270, h: 150, message: "Those bats are huge!", 
    options: ["Throw a rock", "Back away"], responses: ["The bats scatter in panic!", "You slowly step away."], clicked: [false, false] }
];

let currentMessage = "";
let messageStartTime = 0;
let menuVisible = false;
let currentZone = null;
let buttonWidth = 200;
let buttonHeight = 40;
let buttonSpacing = 50;
let gameEnded = false;

function preload() {
  roomImage = loadImage('dragon_cave.jpg');
}

function setup() {
  createCanvas(1000, 1000);
  background(0);
  const backButton = createButton('Back to Projects');
  backButton.position(10, 10);
  backButton.mousePressed(() => {
    window.location.href = '../index.html';
  });
}

function draw() {
  if (gameEnded) {
    displayGameOver();
    return;
  }

  image(roomImage, 0, 0);
  showMouseCoordinates();

  if (!menuVisible) {
    highlightZones();
  }

  displayMessage();

  if (menuVisible) {
    drawMenu();
  }
}

function showMouseCoordinates(xOffset = 10, yOffset = 10) {
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(14);
  let coords = `(${mouseX}, ${mouseY})`;
  text(coords, mouseX + xOffset, mouseY + yOffset);
}

function highlightZones() {
  noFill();
  stroke(255, 0, 0);
  strokeWeight(2);
  for (let zone of zones) {
    if (mouseX > zone.x && mouseX < zone.x + zone.w &&
        mouseY > zone.y && mouseY < zone.y + zone.h) {
      rect(zone.x, zone.y, zone.w, zone.h);
    }
  }
}

function displayMessage() {
  if (currentMessage !== "") {
    fill(255);
    stroke(0);
    strokeWeight(2);
    textSize(18);
    let messageWidth = textWidth(currentMessage);
    let xPos = (width - messageWidth) / 2;
    let yPos = height - 40;
    text(currentMessage, xPos, yPos);

    if (millis() - messageStartTime > 3000) {
      currentMessage = "";
    }
  }
}

function drawMenu() {
  fill(255, 255, 255, 220);
  rect((width - 300) / 2, height / 2 - 100, 300, 180, 10);

  fill(0);
  textSize(20);
  textAlign(CENTER);
  text(currentZone.name, width / 2, height / 2 - 70);

  textSize(16);
  for (let i = 0; i < currentZone.options.length; i++) {
    let buttonX = (width - buttonWidth) / 2;
    let buttonY = height / 2 - 30 + i * buttonSpacing;

    fill(200);
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(0);
    textAlign(CENTER, CENTER);
    text(currentZone.options[i], buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
  }
}

function mousePressed() {
  if (gameEnded) return;

  if (menuVisible) {
    for (let i = 0; i < currentZone.options.length; i++) {
      let buttonX = (width - buttonWidth) / 2;
      let buttonY = height / 2 - 30 + i * buttonSpacing;

      if (mouseX > buttonX && mouseX < buttonX + buttonWidth &&
          mouseY > buttonY && mouseY < buttonY + buttonHeight) {
        
        if (!currentZone.clicked[i]) { 
          currentZone.clicked[i] = true; // Mark the option as clicked
          checkGameEnd();
        }

        currentMessage = currentZone.responses[i];
        messageStartTime = millis();
        menuVisible = false;
        return;
      }
    }
  } else {
    for (let zone of zones) {
      if (mouseX > zone.x && mouseX < zone.x + zone.w &&
          mouseY > zone.y && mouseY < zone.y + zone.h) {
        currentZone = zone;
        menuVisible = true;
        return;
      }
    }
  }
}

function checkGameEnd() {
  for (let zone of zones) {
    for (let clicked of zone.clicked) {
      if (!clicked) {
        return; // If any option is still unclicked, do not end the game
      }
    }
  }
  gameEnded = true; // All options have been clicked
}

function displayGameOver() {
  background(0);
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Game Over\nYou've explored everything!", width / 2, height / 2);
}
