/*
 * @Author: ilihuaxi@gmail.com 
 * @Date: 2018-04-09 19:31:12 
 * @Last Modified by: ilihuaxi@gmail.com
 * @Last Modified time: 2018-04-09 19:32:14
 */
// window.onload = function () {
    var oStyle = document.createElement('style');
    oStyle.innerHTML = '.just_modal_footer{position:relative;line-height:48px;font-size:18px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.just_modal_footer a{display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;color:#808080;text-decoration:none;-webkit-tap-highlight-color:transparent;position:relative}.just_modal_footer a:active{background-color:#EEE}.just_modal_footer a:last-child{color:#09BB07}.just_modal_footer a:last-child::after{content:" ";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #D5D5D6;color:#D5D5D6;-webkit-transform-origin:0;-ms-transform-origin:0;transform-origin:0;-webkit-transform:scaleX(0.5);-ms-transform:scaleX(0.5);transform:scaleX(0.5)}.just_modal_footer:after{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #D5D5D6;color:#D5D5D6;-webkit-transform-origin:0;-ms-transform-origin:0;transform-origin:0;-webkit-transform:scaleY(0.5);-ms-transform:scaleY(0.5);transform:scaleY(0.5)}';
    oStyle.innerHTML += '.just_loading{position:relative;display:block;box-sizing:border-box;padding:30px;width:100px;height:100px;margin:50px auto;background-color:rgba(0,0,0,0.5);border-radius:7px}.just_loading_line{position:absolute;top:50%;left:50%;margin-top:-2px;margin-left:-30px;width:60px;height:4px;background:#FFF;-webkit-animation:spin 1.5s infinite ease;animation:spin 1.5s infinite ease}.just_loading_line:nth-of-type(2){-webkit-animation-delay:0.1s;animation-delay:0.1s}.just_loading_line:nth-of-type(3){-webkit-animation-delay:0.2s;animation-delay:0.2s}.just_loading_line:nth-of-type(4){-webkit-animation-delay:0.3s;animation-delay:0.3s}@-webkit-keyframes spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}';
    document.getElementsByTagName('head')[0].appendChild(oStyle);

    var JUSTMODAL = function (option) {
        this.option = option || {};
        this.dom = document.getElementsByTagName('body')[0];
        this._mask = '';
    }
    JUSTMODAL.prototype.styles = function () {
        return {
            'mask': '-webkit-transition:opacity 0.3s;transition:opacity 0.3s;position:fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,0.3)',
            'wrapper': 'display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;text-align:center;font-size:15px;',
            'toast': 'opacity:0;-webkit-transition:0.3s;transition:0.3s;background-color:rgba(0,0,0,0.7);line-height:1.2;min-width:100px;max-width:70vw;word-wrap:break-word;word-break:break-all;padding:7px 15px;border-radius:5px;color:#fff;',
            'confirm': 'width:80%;max-width:300px;background-color:#FFFFFF;text-align:center;border-radius:3px;overflow:hidden',
            'modal_title': 'padding:1.3em 1.6em 0.5em;font-size:18px',
            'modal_content': 'padding:0 1.6em 0.8em;min-height:40px;font-size:15px;line-height:1.3;word-wrap:break-word;word-break:break-all;color:#808080',
        }
    }()
    JUSTMODAL.prototype.wrapShow = function (content) {//遮罩的底层，所有框调用都基于底层展示
        var
            mask = document.createElement('aside'),
            wrapper = document.createElement('div');

        mask.setAttribute('style', this.styles.mask);
        wrapper.setAttribute('style', this.styles.wrapper);
        wrapper.appendChild(content);//填充内容
        mask.appendChild(wrapper)
        this.dom.appendChild(mask);
        this._mask = mask;
    }
    JUSTMODAL.prototype.wrapHide = function (content, mask) {//遮罩移除
        var
            time = this.option.time || 2000, self = this;
        
        setTimeout(function () {
            self._mask.remove()
        }, time);
    }
    JUSTMODAL.prototype.$toast = function (text) {
        var toast = document.createElement('div');
        toast.setAttribute('style', this.styles.toast);
        toast.innerHTML = text;
        this.wrapShow(toast);
        this._mask.style.background = '';
        setTimeout(function () {
            toast.style.opacity = '1'
        }, 0);
        setTimeout(function () {
            toast.style.opacity = '0'
        }, this.option.time - 300);
        this.wrapHide(toast);
    }
    JUSTMODAL.prototype.$confirm = function (str) {
        var self = this;
        var
            title = self.option.title || '提示',
            text = self.option.text || '内容',
            isCancel = self.option.isCancel || false,
            sureText = self.option.sureText || '确定',
            cancelText = self.option.cancelText || '取消';

        (typeof str === 'string' || typeof str === 'number') && (text = str);

        var
            confirm = document.createElement('div'),
            menus = document.createElement('div'),
            sure = document.createElement('a');

        confirm.setAttribute('style', self.styles.confirm);
        menus.className = 'just_modal_footer';

        if (isCancel) {
            var cancel = document.createElement('a');
            cancel.innerHTML = cancelText;
            menus.appendChild(cancel)
            cancel.addEventListener('click', function () {
                self.option.fnCancel && self.option.fnCancel();
                self._mask.remove()
            })
        }

        sure.innerHTML = sureText;
        menus.appendChild(sure);
        sure.addEventListener('click', function () {
            self.option.fnSure && self.option.fnSure();
            self._mask.remove();
        })

        confirm.innerHTML = '<div style="' + this.styles.modal_title + '">' + title + '</div><div style="' + this.styles.modal_content + '">' + text + '</div>'
        confirm.appendChild(menus);
        this.wrapShow(confirm);
    }
    JUSTMODAL.prototype.$loadingShow = function (text) {
        var loading = document.createElement('div');
        loading.className = 'just_loading';
        loading.innerHTML = '<div class="just_loading_line"></div><div class="just_loading_line"></div><div class="just_loading_line"></div><div class="just_loading_line"></div>';
        this.wrapShow(loading);
    }
    JUSTMODAL.prototype.$loadingHide = function (text) {
        this._mask.remove();
    }

    var Just = {};
    Just.toast = function (text) {
        if (typeof text === 'string' || typeof text === 'number') {
            new JUSTMODAL().$toast(text)
        } else {
            new JUSTMODAL({
                time: text.time
            }).$toast(text.text)
        }
    }
    Just.confirm = function (config) {
        var config = config || {};
        if (typeof text === 'string' || typeof text === 'number') {
            new JUSTMODAL().$confirm(config)
        } else {
            new JUSTMODAL({
                title: config.title,
                text: config.text,
                isCancel: config.isCancel,
                sureText: config.sureText,
                cancelText: config.cancelText,
                fnCancel: config.fnCancel,
                fnSure: config.fnSure,
            }).$confirm(config)
        }
    }
    Just.loading = function () {
        var loading = new JUSTMODAL();
        return {
            show: function () {
                loading.$loadingShow();
            },
            hide: function () {
                loading.$loadingHide();
            }
        }
    }()
// }