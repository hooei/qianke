function swipershow() {
    $('.slidermask').show();
    $('.sliderpop').show();
};

function swiperhide() {
    $('.slidermask').hide();
    $('.sliderpop').hide();
};



function tipSetUpshow() {
    $('.tipSetUpmask').show();
    $('.tipSetUp').show();
};

function tipSetUphide() {
    $('.tipSetUpmask').hide();
    $('.tipSetUp').hide();
};





function sliderbodyHeight() {
    var unlockbody = $('.sliderpop').height() - 62;
    $('.unlockbody').height(unlockbody);
};
sliderbodyHeight();
$(window).resize(function() {
    sliderbodyHeight();
});

var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    // autoHeight: true, //enable auto height
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
});

$('.violetBt').click(function() {
    swiperhide();
    window.location = 'prefs:root=General&path=ManagedConfigurationList';
})



$('.sliderclose').click(function() {
    swiperhide();
})



$(function() {

    $('.judgeBt').click(function() {
        if (browser.isIos()) {
            if (browser.isWX() || browser.isQQ()) {
                saftipshow();
                return false;
            }
        } else if (browser.isAndroid()) {
            androidtipshow();
            return false;

        };
        if (uesrstate == false) {
            keydowntipshow();
            return false
        };


        openkey();




    })

    $('.viewedsSet').click(function(){
        // window.open(href.helpios9);
        window.location.href = href.helpios9
    })
    
    $('.forthwithDown').click(function(){
        window.open(href.downloadUrl);
    })
    $('.tipSetUpclose').click(function(){
        tipSetUphide();
    })
    













})

if (browser.isIos()) {
    if (browser.isWX() || browser.isQQ()) {
        saftipshow();
    } else {
        iosjkjk();
    }
} else if (browser.isAndroid()) {
    androidtipshow();
};



function iosjkjk() {
    var z = new citesData();
    z.useridData(function() {


        // 用户名称
        $('#username').html(z.userName);
        //用户头像
        if (z.userimg != null && z.userimg != 'null' && z.userimg.length > 0) {
            $('#userimg').attr('src', z.userimg);
        };






        // 账户数据
        z.accountData(function(a, b) {
            // 累计收益
            $('#allprofit').html((a.totalincome.all_income / 100).toFixed(2));
        });
        // 用户信息
        // z.userData(function(a, b) {
        //     // 用户名称
        //     $('#username').html(a.user.userName);
        //     //用户头像
        //     if (a.user.image != null && a.user.image != 'null' && a.user.image.length > 0) {
        //         $('#userimg').attr('src', a.user.image);
        //     };

        // });

    })

}

function reHeight() {
    var t = document.getElementById('friendcon').offsetHeight;
    // console.log(t);
    var msg_friendHeight = document.documentElement.clientHeight - t;
    document.getElementById('msg_friend').style.height = msg_friendHeight - 11 + 'px';
};
reHeight();
$(window).resize(function() {
    reHeight();
});

/*
 * Pause jQuery plugin v0.1
 *
 * Copyright 2010 by Tobia Conforto <tobia.conforto@gmail.com>
 *
 * Based on Pause-resume-animation jQuery plugin by Joe Weitzel
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or(at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */
(function() {
    var e = jQuery,
        f = "jQuery.pause",
        d = 1,
        b = e.fn.animate,
        a = {};

    function c() {
        return new Date().getTime()
    }
    e.fn.animate = function(k, h, j, i) {
        var g = e.speed(h, j, i);
        g.complete = g.old;
        return this.each(function() {
            if (!this[f]) {
                this[f] = d++
            }
            var l = e.extend({}, g);
            b.apply(e(this), [k, e.extend({}, l)]);
            a[this[f]] = {
                run: true,
                prop: k,
                opt: l,
                start: c(),
                done: 0
            }
        })
    };
    e.fn.pause = function() {
        return this.each(function() {
            if (!this[f]) {
                this[f] = d++
            }
            var g = a[this[f]];
            if (g && g.run) {
                g.done += c() - g.start;
                if (g.done > g.opt.duration) {
                    delete a[this[f]]
                } else {
                    e(this).stop();
                    g.run = false
                }
            }
        })
    };
    e.fn.resume = function() {
        return this.each(function() {
            if (!this[f]) {
                this[f] = d++
            }
            var g = a[this[f]];
            if (g && !g.run) {
                g.opt.duration -= g.done;
                g.done = 0;
                g.run = true;
                g.start = c();
                b.apply(e(this), [g.prop, e.extend({}, g.opt)])
            }
        })
    }
})();



$(function() {
    var scrtime;

    var $ul = $("#msg_friend ul");
    var liFirstHeight = $ul.find("li:first").height(); //第一个li的高度
    $ul.css({
        top: "-" + liFirstHeight - 20 + "px"
    }); //利用css的top属性将第一个li隐藏在列表上方     因li的上下padding:10px所以要-20

    $("#msg_friend").hover(function() {
        $ul.pause(); //暂停动画
        clearInterval(scrtime);
    }, function() {
        $ul.resume(); //恢复播放动画   
        scrtime = setInterval(function scrolllist() {
            //动画形式展现第一个li
            $ul.animate({
                top: 0 + "px"
            }, 1000, function() {
                //动画完成时
                $ul.find("li:last").prependTo($ul); //将ul的最后一个剪切li插入为ul的第一个li
                liFirstHeight = $ul.find("li:first").height(); //刚插入的li的高度
                $ul.css({
                    top: "-" + liFirstHeight - 10 + "px"
                }); //利用css的top属性将刚插入的li隐藏在列表上方  因li的下padding:10px所以要-10                 
            });
        }, 2000);

    }).trigger("mouseleave"); //通过trigger("mouseleave")函数来触发hover事件的第2个函数

});