// My Code Start:
// Eclipse Visualization
// This function draws an eclipse-like waveform based on the Fourier analysis of the sound.
function Eclipse() {
	// Set visualization name
	this.name = "Eclipse";
	// Function to draw the waveform to the screen
	this.draw = function() {
		push(); // Save current drawing state
		noFill(); // No fill inside the shape to create a wireframe effect
		stroke(255, 255, 0); // Set stroke color to yellow
		strokeWeight(3); // Set stroke thickness for better visibility
		// Center the eclipse shape on the canvas
		translate(width / 2, height / 2);
		// Begin constructing the shape
		beginShape();
		angleMode(DEGREES); // Use degrees for angle calculations
		// Get the frequency spectrum using Fourier analysis
		var wave = fourier.analyze();
		// Loop through the frequency data to construct the shape
		for (var i = 0; i < wave.length; i++) {
			// Map frequency amplitude to radius size for dynamic scaling
			var r = map(wave[i], 0, 1, 150, 1000);
			// Convert polar coordinates to Cartesian coordinates
			var x = r * cos(i);
			var y = r * sin(i);
			// Define the vertex point for the shape
			vertex(x, y);
		}
		endShape();
		pop(); 
	};
}