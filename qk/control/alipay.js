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


//手机号
var utel = document.getElementById("Mobile"),
    regPartton = /1[3-8]+\d{9}/,
    aliname = document.getElementById("aliname");


$.event.special.valuechange = {
    teardown: function(namespaces) {
        $(this).unbind('.valuechange');
    },

    handler: function(e) {
        $.event.special.valuechange.triggerChanged($(this));
    },

    add: function(obj) {
        $(this).on('keyup.valuechange cut.valuechange paste.valuechange input.valuechange', obj.selector, $.event.special.valuechange.handler)
    },

    triggerChanged: function(element) {
        var current = element[0].contentEditable === 'true' ? element.html() : element.val(),
            previous = typeof element.data('previous') === 'undefined' ? element[0].defaultValue : element.data('previous')
        if (current !== previous) {
            element.trigger('valuechange', [element.data('previous')])
            element.data('previous', current)
        }
    }
};

$(function() {
    $('#Mobile').on('valuechange', function(e, previous) {
        var vallenMob = $('#Mobile').val().length;

        // if (vallenMob > 11) {
        //     $('#Mobile').val($('#Mobile').val().substr(0, 11));
        // };
    });
    $('#aliname').on('valuechange', function(e, previous) {
        var vallenAli = $('#aliname').val().length;

        // if (vallenAli > 11) {
        //     $('#aliname').val($('#aliname').val().substr(0, 30));
        // };
    });
});



// 数额选定
$(function() {
    $('.listcon').each(function() {
        var that = $(this);
        that.click(function() {
            amount = that.find('div.amount').data('amount');
            // console.log(amount);
            // console.log(balancenum);

            //手续费
            // feeNum = that.find('span.fee').data('fee');



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
        if (a) {
            $('#balanceinfo').html((a.totalincome.current_income / 100).toFixed(2));
            balancenum = parseInt((a.totalincome.current_income / 100).toFixed(2));
        } else {
            aleret(b);
        }
    });

})



// 支付宝提现
function alicashPostal() {

    // var cashid = userid;
    accountid = $('#Mobile').val() + '(' + $('#aliname').val() + ')';
    // console.log(accountid);


z.useridData(function() {



    z.depositors(z.userid, amountfen, 0, accountid, token, wxname,function(a) {
        if (a) {
            // console.log(accountid);
            alipaypop();
        }
    });

})



}



function alipaypop() {
    $('.paysuspop').toggleClass('showstate');
    $('#mask').toggleClass('none');
}

function alipayclose() {
    $('.paysuspop').toggleClass('showstate');
    $('#mask').toggleClass('none');
}

$('.payclose').click(function(){
    alipayclose();
    window.location.reload();
})



// 提交按钮点击
$('#alipayBt').click(function() {


    // 手机号
    if (!utel.value || utel.value == null) {
        new Toast({
            context: $('body'),
            message: '手机号码或邮箱不能为空'
        }).show();
        // utel.style.color = "#dc3529";
        utel.focus();
        return false;
    } 
    // else if (!regPartton.test(utel.value)) {
    //     new Toast({
    //         context: $('body'),
    //         message: '手机号码格式不正确'
    //     }).show();
    //     // utel.value = "手机号码格式不正确";
    //     // utel.style.color = "#dc3529";
    //     utel.focus();
    //     return false;
    // } 
    // else if (!regPartton.test(utel.value)) {
    //     new Toast({
    //         context: $('body'),
    //         message: '手机号码格式不正确'
    //     }).show();
    //     // utel.value = "手机号码格式不正确";
    //     // utel.style.color = "#dc3529";
    //     utel.focus();
    //     return false;
    // };

    if (!aliname.value || !utel.value == null) {
        new Toast({
            context: $('body'),
            message: '姓名不能为空'
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
    alicashPostal();
});