var { Query, User } = AV;
class WeChatPlatform implements Platform {

    /**
     * 构造函数
     */
    public constructor() {
        this._init();
    }
    
    /**
     * 平台初始化
     */
    private _init() : void {
 
    }
    
   public async shareCloud():Promise<any>
    {
        return new Promise(async function (resolve, reject) {
            AV.Cloud.run('conf').then(function (data) {
                //成功逻辑
                console.log("开关开启，分享开启" + data.share);
                if (data.share == true) {
                    // SceneGame.getInstance().bingoLayer.btn_share.visible = true;
                    LevelDataManager.isShare = true;
                }
                else if (data.share == false) {
                    console.log("开关关闭，分享关闭" + data.share);
                    // SceneGame.getInstance().bingoLayer.btn_share.visible = false;
                    LevelDataManager.isShare = false;
                };
                resolve(data.share);
            }, function (err) {
                //回调函数调用失败逻辑
                console.log("函数调用失败");
            });
        })
    }
 
    async getAVUserInfo():Promise<any>{
        var self = this;
        return new Promise(async function (resolve, reject) {
            await self.leancloudInit();

            AV.User.loginWithWeapp().then(user => {
                const userInfo = user.toJSON();
                LevelDataManager.openId = userInfo.authData.lc_weapp.openid;
                LevelDataManager.sessionKey = userInfo.authData.lc_weapp.session_key;
               console.log(userInfo);
               console.log(LevelDataManager.openId);
               console.log(LevelDataManager.sessionKey);
               resolve(userInfo);
            }).catch(
                () => {}
            );
        })
    }
    

    public async  testShare(){
    return new Promise((resole, reject)=>{
      (wx as any).shareAppMessage({
        title: "小学生都能答出的脑筋急转弯，看看你能答对多少？",
        imageUrl: "resource/assets/common/title11.png"
      })
    })
  }

    public async leancloudInit()
    {
        var _selt = this;
        return new Promise(async function (resolve, reject) {
            let options = {
                appId: "ihRY3sOSgyBwNpfgdfOTxayc-gzGzoHsz",
                appKey: "tUbmQwyYk48bAghMg5mUERNl",
            };
            AV.init(options);
            resolve();
        });
    }
    async shareAppMessage(){
        (wx as any).shareAppMessage({
        title: "小学生都能答出的脑筋急转弯，看看你能答对多少？",
        imageUrl: "resource/assets/common/title11.png",
        success: function (res) {
          SoundManager.getInstance().windowSoundChanel = SoundManager.getInstance().windowSound.play(0, 1);
          SoundManager.getInstance().windowSoundChanel.volume = 1;
          SceneGame.getInstance().bingoLayer.visible = true;
          SceneGame.getInstance().bingoLayer.trueGroup.visible = true;
          SceneGame.getInstance().bingoLayer.daandi.visible = true;
          SceneGame.getInstance().hintBg(true);
          SceneGame.getInstance().bingoLayer.labelresult.text =
            LevelDataManager.getInstance().GetLevelData(LevelDataManager.getInstance().curIcon).result;
          SceneGame.getInstance().bingoLayer.labelExplain.text = "解释:   " +
            LevelDataManager.getInstance().GetLevelData(LevelDataManager.getInstance().curIcon).explain
            + "   ";
          console.log("result" + LevelDataManager.getInstance().GetLevelData(LevelDataManager.getInstance().curIcon).result);

        }
      })
    }
   
    async updateShareMenu(){
      (wx as any).shareAppMessage({
        title: "小学生都能答出的脑筋急转弯，看看你能答对多少？",
        imageUrl: "resource/assets/common/title11.png",
        success: function (res) {
          console.log("主动转发成功");
          let theTickets = res.shareTickets;
          if (res.shareTickets) {
            console.log("转发群,分享");
            SceneGame.getInstance().bingoLayer.visible = false;
            SceneGame.getInstance().bingoLayer.erroGroup.visible = false;

            SoundManager.getInstance().windowSoundChanel = SoundManager.getInstance().windowSound.play(0, 1);
            SoundManager.getInstance().windowSoundChanel.volume = 1;
            SceneGame.getInstance().bingoLayer.visible = true;
            SceneGame.getInstance().bingoLayer.trueGroup.visible = true;
            SceneGame.getInstance().bingoLayer.daandi.visible = true;
            SceneGame.getInstance().hintBg(true);
            SceneGame.getInstance().bingoLayer.labelresult.text =
              LevelDataManager.getInstance().GetLevelData(LevelDataManager.getInstance().curIcon).result;
            SceneGame.getInstance().bingoLayer.labelExplain.text = "解释:   " +
              LevelDataManager.getInstance().GetLevelData(LevelDataManager.getInstance().curIcon).explain
              + "   ";
            console.log("result" + LevelDataManager.getInstance().GetLevelData(LevelDataManager.getInstance().curIcon).result);
          }
          else {
            console.log("分享到个人");
            SceneGame.getInstance().bingoLayer.visible = true;
            SceneGame.getInstance().bingoLayer.erroGroup.visible = true;
            SceneGame.getInstance().hintBg(true);
          }
        }
      })
    }

    
    async wxCloudInit(){}
    async wxCloudCallFunc(){}
    async wxGetCloudData(){
        return {data:""}
    }
}
