import validate from "packages/utils/validate";

let error = function (msg, type) {
    type = type || 'log';
    window.console && console[type] && console[type]('jcSoft error hint: ' + msg);
    return msg;
};

let Index = function () {
    var that = this;
    that.config = {
        base: ''
        , version: true
        , modules: {}
        , timeout: 10
    };
    // 内置模块
    that.modules = {
        // 'w7PaymentAlipay': '{/}'+xm_global.ims_siteroot+'payment/alipay/ap'
        'jquery': '{/}https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery'
    };
};

/**
 * 全局设置
 *
 * @param options
 * @returns {Index}
 */
Index.prototype.set = function (options) {
    var that = this;
    // 引入
    options.vm && (that.vm = options.vm);
    // delete options.vm;
    that.extend(true, that.config, options);

    return that;
};

/**
 * 输出提示信息
 *
 * @param msg
 * @param type
 * @returns {{error}}
 */
Index.prototype.hint = function (msg, type = 'error') {
    return {
        error: error(msg, type)
    }
};

/**
 * 用于将一个或多个对象的内容合并到目标对象
 *
 * @description 用法同jQuery.extend()，不支持第一个参数为false
 * @param deep 可选。 Boolean类型 指示是否深度合并对象，默认为false。如果该值为true，且多个对象的某个同名属性也都是对象，则该"属性对象"的属性也将进行合并。
 * @param target Object类型 目标对象，其他对象的成员属性将被附加到该对象上。
 * @param object1 可选。 Object类型 第一个被合并的对象。
 * @param objectN 可选。 Object类型 第N个被合并的对象。
 * @returns {any}
 */
Index.prototype.extend = function () {
    var that = this
        ,
        src,
        copyIsArray,
        copy,
        name,
        options,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;

        // skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !validate.isFunction(target)) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {

        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {

            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (validate.isPlainObject(copy) ||
                    (copyIsArray = validate.isArray(copy)))) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && validate.isArray(src) ? src : [];

                    } else {
                        clone = src && validate.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = that.extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

/**
 * 循环，同$.each
 *
 * @param obj
 * @param fn
 * @returns {Index}
 */
Index.prototype.each = function (obj, fn) {
    var key
        ,
        that = this;
    if (typeof fn !== 'function') return that;
    obj = obj || [];
    if (obj.constructor === Object) {
        for (key in obj) {
            if (fn.call(obj[key], key, obj[key])) break;
        }
    } else {
        for (key = 0; key < obj.length; key++) {
            if (fn.call(obj[key], key, obj[key])) break;
        }
    }
    return that;
};

/**
 *
 * @param find
 * @param Object
 * @param argStrict 严格模式，默认关闭
 * @returns {boolean}
 */
Index.prototype.in_array = function (find, Object, argStrict = false) {
    const that = this;
    let result = false;
    that.each(Object, function (ind, item) {
        if (argStrict) {
            if (find === item) {
                result = true;
                return false;
            }
        } else {
            if (find == item) {
                result = true;
                return false;
            }
        }
    });
    return result;
}

/**
 * 加载外链js到全局
 *
 * @param apps 可以是config.module中定义的模块，也可以直接填写外链
 * @param callback 加载成功后调用，调用时不携带参数
 * @returns {Index}
 */
Index.prototype.loadjs = function (apps, callback) {
    var that = this,
        config = that.config,
        head = document.getElementsByTagName('head')[0];

    apps = typeof apps === 'string' ? [apps] : apps;

    var item = apps[0],
        timeout = 0;

    //加载完毕
    function onScriptLoad(e, url) {
        let readyRegExp = navigator.platform === 'PLaySTATION 3' ? /^complete$/ : /^(complete|loaded)$/
        if (e.type === 'load' || (readyRegExp.test((e.currentTarget || e.srcElement).readyState))) {
            config.modules[item] = url;
            head.removeChild(node);
            (function poll() {
                if (++timeout > config.timeout * 1000 / 4) {
                    return error(item + ' is not a valid module');
                }
                onCallback();
            }());
        }
    }

    //回调
    function onCallback() {
        apps.length > 1 ? that.loadjs(apps.slice(1), callback) : (typeof callback === 'function' && callback.apply(that));
    }

    //获取加载的js文件 URL
    //判断路径值是否为 {/} 开头，
    //如果路径值是 {/} 开头，则路径即为后面紧跟的字符。
    //否则，则按照 base 参数拼接模块路径
    var url = (/^\{\/\}/.test(item) ? '' : (/^\{\/\}/.test(that.modules[item]) ? '' : (config.base || ''))) + (that.modules[item] || item) + '.js';

    url = url.replace(/^\{\/\}/, '');
    //如果扩展模块（即：非内置模块）对象已经存在，则不必再加载
    if (!config.modules[item] && that[item]) {
        config.modules[item] = url; //并记录起该扩展模块的 url
    }

    //首次加载模块
    if (!config.modules[item]) {
        var node = document.createElement('script');

        node.async = true;
        node.charset = 'utf-8';
        node.src = url + function () {
            var version = config.version === true ? (config.v || (new Date()).getTime()) : (config.version || '');
            return version ? ('?v=' + version) : '';
        }();
        head.appendChild(node);

        if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString()
        .indexOf('[native code') < 0) && !isOpera) {
            node.attachEvent('onreadystatechange', function (e) {
                onScriptLoad(e, url);
            });
        } else {
            node.addEventListener('load', function (e) {
                onScriptLoad(e, url);
            }, false);
        }

        config.modules[item] = url;
    } else { //缓存
        (function poll() {
            if (++timeout > config.timeout * 1000 / 4) {
                return error(item + ' is not a valid module');
            }
            (typeof config.modules[item] === 'string') ? onCallback() : setTimeout(poll, 4);
        }());
    }

    return that;
};

