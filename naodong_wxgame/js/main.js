var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Word = (function (_super) {
    __extends(Word, _super);
    function Word() {
        var _this = _super.call(this) || this;
        // this.skinName =  "resource/eui_skins/Word.exml"
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_tap, _this);
        return _this;
    }
    //点击到自己后
    Word.prototype.onclick_tap = function () {
        SoundManager.getInstance().answerSoundChanel = SoundManager.getInstance().answerSound.play(0, 1);
        SoundManager.getInstance().answerSoundChanel.volume = 1;
        console.log("onclike" + this.label_answer.text);
        SceneGame.getInstance().onclick_Word(this);
    };
    Word.prototype.SetWordText = function (value) {
        this.label_answer.text = value;
    };
    Word.prototype.GetWordText = function () {
        return this.label_answer.text;
    };
    Word.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Word.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Word;
}(eui.Component));
__reflect(Word.prototype, "Word", ["eui.UIComponent", "egret.DisplayObject"]);
window["Word"] = Word;
var Query = AV.Query, User = AV.User;
var WeChatPlatform = (function () {
    /**
     * 构造函数
     */
    function WeChatPlatform() {
        this._init();
    }
    /**
     * 平台初始化
     */
    WeChatPlatform.prototype._init = function () {
    };
    WeChatPlatform.prototype.shareCloud = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
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
                                    }
                                    ;
                                    resolve(data.share);
                                }, function (err) {
                                    //回调函数调用失败逻辑
                                    console.log("函数调用失败");
                                });
                                return [2 /*return*/];
                            });
                        });
                    })];
            });
        });
    };
    WeChatPlatform.prototype.getAVUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, self.leancloudInit()];
                                    case 1:
                                        _a.sent();
                                        AV.User.loginWithWeapp().then(function (user) {
                                            var userInfo = user.toJSON();
                                            LevelDataManager.openId = userInfo.authData.lc_weapp.openid;
                                            LevelDataManager.sessionKey = userInfo.authData.lc_weapp.session_key;
                                            console.log(userInfo);
                                            console.log(LevelDataManager.openId);
                                            console.log(LevelDataManager.sessionKey);
                                            resolve(userInfo);
                                        }).catch(function () { });
                                        return [2 /*return*/];
                                }
                            });
                        });
                    })];
            });
        });
    };
    WeChatPlatform.prototype.testShare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resole, reject) {
                        wx.shareAppMessage({
                            title: "小学生都能答出的脑筋急转弯，看看你能答对多少？",
                            imageUrl: "resource/assets/common/title11.png"
                        });
                    })];
            });
        });
    };
    WeChatPlatform.prototype.leancloudInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _selt;
            return __generator(this, function (_a) {
                _selt = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return __awaiter(this, void 0, void 0, function () {
                            var options;
                            return __generator(this, function (_a) {
                                options = {
                                    appId: "ihRY3sOSgyBwNpfgdfOTxayc-gzGzoHsz",
                                    appKey: "tUbmQwyYk48bAghMg5mUERNl",
                                };
                                AV.init(options);
                                resolve();
                                return [2 /*return*/];
                            });
                        });
                    })];
            });
        });
    };
    WeChatPlatform.prototype.shareAppMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                wx.shareAppMessage({
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
                });
                return [2 /*return*/];
            });
        });
    };
    WeChatPlatform.prototype.updateShareMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                wx.shareAppMessage({
                    title: "小学生都能答出的脑筋急转弯，看看你能答对多少？",
                    imageUrl: "resource/assets/common/title11.png",
                    success: function (res) {
                        console.log("主动转发成功");
                        var theTickets = res.shareTickets;
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
                });
                return [2 /*return*/];
            });
        });
    };
    WeChatPlatform.prototype.wxCloudInit = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    WeChatPlatform.prototype.wxCloudCallFunc = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    WeChatPlatform.prototype.wxGetCloudData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { data: "" }];
            });
        });
    };
    return WeChatPlatform;
}());
__reflect(WeChatPlatform.prototype, "WeChatPlatform", ["Platform"]);
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
var LevelIcon = (function (_super) {
    __extends(LevelIcon, _super);
    function LevelIcon() {
        var _this = _super.call(this) || this;
        _this.isCanTouch = false;
        _this.skinName = "resource/eui_skins/LevelIcon.exml"; //这里如果不指定就会出现构建错误。
        _this.imgGuankadi.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.toGame, _this);
        return _this;
    }
    LevelIcon.prototype.toGame = function () {
        egret.Tween.get(this.imgGuankadi).to({ scaleX: 0.8, scaleY: 0.8 }, 100).to({ scaleX: 1, scaleY: 1 });
        var index = parseInt(this.bitlabel_levelIndex.text);
        if (index < LevelDataManager.getInstance().GetMileStone()) {
            this.setLevelIndex(false);
            LevelDataManager.getInstance().curIcon = index;
            SceneGame.getInstance().InitLevel(index); //进入对应关卡游戏
            //界面消失
            SceneGame.getInstance().levelScene.visible = false;
        }
    };
    Object.defineProperty(LevelIcon.prototype, "Level", {
        get: function () {
            return parseInt(this.bitlabel_levelIndex.text);
        },
        set: function (value) {
            this.bitlabel_levelIndex.text = value.toString();
        },
        enumerable: true,
        configurable: true
    });
    LevelIcon.prototype.setLevelIndex = function (status) {
        this.isCanTouch = !status;
        if (this.isCanTouch) {
            this.touchEnabled = !status;
        }
        this.imgLock.visible = status; //锁
        this.bitlabel_levelIndex.visible = !status;
    };
    return LevelIcon;
}(eui.Component));
__reflect(LevelIcon.prototype, "LevelIcon", ["eui.UIComponent", "egret.DisplayObject"]);
window["LevelIcon"] = LevelIcon;
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
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
        //加载条x缩放
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.updateShareMenu({
                            withShareTicket: true
                        });
                        return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        this.startAnimation(result);
                        return [4 /*yield*/, platform.getAVUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        console.log("游戏初始化");
                        console.log("用户信息" + userInfo);
                        return [4 /*yield*/, platform.shareCloud()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        console.log("游戏初始化了");
        SoundManager.getInstance();
        LevelDataManager.getInstance();
        SceneGame.getInstance();
        this.addChild(SceneGame.getInstance());
        var data = LevelDataManager.getInstance().GetMileStone();
        LevelDataManager.getInstance().curIcon = data;
        SceneGame.getInstance().InitLevel(data);
        console.log(data);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        // change();
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
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
        if (LevelDataManager.isShare == true) {
            platform.updateShareMenu();
        }
        else if (LevelDataManager.isShare == false) {
            SoundManager.getInstance().windowSoundChanel = SoundManager.getInstance().windowSound.play(0, 1);
            SoundManager.getInstance().windowSoundChanel.volume = 1;
            SceneGame.getInstance().bingoLayer.visible = true;
            SceneGame.getInstance().bingoLayer.trueGroup.visible = true;
            SceneGame.getInstance().bingoLayer.daandi.visible = true;
            SceneGame.getInstance().hintBg(true);
            SceneGame.getInstance().bingoLayer.labelresult.text =
                LevelDataManager.getInstance().GetLevelData(LevelDataManager.getInstance().curIcon).result;
            SceneGame.getInstance().bingoLayer.labelExplain.text = "解释:   " +
                LevelDataManager.getInstance().GetLevelData(LevelDataManager.getInstance().curIcon).explain + "   ";
            console.log("result" + LevelDataManager.getInstance().GetLevelData(LevelDataManager.getInstance().curIcon).result);
        }
    };
    return SceneGame;
}(eui.Component));
__reflect(SceneGame.prototype, "SceneGame", ["eui.UIComponent", "egret.DisplayObject"]);
window["SceneGame"] = SceneGame;
var SoundManager = (function () {
    function SoundManager() {
        this.init();
    }
    SoundManager.getInstance = function () {
        if (SoundManager.soundManager == null) {
            SoundManager.soundManager = new SoundManager();
        }
        return SoundManager.soundManager;
    };
    SoundManager.prototype.init = function () {
        this.trueSound = RES.getRes("trueSound_mp3");
        this.erroSound = RES.getRes("erroSound_mp3");
        this.wordSound = RES.getRes("word_mp3");
        this.windowSound = RES.getRes("window_wav");
        this.answerSound = RES.getRes("answer1_mp3");
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
window["SoundManager"] = SoundManager;
var testWord = (function (_super) {
    __extends(testWord, _super);
    function testWord() {
        return _super.call(this) || this;
    }
    testWord.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    testWord.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return testWord;
}(Word));
__reflect(testWord.prototype, "testWord");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var AnswerWord = (function (_super) {
    __extends(AnswerWord, _super);
    function AnswerWord() {
        var _this = _super.call(this) || this;
        _this.selectWord = null; //用一个变量来保存点击到的字
        return _this;
        // this.skinName = "resource/eui_skins/AnswerWord.exml";
    }
    AnswerWord.prototype.onclick_tap = function () {
        SoundManager.getInstance().answerSoundChanel = SoundManager.getInstance().answerSound.play(0, 1);
        SoundManager.getInstance().answerSoundChanel.volume = 1;
        if (this.selectWord != null) {
            this.selectWord.visible = true; //利用这个变量来将存储进来的问题字显示。
            this.selectWord = null;
            this.SetWordText("");
        }
        console.log("答案字被点击");
    };
    AnswerWord.prototype.SetSelectWord = function (word) {
        if (word != null) {
            word.visible = false;
            this.SetWordText(word.GetWordText()); //这里实现答案字显示问题字
            this.selectWord = word; //将问题字存储在答案字，一一对应，方便后面恢复显示。
        }
        else {
            this.SetWordText("");
            this.selectWord = null;
        }
    };
    AnswerWord.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    AnswerWord.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return AnswerWord;
}(Word));
__reflect(AnswerWord.prototype, "AnswerWord");
window["AnswerWord"] = AnswerWord;
/**
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
var Query = AV.Query, User = AV.User;
if (!window.platform) {
    window.platform = new WeChatPlatform();
}
;window.Main = Main;