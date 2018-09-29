// TypeScript file
class PlayerData
{
   
    private static playerData:PlayerData;
    public static getInstance()
    {
        if(PlayerData.playerData == null)
        {
            PlayerData.playerData = new PlayerData();
        }
        return PlayerData.playerData;
    }
    public setMaxIndex(max:number)
    {
        // 	//保存进度
		// egret.localStorage.setItem("MaxLength",max.toString());
		// PlayerData.getInstance().maxIndex = max;
        // PlayerData.getInstance().curIcon = max;
    }
    public getMaxIndex()
    {
        let max = egret.localStorage.getItem("MaxLength");
        return max;
    }
}