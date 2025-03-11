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

function loadProject(projectName) {
    if (projectName === 'ml5project') {
        window.location.href = '/ml5project/index.html';
    }
}

function showCredits() {
    const projectDisplay = document.getElementById('project-display');
    const projectsSection = document.getElementById('projects');
    projectDisplay.style.display = 'block';
    projectsSection.style.display = 'none';
    document.getElementById('canvas-container').innerHTML = '<h2>Credits</h2><p>Portfolio created by Tara Wright with generative assist by GitHub Copilot.</p><p>The Dragon Cave game was created with image generation help of ChatGPT and built based on examples provided by Anastasia Salter.</p><p>The Inform7 game was created based on examples provided by Inform7 and generative assists by ChatGPT.</p><p>The Up Downs project was created with the Rock Paper Scissors example by Anastasia Salter, a Teachable Machine trained by Tara Wright, and generative assists by ChatGPT.</p>';
    document.getElementById('canvas-container').style.display = 'flex';
    document.getElementById('canvas-container').style.flexDirection = 'column';
    document.getElementById('canvas-container').style.alignItems = 'center';
    document.getElementById('canvas-container').style.textAlign = 'center';
    document.getElementById('canvas-container').style.padding = '0 20px';
    document.getElementById('canvas-container').style.fontSize = '18px';
}

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card) => {
    card.addEventListener('click', () => {
        const projectNumber = card.getAttribute('data-project');
        if (projectNumber === '1') {
            window.location.href = 'Inform7/play.html';
        } else if (projectNumber === '2') {
            document.getElementById('project-display').style.display = 'block';
            document.getElementById('projects').style.display = 'none';
            document.getElementById('canvas-container').innerHTML = '<iframe src="DragonCave/index.html" frameborder="0" style="width: 100%; height: 100%;"></iframe>';
        } else if (projectNumber === '3') {
            window.location.href = 'ml5project/index.html';
        } else if (projectNumber === 'credits') {
            showCredits();
        } else {
            document.getElementById('projects').style.display = 'none';
            document.getElementById('project-display').style.display = 'flex';
            document.querySelector('header').style.display = 'none';
            document.querySelector('footer').style.display = 'none';
            displayProject(projectNumber);
        }
    });
});

document.getElementById('back-button').addEventListener('click', function() {
    document.getElementById('project-display').style.display = 'none';
    document.getElementById('projects').style.display = 'block';
    document.querySelector('header').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
});