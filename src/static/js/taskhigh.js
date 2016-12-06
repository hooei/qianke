require.config({
	baseUrl: "static/js/",
	paths: {
		"jquery": "../libs/jquery",
		"md5": "../libs/md5",
		"sweetalert": "../libs/sweetalert.min"
	}
})

require(["jquery", "config", "base", "md5","sweetalert"], function($, config, base, md5,swal) {
	//调整rem
	base.FZ(20, 375);
	
	//设置头部滚动 @滚动元素 @删除元素
	base.scrollText("#dopetext", "#removebt");

	//设置刷新按钮 @刷新id
	base.refreshPage("#refreshbt");

	//toast @内容 @～append到元素
	//	base.toast("111")

	//储存信息
	console.log(base.g.id)

	//加载load
	//	base.load.show()
	//隐藏load
	//	base.load.hide()

	//请求服务器 @JSON参数 @callback
	//	base.getdata({},function(res,err){});

	//可以接的任务列表
	var app = {
		all: [],
		finish: [],
		can: [],
		checking: [],
		check: []
	};
	var appRequestFlag = 0;

	base.getdata({
		"t": 1003,
		"c": [{
			"keyid": base.g.id,
			"imei": base.g.devid,
			"pages": 0
		}]
	}, function(res, err) {
		console.log(res);
		
		$.each(res.adlist, function(i, n) {
			console.log(n.adType)
			if(n.adType == config.adType && n.adRestTimes > 0) {
				app.all.push(n);
			}
		});
		
		futureTask(res);

		appRequestFlag += 1;
	})

	base.getdata({
		"t": 3013,
		"c": [{
			"userid": base.g.id,
			"devid": base.g.devid,
			"acttype": 0
		}]
	}, function(res, err) {
		console.log(res);
		if(res.actlist.length > 0) {
			$.each(res.actlist, function(i, n) {
				if(n.type == 3 && n.memberid == base.g.id) {
					if(n.imgcheckstatus == 0 || (n.imgcheckstatus == 2 && n.imgchecktimes == 2)) {
						app.finish.push(n);
					} else {
						app.checking.push(n);
					}
				}
			});
		}

		appRequestFlag += 1;
		canAppFilter();
	})

	var canAppFilterCount = 0;
	var canAppFilter = function() {
		if(appRequestFlag == 2) {
			base.load.hide();
			if($.isEmptyObject(app.finish) && $.isEmptyObject(app.checking)) {
				app.can = app.all;
			} else {
				var finishAppAdid = []; //完成广告的adid数组
				$.each(app.finish, function(i, n) {
					finishAppAdid.push(n.adid);
				})
					//可玩任务列别
				app.can = $.map(app.all, function(n) {
					return $.inArray(n.adId, finishAppAdid) < 0 ? n : null;
				});
				
				var checkingAppAdid = []; //完成广告的adid数组
				$.each(app.checking, function(i, n) {
					checkingAppAdid.push(n.adid);
				})
				//可玩任务列别
				app.can = $.map(app.can, function(n) {
					return $.inArray(n.adId, checkingAppAdid) < 0 ? n : null;
				});
				$.each(app.all, function(i,n) {
					if ($.inArray(n.adId,checkingAppAdid) == 0) {
						app.check.push(n);
					}
				});
				console.log(app)
			}

			if(app.can.length == 0) {
				if($(".task-none-img").length > 0) {
					return;
				}
				$('<img class="task-none-img" style="width:100%;padding:2rem .5rem;" src="static/img/task-none.png" />').appendTo($(".g-taskhigh").find(".g-list-1"));
			} else {
				fillData();
			}
			
			if (app.checking.length > 0) {
				fillCheckingData();
			}
			
		} else {
			base.load.show();
			canAppFilterCount += 1;
			if(canAppFilterCount > 50) {
				base.toast("数据加载失败，请重试");
				return;
			}
			setTimeout(function() {
				canAppFilter();
			}, 200)
		}
	}

	var fillData = function() {
		app.can.sort(function(a, b) {
			return a.adEcpm < b.adEcpm ? 1 : -1;
		});

		$.each(app.can, function(i, n) {
			$("#high-list").append(
				'<li name="' + n.adId + '">' +
					'<div class="icon" style="background:url(' + config.imgUrl + n.adLogo + ') 0 0 no-repeat;background-size:contain;"></div>' +
						'<div class="content-wrap">' +
							'<div class="content">' +
								'<div class="title">' + n.adTitle + '</div>' +
								'<div class="tags-box">' +
									'<div class="tags">' + n.adIosClass + '</div>' +
									'<div class="tags">剩' + n.adRestTimes + '份</div>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'<div class="prize">' + (n.adRegIncome / 100).toFixed(2) + '</div>' +
				'</li>'
			);
		});

		$("#high-list li").on("click", function() {
			highClick($(this).attr("name"));
		});
	}
	
	
	var fillCheckingData = function() {
		var checkStatusText = function(n){
			var text;
			$.each(app.checking, function(ii,nn) {
				if (n.adId == nn.adid) {
					if (nn.imgcheckstatus == 0) {
						text = "审核成功";
					}else if (nn.imgcheckstatus == 2 && nn.imgchecktimes == 2) {
						text = "审核失败";
					}else if (nn.imgcheckstatus == 1) {
						text = "审核中";
					}else if (nn.imgcheckstatus == 2 && nn.imgchecktimes != 2) {
						text ="点击重新审核";
					}
				}
			});
			return text;
		}
		
		$.each(app.check, function(i, n) {
			$("#checking-list").append(
				'<li name="' + n.adId + '">' +
					'<div class="icon" style="background:url(' + config.imgUrl + n.adLogo + ') 0 0 no-repeat;background-size:contain;"></div>' +
						'<div class="content-wrap">' +
							'<div class="content">' +
								'<div class="title">' + n.adTitle + '</div>' +
								'<div class="tags-box">' +
									'<div class="tags">' + n.adIosClass + '</div>' +
									'<div class="tags">剩' + n.adRestTimes + '份</div>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'<div class="prize">'+checkStatusText(n)+'</div>' +
				'</li>'
			);
		});

		$("#checking-list li").each(function(i,n){
			if (/点击重新审核/.test($(n).text())) {
				highClick($(n).attr("name"));
			}
		})
		
//		$("#checking-list li").on("click", function() {
//			if (/点击重新审核/.test($(this).text())) {
//				highClick($(this).attr("name"));
//			}else{
//				return false;
//			}
//		});
	}
	

	var taskStatus = function(adid, type, income) {
		var statusClassName;
		var statusText;
		var status;
		
		$.each(app.checking, function(i, n) {
			if(adid == n.adid) {
				if(n.imgcheckstatus == 0) {
					statusClassName = "stasus-success";
					statusText = "审核成功";
					status = 0;
				} else if(n.imgcheckstatus == 1) {
					statusClassName = "stasus-checking";
					statusText = "审核中";
					status = 1;
				} else if(n.imgcheckstatus == 2) {
					statusClassName = "stasus-fail";
					statusText = "审核失败";
					status = 2;
				}
			}
		});

		if(type == 1) {
			return statusClassName;
		} else if(type == 0) {
			if(statusText == undefined) {
				return "+" + (income / 100).toFixed(2) + "元";
			}
			return statusText;
		} else if(type == 2) {
			return status;
		}
	}

	var totleMoney = 0;
	var futureTask = function(res) {
		if(appRequestFlag < 2) {
			if(canAppFilterCount > 50) {
				base.toast("数据加载失败，请重试");
			} else {
				setTimeout(function() {
					futureTask(res);
				}, 200);
			}
			return;
		}

		if(res.future.length > 0) {
			$.each(res.future, function(i, n) {
				if(n.adType == config.adType && n.adRestTimes > 0) {
					totleMoney += parseInt(n.adRegIncome);
					fillFuture(n);
				}
			});
			
			if (totleMoney > 0 ){
				$(".future-text").append(
					'<div class="future-totle-money">任务即将开始,总计<span style="color:#ff1b02;">' + (totleMoney / 100).toFixed(2) + '</span>元，准时来抢！</div>'
				).show();
			}
		}
	}

	var fillFuture = function(n) {
		$("#high-future-list").append(
			'<li>' +
				'<div class="icon" style="background:url(' + config.imgUrl + n.adLogo + ') 0 0 no-repeat;background-size:contain;"></div>' +
				'<div class="content-wrap">' +
					'<div class="content">' +
						'<div class="title">' + n.adTitle + '</div>' +
						'<div class="tags-box">' +
							'<div class="tags">今日 ' + n.adStartTime.split(" ")[1].substr(0,5) + '</div>' +
							'<div class="tags">剩' + n.adRestTimes + '份</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="prize">+' + (n.adRegIncome / 100).toFixed(2) + '元</div>' +
			'</li>'
		);
	}

	//点击事件
	var highClick = function(adid) {
		if (!!base.getLocal("doingAdid") && base.getLocal("doingAdid") != adid) {
			swal({
				title: "", 
				text: "不能同时接多个任务哦～\n要放弃上个任务并接取该任务吗？", 
				type: "warning",
				showCancelButton: true,
				closeOnConfirm: true,
				cancelButtonText: "取消",
				confirmButtonText: "确定",
				confirmButtonColor: "#76baf2"
			}, function() {
				base.giveupTask(base.getLocal("doingAdid"));
				acceptTask(adid);
			});
		}else{
			acceptTask(adid);
		}
	}
	
	var acceptTask = function(adid){
		base.alert.show("拼命争抢任务中");
		setTimeout(function(){
			base.getdata({
				"t": 1001,
				"c": [{
					"adid": adid
				}]
			}, function(res, err) {
				console.log(res);
				var o = res.advert[0];
				if (o.adRestTimes > 0 && o.adYusuan=="true") {
					base.alert.hide();
					base.toast("抢到任务，正在跳转","",300);
					if (!base.getSe("time")) {
						base.setSe("time",new Date().getTime());
					}
					base.setLocal("doingAdid",adid);
					setTimeout(function(){
						base.setSe("addetail",o);
						window.location.href = "taskhighdetail.html";
					},200)
				}else{
					base.alert.hide();
					base.toast("哎呀～没抢到～取看看别的任务吧～","");
				}
			});
		},100)
	}

})