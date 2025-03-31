//MY CODE: This constructor assigns bass and treble values from the fft to differnt elements of the landscape making them reactive to sound.
function Landscape(){
	this.name = "Landscape"; 
	var prog = 0; // Tracks the progression to create movement
	var progThresh = 100; // Threshold to trigger movement based on sound energy
	var mountainRange = 0.01; // Noise range for mountain generation
	var coastRange = 0.01; // Noise range for coastline generation
	
	// Main draw loop
	this.draw = function(){
		push(); 
		fourier.analyze();
		var b = fourier.getEnergy("bass"); // Get bass frequency energy
		var t = fourier.getEnergy("treble"); // Get treble frequency energy

		// Draw the mountain range using bass energy
		this.mountainView(b);
		// Draw the coastline using treble energy
        this.coastLine(t);		

		// Draw moon depending on treble energy
		fill(200);
		noStroke();
		ellipse(width/2 + 350, height/3 - 50, t); // Outer circle
		fill(100);
		ellipse(width/2 + 350, height/3 - 50, t-100); // Inner circle

		pop(); 
	}
	
	// Draws the mountain range
	this.mountainView = function(energy){
		beginShape();
		stroke(255); // White stroke
		noFill();

		// Loop across the width of the canvas
		for(var i = 0; i < width; i++){
			// Map noise value to vertical displacement
			var o = map(noise(i * mountainRange + prog), 0, 1, -150, 150);
			vertex(i, height/2 + o); // Plot vertex for mountain shape
		}
		endShape();

		// Move the landscape forward if the bass energy is below the threshold and music is playing
		if(energy < progThresh && sound.isPlaying()){
			prog += 0.05; // Advance the noise offset
		}
	}
	
	this.coastLine = function(energyBass, energyTreble){
    noStroke(); 
    angleMode(RADIANS); // Set angle mode to radians for sine calculations
    var baseHeight = height * 0.7; // Base water level, defining the starting height of waves
    // Define water colors for different depths
    var deepWater = color(25, 51, 160); // Darker blue for deeper water
    var shallowWater = color(80, 150, 220); // Lighter blue for shallow water
    // Loop through layers: 0 for deep (bass), 1 for shallow (treble)
    for (var j = 0; j < 2; j++) {  
        var energy = (j === 0) ? energyBass : energyTreble; // Assign energy based on depth
        var waveColor = (j === 0) ? deepWater : shallowWater; // Assign color based on depth
        var waveOffset = (j === 0) ? 0 : -30; // Slightly raise shallow waves
        var waveStrength = (j === 0) ? 0.15 : 0.2; // Increase movement for shallow waves
        fill(waveColor, 200); // Apply color with transparency
        beginShape(); // Begin drawing the wave shape
        for (var i = 0; i < width; i++) {
            // Generate a noise-based offset for natural wave variation
            var noiseOffset = noise(i * coastRange + prog * (1.2 + j * 0.5)) * (30 + j * 10); 
            
            // Create sine wave motion influenced by energy level and wave strength
            var sineWave = sin((i * 0.02) + (frameCount * 0.015 * (1 + j))) * energy * waveStrength;
            // Calculate final Y position of the wave vertex
            var yPosition = baseHeight + waveOffset + noiseOffset + sineWave;
            // Define the vertex for the wave shape
            vertex(i, yPosition);
        }
        // Complete the shape by extending it to the bottom of the canvas
        vertex(width, height);
        vertex(0, height);
        endShape(CLOSE); // Close the shape to form a filled wave
		}
		// Smooth wave motion by gradually increasing progression value
		if (sound.isPlaying()) {
			prog += 0.005;
		}
	};
}


