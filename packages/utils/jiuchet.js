/**
 * 自用工具包
 *
 * author: Bowen
 * E-mail: bowen@jiuchet.com
 */

import axios from "axios";
import qs from 'qs';

// 全局允许跨域携带cookie信息
axios.defaults.withCredentials = true

var getProto = Object.getPrototypeOf
    , class2type = {}
    , toString = class2type.toString
    , hasOwn = class2type.hasOwnProperty
    , fnToString = hasOwn.toString
    , ObjectFunctionString = fnToString.call(Object)

    , error = function (msg, type) {
    type = type || 'log';
    window.console && console[type] && console[type]('jcSoft error hint: ' + msg);
    return msg;
};

let Util = function () {
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
    };
};

// util 全局设置
Util.prototype.set = function (options) {
    var that = this;
    // 引入
    options.vm && (that.vm = options.vm);
    // delete options.vm;
    util.extend(true, that.config, options);

    return that;
};

//提示
Util.prototype.hint = function (msg, type = 'error') {
    return {
        error: error(msg, type)
    }
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
Util.prototype.http_build_query = function (param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param) + '&';
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += util.http_build_query(param[i], k, encode);
        }
    }
    return paramStr;
};

Util.prototype.require = function (params = {}) {
    var that = this
        , success = params.success
        , error = params.error
        , fail = params.fail
        , progress = params.progress

    delete params.error;
    delete params.success;
    delete params.fail;
    delete params.progress;

    params = that.extend(true, {
        url: ''
        , data: {}
        , header: {'X-Requested-With': 'XMLHttpRequest'} //{'X-Requested-With': 'XMLHttpRequest'}
        , method: 'get'
        , timeout: 60000
        , dataType: 'JSON'
        , is_fg: false
        , transformData: true
        , isUploadProgress: false // 允许为上传处理进度事件
        , isDownloadProgress: false // 允许为下载处理进度事件
        // , paramsSerializer: function (data) { // 序列化数据
        //     return qs.stringify(data)
        // }
        , transformRequest: [function (data) {  // 序列化数据
            return qs.stringify(data);
        }]
    }, params);

    // axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded';
    // axios.defaults.headers.get['Content-type'] = 'application/application/json';
    // axios.defaults.headers.post['Content-type'] = 'multipart/form-data';

    // 是否为外来接口
    const is_fg = params.is_fg;
    delete params.is_fg;

    // 兼容$ajax的写法
    if (params.type) params.method = params.type.toLowerCase();
    if (params.transformData === false) {
        delete params.transformRequest;
        delete params.transformData;
    }

    let options = that.extend(true, {
        headers: params.header,
        responseType: params.dataType
    }, params);

    if (params.method === 'get') {
        options.params = options.data;
        delete options.data;
        delete params.transformRequest;
        delete options.transformRequest;
    } else {
        delete options.params;
        // options.data = {jsonGPC: that.base64_encode(JSON.stringify(options.data))};
    }

    options.responseType = options.responseType.toLowerCase();
    delete options.url;
    delete options.dataType;
    delete options.header;

    axios.interceptors.request.use((configs) => { // 添加请求拦截器(如有多个先添加的后执行)
        typeof progress === 'function' && progress(50);
        if (configs.isUploadProgress) {
            configs.onUploadProgress = (progressEvent) => {
                if (progressEvent.lengthComputable) {
                    typeof configs.getProcess === 'function' && configs.getProcess(progressEvent);
                }
            }
        }
        if (configs.isDownloadProgress) {
            configs.onDownloadProgress = (progressEvent) => {

            }
        }
        return configs;
    }, (error) => Promise.reject(error));

    axios.interceptors.response.use((response) => { // 添加响应拦截器(如有多个先添加的先执行)
        typeof progress === 'function' && progress(75);
        return response;
    }, (error) => {
        if (error.status === 413) {
            util.vm.$baseMessage('传输文件过大，请重试', 'error');
        }
        return Promise.reject(error)
    });

    typeof progress === 'function' && progress(25);

    return axios(params.url, options).then((d) => {
        let res = d.data;
        if (!res) console.error('不规范的数据结构');
        // 只有当类型是json的时候才做状态判断
        if (options.responseType === 'JSON' || options.responseType === 'json') {
            if (res.errcode == 0) {
                typeof params.done === 'function' && params.done(res);
            }

            //登录状态失效，清除本地 access_token，并强制跳转到登入页
            else if (res.errcode == '1001') {
                const errmsg = res.errmsg || res.msg || res.message;
                that.vm.$baseConfirm(errmsg, '登录失效', () => {
                    typeof fail === 'function' && fail(res);
                    that.vm.$store.dispatch('user/logout')
                    that.vm.$router.push('/user/login')
                }, () => {
                }, {
                    showClose: false,
                    showCancelButton: false,
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    type: 'error'
                });
            } else if ((String(res.errcode)) === '1002') {
                const errmsg = res.errmsg || res.msg || res.message;
                const data = res.data;
                that.vm.$baseConfirm(errmsg, '页面刷新提示', () => {
                    window.location.reload();

                    util.data(proTableName, {
                        key: 'curProject',
                        value: {
                            title: data.project.title,
                            info: data.project,
                            uniacid: data.project.uniacid
                        }
                    });
                }, () => {
                }, { // 确认弹窗配置
                    showClose: false,
                    showCancelButton: false,
                    closeOnClickModal: false,
                    closeOnPressEscape: false
                })
            }

            //其它异常
            else { // 异常提示
                let errmsg = res.errmsg
                    , errcode = res.errcode;

                if (typeof errmsg === 'object') {
                    errmsg = errmsg.message;
                    errcode = errmsg.errno
                }

                if (errcode == 0) {
                    typeof params.done === 'function' && params.done(res);
                } else if (typeof errmsg === 'string') {
                    // 外来接口不弹窗错误信息
                    if (!is_fg) {
                        console.log(998, res);
                        that.vm.$baseConfirm(errmsg, '信息提示', () => {
                            typeof fail === 'function' && fail(res);
                            if (res.re_hash) {
                                // window.location.hash = res.re_hash;
                                that.vm.$router.push(res.re_hash)
                            } else if (res.re_href) {
                                window.location.href = res.re_href;
                            }
                        }, () => {
                        }, {
                            showClose: false,
                            showCancelButton: false,
                            closeOnClickModal: false,
                            closeOnPressEscape: false,
                            type: 'error'
                        });
                    } else {
                        typeof fail === 'function' && fail(res);
                    }
                }

            }
        } else {
            typeof params.done === 'function' && params.done(res);
        }
        //只要 http 状态码正常，无论 response 的 code 是否正常都执行 success
        typeof success === 'function' && success(res);
        typeof progress === 'function' && progress(100);
    }).catch((result) => {
        typeof error === 'function' && error(result);
    });
};

