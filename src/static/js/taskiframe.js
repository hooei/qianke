require.config({
	baseUrl: "static/js/",
	paths: {
		"jquery": "../libs/jquery",
		"md5": "../libs/md5",
		"sweetalert": "../libs/sweetalert.min"
	}
})

require(["jquery", "config", "base"], function($, config, base) {
	var u = base.getUrlParam('u')
	$("#ifr").attr("src",u).height($('body').height()-$('.headedText').height());
})