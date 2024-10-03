/**
 * Shear the Sheep 
 * Kiana Rezaee
 * 
 * did you know sheep cannot shed their own fur? 
 * shepherd's are a neccessity to their survival 
 * take care of Sheep, you can shave him by touching his fur circles!
 * try to do it before night fall..
 */

"use strict";


// makes a sheep body variable and gives it velocity and acceleration
// this allows the sheep to speed up over time creds dr pippin
let sheep = {
    x: 20,
    y: 340,
    w: 100,
    h: 80,
    velocity: {
        x: 0,
        y: 0,
    },
    minVelocity: {
        x: -3,
        y: 0
    },
    maxVelocity: {
        x: 3,
        y: 0,
    },
    acceleration: {
        x: 0.025,
        y: 0
    }
};

let fur = {
    // the white fur color
    r: 0,
    g: 0,
    b: 100,

    //each individual fur circle is a variable ellipse so it can be "shaved" off,
    // they are under one ellipses function for ease  
    ellipses: [
        { 
            x: 20,
            y: 10, 
            w: 40, 
            //the falling property is false at the rest position 
            //since the fur circles start off not touched
            falling: false, },
        { 
            x: 50, 
            y: 10,
            w: 40, 
            falling: false, },
        { 
            x: 80, 
            y: 10, 
            w: 40, 
            falling: false, },
        { 
            x: 100, 
            y: 10, 
            w: 40, 
            falling: false, },
        { 
            x: 20,
            y: 70, 
            w: 40, 
            falling: false, },
        { 
            x: 50, 
            y: 70, 
            w: 40, 
            falling: false, },
        { 
            x: 80, 
            y: 70,
            w: 40, 
            falling: false, },
    ],
};

let blueLightness; //this variable exists so the text can display

/**
 * Creates the canvas, sets up color hue mode
 */
function setup() {
    // defines canvas size
    createCanvas(480, 480);
    
    // activates hues and saturation because it feels intuitive 
    //this also is annoying later on
    colorMode(HSL);
}

// draws a sheep on a mountain
function draw() {
    // sheep constrain position 
    sheep.x = constrain(sheep.x, 20, 320);

    // sheep speed increases
    sheep.velocity.x += sheep.acceleration.x;
    sheep.velocity.y += sheep.acceleration.y;

    sheep.velocity.x = constrain(sheep.velocity.x, sheep.minVelocity.x, sheep.maxVelocity.x);
    sheep.velocity.y = constrain(sheep.velocity.y, sheep.minVelocity.y, sheep.maxVelocity.y);

    // Move the sheep by adding its velocity in x and y
    sheep.x += sheep.velocity.x;
    sheep.y += sheep.velocity.y;

    drawSky(); // the sky changes color following mouse check drawSky for more
    drawSunMoon(); // sun/moon matches the sky and also change color/follow mouse
    if (blueLightness <= 0) {
        displayMessage();
    }// shows a text when the background is black
    drawMountain();
    drawMountainDarkSide();
    drawGrass();
    drawSheep();
    drawFur();
    handleFur(); // how it checks for fur "shaving"
}

//forgot we had to use a map so i decided to add this 
//day to night
//the sky changes color as the cursor moves across the x axis
function drawSky() {
    // Use mouseX to map to [0, 100] then [0, 50]
    let x = map(mouseX, 0, 200, 0, 50);

    // HSL IS EVIL! you have to keep a fixed hue 
    let hue = 200; 

    // how dark the blue is
    blueLightness = lerp(50, 0, x / 90); 

    // inserting the HSL values, only lightness changes
    background(hue, 100, blueLightness);
}
function drawSunMoon() {
    // Map mouseX from [0, 400] to [0, 50]
    let x = map(mouseX, 0, 200, 0, 50);
    
    // Set the position for the sun/moon
    let sunX = mouseX;
    let sunY = 60; // Fixed Y position

    // did not mind the red here
    let hue = lerp(60, 0, x / 50); // Adjust hue for yellow to white
    let saturation = 100; 
    let lightness = lerp(50, 100, x / 50); // Start from yellow lightness (50) to white (100)

    fill(hue, saturation, lightness);
    noStroke();
    ellipse(sunX, sunY, 50, 50);
    // Return the lightness value for the check
    return lightness; 
}


function drawMountain() {
    // mountain in the background
    push();
    noStroke();
    fill(358, 37, 28);
    triangle(0, 480, 240, 240, 480, 480);
    pop();
}

function drawMountainDarkSide() {
    // mountain dark side
    push();
    noStroke();
    fill(358, 37, 30);
    triangle(0, 480, 240, 240, 240, 480);
    pop();
}

function drawGrass() {
    // grass 
    push();
    noStroke();
    fill(118, 50, 35);
    rect(0, 400, 480, 300);
    pop();
}

function drawFur() {
    // sheep fur
  
    push();
    noStroke();
    fill(fur.r, fur.g, fur.b);
    // each individual circle is one fur ball
    //i know this is ahead but the code was way too complicated without a forEach :(
    fur.ellipses.forEach(furEllipse => {
        //using boolean to define different possibilities 
            ellipse(furEllipse.x + sheep.x, furEllipse.y + sheep.y, furEllipse.w);
    });
    pop();
}

function drawSheep() {
    // sheep body
    push();
    noStroke();
    fill(0, 0, 100);
    rect(sheep.x, sheep.y, sheep.w, sheep.h);
    pop();

    // sheep legs 
    push();
    noStroke();
    fill(0,0,0);
    rect(sheep.x + 0  * sheep.w/4, sheep.y + sheep.h, sheep.w/8, sheep.h/2);
    pop();

    push();
    noStroke(); 
    fill(0,0,0);
    rect(sheep.x + 1 * sheep.w/4, sheep.y + sheep.h, sheep.w/8, sheep.h/2);
    pop();

    push();
    noStroke();
    fill(0,0,0);
    rect(sheep.x + 2 * sheep.w/4, sheep.y + sheep.h, sheep.w/8, sheep.h/2);
    pop();

    push();
    noStroke();
    fill(0,0,0);
    rect(sheep.x + 3 * sheep.w/4, sheep.y + sheep.h, sheep.w/8, sheep.h/2);
    pop();

    // sheep ear
    push();
    noStroke();
    fill(0, 0, 0);
    rect(sheep.x + sheep.w - 7, sheep.y, sheep.w / 5, sheep.h / 3);
    pop();

    // sheep head
    push();
    noStroke();
    fill(0, 0, 0);
    rect(sheep.x + sheep.w, sheep.y, sheep.w / 3, sheep.h / 2);
    pop();

    // sheep tail
    push();
    noStroke();
    fill(0, 0, 100);
    rect(sheep.x - 1 * sheep.w / 4, sheep.y, sheep.w / 4, sheep.h / 3);
    pop();
}

//the function that shows text 
//after boolean succeeds according to lightness
function displayMessage() {
    fill(255); 
    textSize(24); 
    textAlign(CENTER, CENTER); // Center the text
    text("you are nature. why do you forget?", width / 2, height / 2); 
}

// Check if fur is being "shaved" off
function handleFur() {
    fur.ellipses.forEach(furEllipse => {
        //boolean function to check for the distance between each circle and the mouse
        let distance = dist(mouseX, mouseY, furEllipse.x + sheep.x, furEllipse.y + sheep.y);
        if (distance < furEllipse.w / 2 && !furEllipse.falling) {
            // Set falling when mouse is close
            furEllipse.falling = true; 
        }
        // If falling, update the y position
        if (furEllipse.falling) {
           // trying to control the falling speed
            furEllipse.y += 2; 
        }
    });
}
