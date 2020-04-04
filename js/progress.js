let Progress = function(draw,x,y,w,h){
	// 因为这里拿不到画布,所以需要传入
	this.draw = draw
	this.x = x
	this.y = y
	this.w = w
	this.h = h
}

Progress.prototype.update = function(w){
	this.w = w
}
Progress.prototype.render = function(){
	this.draw.fillStyle = 'yellow'
	this.draw.fillRect(this.x,this.y,this.w,this.h)
}