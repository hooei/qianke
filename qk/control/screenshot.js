function SetCwinHeight(obj) {
    alert(1);
    var cwin = obj;
    if (document.getElementById) {
        if (cwin && !window.opera) {
            if (cwin.contentDocument && cwin.contentDocument.body.offsetHeight)
                cwin.height = cwin.contentDocument.body.offsetHeight + 20; //FF NS
            else if (cwin.Document && cwin.Document.body.scrollHeight)
                cwin.height = cwin.Document.body.scrollHeight + 10; //IE
        } else {
            if (cwin.contentWindow.document && cwin.contentWindow.document.body.scrollHeight)
                cwin.height = cwin.contentWindow.document.body.scrollHeight; //Opera
        }
    }
}



var argumentUrl = _GLOBAL.queryString(window.location.search),
    markurl = argumentUrl['taskmark'] || 0;


$("#gotask").attr("href", "capture.html?taskmark=" + markurl);

var z = new citesData();
z.useridData(function() {
    // 任务列表数据

    z.taskList(function(a, b) {
        var data = a.adlist;
        // var tasklisthtml = "";
        // var msg = JSON.stringify(data);
        // console.log(msg);
        // var listlength = 0;
        for (var i in data) {
            var item = data[i],
                taskmark = item.adId; //唯一标示

            if (taskmark == markurl) {

                var imgsrc = item.adLogo, //图片地址
                    taskname = item.adTitle, //任务名字
                    taskdescribe = item.adImgExampleDesc, //任务描述
                    tasktime = item.adModifyTime, //任务时间
                    tasksubtit = item.adSubtitle, //任务副标题
                    ifrtextUrl = item.adChargeDesc;


                // console.log(taskdescribe);
                // console.log(taskdescribe instanceof Array);
                // var arraydescribe = taskdescribe.split("|"); 
                // console.log(arraydescribe);
                // console.log(arraydescribe instanceof Array);

                // $('#appname').html(taskcopytext);
                // $('#taskimg').attr('src',imgUrl + imgsrc);
                // $('#taskbonus').html((taskbonus/100).toFixed(2));


                // var describelist ="";
                // for(var j=0; j<arraydescribe.length;j++){
                //     describelist += "<li>" + (j+1) + "." + arraydescribe[j] +"</li>";
                // };
                // $('#arraydescribe').html(describelist);



            };

            console.log(ifrtextUrl);

            // <iframe src="index.html" id="iframepage" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" onLoad="iFrameHeight()"></iframe>


            var ifrtextHtml = "<iframe src='" + ifrtextUrl + "'   scrolling='no' frameborder='0'  width='100%' height='10000'></iframe>";

            $('#ifrtext').html(ifrtextHtml);



        }
    });



})