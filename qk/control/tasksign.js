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

// var array1 = [ {"Num": "A "  },{"Num": "B" },{"Num": "D" }];
// var array2 = [ {"Num": "A ","Name": "t1 " }, {"Num": "B","Name": "t2"}, {"Num": "C " ,"Name": "t3 "}];
// var result = [];
// var result2 = [];
// for(var i = 0; i < array1.length; i++){
//     var obj = array1[i];
//     var num = obj.Num;
//     var isExist = false;
//     for(var j = 0; j < array2.length; j++){
//         var aj = array2[j];
//         var n = aj.Num;
//         if(n == num){
//             isExist = true;
//             break;
//         }
//     }
//     if(!isExist){
//         result.push(obj);
//     }
//     if(isExist){
//         result2.push(obj);
//     }
// }
// console.log(result);
// console.log(result2);










var alltasklist = [],
    signtasklist = [],
    commonlist = [];


var z = new citesData();
z.useridData(function() {
    // 任务列表数据
    z.taskList(function(a, b) {
        alltasklist = a.adlist;
        // console.log(alltasklist instanceof Array);



        // 签到list
        z.signData(function(c, d) {
            signtasklist = c.signlist;
            // console.log(signtasklist instanceof Array);
            // console.log(signtasklist);
            // console.log(alltasklist);

            for (var s in alltasklist) {
                for (var x in signtasklist) {
                    if (alltasklist[s].adId == signtasklist[x].adid) {
                        commonlist.push(alltasklist[s]);
                    }
                }
            }

            var signlisthtml = "";

            // alert("相同的元素有" + commonlist);
            // var msg = JSON.stringify(commonlist);
            // console.log(msg);


            for (var j in commonlist) {

                var item = commonlist[j],
                    taskmark = item.adId, //唯一标示
                    tasktype = item.adType, //类型
                    taskname = item.adTitle, //任务名字
                    taskclassify = item.adPackname, //任务分类
                    taskbonus = item.adInsIncome, //任务奖金
                    tasksurplus = item.adRestTimes, //剩余份数
                    taskprefix = item.adLogo;//图片地址
                    if (taskprefix.indexOf("http://")>=0) {
                        var imgsrc = item.adLogo; //包含http://图片地址
                    }else{
                        var imgsrc = imgUrl + item.adLogo; //图片地址
                    }



                signlisthtml += "<li>";
                signlisthtml += "<a href=''>";
                signlisthtml += "<div class='templcon'>";
                signlisthtml += "<span><img src='" + imgsrc + "'  height='54' width='54' alt='' /></span>";
                signlisthtml += "<div class='templconInfo'>";
                signlisthtml += "<div>";
                signlisthtml += "<h2>" + taskname + "</h2>" + "<span class='tipbor'>" + "剩余" + tasksurplus + "份" + "</span>";
                signlisthtml += "</div>";


                signlisthtml += "<div class='signhandle'>";

                signlisthtml += "<span class='reward'>" + "打开" + "</span>";
                signlisthtml += "<span class='red'>" + "+" + (taskbonus / 100).toFixed(2) + "元" + "</span>";



                signlisthtml += "</div>";
                signlisthtml += "</div>";
                signlisthtml += "</div>";
                signlisthtml += "</a>";
                signlisthtml += "</li>";

            }

            $('#tasksignlist').html(signlisthtml);



        });

    });


})