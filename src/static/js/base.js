define(["jquery","config","md5","sweetalert"],function($,config,md5,swal){
	var FZ = function(a, b) {
		function getFZ() {
			var width = document.documentElement.clientWidth || document.body.clientWidth;
			var fontSize = (a / b) * width;
			return fontSize;
		};
		document.documentElement.style.fontSize = getFZ() + "px";
		window.onresize = function() {
			setTimeout(function() {
				document.documentElement.style.fontSize = getFZ() + "px";
			}, 100);
		};
	};
	
	var getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]);
		return null;
	};
	
	var setSe = function(key,value){
		if (typeof value == "object") {
			var v = JSON.stringify(value);
		}else if(typeof value == "string"||typeof value == "number") {
			var v = value;
		}else{
			window.alert("setLocal err")
		}
		window.sessionStorage.setItem(key,v);
	}
	var getSe = function(key){
		var v = window.sessionStorage.getItem(key);
		if (typeof $.parseJSON(v) == 'object') {
			v = $.parseJSON(v);
		}
		return v;
	}
	var remSe = function(key){
		window.sessionStorage.removeItem(key);
	}
	
	var setLocal = function(key,value){
		window.localStorage.setItem(key,value);
	}
	
	var getLocal = function(key){
		return window.localStorage.getItem(key);
	}
	
	var remLocal = function(key){
		window.localStorage.removeItem(key);
	}
	
