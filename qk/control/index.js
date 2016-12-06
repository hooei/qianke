// 计算可视高度，赋值任务模块
function reHeight() {
    var modularHeight = document.documentElement.clientHeight - 47 - 181 - 55 - 20 - 3;
    $('.modular').height(modularHeight / 2);
};
reHeight();
$(window).resize(function() {
    reHeight();
});
// 刷新页面
var refreshbt = document.getElementById('refreshbt');
refreshbt.addEventListener('click', function() {
    window.location.reload();
}, false);



var z = new citesData();
z.useridData(function(res,err) {




        // 用户名称
        $('#username').html(z.userName);
        // 用户ID
        $('#userid').html(z.userid);
        //用户头像
        // console.log(z.userimg);
        if (z.userimg != null && z.userimg != 'null' && z.userimg.length > 0) {
            $('#userimg').attr('src', z.userimg);
            $('#userlargeimg').attr('src', z.userimg);
        };


    // 账户数据
    z.accountData(function(a, b) {
        // 账户余额
        $('#balanceinfo').html((a.totalincome.current_income / 100).toFixed(2));
        // 今日收益
        $('#todayprofit').html((a.totalincome.today_income / 100).toFixed(2));
        // 累计收益
        $('#allprofit').html((a.totalincome.all_income / 100).toFixed(2));
    });


    // 用户信息
    // z.useridData(function(a, b) {
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

})