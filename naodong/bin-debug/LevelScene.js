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
var LevelScene = (function (_super) {
    __extends(LevelScene, _super);
    function LevelScene() {
        var _this = _super.call(this) || this;
        _this.nameArray = ["xinshou_png", "xuezhe_png", "dashi_png", "zongshi_png", "zhizhe_png", "xianzhi_png"];
        // private groups:eui.Group[] = [];//group数组
        _this.curIndex = 0; //当前关卡页数。
        _this.cunLevelIndex = 0; //当前关卡数
        return _this;
        // this.skinName =  "resource/eui_skins/LevelScene.exml"
    }
    //皮肤部件第一次附加时对其执行一些初始化操作，例如添加事件监听，赋值缓存的属性值等。
    LevelScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    //EUI元素构建好调用。创建子对象后执行任何最终处理。
    LevelScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // this.createGroup();
        this.initMap();
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNext, this);
        this.btn_before.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBefore, this);
        this.levelBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);
    };
    LevelScene.getInstance = function () {
        if (LevelScene.levelScene == null) {
            LevelScene.levelScene = new LevelScene();
        }
        return LevelScene.levelScene;
    };
    LevelScene.prototype.initMap = function () {
        //初始化group
        for (var i = 0; i < 30; i++) {
            var icon = new LevelIcon();
            icon.Level = i + 1;
            var tLayout = new eui.TileLayout();
            tLayout.horizontalGap = 2;
            tLayout.verticalGap = 10;
            tLayout.requestedColumnCount = 6;
            this.groupLevel.layout = tLayout;
            this.groupLevel.addChild(icon);
        }
        //初始化星星
        var starIndex = this.curIndex % 5;
        var group = this.groupStars;
        group.getChildAt(starIndex).alpha = 1;
        //当前头像正确
        this.imgHead.source = this.nameArray[0];
        this.imgHeadBlack.alpha = 0;
        //将当前关卡显示正确
        this.showLevelIcon(LevelDataManager.getInstance().GetMileStone()); //显示到最远的
    };
    //当前关卡的前面都显示
    LevelScene.prototype.showLevelIcon = function (index) {
        for (var i = 0; i < this.groupLevel.numChildren; i++) {
            var icon = this.groupLevel.getChildAt(i);
            var num = icon.Level; //开始是1 
            if (num <= index) {
                icon.setLevelIndex(false);
            }
            else {
                icon.setLevelIndex(true);
            }
        }
    };
    //当前关卡判断在第几页，打开界面可以直接跳转到这一页来。头像更新在这里调用。
    LevelScene.prototype.judgeCurIndex = function (curIcon) {
    };
    //头像跟随关卡更新,到达多少关后头像需要更新
    LevelScene.prototype.headFollowLevel = function (curIcon) {
    };
    //点击背景缩放
    LevelScene.prototype.onBg = function () {
        var _this = this;
        egret.Tween.get(this).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1, scaleY: 1 }, 100)
            .call(function () { _this.visible = false; });
    };
    //前一个关卡
    LevelScene.prototype.onBefore = function () {
        SoundManager.getInstance().answerSound.play(0, 1);
        if (this.curIndex == 1) {
            console.log("第一关");
            this.btn_before.visible = false;
        }
        var starIndex = this.curIndex % 5;
        var group = this.groupStars;
        group.getChildAt(starIndex).alpha = 0;
        this.curIndex--;
        this.updateLabel(this.groupLevel, this.curIndex);
        this.updateGrade(this.curIndex);
        this.showLevelIcon(LevelDataManager.getInstance().GetMileStone());
    };
    //看下一个关卡
    LevelScene.prototype.onNext = function () {
        SoundManager.getInstance().answerSound.play(0, 1);
        if (this.curIndex == 29) {
            console.log("最后一关");
            this.btn_next.visible = false;
        }
        this.curIndex++;
        console.log("sss" + this.curIndex);
        this.updateLabel(this.groupLevel, this.curIndex);
        this.updateGrade(this.curIndex);
        this.showLevelIcon(LevelDataManager.getInstance().GetMileStone());
    };
    //更新头像级别
    LevelScene.prototype.updateGrade = function (index) {
        if (index == 0) {
            this.imgHead.source = this.nameArray[0];
            this.imgHeadBlack.alpha = 0;
        }
        else if (index > 0 && index < 5) {
            this.imgHeadBlack.alpha = 1;
            this.btn_before.visible = true;
            this.imgHead.source = this.nameArray[0];
            this.imgHeadBlack.source = "hui" + this.nameArray[0];
            this.labelGrade.text = "新手";
            if (index == 4) {
                //星星重置
                for (var i = 0; i < this.groupStars.numChildren; i++) {
                    this.groupStars.getChildAt(i).alpha = 1;
                }
            }
        }
        else if (index >= 5 && index < 10) {
            this.imgHead.source = this.nameArray[1];
            this.imgHeadBlack.source = "hui" + this.nameArray[1];
            this.labelGrade.text = "学者";
            if (index == 5) {
                //星星重置
                for (var i = 0; i < this.groupStars.numChildren; i++) {
                    this.groupStars.getChildAt(i).alpha = 0;
                }
            }
            else if (index == 9) {
                //星星重置
                for (var i = 0; i < this.groupStars.numChildren; i++) {
                    this.groupStars.getChildAt(i).alpha = 1;
                }
            }
        }
        else if (index >= 10 && index < 15) {
            this.imgHead.source = this.nameArray[2];
            this.imgHeadBlack.source = "hui" + this.nameArray[2];
            this.labelGrade.text = "大师";
            if (index == 10) {
                //星星重置
                for (var i = 0; i < this.groupStars.numChildren; i++) {
                    this.groupStars.getChildAt(i).alpha = 0;
                }
            }
            else if (index == 14) {
                //星星重置
                for (var i = 0; i < this.groupStars.numChildren; i++) {
                    this.groupStars.getChildAt(i).alpha = 1;
                }
            }
        }
        else if (index >= 15 && index < 20) {
            this.imgHead.source = this.nameArray[3];
            this.imgHeadBlack.source = "hui" + this.nameArray[3];
            this.labelGrade.text = "宗师";
            if (index == 15) {
                //星星重置
                for (var i = 0; i < this.groupStars.numChildren; i++) {
                    this.groupStars.getChildAt(i).alpha = 0;
                }
            }
            else if (index == 19) {
                //星星重置
                for (var i = 0; i < this.groupStars.numChildren; i++) {
                    this.groupStars.getChildAt(i).alpha = 1;
                }
            }
        }
        else if (index >= 20 && index < 25) {
            this.imgHead.source = this.nameArray[4];
            this.imgHeadBlack.source = "hui" + this.nameArray[4];
            this.labelGrade.text = "智者";
            if (index == 20) {
                //星星重置
                for (var i = 0; i < this.groupStars.numChildren; i++) {
                    this.groupStars.getChildAt(i).alpha = 0;
                }
            }
            else if (index == 24) {
                //星星重置
                for (var i = 0; i < this.groupStars.numChildren; i++) {
                    this.groupStars.getChildAt(i).alpha = 1;
                }
            }
        }
        else if (index >= 25 && index < 30) {
            this.btn_next.visible = true;
            this.imgHead.source = this.nameArray[5];
            this.imgHeadBlack.source = "hui" + this.nameArray[5];
            this.labelGrade.text = "先知";
            if (index == 25) {
                //星星重置
                for (var i = 0; i < this.groupStars.numChildren; i++) {
                    this.groupStars.getChildAt(i).alpha = 0;
                }
            }
            else if (index == 29) {
                //星星重置
                for (var i = 0; i < this.groupStars.numChildren; i++) {
                    this.groupStars.getChildAt(i).alpha = 1;
                }
            }
        }
        var starIndex = index % 5;
        var group = this.groupStars;
        group.getChildAt(starIndex).alpha = 1;
        //当前的页面到达指定 真实页面
        var realIndex = Math.floor(LevelDataManager.getInstance().GetMileStone() / 30); //真实页面  最远关卡  0   展示页面到达5 封锁   除去realIndex == 0
        //数字可以是浮点数
        if (realIndex % 5 == 0) {
            LevelDataManager.tempIndex = realIndex;
        }
        if (index >= LevelDataManager.tempIndex + 5) {
            this.imagehuiGrade.visible = true;
            this.imgHeadBlack.visible = true;
        }
        else {
            this.imagehuiGrade.visible = false;
            this.imgHeadBlack.visible = false;
        }
    };
    //替换label显示。
    LevelScene.prototype.updateLabel = function (group, num) {
        for (var i = 0; i < group.numChildren; i++) {
            var x = group.getChildAt(i);
            if (num == 0) {
                x.Level = i + 1;
            }
            else {
                x.Level = num * 30 + 1 + i;
            }
        }
    };
    //创建group
    LevelScene.prototype.createGroup = function () {
        for (var i = 0; i < 30; i++) {
            var group = new eui.Group();
            group.width = 580; //总共30页  最大长度
            group.height = 680;
            this.createLevel(group, i);
            // this.groups.push(group);//总共得到30个
        }
    };
    //创建关卡
    LevelScene.prototype.createLevel = function (group, num) {
        //绘制关卡  30个
        for (var i = num * 30; i < num * 30 + 30; i++) {
            var icon = new LevelIcon();
            icon.Level = i + 1;
            var tLayout = new eui.TileLayout();
            tLayout.horizontalGap = 2;
            tLayout.verticalGap = 10;
            tLayout.requestedColumnCount = 6;
            group.layout = tLayout;
            group.addChild(icon);
        }
    };
    return LevelScene;
}(eui.Component));
__reflect(LevelScene.prototype, "LevelScene", ["eui.UIComponent", "egret.DisplayObject"]);
window["LevelScene"] = LevelScene;
