var cityname = $.cookie('CITY_NAME');

$(document).ready(function() {
	// checkCookie();
});


avalon.ready(function() {
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

function getInfo(city) {
	$.ajax({
		url : 'http://apis.baidu.com/heweather/weather/free?city='+city,
		// url : 'testData.json',
		dataType : 'json',
		type : "get",
		async : false,
		headers : {
			apikey : '31d17cb5d8919936c964a3edb380ebe3'
		},
		success : function(data) {
			if(data['HeWeather data service 3.0'][0].status=='ok'){
				vmodel.result = data['HeWeather data service 3.0'][0];
			}
			else if(data['HeWeather data service 3.0'][0].status=='unknown city'){
				alert('他妈的城市名不对');
				$.cookie('CITY_NAME', '', { expires: -1 });
			}
		}
	});
}



// function getCookie(c_city)
// {
// 	if (document.cookie.length>0)
// 	{
// 		c_start=document.cookie.indexOf(c_city + "=")
// 		if (c_start!=-1)
// 		{
// 			c_start=c_start + c_city.length+1
// 			c_end=document.cookie.indexOf(";",c_start)
// 			if (c_end==-1) c_end=document.cookie.length
// 				return unescape(document.cookie.substring(c_start,c_end))
// 		}
// 	}
// 	return ""
// }

// function setCookie(c_city,value,expiredays)
// {
// 	var exdate=new Date()
// 	exdate.setDate(exdate.getDate()+expiredays)
// 	document.cookie=c_city+ "=" +escape(value)+
// 	((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
// }


// function checkCookie() {
// 	cityName=getCookie('cityName')
// 	if (cityName!=null && cityName!="")
// 	{
// 			// cookie中已经存在城市名
// 			alert(cityname);
// 		}
// 		else
// 		{
// 			$('.form-inoput-city').show();

// 			$('#btn-ok').click(function(){
// 				var inputCity = $('[name=input-city-name]').val();
// 				if(inputCity==""){
// 					alert('请输入城市名!');
// 					return;
// 				}
// 				cityName = inputCity;
// 				if (cityName!=null && cityName!=""){
// 					getInfo(cityname);
// 					setCookie('cityName',cityName,365);
// 				}
// 			});


// 		}
// 	}
