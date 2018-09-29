class  LevelDataItem
{
    public result:string;//答案
    public question:string;//题目
    public chaotic:string;//选择内容  固定14
    public explain:string;
}

class LevelDataManager//关卡数据管理 
{
    private static levelDataManager:LevelDataManager;
    public   curIcon:number = 1;;//当前关卡
    public   curIndex:number = 0;//当前段位
    public   static tempIndex = 0;//当前页面
    public   static isShare:boolean = false;
    public   static isLogin:boolean = true;


    public  static encryptedData:any;
    public  static iv:any;
    public  static openId:any;
    public  static sessionKey:any;
    public static getInstance()
    {
        if(LevelDataManager.levelDataManager == null)
        {
            LevelDataManager.levelDataManager = new LevelDataManager();
        }
        return LevelDataManager.levelDataManager;
    }

   
    //关卡数据的数据组
    private levelDataItemList:LevelDataItem[] = [];

    public constructor()
    {
        //使用RES读取和构建JSON数据。Json数据可以直接解析到目标结构
        this.levelDataItemList = RES.getRes("test_json");
    }

    //通过关卡号获取数据
    public GetLevelData(level):LevelDataItem
    {
        if(level < 0)
        {
            console.log("关卡<0");
            return ;
        }
        
        if(level >= this.levelDataItemList.length)
        {
            level = this.levelDataItemList.length - 1;
        }
        return this.levelDataItemList[level];
    }

    //获取当前游戏的最远进度
    public GetMileStone():number
    {
        let milestone = egret.localStorage.getItem("MAX_MILESTONE");
        if(milestone == "" || milestone == null)
        {
            milestone = "1";
        }
        return parseInt(milestone);
    }

    //设置当前游戏最远进度
    public SetMileStone(index:number)
    {
        egret.localStorage.setItem("MAX_MILESTONE",index.toString());
    }
}

window["LevelDataItem"] = LevelDataItem;
window["LevelDataManager"] = LevelDataManager;