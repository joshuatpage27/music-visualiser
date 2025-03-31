function RidgePlots(){
	//vis name
	this.name = "RidgePlots";
	this.startX = width/5;
	this.endY = height/5;
	this.startY = height - this.endY;
	this.spectrumWidth = (width/5)*3;
	var output = [];
	var speed = 0.7;
	var isOver = false;
	//function to iterate waves accross the screen
    this.addWave = function() {
	output.push([{x: this.startX, y: this.startY}, {x: this.startX + this.spectrumWidth, y: this.startY}]);
	
	var w = fourier.waveform();
	var outputWave = [];
	var smallScale = 3;
	var bigScale = 40;
	
	for(var i = 0; i < w.length; i++){
		if(i % 20 == 0){
			var x = map(i, 0, 1024, this.startX, this.startX + this.spectrumWidth);
			if(i < 1024*0.25 || i > 1024*0.75){
				var y = map(w[i], -1, 1, - smallScale, smallScale)
				outputWave.push({
					x: x,
					y: this.startY + y
				})
			}
			else {
				var y = map(w[i], -1, 1, -bigScale, bigScale)
				outputWave.push({
					x: x,
					y: this.startY + y
				})
			}
		}
	}
	output.push(outputWave);
}
//MY CODE: function to add a rainbow effect by randomising the stroke weight when mouse hovers over the graphic.
	this.mouseHover = function(){
	if(mouseX >= this.startX && mouseX <= this.startX + this.spectrumWidth && mouseY >= this.endY && mouseY <= this.startY)
		{
		isOver = true;
		}else{
		isOver = false;
		}
}
	//draw the wave form to the screen
	this.draw = function() {
		//If statement to randomise the stroke color and create a rainbow effect, if the mouse is hovering over the graphic.
		if(isOver == true){ stroke(random(0,255),random(0,255),random(0,255));
		} else {
		stroke(255);
		}
	    background(0);
	    strokeWeight(2);
	    if(frameCount % 10 == 0){
		this.addWave();
	   }
	
	   for(var i = 0; i < output.length; i++){
	   var o = output[i];
		beginShape()
	   for(var j = 0; j < o.length; j++){
			o[j].y -= speed;
			vertex(o[j].x, o[j].y);
		}
		//MY CODE: variable that changes the gradient colour of blue as the waves are drawn and rise up the screen.
		var blue = i;
		fill(0,0,blue);
		endShape()
		if(o[0].y < this.endY){
			output.splice(i, 1);
		}
	 }
		//MY CODE; Here i will call the mouse hover function
		this.mouseHover();
  }
}