//css外部加载器
Index.prototype.link = function (href, fn, cssname) {
    if (!href) return false;
    var that = this
        ,
        link = document.createElement('link')
        ,
        head = document.getElementsByTagName('head')[0];

    if (typeof fn === 'string') cssname = fn;

    var app = (cssname || href).replace(/\.|\//g, '')
        ,
        id = link.id = 'jiuchetcss-' + app
        ,
        timeout = 0;

    link.rel = 'stylesheet';
    link.href = href + '?v=' /** + (xm_global.nocache == 1 ? new Date().getTime() : xm_global.release)*/;
    link.media = 'all';

    if (!document.getElementById(id)) {
        head.appendChild(link);
    }

    if (typeof fn !== 'function') return that;

    //轮询css是否加载完毕
    (function poll() {
        if (++timeout > that.config.timeout * 1000 / 100) {
            return error(href + ' timeout');
        }
        parseInt(that.getStyle(document.getElementById(id), 'width')) === 1994 ? function () {
            fn();
        }() : setTimeout(poll, 100);
    }());

    return that;
};

//图片预加载
Index.prototype.img = function (url, callback, error) {
    var img = new Image();
    img.src = url;
    if (img.complete) {
        return callback(img);
    }
    img.onload = function () {
        img.onload = null;
        typeof callback === 'function' && callback(img);
    };
    img.onerror = function (e) {
        img.onerror = null;
        typeof error === 'function' && error(e);
    };
};

/**
 *
 * @param elem
 * @param scrollElem
 * @param lazyAttr
 * @param style
 */
Index.prototype.lazyimg = function ({elem = 'img', scrollElem = '', lazyAttr = 'jc-src', style = {}}) {
    let that = this;

    let index = 0,
        haveScroll = false;
    scrollElem = !that.validate.isEmpty(scrollElem) ? document.querySelector(`${scrollElem}`) : false;
    scrollElem = scrollElem || document.documentElement; // 滚动条所在元素
    let scrollElementStyle = style
        ,
        notDocument = scrollElem && scrollElem !== document.documentElement; //滚动条所在元素是否为document
    // , setScrollElementStyle = !!notDocument  // 一般传递了options.scrollElem的时候，需要为其设置样式maxHeight与overflowY, 除非本身已有该样式
    // , scrollElementHeight = null;

    // 设置自定义样式
    if (Object.keys(scrollElementStyle).length) {
        for (let k in scrollElementStyle) {
            scrollElem.style[k] = scrollElementStyle[k];
        }
    }

    // if (setScrollElementStyle) {
    // 判断是否已经设置了 maxHeight, overflowY; 如果没有设置则自动设置
    /*if (!(that.intval(scrollElem.style.maxHeight) > 0)) {
        scrollElem.style.maxHeight = (document.documentElement.clientHeight || window.innerHeight) + 'px';
    }*/
    // scrollElem.style.overflowY !== 'scroll' && (scrollElem.style.overflowY = 'scroll');
    // }

    //显示图片
    var show = function (item, height) {
            let start = scrollElem.scrollTop,
                end = start + height
                ,
                elemTop = notDocument ? function () {
                    return item.offsetTop - scrollElem.offsetTop + start;
                }() : item.offsetTop;// item.scrollTop /item.offsetTop

            /* 始终只加载在当前屏范围内的图片 */
            if (elemTop >= start && elemTop - start <= end) { // elemTop >= start && elemTop <= end
                if (!item.getAttribute('src') && item.getAttribute(`${lazyAttr}`)) { //!item.getAttribute('src')
                    const src = item.getAttribute(`${lazyAttr}`);
                    that.img(src, function () { // 执行函数, 创建图片对象并加载
                        const next = that.lazyimg.elem[index];
                        item.setAttribute('src', src);
                        item.removeAttribute(`${lazyAttr}`);

                        /* 当前图片加载就绪后，检测下一个图片是否在当前屏 */
                        render(next);
                        index++; // 当前图片加载完成之后, 将加载下一张，直到最后一张被加载完成为止
                    });
                }
            }
        }
        ,
        render = function (othis, scroll) { // othis => 当前对象/下一个, scroll: 绑定滚动事件的元素对象
            //计算滚动所在容器的可视高度
            let height = notDocument ? (scroll || scrollElem).offsetHeight > window.innerHeight ? (scroll || scrollElem).offsetHeight : window.innerHeight : window.innerHeight;
            let start = scrollElem.scrollTop,
                end = start + height;
            // scrollElementHeight = height;

            that.lazyimg.elem = scrollElem.querySelectorAll(`${elem}`);

            if (othis) {
                show(othis, height);
            } else {
                //计算未加载过的图片 index: 当前需要加载(渲染)的图片
                for (let i = index; i < that.lazyimg.elem.length; i++) {
                    let item = that.lazyimg.elem[i],
                        elemTop = notDocument ? function () {
                            return item.offsetTop - scrollElem.offsetTop + start;
                        }() : item.offsetTop;

                    show(item, height);

                    // 如果图片的top坐标，超出了当前屏，则终止后续图片的遍历(防止图片被一次性加载完)
                    if (elemTop > end) break;
                }
            }
        };

    render();

    if (!haveScroll) {
        let timer
            ,
            scrollEle = notDocument ? scrollElem : window;
        scrollEle.addEventListener("scroll", function (e) { // 绑定指定元素滚动事件
            let othis = this;
            if (timer) clearTimeout(timer)
            timer = setTimeout(function () {
                render(null, othis);
            }, 50);
        });
        haveScroll = true;
    }
    return render;
};

//本地持久性存储
Index.prototype.data = function (table, settings, storage) {
    table = table || 'jiuchet';
    storage = storage || localStorage;

    if (!window.JSON || !window.JSON.parse) return;

    //如果settings为null，则删除表
    if (settings === null) {
        return delete storage[table];
    }

    settings = typeof settings === 'object'
        ? settings
        : {key: settings};

    try {
        var data = JSON.parse(storage[table]);
    } catch (e) {
        var data = {};
    }

    if ('value' in settings) data[settings.key] = settings.value;
    if (settings.remove) delete data[settings.key];
    storage[table] = JSON.stringify(data);

    return settings.key ? data[settings.key] : data;
};

/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 *
 * return URL参数字符串

 * var obj={name:'tom','class':{className:'class1'},classMates:[{name:'lily'}]};
 * console.log(http_build_query(obj));
 * output: &name=tom&class.className=class1&classMates[0].name=lily
 * console.log(http_build_query(obj,'stu'));
 * output: &stu.name=tom&stu.class.className=class1&stu.classMates[0].name=lily
 */
Index.prototype.http_build_query = function (param, key, encode) {
    let that = this;
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param) + '&';
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += that.http_build_query(param[i], k, encode);
        }
    }
    return paramStr;
};

