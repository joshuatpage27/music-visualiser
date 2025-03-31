// This is my adaptation of the Fireworks beats extension. I made the firworks look more realistic by reducing the size of each particle, making them fade out and changing the pattern to a catherine wheel or spiral effect. 
function Fireworks() {
    this.name = "Fireworks"; 
    var fireworks = []; // Array to store active fireworks
    var beatDetect = new BeatDetect(); // Object for detecting beats in the music
    frameRate(30); // Limit the frame rate to 30 FPS for smoother visuals
    // Main draw function, called every frame
    this.draw = function() {
        var spectrum = fourier.analyze(); // Get the frequency spectrum of the sound
        // Check if a beat is detected
        if (beatDetect.detectBeat(spectrum)) {
            this.addFirework(); // Add a new firework when a beat is detected
        }
        this.update(); // Update and render all fireworks
    };
    // Function to create and add a new firework to the array
    this.addFirework = function() {
        var f_colour = color(0, random(0, 255), random(0, 255)); // Random color (shades of blue/cyan)
        var f_x = random(width * 0.2, width * 0.8); // Random X position within the screen
        var f_y = random(height * 0.2, height * 0.8); // Random Y position within the screen
        // Create a new Firework object and add it to the array
        fireworks.push(new Firework(f_colour, f_x, f_y));
    };

    // Function to update and draw all active fireworks
    this.update = function() {
        push(); // Save the current drawing state
        angleMode(RADIANS); // Use radians for any angle calculations
        // Loop through fireworks array in reverse (to safely remove depleted fireworks)
        for (var i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].draw(); // Render the firework
            // Remove the firework if it has finished its animation
            if (fireworks[i].depleted) {
                fireworks.splice(i, 1);
            }
        }
        pop(); // Restore the previous drawing state
    };
    // Function to reset the fireworks array (clears all active fireworks)
    this.reset = function() {
        fireworks = []; // Clear the array when switching visuals
    };
}
