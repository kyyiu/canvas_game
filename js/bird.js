(function(){
	let bird = function(){
		this.x = 100
		this.y = 100
		this.a = 1
		this.rotate = 0
		this.img = [game.R['bird0_0'],game.R['bird0_1'],game.R['bird0_2']]
		this.status = 'drop'
		this.wing = 0
	}
	bird.prototype.update = function(){
		if (this.status=='drop'){
			this.a += 0.2
			this.y+=this.a
			this.rotate+=0.1
		}else if (this.status =='up'){
			this.a -= 0.2
			if (this.a <=0){
				this.status ='drop'
				return
			}
			this.y -= this.a
			this.y<24?this.y=24:null,
			this.wing++
			this.wing>2?this.wing=0:null
		}
		this.x1 = this.x -17
		this.x2 = this.x +17
		this.y1 = this.y-12
		this.y2 = this.y+12
		//落地检测
		if(this.y>game.cavas.height-112){
			game.sM.enter(3)
			game.sence=3
		}
		
	}
	bird.prototype.render = function(){
		// save：用来保存Canvas的状态。save之后，
		// 可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。 
		// restore：用来恢复Canvas之前保存的状态。
		// 防止save后对Canvas执行的操作对后续的绘制有影响。
		game.draw.save()
		//平移画布,相当于将原来的坐标轴平移了
		game.draw.translate(this.x,this.y)
		// 以新坐标为中心旋转
		game.draw.rotate(this.rotate)
		game.draw.drawImage(this.img[this.wing],-24,-24)
		game.draw.restore()//重置画布坐标位置
	}
	bird.prototype.fly = function(){
		this.status='up'
		this.rotate = -1.2
		this.a = 4
	}
	window.Bird = bird
})()