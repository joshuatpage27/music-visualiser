// Particle constructor with fading and shrinking
// Represents an individual particle that moves outward and fades over time
function Particle(x, y, colour, angle, speed) {
    this.x = x; // X-coordinate of the particle
    this.y = y; // Y-coordinate of the particle
    this.speed = speed; // Initial speed of the particle
    this.lifespan = 255; // Particle starts fully visible
    this.size = 8; // Initial size of the particle
    this.opacity = 255; // Initial opacity (fully visible)
    // Update function: handles movement, fading, shrinking, and slowing down
    this.update = function() {
        // Move the particle in the given direction based on angle and speed
        this.x += cos(radians(angle)) * this.speed;
        this.y += sin(radians(angle)) * this.speed;
        // Gradually reduce lifespan to create a fading effect
        this.lifespan -= 10;
        // Shrink the particle over time
        this.size *= 0.92; 
        // Slow down the particle gradually
        this.speed *= 0.92; 
        // Map lifespan to opacity for smooth fading
        this.opacity = map(this.lifespan, 0, 255, 0, 255);
    };
    // Draw function: renders the particle to the canvas
    this.draw = function() {
        noStroke(); // Remove outline for a smoother appearance
        fill(colour.levels[0], colour.levels[1], colour.levels[2], this.opacity); // Set fill color with fading opacity
        ellipse(this.x, this.y, this.size); // Draw the particle
    };
}

