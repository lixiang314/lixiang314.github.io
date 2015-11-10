// var cityname = $.cookie('CITY_NAME');
var cityname = "hangzhou";
var weekMap = {
		'0':'周日',
		'1':'周一',
		'2':'周二',
		'3':'周三',
		'4':'周四',
		'5':'周五',
		'6':'周六',
	};

$(document).ready(function() {
	// checkCookie();
	$('.info-base').css('height',$(window).height()-65);
});


avalon.ready(function() {
	avalon.filters.timeFilter = function(str){
		var timeArr = str.split(" ");
		return  timeArr[1];
	}

	avalon.filters.weekFilter = function(str){
		var DateArr = str.split("-");
		var thisdate = new Date(DateArr[0],DateArr[1]-1,DateArr[2])
		return weekMap[thisdate.getDay()];
	}


	vmodel = avalon.define("page", function(vm) {
		vm.result= {};
	});

	if(cityname==null || cityname == 'null' || cityname == 'undefined' || cityname == undefined || cityname == '')
	{
		$('.form-inoput-city').show();
		$('#btn-ok').click(function(){
			cityname = $('[name=input-city-name]').val();
			if(cityname==""){
				alert('请输入城市名!');
				return;
			}
			$.cookie('CITY_NAME',cityname);
			getInfo(cityname);
		});
	}

	if(cityname!=null){
		getInfo(cityname);
	}

});




$(document).ready(function(){
	//滚动模糊
	var wh = $(window).height();
	$(document).on('scroll',function() {
		var sh = $(document).scrollTop();
    	// $(".sh").text(sh);
	    var blur_px = parseInt(sh/wh*20);
	    $('.blur').css('-webkit-filter','blur('+blur_px+'px)');
	    $('.blur').css('-moz-filter','blur('+blur_px+'px)');
	    $('.blur').css('-ms-filter','blur('+blur_px+'px)');
	    $('.blur').css('filter','blur('+blur_px+'px)');
	});
});


$(window).load(function(){

	//降水概率图表
	var popArr = $('.pop-num').text().split('%');
	$('.pop-chart').each(function(i,e){
		$(this).css('width',popArr[i]+'%');
	});

	// 风向图标
	var windArr = $('.wind-deg').text().split('-');
	$('.wind-point').each(function(i,e){
		$(this).css('-webkit-transform','rotate('+windArr[i]+'deg)');
	});

	var dailywindArr = $('.daily-wind-deg').text().split('-');
	$('.daily-wind-point').each(function(j,e0){
		$(this).show().css('-webkit-transform','rotate('+dailywindArr[j]+'deg)');
		$(this).show().css('-ms-transform','rotate('+dailywindArr[j]+'deg)');
		$(this).show().css('-moz-transform','rotate('+dailywindArr[j]+'deg)');
		$(this).show().css('-o-transform','rotate('+dailywindArr[j]+'deg)');
	});

})


function getInfo(city) {
	$.ajax({
		// url : 'http://apis.baidu.com/heweather/weather/free?city='+city,
		url : 'testData.json',
		dataType : 'json',
		type : "get",
		async : false,
		headers : {
			apikey : '31d17cb5d8919936c964a3edb380ebe3'
		},
		success : function(data) {
			if(data['HeWeather data service 3.0'][0].status=='ok'){
				$('.form-inoput-city').fadeOut(300);
				vmodel.result = data['HeWeather data service 3.0'][0];
			}
			else if(data['HeWeather data service 3.0'][0].status=='unknown city'){
				alert('他妈的城市名不对');
				$.cookie('CITY_NAME', '', { expires: -1 });
			}
		}
	});
}



