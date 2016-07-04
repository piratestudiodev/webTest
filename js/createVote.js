function onAddPartyTime(){
	var varPartyTimeText = $('#partyTimeText').val() ;
	if ('' == varPartyTimeText) 
	{
		notifyMsg("聚会时间未填写！");
		return false ;
	}

	if (varPartyTimeText.indexOf("\&") > 0) 
	{
		notifyMsg("聚会时间含有非法字符“&”！");
		return false ;
	}
	var isHaveEmptyItem = 0 ;
	$('.partyTimeAddItem').each(function() {
		if($(this).is(':hidden'))
		{
			isHaveEmptyItem = 1;
			$(this).text(varPartyTimeText);
			$(this).slideDown("slow");
			return false ;
		}
	});

	if (0 == isHaveEmptyItem) 
	{
		notifyMsg("无法添加4个以上的聚会时间选项", 1500);
	}
}

function onAddPartyPlace(){
	var varPartyTimeText = $('#partyPlaceText').val() ;
	if ('' == varPartyTimeText) 
	{
		notifyMsg("聚会地点未填写！");
		return false ;
	}
	if (varPartyTimeText.indexOf("\&") > 0) 
	{
		notifyMsg("聚会地点含有非法字符“&”！");
		return false ;
	}
	var isHaveEmptyItem = 0 ;
	$('.partyPlaceAddItem').each(function() {
		if($(this).is(':hidden'))
		{
			isHaveEmptyItem = 1;
			$(this).text(varPartyTimeText);
			$(this).slideDown("slow");
			return false ;
		}
	});

	if (0 == isHaveEmptyItem) 
	{
		notifyMsg("无法添加4个以上的聚会地点选项", 1500);
	}
}

function onReset(){
	$('.partyTimeAddItem').slideUp();
	$('.partyTimeAddItem').text('');
	$('.partyPlaceAddItem').slideUp();
	$('.partyPlaceAddItem').text('');
}

function onSubmit(){
	// 聚会名称
	var strPartyName = $('#partyName').val();
	if ('' == strPartyName) 
	{
		notifyMsg("请填写聚会名称", 1500);
		return false ;
	}

	// 聚会时间
	var isHavePartyTime = 0;
	var arrayPartyTime = new Array('','','','') ;
	$('.partyTimeAddItem').each(function(index, el) {
		if(!$(this).is(':hidden'))
		{
			arrayPartyTime[index] = $(this).text();
			isHavePartyTime = 1;
		}
	});
	if (0 == isHavePartyTime) 
	{
		notifyMsg("请至少增加一个聚会时间选项", 1500);
		return false ;
	}
	var strPartyTimeJoin = arrayPartyTime.join('\&');

	// 聚会地点
	var isHavePartyPlace = 0;
	var arrayPartyPlace = new Array('','','','') ;
	$('.partyPlaceAddItem').each(function(index, el) {
		if(!$(this).is(':hidden'))
		{
			arrayPartyPlace[index] = $(this).text();
			isHavePartyPlace = 1;
		}
	});
	if (0 == isHavePartyPlace) 
	{
		notifyMsg("请至少增加一个聚会地点选项", 1500);
		return false ;
	}
	var strPartyPlaceJoin = arrayPartyPlace.join('\&');

	console.log("strPartyName:", strPartyName);
	console.log("strPartyTimeJoin:", strPartyTimeJoin);
	console.log("strPartyPlaceJoin:", strPartyPlaceJoin);

	// 调用服务器创建vote用的php，展示创建的vote页面
	$.ajax({
		url: 'createVote.php',
		type: 'get',
		data: {	"partyName" : strPartyName,
				"partyTimeJoin" : strPartyTimeJoin,
				"PartyPlaceJoin" : strPartyPlaceJoin},
		success: function(response) { 
			notifyMsg('success'); 
			console.log("response:", response);
			window.open(response);
		},
		error: function(request, errorType, errorMessage) {
			notifyMsg('Error: ' + errorType + ' with message: ' + errorMessage);
		}
	})
}

function onSubmitTest(){
		$.ajax({
		url: 'createVote.php',
		type: 'get',
		data: {	"partyName" : "testName",
				"partyTimeJoin" : "time1&time2&time3&",
				"PartyPlaceJoin" : "place1&place2&place3&place4"},
		success: function(response) { 
			console.log("response:", response); 
			window.open(response);
		},
		error: function(request, errorType, errorMessage) {
			notifyMsg('Error: ' + errorType + ' with message: ' + errorMessage);
		}
	})
	}

function notifyMsg(showMsg, showTime){
	if (!arguments[1]) {
		showTime = 1200;
	}
	if (null == showMsg || '' == showMsg) {
		return false ;
	}

	var pMsg = $('#notifyMsg');
	pMsg.show();
	pMsg.find('p').text(showMsg);
	window.setTimeout(function() {
		pMsg.hide('fast');
	}, showTime)
}

$(document).ready(function() {
	$('#onAddPartyTime').on('click', onAddPartyTime);
	$('#onAddPartyPlace').on('click', onAddPartyPlace);
	$('#onReset').on('click', onReset);
	$('#onSubmit').on('click', onSubmitTest);
});