require.config({baseUrl:"static/js/",paths:{jquery:"../libs/jquery",md5:"../libs/md5",sweetalert:"../libs/sweetalert.min"}}),require(["jquery","config","base","md5","sweetalert"],function(i,t,e,a,n){e.FZ(20,375),e.scrollText("#dopetext","#removebt"),e.refreshPage("#refreshbt");var s={all:[],finish:[],can:[],checking:[],check:[]},c=0;e.getdata({t:1003,c:[{keyid:e.g.id,imei:e.g.devid,pages:0}]},function(e,a){i.each(e.adlist,function(i,e){e.adType==t.adType&&e.adRestTimes>0&&s.all.push(e)}),g(e),c+=1}),e.getdata({t:3013,c:[{userid:e.g.id,devid:e.g.devid,acttype:0}]},function(t,a){t.actlist.length>0&&i.each(t.actlist,function(i,t){3==t.type&&t.memberid==e.g.id&&(0==t.imgcheckstatus||2==t.imgcheckstatus&&2==t.imgchecktimes?s.finish.push(t):s.checking.push(t))}),c+=1,o()});var d=0,o=function(){if(2==c){if(e.load.hide(),i.isEmptyObject(s.finish)&&i.isEmptyObject(s.checking))s.can=s.all;else{var t=[];i.each(s.finish,function(i,e){t.push(e.adid)}),s.can=i.map(s.all,function(e){return i.inArray(e.adId,t)<0?e:null});var a=[];i.each(s.checking,function(i,t){a.push(t.adid)}),s.can=i.map(s.can,function(t){return i.inArray(t.adId,a)<0?t:null}),i.each(s.all,function(t,e){0==i.inArray(e.adId,a)&&s.check.push(e)})}if(0==s.can.length){if(i(".task-none-img").length>0)return;i('<img class="task-none-img" style="width:100%;padding:2rem .5rem;" src="static/img/task-none.png" />').appendTo(i(".g-taskhigh").find(".g-list-1"))}else l();s.checking.length>0&&r()}else{if(e.load.show(),d+=1,d>50)return void e.toast("数据加载失败，请重试");setTimeout(function(){o()},200)}},l=function(){s.can.sort(function(i,t){return i.adEcpm<t.adEcpm?1:-1}),i.each(s.can,function(e,a){i("#high-list").append('<li name="'+a.adId+'"><div class="icon" style="background:url('+t.imgUrl+a.adLogo+') 0 0 no-repeat;background-size:contain;"></div><div class="content-wrap"><div class="content"><div class="title">'+a.adTitle+'</div><div class="tags-box"><div class="tags">'+a.adIosClass+'</div><div class="tags">剩'+a.adRestTimes+'份</div></div></div></div><div class="prize">'+(a.adRegIncome/100).toFixed(2)+"</div></li>")}),i("#high-list li").on("click",function(){v(i(this).attr("name"))})},r=function(){var e=function(t){var e;return i.each(s.checking,function(i,a){t.adId==a.adid&&(0==a.imgcheckstatus?e="审核成功":2==a.imgcheckstatus&&2==a.imgchecktimes?e="审核失败":1==a.imgcheckstatus?e="审核中":2==a.imgcheckstatus&&2!=a.imgchecktimes&&(e="点击重新审核"))}),e};i.each(s.check,function(a,n){i("#checking-list").append('<li name="'+n.adId+'"><div class="icon" style="background:url('+t.imgUrl+n.adLogo+') 0 0 no-repeat;background-size:contain;"></div><div class="content-wrap"><div class="content"><div class="title">'+n.adTitle+'</div><div class="tags-box"><div class="tags">'+n.adIosClass+'</div><div class="tags">剩'+n.adRestTimes+'份</div></div></div></div><div class="prize">'+e(n)+"</div></li>")}),i("#checking-list li").each(function(t,e){/点击重新审核/.test(i(e).text())&&v(i(e).attr("name"))})},u=0,g=function(a){return c<2?void(d>50?e.toast("数据加载失败，请重试"):setTimeout(function(){g(a)},200)):void(a.future.length>0&&(i.each(a.future,function(i,e){e.adType==t.adType&&e.adRestTimes>0&&(u+=parseInt(e.adRegIncome),h(e))}),u>0&&i(".future-text").append('<div class="future-totle-money">任务即将开始,总计<span style="color:#ff1b02;">'+(u/100).toFixed(2)+"</span>元，准时来抢！</div>").show()))},h=function(e){i("#high-future-list").append('<li><div class="icon" style="background:url('+t.imgUrl+e.adLogo+') 0 0 no-repeat;background-size:contain;"></div><div class="content-wrap"><div class="content"><div class="title">'+e.adTitle+'</div><div class="tags-box"><div class="tags">今日 '+e.adStartTime.split(" ")[1].substr(0,5)+'</div><div class="tags">剩'+e.adRestTimes+'份</div></div></div></div><div class="prize">+'+(e.adRegIncome/100).toFixed(2)+"元</div></li>")},v=function(i){e.getLocal("doingAdid")&&e.getLocal("doingAdid")!=i?n({title:"",text:"不能同时接多个任务哦～\n要放弃上个任务并接取该任务吗？",type:"warning",showCancelButton:!0,closeOnConfirm:!0,cancelButtonText:"取消",confirmButtonText:"确定",confirmButtonColor:"#76baf2"},function(){e.giveupTask(e.getLocal("doingAdid")),m(i)}):m(i)},m=function(i){e.alert.show("拼命争抢任务中"),setTimeout(function(){e.getdata({t:1001,c:[{adid:i}]},function(t,a){var n=t.advert[0];n.adRestTimes>0&&"true"==n.adYusuan?(e.alert.hide(),e.toast("抢到任务，正在跳转","",300),e.getSe("time")||e.setSe("time",(new Date).getTime()),e.setLocal("doingAdid",i),setTimeout(function(){e.setSe("addetail",n),window.location.href="taskhighdetail.html"},200)):(e.alert.hide(),e.toast("哎呀～没抢到～取看看别的任务吧～",""))})},100)}});