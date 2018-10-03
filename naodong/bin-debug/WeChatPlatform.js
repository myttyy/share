var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
                                    if (data.share == true) {
                                        console.log("开关开启，分享开启" + data.share);
                                        LevelDataManager.isShare = true;
                                    }
                                    else if (data.share == false) {
                                        console.log("开关关闭，分享关闭" + data.share);
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
                            var date, hour;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, self.leancloudInit()];
                                    case 1:
                                        _a.sent();
                                        date = new Date();
                                        hour = date.getHours();
                                        console.log(hour + "当前小时");
                                        if (LevelDataManager.getInstance().GetCurTime() == 0) {
                                            AV.User.loginWithWeapp().then(function (user) {
                                                var userInfo = user.toJSON();
                                                LevelDataManager.openId = userInfo.authData.lc_weapp.openid;
                                                LevelDataManager.sessionKey = userInfo.authData.lc_weapp.session_key;
                                                resolve(userInfo);
                                                console.log(userInfo);
                                                console.log(LevelDataManager.openId);
                                                console.log(LevelDataManager.sessionKey);
                                                //存储这次登录时间
                                                LevelDataManager.getInstance().SetCurTime(hour);
                                            }).catch(function () { });
                                        }
                                        else if (Math.abs(LevelDataManager.getInstance().GetCurTime() - hour) >= 1.5) {
                                            AV.User.loginWithWeapp().then(function (user) {
                                                var userInfo = user.toJSON();
                                                LevelDataManager.openId = userInfo.authData.lc_weapp.openid;
                                                LevelDataManager.sessionKey = userInfo.authData.lc_weapp.session_key;
                                                resolve(userInfo);
                                                console.log(userInfo);
                                                console.log(LevelDataManager.openId);
                                                console.log(LevelDataManager.sessionKey);
                                                //存储这次登录时间
                                                LevelDataManager.getInstance().SetCurTime(hour);
                                            }).catch(function () { });
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        });
                    })];
            });
        });
    };
    WeChatPlatform.prototype.AVshare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resole, reject) {
                        return __awaiter(this, void 0, void 0, function () {
                            var pajson;
                            return __generator(this, function (_a) {
                                pajson = {
                                    gameId: 1002,
                                    openId: LevelDataManager.openId,
                                    sessionKey: LevelDataManager.sessionKey,
                                    iv: LevelDataManager.iv,
                                    encryptedData: LevelDataManager.encryptedData
                                };
                                console.log("gameId  " + pajson.gameId);
                                console.log("openId  " + pajson.openId);
                                console.log("sessionKey " + pajson.sessionKey);
                                console.log("iv  " + pajson.iv);
                                console.log("evcryteData   " + pajson.encryptedData);
                                AV.Cloud.run("share", pajson).then(function (data) {
                                    console.log(data + "分享成功data");
                                    console.log(data.openId + "分享成功dataOPenID");
                                    resole(data);
                                }, function (err) {
                                });
                                return [2 /*return*/];
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
            var self;
            return __generator(this, function (_a) {
                self = this;
                wx.shareAppMessage({
                    title: "小学生都能答出的脑筋急转弯，看看你能答对多少？",
                    imageUrl: "resource/assets/common/title11.png",
                    success: function (res) {
                        console.log("主动转发成功");
                        var theTickets = res.shareTickets;
                        if (res.shareTickets) {
                            wx.getShareInfo({
                                shareTicket: theTickets,
                                success: function (data) {
                                    LevelDataManager.encryptedData = data.encryptedData;
                                    LevelDataManager.iv = data.iv;
                                    console.log("encryptedData 得到" + LevelDataManager.encryptedData);
                                    console.log("iv 得到" + LevelDataManager.iv);
                                    var pajson = {
                                        gameId: 1002,
                                        openId: LevelDataManager.openId,
                                        sessionKey: LevelDataManager.sessionKey,
                                        iv: LevelDataManager.iv,
                                        encryptedData: LevelDataManager.encryptedData
                                    };
                                    console.log("gameId  " + pajson.gameId);
                                    console.log("openId  " + pajson.openId);
                                    console.log("sessionKey " + pajson.sessionKey);
                                    console.log("iv  " + pajson.iv);
                                    console.log("evcryteData   " + pajson.encryptedData);
                                    AV.Cloud.run("share", pajson).then(function (data) {
                                        console.log(data + "分享成功data");
                                        for (var key1 in data) {
                                            console.log(key1 + "why"); //输出can_share
                                            console.log(key1);
                                            var canShare = key1;
                                            console.log(data[canShare] + "这里面的指");
                                        }
                                        console.log("转发群,分享");
                                        console.log(canShare + "分享成功dataCAN_SHARE"); //到这里不出现了   应该是can_share
                                        console.log(data.canShare + "aaaaaa");
                                        if (data[canShare] == true) {
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
                                        else if (data[canShare] == false) {
                                            wx.showModal({
                                                title: "不要总骚扰这个群",
                                                content: "不可以骚扰这个群的朋友啦，换个群分享吧~",
                                                showCancel: false,
                                                success: function (res) {
                                                    if (res.confirm == true) {
                                                        platform.updateShareMenu();
                                                    }
                                                }
                                            });
                                        }
                                    }, function (err) {
                                        console.log("函数调用失败3333333");
                                    });
                                }
                            });
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
//# sourceMappingURL=WeChatPlatform.js.map