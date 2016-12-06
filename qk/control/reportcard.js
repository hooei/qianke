var z = new citesData();
z.useridData(function() {


        // 用户名称
        $('#username').html(z.userName);
        // 用户ID
        $('#userid').html(z.userid);
        //用户头像
        if (z.userimg != null && z.userimg != 'null' && z.userimg.length > 0) {
            $('#userimg').attr('src', z.userimg);
            $('#userlargeimg').attr('src', z.userimg);
        };

        $('#codeph').attr('src','http://www.qianke360.cn/wcserv/wechat/ticket.jsp?uid='+ z.userid);



    
    // 账户数据
    z.accountData(function(a, b) {
        // 累计收益

        $('#allprofit').html((a.totalincome.all_income / 100).toFixed(2));
        // 任务收益
        $('#taskincome').html((a.totalincome.download_income / 100).toFixed(2));
    });
    // 用户信息
    // z.userData(function(a, b) {
    //     // 用户名称
    //     $('#username').html(a.user.userName);
    //     // 用户ID
    //     $('#userid').html(a.user.userId);
    //     //用户头像
    //     if (a.user.image != null && a.user.image != 'null' && a.user.image.length > 0) {
    //         $('#userimg').attr('src', a.user.image);
    //         $('#userlargeimg').attr('src', a.user.image);
    //     };

    // });

    z.accountData(function(a, b) {
        // 邀请收益
        $('#revenueInvite').html((a.totalincome.umbrella_income / 100).toFixed(2));

    });
    // 邀请人数
    z.invitenNumberData(function(a, b) {
        // 邀请人数
        $('#numberInvite').html(a.message.user.childs);
    });



})