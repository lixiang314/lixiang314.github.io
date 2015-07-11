var vmodel;
var cityName;

avalon.ready(function() {
    vmodel = avalon.define("page", function(vm) {
        vm.result = {};
    });
    cityName = request("city");
	if(cityName != undefined){
		getWeather(cityName);
	}else{
		getWeather(null);
	}

});

function getWeather(city){

	var apiUrl;
	if(city != null){
		apiUrl = "http://apis.baidu.com/heweather/weather/free?city="+city;
	}
		$.ajax({
			url : apiUrl,
			dataType : 'json',
			type : "get",
			async : false,
			success : function(data) {
			vmodel.result = data['HeWeather data service 3.0']
			},
			headers :{
				apikey : "31d17cb5d8919936c964a3edb380ebe3"
			},
		});
}