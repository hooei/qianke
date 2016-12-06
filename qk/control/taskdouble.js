// var array1 = [ {"Num": "A "  },{"Num": "B" },{"Num": "D" }];
// var array2 = [ {"Num": "A ","Name": "t1 " }, {"Num": "B","Name": "t2"}, {"Num": "C " ,"Name": "t3 "}];
// var result = [];
// var result2 = [];
// for(var i = 0; i < array1.length; i++){
//     var obj = array1[i];
//     var num = obj.Num;
//     var isExist = false;
//     for(var j = 0; j < array2.length; j++){
//         var aj = array2[j];
//         var n = aj.Num;
//         if(n == num){
//             isExist = true;
//             break;
//         }
//     }
//     if(!isExist){
//         result.push(obj);
//     }
//     if(isExist){
//         result2.push(obj);
//     }
// }
// console.log(result);
// console.log(result2);
//获取相对日期
function GetRelativeDate(timestampstr) {
    var timestamp = parseInt(timestampstr);
    timestamp = isNaN(timestamp) ? 0 : timestamp;
    var thenT = new Date(timestamp);
    thenT.setHours(0);
    thenT.setMinutes(0);
    thenT.setSeconds(0);
    var nowtime = new Date();
    nowtime.setHours(0);
    nowtime.setMinutes(0);
    nowtime.setSeconds(0);
    var delt = Math.round((nowtime.getTime() - thenT.getTime()) / 1000 / 86400);
    var day_def = {
        '-2': '后天',
        '-1': '明天',
        '0': '今天',
        '1': '昨天',
        '2': '前天'
    }[delt.toString()] || ((delt >= -30 && delt < 0) ? Math.abs(delt) + '天后' : (delt > 0 && delt <= 30) ? delt + '天前' : GetDateString(timestamp));
    return day_def;
}

function GetDateString(timestampstr, split) {
    var timestamp = parseInt(timestampstr);
    timestamp = isNaN(timestamp) ? 0 : timestamp;
    var datetime = new Date(timestamp);
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    if (split === undefined)
        split = '-';
    return datetime.getFullYear() + split + (month > 9 ? month : "0" + month) + split + (date > 9 ? date : "0" + date);
}



// nowt = new Date().getTime();
// y36 = new Date().getTime()-86400000*36;
// y30 = new Date().getTime()-86400000*30;
// y = new Date().getTime()-86400000;
// tt = new Date().getTime()+86400000;
// ttt = new Date().getTime()+86400000*5;
// console.warn(GetRelativeDate(y36));
// console.warn(GetRelativeDate(y30));
// console.warn(GetRelativeDate(y));
// console.warn(GetRelativeDate(nowt));
// console.warn(GetRelativeDate(tt));
// console.warn(GetRelativeDate(ttt));



//倒计时时间
var countdownTimer = function() {
    var list = [],
        interval;

    return function(id, time) {
        if (!interval)
            interval = setInterval(go, 1000);
        list.push({
            ele: document.getElementById(id),
            time: time
        });
    }

    function go() {
        for (var i = 0; i < list.length; i++) {
            list[i].ele.innerHTML = getTimerString(list[i].time ? list[i].time -= 1 : 0);
            if (!list[i].time)
                list.splice(i--, 1);
        }
    }

    function getTimerString(time) {
        // d = Math.floor(time / 86400),   
        // h = Math.floor((time % 86400) / 3600),   
        m = Math.floor(((time % 86400) % 3600) / 60),
            s = Math.floor(((time % 86400) % 3600) % 60);
        if (time > 0){
            return "等待完成"+ " " + m + "分" + s + "秒";
        }else{

            suspendSuspend(tickingId);
            return "等待完成"+ " " +"0" + "分" +"0" + "秒"; 
        }
        // return m + "分" + s + "秒";
        // else suspendSuspend(tickingId);
    }
}();
// 倒计时任务自动中止
function suspendSuspend(id) {
    document.getElementById('taskticking').innerHTML = "0分0秒";
    z.useridData(function() {
        z.cancelTask(id, function(a) {
            console.log(a);
            // back();
            window.localStorage.removeItem("ongoing");
            var ongoingState = window.localStorage.getItem("ongoing");
            console.log(ongoingState);
            if (ongoingState == null) {
                window.location.reload();
            };
            console.log('放弃进行中任务');
        });

    });


}