/**
 * 比较版本号大小
 *
 * @description compare('2.3.1', '2.5.7');输出false
 * @param curV
 * @param reqV
 * @returns {boolean}
 */
Index.prototype.compare = function (curV, reqV) {
    if (curV && reqV) {
        //将两个版本号拆成数字
        var arr1 = curV.split('.'),
            arr2 = reqV.split('.');
        var minLength = Math.min(arr1.length, arr2.length),
            position = 0,
            diff = 0;
        //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
        while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
            position++;
        }
        diff = (diff != 0) ? diff : (arr1.length - arr2.length);
        //若curV大于reqV，则返回true
        return diff > 0;
    } else {
        //输入为空
        console.error("版本号不能为空");
        return false;
    }
};

/**
 * 人民币数值转大写
 *
 * @param str
 * @param isInt
 * @param isFloat
 * @param replace
 * @returns {string|void|*}
 */
Index.prototype.numberToChinese = function (str, isInt = true, isFloat = false, replace = '') {
    let that = this;
    str = str + '';
    let len = str.length - 1,
        chineseArray = isInt ? ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'] : ['分', '角'],
        numArray = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];

    if (!str) return '';
    if (str.length > 15) return '输入位数有误';
    if (str.split('.').length > 2) return '输入的值有误';
    if (replace) str = str.replace(/\,/ig, '');
    if (/[^0-9\.]+/gi.test(str)) return that.hint('只能输入数值');
    if (str.split('.').length === 2) {
        isInt = false;
        isFloat = true;
        str = '' + this.$baseLodash.round(str, 2);
        let intNumber = str.split('.')[0],
            decimalNumber = str.split('.')[1],
            hasPoint = true;
        hasPoint = str.lastIndexOf('.') === -1 ? false : true;
        return that.numberToChinese(intNumber, true, hasPoint)
            + (hasPoint ? that.numberToChinese(decimalNumber, isInt, isFloat) : '')
    }
    return str.replace(/([1-9]|0+)/g, function ($, $1, idx, full) {
        var pos = 0;
        if ($1[0] != '0') {
            pos = len - idx;
            if (idx == 0 && $1[0] == 1 && chineseArray[len - idx] == '十') {
                return chineseArray[len - idx];
            }
            return numArray[$1[0]] + chineseArray[len - idx];
        } else {
            let left = len - idx
                ,
                right = len - idx + $1.length;
            if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
                pos = left - left % 4;
            }
            if (pos) {
                return chineseArray[pos] + numArray[$1[0]];
            } else if (idx + $1.length >= len) {
                return '';
            } else {
                return numArray[$1[0]]
            }
        }
    }) + (isFloat ? isInt ? '元' : '' : '元整');
}


