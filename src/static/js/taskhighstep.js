require.config({
	baseUrl: "static/js/",
	paths: {
		"jquery": "../libs/jquery",
		"md5": "../libs/md5",
		"sweetalert": "../libs/sweetalert.min"
	}
})

require(["jquery", "config", "base", "md5"], function($, config, base, md5) {
	//调整rem
	base.FZ(20, 375);

	//设置头部滚动 @滚动元素 @删除元素
	base.scrollText("#dopetext", "#removebt");

	//设置刷新按钮 @刷新id
	base.refreshPage("#refreshbt");
	
	var adDetail = base.getSe("addetail");
	console.log(adDetail)
	
	+function(n){
		$(".g-taskhighstep").find(".g-content").append(
			'<div class="step-text">'+n.adImgExampleDesc+'</div>'
		);
		
		$.each(n.adImgExample.split(","), function(i,n) {
			if (!!n) {
				$(".g-taskhighstep").find(".g-content").append(
					'<div class="step-img-wrap">'+
						'<span class="step-img-title">第'+(i+1)+'步</span>'+
						'<img src="'+config.imgUrl+n+'" />'+
					'</div>'
				);
			}
		});
	}(adDetail)
})