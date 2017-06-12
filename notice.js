/**
 * Notice.js v0.0.1
 *
 * A clean and simple message plugin, with no dependencies.
 *
 * https://github.com/xiangming/notice.js
 *
 * Copyright © 2016 by Arvin Xiang.
 */

var notice = function(){

    var _COUNT = 0,
        currentType,
        _TYPE = {
            success: 'success',
            warning: 'warning',
            error: 'error',
            info: 'info'
        }
    ;

    function Notice(options) {
        var elem = createElement(options);
        elem.id = 'hjnotice-' + (_COUNT++);
        this.elem = elem;
    }

    Notice.prototype.show = function() {
        if (document.getElementById(this.elem.id)) return;

        // create notice container
        var container = document.querySelector('.hjnotice-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'hjnotice-container';
            document.body.appendChild(container);
        }
        container.appendChild(this.elem);
    };

    Notice.prototype.clear = function() {
        dismiss(this.elem);
    };

    // create notice item
    function createElement(options) {
        // div.notice-item
        //   span.notice-close
        //   div.notice-content
        var item = document.createElement('div');
        item.className = 'hjnotice-item';
        if (options.type) {
            item.className += ' ' + options.type;
        }

        var content;
        content = document.createElement('div');
        content.className = 'hjnotice-content';
        content.innerHTML = options.message;

        var close = document.createElement('span');
        close.className = 'hjnotice-close';
        close.innerHTML = '×';

        item.appendChild(close);
        item.appendChild(content);

        close.addEventListener('click', function(e) {
            dismiss(item);
        });

        // listen to DOMNodeRemoved and trigger callback
        options.callback && item.addEventListener('DOMNodeRemoved', function(){
            options.callback();
        });

        return item;
    }

    function dismiss(elem) {
        elem.className += ' hjnotice-dismiss';
        setTimeout(function() {
            if (elem && elem.parentNode) {
                elem.parentNode.removeChild(elem);
            }
        }, 1000);
    }

    function notify(...args) {
        var options = {}, callback;

        if ( !args[0] || (typeof args[0] !== 'object') ) return;
        // notice.success({message: 'a message', duration: 2000})
        // notice.success({message: 'a message', duration: 2000}, function(){...})
        options = args[0];
        callback = typeof args[1] === 'function' ? args[1] : null;

        options.callback = callback;
        options.type = currentType;
        // Clean up the variable in case it is being reused
        currentType = undefined;

        var time = options.duration;
        var item = new Notice(options);
        item.show();

        // only auto hide when duration is set
        if (time) {
            setTimeout(function() {
                item.clear();
            }, time);
        }
    }

    function success() {
        currentType = _TYPE.success;
        return notify.apply(this, arguments);
    }

    function warning() {
        currentType = _TYPE.warning;
        return notify.apply(this, arguments);
    }

    function error() {
        currentType = _TYPE.error;
        return notify.apply(this, arguments);
    }

    function info() {
        currentType = _TYPE.info;
        return notify.apply(this, arguments);
    }

    return {
        success : success,
        warning : warning,
        error   : error,
        info    : info
    }
}();