//----- 时间戳相关处理 -----/
Index.prototype.time = function () {
    return Math.floor(new Date().getTime() / 1000)
}//10位时间戳
Index.prototype.date = function (format, timestamp) {
    var that = this;
    var jsdate,
        f;
    var txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var formatChr = /\\?(.?)/gi;
    var formatChrCb = function (t, s) {
        return f[t] ? f[t]() : s
    };
    var _pad = function (n, c) {
        n = String(n);
        while (n.length < c) {
            n = "0" + n
        }
        return n
    };
    f = {
        d: function () {
            return _pad(f.j(), 2)
        }, D: function () {
            return f.l().slice(0, 3)
        }, j: function () {
            return jsdate.getDate()
        }, l: function () {
            return txt_words[f.w()] + "day"
        }, N: function () {
            return f.w() || 7
        }, S: function () {
            var j = f.j();
            var i = j % 10;
            if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
                i = 0
            }
            return ["st", "nd", "rd"][i - 1] || "th"
        }, w: function () {
            return jsdate.getDay()
        }, z: function () {
            var a = new Date(f.Y(), f.n() - 1, f.j());
            var b = new Date(f.Y(), 0, 1);
            return Math.round((a - b) / 86400000)
        }, W: function () {
            var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
            var b = new Date(a.getFullYear(), 0, 4);
            return _pad(1 + Math.round((a - b) / 86400000 / 7), 2)
        }, F: function () {
            return txt_words[6 + f.n()]
        }, m: function () {
            return _pad(f.n(), 2)
        }, M: function () {
            return f.F().slice(0, 3)
        }, n: function () {
            return jsdate.getMonth() + 1
        }, t: function () {
            return (new Date(f.Y(), f.n(), 0)).getDate()
        }, L: function () {
            var j = f.Y();
            return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0
        }, o: function () {
            var n = f.n();
            var W = f.W();
            var Y = f.Y();
            return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0)
        }, Y: function () {
            return jsdate.getFullYear()
        }, y: function () {
            return f.Y().toString().slice(-2)
        }, a: function () {
            return jsdate.getHours() > 11 ? "pm" : "am"
        }, A: function () {
            return f.a().toUpperCase()
        }, B: function () {
            var H = jsdate.getUTCHours() * 3600;
            var i = jsdate.getUTCMinutes() * 60;
            var s = jsdate.getUTCSeconds();
            return _pad(Math.floor((H + i + s + 3600) / 86.4) % 1000, 3)
        }, g: function () {
            return f.G() % 12 || 12
        }, G: function () {
            return jsdate.getHours()
        }, h: function () {
            return _pad(f.g(), 2)
        }, H: function () {
            return _pad(f.G(), 2)
        }, i: function () {
            return _pad(jsdate.getMinutes(), 2)
        }, s: function () {
            return _pad(jsdate.getSeconds(), 2)
        }, u: function () {
            return _pad(jsdate.getMilliseconds() * 1000, 6)
        }, e: function () {
            throw"Not supported (see source code of date() for timezone on how to add support)"
        }, I: function () {
            var a = new Date(f.Y(), 0);
            var c = Date.UTC(f.Y(), 0);
            var b = new Date(f.Y(), 6);
            var d = Date.UTC(f.Y(), 6);
            return ((a - c) !== (b - d)) ? 1 : 0
        }, O: function () {
            var tzo = jsdate.getTimezoneOffset();
            var a = Math.abs(tzo);
            return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4)
        }, P: function () {
            var O = f.O();
            return (O.substr(0, 3) + ":" + O.substr(3, 2))
        }, T: function () {
            return "UTC"
        }, Z: function () {
            return -jsdate.getTimezoneOffset() * 60
        }, c: function () {
            return "Y-m-d\\TH:i:sP".replace(formatChr, formatChrCb)
        }, r: function () {
            return "D, d M Y H:i:s O".replace(formatChr, formatChrCb)
        }, U: function () {
            return jsdate / 1000 | 0
        }
    };
    this.date = function (format, timestamp) {
        that = this;
        jsdate = (timestamp === undefined ? new Date() : (timestamp instanceof Date) ? new Date(timestamp) : new Date(timestamp * 1000));
        return format.replace(formatChr, formatChrCb)
    };
    return this.date(format, timestamp)
}
Index.prototype.microtime = function (get_as_float) {
    if (typeof performance !== "undefined" && performance.now) {
        var now = (performance.now() + performance.timing.navigationStart) / 1000;
        if (get_as_float) {
            return now
        }
        var s = now | 0;
        return (Math.round((now - s) * 1000000) / 1000000) + " " + s
    } else {
        var now = (Date.now ? Date.now() : new Date().getTime()) / 1000;
        if (get_as_float) {
            return now
        }
        var s = now | 0;
        return (Math.round((now - s) * 1000) / 1000) + " " + s
    }
}
Index.prototype.strtotime = function (text, now) {
    var parsed,
        match,
        today,
        year,
        date,
        days,
        ranges,
        len,
        times,
        regex,
        i,
        fail = false;
    if (!text) {
        return fail
    }
    text = text.replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ").replace(/[\t\r\n]/g, "").toLowerCase();
    match = text.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);
    if (match && match[2] === match[4]) {
        if (match[1] > 1901) {
            switch (match[2]) {
                case"-":
                    if (match[3] > 12 || match[5] > 31) {
                        return fail
                    }
                    return new Date(match[1], parseInt(match[3], 10) - 1, match[5], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                case".":
                    return fail;
                case"/":
                    if (match[3] > 12 || match[5] > 31) {
                        return fail
                    }
                    return new Date(match[1], parseInt(match[3], 10) - 1, match[5], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000
            }
        } else {
            if (match[5] > 1901) {
                switch (match[2]) {
                    case"-":
                        if (match[3] > 12 || match[1] > 31) {
                            return fail
                        }
                        return new Date(match[5], parseInt(match[3], 10) - 1, match[1], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    case".":
                        if (match[3] > 12 || match[1] > 31) {
                            return fail
                        }
                        return new Date(match[5], parseInt(match[3], 10) - 1, match[1], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    case"/":
                        if (match[1] > 12 || match[3] > 31) {
                            return fail
                        }
                        return new Date(match[5], parseInt(match[1], 10) - 1, match[3], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000
                }
            } else {
                switch (match[2]) {
                    case"-":
                        if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
                            return fail
                        }
                        year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
                        return new Date(year, parseInt(match[3], 10) - 1, match[5], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    case".":
                        if (match[5] >= 70) {
                            if (match[3] > 12 || match[1] > 31) {
                                return fail
                            }
                            return new Date(match[5], parseInt(match[3], 10) - 1, match[1], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000
                        }
                        if (match[5] < 60 && !match[6]) {
                            if (match[1] > 23 || match[3] > 59) {
                                return fail
                            }
                            today = new Date();
                            return new Date(today.getFullYear(), today.getMonth(), today.getDate(), match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000
                        }
                        return fail;
                    case"/":
                        if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
                            return fail
                        }
                        year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
                        return new Date(year, parseInt(match[1], 10) - 1, match[3], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    case":":
                        if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
                            return fail
                        }
                        today = new Date();
                        return new Date(today.getFullYear(), today.getMonth(), today.getDate(), match[1] || 0, match[3] || 0, match[5] || 0) / 1000
                }
            }
        }
    }
    if (text === "now") {
        return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0
    }
    if (!isNaN(parsed = Date.parse(text))) {
        return parsed / 1000 | 0
    }
    date = now ? new Date(now * 1000) : new Date();
    days = {"sun": 0, "mon": 1, "tue": 2, "wed": 3, "thu": 4, "fri": 5, "sat": 6};
    ranges = {"yea": "FullYear", "mon": "Month", "day": "Date", "hou": "Hours", "min": "Minutes", "sec": "Seconds"};

    function lastNext(type, range, modifier) {
        var diff,
            day = days[range];
        if (typeof day !== "undefined") {
            diff = day - date.getDay();
            if (diff === 0) {
                diff = 7 * modifier
            } else {
                if (diff > 0 && type === "last") {
                    diff -= 7
                } else {
                    if (diff < 0 && type === "next") {
                        diff += 7
                    }
                }
            }
            date.setDate(date.getDate() + diff)
        }
    }

    function process(val) {
        var splt = val.split(" "),
            type = splt[0],
            range = splt[1].substring(0, 3),
            typeIsNumber = /\d+/.test(type),
            ago = splt[2] === "ago",
            num = (type === "last" ? -1 : 1) * (ago ? -1 : 1);
        if (typeIsNumber) {
            num *= parseInt(type, 10)
        }
        if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
            return date["set" + ranges[range]](date["get" + ranges[range]]() + num)
        }
        if (range === "wee") {
            return date.setDate(date.getDate() + (num * 7))
        }
        if (type === "next" || type === "last") {
            lastNext(type, range, num)
        } else {
            if (!typeIsNumber) {
                return false
            }
        }
        return true
    }

    times = "(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec" + "|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?" + "|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)";
    regex = "([+-]?\\d+\\s" + times + "|" + "(last|next)\\s" + times + ")(\\sago)?";
    match = text.match(new RegExp(regex, "gi"));
    if (!match) {
        return fail
    }
    for (i = 0, len = match.length; i < len; i++) {
        if (!process(match[i])) {
            return fail
        }
    }
    return (date.getTime() / 1000)
}

//----- html编码函数和解码函数,转换成实体和还原实体,同名php函数 -----/
Index.prototype.htmlspecialchars_decode = function (e, E) {
    var T = 0,
        _ = 0,
        r = !1;
    "undefined" == typeof E && (E = 2), e = e.toString().replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    var t = {
        ENT_NOQUOTES: 0,
        ENT_HTML_QUOTE_SINGLE: 1,
        ENT_HTML_QUOTE_DOUBLE: 2,
        ENT_COMPAT: 2,
        ENT_QUOTES: 3,
        ENT_IGNORE: 4
    };
    if (0 === E && (r = !0), "number" != typeof E) {
        for (E = [].concat(E), _ = 0; _ < E.length; _++) 0 === t[E[_]] ? r = !0 : t[E[_]] && (T |= t[E[_]]);
        E = T
    }
    return E & t.ENT_HTML_QUOTE_SINGLE && (e = e.replace(/&#0*39;/g, "'")), r || (e = e.replace(/&quot;/g, '"')), e = e.replace(/&amp;/g, "&")
}
Index.prototype.htmlspecialchars = function (e, E, T, _) {
    var r = 0,
        t = 0,
        a = !1;
    ("undefined" == typeof E || null === E) && (E = 2), e = e.toString(), _ !== !1 && (e = e.replace(/&/g, "&amp;")), e = e.replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
    var N = {
        ENT_NOQUOTES: 0,
        ENT_HTML_QUOTE_SINGLE: 1,
        ENT_HTML_QUOTE_DOUBLE: 2,
        ENT_COMPAT: 2,
        ENT_QUOTES: 3,
        ENT_IGNORE: 4
    };
    if (0 === E && (a = !0), "number" != typeof E) {
        for (E = [].concat(E), t = 0; t < E.length; t++) 0 === N[E[t]] ? a = !0 : N[E[t]] && (r |= N[E[t]]);
        E = r
    }
    return E & N.ENT_HTML_QUOTE_SINGLE && (e = e.replace(/'/g, "&#039;")), a || (e = e.replace(/"/g, "&quot;")), e
}
Index.prototype.htmlencode = function (sStr) {
    return php.htmlspecialchars(sStr);
}
Index.prototype.htmldecode = function (sStr) {
    return php.htmlspecialchars_decode(sStr)
}

/**
 * 浏览器判断和网络判断
 *
 * @type {{wifi: boolean, language: string, version: {opera: boolean, weixin: boolean, firefox: boolean, android: boolean, mobile: boolean, ipad: boolean, ie: boolean, ios: boolean, iphone: boolean, webKit: boolean}}}
 */
Index.prototype.browser = {
    version: function () {
        var u = navigator.userAgent.toLowerCase(),
            app = navigator.appVersion;
        return {
            ie: u.indexOf("trident") > -1,
            opera: u.indexOf("tresto") > -1,
            webKit: u.indexOf("applewebkit") > -1,
            firefox: u.indexOf("gecko") > -1 && u.indexOf("khtml") == -1,
            mobile: !!u.match(/applewebkit.*mobile.*/),
            ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/),
            android: u.indexOf("android") > -1 || u.indexOf("linux") > -1,
            iphone: u.indexOf("iphone") > -1,
            ipad: u.indexOf("ipad") > -1,
            weixin: u.match(/micromessenger/i) == "micromessenger"
        }
    }(), language: (navigator.browserLanguage || navigator.language).toLowerCase(), wifi: !function (t) {
        var e = !0,
            n = t.navigator.userAgent,
            i = t.navigator.connection;
        if (/MicroMessenger/.test(n)) if (/NetType/.test(n)) {
            var o = n.match(/NetType\/(\S)+/)[0].replace("NetType/", "");
            o && "WIFI" != o && (e = !1)
        } else document.addEventListener("WeixinJSBridgeReady", function () {
            WeixinJSBridge.invoke("getNetworkType", {}, function (t) {
                "network_type:wifi" != t.err_msg && (e = !1)
            })
        }); else if (i) {
            var a = i.type;
            "wifi" != a && "2" != a && "unknown" != a && (e = !1)
        }
        t.wifi = e
    }(window)
}

/**
 * 获取屏幕类型，根据当前屏幕大小，返回 0 - 3 的值
 * 0: 低于768px的屏幕
 * 1：768px到992px之间的屏幕
 * 2：992px到1200px之间的屏幕
 * 3：高于1200px的屏幕
 *
 * @returns {number}
 */
Index.prototype.screen = function () {
    var width = document.body.clientWidth;
    if (width > 1200) {
        return 3; //大屏幕
    } else if (width > 992) {
        return 2; //中屏幕
    } else if (width > 768) {
        return 1; //小屏幕
    } else {
        return 0; //超小屏幕
    }
}


Index.prototype.intval = function (mixed_var, base) {
    var tmp;
    var type = typeof mixed_var;
    if (type === "boolean") {
        return +mixed_var
    } else {
        if (type === "string") {
            tmp = parseInt(mixed_var, base || 10);
            return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp
        } else {
            if (type === "number" && isFinite(mixed_var)) {
                return mixed_var | 0
            } else {
                return 0
            }
        }
    }
}
Index.prototype.function_exists = function (func_name) {
    if (typeof func_name === "string") {
        func_name = this.window[func_name]
    }
    return typeof func_name === "function"
}

Index.prototype.range = function (low, high, step) {
    var matrix = [];
    var inival,
        endval,
        plus;
    var walker = step || 1;
    var chars = false;
    if (!isNaN(low) && !isNaN(high)) {
        inival = low;
        endval = high
    } else {
        if (isNaN(low) && isNaN(high)) {
            chars = true;
            inival = low.charCodeAt(0);
            endval = high.charCodeAt(0)
        } else {
            inival = (isNaN(low) ? 0 : low);
            endval = (isNaN(high) ? 0 : high)
        }
    }
    plus = ((inival > endval) ? false : true);
    if (plus) {
        while (inival <= endval) {
            matrix.push(((chars) ? String.fromCharCode(inival) : inival));
            inival += walker
        }
    } else {
        while (inival >= endval) {
            matrix.push(((chars) ? String.fromCharCode(inival) : inival));
            inival -= walker
        }
    }
    return matrix
}
Index.prototype.strip_tags = function (input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, "").replace(tags, function ($0, $1) {
        return allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : ""
    })
}
Index.prototype.rand = function (min, max) {
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647
    } else {
        if (argc === 1) {
            throw new Error("Warning: rand() expects exactly 2 parameters, 1 given")
        }
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
}
Index.prototype.round = function (value, precision, mode) {
    var m,
        f,
        isHalf,
        sgn;
    precision |= 0;
    m = Math.pow(10, precision);
    value *= m;
    sgn = (value > 0) | -(value < 0);
    isHalf = value % 1 === 0.5 * sgn;
    f = Math.floor(value);
    if (isHalf) {
        switch (mode) {
            case"PHP_ROUND_HALF_DOWN":
                value = f + (sgn < 0);
                break;
            case"PHP_ROUND_HALF_EVEN":
                value = f + (f % 2 * sgn);
                break;
            case"PHP_ROUND_HALF_ODD":
                value = f + !(f % 2);
                break;
            default:
                value = f + (sgn > 0)
        }
    }
    return (isHalf ? value : Math.round(value)) / m
}
Index.prototype.strtolower = function (str) {
    return (str + "").toLowerCase()
}
Index.prototype.strtoupper = function (str) {
    return (str + "").toUpperCase()
}
Index.prototype.floatval = function (mixed_var) {
    return (parseFloat(mixed_var) || 0)
}
Index.prototype.ucfirst = function (str) {
    str += "";
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1)
}
Index.prototype.base_convert = function (number, frombase, tobase) {
    return parseInt(number + "", frombase | 0).toString(tobase | 0)
}
Index.prototype.floor = function (value) {
    return Math.floor(value)
}
Index.prototype.ceil = function (value) {
    return Math.ceil(value)
}

Index.prototype.utf8_encode = function (argString) {
    if (argString === null || typeof argString === "undefined") {
        return ""
    }
    var string = (argString + "");
    var utftext = "",
        start,
        end,
        stringl = 0;
    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;
        if (c1 < 128) {
            end++
        } else {
            if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128)
            } else {
                if ((c1 & 63488) != 55296) {
                    enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128)
                } else {
                    if ((c1 & 64512) != 55296) {
                        throw new RangeError("Unmatched trail surrogate at " + n)
                    }
                    var c2 = string.charCodeAt(++n);
                    if ((c2 & 64512) != 56320) {
                        throw new RangeError("Unmatched lead surrogate at " + (n - 1))
                    }
                    c1 = ((c1 & 1023) << 10) + (c2 & 1023) + 65536;
                    enc = String.fromCharCode((c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128)
                }
            }
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end)
            }
            utftext += enc;
            start = end = n + 1
        }
    }
    if (end > start) {
        utftext += string.slice(start, stringl)
    }
    return utftext
}
Index.prototype.utf8_decode = function (str_data) {
    var tmp_arr = [],
        i = 0,
        c1 = 0,
        seqlen = 0;
    str_data += "";
    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i) & 255;
        seqlen = 0;
        if (c1 <= 191) {
            c1 = (c1 & 127);
            seqlen = 1
        } else {
            if (c1 <= 223) {
                c1 = (c1 & 31);
                seqlen = 2
            } else {
                if (c1 <= 239) {
                    c1 = (c1 & 15);
                    seqlen = 3
                } else {
                    c1 = (c1 & 7);
                    seqlen = 4
                }
            }
        }
        for (var ai = 1; ai < seqlen; ++ai) {
            c1 = ((c1 << 6) | (str_data.charCodeAt(ai + i) & 63))
        }
        if (seqlen == 4) {
            c1 -= 65536;
            tmp_arr.push(String.fromCharCode(55296 | ((c1 >> 10) & 1023)), String.fromCharCode(56320 | (c1 & 1023)))
        } else {
            tmp_arr.push(String.fromCharCode(c1))
        }
        i += seqlen
    }
    return tmp_arr.join("")
}
/*URL编码解码*/
Index.prototype.urlencode = function (str) {
    str = (str + "").toString();
    return encodeURIComponent(str)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A")
    .replace(/%20/g, "+")
}
Index.prototype.urldecode = function (str) {
    return decodeURIComponent((str + "").replace(/%(?![\da-f]{2})/gi, function () {
        return "%25"
    }).replace(/\+/g, "%20"))
}

