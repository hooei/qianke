// 获取？后边字符
var _GLOBAL = {
    ua: navigator.userAgent.toLowerCase(),
    queryString: function(str) {
        //获得?后边的字符
        var index = str.indexOf('?'),
            segments = str.substring(index >= 0 ? index + 1 : index);

        return segments.split('&').reduce(function(obj, pair) {
            var parts = pair.split('=');
            if (parts.length === 2) {
                obj[parts[0].toLowerCase()] = (null === parts[1]) ? '' : decodeURIComponent(parts[1]);
            }
            return obj;
        }, {});
    }

}

// 用户id
var imgUrl = 'http://qiangke.oss-cn-beijing.aliyuncs.com',
    //globalUrl = 'http://www.qianke360.cn:8080/wcserv/appserv?s=';
    globalUrl = 'http://web.qianke360.cn:7003/wcserv/appserv?s=';



var globalparameter = _GLOBAL.queryString(window.location.search),
    sourcesid = globalparameter['userid'],
    globalunionid = globalparameter['unionid'],
    globalopenId = globalparameter['openid'],
    globalchn = globalparameter['chn'],
    globaldevId = globalparameter['devid'];



var devidnum="";

if (window.localStorage.getItem("devid") == null) {
    if (globaldevId == null) {
        devidnum = "";
    } else {
        devidnum = globaldevId;
        window.localStorage.setItem("devid", globaldevId);
    }

} else {
    if (globaldevId != null) {
        window.localStorage.removeItem("devid");
        window.localStorage.setItem("devid", globaldevId);
    }

    devidnum = window.localStorage.getItem("devid");

}


var channelid = '';
if (window.localStorage.getItem("chn") == null) {
    if (globalchn == null) {
        channelid = "AppStore";
    } else {
        channelid = globalchn;
        window.localStorage.setItem("chn", globalchn);
    }

} else {
    if (globalchn != null) {
        window.localStorage.removeItem("chn");
        window.localStorage.setItem("chn", globalchn);
    }

    channelid = window.localStorage.getItem("chn");

}


var headdata = {
        'head': {
            'version': '20010000',
            'channelid': channelid
        }
    }
    // console.log(headdata);    
    // 合并对象
function mergeObject(a, b) {
    return $.extend({}, a, b);
};
// md5
function encryptMd(dataMd) {
    return $.md5(JSON.stringify(dataMd) + 'wwwqianke360cn');
}

//浏览器后退
function back() {
    history.go(-1); //后退1页 
    // location.reload();
    // return false;
};
$('.backBt').click(function() {
    back();
});
//设备判断
var browser = {
    ua: navigator.userAgent.toLowerCase(),
    isAndroid: function() {
        return (/android/.test(browser.ua)) ? true : false;
    },
    isIos: function() {
        return (/iphone/.test(browser.ua)) ? true : false;
    },
    isWX: function() {
        return (/micromessenger/.test(browser.ua)) ? true : false;
    },
    isQQ: function() {
        return (/qq/.test(browser.ua)) ? true : false;
    },
};


$(function() {
    if (browser.isIos()) {
        if (browser.isWX() || browser.isQQ()) {
            saftipshow();
            return false
        }
    } else if (browser.isAndroid()) {
        androidtipshow();
        return false
    };

})

function saftipshow() {
    $('#mask').show();
    $('.saftip').show();
};

function saftiphide() {
    $('#mask').hide();
    $('.saftip').hide();
};

function androidtipshow() {
    $('#mask').show();
    $('.androidtip').show();
};

function androidtiphide() {
    $('#mask').hide();
    $('.androidtip').hide();
};
$('.saftipbt').click(function() {
    saftiphide();
});
$('.androidtipbt').click(function() {
    androidtiphide();
});



function keydowntipshow() {
    $('.tipdownmask').show();
    $('.tipdown').show();
}


function keydowntiphide() {
    $('.tipdownmask').hide();
    $('.tipdown').hide();
}



