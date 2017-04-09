window.onload = function () {

    /*导航栏*/
    var oNav = document.getElementById('nav');
    var aDiv = oNav.getElementsByTagName('div');
    var aNavA = oNav.getElementsByTagName('a');
    for (var i = 0; i < aDiv.length; i++) {
        aDiv[i].onmouseenter = function () {
            this.children[0].setAttribute('data-aft',this.children[0].innerHTML);
        }
        aDiv[i].onmouseleave = function () {
            this.children[0].setAttribute('data-aft','');
        }
    }

    var oSearch = document.getElementById('search_box');
    var oSerchTip = document.getElementById('serch_tip');
    var oInpText = oSearch.children[1];
    var oSeroPen = false;
    var nCode = -1;
    var nLast = 0;
    oSearch.onclick = function (ev) {//搜索按钮
        var ev = ev || event;
        var target = ev.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == 'b'){
            if (oSeroPen) {
                window.open('http://www.baidu.com/s?wd='+oSearch.children[1].value,'_blank','width=1000,height=500,resizable=false')
            }else{
                oSeroPen = true;
                move(oSearch,{'left':1300},400,'easeOut',function () {
                    oSearch.children[0].className += ' serach_btn';
                    oSearch.children[1].style.display = 'block';
                    move(oSearch,{'left':920},400,'backOut')
                });
            }
        }
    }
    oInpText.onfocus = function () {//输入框
        this.value = '';
    }
    document.onclick = function () {
        oSerchTip.style.display = 'none';
    }
    oInpText.onkeyup = function (ev) {
        oSerchTip.style.display = 'block';
        var ev = ev || event;
        if(ev.keyCode != 38 && ev.keyCode != 40 && ev.keyCode != 13){
            nCode = -1;
            save = oInpText.value;
        }
        jsonp('http://suggestion.baidu.com/su',
        {
            wd:this.value,
            json:1,
            p:3
        },function(data){
            serchTips(data.s,ev.keyCode,save)
        },'cb'
        );
    }
    function serchTips(datas,Code,save) {
        if (Code != 38 && Code != 40 && Code != 13) {
            oSerchTip.innerHTML = '';
            for (var i = 0; i < datas.length; i++) {
                var aLi = document.createElement('li');
                aLi.innerHTML = '<a href="http://www.baidu.com/s?wd='+datas[i]+'" target="_blank">'+datas[i]+'</a>';
                oSerchTip.appendChild(aLi);
            }
        }
        var aTips =  oSerchTip.getElementsByTagName('li');
        if(aTips.length === 0)return;
        for(var i=0;i<aTips.length;i++){
            aTips[i].index = i;
            aTips[i].onmouseover = function () {
                aTips[nLast].className = '';
                this.className = 'active';
                nCode = nLast = this.index;
            }
        }
        switch(Code){
            case 38:
                aTips[nLast].className = '';
                if (nCode == -1) {
                    nCode = aTips.length;
                }
                if (nCode == 0) {
                    oInpText.value = save;
                    nCode = -1;
                    return;
                }
                nCode--;
                aTips[nCode].className = 'active';
                oInpText.value = aTips[nCode].children[0].innerHTML;
                nLast = nCode;
            break;
            case 40:
                nCode++;
                aTips[nLast].className = '';
                if (nCode === aTips.length) {
                    oInpText.value = save;
                    nLast = --nCode;
                    nCode = -1;
                    return;
                }
                aTips[nCode].className = 'active';
                oInpText.value = aTips[nCode].children[0].innerHTML;
                nLast = nCode;
            break;
            case 13:
                // window.open('http://www.163.com','_blank')
                // console.log('http://www.baidu.com/s?wd='+oInpText.value)
                window.location.href='http://www.baidu.com/s?wd='+oInpText.value;
            break;
        }
    }


    /*轮播图*/
    var oPicBox = document.getElementById('img_box');
    var oPicCon = document.getElementById('img_con');
    var oPicBtn = document.getElementById('img_btn');
    var oBtnL = document.getElementById('img_bt_l');
    var oBtnR = document.getElementById('img_bt_r');
    var oSelect = document.getElementById('selec');

    for (var i = 0; i < LBImgData.length; i++) {
        var json = LBImgData[i];
        for(var key in json){
            switch(key){
                case 'img':
                    var sImg = json[key];
                break;
                case 'link':
                    var sLink = json[key];
                break;
            }
        }

        var aA = document.createElement('a');
        aA.href = sLink;

        var aImg = document.createElement('img');
        aImg.src = sImg;

        aA.appendChild(aImg);
        oPicCon.appendChild(aA);

        var span = document.createElement("span");//创建按钮
        span.className = 'img_num';
        oPicBtn.insertBefore(span,oPicBtn.children[0]);
    }

    var aImg = oPicCon.children;

    var nWidth = oPicCon.offsetWidth;

    for (var i = 1; i < aImg.length; i++) {
        aImg[i].style.left = nWidth + 'px';
    }

    var aBtn_Img = oPicBtn.getElementsByTagName('span');
    var iNow = 0;
    var nLeft = aBtn_Img[0].offsetLeft;
    var onOff = true;
    oSelect.style.left = aBtn_Img[0].offsetLeft + 'px';
    for (var i = 0; i < aBtn_Img.length-3; i++) {
        aBtn_Img[i].index = i;
        aBtn_Img[i].onmousedown = function () {
            if (!onOff) {return;}
            onOff = false;
            nLeft = aBtn_Img[this.index].offsetLeft;
            if (this.index > iNow) {//往右
                aImg[this.index].style.left = nWidth + 'px';
                move(aImg[iNow],{'left':-nWidth},500,'linear');
                selcMove(oSelect,nLeft);
            } else if(this.index < iNow){
                aImg[this.index].style.left = -nWidth + 'px';
                move(aImg[iNow],{'left':nWidth},500,'linear');
                selcMove(oSelect,nLeft);
            }
            move(aImg[this.index],{'left':0},500,'linear',function () {
                onOff = true;
            })
            iNow = this.index;
        }
    }

    function selcMove(obj,val) {
        move(obj,{
            'width': 20,
            'height':10,
            'top':3,
            'left':val-3,
            'opacity':0.9,
            },100,'linear',
            function () {
                move(obj,{
                    'left':val-2,
                    'width':17,
                    'height':14,
                    'opacity':0.7,
                    'top':1
                    },300,'easeBothStrong',
                    function () {
                        obj.style.cssText = 'width:17px;height:17px;top:-1px;left:'+(val-1)+'px'
                    });
            })
    }

    oBtnL.onmousedown = function () {
        if (!onOff) {return;}
        onOff = false;
        move(aImg[iNow],{'left':nWidth},500,'linear');
        --iNow < 0  ? iNow = aImg.length - 1 : iNow;
        aImg[iNow].style.left = -nWidth + "px";
        nLeft = aBtn_Img[iNow].offsetLeft;
        selcMove(oSelect,nLeft)
        move(aImg[iNow],{'left':0},500,'linear',function () {
            onOff = true;
        })
        return false;
    }
    oBtnR.onmousedown = function () {
        if (!onOff) {return;}
        onOff = false;
        autoPlay();//向右效果一样
        return false;
    }

    var timerImg = null;
    timerImg = setInterval(autoPlay,3000)
    function autoPlay() {
        move(aImg[iNow],{'left':-nWidth},500,'linear');
        ++iNow > aImg.length - 1 ? iNow = 0 : iNow;
        aImg[iNow].style.left = nWidth + 'px';
        move(aImg[iNow],{'left':0},500,'linear',function () {
            onOff = true;
        })
        nLeft = aBtn_Img[iNow].offsetLeft;
        selcMove(oSelect,nLeft)
    }
    oPicBox.onmouseenter = function (ev) {
        clearInterval(timerImg)
    }
    oPicBox.onmouseleave = function () {
        clearInterval(timerImg);
        timerImg = setInterval(autoPlay,3000)
    }

    /*右侧推荐卡*/

    var oArticle = document.getElementById('hot_view');
    var oAlst1 = document.getElementById('article_f');
    var oAlst2 = document.getElementById('article_s');
    var oAlst3 = document.getElementById('article_t');

    for (var i = 0; i < 3; i++) {
        var aDiv = document.createElement('div');
        aDiv.innerHTML = '<h3 class="fl">'+
                        '<a href="'+HotData[i]['link']+'" title="">'+HotData[i]['title']+
                        '</a></h3><p class="fl">'+HotData[i]['detail']+
                        '</p>';
        oArticle.appendChild(aDiv);
    }

    oArticle.children[0].className = 'article_f';
    oArticle.children[1].className = 'article_s';
    oArticle.children[2].className = 'article_t';
    for (var i = 0; i < oArticle.children.length; i++) {
        addEvent(oArticle.children[i],'mouseenter',AddGrandent);
        addEvent(oArticle.children[i],'mouseleave',DelGrandent);
    }

    function AddGrandent(ev) {
            var ev = ev || event;

            var oLeft = oArticle.offsetLeft;
            var oWidth = oArticle.offsetWidth;
            var BgLeft = document.createElement('span');
            var BgRight = document.createElement('span');

            if (this.className != 'article_f') {
                BgLeft.style.backgroundColor = this.className == 'article_s' ? '#4A4A4A':'#333347';
                BgRight.style.backgroundColor = this.className == 'article_s' ? '#4A4A4A':'#333347';
            };
            BgLeft.className = 'art_bg_color';
            BgLeft.style.left = ev.clientX - oLeft + 'px';
            BgRight.className = 'art_bg_color';
            BgRight.style.left = ev.clientX - oLeft + 'px';
            this.appendChild(BgLeft);
            this.appendChild(BgRight);

            var aBgColor = this.getElementsByTagName('span');

            move(aBgColor[0],{'width':ev.clientX - oLeft,'left':0},1000,'linear');
            move(aBgColor[1],{'width':oWidth+oLeft-ev.clientX},1000,'linear');
    }
    function DelGrandent(ev) {
        if (this.children.length === 4) {
            this.removeChild(this.children[2])
            this.removeChild(this.children[2])
        }
    }

    /*作品展示*/

    var oShowBox = document.getElementById('myshows');
    var aImgList = oShowBox.getElementsByTagName('li');
    var aImgShow = oShowBox.getElementsByTagName('img');
    var aImgBlur = oShowBox.getElementsByTagName('div');

    for (var i = 0; i < aImgShow.length; i++) {
        aImgBlur[i].style.backgroundImage = 'url('+arrImgDetail[i]+')';
        aImgShow[i].src = arrImgDetail[i];
    }
    /*
        盒子宽 - 图片总宽 = 剩下的宽
        剩下的宽 / 数量-1 = 外边距
        给每个图片设置这个外边距
        盒子的外边距再设置这个值的负
     */


    /*文章区域*/
    // 左边内容
    var recoList = document.getElementById('reco_list');
    jsonp('https://api.douban.com/v2/book/search',{
        q:'HTML5',
        start:0,
        count:10
    },function (data) {
        var html = template('text',data);
        recoList.innerHTML = html;
    },'callback')


    // 右边内容
    var timeLine = '';

    var num = 0;
    var oConList = document.getElementById('con_list');
    var nConH = 0;
    var timerPage = null;
    var onOffPg = true;
    // addCon();
    var oLoad = document.getElementById('spinner');
    window.onscroll = window.onresize= function(){

        var aConLump = oConList.getElementsByTagName('li');
        var oNextPage = document.getElementById('next_page');
        var nScroll = window.pageYOffset || document.documentElement.scrollTop;//滚动条
        var nHeight = document.documentElement.clientHeight;//可视区高度
        var nConT = getPos(aConLump[aConLump.length-1]).t || 0;//最底部的模块绝对高度

        oBackTop.style.display = nScroll > nHeight ? 'block' : 'none';

        nConH = aConLump.length ? aConLump[aConLump.length-1].offsetHeight : 0;
        if (nConT+nConH < nHeight+nScroll && onOffPg) {
            onOffPg = false;
            addCon();
        }

        if (aConLump.length && aConLump.length%21 === 0 && onOffPg) {
            oNextPage.style.display = 'block';
            oNextPage.style.opacity = '1';
            onOffPg = false;
            oNextPage.onmouseover = function () {
                this.style.transform = 'scale(0.85)';
            }
            oNextPage.onmouseout = function () {
                this.style.transform = 'scale(0.8)';
            }
            oNextPage.onclick = function () {
                this.style.transform = 'scale(0.8)';
                oNextPage.style.display = 'none';
                oLoad.style.display = 'block';
                move(oNextPage,{'opacity':'0'},300,'linear')
                addCon();
                return false;
            }
        }
    }

    function addCon() {//新闻数据渲染部分
        $.get('http://api.1-blog.com/biz/bizserver/news/list.do?max_behot_time='+timeLine+'&size=7',function(data){//根据时间戳调用7条数据
            var conData = data.detail;
            // console.log(conData)
            oLoad.style.display = 'block';//显示loading动画用的时间获取到数据

            timerPage = setTimeout(function () {//在获取数据操作1s后执行渲染
                oLoad.style.display = 'none';

                for (var i = 0; i < conData.length; i++) {
                    var json = conData[i];
                    for(var key in json){
                        switch(key){//也可以直接生成对应内容，不判断
                            case 'title':
                                var sTitle = json[key];
                            break;
                            case 'source':
                                var sTips = json[key];
                            break;
                            case 'article_url':
                                var sLink = json[key];
                            break;
                            case 'behot_time':
                                var sDate = json[key];
                                sDate = getTime(sDate)
                            break;
                            default:

                            break;
                        }
                    }

                    var aLi = document.createElement('li');//模块父级
                    aLi.className = 'con_lump';

                    var oH3 = document.createElement('h3');
                    oH3.innerHTML = '<a href="'+sLink+'" title="" class="tit_con" id="tit_con" target="_black">'+sTitle+'</a>';

                    var oB = document.createElement('b');
                    oB.innerHTML = sTips;

                    var oP = document.createElement('p');
                    oP.innerHTML = sTitle;

                    var oDiv = document.createElement('div');
                    oDiv.innerHTML = '<a href="'+sLink+'" title="" class="font-base font-read" target="_black">阅读全文</a>'
                    +'<span class="font-base font-time">'+sDate+'</span>';

                    aLi.appendChild(oH3)
                    aLi.appendChild(oB)
                    aLi.appendChild(oP)
                    aLi.appendChild(oDiv)
                    oConList.appendChild(aLi)
                    num++;
                }
                onOffPg = true;
            },1000)
            timeLine = conData[conData.length-1].behot_time;//改变获取新闻的时间戳
        })
    }


    var oBackTop = document.getElementById('back_top')
    oBackTop.onclick = function () {
        var scrollT = window.pageYOffset || document.documentElement.scrollTop;
        var n = oBackTop.offsetTop;
        clearInterval(timer);
        var timer = setInterval(function(){
            var speed = scrollT/8;
            speed = speed>0?Math.floor(speed):Math.ceil(speed);
            scrollT-=speed;
            document.body.scrollTop = scrollT;
            document.documentElement.scrollTop = scrollT;
            if(speed == 0){
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                clearInterval(timer);
                oBackTop.style.top = n+'px';
            }
            return false;
        },30);
    }

    function getPos(obj){
        var left = 0;
        var top1 = 0;
        var bL = 0,bT = 0;
        while(obj){
            bL = isNaN(bL)?0:bL;
            bT = isNaN(bT)?0:bT;
            left+=obj.offsetLeft+bL;
            top1+=obj.offsetTop+bT;
            obj = obj.offsetParent;
            if(obj){
                bL = parseInt(getStyle(obj,'borderLeftWidth'));
                bT = parseInt(getStyle(obj,'borderTopWidth'));
            }
        }
        return {
            l:left,
            t:top1
        };
    }


