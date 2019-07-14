var img = document.getElementById("img");
var wrap = document.querySelector(".demo");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
next.onclick = function () {
  next_pic();
}
prev.onclick = function () {
  prev_pic();
}

//图片对应指定按钮时颜色的变化
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
//  console.log(index);
 showCurrentDot();
   img.src="../img/img"+index+".jpg";
//  console.log(img.src)
}


function prev_pic () {
 index--;
 if(index < 0){
   index = 4;
 }
 showCurrentDot();
   img.src="../img/img"+index+".jpg";
//  console.log(img.src)
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
     img.src="../img/img"+i+".jpg";
     index = i;
     showCurrentDot();
   }
 })(i);      
}