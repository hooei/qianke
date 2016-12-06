// 数组比对
// var arr1=["1","2","3"];
// var arr2=[1,"f","g",3];
// var arr3=[];
// for(var s in arr1){
//     for(var x in arr2){
//         if(arr1[s]==arr2[x]){
//             arr3.push(arr1[s]);
//         }
//     }
// }
// alert("相同的元素有"+arr3);
var allShareTask = [],haveShareTask = [];


// 分享任务列表数据
taskList(function(a,b) {

    var data = a.adlist;
    // var tasklisthtml = "";
    for(var i in data){
        var item = data[i],
            // taskmark = item.adId,//唯一标示
            tasktype = item.adType;//类型

        if (tasktype == 6) {


            allShareTask.push(data[i]);

        };        

    }

    // $('#taskList').html(tasklisthtml);


    // 已分享list
    listBehavior(function(a,b) {
        haveShareTask = a.actlist;
            // var msg3 = JSON.stringify(haveShareTask);
            // console.log(haveShareTask instanceof Array);
            // console.log(haveShareTask);
    });
    var sharelisthtml = "";
    for(var m in allShareTask){
        var sharedata = allShareTask[m],
            sharetit = sharedata.adSubtitle,//分享标题
            shareph = sharedata.adUrl;//分享图片


    // var msg2 = JSON.stringify(allShareTask);
    // console.log(msg2);
        for(var n in haveShareTask){
            // var msg3 = JSON.stringify(haveShareTask);
            // console.log(haveShareTask instanceof Array);
            // console.log(haveShareTask);
            if (allShareTask[m].adid == haveShareTask[n].adid) {
                alert('有相同');



                sharelisthtml += "<div class='shareinfo'>";
                sharelisthtml += "<h2>" +  + "</h2>";
                sharelisthtml += "<div><img src='" +  +"'  height='54' width='54' alt='' /></div>";
                sharelisthtml += "<div class='sharestate'>";
                sharelisthtml += "<div class='bottomleft'>" + + "</div>";
                sharelisthtml += "<a href='" +  + "' class='sharebt already'>" + "已分享" + "</a>";
                sharelisthtml += "</div>";
                sharelisthtml += "</div>";





    // <div class="shareinfo">
    //     <h2>分享任务大礼包</h2>
    //     <div><img src="images/share.jpg" width="100%" alt=""></div>
    //     <div class="sharestate">
    //         <div class="bottomleft">热门分享，等你来抢</div>
    //         <a href="#" class="sharebt getinto">进入</a>
    //     </div>
    // </div>
               

            }else{
                alert('无相同');
                sharelisthtml += "<div class='shareinfo'>";
                sharelisthtml += "<h2>" +  + "</h2>";
                sharelisthtml += "<div><img src='" +  +"'  height='54' width='54' alt='' /></div>";
                sharelisthtml += "<div class='sharestate'>";
                sharelisthtml += "<div class='bottomleft'>" + + "</div>";
                sharelisthtml += "<a href='" +  + "' class='sharebt getinto'>" + "进入" + "</a>";
                sharelisthtml += "</div>";
                sharelisthtml += "</div>";



            }
        }


    };



    $('#sharelist').html(sharelisthtml);









});




