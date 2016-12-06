var z = new citesData();
z.useridData(function() {
    // 账户数据
    z.messageList(function(a, b) {
        var data = a.usermessage;


        var msg = JSON.stringify(a);
        console.log(msg);


        for (var i in data) {
            var item = data[i],
                mesid = item.id, //消息id
                mestitle = item.title, //消息标题
                mescrt = item.crttime, //消息时间
                mescontent = item.content, //消息内容
                messtatus = item.status; //读取状态


            var messagelist = "";
            if (messtatus == 1) {
                //1-已读 
                messagelist += "<div class='acc_trigger' data-mesid='" + mesid + "'>";
                messagelist += "<div class='messagetit'>";
                messagelist += "<h2 class='name'>";
                messagelist += "<div class='read'>" + "店小二" + "</div>";
                messagelist += "<span class='time'>" + mescrt + "</span>";
                messagelist += "</h2>";
                messagelist += "" + mestitle + "";
                messagelist += "</div>";
                messagelist += "<i class='linkicon'>" + "</i>";
                messagelist += "</div>";
                messagelist += "<div class='acc_container'>" + "<p>";
                messagelist += "" + mescontent + "";
                messagelist += "</p></div> ";
                $('.message').append(messagelist);

            };
            if (messtatus == 0) {
                //0-未读 
                messagelist += "<div class='acc_trigger' data-mesid='" + mesid + "'>";
                messagelist += "<div class='messagetit'>";
                messagelist += "<h2 class='name'>";
                messagelist += "<div>" + "店小二" + "</div>";
                messagelist += "<span class='time'>" + mescrt + "</span>";
                messagelist += "</h2>";
                messagelist += mestitle;
                messagelist += "</div>";
                messagelist += "<i class='linkicon'>" + "</i>";
                messagelist += "</div>";
                messagelist += "<div class='acc_container'>" + "<p>";
                messagelist += mescontent;
                messagelist += "</p></div> ";
                $('.message').prepend(messagelist);
            };



        }


        $('.message').on('click', '.acc_trigger', function(e) {
            var $fetchthis = $(e.currentTarget);
            var mesidnum = $(this).data('mesid');
            if ($(this).next().is(':hidden')) {
                $('.acc_trigger').removeClass('active').next().slideUp();
                $(this).toggleClass('active').next().slideDown();
            } else {
                $(this).toggleClass('active');
                $(this).next().slideUp();
            };
            z.messageSub(mesidnum,function(a) {
                console.log(a)
            });
            return false;
        });



    });

})