/*base64*/
Index.prototype.base64Encode = function (data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1,
        o2,
        o3,
        h1,
        h2,
        h3,
        h4,
        bits,
        i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];
    if (!data) {
        return data
    }
    data = unescape(encodeURIComponent(data));
    do {
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 63;
        h2 = bits >> 12 & 63;
        h3 = bits >> 6 & 63;
        h4 = bits & 63;
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
    } while (i < data.length);
    enc = tmp_arr.join("");
    var r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3)
}
Index.prototype.base64Decode = function (data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1,
        o2,
        o3,
        h1,
        h2,
        h3,
        h4,
        bits,
        i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];
    if (!data) {
        return data
    }
    data += "";
    do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 255;
        o2 = bits >> 8 & 255;
        o3 = bits & 255;
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1)
        } else {
            if (h4 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1, o2)
            } else {
                tmp_arr[ac++] = String.fromCharCode(o1, o2, o3)
            }
        }
    } while (i < data.length);
    dec = tmp_arr.join("");
    return decodeURIComponent(escape(dec.replace(/\0+$/, "")))
}

/**
 * 执行一个正则表达式的搜索和替换
 *
 * @param pattern 要搜索的模式，可以是字符串或一个字符串数组
 * @param replacement 用于替换的字符串或字符串数组
 * @param subject 要搜索替换的目标字符串或字符串数组
 * @param limit 可选，对于每个模式用于每个 subject 字符串的最大可替换次数。 默认是-1（无限制)
 * @returns {*}
 */
