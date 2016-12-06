define(function(){
	var scrollText = [
		"请仔细阅读任务要求后再执行，成功完成后才能拿到奖励哦！",
		"请仔细阅读任务要求后再执行，成功完成后才能拿到奖励哦！",
		"请仔细阅读任务要求后再执行，成功完成后才能拿到奖励哦！",
		"请仔细阅读任务要求后再执行，成功完成后才能拿到奖励哦！",
		"请仔细阅读任务要求后再执行，成功完成后才能拿到奖励哦！",
		"请仔细阅读任务要求后再执行，成功完成后才能拿到奖励哦！",
		"请仔细阅读任务要求后再执行，成功完成后才能拿到奖励哦！",
		"请仔细阅读任务要求后再执行，成功完成后才能拿到奖励哦！",
		"请仔细阅读任务要求后再执行，成功完成后才能拿到奖励哦！",
		"请仔细阅读任务要求后再执行，成功完成后才能拿到奖励哦！"
	]
	
	var adurl = function(u){
		return "https://itunes.apple.com/cn/app/yun-zhi-jia/id"+u+"?mt=8";
	}
	
	return {
		serverUrl: 'http://web.qianke360.cn:7006/wcserv/appserv',
		imgUrl: 'http://qiangke.oss-cn-beijing.aliyuncs.com',
		adType: 207,
		scrollText: scrollText,
		adurl: adurl,
		timeout: 3600
	}
})