var z = new citesData();
z.useridData(function() {


    // 用户名称
    $('#username').html(z.userName);
    // 用户ID
    $('#userid').html(z.userid);
    //用户头像
    if (z.userimg != null && z.userimg != 'null' && z.userimg.length > 0) {
        $('#userlargeimg').attr('src', z.userimg);
    };



    // 用户信息
    // z.userData(function(a, b) {
    //     // 用户名称
    //     $('#username').html(a.user.userName);
    //     // 用户ID
    //     $('#userid').html(a.user.userId);
    //     //用户头像
    //     if (a.user.image != null && a.user.image != 'null' && a.user.image.length > 0) {
    //         $('#userlargeimg').attr('src', a.user.image);
    //     };

    // });


    // 任务收入
    z.gainsList(function(a, b) {


        var data = a.income_list;
        var alltasklist = "";

            var msg = JSON.stringify(data);
            console.log(msg);

        var taskstatetext ="";


        for (var i in data) {
            var item = data[i],
                taskincome = item.income, //收入的钱数
                tasktype = item.infrom, //类型
                //imgsrc = item.adlogo, //广告ＬＯＧＯ
                taskname = item.adname, //任务名字
                tasktime = item.time, //任务分类
                rmtask = "入门任务",
                dbtask = "单倍任务",
                sbtask = "双倍任务",
                taskprefix = item.adlogo; //广告ＬＯＧＯ






            if (taskprefix.indexOf("http://") >= 0) {
                var imgsrc = item.adLogo; //包含http://图片地址
            } else {
                var imgsrc = imgUrl + item.adlogo; //图片地址
            }

            alltasklist += "<li>";

            if (imgsrc != null && imgsrc != 'null' && imgsrc.length > 0) {
                alltasklist += "<span class='ph'><img src='" + imgsrc + "'  alt=''/></span>";
            } else {
                alltasklist += "<span class='ph'></span>";
            }
            alltasklist += "<div class='detailstext'>";
            alltasklist += "<h2>";
            alltasklist += "<div>" + "我" + "</div>";
            alltasklist += "<span>" + tasktime + "</span>";
            alltasklist += "</h2>";
            // if (tasktype == 1) {
            //     alltasklist += "完成：" + rmtask + "&quot;" + taskname + "&quot;" + "," + "赚了" + "<span class='red'>" + (taskincome / 100).toFixed(2) + "</span>";
            // };
            // if (tasktype == 2) {
            //     alltasklist += "完成：" + dbtask + "&quot;" + taskname + "&quot;" + "," + "赚了" + "<span class='red'>" + (taskincome / 100).toFixed(2) + "</span>";
            // };
            // if (tasktype == 3) {
            //     alltasklist += "完成：" + sbtask + "&quot;" + taskname + "&quot;" + "," + "赚了" + "<span class='red'>" + (taskincome / 100).toFixed(2) + "</span>";
            // };
                alltasklist += "完成：" + taskname + "&quot;" + "," + "赚了" + "<span class='red'>" + (taskincome / 100).toFixed(2) + "</span>" + "(元)";


            alltasklist += "</div>";
            alltasklist += "</li>";
            // listlength++;

        }
        $('#alltasklist').append(alltasklist);
    });

    // 邀请收入
    z.invitedList(function(a, b) {
        var data = a.income_list;
        var invitelist = "";
        var taskstatetext ="";

        for (var i in data) {
            var item = data[i],
                taskincome = item.income, //收入的钱数
                taskword = item.keyword, //被推的用户
                tasktime = item.time; //被推用户入会时间

            invitelist += "<li>";
            invitelist += "<div class='detailstext'>";
            invitelist += "<h2>";
            invitelist += "<div>" + taskword + "</div>";
            invitelist += "<span>" + tasktime + "</span>";
            invitelist += "</h2>";
            invitelist += "完成：" + "推荐用户-" + taskword + "," + "赚了" + "<span class='red'>" + (taskincome / 100).toFixed(2) + "</span>"  + "(元)";
            invitelist += "</div>";
            invitelist += "</li>";
            // listlength++;

        }
        $('#invitelist').append(invitelist);
    });



    // 提现明细记录
    z.postalList(function(a, b) {
        var data = a.income_list;


        // var msg = JSON.stringify(data);
        //  console.log(msg);
       



        var postallist = "";
        var postaltext = "";
        var taskstatetext ="";

        for (var i in data) {
            var item = data[i],
                postalincome = item.income, //钱数
                postaltime = item.time, //时间
                taskstate = item.status,//任务完成状态status
                postaltype = parseInt(item.type); //提取方式
            switch (postaltype) {

                case 0:
                    postaltext = "支付宝";
                    break;

                case 1:
                    postaltext = "微信";
                    break;

                case 2:
                    postaltext = "qq币";
                    break;

                case 3:
                    postaltext = "银行";
                    break;
            };
            if (taskstate == 0) {
                taskstatetext = "已支付";
            }else if (taskstate == 1) {
                taskstatetext = "已申请";
            };
            console.log(taskstate);
            console.log(taskstatetext);


            postallist += "<li>";
            postallist += "<div class='detailstext'>";
            postallist += "<h2>";
            postallist += "<div>" + "我" + "</div>";
            postallist += "<span>" + postaltime + "</span>";
            postallist += "</h2>";
            postallist += "提现：" + postaltext + "提现" + "<span class='red'>" + (postalincome / 100).toFixed(2) + "元" + "</span>"  + "(" + "<span class='red'>" + taskstatetext  + "</span>" + ")";
            postallist += "</div>";
            postallist += "</li>";
            // listlength++;

        }
        $('#postallist').append(postallist);
    });



})