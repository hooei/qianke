function swipershow() {
    $('.slidermask').show();
    $('.sliderpop').show();
};

function swiperhide() {
    $('.slidermask').hide();
    $('.sliderpop').hide();
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


        window.location = href.scheme;

        // var timenow = Math.ceil(new Date().getTime() / 1000);
        // if (timenow - window.sessionStorage.getItem("ysLastTime") > 100 ){
        //     setTimeout(function(){
        //         ysShowdown();
        //     },1000)
        // }


        setTimeout(function() {
            //此处如果执行则表示没有app
            swipershow();
            window.open(href.downloadUrl);
        }, 500);



        //1  http://www.cnblogs.com/carlos-guo/p/3945112.html
        // if(...){
        // document.location = '';
        // setTimeout(function(){
        //    //此处如果执行则表示没有app
        // },200);
        // }


        //2  https://segmentfault.com/q/1010000004671841
        // $("a[href^='schema://']").on('click',function(e){
        //     e.preventDefault();
        //     if(isWeixinBrowser() || isQQBrowser()){
        //         $('.layer').show(); //友好的提示页面
        //     }else{
        //         if(isAndroid){
        //             //android

        //             //此操作会调起app并阻止接下来的js执行
        //             $('body').append("<iframe src='schema://openapp' style='display:none' target='' ></iframe>");

        //             //没有安装应用会执行下面的语句
        //             setTimeout(function(){window.location = 'http://www.yourdlurl.com/download.html'},600);
        //         }else{
        //             //ios
        //             window.location = 'schema://openapp';
        //             setTimeout(function(){window.location = 'itms-apps://itunes.apple.com/app/idXXXXXXX'},25);
        //         }
        //     }
        // })

        // function isWeixinBrowser() {
        //         return (/micromessenger/.test(ua)) ? true : false;
        //     }

        // function isQQBrowser() {
        //     return (ua.match(/QQ/i) == "qq") ? true : false;
        // }

        //3 http://sentsin.com/web/1050.html
        // (function () {
        //     var openUrl = window.location.search;
        //     try {
        //         openUrl = openUrl.substring(1, openUrl.length);
        //     } catch (e) {}
        //     var isiOS = navigator.userAgent.match('iPad') || navigator.userAgent.match('iPhone') || navigator.userAgent.match(
        //         'iPod'),
        //         isAndroid = navigator.userAgent
        //             .match('Android'),
        //         isDesktop = !isiOS && !isAndroid;
        //     if (isiOS) {
        //         setTimeout(function () {
        //             window.location = "itms-apps://itunes.apple.com/app/[name]/[id]?mt=8";
        //         }, 25);
        //         window.location = "[scheme]://[host]?url=" + openUrl;
        //     } else if (isAndroid) {
        //         window.location = "intent://[host]/" + "url=" + openUrl + "#Intent;scheme=[scheme];package=[package_name];end";
        //     } else {
        //         window.location.href = openUrl;
        //     }
        // })();

        //4 http://blog.csdn.net/xyxjn/article/details/41805365
        // <!-- a标签的链接，设置为对应的下载链接；点击打开的动作，在click事件中注册 -->  
        // <a href="https://itunes.apple.com/cn/app/id477927812" id="openApp">贴吧客户端</a>  
        // document.getElementById('openApp').onclick = function(e){  
        //     // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为  
        //     // 否则打开a标签的href链接  
        //     var ifr = document.createElement('iframe');  
        //     ifr.src = 'com.baidu.tieba://';  
        //     ifr.style.display = 'none';  
        //     document.body.appendChild(ifr);  
        //     window.setTimeout(function(){  
        //         document.body.removeChild(ifr);  
        //     },3000)  
        // };  



        //5  http://blog.sina.com.cn/s/blog_bfa6e8830101cqea.html

        // if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        //     var loadDateTime = new Date();
        //     window.setTimeout(function() {
        //       var timeOutDateTime = new Date();
        //       if (timeOutDateTime - loadDateTime < 5000) {
        //         window.location = "要跳转的页面URL";
        //       } else {
        //         window.close();
        //       }
        //     },
        //     25);
        //     window.location = " apps custom url schemes ";
        //   } else if (navigator.userAgent.match(/android/i)) {
        //     var state = null;
        //     try {
        //       state = window.open("apps custom url schemes ", '_blank');
        //     } catch(e) {}
        //     if (state) {
        //       window.close();
        //     } else {
        //       window.location = "要跳转的页面URL";
        //     }
        //   }


        // window.location = href.downloadUrl;
        // window.open("http://www.qianke360.cn:8080/H5/ios9help.html");

    })



})


//打开钥匙
// function ysOpen() {
//     if ($.device.ios) {
//         window.location.href = href.scheme;
//         var timenow = Math.ceil(new Date().getTime() / 1000);
//         if (timenow - window.sessionStorage.getItem("ysLastTime") > 100 ){
//             setTimeout(function(){
//                 ysShowdown();
//             },1000)
//         }
//     }else if($.device.android){
//         $.alert("暂不支持安卓系统，敬请期待");
//     }

// }

//下载钥匙
// function ysShowdown() {

//     $.modal({
//         title: '下载7块糖钥匙',
//         text:   '<div class="showDownModal">'+
//                     '<i class="icon" onclick="$.closeModal()"></i>'+
//                     '<img src="' + href.img.download + '" alt="">'+
//                     '<p>请先安装7块糖钥匙</p>'+
//                     '<p>刷新页面即可再次安装</p>'+
//                     '<p>7块糖钥匙是企业级应用</p>'+
//                     '<p>“iOS 9”的小伙伴需设置后才能打开</p>'+
//                     '<p>下载即表示阅读并同意《<a href="javascript:window.open(\''+href.agreement+'\');" class="link">用户协议</a>》</p>'+
//                 '</div>',
//         buttons: [{
//             text: '查看设置方法',
//             onClick: function() {
//                 $.router.load(href.helpios9);
//             }
//         }, {
//             text: '立即下载',
//             onClick: function() {
//                 window.open(href.downloadUrl);
//             }
//         }, ]
//     })

// }
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
        // 账户数据
        z.accountData(function(a, b) {
            // 累计收益
            $('#allprofit').html((a.totalincome.all_income / 100).toFixed(2));
        });
        // 用户信息
        z.userData(function(a, b) {
            // 用户名称
            $('#username').html(a.user.userName);
            //用户头像
            if (a.user.image != null && a.user.image != 'null' && a.user.image.length > 0) {
                $('#userimg').attr('src', a.user.image);
            };

        });

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