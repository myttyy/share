class SceneGame extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	// this.skinName =  "resource/eui_skins/SceneGame.exml"
	}
	private static scenegame:SceneGame;
	// private s:string;
	public static getInstance()//静态函数只能访问静态属性，能用this。
	{
		if(SceneGame.scenegame == null)
		{
			SceneGame.scenegame = new SceneGame();
		}
	
		return  SceneGame.scenegame;
	}

	public bingoLayer:Bingo;//层
	public levelScene:LevelScene;//关卡层。
	public labelLevel:eui.Label;//当前关卡数显示
	public gameBg:eui.Image;
	public group_Help:eui.Group;
	public btn_Level:eui.Button;
	public btn_result:eui.Button;
	public label_Question:eui.Label;
	public group_Result:eui.Group;
	public group_Chaotic:eui.Group;
	public levelIndex:number;//当前的关卡数
	
 	public InitLevel(index:number)//初始化关卡
	 {
		 this.levelIndex = index;
		 this.labelLevel.text =  this.levelIndex.toString();
		 let levelData = LevelDataManager.getInstance().GetLevelData(index);//得到关卡数据
		 //将字段接起来
		 //要展示的数据
		 let showData = levelData.chaotic;
		 //对字段重新排列
		 let wordList:string[] = [];//["","",]代表这是字符串数组。
		 for(let i = 0;i < showData.length;i++)
		 {
			 wordList.push(showData.charAt(i));
		 }
		//  wordList = this.randomList(wordList);

		 //内容区域赋值
		 for(let i = 0; i < this.group_Chaotic.numChildren - 1; i++)
		 {
			 let wordRect = <Word>this.group_Chaotic.getChildAt(i);
			 wordRect.SetWordText(wordList[i]);
			 wordRect.visible = true;
		 }

		 //添加答案区
		this.group_Result.removeChildren();
		let len = levelData.result.length;
		while(len)
		{
			let temp = new AnswerWord();
			this.group_Result.addChild(temp);
			len--;
		}

		 //答案区域重置一些状态
		 for(let i = 0; i < this.group_Result.numChildren; i++)
		 {
			 let answerRect = <AnswerWord>this.group_Result.getChildAt(i);
			 answerRect.visible = true;
			 answerRect.SetSelectWord(null);
			 answerRect.selectWord = null;
		 }
		 
		 //显示问题
		 this.label_Question.text = levelData.question; 
	 }
	 private randomList(list:any[]):any[]
	 {
		 let arr = [];
		 while(list.length > 0)
		 {
			 let i = Math.floor(Math.random()*list.length);
			 arr.push(list[i]);
			 list.splice(i,1);//删除i位置
		 }
		 return arr;
	 }
	 //点击字块发生逻辑  由当前字自己抛出
	 public onclick_Word(word:Word)
	 {
		 //找到一个合适的位置
		 let rect:AnswerWord = null;
		 for(let i = 0; i < this.group_Result.numChildren;i++)
		 {
			 let temp = <AnswerWord>this.group_Result.getChildAt(i);
			 if(temp.selectWord == null)
			 {
				 rect = temp;//此时赋值后rect代表空的那个答案字块
				 break;
			 }
		 }

		 //找到位置后填充
		 if(rect != null)
		 {
			 rect.SetSelectWord(word);//字显示
			 //判断是否胜利
			 let str:string = "";
			 for(let i = 0;i < this.group_Result.numChildren; i++)
			 {
				 let answer = <AnswerWord>this.group_Result.getChildAt(i);
				 str += answer.GetWordText();
			 }
			 if(str == LevelDataManager.getInstance().GetLevelData(this.levelIndex).result)
			 {
				 console.log("你赢了");
				  this.bingoLayer.visible = true;
				  this.bingoLayer.bingoGroup.visible = true;
				  this.hintBg(false);
				  SoundManager.getInstance().trueSoundChanel= SoundManager.getInstance().trueSound.play(0,1);
				  SoundManager.getInstance().trueSoundChanel.volume = 1;
				 
			 }
			 else if(str.length == this.group_Result.numChildren )
			 {
				 console.log("you lose")
				 this.bingoLayer.visible = true;
				 this.bingoLayer.bg.touchEnabled = true;
				 this.hintBg(true);
				 this.bingoLayer.imgErro.visible = true;
				 SoundManager.getInstance().erroSoundChanel = SoundManager.getInstance().erroSound.play(0,1);
				 SoundManager.getInstance().erroSoundChanel.volume = 1;
			 }
		 }
	 }
		public hintBg(isCan)
		{
			if(isCan == true)
			{
			 this.bingoLayer.bg.touchEnabled = isCan;
			 this.bingoLayer.bg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bgTouch,this);
			}
			else if(isCan == false)
			{
		     this.bingoLayer.bg.touchEnabled = isCan;
			 this.bingoLayer.bg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.bgTouch,this);
			}
			
			
		}
		private bgTouch()
		{
			console.log("haha");
			egret.Tween.get(this.bingoLayer.groupAll).to({scaleX:1.5,scaleY:1.5},100).to({scaleX:1,scaleY:1},100)
			.call(()=>{
				this.bingoLayer.visible = false;
				this.bingoLayer.bingoGroup.visible = false;
				this.bingoLayer.trueGroup.visible = false;
				this.bingoLayer.imgErro.visible = false;
				this.bingoLayer.daandi.visible = false;
				this.bingoLayer.upgradeGroup.visible = false;
				this.bingoLayer.erroGroup.visible = false;
			});
			
		}
	
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.btn_result.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showResult,this);
		this.btn_Level.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLevel,this);
	}
	private onLevel()
	{
		SoundManager.getInstance().answerSoundChanel =  SoundManager.getInstance().answerSound.play(0,1);
		SoundManager.getInstance().answerSoundChanel.volume = 1;
		this.levelScene.showLevelIcon(LevelDataManager.getInstance().GetMileStone());
		this.levelScene.visible = true;		
	}


	private  showResult(event:egret.TouchEvent)
	{
		egret.Tween.get(event.currentTarget).to({scaleX:1.2,scaleY:1.2},100).
		to({scaleX:1,scaleY:1},100);
		platform.updateShareMenu();
		// if(LevelDataManager.isShare == true)
		// {
		// 	platform.updateShareMenu();
		// }
		// else if(LevelDataManager.isShare == false)
		// {
		//   SoundManager.getInstance().windowSoundChanel = SoundManager.getInstance().windowSound.play(0, 1);
        //   SoundManager.getInstance().windowSoundChanel.volume = 1;
        //   SceneGame.getInstance().bingoLayer.visible = true;
        //   SceneGame.getInstance().bingoLayer.trueGroup.visible = true;
        //   SceneGame.getInstance().bingoLayer.daandi.visible = true;
        //   SceneGame.getInstance().hintBg(true);
        //   SceneGame.getInstance().bingoLayer.labelresult.text =
        //   LevelDataManager.getInstance().GetLevelData(LevelDataManager.getInstance().curIcon).result;
        //   SceneGame.getInstance().bingoLayer.labelExplain.text = "解释:   " +
        //   LevelDataManager.getInstance().GetLevelData(LevelDataManager.getInstance().curIcon).explain + "   ";
        //   console.log("result" + LevelDataManager.getInstance().GetLevelData(LevelDataManager.getInstance().curIcon).result);
		// }
		
		
	}
}

window["SceneGame"] = SceneGame;