Index.prototype.preg_replace = function (pattern, replacement, subject, limit) {
    if (typeof limit === 'undefined') limit = -1;
    if (subject.match(eval(pattern))) {
        if (limit == -1) {
            return subject.replace(eval(pattern + 'g'), replacement);
        } else {
            for (let x = 0; x < limit; x++) {
                subject = subject.replace(eval(pattern), replacement);
            }
            return subject;
        }
    } else {
        return subject;
    }
}

/**
 * 裁剪字符串到指定长度，并支持后缀
 *
 * @param str
 * @param iMaxBytes 字符串最大长度
 * @param sSuffix 后缀
 * @returns {string|*}
 */
Index.prototype.strCut = function (str, iMaxBytes, sSuffix) {
    let that = this;
    if (isNaN(iMaxBytes)) {
        return str
    }
    if (that.strLength(str) <= iMaxBytes) {
        return str
    }
    var i = 0,
        bytes = 0;
    for (; i < str.length && bytes < iMaxBytes; ++i, ++bytes) {
        if (str.charCodeAt(i) > 255) {
            ++bytes
        }
    }
    sSuffix = sSuffix || "";
    return (bytes - iMaxBytes == 1 ? str.substr(0, i - 1) : str.substr(0, i)) + sSuffix
}
/**
 * 返回字符串的长度
 *
 * @param str
 * @returns {number}
 */