/*Toast效果，用于在不打断程序正常执行的情况下显示提示数据*/
var Toast = function(config) {
    this.context = config.context == null ? $('body') : config.context; //上下文
    this.message = config.message; //显示内容
    this.time = config.time == null ? 3000 : config.time; //持续时间
    this.left = config.left; //距容器左边的距离
    this.bottom = config.bottom; //距容器上方的距离
    this.init();
}
var msgEntity;
Toast.prototype = {
    //初始化显示的位置内容等
    init: function() {
        $("#toastMessage").remove();
        //设置消息体
        var msgDIV = new Array();
        msgDIV.push('<div id="toastMessage">');
        msgDIV.push('<span>' + this.message + '</span>');
        msgDIV.push('</div>');
        msgEntity = $(msgDIV.join('')).appendTo(this.context);
        //设置消息样式
        var left = this.left == null ? this.context.width() / 2 - msgEntity.find('span').width() / 2 - 30 : this.left;
        var bottom = this.bottom == null ? '40%' : this.bottom;
        msgEntity.css({
            position: 'absolute',
            bottom: bottom,
            'z-index': '99',
            left: '15px',
            right: '15px',
            'background-color': 'black',
            color: 'white',
            'font-size': '16px',
            padding: '10px',
            margin: '10px',
            '-webkit-border-radius': '5px'
        });
        msgEntity.hide();
    },
    //显示动画
    show: function() {
        msgEntity.fadeIn(this.time / 2);
        msgEntity.fadeOut(this.time / 2);
    }

};
// loading
function loadshow() {
    var div = '<div class="loading_initial">' + '<span class="load_con">' + '<span class="load_radius">' + '</span></span>' + '<div class="load_text">loading...</div>' + '</div>';
    $("body").append(div);
};

function loadhide() {
    $('.loading_initial').remove();
};
// 当前日期
Date.prototype.pattern = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份           
        "d+": this.getDate(), //日           
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
        "H+": this.getHours(), //小时           
        "m+": this.getMinutes(), //分           
        "s+": this.getSeconds(), //秒           
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度           
        "S": this.getMilliseconds() //毫秒           
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
var currentDate = new Date().pattern("yyyy-MM-dd")


function getdata(b, callback) {
    var mergedata = mergeObject(headdata, b);
    var secret = encryptMd(mergedata);
    var encode = JSON.stringify(mergedata);

    $.ajax({
        //url: globalUrl,
        url: globalUrl + secret + '&p=' + encode,
        type: 'post',
        dataType: 'json',
        data: mergedata,
        // headers:headers,
        beforeSend: function() {
            loadshow();
        },
        success: function(response) {
            if (b.body.t == 2001) {
                callback(response);
            } else {
                callback(response.message);
            }
        },
        complete: function() {
            loadhide();
        },
        // error : function() {  
        //      new Toast({context:$('body'),message:'数据加载失败，请重试'}).show();
        // }  
        error: function(XMLHttpRequest, textStatus, errorThrown) {

            if (XMLHttpRequest.status == 200) {
                callback({});
            } else {
                new Toast({
                    context: $('body'),
                    message: '数据加载失败，请重试'
                }).show();
                callback(null, textStatus);
            }
        }



    });
}

var info = {};



if (sourcesid == null) {
    //不是渠道用户的判断
    if (window.localStorage.getItem("unionId") == null) {
        if (globalunionid == null) {
            info.unionId = "1";

            new Toast({
                context: $('body'),
                message: '请返回微信公众号重新打开'
            }).show();
            window.location.href = "weixin://";

        } else {
            info.unionId = globalunionid;
            window.localStorage.setItem("unionId", globalunionid);
        }
    } else {
        if (globalunionid != null) {
            window.localStorage.removeItem("unionId");
            window.localStorage.setItem("unionId", globalunionid);
        }
        info.unionId = window.localStorage.getItem("unionId");
    }


}else{

    //渠道用户的判断
    if (sourcesid != null) {
        window.localStorage.removeItem("unionId");
        window.localStorage.setItem("unionId", sourcesid);
    };
    info.unionId = window.localStorage.getItem("unionId");
}

