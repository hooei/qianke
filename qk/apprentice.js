var z = new citesData();
z.useridData(function() {
	// 账户数据
	z.accountData(function(a, b) {
		// 邀请收益
		$('#revenueInvite').html(a.totalincome.umbrella_income);
		// 提成收益
		$('#incomeRoyalty').html(a.totalincome.invite_share_income);

	});


	// 邀请人数
	z.invitenNumberData(function(a, b) {
		// 邀请人数
		$('#numberInvite').html(a.user.childs);

	});

});



var argumentUrl = _GLOBAL.queryString(window.location.search),
    sourceurl = argumentUrl['source'] || 0;

    console.log(sourceurl);

if (sourceurl == 'index') {
	$('.sourceurl').attr('href','index.html'); 
};
if (sourceurl == 'taskDouble') {
	$('.sourceurl').attr('href','taskDouble.html'); 
};
if (sourceurl == 'taskunion') {
	$('.sourceurl').attr('href','taskunion.html'); 
};


