;(function(){
	let Game = window.Game = function(){
		let canvas = this.cavas = document.querySelector('#ca')
		this.draw = canvas.getContext('2d')
		// 获取一屏的宽高
		let w = document.documentElement.clientWidth;
		let h = document.documentElement.clientHeight;
		this.pipeArr = []//放管子
		canvas.width = w>420?420:w
		canvas.height = h>750?750:h,
		// this.bindEvent()
		this.sence = 0//场景编号
		this.score = 0
		//设置浏览器存储分数
		//localStorage.setItem('属性名','属性值必须是字符串')
		if(!localStorage.getItem('FB')){
			localStorage.setItem('FB','[]')
		}
		// else{
		// 	let a = JSON.parse(localStorage.getItem('FB'))
		// 	a.push()
		// 	localStorage.setItem('FB',JSON.stringify(a))
		// }
		this.R = {"bg_day": "./componet/flappybird/bg_day.png",
				  "land" : "./componet/flappybird/land.png",
				  "pipe_down" : "./componet/flappybird/pipe_down.png",
				  "pipe_up" : "./componet/flappybird/pipe_up.png",
				  "bird0_0" : "./componet/flappybird/bird0_0.png",
				  "bird0_1" : "./componet/flappybird/bird0_1.png",
				  "bird0_2" : "./componet/flappybird/bird0_2.png",
				  "title" : "./componet/flappybird/title.png",
				  "button_play" : "./componet/flappybird/button_play.png",
				  "tutorial" : "./componet/flappybird/tutorial.png",
				  "shuzi0" : "./componet/flappybird/font_048.png",
				  "shuzi1" : "./componet/flappybird/font_049.png",
				  "shuzi2" : "./componet/flappybird/font_050.png",
				  "shuzi3" : "./componet/flappybird/font_051.png",
				  "shuzi4" : "./componet/flappybird/font_052.png",
				  "shuzi5" : "./componet/flappybird/font_053.png",
				  "shuzi6" : "./componet/flappybird/font_054.png",
				  "shuzi7" : "./componet/flappybird/font_055.png",
				  "shuzi8" : "./componet/flappybird/font_056.png",
				  "shuzi9" : "./componet/flappybird/font_057.png",
				  "baozha1" : "./componet/flappybird/1.png",
				  "baozha2" : "./componet/flappybird/2.png",
				  "baozha3" : "./componet/flappybird/3.png",
				  "baozha4" : "./componet/flappybird/4.png",
				  "baozha5" : "./componet/flappybird/5.png",
				  "baozha6" : "./componet/flappybird/6.png",
				  "baozha7" : "./componet/flappybird/7.png",
				  "baozha8" : "./componet/flappybird/8.png",
				  "baozha9" : "./componet/flappybird/9.png",
				  "text_game_over" : "./componet/flappybird/text_game_over.png",
				  "score_panel" : "./componet/flappybird/score_panel.png",
				  "medals_0" : "./componet/flappybird/medals_0.png",
				  "medals_1" : "./componet/flappybird/medals_1.png",
				  "medals_2" : "./componet/flappybird/medals_2.png",
				  "medals_3" : "./componet/flappybird/medals_3.png",}
		
		let progress = new Progress(this.draw,canvas.width/2-150,canvas.height/3,0,30)
		let count = 0//统计加载完成的图片个数
		let total = Object.keys(this.R).length//所有图片个数
		// 遍历对象判断图片是否加载完成
		for (let key in this.R){
			//只要图片的onload事件触发说明这张图片加载成功
			
			((src) =>{
				this.R[key] = new Image()
				this.R[key].src = src
				//箭头函数指向上一个实例
				this.R[key].onload= ()=>{
					count++
					this.clear()
					progress.update(count/total*300)
					progress.render()
					// 当图片完成加载,游戏开始
					if (count == total){
						this.start()
					}
				}
			})(this.R[key])
			
			
		}
	};
	Game.prototype.clear = function(){
		this.draw.clearRect(0,0,this.cavas.width,this.cavas.height)
	};
	Game.prototype.start = function(){
		//先清理上一瓶
		this.clear()
		this.bg = new Background()
		this.land = new Land()
		this.bird = new Bird()
		new Pipe()
		this.c = 0
		this.sM = new SceneManager()
		//默认进入欢迎界面
		this.sM.enter(1)
		this.timer = setInterval(()=>{
			//注意顺序,先画的会被后画的覆盖
			this.c++
			this.clear()
			this.sM.updateAndRender()
			// this.bg.update()
			// this.bg.render()
			// this.land.update()
			// this.land.render()
			// this.bird.update()
			// this.bird.render()
			// // 将pipeArr中存放的每一组管子更新渲染
			// this.pipeArr.forEach((item)=>{
			// 	item.update()
			// 	item.render()
			// })
			// this.c %200===0&&new Pipe()
		},20)
	}
	Game.prototype.bindEvent = function(){
		this.cavas.onclick =()=>{
			this.bird.fly()
		}
	}
	
	
})();