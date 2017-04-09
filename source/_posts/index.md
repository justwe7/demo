---
title: jQquery常用语法自用总结
date: 2017-04-08 20:41:51
thumbnail: "/img/daily_pic.jpg"
categories:
- js
tags:
- js
- jq
---
# jQquery常用语法自用
## 选择器：是js的核心。jQuery ($/query) 是个对象,选择出来的为一个数组。
##  ** 基本语法 **

| 语法       | 说明   |
| --------   | -----  |
| $("#myELement")    |选择id值等于myElement的元素，id值不能重复在文档中只能有一个id值是myElement所以得到的是唯一的元素 |
| $("div") |选择所有的div标签元素，返回div元素数组 |
|$(".myClass")|选择使用myClass类的css的所有元素|
|$("*")|选择文档中的所有的元素 |

## ** 层叠（级）选择器 **

|  语法    | 说明   |
| --------   | -----  |
| $("parent child") |  选择所有的parent元素中的child元素 。选择某个父级下的子级(所有)可以为多级 |
| $("#main > *") | 选择id值为main的所有的子元素，不为多级 |
| $("label + input")  |选择所有的label元素的下一个input元素节点，经测试选择器返回的是label标签后面直接跟一个input标签的所有input标签元素 |
| $("#prev ~ div")   | 选择所有的id为prev的标签元素之后的所有div元素节点标签  |

## ** 基本过滤选择器 **

|   语法       | 说明   |
| --------   | -----  |
|$("tr:first") |  选择所有tr元素的第一个 |
|$("tr:last")  |  选择所有tr元素的最后一个|
|$("input:not(:|checked) + span") 过滤掉：checked的选择器的所有的input元素。这个选择的是span，（未被选中的元素的下一个）|
|$("tr:even")  |  选择所有的tr元素的第0，2，4... ...个元素（注意：因为所选择的多个元素时为数组，所以序号是从0开始）|
|$("tr:odd") | 选择所有的tr元素的第1，3，5... ...个元素 |
|$("td:eq(2)") |  选择所有的td元素中序号为2的那个td元素 ，eq(A)中的A可以传入变量如索引值|
|$("td:gt(4)") |  选择td元素中序号从0开始计数大于4的所有td元素,传参为负数后往前找（版本1.8之前是不支持负数的），-2选的是倒数第1个，递减|
|$("td:lt(4)") |  选择td元素中序号小于4不含4的所有的td元素|
|$(":header")  |  选择所有标题元素，像h1, h2, h3 等|
|$("div:animated")  | 选择所有正在执行动画效果的元素|
|$(':focus') | 选择当前获取焦点的元素。|
|$('span:first-of-type')|查找所有标签下的第一个span|
|$(':first-child')  | 找到所有标签的第一个子元素。如果在：的前面写一个指定标签，那么不一定能够获取的到|
|$('span:first') |查找所有span中的第一个span|

## ** 内容过滤选择器 **

 |    语法     | 说明   |
| --------   | -----  |
|$("div:contains('John')")  | 选择所有div中含有John文本的元素 $("标签名:contains('标签内的内容')")|
|$("td:empty") |  选择所有的为空（也不包括文本节点）的td元素的数组|
|$("div:has(p)") |选择所有含有p标签的div元素|
|$("td:parent") | 选择所有的以td为父节点的元素数组|

## ** 可视化过滤选择器 **

 |    语法    | 说明   |
| --------   | -----  |
|$("div:hidden") |选择所有的被hidden的div元素|
|$("div:visible")  |  选择所有的可视化的div元素|

## ** 属性过滤选择器。可以使用多个属性进行联合选择 **

| 语法        | 说明   |
| --------   | -----  |
|$("div[id]")  |  选择所有含有id属性的div元素|
|$('input:file') |找到属性为file的input  |
|$('input:disabled') | 选择input中属性为disabled的元素。|
|$("input[name='newsletter']") |  选择所有的name属性等于'newsletter'的input元素|
|$("input[name!='newsletter']")  |选择所有的name属性不等于'newsletter'的input元素|
|$( "input[miaov&#124;='aaa']")  | 选择指定属性值等于aaa或以aaa为前缀（该aaa后跟一个连字符“-” ）的元素|
|$("input[name^='news']")   | 选择所有的name属性以'news'开头的input元素|
|$("input[name$='news']")   | 选择所有的name属性以'news'结尾的input元素|
|$("input[name*='man']") |选择所有的name属性包含'news'的input元素|
|$[attribute~='value']  | 选择input中属性名为value并且两边有空格的所有元素（包括只有属性值的，如果value开头前面也属于空格）|
|$("input[id][name$='man']")  |   可以使用多个属性进行联合选择，该选择器是得到所有的含有id属性并且那么属性以man结尾的元素|