// function removeTipSurplus(){
//     alert('123');
// $(this).remove();
// }

//随机颜色
var colornum = 0;

function randomColor() {
    var arr = ["#cd0202", "#fe8f00", "#01ccde", "#0083fe"];
    // var index = Math.floor((Math.random() * arr.length));
    // console.log(arr[index]); 
    if (colornum > arr.length - 1) {
        colornum = 0
    };
    //console.log(colornum);
    var colorxz = arr[colornum]
    colornum = colornum + 1;
    // console.log(color);
    // console.log(colornum);
    return colorxz;

}



Array.prototype.find = function(func) {
    var temp = [];
    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) {
            temp[temp.length] = this[i];
        }
    }
    return temp;
};

Array.prototype.remove = function(b) {
    var a = this.indexOf(b);
    if (a >= 0) {
        this.splice(a, 1);
        return true;
    }
    return false;
};
// 进行中倒计时
var tickingTime = '';
// 进行中任务id
var tickingId = '';

var specialtasklist = [], //专属任务
    finishlist = [], //包含已完成任务指引
    awaitlist = []; //等待完成
waitlist = []; //进行中

wcrwlist = []; //已完成

//存在进行中任务
var existWay = '';
var existWayNumber = '';
var existId = '';


var z = new citesData();
z.useridData(function() {
    // 任务列表数据
    z.taskList(function(a, b) {
        var data = a.adlist;
        var aheaddata = a.future; //即将开始数据
        // var msg = JSON.stringify(aheaddata);
        // console.log(msg);
        for (var i in data) {
            var item = data[i],
                tasktype = item.adType; //类型
            if (tasktype == 5) {
                specialtasklist.push(data[i])
            };

        };

        z.listBehaviorTwo(function(a, b) {

            var screendata = a.actlist;

            var msg = JSON.stringify(screendata);
            console.log(msg);


            var temparr = screendata;
            // console.log(temparr.length);
            screendata.find(function(obj) {
                return obj.type == "1";
            }).forEach(function(item) {
                var that = this;
                var r = screendata.find(function(obj) {
                        return obj.adid == item.adid && obj.type == "2";
                    })
                    // console.log(item.adid);
                    // console.log(r);
                if (r.length > 0) {
                    temparr.remove(item); //等于1
                    // temparr.remove(r[0]);//等于2
                }

            });
            // console.log(temparr.length);
            // console.log(temparr);

            finishlist = temparr;


            // var msgone = JSON.stringify(finishlist);
            // console.log(msgone);

            // var msg = JSON.stringify(specialtasklist);
            // console.log(msg);
            // var msg2 = JSON.stringify(finishlist);
            // console.log(msg2);
            for (var i = 0; i < specialtasklist.length; i++) {
                var obj = specialtasklist[i];
                var num = obj.adId;

                //进行中
                var isExist = false;
                //已完成
                var isFulfil = false;


                for (var j = 0; j < finishlist.length; j++) {
                    var aj = finishlist[j];
                    var n = aj.adid;
                    var m = aj.type;
                    if (n == num && m == 1) {
                        isExist = true;
                        // obj.data = hhhh;
                        taskStartTime = aj.time;
                        console.log(taskStartTime);


                        //现在时间
                        // new Date().getTime();
                        // 任务开始时间
                        // new Date(taskStartTime.substring(0,19).replace(/-/g,"/")).getTime();
                        //差额时间
                        var timeDifference = new Date().getTime() - new Date(taskStartTime.substring(0, 19).replace(/-/g, "/")).getTime();
                        //距离30分钟时间
                        var Semih = 1800000;
                        var balanceTime = 1800000 - timeDifference;

                        //倒计时秒数
                        tickingTime = Math.ceil(balanceTime / 1000);
                        console.log(tickingTime);
                        break;
                    }
                    if (n == num && m == 2) {
                        isFulfil = true;
                        break;
                    }
                }
                if (!isExist && !isFulfil) {
                    //等待完成
                    awaitlist.push(obj);
                }
                if (isExist) {
                    //进行中
                    waitlist.push(obj);
                }

                if (isFulfil) {
                    //已完成
                    wcrwlist.push(obj);
                    // specialtasklist.remove(obj);
                }


            }
            //等待执行任务
            // var msg = JSON.stringify(awaitlist);
            // console.log(msg);
            //进行中任务
            var msg2 = JSON.stringify(waitlist);
            console.log(msg2);
            //已完成任务
            // var msg3 = JSON.stringify(wcrwlist);
            // console.log(msg3);

            console.log(awaitlist.length + "等待执行任务");
            console.log(waitlist.length + "进行中任务");
            console.log(wcrwlist.length + "已完成任务");
            console.log(aheaddata.length + "即将开始任务");



            //等待完成list

            if (awaitlist.length > 0) {
                var awaitlisthtml = "";
                var awaitlisthtmlData = [];
                var awaitlisthtmlZero = "";
                var awaitlisthtmlZeroData = [];

                for (var i = 0; i < awaitlist.length; i++) {
                    var item = awaitlist[i],
                        tasksurplus = item.adRestTimes; //剩余份数

                    if (tasksurplus == 0) {
                        awaitlisthtmlZeroData.push(item);
                    } else {
                        awaitlisthtmlData.push(item);
                    }
                };

                //  var msg = JSON.stringify(awaitlisthtmlData);
                // console.log(msg);
                // var msg2 = JSON.stringify(awaitlisthtmlZeroData);
                // console.log(msg2);



                //剩余不为0
                for (var i = 0; i < awaitlisthtmlData.length; i++) {
                    var item = awaitlisthtmlData[i],
                        taskmark = item.adId, //唯一标示
                        tasktype = item.adType, //类型

                        taskname = item.adTitle || '', //任务名字
                        taskclassify = item.adIosClass, //任务分类
                        taskbonus = item.adInsIncome, //任务奖金
                        tasksurplus = item.adRestTimes, //剩余份数
                        taskprefix = item.adLogo; //图片地址

                    // console.log(taskprefix);
                    if (taskprefix.indexOf("http://") >= 0) {
                        var imgsrc = item.adLogo; //包含http://图片地址
                    } else {
                        var imgsrc = imgUrl + item.adLogo; //图片地址
                    }
                    awaitlisthtml += "<li>";
                    awaitlisthtml += "<a data-surplus=" + tasksurplus + " class='tasklink'  data-taskmark='" + taskmark + "' data-ongoing=false>";
                    awaitlisthtml += "<div class='templcon'>";
                    awaitlisthtml += "<span><img src='" + imgsrc + "'  height='54' width='54' alt='' /></span>";
                    awaitlisthtml += "<div class='templconInfo'>";
                    awaitlisthtml += "<div>";
                    awaitlisthtml += "<h2>" + taskname + "</h2>" + "<span class='tipbor'>" + taskclassify + "</span>" + "<span class='tipbor'>" + "剩" + tasksurplus + "份" + "</span>";
                    awaitlisthtml += "</div>";
                    awaitlisthtml += "<span class='reward'>" + "+" + (taskbonus / 100).toFixed(2) + "</span>" + "元";
                    awaitlisthtml += "</div>";
                    awaitlisthtml += "</div>";
                    awaitlisthtml += "</a>";
                    awaitlisthtml += "</li>";
                    // listlength++;

                };
                $('#taskList').append(awaitlisthtml);

                //剩余为0
                for (var i = 0; i < awaitlisthtmlZeroData.length; i++) {
                    var item = awaitlisthtmlZeroData[i],
                        taskmark = item.adId, //唯一标示
                        tasktype = item.adType, //类型

                        taskname = item.adTitle || '', //任务名字
                        taskclassify = item.adIosClass, //任务分类
                        taskbonus = item.adInsIncome, //任务奖金
                        tasksurplus = item.adRestTimes, //剩余份数
                        taskprefix = item.adLogo; //图片地址

                    // console.log(taskprefix);
                    if (taskprefix.indexOf("http://") >= 0) {
                        var imgsrc = item.adLogo; //包含http://图片地址
                    } else {
                        var imgsrc = imgUrl + item.adLogo; //图片地址
                    }
                    awaitlisthtmlZero += "<li>";
                    awaitlisthtmlZero += "<a data-surplus=" + tasksurplus + " class='tasklink'  data-taskmark='" + taskmark + "' data-ongoing=false>";
                    awaitlisthtmlZero += "<div class='templcon'>";
                    awaitlisthtmlZero += "<span><img src='" + imgsrc + "'  height='54' width='54' alt='' /></span>";
                    awaitlisthtmlZero += "<div class='templconInfo'>";
                    awaitlisthtmlZero += "<div>";
                    awaitlisthtmlZero += "<h2>" + taskname + "</h2>" + "<span class='tipbor'>" + taskclassify + "</span>" + "<span class='tipbor'>" + "剩" + tasksurplus + "份" + "</span>";
                    awaitlisthtmlZero += "</div>";
                    awaitlisthtmlZero += "<span class='reward'>" + "+" + (taskbonus / 100).toFixed(2) + "</span>" + "元";
                    awaitlisthtmlZero += "</div>";
                    awaitlisthtmlZero += "</div>";
                    awaitlisthtmlZero += "</a>";
                    awaitlisthtmlZero += "</li>";
                    // listlength++;

                };
                // $('#taskList').prepend(awaitlisthtml);
                $('#taskList').append(awaitlisthtmlZero);
                // console.log(listlength)
            };



            //已完成list
            if (wcrwlist.length > 0) {
                var wcrwlisthtml = "";
                for (var i = 0; i < wcrwlist.length; i++) {
                    var item = wcrwlist[i],
                        taskmark = item.adId, //唯一标示
                        tasktype = item.adType, //类型

                        taskname = item.adTitle, //任务名字
                        taskclassify = item.adIosClass, //任务分类
                        taskbonus = item.adRealIncome, //任务奖金
                        tasksurplus = item.adRestTimes, //剩余份数
                        taskprefix = item.adLogo; //图片地址
                    if (taskprefix.indexOf("http://") >= 0) {
                        var imgsrc = item.adLogo; //包含http://图片地址
                    } else {
                        var imgsrc = imgUrl + item.adLogo; //图片地址
                    }
                    wcrwlisthtml += "<li>";
                    wcrwlisthtml += "<div class='templcon'>";
                    wcrwlisthtml += "<span><img src='" + imgsrc + "'  height='54' width='54' alt='' /></span>";
                    wcrwlisthtml += "<div class='templconInfo'>";
                    wcrwlisthtml += "<div>";
                    wcrwlisthtml += "<h2>" + taskname + "</h2>" + "<span class='tipbor'>" + "剩余" + tasksurplus + "份" + "</span>";
                    wcrwlisthtml += "</div>";
                    wcrwlisthtml += "<span class='waittip'>" + "已完成" + "</span>";
                    wcrwlisthtml += "</div>";
                    wcrwlisthtml += "</div>";
                    wcrwlisthtml += "</li>";
                    // listlength++;

                }
                $('#hasDone').append(wcrwlisthtml);
            };



            // console.log(waitlist.length);

            //进行中list
            if (waitlist.length > 0) {
                //存在进行中任务
                existWay = true;
                var taskoOngoing = [];
                var waitlisthtml = "";
                // for (var i in waitlist) {
                //     var item = waitlist[i],
                //         taskstate = item.type; // 任务状态
                //         if (taskstate == 1) {
                //            taskoOngoing.push(item); 
                //         };
                // };
                for (var i = 0; i < waitlist.length; i++) {
                    var item = waitlist[i],
                        taskmark = item.adId, //唯一标示
                        taskname = item.adTitle, //任务名字
                        taskclassify = item.adIosClass, //任务分类
                        tasksurplus = item.adRestTimes, //剩余份数
                        taskprefix = item.adLogo; //图片地址

                    existWayNumber = taskmark;

                    //进行中任务id
                    tickingId = item.adId;


                    if (taskprefix.indexOf("http://") >= 0) {
                        var imgsrc = item.adLogo; //包含http://图片地址
                    } else {
                        var imgsrc = imgUrl + item.adLogo; //图片地址
                    };

                    waitlisthtml += "<li>";
                    // waitlisthtml += "<a data-surplus=" + tasksurplus + " class='tasklink' href=" + "appdetails.html?taskmark=" + taskmark + "&ongoing=true" +">";
                    waitlisthtml += "<a data-surplus=" + tasksurplus + " class='tasklink'  data-taskmark='" + taskmark + "' data-ongoing=true>";
                    waitlisthtml += "<div class='templcon'>";
                    waitlisthtml += "<span><img src='" + imgsrc + "'  height='54' width='54' alt='' /></span>";
                    waitlisthtml += "<div class='templconInfo'>";
                    waitlisthtml += "<div>";
                    waitlisthtml += "<h2>" + "<span class='red' id='taskticking'>" + taskname +"</span>" + "</h2>" + "<span class='tipbor'>" + taskclassify + "</span>" + "<span class='tipbor'>" + "剩" + tasksurplus + "份" + "</span>";
                    waitlisthtml += "</div>";
                    waitlisthtml += "<span class='waittip'>" + "进行中" + "</span>";
                    waitlisthtml += "</div>";
                    waitlisthtml += "</div>";
                    waitlisthtml += "</a>";
                    waitlisthtml += "</li>";
                    // listlength++;
                }
                $('#taskList').prepend(waitlisthtml);
                // $('#taskList').append(waitlisthtml);
                // console.log(listlength)
                countdownTimer("taskticking", tickingTime);


            };
            //进行中list end
        });
        //即将开始list
        if (aheaddata.length > 0) {

            var bonusNumArray = [];
            var bonushtml = "";
            var bonusNum = 0;
            for (var i = 0; i < aheaddata.length; i++) {
                var aheadhtml = "";
                var item = aheaddata[i],
                    taskbonus = parseInt(item.adInsIncome); //任务奖金
                // console.log(taskbonus);
                bonusNumArray.push(taskbonus);
            };
            // console.log(bonusNumArray);

            function getSum(item, index, array) {
                bonusNum += item;
                //console.log(bonusNum);
                return true; //由于every方法是会在遇到回调函数返回的第一个false时停止遍历所以需要始终返回true
            };
            bonusNumArray.every(getSum);
            // console.log(bonusNum);
            bonushtml += "<div class='aheadtip'>" + "任务即将开始，总计" + "<span class='red'>" + (bonusNum / 100).toFixed(2) + "</span>" + "元，准时来抢！";
            bonushtml += "</div>";
            $('#aheadtip').prepend(bonushtml);



            for (var i = 0; i < aheaddata.length; i++) {
                var aheadhtml = "";
                var item = aheaddata[i],
                    taskmark = item.adId, //唯一标示
                    tasktype = item.adType, //类型
                    taskname = (item.adTitle).substring(0, 1) || '', //任务名字
                    //taskStartTime = new Date(item.adStartTime.substr(0,10)+"T"+item.adStartTime.substr(11,8)).getTime(), //上线时间
                    taskStartTime = new Date(item.adStartTime.replace(/-/g, "/")).getTime(), //上线时间
                    hoursTime = item.adStartTime.substring(11, 16),


                    taskbonus = item.adInsIncome, //任务奖金
                    tasksurplus = item.adRestTimes, //剩余份数
                    taskprefix = item.adLogo; //图片地址


                if (taskprefix.indexOf("http://") >= 0) {
                    var imgsrc = item.adLogo; //包含http://图片地址
                } else {
                    var imgsrc = imgUrl + item.adLogo; //图片地址
                };
                var backColor = randomColor();
                var isAboutTime = GetRelativeDate(taskStartTime);


                aheadhtml += "<li>";
                aheadhtml += "<div class='templcon'>";
                aheadhtml += "<span class='hideph' style='background:" + backColor + "'>" + "?" + "</span>";
                aheadhtml += "<div class='templconInfo'>";
                aheadhtml += "<div>";
                aheadhtml += "<h2>" + taskname + "***" + "</h2>" + "<span class='tipbor'>" + isAboutTime + " " + hoursTime + "</span>" + "<span class='tipbor'>" + "剩" + tasksurplus + "份" + "</span>";
                aheadhtml += "</div>";
                aheadhtml += "<span class='reward'>" + "+" + (taskbonus / 100).toFixed(2) + "</span>" + "元";
                aheadhtml += "</div>";
                aheadhtml += "</div>";
                aheadhtml += "</li>";
                $('#aheadlist').append(aheadhtml);
            }



        };


    });



});



