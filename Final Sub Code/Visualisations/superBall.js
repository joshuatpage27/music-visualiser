/*SuperBall Visualization creates a dynamic wave-like animation that responds to the bass and treble frequencies of the music. To develop this visualisation i took inspiration from the oscillating-sphere found here: https://editor.p5js.org/aidanobrien/sketches/Y3dloQrUu*/
function SuperBall(shift) {
    this.name = "Superball"; 
    this.shift = shift; // Shift value for wave movement
    this.angle = 0; // Angle for movement calculations
    this.movement = 0; // Stores movement magnitude
    this.period = 1; // Controls wave period
    this.waves = []; // Array to store wave objects
	var r = 150; // Radius for the wave calculations
    var num = 20; // Number of wave layers
    var step = 20; // Distance between each wave layer
    var bassThreshold = 10; // Minimum bass energy required to trigger movement
    var isMoving = false; // Flag to track if the animation should run
    // Initialize wave objects with increasing shift values
    for (var i = 0; i < num; i++) {
        this.waves.push({ shift: i * step });
    }
    // Draw function: Called every frame to render the visualization
    this.draw = function() {
        push(); 
        angleMode(DEGREES); // Use degrees for angle calculations
        translate(width / 2, height / 2); // Center the animation
        noFill(); // Ensure waves are not filled
        // Analyze the frequency spectrum
        var spectrum = fourier.analyze();
        var bass = fourier.getEnergy("bass"); // Extract bass energy level
        var treble = fourier.getEnergy("treble"); // Extract treble energy level
        // Check if bass is above the threshold to trigger movement
        if (bass > bassThreshold) {
            isMoving = true; // Enable animation
        } else {
            isMoving = false; // Pause animation
        }
        // If movement is enabled, draw waves and update movement
        if (isMoving) {
            for (var i = 0; i < this.waves.length; i++) {
                this.display(this.waves[i].shift, bass, treble);
            }
            this.move(bass); // Update movement logic based on bass
        }
        pop(); 
    };

    // Display function: Draws individual wave layers
    this.display = function(shiftValue, bass, treble) {
        noStroke(); // Remove outline for a smoother effect
        // Set fill color based on bass and treble levels
        fill(
            map(bass, 0, 255, 0, 255), // Red component increases with bass
            50, // Fixed green value
            map(treble, 0, 255, 255, 0) // Blue component decreases with treble
        );

        // Loop through 360 degrees to create a circular wave shape
        for (var i = 0; i <= 360; i++) {
            var x = map(i, 0, 360, -r, r); // Map i value to x-coordinates within the radius range
            // Calculate amplitude using a circular wave equation
            var amplitude = r * sqrt(1 - pow((x / r), 2));
            // Apply sinusoidal transformation for dynamic wave movement
            var y = amplitude * sin((i + this.angle + shiftValue * this.movement) * this.period);
            // Draw small ellipses to form the wave
            ellipse(x, y, 2 + bass / 50, 2 + bass / 500);
        }
    };
    // Move function: Controls the animation dynamics based on bass energy
    this.move = function(bass) {
        this.angle += 0.5; // Gradually increase angle for smooth movement
        this.movement = cos(this.angle) * (1 + bass / 255); // Modulate movement using cosine wave and bass intensity
    };
}
