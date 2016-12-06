// 任务列表数据
var z = new citesData();
z.useridData(function() {
    // 账户数据
    z.taskList(function(a, b) {
        var data = a.adlist;
        var tasklisthtml = "";
        // var msg = JSON.stringify(data);
        // console.log(msg);
        // var listlength = 0;
        for (var i in data) {
            var item = data[i],
                taskmark = item.adId, //唯一标示
                tasktype = item.adType, //类型
                //imgsrc = item.adLogo, //图片地址
                taskname = item.adTitle, //任务名字
                taskclassify = item.adPackname, //任务分类
                taskbonus = item.adRealIncome, //任务奖金
                tasksurplus = item.adRestTimes; //剩余份数

                taskprefix = item.adLogo;//图片地址
                if (taskprefix.indexOf("http://")>=0) {
                    var imgsrc = item.adLogo; //包含http://图片地址
                }else{
                    var imgsrc = imgUrl + item.adLogo; //图片地址
                }





            if (tasktype == 207) {
                tasklisthtml += "<li>";
                tasklisthtml += "<a href='" + "screenshot.html?taskmark=" + taskmark + "'>";
                tasklisthtml += "<div class='templcon'>";
                tasklisthtml += "<span><img src='" + imgsrc + "'  height='54' width='54' alt='' /></span>";
                tasklisthtml += "<div class='templconInfo'>";
                tasklisthtml += "<div>";
                tasklisthtml += "<h2>" + taskname + "</h2>" + "<span class='tipbor'>" + "剩余" + tasksurplus + "份" + "</span>";
                tasklisthtml += "</div>";
                tasklisthtml += "<span class='reward'>" + "+" + (taskbonus / 100).toFixed(2) + "</span>" + "元";
                tasklisthtml += "</div>";
                tasklisthtml += "</div>";
                tasklisthtml += "</a>";
                tasklisthtml += "</li>";
                // listlength++;
            };

        }
        $('#taskList').html(tasklisthtml);
        // console.log(listlength)
    });



})