(function(){
	let land = function(){
		this.x = 0
		this.w = 336
		this.h = 112
		this.step = 1
	}
	window.Land = land
	land.prototype.update = function(){
		this.x -= this.step
		if (this.x <= -this.w){
			this.x = 0
		}
	}
	land.prototype.render = function(){
		game.draw.drawImage(game.R['land'],this.x,game.cavas.height-this.h)
		game.draw.drawImage(game.R['land'],this.x+this.w,game.cavas.height-this.h)
		game.draw.drawImage(game.R['land'],this.x+this.w*2,game.cavas.height-this.h)
	}
})()