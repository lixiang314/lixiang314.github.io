var vmodel;
var cityName;

// var strA = new Array();
// strA = ip.split("|");
// alert(strA[0])
// cityName = '';

// var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_='+Math.random(); 
// $.getJSON(url, function(data){
// var str = data.Isp;
// var strA = new Array();
// var strB = new Array();
// var strC = new Array();
// strA = str.split(" ");
// strB = strA[0].split("省");
// strC = strB[1].split("市");
// cityName = strC[0];

// });



// function getIp(){
// 		var ipUrl = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_='+Math.random(); 
// 		var strA = new Array();
// 		var strB = new Array();
// 		var strC = new Array();
// 		$.ajax({
// 			url : ipUrl,
// 			dataType : 'json',
// 			type : "get",
// 			// async : false,
			
// 			success : function(data) {
// 				var str = data.Isp;
// 				strA = str.split(" ");
// 				strB = strA[0].split("省");
// 				strC = strB[1].split("市");
// 				cityName = strC[0];
// 				// alert("城市："+cityName);
// 				console.log(cityName);
// 			}
// 		});
// }

function show(){
	var ipUrl = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_='+Math.random(); 
	var cityName;
	var showUrl;
		var strA = new Array();
		var strB = new Array();
		var strC = new Array();
		$.ajax({
			url : ipUrl,
			dataType : 'json',
			type : "get",
			// async : false,
			
			success : function(data) {
				var str = data.Isp;
				strA = str.split(" ");
				strB = strA[0].split("省");
				strC = strB[1].split("市");
				cityName = strC[0];
				// alert("城市："+cityName);
				showUrl = "show.html?city="+cityName;
				location.href = showUrl;
				
			}
		});

	
}