$('#taskList').delegate('.tasklink', 'click', function(e) {
    var $tasklink = $(e.currentTarget);
    // console.log($tasklink);
    var surplusNum = $tasklink.data('surplus');
    var taskmarkDate = $tasklink.data('taskmark');
    var taskmarkOngoing = $tasklink.data('ongoing') || false;
    if (existWay == true && taskmarkOngoing == false) {
        var existWaytip = "";
        existWaytip += "<div class='tipconsurplus'>";
        existWaytip += "<div class='tipsurplusmask'>" + "</div>";
        existWaytip += "<div class='tipsurplus'>";
        existWaytip += "<h2>" + "温馨提示" + "</h2>";
        existWaytip += "<dl>";
        existWaytip += "<dt>" + "您有未完成的任务" + "<br/>" + "不要太贪心哦！" + "</dt>";
        existWaytip += "</dl>";
        existWaytip += "<div class='tiptipsurplusBt'>";
        existWaytip += "<div class='closesurplustip abandon'>" + "放弃任务" + "</div>";
        existWaytip += "<div class='invitelink'>";
        existWaytip += "<a href='appdetails.html?taskmark=" + existWayNumber + "&ongoing=true" + "'  >" + "去完成" + "</a>";
        existWaytip += "</div>";
        existWaytip += "</div>";
        existWaytip += "</div>";
        existWaytip += "</div>";
        $("body").append(existWaytip);

        $('.abandon').click(function() {
            z.useridData(function() {
                z.cancelTask(existWayNumber, function(a) {
                    // console.log(a);
                    window.localStorage.removeItem("ongoing");
                    window.location.reload();
                    console.log('列表中放弃任务');
                });

            });
        })
        return false;
    };

    // console.log(surplusNum);
    if (surplusNum == 0) {
        // var surplustip = "";
        // surplustip += "<div class='tipconsurplus'>";
        // surplustip += "<div class='tipsurplusmask'>" + "</div>";
        // surplustip += "<div class='tipsurplus'>";
        // surplustip += "<h2>" + "温馨提示" + "</h2>";
        // surplustip += "<dl>";
        // surplustip += "<dt>" + "哎呀～暂时被抢光了！等等看吧" + "</dt>";
        // surplustip += "</dl>";
        // surplustip += "<div class='tiptipsurplusBt'>";
        // surplustip += "<div class='closesurplustip'>" + "我知道了" + "</div>";
        // surplustip += "<div class='invitelink'>";
        // surplustip += "<a href='" + "apprentice.html?source=taskDouble" + "'>" + "邀请好友赚取更多"+"</a>";
        // surplustip += "</div>";
        // surplustip += "</div>";
        // surplustip += "</div>";
        // surplustip += "</div>";
        // $("body").append(surplustip);
        $('.tipconsurplus').show();
        return false;
    } else {
        window.location.href = "appdetails.html?taskmark=" + taskmarkDate + "&ongoing=" + taskmarkOngoing;
    }



});



$('.closesurplustip').click(function() {
    $('.tipconsurplus').hide();
})



$('#aheadlist').delegate('li', 'click', function(e) {

    var aheadtip = "";
    aheadtip += "<div class='tipconsurplus'>";
    aheadtip += "<div class='tipsurplusmask'>" + "</div>";
    aheadtip += "<div class='tipsurplus'>";
    aheadtip += "<h2>" + "温馨提示" + "</h2>";
    aheadtip += "<dl>";
    aheadtip += "<dt>" + "别急哦" + "<br/>" + "该任务还没有开始呢～" + "</dt>";
    aheadtip += "</dl>";
    aheadtip += "<div class='tiptipsurplusBt'>";
    aheadtip += "<div class='closesurplustip abandon'>" + "确定" + "</div>";
    // aheadtip += "<div class='invitelink'>";
    // aheadtip += "<a href='appdetails.html?taskmark=" + existWayNumber + "&ongoing=true" +"'  >" + "去完成"+"</a>";
    // aheadtip += "</div>";
    aheadtip += "</div>";
    aheadtip += "</div>";
    aheadtip += "</div>";
    $("body").append(aheadtip);
    $('.abandon').click(function() {
        $('.tipconsurplus').remove();
    })
    return false;
});