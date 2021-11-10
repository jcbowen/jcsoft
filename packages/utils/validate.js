/**
 * 验证方法
 */

let getProto = Object.getPrototypeOf
    ,
    class2type = {}
    ,
    toString = class2type.toString
    ,
    hasOwn = class2type.hasOwnProperty
    ,
    fnToString = hasOwn.toString
    ,
    ObjectFunctionString = fnToString.call(Object);

let Validate = function () {
    let that = this;
    that.config = {}
}

/**
 * 基础参数配置
 *
 * @param util
 */
Validate.prototype.set = function ({util}) {
    let that = this;
    that.util = util;
}

/**
 * 判断是否设置了某个变量
 *
 * @description 变量必须是已经赋值了的
 * @returns {boolean}
 */
Validate.prototype.isset = function () {
    var a = arguments,
        l = a.length,
        i = 0,
        undef;
    if (l === 0) {
        throw new Error("Empty isset")
    }
    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false
        }
        i++
    }
    return true
}

/**
 * 判读是否为外链
 *
 * @param path
 * @returns {boolean}
 */
Validate.prototype.isExternal = function (path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isPassword = function (str) {
    return str.length >= 8 && str.length <= 16 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}/.test(str)
}

/**
 * 判断是否为数字
 *
 * @param value
 * @returns {boolean}
 */
Validate.prototype.isNumber = function (value) {
    const reg = /^[0-9]*$/
    return reg.test(value)
}

/**
 * 判断是否为整数
 *
 * @param n
 * @param iMin
 * @param iMax
 * @returns {boolean}
 */
Validate.prototype.isInt = function (n, iMin, iMax) {
    if (!isFinite(n)) {
        return false
    }
    if (!/^[+-]?\d+$/.test(n)) {
        return false
    }
    if (iMin != undefined && parseInt(n) < parseInt(iMin)) {
        return false
    }
    if (iMax != undefined && parseInt(n) > parseInt(iMax)) {
        return false
    }
    return true
}

/**
 * 判断是否为某个范围的有限数值
 *
 * @param value
 * @param fMin
 * @param fMax
 * @returns {boolean}
 */
Validate.prototype.isFinite = function (value, fMin, fMax) {
    if (!isFinite(value)) {
        return false
    }
    if (fMin != undefined && parseFloat(value) < parseFloat(fMin)) {
        return false
    }
    if (fMax != undefined && parseFloat(value) > parseFloat(fMax)) {
        return false
    }
    return true
}

/**
 * 判断是否是名称
 *
 * @param value
 * @returns {boolean}
 */
Validate.prototype.isName = function (value) {
    const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
    return reg.test(value)
}

/**
 * 判断是否为IP
 *
 * @param ip
 * @returns {boolean}
 */
Validate.prototype.isIP = function (ip) {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg.test(ip)
}

/**
 * 判断是否是传统网站
 *
 * @param url
 * @returns {boolean}
 */
Validate.prototype.isUrl = function (url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|shop|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
}

/**
 * 判断是否是小写字母
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isLowerCase = function (str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/**
 * 判断是否是大写字母
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isUpperCase = function (str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/**
 * 判断是否是大写字母开头
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isAlphabets = function (str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/**
 * 判断是否是字符串
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isString = function (str) {
    return typeof str === 'string' || str instanceof String
}

/**
 * 判断是否是数组
 *
 * @param arg
 * @returns {arg is any[]|boolean}
 */
Validate.prototype.isArray = function (arg) {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
}

/**
 * 判断是否为普通对象
 *
 * @param obj
 * @returns {boolean}
 */
Validate.prototype.isPlainObject = function (obj) {
    var proto,
        Ctor;

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

/**
 * 判断是否为json
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isJson = function (str) {
    let that = this;
    let util = that.util;
    if (typeof str === "string") {
        try {
            const obj = JSON.parse(str);
            return !!(obj && typeof obj === "object");
        } catch (e) {
            typeof util.hint === 'function' && util.hint("$isJSON error：" + e);
            return false;
        }
    } else {
        return false;
    }
};

/**
 * 判断是否是端口号
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isPort = function (str) {
    const reg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    return reg.test(str)
}

/**
 * 判断是否是手机号
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isPhone = function (str) {
    const reg = /^1\d{10}$/
    return reg.test(str)
}

/**
 * 判断是否是QQ号
 *
 * @param num
 * @returns {boolean}
 */
Validate.prototype.isQQ = function (num) {
    var reg = /^[1-9]{1}\d{4,11}$/;
    return reg.test(num)
}

/**
 * 判断是否是二代身份证号
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isIdCard = function (str) {
    const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    return reg.test(str)
}

/**
 * 判断是否是邮箱
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isEmail = function (str) {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return reg.test(str)
}

/**
 * 判断是否中文
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isChinese = function (str) {
    const reg = /^[\u4E00-\u9FA5]{2,4}$/
    return reg.test(str)
}

/**
 * 判断是否为英文
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isEnglish = function (str) {
    var reg = /^[A-Za-z]+$/;
    return reg.test(str);
}

/**
 * 判断是否为空
 *
 * @param mixed_var
 * @returns {boolean}
 */
Validate.prototype.isEmpty = function (mixed_var) {
    var undef,
        key,
        i,
        len;
    var emptyValues = [undef, null, false, 0, "", "0"];
    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixed_var === emptyValues[i]) return true
    }
    if (typeof mixed_var === "object") {
        for (key in mixed_var) return false
        return true
    }
    return false
}

/**
 * 判断是否为固话
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isTel = function (str) {
    const reg = /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/
    return reg.test(str)
}

/**
 * 判断是否为数字且最多两位小数
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.isNum = function (str) {
    const reg = /^\d+(\.\d{1,2})?$/
    return reg.test(str)
}

/**
 * 判断是否为函数
 *
 * @param obj
 * @returns {boolean}
 */
Validate.prototype.isFunction = function (obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

/**
 * 判断是否为邮政编码
 *
 * @param str
 * @returns {boolean}
 */
Validate.prototype.is_zipcode = function (str) {
    var reg = /^(\d){6}$/;
    return reg.test(str)
}

/**
 * 判断字符串中是否包含字符
 *
 * @param string
 * @param find
 * @returns {boolean}
 */
Validate.prototype.strExists = function (string = '', find = '') {
    return !(string.indexOf(find) === -1);
}

Validate.prototype.isReg = function (num) {
    var reg = /^([a-zA-z_]{1})([\w]*)$/g;
    return reg.test(num)
}

let validate = new Validate();

export default validate;