/*函数库*/
function getTime(time) {
    var Dates = new Date(time);
    var Year = Dates.getFullYear();
    var Mon = Dates.getMonth()+1;
    var Day = Dates.getDate();
    var Hour = Dates.getHours();
    var Min = Dates.getMinutes();
    var Sec = Dates.getSeconds();
    var time = cl (Year)+'年'+cl (Mon)+'月'+cl(Day)+'日'+cl(Hour)+':'+cl(Min)+':'+cl(Sec);
    return time;
    function cl (n) {//补零
        return n<10?'0'+n:''+n;
    }
}
function getStyle(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
function addEvent(obj,evEnt,evFn){
    if(obj.attachEvent){
        obj.attachEvent('on'+evEnt,evFn);
    }else{
        obj.addEventListener(evEnt,evFn,false);
    }
}
function stopDefault(e) {//阻止浏览器的默认行为
     if (e && e.preventDefault ){//阻止默认浏览器动作(W3C)
            e.preventDefault();
     }
    else{//IE中阻止函数器默认动作的方式
        window.event.returnValue = false;
    }
    return false;
}
function stopBubble(e) {
//如果提供了事件对象，则这是一个非IE浏览器
if ( e && e.stopPropagation )
    //因此它支持W3C的stopPropagation()方法
    e.stopPropagation();
else
    //否则，需要使用IE的方式来取消事件冒泡
    window.event.cancelBubble = true;
}

function addEvent(obj,evEnt,evFn,TorF){//函数事件
    if(obj.attachEvent){
        obj.attachEvent('on'+evEnt,evFn);
    }else{
        obj.addEventListener(evEnt,evFn,TorF);
    }
}
function getPos(obj){
    var iLeft = 0,iTop = 0,Bl=0,Bt=0;
    while(obj){
        iLeft+=obj.offsetLeft + Bl;
        iTop+=obj.offsetTop + Bt;
        obj = obj.offsetParent;
        if(obj){
            Bl = parseInt(getStyle(obj,'borderLeftWidth'));
            Bl = isNaN(Bl)?0:Bl;
            Bt = parseInt(getStyle(obj,'borderTopWidth'));
            Bt = isNaN(Bt)?0:Bt;
        }
    }
    return {
        l:iLeft,
        t:iTop
    }
}
function jsonp(url,data,succ,callback,fnName){
    fnName = fnName || ('_jsonp'+Math.random()).replace('.','');
    var oHead = document.getElementsByTagName('head')[0];
    window[fnName] = function(data){
        succ && succ(data);
        oHead.removeChild(oS);
    }
    data[callback] = fnName;
    var arr = [];
    for(var key in data){
        arr.push(key+'='+data[key]);
    }
    data = arr.join('&');
    var oS = document.createElement('script');
    oS.src = url+'?'+data;
    oHead.appendChild(oS);
}
/*函数库*/

}//大结局