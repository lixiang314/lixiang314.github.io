var vmodel;
var editorId;


avalon.ready(function() {
	avalon.filters.description = function(str, args, args2){
		   var w = 20;
			var ret = "";
			if(str.length > w){
				ret = str.substring(0,w)+"...";
			}else{
				ret = str;
			}
		   return ret;
		};
		
    vmodel = avalon.define("page", function(vm) {
        vm.result = {};
        vm.webConfig = TS_GLOBAL;
    });

    editorId = request("id");
	if(editorId != undefined){
		getArticleList(editorId);
	}else{
		getArticleList(null);
	}
	// getArticleList();
});


$(document).ready(function() {

});


function getArticleList(id){
	var apiUrl ="api/columns";
	if(id != null){
		apiUrl = apiUrl+ "?editor="+id;
	}
		$.ajax({
			url : TS_GLOBAL.baseUrl + apiUrl,
			dataType : 'json',
			type : "get",
			async : false,
			success : function(data) {
				if (data.returnCode == 0) {
					vmodel.result = data.result;
					
				} else {
					alert(data.message);
				}
			}
		});
}