Index.prototype.strLength = function (str) {
    let bytes = 0;
    for (let i = 0; i < str.length; ++i, ++bytes) {
        if (str.charCodeAt(i) > 255) {
            ++bytes
        }
    }
    return bytes
}
/**
 * 返回由数组元素组合成的字符串
 *
 * @param separator 可选。规定数组元素之间放置的内容。默认是 ""（空字符串）
 * @param array 必需。要组合为字符串的数组
 * @returns {*}
 */
Index.prototype.implode = function (separator, array) {
    return array.join(separator);
}
/**
 * 把字符串打散为数组
 *
 * @param separator 必需。规定在哪里分割字符串
 * @param str 必需。要分割的字符串
 * @param limit 可选。规定所返回的数组元素的数目
 * @returns {*}
 */
Index.prototype.explode = function (separator, str, limit) {
    if (typeof limit == 'undefined') {
        return str.split(separator);
    }
    return str.split(separator, limit);
}

/**
 * 设置coockie
 *
 * @param name 必需。规定 cookie 的名称
 * @param value 必需。规定 cookie 的值
 * @param expire 可选。规定 cookie 的有效期
 * @returns {string|null}
 */
Index.prototype.setcookie = function (name, value, expire) {
    if (value === undefined) {
        var f = "; " + document.cookie;
        var d = f.split("; " + name + "=");
        if (d.length === 2) {
            return d.pop().split(";").shift()
        }
        return null
    } else {
        if (value === false) {
            expire = -1
        }
        var a = "";
        if (expire) {
            var b = new Date();
            b.setTime(b.getTime() + (expire * 24 * 60 * 60 * 1000));
            a = "; expires=" + b.toGMTString()
        }
        document.cookie = name + "=" + value + a + "; path=/"
    }
}

/**
 * 判断第二个日期是否为大于等于第一个日期
 *
 * @param strDate1
 * @param strDate2
 * @returns {boolean}
 */
Index.prototype.dateCompare = function (strDate1, strDate2) {
    let date1 = new Date(strDate1.replace(/\-/g, "\/"))
        ,
        date2 = new Date(strDate2.replace(/\-/g, "\/"));
    return (date1 - date2) >= 0;
}

/**
 * 美化时间
 *
 * @param time
 * @returns {string}
 */
Index.prototype.prettyTime = function (time) {
    var today = new Date();
    var d = new Date(time);
    var m = today.getTime() - d.getTime();
    if (m <= 0) {
        m = 1000
    }
    if (m < 60 * 1000) {
        return Math.floor(m / 1000) + "秒前"
    } else {
        if (m < 60 * 60 * 1000) {
            return Math.floor(m / (1000 * 60)) + "分钟前"
        } else {
            if (m < 60 * 60 * 1000 * 24) {
                return Math.floor(m / (1000 * 60 * 60)) + "小时前"
            } else {
                if (m < 60 * 60 * 1000 * 24 * 7) {
                    return Math.floor(m / (1000 * 60 * 60 * 24)) + "天前"
                } else {
                    if (m < 60 * 60 * 1000 * 24 * 7 * 56) {
                        return Math.floor(m / (1000 * 60 * 60 * 24 * 7)) + "周前"
                    } else {
                        return Math.floor(m / (1000 * 60 * 60 * 24 * 7 * 52)) + "年前"
                    }
                }
            }
        }
    }
}

/**
 * md5 加密
 *
 * @description 32 字符十六进制数
 * @param string
 * @returns {string}
 */
