class LevelIcon extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/LevelIcon.exml";//这里如果不指定就会出现构建错误。
		this.imgGuankadi.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toGame,this);
	}

	private  bitlabel_levelIndex:eui.BitmapLabel;
	private  imgLock:eui.Image;
	private  isCanTouch:boolean = false;
	public   imgGuankadi:eui.Image;

	private toGame()
	{
		egret.Tween.get(this.imgGuankadi).to({scaleX:0.8,scaleY:0.8},100).to({scaleX:1,scaleY:1});
		let index = parseInt(this.bitlabel_levelIndex.text);
		if(index < LevelDataManager.getInstance().GetMileStone())//只能在前往小于最远关卡
		{
			this.setLevelIndex(false);
			LevelDataManager.getInstance().curIcon = index;
			SceneGame.getInstance().InitLevel(index);//进入对应关卡游戏
			//界面消失
			SceneGame.getInstance().levelScene.visible = false;	
		}
	}

	public set Level(value: number) {//初始化数字。
		this.bitlabel_levelIndex.text = value.toString();
	}

	public get Level() {
		return parseInt(this.bitlabel_levelIndex.text);
	}
	public setLevelIndex(status:boolean)
	{
		this.isCanTouch = !status;
		if(this.isCanTouch)
		{
			this.touchEnabled = !status;
		}
		this.imgLock.visible = status;//锁
		this.bitlabel_levelIndex.visible = !status;
		
		
	}
	
}

window["LevelIcon"] = LevelIcon;