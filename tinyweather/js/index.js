var vmodel;

var cityname = ascii2native(remote_ip_info.city);
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
	$('.info-base').css('height',$(window).height()-65);
  $('.sg-txt').on('click',function() {
    $('.sg-info').slideUp();
    $(this).children('.sg-info').slideDown();
  });
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

  getInfo();
});



var blur_px;
var s1 = 0;
var s2 = 0;
var wh = $(window).height();
$(document).ready(function(){
	//滚动模糊
	$(document).on('scroll',function() {
		var sh = $(document).scrollTop();
	    if(sh*2<wh){
	    	s1 = s2;
	    	s2 = 0;
	    	blurpx = 0;
	    }else {
	    	s1 = s2;
	    	s2 = 1;
	    	blurpx = 10;
	    }
	    if(s1!=s2){
	    	switchBlur(blurpx);
	    }
	});
});

function switchBlur(blurpx) {
	// $('.blur').css('transform','translate3d(0px, '+ blurpx +'px, 0px);');
	$('.blur').css('-webkit-filter','blur('+blurpx+'px)');
	$('.blur').css('-moz-filter','blur('+blurpx+'px)');
	$('.blur').css('-ms-filter','blur('+blurpx+'px)');
	$('.blur').css('filter','blur('+blurpx+'px)');
}


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
		$(this).css('-ms-transform','rotate('+windArr[i]+'deg)');
		$(this).css('-moz-transform','rotate('+windArr[i]+'deg)');
		$(this).css('-o-transform','rotate('+windArr[i]+'deg)');
	});

	var dailywindArr = $('.daily-wind-deg').text().split('-');
	$('.daily-wind-point').each(function(j,e0){
		$(this).show().css('-webkit-transform','rotate('+dailywindArr[j]+'deg)');
		$(this).show().css('-ms-transform','rotate('+dailywindArr[j]+'deg)');
		$(this).show().css('-moz-transform','rotate('+dailywindArr[j]+'deg)');
		$(this).show().css('-o-transform','rotate('+dailywindArr[j]+'deg)');
	});
	$('.dashboard').css('height',$('.dashboard').width());
	var humdeg = ($('.dashboard').attr('value') - 50)*2.4;
	$('.dashboard-pointer').each(function(j,e0){
		$(this).css('-webkit-transform','rotate('+humdeg+'deg)');
		$(this).css('-ms-transform','rotate('+humdeg+'deg)');
		$(this).css('-moz-transform','rotate('+humdeg+'deg)');
		$(this).css('-o-transform','rotate('+humdeg+'deg)');
	});

})

/**
 * get the weather info
 * @method get weather info
 * @param  {[type]} city [city]
 * @return {[type]}      [description]
 */
function getInfo() {
	$.ajax({
		url : 'http://apis.baidu.com/heweather/weather/free?city='+cityname,
    // url : 'http://apis.baidu.com/heweather/weather/free?cityip='+cityip,

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
				var humNum = vmodel.result.now.hum;
				if (humNum<40) {
					vmodel.result.now.humtxt = "干燥";
				}
				else if(humNum>70){
					vmodel.result.now.humtxt = "潮湿";
				}
				else {
					vmodel.result.now.humtxt = "舒适";
				}

			}
			else if(data['HeWeather data service 3.0'][0].status=='unknown city'){
				alert('城市名不对');
				$.cookie('CITY_NAME', '', { expires: -1 });
			}
		}
	});
}

// 获得背景图片，使用知乎日报api
$.ajax({
  url:'http://news-at.zhihu.com/api/4/start-image/1080*1776',
  dataType : 'json',
  type : "get",
  async : false,
  dataType:"json",

  success:function (data) {
    $('.backimg').css('background','url('+data.img+') center / contain no-repeat')

  }
})


// 将ASCII编码转化为汉字
function ascii2native(strAscii) {
     var output = "";
     var posFrom = 0;
     var posTo = strAscii.indexOf("\\u", posFrom);
     while (posTo >= 0) {
         output += strAscii.substring(posFrom, posTo);
         output += toChar(strAscii.substr(posTo, 6));
         posFrom = posTo + 6;
         posTo = strAscii.indexOf("\\u", posFrom);
     }
     output += strAscii.substr(posFrom);
     return output;
}
