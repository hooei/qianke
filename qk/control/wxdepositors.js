var moneynmu, ways, accountid, token, balancenum, amount,amountfen,wxname;

var jschars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function generateMixed(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += jschars[id];
    }
    return res;
}
token = generateMixed(20);



//微信号
var weixinName = document.getElementById("weixinName");


// $(function() {
//     $('#weixinName').on('valuechange', function(e, previous) {
//         var valWeiXin = $('#weixinName').val().length;

//     });
// });


// 数额选定
$(function() {
    $('.listcon').each(function() {
        var that = $(this);
        that.click(function() {
            amount = that.find('div.amount').data('amount');
            // console.log(amount);
            // console.log(balancenum);


            if (amount > balancenum) {
                new Toast({
                    context: $('body'),
                    message: '余额不足'
                }).show();
                return false
            }else{
                amountfen = amount*100;
            }


            $('.radioicon').removeClass('con')
            that.children().find('i.radioicon').addClass('con');
            $('.spendingnum').html(amount);
            $('#balanceinfo').html(balancenum - amount)



        })
    })
})
var z = new citesData();
z.useridData(function() {

        // 用户名称
        $('#username').html(z.userName);

        // 用户信息
        // z.userData(function(a, b) {
        //     if (a) {
        //         $('#username').html(a.user.userName);
        //     } else {
        //         aleret(b);
        //     }
        // });


        // 账户数据
        z.accountData(function(a, b) {
            // 账户余额
            if (a) {
                $('#balanceinfo').html((a.totalincome.current_income / 100).toFixed(2));
                balancenum = parseInt((a.totalincome.current_income / 100).toFixed(2));
            } else {
                aleret(b);
            }
        });

        // accountid获取

        z.invitenNumberData(function(a, b) {

            if (a) {
                accountid = a.message.user.userPayid;
                // console.log(accountid);
            }

        });



    })
    // 微信提现
function wxcashPostal() {
    wxname = $('#weixinName').val();

    // var cashid = userid;
    z.useridData(function() {
        z.depositors(z.userid, amountfen, 1, accountid, token,wxname, function(a) {

 // console.log(z.userid); 
 // console.log(amount); 
 // console.log(accountid); 
 // console.log(token); 
           
            // 双倍任务剩余数
            // $('#doubleNumtask').html(a.totalincome.double_num);
            if (a) {
                // console.log(accountid);
                wxpaypop();
                // setTimeout('back()', 2000);


            }
        });
    })



};

function wxpaypop() {
    $('.paysuspop').toggleClass('showstate');
    $('#mask').toggleClass('none');
}

function wxpayclose() {
    $('.paysuspop').toggleClass('showstate');
    $('#mask').toggleClass('none');
}

$('.payclose').click(function(){
    wxpayclose();
    window.location.reload();
})


// 提交按钮点击
$('#wxpayBt').click(function() {
    if (!weixinName.value) {
        new Toast({
            context: $('body'),
            message: '微信号不能为空'
        }).show();
        return false;
    };
    if (!amountfen) {
        new Toast({
            context: $('body'),
            message: '请选择提取金额'
        }).show();
        return false
    };
    // console.log(amount);
    // alipaypop();
    wxcashPostal();
});








