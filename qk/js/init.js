(function($){
	$(function(){
	  
	  var menu_head = $('ul.side-menu h2.title').height();
	  var item_height = $('ul.side-menu li a').height();
	  // Untoggle menu on click outside of it
    $(document).bind('touchstart click',function (e) {
      var container = $('ul.side-menu');
      if ((!container.is(e.target) && container.has(e.target).length === 0) && 
         (!($('.usericon').is(e.target)) && $('.usericon').has(e.target).length === 0)) {
        container.removeClass("in");
        $('body, ul.side-menu').removeClass("open");
              	$('#mask').removeClass('open');

      	$('ul.side-menu li').css("top", "100%");
	      $('ul.side-menu h2').css("top", "-70px");
      }
    });
    
    $(".usericon").click(function(e) {
      e.preventDefault();
      if ($('ul.side-menu, body').hasClass('open')) {
      	$('ul.side-menu').removeClass('open');
      	$('body').removeClass('open');
      	$('#mask').removeClass('open');

      	// Reset menu on close
      	$('ul.side-menu li').css("top", "100%");
	      $('ul.side-menu h2').css("top", "-70px");
      }
      else {
	      $('ul.side-menu').addClass('open');
	      $('body').addClass('open');
	      $('#mask').addClass('open')

	      $('ul.side-menu h2').css("top", 0);
	      $('ul.side-menu li').each(function() {

	      		var i = ($(this).index() - 1)
		      	var fromTop = menu_head + (i * item_height);
		      	var delayTime = 100 * i;
		      	$(this).delay(delayTime).queue(function(){
			        $(this).css("top", fromTop);
			        $(this).dequeue();
			    	});
	      });
      }

    })
	
	}); // end of document ready
})(jQuery); // end of jQuery name space