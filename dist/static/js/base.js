define(["jquery","config","md5","sweetalert"],function(t,n,e,i){function o(i,o){var s={head:{version:"20010000",channelid:I.chn},body:i},a=JSON.stringify(s),r=e.encode(JSON.stringify(s)+"key");t.ajax({url:n.serverUrl+"?p="+a+"&s="+r,type:"post",dataType:"json",data:i,beforeSend:function(){y.show()},success:function(t){0==t.status?o(t.message):b("数据加载失败，请重试")},complete:function(){y.hide()},error:function(t,n,e){200==t.status?o({}):(b("数据加载失败，请重试"),o(null,n))}})}var s,a=function(t,n){function e(){var e=document.documentElement.clientWidth||document.body.clientWidth,i=t/n*e;return i}document.documentElement.style.fontSize=e()+"px",window.onresize=function(){setTimeout(function(){document.documentElement.style.fontSize=e()+"px"},100)}},r=function(t){var n=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),e=window.location.search.substr(1).match(n);return null!=e?decodeURIComponent(e[2]):null},c=function(t,n){if("object"==typeof n)var e=JSON.stringify(n);else if("string"==typeof n||"number"==typeof n)var e=n;else window.alert("setLocal err");window.sessionStorage.setItem(t,e)},d=function(n){var e=window.sessionStorage.getItem(n);return"object"==typeof t.parseJSON(e)&&(e=t.parseJSON(e)),e},l=function(t){window.sessionStorage.removeItem(t)},u=function(t,n){window.localStorage.setItem(t,n)},f=function(t){return window.localStorage.getItem(t)},m=function(t){window.localStorage.removeItem(t)},h=function(e,i){t.each(n.scrollText,function(n,i){t(e).append("<span>"+i+"</span>")});var o=setInterval(function(){var n=t(e)[0],i=n.scrollLeft++;n.scrollLeft==i&&(n.innerHTML+=n.innerHTML),n.scrollLeft>=n.firstChild.offsetWidth&&(n.scrollLeft=0)},20);t(i).click(function(){clearInterval(o),t(i).parent().remove()})},p=function(n){t(n).on("click",function(){window.location.reload()})},g=function(t,n){return(Array(n).join("0")+t).substr(-n)},v=function(){var t,n=function(t,n){return""!==t?t+n.slice(0,1).toUpperCase()+n.slice(1):n},e=function(){var e=!1;return"number"==typeof window.screenX&&["webkit","moz","ms","o",""].forEach(function(i){0==e&&void 0!=document[n(i,"hidden")]&&(t=i,e=!0)}),e}(),i=function(){if(e)return document[n(t,"hidden")]},o=function(){if(e)return document[n(t,"visibilityState")]};return{hidden:i(),visibilityState:o(),visibilitychange:function(n,s){if(s=!1,e&&"function"==typeof n)return document.addEventListener(t+"visibilitychange",function(t){this.hidden=i(),this.visibilityState=o(),n.call(this,t)}.bind(this),s)}}}(void 0),w=function(n){this.context=null==n.context?t("body"):n.context,this.message=n.message,this.time=null==n.time?3e3:n.time,this.left=n.left,this.bottom=n.bottom,this.init()};w.prototype={init:function(){t("#toastMessage").remove();var n=new Array;n.push('<div id="toastMessage">'),n.push("<span>"+this.message+"</span>"),n.push("</div>"),s=t(n.join("")).appendTo(this.context);var e=(null==this.left?this.context.width()/2-s.find("span").width()/2-30:this.left,null==this.bottom?"40%":this.bottom);s.css({position:"absolute",bottom:e,"z-index":"99",left:"15px",right:"15px","background-color":"black",color:"white","font-size":"16px",padding:"10px",margin:"10px","-webkit-border-radius":"5px"}),s.hide()},show:function(){s.fadeIn(this.time/2),s.fadeOut(this.time/2)}};var b=function(n,e,i){e||(e="body"),new w({context:t(e),message:n,time:i}).show()},y={show:function(){if(!(t(".loading_initial").length>0)){var n='<div class="loading_initial loading_C"><span class="load_con"><span class="load_radius"></span></span><div class="load_text">loading...</div></div>';t("body").append(n)}},hide:function(){t(".loading_initial.loading_C").remove()}},x={show:function(n,e){var i='<div class="loading_initial loading_A"><span class="load_con"><span class="load_radius"></span></span><div class="load_text">'+n+"</div></div>";t("body").append(i),e&&e()},hide:function(){t(".loading_initial.loading_A").remove()}},S=function(t){i({title:"",text:t,type:"warning",timer:1e3,showConfirmButton:!1})},_=function(t,n){m("doingAdid"),l("addetail"),l("time"),n&&n()},I={id:f("unionId"),chn:f("chn"),devid:f("devid")};return I.id="11970303",I.chn="iOS100001",I.devid="11394299",{FZ:a,g:I,getUrlParam:r,scrollText:h,refreshPage:p,toast:b,load:y,getdata:o,alert:x,setSe:c,getSe:d,remSe:l,getLocal:f,setLocal:u,remLocal:m,format0:g,giveupTask:_,pageVisibility:v,swtoast:S}});