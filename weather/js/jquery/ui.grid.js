(function ($, undefined) {
    $.widget("ui.grid", {
    	i18n:{
    		'zh-CN':{first:"首页",prev:'上页',next:"下页",last:'尾页',refresh:'刷新',emptyText:'无数据'},
    		'en':{first:"First",prev:'Prev',next:'Next',last:'Last',refresh:'Refresh',emptyText:'No record to display'},
    		'en-GB':{first:"First",prev:'Prev',next:'Next',last:'Last',refresh:'Refresh',emptyText:'No record to display'},
    		'ko':{first:"집",prev:'이전',next:"다음",last:'마지막',refresh:'신선한',emptyText:'데이터가 없습니다'}
    	},
    	lan:'en',
		version: "1.9.2",
		defaultElement: "<div>",
        options: {
            colModel : null,
			url : null,
			parm : null,
			pageNumber : 1,
			pageSize :10,
			totalPages : 1,
			totalRows : 0,
			currentRows : 0,
			data_map:{},
			title : null,
            height: 'auto',
            error:null,
            accessDenied:null,
            minHeight:100
        },
		widget: function() {
			return this.uiDialog;
		},
		next:function(){
			this.options.pageNumber++;
			this.load();
		},
		first:function(){
			this.options.pageNumber = 1;
			this.load();
		},
		last:function(){
			this.options.pageNumber = this.options.totalPages;
			this.load();
		},
		prev:function(){
			this.options.pageNumber--;
			this.load();
		},
		refresh:function(){
			this.load();
		},
		_init_page:function(data){
			var  $el =  this.element;
			var startNum =((data.pageNumber -1 ) * data.pageSize + 1) ;
			var endNum  = 0;
			if(data.rows)
				endNum =( startNum + data.rows.length -1 );
			if(data.totalRows == 0){
				startNum = endNum = 0;
				$('.page_info',$el).html( "0 of 0");
			}else
				$('.page_info',$el).html( startNum + " - "+ endNum +" of "+ data.totalRows);
			var first =( data.pageNumber != 1)  ,last = (data.totalPages != data.pageNumber);
			
			if(first){
				$('.first',$el).attr('href','javascript:void(0);').removeClass('disable');
				$('.prev',$el).attr('href','javascript:void(0);').removeClass('disable');
			}else{
				$('.first',$el).removeAttr('href').addClass('disable');
				$('.prev',$el).removeAttr('href').addClass('disable');
			}
			
			if(last){
				$('.last',$el).attr('href','javascript:void(0);').removeClass('disable');
				$('.next',$el).attr('href','javascript:void(0);').removeClass('disable');
			}else{
				$('.last',$el).removeAttr('href').addClass('disable');
				$('.next',$el).removeAttr('href').addClass('disable');
			}
			
			this.options.totalPages = data.totalPages ;
			this.options.totalRows = data.totalRows;
			this.options.currentRows = data.rows?data.rows.length:0;
			this.options.pageNumber = data.pageNumber;
			
		},
		bind:function(data,me){
			var data_map = me.options.data_map ;
		    $rows = $('.rows',me.element);
	        $rows.html('');
	        var length = 0;
            if(data.rows){
				$.each(data.rows,function(i){
					var data_row = this;
	                var $tr  = $('<tr>');
	                if(i%2 == 1){
	                	$tr.addClass("row-alt");
	                }else{
	                	$tr.addClass("row-even");
	                }
	                
					$.each(data_map, function () {
						var val = data_row[this.name];
						if (typeof(this.process) == 'function') {
							val = this.process(val, data_row);
						}
	                    var $td = $('<td>').data('data',data_row).attr('width',(this.width+'px'));
	                    
	                    $td.html(val||(val ===0 ||val ===false ? (val ===false ? 'false': '0') :'&nbsp;'));
	                    $td.appendTo($tr);
					});
	                $tr.appendTo($rows).mousemove(function(){
	                	$(this).addClass("row-over");
	                }).mouseout(function(){
	                	$(this).removeClass("row-over");
	                }).click(function(){
	                	var temp = $(this);
	                	$("tr",temp.parent()).removeClass("row-selected");
	                	temp.addClass("row-selected");
	                });
				});
				length =  data.rows.length;
            }
//            var isSetEmpty = false;
//            for(i = 0;i<(this.options.pageSize - length ) ;i++ ){
//            	  var $tr  = $('<tr class="none-border'+(i ==0? " first":"")+((i==this.options.pageSize-1-length)?" last":"")+'"  ><td colspan="'+this.options.colModel.length+'">&nbsp;</td></tr>');
//                  if(length == 0&&!isSetEmpty){
//                	  isSetEmpty = true;
//                	  $tr.html('<td colspan="'+this.options.colModel.length+'">'+this.local.emptyText+'</td>').addClass("no-record");
//                  }
//            	  $tr.appendTo($rows);
//            }
          if(length == 0){
        	  var $tr =$('<tr class="row-alt"><td colspan="'+this.options.colModel.length+'">'+'无数据'+'</td></tr>');
        	  $tr.appendTo($rows);
          }
          
			me._init_page(data);
		},
		load : function(parm){
			var me = this;
			var uiGrid =  this.uiGrid;
			var $refresh = $('.refresh-icon', uiGrid);
			uiGrid.addClass("loading");
			$refresh.addClass('refresh-loading').removeClass("disable");
		
			if(parm&&parm.isDelete){
				delete parm['isDelete'];
				if(this.options.currentRows==1 && (this.options.pageNumber ==this.options.totalPages)){
					if(this.options.pageNumber>1)
						this.options.pageNumber--;
				}
				if(!$.isPlainObject(parm)){
					me.options.parm = parm;
				}
			}else{
				if(parm)
					me.options.parm =jQuery.extend({},me.options.parm, parm);
			}
			var urlpram = jQuery.extend({},me.options.parm,{pageSize:this.options.pageSize,
				pageNumber : ((parm&&(parm.pageNumber||parm.pageNumber ===0 ))? parm.pageNumber:this.options.pageNumber)
			});
			$.ajax(
				{url:this.options.url, data :urlpram, success : function (data) {
				if(data.generalResult.success){
					me.bind(data.generalResult.result,me);
				}else{
					if(data.generalResult.returnCode == 2){
						if($.isFunction(me.options.accessDenied))
							me.options.accessDenied(data);
						else
							window.location.href = "../logout";
					}else if(data.generalResult.returnCode == 1){
						if($.isFunction(me.options.error))
							me.options.error(data);
						else
							$.error(data.generalResult.message);
					}
				}
				uiGrid.removeClass("loading");
				$refresh.removeClass('refresh-loading');
			}, dataType:'json',
				error:function(request){
					$.error(request);
				},cache:false
				});
			return this;
		},
		local:{},
         _create : function () {
            var uiGrid = ( this.uiGrid = $( "<div>" ).addClass('ui-grid') );

            var html = [];
            if(this.options.title != null || this.element.attr('title') != null){
            	html.push("<div class='grid-title'><p>"+(this.options.title|| this.element.attr('title')||'')+"</p></div>");
            	if($.browser.msie&&($.browser.version == "7.0") ) {
            		html.push("<div class='div-hr-buttom'></div>");
            	}
            	else{
            		html.push("<hr>");
            	}
            }
            html.push("<div class='ui-grid-body'><div class='ui-grid-tbody'><table class='grid-table'>");
            this.element.removeAttr("title");
            var me = this;
            if (!this.options.colModel) {
                jQuery.error("set the colModel");
                return;
            } else {
            	html.push("<tr style='' >");
                $.each(this.options.colModel, function (i) {
                    me.options.data_map[this.name||i] = this;
                    html.push("<th  width=\"" + (this.width +'px'|| "100%") + "\">" + this.display + "</td>");
                });
                html.push("</tr>");
            }
            var me = this;

            var page_html = '<div class="paging-bar border clearfix">';
            	if($.browser.msie&&($.browser.version == "7.0") ) {
            		page_html += ("<div class='div-hr-buttom'></div>");
            	}
            	else{
            		page_html +=("<hr>");
            	}
            	page_html +='<div class="paging-nav constrain clearfix bottom"><span class="page_info">0 of 0 </span>'
            +'<ul class="links"><li><a title="" class="first disable"><span style="float:left; ">' + '首页' + '</span></a></li>'
            +'<li><a title="" class="prev disable"><span style="float:left; ">' + '上一页' + '</span></a></li>'
            +'<li><a title="" class="next disable"><span style="float:left; ">' + '下一页' + '</span></a></li>'
            +'<li><a title="" class="last disable"><span style="float:left; ">' + '尾页' + '</span></a></li></ul>'
            +'</div></div>';
			
            
            html.push("<tbody class=\"rows\">");
            for(var i = 0;i<(this.options.pageSize) ;i++ ){
            	//html.push('<tr  class="none-border'+(i ==0? " first":"")+((i==this.options.pageSize-1)?" last":"")+'"><td colspan="'+this.options.colModel.length+'">&nbsp;</td></tr>');
            }
            html.push("</tbody></table></div></div>");
            html.push("<div class='ui-grid-foot'>" + page_html + "</div>");
			uiGrid.html(html.join(''));
			$('.refresh-icon',uiGrid).bind( "click" +this.eventNamespace,function(){
				if(!$(this).hasClass("disable")){
					me['refresh'](me);
				}
				return;
			});
			$('.links a',uiGrid).bind( "click" + this.eventNamespace, function() {
				var $el = $(this);
				
				if($el.attr('href')){
					me[$el.attr('class')](me);
				}
			});
            this.element.append(uiGrid);
            //this._size();
        },
        _size : function(){
           var nonContentHeight = this.uiGrid.css({
				height: "auto",
				width: options.width
			})
			.outerHeight();
            
            var minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );
            if ( options.height === "auto" ) {
                // only needed for IE6 support
                if ( $.support.minHeight ) {
                    this.element.css({
                        minHeight: minContentHeight,
                        height: "auto"
                    });
                } else { 
                    autoHeight = this.element.css( "height", "auto" ).height();
                    
                    this.element.height( Math.max( autoHeight, minContentHeight ) );
                }
            } else {
                this.element.height( Math.max( options.height - nonContentHeight, 0 ) );
            }
        },
        _setOption: function( key, value ) {
            switch ( key ) {
                case 'title':
                    $( ".grid-title", this.uiGrid).html(value);
            }
        }
    });
}(jQuery));


function changeRefreshIconDown(){
	$(".refresh-icon").css("background","url(/docs/images/common/refreshPress.png)");
}

function changeRefreshIconUp(){
	$(".refresh-icon").css("background","url(/docs/images/common/refreshUp.png)");
}
