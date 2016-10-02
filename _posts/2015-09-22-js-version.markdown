---
layout:     post
title:      "快速入门JavaScript模块化"
subtitle:   "JavaScript Modularization"
date:       2016-03-16
author:     "Lixzap"
header-img: "img/post-bg-js-module.jpg"
tags:
    - 前端开发
    - JavaScript
---


前言
-----
都说“不重复造轮子”，就像iPhone——它除了打电话还可以播放音乐——但是工程师不用从零开始做一个音乐播放功能，也许只要在iPhone的系统中整合一个ipod。

前端开发亦是如此，最理想化的开发状态就是，工程师只写核心业务代码，其他通用的功能和组件都可以无缝加载别人写好的代码，就像很多那样。

可是实际情况是，有个糟糕的 iPhone 工程师，他搞混了 iPhone 和 ipod 的系统，甚至把 iPhone 的 Home 键和 iPod 的音量键焊在同一个。

还有一些糟糕 JavaScript 开发者，一不小心声明了全局变量，混乱了“命名空间”，都让协作开发变得不那么友好，抑或他开发了一个通用模块，用户们却发现载入了他的代码之后，用户自己的代码被他搞得一团糟。

原始人写法
-----

比如下面这段代码：
```
var mylove = "coding";

function getLove() {
  return mylove;
}

function sayLove(thing) {
  console.log(thing);
}

console.log(getLove());//>>> coding
sayLove('girl');//>>> girl
```

在 window 对象下声明了一个变量`mylove`，然后使用`getLove()`函数去获取这个变量，使用`setLove()`修改这个变量。
恩，功能是实现了。只是这样做之后，说不定什么时候你由于粗心又在某个地方声明了一次`mylove`，而你的粗心同事也不知道会在什么地方写了一个同名函数——也许有3个参数的`setLove()`函数。

对象封装写法
------
怎么办呢？你获取想到了，把这些变量和函数都写在一个对象里：

```
var loveThing = {
  mylove : "coding",
  getLove :function() {
    return this.mylove;
  },
  sayLove : function(thing) {
    console.log(thing);
  }
}

console.log(loveThing.getLove());//>>> coding
loveThing.sayLove('girl');//>>> girl
```
这种写法已经有点模块的样子了，一下就能看出这几个函数和变量之间的联系。缺点在于所有变量都必须声明为公有，所以都要加this指示作用域以引用这些变量。更危险的是，在对象之外也能轻松更改里面的参数：

```
loveThing.mylove = "sleeping";
console.log(loveThing.getLove());//>>> sleeping
```

立即执行函数
-----
我向来不惮以最坏的恶意揣测程序员，你永远想不到你的 partner 会不会真的在其他地方修改了你的参数，也不知道自己是否会在不经意间修改了他的。我们必须在他下手之前——让自己的模块先执行掉，不给对方可趁之机。此时使用一种叫做**立即执行函数**的办法，可以避免暴露私有成员。

```
var loveThing = (function(){
  var my = {};
  var love = "coding";
  my.getLove = function() {
    return love;
  }
  my.sayLove = function(thing) {
    console.log(thing);
  }
  return my;
})();

console.log(loveThing.getLove());//>>> coding
loveThing.sayLove('reading');//>>> reading

```
我们试着获取里面的变量：

```
console.log(loveThing.love);//>>> undefined
```
果然，外部根本看不见里面的零件，只能使用提供的接口。这样才能保证私有变量的安全。

放大模式
----
当然，一个项目要用到模块化的时候，说明这个项目足够大足够复杂，一个模块可能需要继承另一个模块，或者扩充模块，这时候需要使用**放大模式**：

```
var loveThing = (function (o){
  o.sayOK = function () {
    console.log('OK');
  };
  return o;
})(loveThing);

loveThing.sayOK();//>>> OK!
```


宽放大模式
-----
可是，浏览器是一个不按常理出牌的环境，你永远不知道自己引用的模块是否已经加载。万一我之前的`loveThing`没有被加载，上面这段代码就会报错了（找不到对象）。解决方法就是所谓**宽放大模式**：

```
var loveThing = (function (o){
  o.sayOK = function () {};
  return o;
})(loveThing || {});
```
与之前唯一的不同就是参数可以为空对象。

至此，最基本的JavaScript模块化写法你已经学会了，相信你也体会到自己原来的写法有什么不足。

受篇幅限制，本篇入门到此结束，我会在下一篇讨论流行的模块化规范。
