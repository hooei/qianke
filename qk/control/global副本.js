// 用户id
var userid = null;
var devid = '10000068';
var imeinum = 'D4FA47FA-8158-4BEC-9E88-DE4881D26A2C';
var imgUrl = 'http://qiangke.oss-cn-beijing.aliyuncs.com/adimg/';
var globalUrl = 'http://www.qianke360.cn:8080/wcserv/appserv?s=';





var href = {
//     appList: "index.html?userId=" + info.userId,
//     invitePage: "http://www.7kuaitang.com/wcserv/wechat3/jieshouyaoqing.jsp?openid=" + info.openId,
//     incomePage: "income.html?userId=" + info.userId,
//     incomeDetail: "ic-detail.html?userId=" + info.userId,
//     withdrawframe: "http://www.7kuaitang.com/wcserv/wechat3/main_tixian.jsp?openid=" + info.openId,
//     withdraw: "withdraw.html?userId=" + info.userId + "&openId=" + info.openId,
//     helpios9: "helpios9.html?userId=" + info.userId, //ios9设置方法

//     img: {
//         download: "img/offline_yaoshi.png", //下载框中logo
// //      errorWarming: "", //网络错误图片
//     },
//     agreement: "http://www.7kuaitang.com/xieyi.html", //下载框用户协议

//     itunesDownload: "http://itunes.apple.com/us/app/id=",
//     itunesSearch: "https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?mt=8&submit=edit&term=",

    // scheme: "SevenCandiesKey://?unionId=" + info.unionId + "&v=" + new Base64().encode(info.version) + "&openId=" + info.openId, //URLScheme
    // downloadUrl: "itms-services://?action=download-manifest&url=https://dn-qikuaitang.qbox.me/manifest.plist?"+new Date().getTime().toString(), //钥匙下载链接

    // scheme: "SevenCandiesKey://?unionId=" + info.unionId + "&v=" + new ,
    downloadUrl:"itms-services://?action=download-manifest&url=https://o4zkv147p.qnssl.com/qianke_key.plist?"+ new Date().getTime().toString(),




}





var headdata = {
        'head': {
            'version': '20010000',
            'channelid': 'AppStore'
        }
    }
    // 合并对象
function mergeObject(a, b) {
    return $.extend({}, a, b);
};
// md5
function encryptMd(dataMd) {
    return $.md5(JSON.stringify(dataMd) + 'wwwqianke360cn');
}

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
    //浏览器后退
