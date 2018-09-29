var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneGame = (function (_super) {
    __extends(SceneGame, _super);
    function SceneGame() {
        return _super.call(this) || this;
        // this.skinName =  "resource/eui_skins/SceneGame.exml"
    }
    // private s:string;
    SceneGame.getInstance = function () {
        if (SceneGame.scenegame == null) {
            SceneGame.scenegame = new SceneGame();
        }
        return SceneGame.scenegame;
    };
    SceneGame.prototype.InitLevel = function (index) {
        this.levelIndex = index;
        this.labelLevel.text = this.levelIndex.toString();
        var levelData = LevelDataManager.getInstance().GetLevelData(index); //得到关卡数据
        //将字段接起来
        //要展示的数据
        var showData = levelData.chaotic;
        //对字段重新排列
        var wordList = []; //["","",]代表这是字符串数组。
        for (var i = 0; i < showData.length; i++) {
            wordList.push(showData.charAt(i));
        }
        //  wordList = this.randomList(wordList);
        //内容区域赋值
        for (var i = 0; i < this.group_Chaotic.numChildren - 1; i++) {
            var wordRect = this.group_Chaotic.getChildAt(i);
            wordRect.SetWordText(wordList[i]);
            wordRect.visible = true;
        }
        //添加答案区
        this.group_Result.removeChildren();
        var len = levelData.result.length;
        while (len) {
            var temp = new AnswerWord();
            this.group_Result.addChild(temp);
            len--;
        }
        //答案区域重置一些状态
        for (var i = 0; i < this.group_Result.numChildren; i++) {
            var answerRect = this.group_Result.getChildAt(i);
            answerRect.visible = true;
            answerRect.SetSelectWord(null);
            answerRect.selectWord = null;
        }
        //显示问题
        this.label_Question.text = levelData.question;
    };
    SceneGame.prototype.randomList = function (list) {
        var arr = [];
        while (list.length > 0) {
            var i = Math.floor(Math.random() * list.length);
            arr.push(list[i]);
            list.splice(i, 1); //删除i位置
        }
        return arr;
    };
    //点击字块发生逻辑  由当前字自己抛出
    SceneGame.prototype.onclick_Word = function (word) {
        //找到一个合适的位置
        var rect = null;
        for (var i = 0; i < this.group_Result.numChildren; i++) {
            var temp = this.group_Result.getChildAt(i);
            if (temp.selectWord == null) {
                rect = temp; //此时赋值后rect代表空的那个答案字块
                break;
            }
        }
        //找到位置后填充
        if (rect != null) {
            rect.SetSelectWord(word); //字显示
            //判断是否胜利
            var str = "";
            for (var i = 0; i < this.group_Result.numChildren; i++) {
                var answer = this.group_Result.getChildAt(i);
                str += answer.GetWordText();
            }
            if (str == LevelDataManager.getInstance().GetLevelData(this.levelIndex).result) {
                console.log("你赢了");
                this.bingoLayer.visible = true;
                this.bingoLayer.bingoGroup.visible = true;
                this.hintBg(false);
                SoundManager.getInstance().trueSoundChanel = SoundManager.getInstance().trueSound.play(0, 1);
                SoundManager.getInstance().trueSoundChanel.volume = 1;
            }
            else if (str.length == this.group_Result.numChildren) {
                console.log("you lose");
                this.bingoLayer.visible = true;
                this.bingoLayer.bg.touchEnabled = true;
                this.hintBg(true);
                this.bingoLayer.imgErro.visible = true;
                SoundManager.getInstance().erroSoundChanel = SoundManager.getInstance().erroSound.play(0, 1);
                SoundManager.getInstance().erroSoundChanel.volume = 1;
            }
        }
    };
    SceneGame.prototype.hintBg = function (isCan) {
        if (isCan == true) {
            this.bingoLayer.bg.touchEnabled = isCan;
            this.bingoLayer.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgTouch, this);
        }
        else if (isCan == false) {
            this.bingoLayer.bg.touchEnabled = isCan;
            this.bingoLayer.bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bgTouch, this);
        }
    };
    SceneGame.prototype.bgTouch = function () {
        var _this = this;
        console.log("haha");
        egret.Tween.get(this.bingoLayer.groupAll).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1, scaleY: 1 }, 100)
            .call(function () {
            _this.bingoLayer.visible = false;
            _this.bingoLayer.bingoGroup.visible = false;
            _this.bingoLayer.trueGroup.visible = false;
            _this.bingoLayer.imgErro.visible = false;
            _this.bingoLayer.daandi.visible = false;
            _this.bingoLayer.upgradeGroup.visible = false;
            _this.bingoLayer.erroGroup.visible = false;
        });
    };
    SceneGame.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SceneGame.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn_result.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showResult, this);
        this.btn_Level.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLevel, this);
    };
    SceneGame.prototype.onLevel = function () {
        SoundManager.getInstance().answerSoundChanel = SoundManager.getInstance().answerSound.play(0, 1);
        SoundManager.getInstance().answerSoundChanel.volume = 1;
        this.levelScene.showLevelIcon(LevelDataManager.getInstance().GetMileStone());
        this.levelScene.visible = true;
    };
    SceneGame.prototype.showResult = function (event) {
        egret.Tween.get(event.currentTarget).to({ scaleX: 1.2, scaleY: 1.2 }, 100).
            to({ scaleX: 1, scaleY: 1 }, 100);
        // if(LevelDataManager.isShare == true)
        // {
        // 	platform.shareAppMessage();
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
        platform.shareAppMessage();
    };
    return SceneGame;
}(eui.Component));
__reflect(SceneGame.prototype, "SceneGame", ["eui.UIComponent", "egret.DisplayObject"]);
window["SceneGame"] = SceneGame;