Index.prototype.md5 = function (string) {
    var D;
    var w = function (b, a) {
        return (b << a) | (b >>> (32 - a))
    };
    var H = function (k, b) {
        var V,
            a,
            d,
            x,
            c;
        d = (k & 2147483648);
        x = (b & 2147483648);
        V = (k & 1073741824);
        a = (b & 1073741824);
        c = (k & 1073741823) + (b & 1073741823);
        if (V & a) {
            return (c ^ 2147483648 ^ d ^ x)
        }
        if (V | a) {
            if (c & 1073741824) {
                return (c ^ 3221225472 ^ d ^ x)
            } else {
                return (c ^ 1073741824 ^ d ^ x)
            }
        } else {
            return (c ^ d ^ x)
        }
    };
    var r = function (a, c, b) {
        return (a & c) | ((~a) & b)
    };
    var q = function (a, c, b) {
        return (a & b) | (c & (~b))
    };
    var p = function (a, c, b) {
        return (a ^ c ^ b)
    };
    var n = function (a, c, b) {
        return (c ^ (a | (~b)))
    };
    var u = function (W, V, aa, Z, k, X, Y) {
        W = H(W, H(H(r(V, aa, Z), k), Y));
        return H(w(W, X), V)
    };
    var f = function (W, V, aa, Z, k, X, Y) {
        W = H(W, H(H(q(V, aa, Z), k), Y));
        return H(w(W, X), V)
    };
    var F = function (W, V, aa, Z, k, X, Y) {
        W = H(W, H(H(p(V, aa, Z), k), Y));
        return H(w(W, X), V)
    };
    var t = function (W, V, aa, Z, k, X, Y) {
        W = H(W, H(H(n(V, aa, Z), k), Y));
        return H(w(W, X), V)
    };
    var e = function (V) {
        var W;
        var d = V.length;
        var c = d + 8;
        var b = (c - (c % 64)) / 64;
        var x = (b + 1) * 16;
        var X = new Array(x - 1);
        var a = 0;
        var k = 0;
        while (k < d) {
            W = (k - (k % 4)) / 4;
            a = (k % 4) * 8;
            X[W] = (X[W] | (V.charCodeAt(k) << a));
            k++
        }
        W = (k - (k % 4)) / 4;
        a = (k % 4) * 8;
        X[W] = X[W] | (128 << a);
        X[x - 2] = d << 3;
        X[x - 1] = d >>> 29;
        return X
    };
    var s = function (d) {
        var a = "",
            b = "",
            k,
            c;
        for (c = 0; c <= 3; c++) {
            k = (d >>> (c * 8)) & 255;
            b = "0" + k.toString(16);
            a = a + b.substr(b.length - 2, 2)
        }
        return a
    };
    var E = [],
        L,
        h,
        G,
        v,
        g,
        U,
        T,
        S,
        R,
        O = 7,
        M = 12,
        J = 17,
        I = 22,
        B = 5,
        A = 9,
        z = 14,
        y = 20,
        o = 4,
        m = 11,
        l = 16,
        j = 23,
        Q = 6,
        P = 10,
        N = 15,
        K = 21;
    string = this.utf8_encode(string);
    E = e(string);
    U = 1732584193;
    T = 4023233417;
    S = 2562383102;
    R = 271733878;
    D = E.length;
    for (L = 0; L < D; L += 16) {
        h = U;
        G = T;
        v = S;
        g = R;
        U = u(U, T, S, R, E[L + 0], O, 3614090360);
        R = u(R, U, T, S, E[L + 1], M, 3905402710);
        S = u(S, R, U, T, E[L + 2], J, 606105819);
        T = u(T, S, R, U, E[L + 3], I, 3250441966);
        U = u(U, T, S, R, E[L + 4], O, 4118548399);
        R = u(R, U, T, S, E[L + 5], M, 1200080426);
        S = u(S, R, U, T, E[L + 6], J, 2821735955);
        T = u(T, S, R, U, E[L + 7], I, 4249261313);
        U = u(U, T, S, R, E[L + 8], O, 1770035416);
        R = u(R, U, T, S, E[L + 9], M, 2336552879);
        S = u(S, R, U, T, E[L + 10], J, 4294925233);
        T = u(T, S, R, U, E[L + 11], I, 2304563134);
        U = u(U, T, S, R, E[L + 12], O, 1804603682);
        R = u(R, U, T, S, E[L + 13], M, 4254626195);
        S = u(S, R, U, T, E[L + 14], J, 2792965006);
        T = u(T, S, R, U, E[L + 15], I, 1236535329);
        U = f(U, T, S, R, E[L + 1], B, 4129170786);
        R = f(R, U, T, S, E[L + 6], A, 3225465664);
        S = f(S, R, U, T, E[L + 11], z, 643717713);
        T = f(T, S, R, U, E[L + 0], y, 3921069994);
        U = f(U, T, S, R, E[L + 5], B, 3593408605);
        R = f(R, U, T, S, E[L + 10], A, 38016083);
        S = f(S, R, U, T, E[L + 15], z, 3634488961);
        T = f(T, S, R, U, E[L + 4], y, 3889429448);
        U = f(U, T, S, R, E[L + 9], B, 568446438);
        R = f(R, U, T, S, E[L + 14], A, 3275163606);
        S = f(S, R, U, T, E[L + 3], z, 4107603335);
        T = f(T, S, R, U, E[L + 8], y, 1163531501);
        U = f(U, T, S, R, E[L + 13], B, 2850285829);
        R = f(R, U, T, S, E[L + 2], A, 4243563512);
        S = f(S, R, U, T, E[L + 7], z, 1735328473);
        T = f(T, S, R, U, E[L + 12], y, 2368359562);
        U = F(U, T, S, R, E[L + 5], o, 4294588738);
        R = F(R, U, T, S, E[L + 8], m, 2272392833);
        S = F(S, R, U, T, E[L + 11], l, 1839030562);
        T = F(T, S, R, U, E[L + 14], j, 4259657740);
        U = F(U, T, S, R, E[L + 1], o, 2763975236);
        R = F(R, U, T, S, E[L + 4], m, 1272893353);
        S = F(S, R, U, T, E[L + 7], l, 4139469664);
        T = F(T, S, R, U, E[L + 10], j, 3200236656);
        U = F(U, T, S, R, E[L + 13], o, 681279174);
        R = F(R, U, T, S, E[L + 0], m, 3936430074);
        S = F(S, R, U, T, E[L + 3], l, 3572445317);
        T = F(T, S, R, U, E[L + 6], j, 76029189);
        U = F(U, T, S, R, E[L + 9], o, 3654602809);
        R = F(R, U, T, S, E[L + 12], m, 3873151461);
        S = F(S, R, U, T, E[L + 15], l, 530742520);
        T = F(T, S, R, U, E[L + 2], j, 3299628645);
        U = t(U, T, S, R, E[L + 0], Q, 4096336452);
        R = t(R, U, T, S, E[L + 7], P, 1126891415);
        S = t(S, R, U, T, E[L + 14], N, 2878612391);
        T = t(T, S, R, U, E[L + 5], K, 4237533241);
        U = t(U, T, S, R, E[L + 12], Q, 1700485571);
        R = t(R, U, T, S, E[L + 3], P, 2399980690);
        S = t(S, R, U, T, E[L + 10], N, 4293915773);
        T = t(T, S, R, U, E[L + 1], K, 2240044497);
        U = t(U, T, S, R, E[L + 8], Q, 1873313359);
        R = t(R, U, T, S, E[L + 15], P, 4264355552);
        S = t(S, R, U, T, E[L + 6], N, 2734768916);
        T = t(T, S, R, U, E[L + 13], K, 1309151649);
        U = t(U, T, S, R, E[L + 4], Q, 4149444226);
        R = t(R, U, T, S, E[L + 11], P, 3174756917);
        S = t(S, R, U, T, E[L + 2], N, 718787259);
        T = t(T, S, R, U, E[L + 9], K, 3951481745);
        U = H(U, h);
        T = H(T, G);
        S = H(S, v);
        R = H(R, g)
    }
    var i = s(U) + s(T) + s(S) + s(R);
    return i.toLowerCase()
}


let main = new Index();

// 将当前方法传递给validate
validate.set({util: main})
Index.prototype.validate = validate;

export default main;
