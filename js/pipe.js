(function(){
	let pipe = function(){
		//round() 方法可把一个数字舍入为最接近的整数：四舍五入
		// +100 保证至少有100
		this.pup = Math.round(Math.random()*220+100)
		this.space = 140
		this.pdown = game.cavas.height-112-this.pup-this.space
		this.x =  game.cavas.width
		this.done = false
		//每创建一个实例管子,放在这里
		game.pipeArr.push(this)
		
	}
	pipe.prototype.update = function(){
		this.x--
		//一旦走出画布,直接移除
		if (this.x<=-52){
			for(let i =0;i<game.pipeArr.length;i++){
				if (game.pipeArr[i]==this){
					game.pipeArr.splice(i,1)
					// i--
					break
				}
			}
		}
		this.x1 = this.x
		this.x2 = this.x+52//x1~x2管子的横向距离
		this.y1 = this.pup//上管子的左边界
		this.y2 = this.pup+this.space//下管子边界
		//不用考虑管子右边,因为鸟不能后退
		//碰撞检测！
		//鸟的x2 > 管子的x1 && 鸟的y1 < 管子.y1 && 鸟的x1 <  管子的x2
		//鸟的x2 > 管子的x1 && 鸟的y2 > 管子.y2 && 鸟的x1 <  管子的x2
		if((game.bird.x2>this.x1&&game.bird.y1<this.y1&&game.bird.x1<this.x2)||(game.bird.x2>this.x1&&game.bird.y2>this.y2&&game.bird.x1<this.x2)){
			game.sM.enter(3)
			game.sence=3
		}
		//加分检测
		if (!this.done && game.bird.x1>this.x2){
			game.score++
			this.done = true
		}
	}
	
	
	
	pipe.prototype.render = function(){
		game.draw.drawImage(game.R['pipe_down'],0,320-this.pup,52,this.pup,this.x,0,52,this.pup)
		game.draw.drawImage(game.R['pipe_up'],0,0,52,this.pdown,this.x,game.cavas.height-112-this.pdown,52,this.pdown)
	}
	window.Pipe = pipe
})()