info.openId = globalopenId;


var href = {
    scheme: "QianKeKey://?unionId=" + info.unionId + "&v=29010000" + "&openId=" + info.openId, //URLScheme
    downloadUrl: "itms-services://?action=download-manifest&url=https://oab8nal7b.qnssl.com/qianke_key.plist?" + new Date().getTime().toString(),
    helpios9: "ios9help.html?unionid=" + info.unionId + "&openid=" + info.openId,
}



function openkey() {
    window.location = href.scheme;
    setTimeout(function() {
        //此处如果执行则表示没有app
        // downkey();
        // swipershow();
        tipSetUpshow();
    }, 100);
}

function downkey() {
    window.open(href.downloadUrl);
    keydowntiphide();
}



var uesrstate;



var citesData = function() {
    var userid = '';
};
// 账户userid
citesData.prototype.useridData = function(callback) {
    // console.log(info.unionId);
    var that = this;
    var useriddata = {
        'body': {
            't': 2001,
            'c': [{
                'userkey': info.unionId
                    // 'userkey': info.unionId
            }]
        }
    };

    getdata(useriddata, function(res, err) {
        // console.log(res.status);

        if (res.status == 2001) {
            uesrstate = false;
            //未注册用户
            // console.log(res.message);
            keydowntipshow();
        } else {
            // 用户ID
            that.userid = res.message.user.userId;
            // 用户名称
            that.userName = res.message.user.userName;
            //用户头像
            var judgeprefix = res.message.user.userImages;
            if (judgeprefix.indexOf("http://") >= 0) {
                that.userimg = res.message.user.userImages;
            } else {
                that.userimg = imgUrl + res.message.user.userImages;
            }
        };


        var deviddata = {
            'body': {
                "t": 2020,
                "c": [{
                    "userid": that.userid,
                    "devid": devidnum,
                    "type": 1
                }]
            }
        };
        getdata(deviddata, function(rest, errt) {
            // console.log(rest.toString());
            // console.log(typeof rest);
            var devidfirst = rest.split(','); // 字符串就转换成Array数组了
            that.devid = devidfirst[0];
            that.imeinum = devidfirst[1];
            callback();
        });
    });
};

$('.tipdownclose').click(function() {
    keydowntiphide();
})

$('.keydownbt').click(function() {
    if (browser.isIos()) {
        if (browser.isWX() || browser.isQQ()) {
            saftipshow();
            return false;
        }
    } else if (browser.isAndroid()) {
        androidtipshow();
        return false;

    };

    // openkey();
    // window.location = href.scheme;

    // tipSetUpshow();

    // downkey();
    // swipershow();

    keydowntiphide();
    openkey();



})



// 账户数据
citesData.prototype.accountData = function(callback) {
    // console.log(this.userid);
    var accountdata = {
        'body': {
            't': 3001,
            'c': [{
                'userid': this.userid,
                'date': currentDate
            }]
        }
    };
    getdata(accountdata, function(res, err) {
        callback(res, err);
    });
};
// 用户信息
citesData.prototype.userData = function(callback) {
    var userdata = {
        'body': {
            't': 2013,
            'c': [{
                'userid': this.userid
            }]
        }
    };
    getdata(userdata, function(res, err) {
        callback(res, err);
    });
};