/*
* 比较版本号大小
* compare('2.3.1', '2.5.7');输出false
* */
Util.prototype.compare = function (curV, reqV) {
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

Util.prototype.base64_encode = function (data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];
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
};

Util.prototype.base64_decode = function (data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
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
};

Util.prototype.isFunction = function (obj) {

    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

Util.prototype.isArray = function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
};

Util.prototype.isPlainObject = function (obj) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    // 使用 toString 而不是jQuery.type来捕获宿主对象，这是因为type也是调用了toString方法，参见jQuery.type()
    //jQuery.type = toType; //line 10291 toType方法前面已经介绍过
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }

    //获取对象的原型
    proto = getProto(obj);

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    // 如果一个对象是通过Object.create( null )来创建的话，那么它的原型为空，相比于用{}来创建的对象，它的开销也就更小。
    // 所以如果我们需要一个 json对象仅用来存储参数，可以使用这个方法
    if (!proto) {
        return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    // 如果一个对象是是由全局的Object函数来创建的，那么它是纯粹对象
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};

Util.prototype.extend = function () {
    var that = this
        , src, copyIsArray, copy, name, options, clone,
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
    if (typeof target !== "object" && !that.isFunction(target)) {
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
                if (deep && copy && (that.isPlainObject(copy) ||
                    (copyIsArray = that.isArray(copy)))) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && that.isArray(src) ? src : [];

                    } else {
                        clone = src && that.isPlainObject(src) ? src : {};
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

Util.prototype.each = function (obj, fn) {
    var key
        , that = this;
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

Util.prototype.loadjs = function (apps, callback) {
    var that = this
        , config = that.config
        , head = document.getElementsByTagName('head')[0];

    apps = typeof apps === 'string' ? [apps] : apps;

    var item = apps[0]
        , timeout = 0;

    //加载完毕
    function onScriptLoad(e, url) {
        var readyRegExp = navigator.platform === 'PLaySTATION 3' ? /^complete$/ : /^(complete|loaded)$/
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
        apps.length > 1 ? that.loadjs(apps.slice(1), callback) : (typeof callback === 'function' && callback.apply(util));
    }

    //获取加载的js文件 URL
    //判断路径值是否为 {/} 开头，
    //如果路径值是 {/} 开头，则路径即为后面紧跟的字符。
    //否则，则按照 base 参数拼接模块路径
    var url = (/^\{\/\}/.test(item) ? '' : (/^\{\/\}/.test(that.modules[item]) ? '' : (config.base || ''))) + (that.modules[item] || item) + '.js';

    url = url.replace(/^\{\/\}/, '');
    //如果扩展模块（即：非内置模块）对象已经存在，则不必再加载
    if (!config.modules[item] && util[item]) {
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

        if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) && !isOpera) {
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
Util.prototype.link = function (href, fn, cssname) {
    var that = this
        , link = document.createElement('link')
        , head = document.getElementsByTagName('head')[0];

    if (typeof fn === 'string') cssname = fn;

    var app = (cssname || href).replace(/\.|\//g, '')
        , id = link.id = 'jiuchetcss-' + app
        , timeout = 0;

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
Util.prototype.img = function (url, callback, error) {
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

Util.prototype.lazyimg = function (options) {
    var that = this, index = 0, haveScroll = false
        , options = options || {}
        , scrollElem = document.querySelector(`${options.scrollElem}`) || document.documentElement || document.body // 滚动条所在元素
        , elem = options.elem || 'img' // 需要懒加载的元素,
        , lazyAttr = options.lazyAttr || 'jc-src'  // 未加载图片时对应的图片链接属性, 默认：jc-src
        , scrollElementStyle = options.style || {} // 自定义新增到滚动元素的样式
        , notDocument = options.scrollElem && options.scrollElem !== document //滚动条所在元素是否为document
        , setScrollElementStyle = notDocument ? true : false  // 一般传递了options.scrollElem的时候，需要为其设置样式maxHeight与overflowY, 除非本身已有该样式
        , scrollElementHeight = null;

    that.lazyimg.elem = lazyAttr === 'jc-src' ? scrollElem.querySelectorAll(`${elem}`) : scrollElem.querySelectorAll(`${elem}[${lazyAttr}]`);
    // console.log(561, that.lazyimg.elem, scrollElem, elem, lazyAttr);
    if (setScrollElementStyle) {
        if (Object.keys(scrollElementStyle).length) { // 设置自定义样式
            for (let k in scrollElementStyle) {
                scrollElem.style[k] = scrollElementStyle[k];
            }
        }
        // 判断是否已经设置了 maxHeight, overflowY; 如果没有设置则自动设置
        if (!(parseInt(util.getCss(scrollElem, 'maxHeight')) > 0)) {
            scrollElem.style.maxHeight = (document.documentElement.clientHeight || window.innerHeight) + 'px';
        }
        if (util.getCss(scrollElem, 'overflowY') !== 'scroll') {
            scrollElem.style.overflowY = 'scroll';
        }
    }


    //显示图片
    var show = function (item, height) {
        let start = scrollElem.scrollTop, end = start + height
            , elemTop = notDocument ? function () {
            return item.offsetTop - scrollElem.offsetTop + start;
        }() : item.offsetTop;// item.scrollTop /item.offsetTop

        /* 始终只加载在当前屏范围内的图片 */
        if (elemTop >= start && elemTop - start <= end) { // elemTop >= start && elemTop <= end
            if (!item.getAttribute('src') && item.getAttribute(`${lazyAttr}`)) { //!item.getAttribute('src')
                const src = item.getAttribute(`${lazyAttr}`);
                util.img(src, function () { // 执行函数, 创建图片对象并加载
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
        , render = function (othis, scroll) { // othis => 当前对象/下一个, scroll: 绑定滚动事件的元素对象
        //计算滚动所在容器的可视高度
        let height = notDocument ? (scroll || scrollElem).offsetHeight > window.innerHeight ? (scroll || scrollElem).offsetHeight : window.innerHeight : window.innerHeight;
        let start = scrollElem.scrollTop, end = start + height;
        scrollElementHeight = height;
        if (othis) {
            show(othis, height);
        } else {
            //计算未加载过的图片 index: 当前需要加载(渲染)的图片
            for (let i = index; i < that.lazyimg.elem.length; i++) {
                let item = that.lazyimg.elem[i], elemTop = notDocument ? function () {
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
            , scrollEle = notDocument ? scrollElem : window;

        scrollEle.addEventListener("scroll", function (e) { // 绑定指定元素滚动事件
            var othis = this;
            if (timer) clearTimeout(timer)
            timer = setTimeout(function () {
                render(null, othis);
            }, 50);
        });
        haveScroll = true;
    }
    // return render;
};

//本地持久性存储
Util.prototype.data = function (table, settings, storage) {
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

// 数值小写转中文大写
Util.prototype.numberToChinese = function (str, isInt = true, isFloat = false, replace = '') {
    str = str + '';
    let len = str.length - 1
        ,
        chineseArray = isInt ? ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'] : ['分', '角']
        , numArray = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];

    if (!str) return '';
    if (str.length > 15) return '输入位数有误';
    if (str.split('.').length > 2) return '输入的值有误';
    if (replace) str = str.replace(/\,/ig, '');
    if (/[^0-9\.]+/gi.test(str)) return console.log('只能输入数值');
    if (str.split('.').length === 2) {
        isInt = false;
        isFloat = true;
        str = '' + this.$baseLodash.round(str, 2);
        let intNumber = str.split('.')[0], decimalNumber = str.split('.')[1], hasPoint = true;
        hasPoint = str.lastIndexOf('.') === -1 ? false : true;
        return util.numberToChinese(intNumber, true, hasPoint)
            + (hasPoint ? util.numberToChinese(decimalNumber, isInt, isFloat) : '')
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
                , right = len - idx + $1.length;
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

let util = new Util();

export default util;
