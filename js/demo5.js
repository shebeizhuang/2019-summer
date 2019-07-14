//获取ul
var item = document.querySelector(".item");
//获取li
var oLis = item.getElementsByTagName('li');

//右点击
//记录当前图片的位置,类似于索引
var courrent = 0; 
//获取右按钮
var rightBtn = document.querySelector(".rightBtn");
//点击时触发事件
rightBtn.onclick = function() {
    //使用字面量对象表示法
    //第一次调用animate函数，目的是使当前这张图片的opacity=0
    animate(oLis[courrent], {opacity: 0});
    courrent++;
    //当点击到第五张图片时，courrent为4，点击下一张应该为第一张图片 所以做判断courrent为5时，把courrent改为0
    //改变索引，类似于瞬间定位
    if(courrent == 5) {
        courrent = 0;
    }
    showCurrentPagePoint(courrent);
    //第二次调用animate函数，目的是使右边的那张要显示出来的图片opacity=1
    animate(oLis[courrent], {opacity: 1});
}

//左点击 和右点击基本一样
var leftBtn = document.querySelector(".leftBtn");
leftBtn.onclick = function() {
    animate(oLis[courrent], {opacity: 0});
    courrent--;
    if(courrent == -1) {
        courrent = 4;
    }
    showCurrentPagePoint(courrent);
    animate(oLis[courrent], {opacity: 1});
}






// 自动播放
var autoPlayTimer = setInterval(function() {
    rightBtn.onclick();
}, 2000);




//当鼠标移入item时，自动播放停止
item.onmouseenter = function() {
    clearInterval(autoPlayTimer);
}



//当鼠标移出item时，自动继续播放，并从停止的位置开始播放
item.onmouseleave = function() {
    autoPlayTimer = setInterval(function() {
        rightBtn.onclick();
    }, 2000);
}






var oPage = document.querySelector('.page');
var tLis = oPage.getElementsByTagName('li');
//当图片在动的时候小圆点也在跟着图片动
function showCurrentPagePoint(courrent){
    //遍历li上色
    for (var i = 0; i < tLis.length; i++) {
        tLis[i].style.background = 'red';
    }
    //图片对应的索引为白色
    tLis[courrent].style.background = 'white';
}
//这里调用一次是因为打开网页的时候第一个圆点为白色
showCurrentPagePoint(0);




//当点击小圆点时切换图片
//let 命令每次循环都会执行一次，声明一个新变量（但初始化的值不一样）？？？
for (let i = 0; i < tLis.length; i++) {
    tLis[i].onclick = function(){
        //console.log(i)
        animate(oLis[courrent],{opacity:0});
        courrent = i;
        animate(oLis[courrent],{opacity:1});
        showCurrentPagePoint(courrent);
    }
}




//传过来的是某一个li和一个字面量对象
function animate(div,obj) {
    //清空计时器
    clearInterval(div.timer);
    div.timer =  setInterval(function () {
        var flag = true;//假设已经到了目的地， 想要达到的opacity的值达到了
        for(var key in obj){
            //key是可枚举的属性？是实例？
            // console.log(key)，输出的就是"opacity",每切换一次数量剧增
            // console.log(obj[key])，输出的是0 1 0 1 0 1，是数值
            var target = obj[key];//可能是0，可能是1，取决于传过来的字面量对象所要达到的opacity
            // console.log(target);可能是0，可能是1，取决于传过来的字面量对象所要达到的opacity
            if(key == 'opacity'){
                //不知道为什么是要按照这条公式
                var speed = (target - parseFloat(getStyle(div)[key]))*100/8;
                //最最最最一开始的状态：taiger是1，getStyle得到的值是0；或者target是0，getStyle得到的值是1。speed得到的值是12.5或者-12.5
                //console.log(parseFloat(getStyle(div)[key]));
                speed = (speed>0? Math.ceil(speed): Math.floor(speed));
                //正数向上取整，负数向下取整，例如最开始是13和-13

                var op = parseFloat(getStyle(div)[key]) + speed/100;
                // 例如最开始是0.13（往进化成1的路上走）和0.87（往进化成0的方向上走）

                div.style[key]=  op;
               //得到的值赋值给对象的opacity
                if(parseFloat(getStyle(div)[key]) !=target ){
                    flag = false;
                //与所要的目标不同时，标志值是false
                }

            }
            else{

                //当字面量对象还有其他可枚举属性时，却看不懂它要干嘛
                var speed = (target - parseInt(getStyle(div)[key]))/8;
                // console.log(target);
                speed = (speed>0? Math.ceil(speed): Math.floor(speed));
                div.style[key]= parseInt(getStyle(div)[key]) + speed +'px';
                if(parseInt(getStyle(div)[key]) !=target ){
                    flag = false;
                }
            }
        }
        //不满足！=target的条件，依旧保持标志值为true，即满足=target
        //必须等到所有的 属性都到达目的地 才能结束定时器
        if(flag == true){
        clearInterval(div.timer);
        }
    },50);

}


function getStyle(ele) {
    if(ele.currentStyle){
        return ele.currentStyle;
    }
    else{
        return getComputedStyle(ele,null);
    }
    }