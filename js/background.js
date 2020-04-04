(function(){
	let background = function(){
		this.x = 0
		this.w = 288
		this.h = 512
		this.step = 1
	}
	window.Background = background
	background.prototype.update=function(){
		this.x -= this.step
		if (this.x <= -this.w){
			this.x = 0
		}
	}
	background.prototype.render = function(){
		game.draw.drawImage(game.R['bg_day'],this.x,game.cavas.height-this.h)
		game.draw.drawImage(game.R['bg_day'],this.x+this.w,game.cavas.height-this.h)
		game.draw.drawImage(game.R['bg_day'],this.x+this.w*2,game.cavas.height-this.h)
		game.draw.fillStyle = "#4ec0ca"
		game.draw.fillRect(0,0,game.cavas.width,game.cavas.height-this.h)
	}
})()