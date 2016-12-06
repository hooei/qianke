var argumentUrl = _GLOBAL.queryString(window.location.search),
    markurl = argumentUrl['taskmark'] || 0;

var z = new citesData();
z.useridData(function() {
    // 任务列表数据
    z.taskList(function(a, b) {
        var data = a.adlist;

        for (var i in data) {
            var item = data[i],
                taskmark = item.adId; //唯一标示

            if (taskmark == markurl) {

                var taskname = item.adTitle, //任务名字
                    taskdescribe = item.adImgExampleDesc, //任务描述
                    tasktime = item.adModifyTime, //任务时间
                    shotphlist = item.adImgExample, //示例截图
                    tasksubtit = item.adSubtitle; //任务副标题
                    var sl=[];
                    shotphlist.foreach(index=>{
                        if(index.indexOf("http://")>=0)
                        {
                            sl.push(index) ;
                        }else
                        {
                            index=imgUrl+index;
                            sl.push(index) ;
                        }
                    })



                $('#captioninfo').html(taskdescribe);
                var arrayphshot = sl.substr(0, sl.length - 1).split(',');


                var arrayphlist = "";
                for (var j = 0; j < arrayphshot.length; j++) {
                    arrayphlist += "<li>" + "<img src='"arrayphshot[j] + "'  width='100%' alt='' />" + "</li>";
                };
                $('#arrayphlist').html(arrayphlist);



            };



        }
    });


})

// 上传
var inputElement = document.getElementById("inputfile");
// inputElement.addEventListener("change", handleFiles, false);
// function handleFiles() {
//     var fileList = this.files;
//     // var dd = $('.filelist');
//     for (var i = 0; i < fileList.length; i++) {

//         var $file = $(this);
//         var fileObj = $file[i];
//         var windowURL = window.URL || window.webkitURL;
//         var dataURL;

//         var imgObj = document.getElementById("preview");

//         // var fileph = "<li>" + fileList[i].name + "<img src='" + windowURL.createObjectURL(fileObj.files[i]) + "'  height='54' width='54' alt='' />"+ "</li>";
//         var fileph = "<li><div class='phcon'>" + "<img src='" + windowURL.createObjectURL(fileObj.files[i]) + "'  height='54' width='54' alt='' />" + "</div></li>";
//         $('.filelist').prepend(fileph);
//     }
// }
inputElement.onchange = function(evt) {
    // 如果浏览器不支持FileReader，则不处理
    if (!window.FileReader) return;
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                // img 元素
                var fileph = "<li><div class='phcon'>" + "<img src='" + e.target.result + "'  height='54' width='54' alt='' />" + "</div></li>";
                $('.filelist').prepend(fileph);
            };
        })(f);
        reader.readAsDataURL(f);
    }
}


//审核接口
//提交用户截图接口: devid, memberid, keyword(adid),images,md5s, devtoken,signkey(审图核对信息）
// send:{'t':5001,'c':[{'devid':'102020202', 'memberid':'102010101', 'keyword':'10201', 'images':'/images/a.jpg,/images/b.jpg', 'md5s':'md1, md2', 'devtoken':'aaa', 'signkey':'13600123868'}]}