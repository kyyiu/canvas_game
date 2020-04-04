(function(){
	let sceneManager = function(){
		this.bindEvent()
	}
	sceneManager.prototype.enter = function(num){
		switch(num){
			case 0:
			this.titleY = 0
			this.buttonY =  game.cavas.height
			this.bird0 = 280
			this.flag = 3
				break;
			case 1:
				game.sence =1
				this.tutoriaAlpha = 0.5
				this.alphaFlag = 0.05
				break
			case 2:
				game.score = 0
				game.sence = 2
				game.bg = new Background()
				game.land = new Land()
				game.bird = new Bird()
				break
			case 3:
				game.sence=3
				this.isexplosion = false
				this.explosionIndex = 0
				break
			case 4:
				game.sence=4
				// 没有gameover图片
				// this.gameoverY=0
				this.score_panelY=game.cavas.height
				let scoreArr =  JSON.parse(localStorage.getItem('FB'))
				//return a-b 从小到大,b-a从大到小
				scoreArr.sort((a,b)=>b-a)
				//现在的成绩和前三个比较
				this.beast = scoreArr[0]
				if(game.score>scoreArr[0]){
					this.model = 'medals_1'
					this.best = game.score
				}else if(game.score>scoreArr[1]){
					this.model = 'medals_2'
				}else if (game.score>scoreArr[2]){
					this.model = 'medals_3'
				}else{
					this.model = 'medals_0'
				}
				if(!scoreArr.includes(game.score)){
					scoreArr.push(game.score)
				}
				localStorage.setItem('FB',JSON.stringify(scoreArr))
				break
		}
	}
	sceneManager.prototype.updateAndRender = function(){
		switch(game.sence){
			case 0:
				game.draw.fillStyle = '#4ec0ca'	
				game.draw.fillRect(0,0,game.cavas.width,game.cavas.height)
				game.draw.drawImage(game.R['bg_day'],0,game.cavas.height-512)
				game.draw.drawImage(game.R['bg_day'],288,game.cavas.height-512)
				game.draw.drawImage(game.R['land'],0,game.cavas.height-112)
				game.draw.drawImage(game.R['land'],336,game.cavas.height-112)
				this.titleY += 5
				this.buttonY -= 5
				this.titleY>160?this.titleY= 160:this.titleY+=0,
				this.buttonY<370?this.buttonY=370:this.buttonY-=0
				game.draw.drawImage(game.R['title'],(game.cavas.width-178)/2,this.titleY)
				game.draw.drawImage(game.R['button_play'],(game.cavas.width-116)/2,this.buttonY)
				if (this.bird0 <=200 || this.bird0>=330){
					this.flag *= -1
				}
				this.bird0 += this.flag
				game.draw.drawImage(game.R['bird0_0'],(game.cavas.width-48)/2,this.bird0)
				
				break;
			case 1:
				game.draw.fillStyle = '#4ec0ca'
				game.draw.fillRect(0,0,game.cavas.width,game.cavas.height)
				game.draw.drawImage(game.R['bg_day'],0,game.cavas.height-512)
				game.draw.drawImage(game.R['bg_day'],288,game.cavas.height-512)
				game.draw.drawImage(game.R['land'],0,game.cavas.height-112)
				game.draw.drawImage(game.R['land'],336,game.cavas.height-112)
				game.draw.drawImage(game.R['bird0_0'],(game.cavas.width-48)/2,150)
				if (this.tutoriaAlpha<0.1 || this.tutoriaAlpha>0.9){
					this.alphaFlag*=-1
				}
				this.tutoriaAlpha+=this.alphaFlag
				//闪烁效果
				game.draw.save()
				game.draw.globalAlpha = this.tutoriaAlpha
				game.draw.drawImage(game.R['tutorial'],(game.cavas.width-114)/2,250)
				game.draw.restore()
				break
			case 2:
				game.bg.update()
				game.bg.render()
				game.land.update()
				game.land.render()
				game.bird.update()
				game.bird.render()
				game.c%200==0?new Pipe():null,
				game.pipeArr.forEach((item) =>{
					item.update()
					item.render()
				})
				scoreRender()
				break
			case 3:
				game.bg.render()
				game.land.render()
				
				for(let i = 0;i<game.pipeArr.length;i++){
					game.pipeArr[i].render()
				}
				if(this.isexplosion){
					this.explosionIndex++
					this.explosionIndex>=9?this.enter(4):null
					game.draw.drawImage(game.R['baozha'+this.explosionIndex],game.bird.x,game.bird.y,100,100)
				}else{
					game.bird.y+=5
					if(game.cavas.height-112<=game.bird.y){
						game.bird.y = game.cavas.height-112
						this.isexplosion=true
					}
					game.bird.render()
				}
				break
			case 4:
				game.bg.render()
				game.land.render()
				
				for(let i = 0;i<game.pipeArr.length;i++){
					game.pipeArr[i].render()
				}
				// this.gameoverY+=5
				this.score_panelY -= 10
				// this.gameoverY>=200?this.gameoverY=200:null,
				this.score_panelY<=270?this.score_panelY=270:null
				// game.draw.drawImage(game.R['game_over'],(game.cavas.width-204)/2,this.gameoverY)
				game.draw.drawImage(game.R['score_panel'],(game.cavas.width-238)/2,this.score_panelY)
				
				break
		}
	}
	sceneManager.prototype.bindEvent = function(){
		game.cavas.onclick = (e)=>{
			switch (game.sence){
				case 0:
				if(e.clientY>this.buttonY && e.clientY<this.buttonY+70&&e.clientX>game.cavas.width/2-58&&e.clientX<game.cavas.width+58){
					this.enter(1)
					game.sence = 1
				}
				break
				case 1:
					this.enter(2)
					break
				case 2:
					game.bird.fly()
					break
			}
		}
	}
	
	function scoreRender(){
		let score = game.score.toString()
		let centerLine = game.cavas.width/2-(score.length)/2*30
		for (let i = 0; i<score.length;i++){
			game.draw.drawImage(game.R['shuzi'+score[i]],centerLine+i*30,100)
		}
	}
	window.SceneManager = sceneManager
})()