function getdataTaskdata(b, callback) {
    var mergedata = mergeObject(headdata, b);
    var secret = encryptMd(mergedata);
    var encode = JSON.stringify(mergedata);


    $.ajax({
        url: globalUrl + secret + '&p=' + encode,
        //url: globalUrl,
        type: 'post',
        dataType: 'json',
        data: mergedata,
        // headers:headers,
        beforeSend: function() {
            loadshow();
        },
        success: function(response) {

        // var msgb = JSON.stringify(response);
        // console.log(msgb);
        // callback(response.status);

        if (response.status != 0) {
                new Toast({
                    context: $('body'),
                    message: response.message
                }).show();
                return false;

        }else{
            callback(response.message)
        }
            
            // if (b.body.t == 2001) {
            //     callback(response);
            // } else {
            //     callback(response.message);
            // }
        },
        complete: function() {
            loadhide();
        },
        // error : function() {  
        //      new Toast({context:$('body'),message:'数据加载失败，请重试'}).show();
        // }  
        error: function(XMLHttpRequest, textStatus, errorThrown) {

            if (XMLHttpRequest.status == 200) {
                callback({});
            } else {
                new Toast({
                    context: $('body'),
                    message: '数据加载失败，请重试'
                }).show();
                callback(null, textStatus);
            }
        }



    });
}




// 任务列表数据
citesData.prototype.taskList = function(callback) {
    var taskdata = {
        'body': {
            't': 1003,
            'c': [{
                'keyid': this.userid,
                'imei': this.imeinum,
                'pages': 0
            }]
        }
    };
    getdataTaskdata(taskdata, function(res, err) {
        callback(res, err);
    });
};

// 邀请人数
citesData.prototype.invitenNumberData = function(callback) {
    var invitennumberdata = {
        'body': {
            't': 2001,
            'c': [{
                'userkey': info.unionId
            }]
        }
    };
    getdata(invitennumberdata, function(res, err) {
        callback(res, err);
    });
};
// 取行为列表：USERID, DEVID, 行为类别（0-all 1-下载 2-安装 3-注册 4-点击展示 5-划屏 6-分享 7-伞下收入 8-其它）
citesData.prototype.listBehavior = function(callback) {
    var listbehavior = {
        'body': {
            't': 3013,
            'c': [{
                'userid': this.userid,
                "devid": this.devid,
                'acttype': 2
            }]
        }
    };
    getdata(listbehavior, function(res, err) {
        callback(res, err);
    });
};
// 取行为列表：USERID, DEVID, 行为类别（0-all 1-下载 2-安装 3-注册 4-点击展示 5-划屏 6-分享 7-伞下收入 8-其它）
citesData.prototype.listBehaviorTwo = function(callback) {
    var listbehavior = {
        'body': {
            't': 3013,
            'c': [{
                'userid':this.userid,
                "devid": this.devid,
                'acttype': 0
            }]
        }
    };
    getdata(listbehavior, function(res, err) {
        callback(res, err);
    });
};

// 提现
citesData.prototype.depositors = function(cashid, moneynmu, ways, accountid, token ,weixinname, callback) {
    //moneynmu 钱数
    // ways 收款帐号类别 
    // var moneynmu = moneynmu,ways = ways;
    // userid 用户ＩＤ
    // passwd 密码，
    // money 钱数，
    // accountid 收款帐号,
    // acctype 收款帐号类别（0-支付宝 1-微信 2-qq币 3-银行）,
    // token 交易识别码, 
    // donate 捐赠（0-不是 1-是）,
    // username 用户名（捐赠情况下有效），
    // userphone 用户手机号（捐赠情况下有效）
    var depositorsdata = {
        'body': {
            't': 3012,
            'c': [{
                'userid': cashid,
                'passwd': '',
                "money": moneynmu,
                'accountid': accountid,
                'acctype': ways,
                'token': token,
                'donate': 0,
                'username': weixinname,
                'userphone': '',
                'devtoken': ''
            }]
        }
    };
    getdataTaskdata(depositorsdata, function(res, err) {
        callback(res, err);
    });
};


