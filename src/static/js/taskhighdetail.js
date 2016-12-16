require.config({
	baseUrl: "static/js/",
	paths: {
		"jquery": "../libs/jquery",
		"md5": "../libs/md5",
		"sweetalert": "../libs/sweetalert.min"
	}
})

require(["jquery", "config", "base", "md5", "sweetalert"], function($, config, base, md5, swal) {
	//调整rem
	base.FZ(20, 375);

	//设置头部滚动 @滚动元素 @删除元素
//	base.scrollText("#dopetext", "#removebt");

	//设置刷新按钮 @刷新id
	base.refreshPage("#refreshbt");

	var adDetail = base.getSe("addetail");
	console.log(adDetail)

	if(!adDetail) {
		swal({
			title: "",
			text: "出错了，请返回任务列表重新接取",
			type: "error",
			closeOnConfirm: true,
			confirmButtonText: "确定",
			confirmButtonColor: "#ec6c62"
		}, function() {
//			window.location.href = "taskhigh.html";
			window.history.back();
		});
		return;
	}

	//填充头部
	+function(n) {
		$(".g-taskhighdetail .g-header-inner").append(
			'<i style="background:url(' + config.imgUrl + n.adLogo + ') 0 0 no-repeat;background-size:contain;"></i>' +
			'<span class="title">' + n.adTitle + '</span>' +
			'<span class="prize">+' + (n.adRegIncome / 100).toFixed(2) + '元</span>'
		);
	}(adDetail)

	//填充任务步骤
	+function(o) {
		var stepText = o.adChargeDesc.split("|");
		$(".g-taskhighdetail .m-step-inner").append(
			'<div class="title">任务步骤<span id="time-cutdown" class="time-cutdown">(剩余时间：-)</span></div>' +
				'<div class="text">' +
				'</div>' +
			'</div>'
		);
		$.each(stepText, function(i, n) {
			if(/{/ig.test(n) && /}/ig.test(n)) {
				n = n.replace(/{/ig, '<span style="color:#ff1b02;">');
				n = n.replace(/}/ig, '</span>');
			}
			$(".g-taskhighdetail .m-step .text").append(
				'<p>' + (i + 1) + '、' + n + '</p>'
			);
		});
	}(adDetail)
	
	//填充第二段任务描述
	+function(o){
		var stepText = o.adChargeDesc.split("|");
		$(".m-finish-text").append(
			'<div class="title">任务说明</div>' +
				'<div class="text">' +
				'</div>' +
			'</div>'
		);
//		$.each(stepText, function(i, n) {
//			if(/{/ig.test(n) && /}/ig.test(n)) {
//				n = n.replace(/{/ig, '<span style="color:#ff1b02;">');
//				n = n.replace(/}/ig, '</span>');
//			}
//			$(".m-finish-text .text").append(
//				'<p>' + (i + 1) + '、' + n + '</p>'
//			);
//		});
		$(".m-finish-text .text").append(
			'<p>' + o.adImgExampleDesc + '</p>'
		);
		
	}(adDetail)

	//绑定按钮事件
	+function(o) {
		$(".btn-back").on("click", function(e) {
			e.preventDefault();
			//			base.confirm({
			//				text: "确定要放弃任务吗？",
			//				callback: function(){
			//					base.remLocal("doingAdid");
			//					window.location.href = "taskhigh.html";
			//				},
			//				btnText: "放弃任务"
			//			});

			swal({
				title: "",
				text: "确定要放弃当前任务?",
				type: "warning",
				showCancelButton: true,
				closeOnConfirm: true,
				cancelButtonText: "取消",
				confirmButtonText: "放弃任务",
				confirmButtonColor: "#ec6c62"
			}, function() {
				var adid = base.getLocal("doingAdid");
				base.giveupTask(adid,function(){
//					window.location.href = "taskhigh.html";
					window.history.back();
				});
			});
		})
		$(".btn-detail").on("click", function() {
			window.location.href = "taskhighstep.html";
		});
		$(".btn-start").on("click", function() {
			$(".btn-finish").removeClass("forbid");
//			window.location.href = 'taskiframe.html?u='+config.adurl(o.adUrl);
			window.open(config.adurl(o.adUrl));
		});
		$("#get-yzm").on("click",function(){
			if (!$("#ipt-tel").val()) {
				base.swtoast("请输入手机号")
			}else{
				base.getdata({
					"t":6006,
					"c":[{
						"mobile": $("#ipt-tel").val()
					}]
				},function(res){
					console.log(res);
					base.swtoast("验证码发送成功")
				})
			}
		});
		$(".btn-finish").on("click", function() {
			finishTask(this);
		});
	}(adDetail)

	//提交审核
	var finishTask = function(that) {
		if($(that).hasClass("forbid")) {
			return false;
		} else {
			iptJudgment(function(status){
				if (status == 1) {
					base.getdata({
						't':5001,
						'c':[{
							'devid':base.g.devid, 
							'memberid':base.g.id, 
							'keyword':adDetail.adId,
							'images':'', 
							'md5s':'', 
							'devtoken':'', 
							'signkey': $("#ipt-tel").val(),
							'signname': $("#ipt-name").val()
						}]
					},function(res){
						console.log(res);
						swal({
							title: "",
							text: "提交审核成功",
							type: "success",
							showCancelButton: false,
							confirmButtonText: "确定",
						}, function() {
							base.remLocal("doingAdid");
							base.remSe("addetail");
							base.remSe("time");
//							window.location.href = "taskhigh.html";
							window.history.back();
						});
					});
					base.remLocal("doingAdid");
				}
			})
		}
	}
	
	
	//判断信息输入
	var iptJudgment = function(callback){
		var name = $("#ipt-name");
		var tel = $("#ipt-tel");
		var yzm = $("#ipt-yzm");
		if (!name.val()) {
			base.swtoast("请输入所填写的姓名");
			return;
		}
		if (!tel.val()) {
			base.swtoast("请输入所填写的手机号");
			return;
		}
		if (!yzm.val()) {
			base.swtoast("请输入验证码");
			return;
		}
		if (!/^(0|86|17951)?1\d{10}$/.test(tel.val())) {
			base.swtoast("请输入正确的手机号");
			return;
		}
		
		base.getdata({
			"t":6007,
			"c":[{
				"mobile":tel.val(), 
				"code":yzm.val()
			}]
		},function(res){
			console.log(res)
			if (res.status == 0) {
				//验证成功
				callback(1);
			}else{
				base.swtoast("验证码错误");
			}
		})
	}

	//任务超时
	var timeOut = function() {
		swal({
			title: "",
			text: "任务已超时，请重新开始任务",
			type: "error",
			showCancelButton: false,
			confirmButtonText: "确定",
			confirmButtonColor: "#ec6c62"
		}, function() {
			var adid = base.getLocal("doingAdid");
			base.giveupTask(adid,function(){
//				window.location.href = "taskhigh.html";
				window.history.back();
			});
		});
	}

	
	//倒计时
	var cutdownTimer;
	var timeCutdown = function() {
		if (!!cutdownTimer) {
			clearInterval(cutdownTimer);
		}
		var timeNow = new Date().getTime();
		var timeAcc = base.getSe("time");
		var leftTime = config.timeout*1000 - (timeNow - timeAcc);
		if(leftTime <= 0) {
			timeOut();
		}else{
			cutdownTimer = setInterval(function(){
				leftTime -= 1000;
				var m = base.format0(parseInt(leftTime/1000/60),2);
				var s = base.format0(parseInt(leftTime/1000%60),2);
				$("#time-cutdown").html('(剩余时间：'+m+':'+s+')');
				if (leftTime <=0 ) {
					timeOut();
				}
			},1000)
		}
	}
	timeCutdown();
	
	base.pageVisibility.visibilitychange(function(){
		if (!this.hidden) {
			$("#time-cutdown").html('(剩余时间：-');
			timeCutdown();
		}
	})
})