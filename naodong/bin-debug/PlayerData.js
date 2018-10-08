var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var PlayerData = (function () {
    function PlayerData() {
    }
    PlayerData.getInstance = function () {
        if (PlayerData.playerData == null) {
            PlayerData.playerData = new PlayerData();
        }
        return PlayerData.playerData;
    };
    PlayerData.prototype.setMaxIndex = function (max) {
        // 	//保存进度
        // egret.localStorage.setItem("MaxLength",max.toString());
        // PlayerData.getInstance().maxIndex = max;
        // PlayerData.getInstance().curIcon = max;
    };
    PlayerData.prototype.getMaxIndex = function () {
        var max = egret.localStorage.getItem("MaxLength");
        return max;
    };
    return PlayerData;
}());
__reflect(PlayerData.prototype, "PlayerData");
//# sourceMappingURL=PlayerData.js.map