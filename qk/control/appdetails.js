var jschars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function generateMixed(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += jschars[id];
    }
    return res;
}
var randomNum = generateMixed(20);


document.getElementById('randomHref').setAttribute("href", "taskDouble.html?randomNum=" + randomNum);



//时间
var addTimer = function() {
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
        if (time > 0)
            return m + "分" + s + "秒";
        else window.location.href = "taskDouble.html?randomNum=" + randomNum;
    }
}();



function swipershow() {
    $('.slidermask').show();
    $('.sliderpop').toggleClass('showstate');
};

function swiperhide() {
    $('.slidermask').hide();
    $('.sliderpop').toggleClass('showstate');
};

function sliderbodyHeight() {
    var unlockbody = $('.sliderpop').height() - 62;
    $('.unlockbody').height(unlockbody);
};
sliderbodyHeight();
$(window).resize(function() {
    sliderbodyHeight();
});
$('.sliderclose').click(function() {
    swiperhide();
    window.location.reload();
})

var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    // autoHeight: true, //enable auto height
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
});


var places = '';
var taskUrl = '';
var argumentUrl = _GLOBAL.queryString(window.location.search),
    markurl = argumentUrl['taskmark'] || 0,
    ongoingzt = argumentUrl['ongoing'];

var rwtext = document.getElementById("gaveUp");



var ongoingZt = "";

if (window.localStorage.getItem("ongoing") == null) {
    ongoingZt = ""
} else {
    ongoingZt = window.localStorage.getItem("ongoing");
}

console.log(ongoingzt);
console.log(ongoingZt);


if (ongoingzt == 'true' || ongoingZt == 'true') {
    rwtext.innerHTML = "中止任务";
} else {
    rwtext.innerHTML = "放弃任务";
}



var taskbonusign, taskbonustwo, totalnum;

