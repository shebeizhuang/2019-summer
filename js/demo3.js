//获取ul
var myList=document.getElementById("list");
//获取所有的li
var myLi = document.querySelectorAll("li");
//获取所有的span
var mySpan = document.querySelectorAll("span");
//获取imgBox
var imgBox = document.querySelector(".imgBox");
//数组存放li元素的类名
var liName = [];
var index = 0;//初始状态下按钮颜色
setColor();

//自动轮播
var timeID=setInterval(nextPic,2000);
myList.onmouseover=function(){
clearInterval(timeID);

myList.onmouseout=function(){
timeID=setInterval(nextPic,2000);
}
};

for(var i=0, myLiLength=myLi.length; i<myLiLength; i++){
    //预存数组长度减少循环语句的性能消耗
    liName[i]=myLi[i].className;
}
function nextPic(){//向下翻页
    liName.unshift(liName[5]);//复制数组最后一个值插入到数组第一个位置
    liName.pop();//删除数组最后一个元素
    for(var i=0, myLiLength=myLi.length; i<myLiLength; i++){
        //setAttribute() 方法添加指定的属性，并为其赋指定的值
        //重新给每个元素设置新的名字
        myLi[i].setAttribute("class",liName[i])
    }
    index++;
    if(index>5){
        index = 0;
    }
    setColor();
}
function prePic(){//向上翻页
    liName.push(liName[0]);//复制数组第一个值插入到数组最后一个位置
    liName.shift();//删除数组第一个元素
    for(var i=0, myLiLength=myLi.length; i<myLiLength; i++){
        //重新给每个元素设置新的名字
        myLi[i].setAttribute("class",liName[i])
    }
    index--;
    if(index<0){
        index = 5;
    }
    setColor();
}
function setColor(){
    //用for循环给span重置颜色
    for(var i=0, mySpanLength=mySpan.length; i<mySpanLength; i++){
        //要加引号
        mySpan[i].style.backgroundColor="#ccc";
    }
    mySpan[index].style.backgroundColor="#45c17c";
}

document.addEventListener("mousedown",function(ev){
    //获取事件的目标元素ev.target
    //parentNode 属性以 Node 对象的形式返回指定节点的父节点
    //img的父亲是li，classList[0]返回此li的类名，因为此集合只有一个类名
    var eleName=ev.target.parentNode.classList[0];
    if(eleName=="list1"){
        prePic();
    }
    if(eleName=="list3"){
        nextPic();   
    }
})

//点击按钮跳转到对应页面
for(var i=0,len=mySpan.length;i<len;i++){
    mySpan[i].addEventListener("mouseover",function(){

    })
}
