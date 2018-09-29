var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelDataItem = (function () {
    function LevelDataItem() {
    }
    return LevelDataItem;
}());
__reflect(LevelDataItem.prototype, "LevelDataItem");
var LevelDataManager = (function () {
    function LevelDataManager() {
        this.curIcon = 1;
        this.curIndex = 0; //当前段位
        //关卡数据的数据组
        this.levelDataItemList = [];
        //使用RES读取和构建JSON数据。Json数据可以直接解析到目标结构
        this.levelDataItemList = RES.getRes("test_json");
    }
    ; //当前关卡
    LevelDataManager.getInstance = function () {
        if (LevelDataManager.levelDataManager == null) {
            LevelDataManager.levelDataManager = new LevelDataManager();
        }
        return LevelDataManager.levelDataManager;
    };
    //通过关卡号获取数据
    LevelDataManager.prototype.GetLevelData = function (level) {
        if (level < 0) {
            console.log("关卡<0");
            return;
        }
        if (level >= this.levelDataItemList.length) {
            level = this.levelDataItemList.length - 1;
        }
        return this.levelDataItemList[level];
    };
    //获取当前游戏的最远进度
    LevelDataManager.prototype.GetMileStone = function () {
        var milestone = egret.localStorage.getItem("MAX_MILESTONE");
        if (milestone == "" || milestone == null) {
            milestone = "1";
        }
        return parseInt(milestone);
    };
    //设置当前游戏最远进度
    LevelDataManager.prototype.SetMileStone = function (index) {
        egret.localStorage.setItem("MAX_MILESTONE", index.toString());
    };
    LevelDataManager.tempIndex = 0; //当前页面
    LevelDataManager.isShare = false;
    LevelDataManager.isLogin = true;
    return LevelDataManager;
}());
__reflect(LevelDataManager //关卡数据管理 
.prototype, "LevelDataManager");
window["LevelDataItem"] = LevelDataItem;
window["LevelDataManager"] = LevelDataManager;
