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
var Bingo = (function (_super) {
    __extends(Bingo, _super);
    function Bingo() {
        var _this = _super.call(this) || this;
        _this.names = ["xinshou_png", "xuezhe_png", "dashi_png", "zongshi_png", "zhizhe_png", "xianzhi_png"];
        _this.gradename = ["xinshouzi_png", "xuezhezi_png", "dashizi_png", "zongshizi_png", "zhizhezi_png", "xianzhizi_png"];
        return _this;
        // this.skinName =  "resource/eui_skins/Bingo.exml"
    }
    Bingo.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Bingo.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNext, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.imgdizi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImgZidi, this);
        this.erroBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onErro, this);
    };
    Bingo.prototype.onErro = function () {
        platform.updateShareMenu();
    };
    Bingo.prototype.onImgZidi = function () {
        this.visible = false;
        this.upgradeGroup.visible = false;
    };
    Bingo.prototype.onNext = function () {
        console.log("点击下一题");
        SoundManager.getInstance().answerSoundChanel = SoundManager.getInstance().answerSound.play(0, 1);
        SoundManager.getInstance().answerSoundChanel.volume = 1;
        egret.Tween.get(this.btn_next).to({ scaleX: 1.2, scaleY: 1.2 }, 100).to({ scaleX: 1, scaleY: 1 }, 100);
        this.visible = false;
        this.bingoGroup.visible = false;
        this.trueGroup.visible = false;
        LevelDataManager.getInstance().curIcon++;
        if (LevelDataManager.getInstance().curIcon > LevelDataManager.getInstance().GetMileStone()) {
            LevelDataManager.getInstance().SetMileStone(LevelDataManager.getInstance().curIcon); //存储
        }
        SceneGame.getInstance().InitLevel(LevelDataManager.getInstance().curIcon);
        this.imageUpdate();
    };
    Bingo.prototype.onShare = function () {
        console.log("分享");
        egret.Tween.get(this.btn_share).to({ scaleX: 1.2, scaleY: 1.2 }, 100).to({ scaleX: 1, scaleY: 1 }, 100);
        platform.testShare();
        this.visible = false;
        this.bingoGroup.visible = false;
        this.trueGroup.visible = false;
        LevelDataManager.getInstance().curIcon++; //////这里写在微信中。
        console.log(LevelDataManager.getInstance().curIcon);
        if (LevelDataManager.getInstance().curIcon > LevelDataManager.getInstance().GetMileStone()) {
            LevelDataManager.getInstance().SetMileStone(LevelDataManager.getInstance().curIcon); //存储
        }
        SceneGame.getInstance().InitLevel(LevelDataManager.getInstance().curIcon);
        this.imageUpdate();
    };
    Bingo.prototype.imageUpdate = function () {
        //记录的关卡
        var level = LevelDataManager.getInstance().GetMileStone();
        if (level == 1) {
            this.visible = true;
            this.upgradeGroup.visible = true;
            this.resetStart(); //重置星星
            //一星
            this.imgTouxiang.source = this.names[0];
            this.imgDengji.source = this.gradename[0];
            this.updateStar(0);
        }
        else if (level == 31) {
            this.imgTouxiang.source = this.names[0];
            this.imgDengji.source = this.gradename[0];
            this.updateStar(1);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 61) {
            this.imgTouxiang.source = this.names[0];
            this.imgDengji.source = this.gradename[0];
            this.updateStar(2);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 91) {
            this.imgTouxiang.source = this.names[0];
            this.imgDengji.source = this.gradename[0];
            this.updateStar(3);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 121) {
            this.imgTouxiang.source = this.names[0];
            this.imgDengji.source = this.gradename[0];
            this.updateStar(4);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 151) {
            //重置
            this.resetStart();
            //一星
            this.imgTouxiang.source = this.names[1];
            this.imgDengji.source = this.gradename[1];
            this.updateStar(0);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 181) {
            this.imgTouxiang.source = this.names[1];
            this.imgDengji.source = this.gradename[1];
            this.updateStar(1);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 211) {
            this.imgTouxiang.source = this.names[1];
            this.imgDengji.source = this.gradename[1];
            this.updateStar(2);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 241) {
            this.imgTouxiang.source = this.names[1];
            this.imgDengji.source = this.gradename[1];
            this.updateStar(3);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 271) {
            this.imgTouxiang.source = this.names[1];
            this.imgDengji.source = this.gradename[1];
            this.updateStar(4);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 301) {
            this.resetStart();
            //一星
            this.imgTouxiang.source = this.names[2];
            this.imgDengji.source = this.gradename[2];
            this.updateStar(0);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 331) {
            this.imgTouxiang.source = this.names[2];
            this.imgDengji.source = this.gradename[2];
            this.updateStar(1);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 361) {
            this.imgTouxiang.source = this.names[2];
            this.imgDengji.source = this.gradename[2];
            this.updateStar(2);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 391) {
            this.imgTouxiang.source = this.names[2];
            this.imgDengji.source = this.gradename[2];
            this.updateStar(3);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 421) {
            this.imgTouxiang.source = this.names[2];
            this.imgDengji.source = this.gradename[2];
            this.updateStar(4);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 451) {
            this.resetStart();
            //1
            this.imgTouxiang.source = this.names[3];
            this.imgDengji.source = this.gradename[3];
            this.updateStar(0);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 481) {
            this.imgTouxiang.source = this.names[3];
            this.imgDengji.source = this.gradename[3];
            this.updateStar(1);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 511) {
            this.imgTouxiang.source = this.names[3];
            this.imgDengji.source = this.gradename[3];
            this.updateStar(2);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 541) {
            this.imgTouxiang.source = this.names[3];
            this.imgDengji.source = this.gradename[3];
            this.updateStar(3);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 571) {
            this.imgTouxiang.source = this.names[3];
            this.imgDengji.source = this.gradename[3];
            this.updateStar(4);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 601) {
            this.resetStart();
            this.imgTouxiang.source = this.names[4];
            this.imgDengji.source = this.gradename[4];
            this.updateStar(0);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 631) {
            this.imgTouxiang.source = this.names[4];
            this.imgDengji.source = this.gradename[4];
            this.updateStar(1);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 661) {
            this.imgTouxiang.source = this.names[4];
            this.imgDengji.source = this.gradename[4];
            this.updateStar(2);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 691) {
            this.imgTouxiang.source = this.names[4];
            this.imgDengji.source = this.gradename[4];
            this.updateStar(3);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 721) {
            this.imgTouxiang.source = this.names[4];
            this.imgDengji.source = this.gradename[4];
            this.updateStar(4);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 751) {
            this.resetStart();
            this.imgTouxiang.source = this.names[5];
            this.imgDengji.source = this.gradename[5];
            this.updateStar(0);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 781) {
            this.imgTouxiang.source = this.names[5];
            this.imgDengji.source = this.gradename[5];
            this.updateStar(1);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 811) {
            this.imgTouxiang.source = this.names[5];
            this.imgDengji.source = this.gradename[5];
            this.updateStar(2);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 841) {
            this.imgTouxiang.source = this.names[5];
            this.imgDengji.source = this.gradename[5];
            this.updateStar(3);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 871) {
            this.imgTouxiang.source = this.names[5];
            this.imgDengji.source = this.gradename[5];
            this.updateStar(4);
            this.upgradeGroup.visible = true;
            this.visible = true;
        }
        else if (level == 900) {
            this.imgTouxiang.source = this.names[6];
            this.imgDengji.source = this.gradename[6];
            this.upgradeGroup.visible = true;
            this.visible = true;
            console.log("无敌");
        }
    };
    Bingo.prototype.updateStar = function (index) {
        if (index > this.starsGroup.numChildren) {
            console.log("超出star数组");
            return;
        }
        for (var i = 0; i <= index; i++) {
            this.starsGroup.getChildAt(i).visible = true;
        }
    };
    Bingo.prototype.resetStart = function () {
        for (var i = 0; i < this.starsGroup.numChildren; i++) {
            this.starsGroup.getChildAt(i).visible = false;
        }
    };
    return Bingo;
}(eui.Component));
__reflect(Bingo.prototype, "Bingo", ["eui.UIComponent", "egret.DisplayObject"]);
window["Bingo"] = Bingo;
//# sourceMappingURL=Bingo.js.map