var z = new citesData();
z.useridData(function() {
    // 账户数据
    z.adDetail(markurl, function(a, b) {
        var data = a.advert;
        var msg = JSON.stringify(data);
        console.log(msg);
        for (var i in data) {
            var item = data[i],
                taskmark = item.adId;



            if (taskmark == markurl) {

                var taskcopytext = item.adIosSearch, //任务copy名字
                    taskdescribe = item.adChargeDesc, //任务描述
                    taskbonus = item.adInsIncome; //任务奖金
                taskbonustwo = item.adInsIncome; //任务奖金
                tasktype = item.adIosType, //任务类型
                    taskURL = item.adUrl, //任务appstore地址
                    places = item.adId; //任务id

                taskprefix = item.adLogo; //图片地址
                if (taskprefix.indexOf("http://") >= 0) {
                    var imgsrc = item.adLogo; //包含http://图片地址
                } else {
                    var imgsrc = imgUrl + item.adLogo; //图片地址
                }

                if (taskURL.indexOf("http://") >= 0) {
                    taskurl = item.adUrl; //包含http://图片地址
                } else {
                    taskurl = 'http://itunes.apple.com/us/app/id' + item.adUrl + '?mt=8'; //图片地址
                };


                var arraydescribe = taskdescribe.split("|");
                var describelist = "";
                for (var j = 0; j < arraydescribe.length; j++) {
                    describelist += "<li>" + "<span>" + (j + 1) + "." + "</span>" + "<div>" + arraydescribe[j] + "</div>" + "</li>";



                };



                $('#arraydescribe').html(describelist);
                $('#taskbonus').html((taskbonus / 100).toFixed(2));
                $('#taskbonustwo').html((taskbonustwo / 100).toFixed(2));


                if (tasktype == 1) {

                    var taskcopr = '';
                    taskcopr += "<dl>";
                    taskcopr += "<dd>";
                    taskcopr += "<img src='" + imgsrc + "'  height='100' width='100' alt=''/>";
                    taskcopr += "</dd>";
                    taskcopr += "<dt>";
                    taskcopr += "<span class='appname' id='appname'>" + taskcopytext + "</span>";
                    taskcopr += "</dt>";
                    taskcopr += "</dl>";
                    taskcopr += "<ul>";
                    taskcopr += "<li>" + "复制倒计时：";
                    taskcopr += "<span class='red' id='countdown'></span>"
                    taskcopr += "</li>";
                    taskcopr += "<li>" + "长按虚线框，拷贝关键词" + "</li>";
                    taskcopr += "<li>" + "打开App Store搜索下载试玩" + "</li>";
                    taskcopr += "</ul>";

                    $('.appdetails').append(taskcopr);
                    addTimer("countdown", 99);
                    var appname = document.getElementById('appname');
                    document.addEventListener("selectionchange", function(e) {
                        if (window.getSelection().anchorNode.parentNode.id == 'appname' && document.getElementById('appname').innerText != window.getSelection()) {
                            var key = document.getElementById('appname');
                            window.getSelection().selectAllChildren(key);
                        }
                    }, false);

                    appname.addEventListener('copy', function(e) {
                        // var r=confirm('在“App Store”中打开链接吗？');
                        // if (r==true){apppop()}
                        // apppop();
                        z.useridData(function() {

                            z.copyData(places, function(a) {
                                console.log(a);
                                swipershow();
                                // ongoingzt = "true";
                                rwtext.innerHTML = "中止任务";
                                window.localStorage.setItem("ongoing", true);
                            });

                        });
                        // window.location.href = "itms-apps://itunes.apple.com";
                        // window.getSelection().removeAllRanges(); 

                    });
                };
                if (tasktype == 0) {

                    var taskcopr = '';
                    taskcopr += "<dl>";
                    taskcopr += "<dd>";
                    taskcopr += "<img src='" + imgsrc + "'  height='100' width='100' alt=''/>";
                    taskcopr += "</dd>";
                    taskcopr += "</dl>";
                    taskcopr += "<ul>";
                    taskcopr += "<li>" + "复制倒计时：";
                    taskcopr += "<span class='red' id='countdown'></span>"
                    taskcopr += "</li>";
                    taskcopr += "<li>" + "点击执行任务，去appstore下载试玩" + "</li>";
                    taskcopr += "</ul>";

                    $('.appdetails').append(taskcopr);
                    addTimer("countdown", 99);
                    var taskBtText = '';
                    taskBtText += "<div class='goappbt'>";
                    taskBtText += "<div class='btCon'>";
                    taskBtText += "<div class='btCon violetBt' id='carryout'>";
                    taskBtText += "执行任务";
                    taskBtText += "</div>";
                    taskBtText += "</div>";
                    taskBtText += "</div>";
                    $('.taskBtcon').prepend(taskBtText);
                    $('.violetBt').click(function() {
                        z.useridData(function() {
                            z.copyData(places, function(a) {
                                // console.log(a);

                                if (a == "succeed") {
                                    window.location.href = taskurl;
                                };
                            });
                        });
                    })
                };



            };

        }
        // 签到list
        z.signData(function(a, b) {
            signtasklist = a.signlist;

            if (signtasklist.length > 0) {

                for (var j in signtasklist) {
                    var item = signtasklist[j],
                        taskmark = item.adid; //剩余份数

                    if (taskmark == markurl) {
                        taskbonusign = item.adRealIncome //任务奖金
                    } else {
                        taskbonusign = 0;
                    };


                    $('#taskbonusign').html(taskbonusign);

                }

            } else {
                taskbonusign = 0;
            }


            totalnum = parseInt(taskbonusign) + parseInt(taskbonustwo);


            $('#totalnum').html((totalnum / 100).toFixed(2));


        });
    });

})


$('#gaveUp').click(function() {
    // console.log(places);

    if (ongoingzt == 'true' || ongoingZt == 'true') {
        z.useridData(function() {
            z.cancelTask(places, function(a) {
                console.log(a);
                // back();
                window.localStorage.removeItem("ongoing");

                var ongoingState = window.localStorage.getItem("ongoing");
                console.log(ongoingState);
                if (ongoingState == null) {
                    window.location.href = "taskDouble.html?randomNum=" + randomNum;
                };
                // window.location.href= "taskDouble.html?randomNum=" + randomNum;

                console.log('放弃进行中任务');
            });

        });

    } else {
        console.log('放弃任务');
        // back();
        window.location.href = "taskDouble.html?randomNum=" + randomNum;
    }
})