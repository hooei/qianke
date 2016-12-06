$(function() {
	$('.chattinginput').bind('input propertychange', function() {
		var chattingLen = $(this).val().length;
		if (chattingLen == 0) {
			$('.chattingBt').removeClass('maySub');
		} else {
			$('.chattingBt').addClass('maySub');
			$(".maySub").bind("touchstart", function() {
				$(this).addClass("hover")
			}).bind("touchend touchcancel", function() {
				$(this).removeClass("hover")
			});
		};
	});
})


//意见反馈feedback-list
citesData.prototype.feedbackList = function(callback) {
	// var messageinfo = messageinfo;
	var feedbackdata = {
		'body': {
			"t": 2021,
			"c": [{
				"userid": this.userid,
				"status": 10
			}]
		}
	};
	getdata(feedbackdata, function(res, err) {
		callback(res, err);
	});

};
//意见反馈sub
citesData.prototype.feedbackSub = function(chattingtext,callback) {
	// var messageinfo = messageinfo;
	var feedbacksubdata = {
		'body': {
			"t": 2005,
			"c": [{
				"userid": this.userid,
				"feedback": chattingtext
			}]
		}
	};
	getdata(feedbacksubdata, function(res, err) {
		callback(res, err);
	});
};

var z = new citesData();
z.useridData(function(res,err) {



        var userimgph = "http://h5.qianke360.cn/test/images/usericon.png";

        // 用户名称
        // $('#username').html(z.userName);

        //用户头像
        if (z.userimg != null && z.userimg != 'null' && z.userimg.length > 0) {
            // $('.party').attr('src', z.userimg);
            userimgph = z.userimg
        };





	
	// 账户数据
	z.feedbackList(function(a, b) {
		// var msg = JSON.stringify(a);
  //       console.log(msg);
		// 累计收益
		var data = a.feedback;
		var feedbackhtml = "";
		for (var i = data.length - 1; i >= 0; i--) {
			var item = data[i],
				content = item.content, //提问信息
				feedbk = item.feedbk; //回复信息
			if (content != null && content != 'null' && content.length > 0) {

				feedbackhtml += "<li class='shopman'>";
				feedbackhtml += "<div class='dialog'>"
				feedbackhtml += "<div>" + "<div>";
				feedbackhtml += content;
				feedbackhtml += "</div>" + "</div>";
				feedbackhtml += "</div>";
				feedbackhtml += "<span class='headicon'><img src='"+ userimgph +"' class='party'  height='54' width='54' alt='' />" + "</span>";
				feedbackhtml += "</li>";


				if (feedbk != null && feedbk != 'null' && feedbk.length > 0) {
					feedbackhtml += "<li class='client'>";
					feedbackhtml += "<span class='headicon'><img src='images/logo.png'  height='54' width='54' alt='' />" + "</span>";
					feedbackhtml += "<div class='dialog'>"
					feedbackhtml += "<div>" + "<div>";
					feedbackhtml += feedbk;
					feedbackhtml += "</div>" + "</div>";
					feedbackhtml += "</div>";
					feedbackhtml += "</li>";
				};



			};

		}

		$('#feedbacklist').append(feedbackhtml);

	});





})



//发送按钮
var chattingBt = document.getElementById("chattingBt");
	chattingBt.addEventListener('click', function() {
		// CompleteInfo();

		var chattingtext = $('#chattinginput').val();

		if (chattingtext.length == 0) {
			new Toast({
				context: $('body'),
				message: '请填写反馈内容'
			}).show();
			return false;
		};

	z.useridData(function(res,err) {	

		z.feedbackSub(chattingtext,function(a, b) {

			// var msg = JSON.stringify(a);
			// console.log(msg);

			if (a == 'succeed') {

				var feedbackhtml = "";

				feedbackhtml += "<li class='client'>";
				feedbackhtml += "<span class='headicon'><img src='images/logo.png'  height='54' width='54' alt='' />" + "</span>";
				feedbackhtml += "<div class='dialog'>"
				feedbackhtml += "<div>" + "<div>";
				feedbackhtml += "您提出的问题已提交，请耐心等待回复，谢谢";
				feedbackhtml += "</div>" + "</div>";
				feedbackhtml += "</div>";
				feedbackhtml += "</li>";
				$('#feedbacklist').append(feedbackhtml);

			};



		});

	});


	}, false);