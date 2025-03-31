/* The Yoyo Visualization simulates pendulums (yo-yos) swinging, increasing and decreasing in size based on bass energy from the music. I have taken ispiration from the following places to create this code: mathworks.com
 //https://www.mathworks.com/help/symbolic/simulate-physics-pendulum-swing.htmlOpens
 https://www.youtube.com/watch?v=NBWMtlbbOag*/
function Yoyo(){
  this.name = "Yoyo";
  // Array to store multiple pendulums
  this.pendulums = []; 
  // Number of pendulums to create
  this.numPendulums = 3; 
  var teather = 400;
	//Some downward force is needed to create swing
  var gravity = 1;
	// Flag to check if music is playing
  var musicPlaying = false; 
	// Speed at which the inner circles spin
  var spinSpeed = 0.05; 
	// Starting angle for the spinning effect
  var baseAngle = 0; 

  // Create multiple Pendulum objects within the constructor
  for (var i = 0; i < this.numPendulums; i++) {
    var pendulum = {
      angleAcc: 0,
      angleVel: 0,
      // Set the initial angle to be a bit to the right (near the right side of the arc)
      angle: Math.PI / 6 + i * Math.PI / 12, // Start at a different initial angle for each pendulum
    };
    this.pendulums.push(pendulum); // Add each pendulum to the array
  }

  // Method to update and draw all pendulums
  this.draw = function() {
    // Analyze FFT data
    fourier.analyze();
    var bass = fourier.getEnergy("bass");

    // Check if music is playing based on bass energy (threshold is adjustable)
    if (bass > 1) { // You can adjust the threshold based on the bass energy level
      if (!musicPlaying) {
        musicPlaying = true; // Set the flag to true once music starts playing
        console.log("Music started!");
      }
    } else {
      if (musicPlaying) {
        musicPlaying = false; // Set the flag to false if the bass energy is low (no music)
        console.log("Music stopped.");
      }
    }

    // If music is playing, move the pendulums
    if (musicPlaying) {
      // Loop through each pendulum in the array
      for (var i = 0; i < this.pendulums.length; i++) {
        var p = this.pendulums[i]; // Get the current pendulum

        // Pendulum physics calculations
        p.angleAcc = -gravity / teather * Math.sin(p.angle);
        p.angleVel += p.angleAcc;
        p.angle += p.angleVel;
        // Limit the pendulum's maximum and minimum angles to prevent it from going off-screen
        p.angle = constrain(p.angle, -Math.PI / 2, Math.PI / 2);

        // Calculate the position of the pendulum bob
        var x = teather * Math.sin(p.angle);
        var y = teather * Math.cos(p.angle);

        // Drawing the pendulum
        push();
        var b = fourier.getEnergy("bass");
        var t = fourier.getEnergy("treble");
        translate(width / 2, 0); // Set origin to center of the canvas
       
        stroke(255);
        strokeWeight(1);
		  //draw the teather from the centre to the yoyo
		line(0,0,x,y);
	    noStroke();
		// Map bass energy to the green, red, and blue channels for a green to purple to blue gradient
          var green = map(t, 0, 255, 255, 0); // Green: starts high (green) and decreases
      
          var blue = map(b, 0, 225, 100, 225); // Blue: stays constant high (toward blue)
	    fill(0,blue,0, 50);
        // Draw the main yoy with bass energy effecting the size
        ellipse(x, y, 10 + b / 2); 
        // Now, add the inner spinning circles inside the main bob
        var numCircles = 50; //Number of smaller circles
        var radius = 10 + b / 3; // Use the size of the main bob to determine how far in the smaller circles are
        // Loop to draw the smaller circles inside the main bob
        for (var j = 0; j < numCircles; j++) {
          var angleStep = Math.PI * 2 / numCircles;
          var angleOffset = j * angleStep + baseAngle; // Add baseAngle for spinning effect
          // Calculate the small circles' position relative to the main bob's position
          var smallX = x + radius * Math.cos(angleOffset); // X position of the small circle
          var smallY = y + radius * Math.sin(angleOffset); // Y position of the small circle
          // Draw a smaller circle with the mapped color (green to purple to blue)
          fill(0, green, blue, 50); // Use green, red, and blue for the color transition
          ellipse(smallX, smallY, 5 + b / 8); // Draw smaller circle
        }

        pop();
      }
    }
    // Update the base angle for spinning effect
    baseAngle += spinSpeed; // Increment the base angle to keep the smaller circles spinning
  };
}
