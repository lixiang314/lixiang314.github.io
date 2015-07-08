var TS_GLOBAL = {
	downloadPage : "http://a.app.qq.com/o/simple.jsp?pkgname=best.sometimes",
	beian : "©2015 sometimes.best 杭州挑食信息技术有限公司浙ICP备15002492号-1",
	AVATAR: "?imageMogr2/auto-orient/strip/thumbnail/!200x200r/gravity/Center/crop/200x200",
	THUMBNAILS : "?imageMogr2/auto-orient/strip/thumbnail/500x500>/gravity/Center/crop/450x330",
	THUMBNAILS_WIFI : "?imageMogr2/auto-orient/strip/thumbnail/!675x495r/gravity/Center/crop/675x495",
	baseUrl : "http://wap.thenwhat.cn/",
};
var msgHtml = [];
msgHtml.push("<div id=\"msg\" class=\"alert alert-danger alert-dismissible\" role=\"alert\" >");
msgHtml.push(" <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>");
msgHtml.push("<label id=\"msgText\"></label>");
msgHtml.push("</div>");

function forwardDownload(){
	window.location.href = TS_GLOBAL.downloadPage;
}

function request(strParame) {
	var args = new Object();
	var query = location.search.substring(1);

	var pairs = query.split("&"); // Break at ampersand
	for (var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1)
			continue;
		var argname = pairs[i].substring(0, pos);
		var value = pairs[i].substring(pos + 1);
		value = decodeURIComponent(value);
		args[argname] = value;
	}
	return args[strParame];
}


function errorMsg(msg) {

	if ($("#msg").length == 0) {
		$("body").eq(0).prepend(msgHtml.join(""));
	}
	$("#msg").hide();
	setTimeout(function() {
		$("#msg").show();
	}, 200);
	$("#msgText").html(msg);
	$("#msg").addClass("alert-danger");
	$("#msg").removeClass("alert-info");
}



function infoMsg(msg) {
	if ($("#msg").length == 0) {
		$("body").eq(0).prepend(msgHtml.join(""));
	}
	$("#msg").hide();
	setTimeout(function() {
		$("#msg").show();
	}, 200);
	$("#msgText").html(msg);
	$("#msg").removeClass("alert-danger");
	$("#msg").addClass("alert-info");
}

function ajaxInit() {
	$(function() {
		$.ajaxSetup({
			beforeSend : function(request) {
				request.setRequestHeader("TOKEN", sessionStorage
						.getItem("TOKEN"));
				request.setRequestHeader("USER_ID", sessionStorage
						.getItem("USER_ID"));
				request.setRequestHeader("DEVICE_ID", sessionStorage
						.getItem("OPEN_ID"));
			},
			error : function(jqXHR, textStatus, errorThrown) {
				switch (jqXHR.status) {
				case (401):
					sessionStorage.setItem("LAST_PAGE", window.location.href);
					window.location.href = "login.html";
					break;
				case (404):
					errorMsg("您所请求的资源不存在");
					break;
				default:
					errorMsg(jqXHR.responseJSON.message);
				}
			}
		});
	});
}

function menuBarChange() {

	$(".menu-bar").toggle(
			500,
			function() {
				if ($(".menu-btn").hasClass("pre")) {
					$(".menu-btn").removeClass("pre");
					$(".menu-btn").attr("src",
							"image/menu_btn.png");
				} else {
					$(".menu-btn").addClass("pre");
					$(".menu-btn").attr("src",
							"image/menu_btn_pre.png");
				}
			});

}

$(document).ready(function() {
	ajaxInit();

});