//	var confirm = function(config){
//		var text = config.text;
//		var callback = !!config.callback ? config.callback : function(){};
//		var callback2 = !!config.callback2 ? config.callback2 : function(){};
//		var btnText = !!config.btnText ? config.btnText : "确  定";
//		var btnText2 = !!config.btnText2 ? config.btnText2 : "取  消";
//		$.confirm({
//		    title: '<i class="notice-icon"></i>',
//		    content: text,
//		    animation: 'RotateX',
//			closeAnimation: 'RotateX',
//			theme: 'light',
//			boxWidth: '90%',
//			useBootstrap: false,
//		    	buttons: {
//				cancel: {
//					text: btnText2,
//					btnClass: 'btn-large',
//					action: function(){
//						callback2();
//					}
//				},
//		        confirm: {
//		        		text: btnText,
//					btnClass: 'btn-blue btn-large',
//					action: function(){
//						callback();
//					}
//		        }
//		    }
//		});
//	}
	
	var scrollText = function(ele,closeele){
		$.each(config.scrollText, function(i,n) {
			$(ele).append(
				'<span>'+n+'</span>'
			);
		});
		
		var timer = setInterval(function(){
			var obj = $(ele)[0];
			var tmp = (obj.scrollLeft)++;
			//当滚动条到达右边顶端时
			if (obj.scrollLeft==tmp) obj.innerHTML += obj.innerHTML;
			//当滚动条滚动了初始内容的宽度时滚动条回到最左端
			if (obj.scrollLeft>=obj.firstChild.offsetWidth) obj.scrollLeft=0;
		},20);
		
		$(closeele).click(function(){
		    clearInterval(timer);
		    $(closeele).parent().remove();
		})
	}
	
	var refreshPage = function(ele){
		$(ele).on("click",function(){
			window.location.reload();
		});
	}
	
	var format0 = function(n, length) {
	    return (Array(length).join('0') + n).substr(-length);
	}
	
	
	var pageVisibility = (function() {
        var prefixSupport, keyWithPrefix = function(prefix, key) {
            if (prefix !== "") {
                // 首字母大写
                return prefix + key.slice(0,1).toUpperCase() + key.slice(1);    
            }
            return key;
        };
        var isPageVisibilitySupport = (function() {
            var support = false;
            if (typeof window.screenX === "number") {
                ["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
                    if (support == false && document[keyWithPrefix(prefix, "hidden")] != undefined) {
                        prefixSupport = prefix;
                        support = true;   
                    }
                });        
            }
            return support;
        })();
        
        var isHidden = function() {
            if (isPageVisibilitySupport) {
                return document[keyWithPrefix(prefixSupport, "hidden")];
            }
            return undefined;
        };
        
        var visibilityState = function() {
            if (isPageVisibilitySupport) {
                return document[keyWithPrefix(prefixSupport, "visibilityState")];
            }
            return undefined;
        };
        
        return {
            hidden: isHidden(),
            visibilityState: visibilityState(),
            visibilitychange: function(fn, usecapture) {
                usecapture = undefined || false;
                if (isPageVisibilitySupport && typeof fn === "function") {
                    return document.addEventListener(prefixSupport + "visibilitychange", function(evt) {
                        this.hidden = isHidden();
                        this.visibilityState = visibilityState();
                        fn.call(this, evt);
                    }.bind(this), usecapture);
                }
                return undefined;
            }
        };    
    })(undefined);
	
	
	var Toast = function(config) {
	    this.context = config.context == null ? $('body') : config.context; //上下文
	    this.message = config.message; //显示内容
	    this.time = config.time == null ? 3000 : config.time; //持续时间
	    this.left = config.left; //距容器左边的距离
	    this.bottom = config.bottom; //距容器上方的距离
	    this.init();
	}
	var msgEntity;
	Toast.prototype = {
	    //初始化显示的位置内容等
	    init: function() {
	        $("#toastMessage").remove();
	        //设置消息体
	        var msgDIV = new Array();
	        msgDIV.push('<div id="toastMessage">');
	        msgDIV.push('<span>' + this.message + '</span>');
	        msgDIV.push('</div>');
	        msgEntity = $(msgDIV.join('')).appendTo(this.context);
	        //设置消息样式
	        var left = this.left == null ? this.context.width() / 2 - msgEntity.find('span').width() / 2 - 30 : this.left;
	        var bottom = this.bottom == null ? '40%' : this.bottom;
	        msgEntity.css({
	            position: 'absolute',
	            bottom: bottom,
	            'z-index': '99',
	            left: '15px',
	            right: '15px',
	            'background-color': 'black',
	            color: 'white',
	            'font-size': '16px',
	            padding: '10px',
	            margin: '10px',
	            '-webkit-border-radius': '5px'
	        });
	        msgEntity.hide();
	    },
	    //显示动画
	    show: function() {
	        msgEntity.fadeIn(this.time / 2);
	        msgEntity.fadeOut(this.time / 2);
	    }
	
	};
	
	var toast = function (text,ele,time){
		if (!ele) {
			ele = "body"
		}
		new Toast({
			context: $(ele),
			message: text,
			time: time
		}).show()
	}
	
	
	var load = {
		show: function(){
			if ($(".loading_initial").length > 0) {
				return;
			}
			var div = '<div class="loading_initial loading_C">' + '<span class="load_con">' + '<span class="load_radius">' + '</span></span>' + '<div class="load_text">loading...</div>' + '</div>';
	    		$("body").append(div);
		},
		hide: function(){
			$('.loading_initial.loading_C').remove();
		}
	}
	
	var alert = {
		show: function(text,callback){
			console.log($(".loading_initial").length)
			var div = '<div class="loading_initial loading_A">' + '<span class="load_con">' + '<span class="load_radius">' + '</span></span>' + '<div class="load_text">'+text+'</div>' + '</div>';
	    		$("body").append(div);
	    		if (!!callback) {
	    			callback();
	    		}
		},
		hide: function(){
			$('.loading_initial.loading_A').remove();
		}
	}
	
	var swtoast = function(text){
		swal({
			title: "",
			text: text,
			type: "warning",
			timer: 1000,
			showConfirmButton: false
		});
	}
	
	
	function getdata(b, callback) {
		var data = {
	        head: {
	            version: '20010000',
	            channelid: g.chn
	        },
	        body: b
	    }
		
	    var p = JSON.stringify(data);
	    var s = md5.encode(JSON.stringify(data) + 'key');
	    
	    $.ajax({
	        url: config.serverUrl + "?p=" + p + '&s=' + s,
	        type: 'post',
	        dataType: 'json',
	        data: b,
	        beforeSend: function() {
	            load.show();
	        },
	        success: function(response) {
	        		if (response.status == 0 ){
	        			callback(response.message);
	        		}else{
	        			toast('数据加载失败，请重试')
	        		}
	        },
	        complete: function() {
	            load.hide();
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	
	            if (XMLHttpRequest.status == 200) {
	                callback({});
	            } else {
	            		toast('数据加载失败，请重试');
	                callback(null, textStatus);
	            }
	        }
	
	
	
	    });
	}
	
	var giveupTask = function(adid,callback) {
//		getdata({
//			"t": 3023,
//			"c": [{
//				"userid": base.g.id,
//				"devid": base.g.devid,
//				"adid": adid
//			}]
//		},function(res){
//			console.log(res);
			remLocal("doingAdid");
			remSe("addetail");
			remSe("time");
			if (!!callback) {
				callback();
			}
//		});
	}
	
	
	var g = {
		id: getLocal("unionId"),
		chn: getLocal("chn"),
		devid: getLocal("devid")
	}
	
	g.id = "11970303";
	g.chn = "iOS100001";
//	g.chn = "1010";
	g.devid = "11394299";
	
	return {
		FZ: FZ,
		g:g,
		getUrlParam: getUrlParam,
		scrollText: scrollText,
		refreshPage: refreshPage,
		toast: toast,
		load: load,
		getdata: getdata,
		alert: alert,
		setSe: setSe,
		getSe: getSe,
		remSe: remSe,
		getLocal: getLocal,
		setLocal: setLocal,
		remLocal: remLocal,
		format0: format0,
		giveupTask: giveupTask,
		pageVisibility: pageVisibility,
		swtoast: swtoast
	}
})