## ** 子元素过滤选择器 **

 | 语法        | 说明   |
| --------   | -----  |
|$(':first-child') |  找到所有标签的第一个子元素。  $("div span:first-child") 返回所有的div元素的第一个子节点的数组|
|$(':first-child')  | 找到所有标签的最后一个子元素。  $("div span:last-child") 返回所有的div元素的最后一个节点的数组|
|$("div button:only-child") | 返回所有的div中只有唯一一个子节点的所有子节点的数组|
|$("ul li:nth-child(2)")| ul下标为2的li元素|
|$("ul li:nth-child(odd)") | 偶数 |
|$("ul li:nth-child(3n + 1)") |   |

## ** 表单元素选择器 **

 | 语法        | 说明   |
| --------   | -----  |
|$(":input") |选择所有的表单输入元素，包括input, textarea, select 和 button……|
|$(":text") | 选择所有的text input元素|
|$(":password") | 选择所有的password input元素|
|$(":radio")| 选择所有的radio input元素|
|$(":checkbox") | 选择所有的checkbox input元素 |
|$(":submit")  |  选择所有的submit input元素|
|$(":image") |选择所有的image input元素|
|$(":reset")| 选择所有的reset input元素|
|$(":button")  |  选择所有的button input元素|
|$(":file") | 选择所有的file input元素|
|$(":hidden")  |  选择所有类型为hidden的input元素或表单的隐藏域|

## ** 表单元素过滤选择器 **

| 语法        | 说明   |
| --------   | -----  |
|$(":enabled")  | 选择所有的可操作的表单元素|
|$(":disabled") | 选择所有的不可操作的表单元素|
|$(":checked")  | 选择所有的被checked的表单元素|
|$("select option:selected")    | 选择所有的select 的子元素中被selected的元素|
|$(”input[@ name =xxx]“).parent().prev().text() | 选取一个 name 为"xxx"的input text框的上一个td的text值|
|$(”input[@ name ^='S_']“).not(”[@ name $='_R']“) |   名字以”S_”开始，并且不是以”_R”结尾的|
|$(”input[@ name =radio_01][@checked]“).val(); |  一个名为 radio_01的radio所选的值|

## ** 使用例子 **

    HTML 代码:
    <form>
    <label>Name:</label>
    <input name="name" />
    <fieldset>
          <label>Newsletter:</label>
          <input name="newsletter" />
    </fieldset>
    </form>
    <input name="none" />

| 语法        | 说明   |
| --------   | -----  |
|$("A B")|查找A元素下面的所有子节点，包括非直接子节点。例子：找到表单中所有的 input 元素 jQuery 代码: $("form input") 结果: [ `<input name="name" />, <input name="newsletter" />` ] |
|$("A>B")|查找A元素下面的直接子节点。  例子：匹配表单中所有的子级input元素。jQuery 代码: $("form > input") 结果: [ `<input name="name" />` ] |
|$("A+B")|查找A元素后面的兄弟节点，包括非直接子节点。 例子：匹配所有跟在 label 后面的 input 元素 jQuery 代码:$("label + input") 结果:[ `<input name="name" />, <input name="newsletter" />` ] |
|$("A~B")|查找A元素后面的兄弟节点，不包括非直接子节点。  例子：找到所有与表单同辈的 input 元素 jQuery 代码: $("form ~ input")  结果: [ `<input name="none" />` ]|

## ** 方法总结 **

 | 语法        | 说明   |
