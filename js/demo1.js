   var wrap = document.querySelector(".wrap");
   var next = document.querySelector(".arrow_right");
   var prev = document.querySelector(".arrow_left");
   next.onclick = function () {
     next_pic();
   }
   prev.onclick = function () {
     prev_pic();
   }

   var index = 0;
   var dots = document.getElementsByTagName("span");
   function showCurrentDot () {
   for(var i = 0, len = dots.length; i < len; i++){
     dots[i].className = "";
   }
   dots[index].className = "on";
   }

   function next_pic () {
    index++;
    if(index > 4){
      index = 0;
    }
    showCurrentDot();
    //wrap.style.left是一个字符串
    // parseInt() 函数可解析一个字符串，并返回一个整数。
    var newLeft;
    if(wrap.style.left === "-3600px"){
      newLeft = -1200;
    }else{
    //再把图片容器往左移
      newLeft = parseInt(wrap.style.left)-600;
    }
    wrap.style.left = newLeft + "px";
   }
   function prev_pic () {
    index--;
    if(index < 0){
      index = 4;
    }
    showCurrentDot();
    var newLeft;
    if(wrap.style.left === "0px"){
      newLeft = -2400;
    }else{
      //把图片容器往右移
      newLeft = parseInt(wrap.style.left)+600;
    }
    wrap.style.left = newLeft + "px";
   }

   var timer = null;
   function autoPlay () {
      timer = setInterval(
          //闭包？？
          function () {
              next_pic();
          },
      1000);
   }
   autoPlay();

   var container = document.querySelector(".container");
   //onmouseenter 事件在鼠标指针移动到元素上时触发。
   container.onmouseenter = function () {
   clearInterval(timer);
   }
   container.onmouseleave = function () {
   autoPlay();  
   }


  for (var i = 0, len = dots.length; i < len; i++){
    (function(i){
      dots[i].onclick = function () {
        var dis = index - i;
        if(index == 4 && parseInt(wrap.style.left)!==-3000){
          dis = dis - 5;   
        }
        if(index == 0 && parseInt(wrap.style.left)!== -600){
          dis = 5 + dis;
        }
        wrap.style.left = (parseInt(wrap.style.left) + dis * 600)+"px";
        index = i;
        showCurrentDot();
      }
    })(i);      
  }



