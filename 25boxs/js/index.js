$(document).ready(function() {
  var height = $(window).height();
  $('.container').css('height',height+'px');
  if(localStorage.getItem('highest')!==null){
    $('#highest').text(localStorage.getItem('highest'));
  }
});

// 第一次开始
$('#startGame').on('click',function() {
  $(this).hide();
  $('.begin-num').text(2);
  setTimeout(function(){$('.begin-num').text(1);},1000);
  setTimeout(function(){$('.begin-num').text(0);},2000);
  setTimeout(function(){gameInit();},3000);
});
//重新开始
$('#restartGame').on('click',function() {
  $(this).hide();
  $('#gameover').hide();
  $('.begin-num').text(2).show();
  setTimeout(function(){$('.begin-num').text(1);},1000);
  setTimeout(function(){$('.begin-num').text(0);},2000);
  setTimeout(function(){gameInit();},3000);
});

// 游戏初始化
function gameInit() {
  $('.begin-num').hide();
  getBox();
  var boxHeight = $('.num-box').width();
  $('.num-box').css('height',boxHeight+'px');
  eventNum(1);
  timeCount.start();
}



// 插入25个方块
function getBox(){
  var arr=[];
  for(var i=0;i<25;i++){
    arr[i]=i+1;
  }
  arr.sort(function(){ return 0.5 - Math.random() });
  var boxHtml = [];
  $.each(arr,function(i){
    boxHtml.push('<div class="num-box num-'+arr[i]+'"><p>'+arr[i]+'</p></div>');
  })
  $('.game-table').html(boxHtml.join(""));
}

// 依次给每个方块添加事件
function eventNum(i) {
  if(i<=25){
    $('.num-'+i).on('click',function(){
      $(this).addClass('num-box-off').unbind('click');
      eventNum(i+1);
    });
  }
  else if(i===26){
    timeCount.stop();
    console.log($('#time').text()+'秒');
    var score = $('#time').text();
    $('#score').text(score);
    if(localStorage.getItem('highest') && score < localStorage.getItem('highest')){
      localStorage.setItem('highest',score);
      $('#highest').text(score);
    }
    else if(!localStorage.getItem('highest')){
      $('#highest').text(score);
    }
    $('#score').text(score);
    $('#gameover').show();
    $('#restartGame').show();
    $('.game-table').html("");
  }

}

// 计时对象
var timeCount = {
  timeObj : {},
  start : function(){
    var t = 0;
    this.timeObj = setInterval(function() {
      t+=1;
      $('#time').text(t/10);
    },100);
  },
  stop : function(){
    clearInterval(this.timeObj);
  },
  init : function(){
    $('#time').html(0);
  }
}
