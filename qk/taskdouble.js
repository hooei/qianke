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


function removeTipSurplus(){
    alert('123');
$(this).remove();
}





var specialtasklist = [], //专属任务
    finishlist = [], //包含已完成任务指引
    awaitlist = []; //等待完成
waitlist = []; //已完成



var z = new citesData();
z.useridData(function() {
    // 任务列表数据
    z.taskList(function(a, b) {
        var data = a.adlist;
        var msg = JSON.stringify(data);
        console.log(msg);
        for (var i in data) {
            var item = data[i],
                tasktype = item.adType; //类型
            if (tasktype == 5) {
                specialtasklist.push(data[i])
            };

        };

        z.listBehaviorTwo(function(a, b) {
            finishlist = a.actlist;
            // var msg = JSON.stringify(specialtasklist);
            // console.log(msg);
            // var msg2 = JSON.stringify(finishlist);
            // console.log(msg2);
            for (var i = 0; i < specialtasklist.length; i++) {
                var obj = specialtasklist[i];
                var num = obj.adId;
                var isExist = false;
                for (var j = 0; j < finishlist.length; j++) {
                    var aj = finishlist[j];
                    var n = aj.adid;
                    if (n == num) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    awaitlist.push(obj);
                }
                if (isExist) {
                    waitlist.push(obj);
                }
            }

            // var msg = JSON.stringify(awaitlist);
            // console.log(msg);
            // var msg2 = JSON.stringify(waitlist);
            // console.log(msg2);

            // console.log(awaitlist.length);
            // console.log(waitlist.length);



            //等待完成list

            if (awaitlist.length > 0) {
                var awaitlisthtml = "";

                for (var i in awaitlist) {
                    var item = awaitlist[i],
                        taskmark = item.adId, //唯一标示
                        tasktype = item.adType, //类型

                        taskname = item.adTitle, //任务名字
                        taskclassify = item.adIosClass, //任务分类
                        taskbonus = item.adInsIncome, //任务奖金
                        tasksurplus = item.adRestTimes, //剩余份数
                        taskprefix = item.adLogo; //图片地址
                    if (taskprefix.indexOf("http://") >= 0) {
                        var imgsrc = item.adLogo; //包含http://图片地址
                    } else {
                        var imgsrc = imgUrl + item.adLogo; //图片地址
                    }
                    awaitlisthtml += "<li>";
                    awaitlisthtml += "<a data-surplus='" + tasksurplus + "' class='tasklink' href='" + "appdetails.html?taskmark=" + taskmark + "'>";
                    awaitlisthtml += "<div class='templcon'>";
                    awaitlisthtml += "<span><img src='" + imgsrc + "'  height='54' width='54' alt='' /></span>";
                    awaitlisthtml += "<div class='templconInfo'>";
                    awaitlisthtml += "<div>";
                    awaitlisthtml += "<h2>" + taskname + "</h2>" + "<span class='tipbor'>" + taskclassify + "</span>" + "<span class='tipbor'>" + "剩余" + tasksurplus + "份" + "</span>";
                    awaitlisthtml += "</div>";
                    awaitlisthtml += "<span class='reward'>" + "+" + (taskbonus / 100).toFixed(2) + "</span>" + "元";
                    awaitlisthtml += "</div>";
                    awaitlisthtml += "</div>";
                    awaitlisthtml += "</a>";
                    awaitlisthtml += "</li>";
                    // listlength++;

                }
                $('#taskList').prepend(awaitlisthtml);
                // console.log(listlength)



                $('#taskList li').on('click', '.tasklink', function(e) {
                    var $tasklink = $(e.currentTarget);
                    // console.log($tasklink)
                    var surplusNum = $tasklink.data('surplus');
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
                    }

                });





            };



            //已完成list
            // if (waitlist.length > 0) {
            //     var waitlisthtml = "";
            //     for (var i in waitlist) {
            //         var item = waitlist[i],
            //             taskmark = item.adId, //唯一标示
            //             tasktype = item.adType, //类型

            //             taskname = item.adTitle, //任务名字
            //             taskclassify = item.adIosClass, //任务分类
            //             taskbonus = item.adRealIncome, //任务奖金
            //             tasksurplus = item.adRestTimes, //剩余份数
            //             taskprefix = item.adLogo;//图片地址
            //             if (taskprefix.indexOf("http://")>=0) {
            //                 var imgsrc = item.adLogo; //包含http://图片地址
            //             }else{
            //                 var imgsrc = imgUrl + item.adLogo; //图片地址
            //             }
            //             waitlisthtml += "<li>";
            //             waitlisthtml += "<div class='templcon'>";
            //             waitlisthtml += "<span><img src='" + imgsrc + "'  height='54' width='54' alt='' /></span>";
            //             waitlisthtml += "<div class='templconInfo'>";
            //             waitlisthtml += "<div>";
            //             waitlisthtml += "<h2>" + taskname + "</h2>" + "<span class='tipbor'>" + "剩余" + tasksurplus + "份" + "</span>";
            //             waitlisthtml += "</div>";
            //             waitlisthtml += "<span class='waittip'>" + "已完成" + "</span>";
            //             waitlisthtml += "</div>";
            //             waitlisthtml += "</div>";
            //             waitlisthtml += "</li>";
            //             // listlength++;

            //     }
            //     $('#taskList').append(waitlisthtml);
            //     // console.log(listlength)
            // };




            //进行中list
            if (waitlist.length > 0) {

                var taskoOngoing = [];
                var waitlisthtml = "";
                for (var i in waitlist) {
                    var item = waitlist[i],
                        taskstate = item.type; // 任务状态
                        if (taskstate == 1) {
                           taskoOngoing.push(item); 
                        };
                };
                for (var i in taskoOngoing) {
                    var item = taskoOngoing[i],
                        taskname = item.adTitle, //任务名字
                        taskclassify = item.adIosClass, //任务分类
                        tasksurplus = item.adRestTimes, //剩余份数
                        taskprefix = item.adLogo;//图片地址
                        if (taskprefix.indexOf("http://")>=0) {
                            var imgsrc = item.adLogo; //包含http://图片地址
                        }else{
                            var imgsrc = imgUrl + item.adLogo; //图片地址
                        };

                        waitlisthtml += "<li>";
                        waitlisthtml += "<div class='templcon'>";
                        waitlisthtml += "<span><img src='" + imgsrc + "'  height='54' width='54' alt='' /></span>";
                        waitlisthtml += "<div class='templconInfo'>";
                        waitlisthtml += "<div>";
                        waitlisthtml += "<h2>" + taskname + "</h2>" + "<span class='tipbor'>" + taskclassify + "</span>" + "<span class='tipbor'>" + "剩余" + tasksurplus + "份" + "</span>";
                        waitlisthtml += "</div>";
                        waitlisthtml += "<span class='waittip'>" + "进行中" + "</span>";
                        waitlisthtml += "</div>";
                        waitlisthtml += "</div>";
                        waitlisthtml += "</li>";
                        // listlength++;
                }
                $('#taskList').append(waitlisthtml);
                // console.log(listlength)
            };
            //进行中list end










        });



    });



});



$('.closesurplustip').click(function(){
    $('.tipconsurplus').hide();
})