function back() {
    history.go(-1); //后退1页  
};
$('.backBt').click(function(){back();})







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
        var bottom = this.bottom == null ? '20px' : this.bottom;
        msgEntity.css({
            position: 'absolute',
            bottom: bottom,
            'z-index': '99',
            left: left,
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
    var encode = escape(JSON.stringify(mergedata));
    $.ajax({
        url: globalUrl + secret + '&p=' + encode,
        type: 'post',
        dataType: 'json',
        data: mergedata,
        beforeSend: function() {
            loadshow();
        },
        success: function(response) {
            callback(response.message);
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





var globalUrl = _GLOBAL.queryString(window.location.search);
    // unionidnum = globalUrl['unionid'] || null;

// if (unionidnum == null) {

// };

// alert(globalUrl['unionid']);


var info = {};

console.log(window.localStorage.getItem("unionId"));

if (window.localStorage.getItem("unionId") == null) {
    if (globalUrl['unionid'] == null) {
        info.unionId = "1";

        new Toast({
            context: $('body'),
            message: '请返回微信公众号重新打开'
        }).show();
        window.location.href = "weixin://";

    }else{
        info.unionId = globalUrl['unionid'];
        window.localStorage.setItem("unionId",globalUrl['unionid']);
    }
}else{

    if (globalUrl['unionid'] != null) {
        window.localStorage.clear();
        window.localStorage.setItem("unionId",globalUrl['unionid']);
        console.log(window.localStorage.getItem("unionId"));
    }

    // console.log(globalUrl['unionid']);
    
    info.unionId = window.localStorage.getItem("unionId");
}
// console.log(info.unionId);


// 账户id
function useridData(callback) {
 console.log(info.unionId);
   
    var accountdata = {
        'body': {
            't': 2001,
            'c': [{
                'userkey': info.unionId
            }]
        }
    };
    getdata(useridData, function(res, err) {
        callback(res, err);
    });
};


if (window.localStorage.getItem("userId") == null) {
    // console.log(info.unionId)
    // $.ajax({
    //     type: "post",
    //     url: "data.php",
    //     data: {param: '{"t":2001,"c":[{"userkey":"'+info.unionId+'"}]}'},
    //     async: false,
    //     dataType:"json",
    //     success: function(back) {
    //         var o = $.parseJSON(back.message);
    //         console.log(o);
    //         info.userId = o.user.userId;
    //         info.user = o.user;
    //         window.localStorage.setItem("userId",o.user.userId);
    //         window.localStorage.setItem("user",JSON.stringify(o.user));
    //     }
    // })
    useridData(function(a,b) {

           console.log(a);
     

        var msg = JSON.stringify(a);
        console.log(msg);


        userid = a.user.userId;
        window.localStorage.setItem("userId",a.user.userId);
    });






}else{
    if (userid!=null&&userid!=window.localStorage.getItem("userId")){
        new Toast({
            context: $('body'),
            message: '请返回微信公众号重新打开'
        }).show();
        window.location.href = "weixin://";
    }else{
        userid = window.localStorage.getItem("userId");
        // $.ajax({
        //     type:"post",
        //     url:"data.php",
        //     data:{param:'{"t":2001,"c":[{"userkey":"'+info.userId+'"}]}'},
        //     async:false,
        //     dataType:"json",
        //     success:function(back){
        //         var o = $.parseJSON(back.message);
        //         console.log(o);
        //         info.user = o.user;
        //     },
        //     error:function(){
        //         ajaxError();
        //     }
        // });
    }
}









// 账户数据
function accountData(callback) {
    var accountdata = {
        'body': {
            't': 3001,
            'c': [{
                'userid': userid,
                'date': currentDate
            }]
        }
    };
    getdata(accountdata, function(res, err) {
        callback(res, err);
    });
};

// 用户信息
function userData(callback) {
    var userdata = {
        'body': {
            't': 2013,
            'c': [{
                'userid': userid
            }]
        }
    };
    getdata(userdata, function(res, err) {
        callback(res, err);
    });
};

// 任务列表数据
function taskList(callback) {
    var taskdata = {
        'body': {
            't': 1003,
            'c': [{
                'keyid': userid,
                'imei': imeinum,
                'pages': 0
            }]
        }
    };
    getdata(taskdata, function(res, err) {
        callback(res, err);
    });
};


// 邀请人数
function invitenNumberData(callback) {
    var invitennumberdata = {
        'body': {
            't': 2001,
            'c': [{
                'userkey': userid
            }]
        }
    };
    getdata(invitennumberdata, function(res, err) {
        callback(res, err);
    });
};



// 取行为列表：USERID, DEVID, 行为类别（0-all 1-下载 2-安装 3-注册 4-点击展示 5-划屏 6-分享 7-伞下收入 8-其它）
function listBehavior(callback) {
    var listbehavior = {
        'body': {
            't': 3013,
            'c': [{
                'userid': userid,
                "devid": devid,
                'acttype': 1
            }]
        }
    };
    getdata(listbehavior, function(res, err) {
        callback(res, err);
    });
};



// 提现
function depositors(cashid, moneynmu, ways, accountid, token, callback) {
    //moneynmu 钱数
    // ways 收款帐号类别 
    // var moneynmu = moneynmu,ways = ways;


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
                'username': '',
                'userphone': '',
                'devtoken': ''
            }]
        }
    };


    // userid 用户ＩＤ
    // passwd 密码，
    // money 钱数，
    // accountid 收款帐号,
    // acctype 收款帐号类别（0-支付宝 1-微信 2-qq币 3-银行）,
    // token 交易识别码, 
    // donate 捐赠（0-不是 1-是）,
    // username 用户名（捐赠情况下有效），
    // userphone 用户手机号（捐赠情况下有效）

    getdata(depositorsdata, function(res, err) {
        callback(res, err);
    });
};

// 消息
function messageList(callback) {
    var messagelist = {
        'body': {
            't': 2010,
            'c': [{
                'userid': userid,
                'status': 1
            }]
        }
    };
    getdata(messagelist, function(res, err) {
        callback(res, err);
    });
};
//消息已读信息提交
//设消息读取状态：msgids消息列表，用,号分割，  status（0-未读 1-已读 2-清空）
function messageSub(callback) {
    var messagesub = {
        'body': {
            't': 2011,
            'c': [{
                'msgids': msgids,
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
function gainsList(callback) {
    var gainsdata = {
        'body': {
            't': 3019,
            'c': [{
                'userid': userid,
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
function invitedList(callback) {
    var inviteddata = {
        'body': {
            't': 3019,
            'c': [{
                'userid': userid,
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
function postalList(callback) {
    var postaldata = {
        'body': {
            't': 3015,
            'c': [{
                'userid': userid,
                'pages': 0
            }]
        }
    };
    getdata(postaldata, function(res, err) {
        callback(res, err);
    });
};

//取用户消息:用户ＩＤ, 状态（0-未读， 1-已读 10-全部 8-未取过的数据 9-已取过的数据  注：对fromid=10000的信息，要对内容进行解析并重组 ）
function messageList(callback) {
    var messagedata = {
        'body': {
            't': 2010,
            'c': [{
                'userid': userid,
                'status': 10
            }]
        }
    };
    getdata(messagedata, function(res, err) {
        callback(res, err);
    });
};



//取签到数据
function signData(callback) {
    var signdata = {
        'body': {
            't': 3013,
            'c': [{
                'userid': userid,
                "devid": devid,
                'acttype': 0
            }]
        }
    };
    getdata(signdata, function(res, err) {
        callback(res, err);
    });
};