| --------   | -----  |
|$('li').slice(1,3)|选择指定范围的元素。第一个参数：起始位置。第二个参数：结束的位置（但不包括结束位置）。|
|$('li').first()| li集合中的第一个li|
|$('li').last() | li集合中的倒数第一个li|
|$('ul').children() | ul下的子元素。选择的只是一级|
|$('ul').find('li')|ul下的li子元素选择父元素下的所有。与$('ulli')功能差不多是从右往左查找的，所有从性能的角度来说，效率并不高。而使用$('ul').find('li')的时候是根据某个元素下的某些元素去查找的（类似于我们通过某个元素下去getElementsByTagName()。建议使用find的方式去获取一些复杂的元素。|
|$('p').parent() |选择当前p元素的父级。|
|$('p').parents()  |  选择当前元素的所有祖先级节点。|
|$('p').closest('.box') | 找的是最近的唯一一个父级元素(不过也包含自身)|
|$('.box').append(oDiv) | 往某个父级元素内的后面添加一个元素     oDiv.appendTo('.box') 区别是改变了this |
|$('.box').prepend(oDiv)| 往某个父级元素里的首位添加一个元素      prependTo() |
|$('.box').before(oDiv) | 往某个元素的前面添加一个元素         insertBefore()|
|$('.box').after(oDiv) |  往某个元素的后面添加一个元素         insertAfter()|
|append/appendTo区别  | （其他几个，比如：before/insertBefore） append 如果在之后还要去操作元素，那么这个时候的this为.box appendTo 如果在之后还要去操作元素，那么这个时候的this为要添加的元素|
|$('#div1').remove()| 要删除的元素.remove()|
| oLi.clone() |克隆元素,如要复制还需要再append，默认的情况下，不能clone事件,如果在()内传入true，会将克隆对象的事件给克隆出来。|
|$('div span').index()  | 返回的值为div下的第一个span的下标 1.index的返回值，为兄弟中的排行（数值会随着位置的改变而变化）2.在使用index()的时候，在括号中应当，把要查找的索引元素具体化。|
|$('li').get(0).innerHTML = '' |  转原生js方法，可以获取offset等属性 get()，可以改为[]下标|
|$('li').css('width','100px')  |  将li设置width为100px ，如果不写100px会只是获取到宽度，如果设置多个可以将样式设置为json格式|
|$('li').Width/height(100) | 将li设置height为100px ，不传入参数返回原来设置的高度，数值为number，不包括padding、border
| innerWidth()innerHeight(100)  | 跟clientHeight/clientWidth一样，不包括边框（只包括自身的宽高+padding）在写操作的时候，注意设置的宽高为自身宽高+padding的总和，比如：padding = 10px  $(obj).innerWidth(200),自身的宽度为180，因为有20像素的padding|
|outerWidth() /outerHeight(100) | 自身宽高 + padding + boder 类似于offsetWidth/offsetHeight  获取宽高都能够在隐藏的时候，获取到。可视区：$(window).innerHeight()  整个文档的高度：$(document).innerHeight()|
|$(window).scrollTop()  | 窗口滚动条距离，已经计算过滚动条的值|
| $(obj).offset().left/top   |对象的绝对位置|
|$(obj).position().left/top|相对于定位父级到元素的距离。如果元素值有margin值，那么这个距离是找不到的。|
|$('obj').offsetParent().attr('id') | 找定位父级（元素），可以通过attr获取属性|
|$('span').wrap('`<oDiv>`');|将span标签用div包起来，先创建div $('被包的一个对象')wrap(壳): 将某个元素包在某个标签里面。|
|$('span').wrapAll('`<div>`'); |$('被包的一堆对象').wrapAll(壳)|
|$('div').wrapInner('`<span>`')   | $(壳).wrapInner(被包的标签)；在匹配元素里的内容外包一层结构。|
|$('span').unwrap('div'); |   把包在这个对象上的壳，去掉。$('被包的一个对象').unwrap('壳'); 注意：如果壳为body是删不掉的。|
|$('#div1').html('');   | 清空div内的内容，也可以用来传参设置内容|
|$('#div1').empty();| 清空div内的所有子节点，不可恢复  下面有对应可恢复的|
|$('#div1').detach();|移除#div元素，保存所有的jq数据与其关联，可以用来再次添加   var oP = $('#div1').find('p').detach();  $('#div1').append(oP);|
|$('#div1').text('`<b>B</b>`')|只获取文本信息。设置：也会将原来元素中的内容覆盖，并且以字符串的方式输出到页面。 （浏览器不读标签） |
|$('div').replaceWith($('p'))|将div标签替换为p标签（如果有），但会将原来的div删除掉，相当于剪切，否则只是删除  参数是要替换的标签|
|$('p').replaceAll($('div'))|将p标签替换为div标签（如果有），与replaceWith相同|
|$('#home').find('a').end().find('b') |   找到#home下的a和b链式操作|


## ** 事件汇总 **

 | 语法        | 说明   |
