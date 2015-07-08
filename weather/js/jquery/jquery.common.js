(function($, undefined) {
	$.fn.extend({
		resetForm : function(selector) {

		},
		confirm : function(callback, width, height,beforeClose) {
			var dialog = $('#confirmDialog');
			if (!dialog.length)
				dialog = $(
						'<div id="confirmDialog">' + '确认删除?'
								+ '</div>').hide().appendTo(document.body)
						.dialog({
							modal : true,
							resizable : false,
							title : '确认'
						});

			var buttons = [];
			buttons[0] = {
				click : function() {
					$(this).dialog("close");
					if (callback)
						callback();
				},
				text: '确定',
				'class':'ui-dialog-button-yes'
			};
			
			buttons[1] = {
					click:function() {
						$(this).dialog("close");
					},
				text:'关闭',
				'class':'ui-dialog-button-no'
			};
			var option = {
				beforeClose: function( event, ui ) {
					if(beforeClose)
						beforeClose(event,ui);
				},
				buttons : buttons
				
			};
			if(width)
				option.width = width;
			if(height)
				option.height =height;
			dialog.dialog('option', option).dialog('open');
			 
		},
		warning : function(msg, callback, width, height,beforeClose) {
			var dialog = $('#warningDialog');
			if (!dialog.length)
				dialog = $('<div id="warningDialog">').hide().appendTo(
						document.body).dialog({
					modal : true,
					resizable : false,
					title : '警告'
				});
			dialog.html(msg);
			var buttons = [];
			buttons[0] = {
				click : function() {
					$(this).dialog("close");
					if (callback)
						callback();
				},
				text: '确定',
				'class':'ui-dialog-button-ok'
			};
			var option = {
				beforeClose: function( event, ui ) {
					if(beforeClose)
						beforeClose(event,ui);
				},
				buttons : buttons
			};
			dialog.dialog('option', option).dialog('open');

		},
		message : function(msg, callback, width, height,beforeClose) {
			var dialog = $('#messageDialog');
			if (!dialog.length)
				dialog = $('<div id="messageDialog">').hide().appendTo(
						document.body).dialog({
					modal : true,
					resizable : false,
					title : '消息'
				});
			dialog.html(msg);
			var buttons = [];
			buttons[0] = {
				click : function() {
					$(this).dialog("close");
					if (callback)
						callback();
				},
				text: '确认',
				'class':'ui-dialog-button-ok'
			};
			var option = {
				beforeClose: function( event, ui ) {
					if(beforeClose)
						beforeClose(event,ui);
				},
				buttons : buttons
			};
			if(width)
				option.width = width;
			if(height)
				option.height =height;
			dialog.dialog('option', option).dialog('open');

		},
		__initButton : function(msg,button){
			if(jQuery.isPlainObject(msg)){
				jQuery.extend(button,msg);
			}
		},
		error : function(msg, callback, width, height,beforeClose) {
			var dialog = $('#errorDialog');
			if (!dialog.length) {
				dialog = $('<div id="errorDialog">').hide().appendTo(
						document.body).dialog({
					modal : true,
					title : '错误'
				});
			}
			dialog.html(msg);
			var buttons = [];
			buttons[0] = {
				click : function() {
					$(this).dialog("close");
					if (callback)
						callback();
				},
				text: '确认',
				'class':'ui-dialog-button-ok'
			};
			var option = {
				beforeClose: function( event, ui ) {
					if(beforeClose)
						beforeClose(event,ui);
				},
				buttons : buttons
			};
			if(width)
				option.width = width;
			if(height)
				option.height =height;
			dialog.dialog('option', option).dialog('open');
		},
		setForm : function(obj) {
			for ( var attr in obj) {
				if (typeof (obj[attr]) == 'function') {
					continue;
				}
				var $input = $(':input[name="' + attr + '"]', this);
				if ($input.length) {
					var type = $input.attr("type");
					if ((type == "checkbox" || type == "radio") && obj[attr]) {

						var avalues = obj[attr];
						if (!jQuery.isArray(avalues))
							avalues = (obj[attr] + "").split(",");

						for ( var v = 0; v < avalues.length; v++) {
							$input.each(function(i, n) {
								var value = $(n).val();
								if (value == avalues[v]) {
									$(n).attr("checked", "checked");
								}
							});
						}
					} else {
						$input.val(obj[attr]);
					}
				}
			}
			return this;
		}
	});

})(jQuery);
