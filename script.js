let color1, color2;
let canvas;

function setup() {
    canvas = createCanvas(500, 500);
    canvas.parent('canvas-container');
    color1 = color(0, 0, 50);
    color2 = color(0, 0, 100);
    windowResized();
}

function draw() {
    setGradient(0, 0, width, height, color1, color2);
}

function setGradient(x, y, w, h, c1, c2) {
    for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
    }
}

function windowResized() {
    let canvasSize = min(windowWidth, windowHeight, 500);
    resizeCanvas(canvasSize, canvasSize);
    canvas.position((windowWidth - canvasSize) / 2, (windowHeight - canvasSize) / 2);
}

function displayProject(projectNumber) {
    clear();
    setGradient(0, 0, width, height, color1, color2);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(`Project ${projectNumber}`, width / 2, height / 2);
}

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card) => {
    card.addEventListener('click', () => {
        const projectNumber = card.getAttribute('data-project');
        if (projectNumber === '1') {
            window.location.href = '/Inform7/play.html';
        } else {
            document.getElementById('projects').style.display = 'none';
            document.getElementById('project-display').style.display = 'flex';
            document.querySelector('header').style.display = 'none';
            document.querySelector('footer').style.display = 'none';
            displayProject(projectNumber);
        }
    });
});

document.getElementById('back-button').addEventListener('click', () => {
    document.getElementById('projects').style.display = 'flex';
    document.getElementById('project-display').style.display = 'none';
    document.querySelector('header').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
});