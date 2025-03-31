function Firework(colour, x, y) {
    this.depleted = false;
    this.particles = [];
    var numParticles = 100;
    var angleStep = 10;
    var growthRate = 1.5;
    var spiralTightness = 5; // Controls how tight the spiral is

    for (var i = 0; i < numParticles; i++) {
        var angle = i * angleStep + random(-5, 5); // Adds slight randomness to make it more realistic
        var radius = spiralTightness * sqrt(i) * growthRate; // Spiral effect
        var speed = random(1, 3);

        var px = x + radius * cos(radians(angle));
        var py = y + radius * sin(radians(angle));

        this.particles.push(new Particle(px, py, colour, angle, speed));
    }

    this.draw = function() {
        push(); // Isolate transformations
        for (var i = this.particles.length - 1; i >= 0; i--) {
            var p = this.particles[i];
            p.update();
            p.draw();

            // Remove faded or shrunken particles
            if (p.lifespan <= 0 || p.size < 1) {
                this.particles.splice(i, 1);
            }
        }
        pop(); 
        // Deplet if no particles remain
        if (this.particles.length === 0) {
            this.depleted = true;
        }
    };
}