| --------   | -----  |
| $('#div1').on('click',function)  $('#div1').click(function)|给div1加一个点击事件，如果要同时加多个可以在'click'之后空格添加另一个触发。事件之后可以加一个自定义的属性，如"click.hhh"相当于click事件正常调用，但是解除的时候也解除可以只解除这个不改变别的click|
|$('#div1').off('click');|解除事件绑定：如果off()的括号中传入指定的事件名，那么就是解除指定的事件绑定函数，如果不传，解除所有的事件。在某个元素下有多个事件绑定函数的时候，如果为多个事件：那么off()括号中放上要解除的事件名。单个事件：那么要在单个事件的不同事件绑定函数内设置一个“自定义”的属性，那么在解除的时候，某个事件.“自定义”属性|
|$('#div1').hover(fn1,fn2);|将移入移出绑定到一起，如果函数调用了动画，最好在两个动画之前添加stop解决快速移入移出问题$(selector).hover(handlerIn, handlerOut)是$(selector).mouseenter(handlerIn).mouseleave(handlerOut);简写|
|$('obj').one('click',function(){alert(8)}|对象添加一次的事件，执行之后就没有了，比如可以用来做按钮点击失效|
|Event对象|$(document).click(function(ev){console.log(ev.pageY)}  ev.clientX/ev.clientY获取的值是根据可视区宽高来决定的。可视区宽高     ev.pageX/ev.pageY 获取的值是根据整个文档宽高来决定的。文档宽高    ev.which:获取键盘值。 $(ev.target).css('background','red') 事件源操作，可以改变子元素原生的兼容ev.target &#124;&#124; ev.srcElement|
|阻止冒泡|①.ev.stopPropagation()   只阻止事件往上冒泡，不阻止事件本身  ②.return false    不仅阻止了事件往上冒泡，而且阻止了事件本身.阻止默认事件、阻止冒泡都可以用return false来阻止。 |
|事件委托，为未来的元素添加事件|$('ul').delegate('li','click',function(ev){alert(ev.target.innerHTML)})之后dom创建的也可以绑定到这个事件      $('ul').on('click','li',function(ev){alert(ev.target.innerHTML)})  和delegate作业相同1.7版本jq新增|
|解除事件委托|$('ul').delegate('#clos','click',function(ev){$(ev.delegateTarget).undelegate();})  解除事件委托  此处ev.delegateTarget是ul  $('input:button').eq(1).click(function () {$($('ul')).undelegate();} $(要解除的对象).undelegate |
|trigger|根据绑定到匹配元素的给定的事件类型执行所有的处理程序和行为  $('#div1').on('mouseover.aaa',function(){alert('1123');});  $('#div2').click(function(){$('#div1').trigger('mouseover.aaa');})  相当于div2调用了div1的aaa属性函数|

## ** 工具方法。既可以在$对象上使用，也可以在原生上使用。 **

 | 语法        | 说明   |
| --------   | -----  |
|$.type()  |  查看数据是什么类型的。比typeof更直观。|
|$.isFunction() | 查看数据是否为函数。如果是返回true否则返回false|
|$.isNumeric(str)  |  查看数据是否为数字（或是纯数字的字符串）。如果是返回true否则返回false|
|$.isArray() |是否数组|
|$.isWindow()   | 是否window对象|
|$.isEmptyObject()  | 查看是不是对象类型的数据：也包括null|
|$. isPlainObject({})  |  查看是不是自变量（{}）的对象。|
|$.extend(true,'被定义的对象','要被拷贝的对象');|  当需要深拷贝的时候，在extend()中的第一个参数加上true   |
|$.proxy(fn1,document)(a,b); |函数改变this指向。也可以这样写$.proxy(fn1,window,1,2)();|
|$.parseHTML('str') | 转出来的标签为原生对象   有各种属性|

## ** 运动 **

 | 语法        | 说明   |
| --------   | -----  |
|显示隐藏|    $('#div1').hide('slow');隐藏 'fast'    200   /   'normal'  400   /    'slow'    600  参数对应  $('#div1').show(200); 显示  $('#div1').toggle();隐藏+显示，自带开关  toggle的这些方法，都会主动判断某个元素是否显示或隐藏，根据当前元素的属性来做运动。 |
|渐变隐藏 |   $('#div1').fadeOut('normal');    |
|渐变显示 |   $('#div1').fadeIn(5000);   5s|
|滑动效果 |   $('#div1').slideDown();  下滑动  $('#div1').slideUp();上滑动  $('#div1').slideToggle(2000) 会主动判断执行上/下滑动
|运动函数  |  $('#div1').animate({width:200},{duration:500,easing:'swing',complete:function(){$('#div1').animate({height:300})},step:function(a,b){})$('obj').animate({css},speed,callback);  duration：运动的时间  easing：运动的形式(swing:缓冲 linear：匀速两种)    complete：运动之后的回调函数    step：运动时的细节信息参数a代表变化属性的当前值，b代表一个集合，b.pos 运动时0-1的比例。 可以据此设置一个数值随运动增加的效果|
|运动队列  |  逐行写一遍顺序执行的效果会按队列的方式执行运动或者直接用“.”连接   $('#div1').animate({width:200}).animate({height:200});|
|运动延时 |   运动与运动之前设置一个延迟执行的时间。   $('#div1').animate({width:200}).delay(1000).animate({height:200});|
|运动停止   | .stop(string,false,false)  ①.停止的名称如{width:100}  ②.是否取消后续的效果，默认否  ③.是否立即完成当前动画，默认否  加在动画调用之前可以用来作为一个开关  $('#div1').animate({width:1200},1000).animate({height:200}).animate({opacity:0});  设置动画  $('input').eq(0).mouseover(function () {$('#div1').stop({width:1200},false,true)})    取消动画|
|运动完成   | .finish(string)  提前快速执行完运动效果。传参会停止这个$('input').eq(0).mouseover(function () {$('#div1').finish({width:1200})|
|监听动画结束 | $('obj').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){  });|