// 消息
citesData.prototype.messageList = function(callback) {
    var messagelist = {
        'body': {
            't': 2010,
            'c': [{
                'userid': this.userid,
                'status': 10
            }]
        }
    };
    getdata(messagelist, function(res, err) {
        callback(res, err);
    });
};
//消息已读信息提交
//设消息读取状态：msgids消息列表，用,号分割，  status（0-未读 1-已读 2-清空）
citesData.prototype.messageSub = function(mesid, callback) {
    var messagesub = {
        'body': {
            't': 2011,
            'c': [{
                'msgids': mesid,
                'status': 1
            }]
        }
    };
    getdata(messagesub, function(res, err) {
        callback(res, err);
    });
};

//收益详情：用户ＩＤ，条数: 0所有， 类型：type:1-下载 2-安装 3-注册 4-点击展示 5-划屏 6-分享 7-伞下收入 8-other
//其中：type=0时，所有收入的明细。  type=7,邀请收入明细。
//全部收入
citesData.prototype.gainsList = function(callback) {
    var gainsdata = {
        'body': {
            't': 3019,
            'c': [{
                'userid': this.userid,
                'lines': 0,
                'type': 2
            }]
        }
    };
    getdata(gainsdata, function(res, err) {
        callback(res, err);

    });
};
//邀请收入
citesData.prototype.invitedList = function(callback) {
    var inviteddata = {
        'body': {
            't': 3019,
            'c': [{
                'userid': this.userid,
                'lines': 0,
                'type': 7
            }]
        }
    };
    getdata(inviteddata, function(res, err) {
        callback(res, err);
    });
};
//提现明细记录
citesData.prototype.postalList = function(callback) {
    var postaldata = {
        'body': {
            't': 3015,
            'c': [{
                'userid': this.userid,
                'pages': 0
            }]
        }
    };
    getdataTaskdata(postaldata, function(res, err) {
        callback(res, err);
    });
};

//取用户消息:用户ＩＤ, 状态（0-未读， 1-已读 10-全部 8-未取过的数据 9-已取过的数据  注：对fromid=10000的信息，要对内容进行解析并重组 ）
citesData.prototype.messageList = function(callback) {
    var messagedata = {
        'body': {
            't': 2010,
            'c': [{
                'userid': this.userid,
                'status': 10
            }]
        }
    };
    getdata(messagedata, function(res, err) {
        callback(res, err);
    });
};
//取签到数据
citesData.prototype.signData = function(callback) {
    var signdata = {
        'body': {
            't': 3013,
            'c': [{
                'userid': this.userid,
                "devid": this.devid,
                'acttype': 0
            }]
        }
    };
    getdata(signdata, function(res, err) {
        callback(res, err);
    });
};

// send: {
//     "t": 3011,
//     "c": [{
//         "userid": "1000068",
//         "type": 1,
//         "income": 10,
//         "keyword": "100020",
//         "devid": "100048",
//         "infrom": 1,
//         "thirdkey": "",
//         "freeze": "1"
//     }]
// }


//copy发送服务端
citesData.prototype.copyData = function(keyword, callback) {
    var copydata = {
        'body': {
            't': 3011,
            'c': [{
                'userid': this.userid,
                'type': 1,
                'income': 0,
                'keyword': keyword,
                'devid': this.devid,
                "infrom": 0,
                "thirdkey": "",
                "freeze": "1"
            }]
        }
    };
    getdataTaskdata(copydata, function(res, err) {
        callback(res, err);
    });
};



//取消任务
citesData.prototype.cancelTask = function(keyword,callback) {
    var canceltask = {
        'body': {
            't': 3023,
            'c': [{
                'userid': this.userid,
                "devid": this.devid,
                'adid': keyword
            }]
        }
    };
    getdata(canceltask, function(res, err) {
        callback(res, err);
    });
};


//取单个广告
citesData.prototype.adDetail = function(keyword,callback) {
    var addetail = {
        'body': {
            't': 1001,
            'c': [{
                'adid': keyword
            }]
        }
    };
    getdata(addetail, function(res, err) {
        callback(res, err);
    });
};





