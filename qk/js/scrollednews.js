var refreshid="";
function scroll(obj) {
var tmp = (obj.scrollLeft)++;
//当滚动条到达右边顶端时
if (obj.scrollLeft==tmp) obj.innerHTML += obj.innerHTML;
//当滚动条滚动了初始内容的宽度时滚动条回到最左端
if (obj.scrollLeft>=obj.firstChild.offsetWidth) obj.scrollLeft=0;
}
refreshid = setInterval("scroll(document.getElementById('dopetext'))",20);


$('.removebt').click(function(){
    clearInterval(refreshid);
    $('.indexdope').remove();
})
