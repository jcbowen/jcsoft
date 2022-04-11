# jcsoft

<p>
  适用于vue2.0版本的自用组件库
</p>

[![Latest Stable Version](https://img.shields.io/npm/v/jcsoft.svg?sanitize=true)](https://www.npmjs.com/package/jcsoft)
[![Total Downloads](https://img.shields.io/npm/dt/jcsoft.svg?sanitize=true)](https://www.npmjs.com/package/jcsoft)

## Project setup

```
npm i jcsoft
```

基础用法
----------------
引入后会自动注册jcsoft中的组件，并将公共方法放到this.$jcUtils中

```
{
  // 公共方法
  $jcUtils: {
    // AES加解密
    aes: {
        encrypt: function (str, key, iv) {},
        decrypt: function (str, key, iv) {},
    },
    base: {
        extend: function () {}, // 用于将一个或多个对象的内容合并到目标对象，用法同jQuery.extend
        each: function (collection, predicate) {}, // 类似forEach，但不区分数组和对象
        translateDataToTree: function (data) {}, // 根据数据中的parent_id，将数据转换成树形结构
        translateTreeToData: function (tree) {}, // 根据数据中的children，树形结构转回数据
        loadJs: function (url) {}, // 外部js 加载器
        link: function (url) {href, callBack, cssName}, // 外部css 加载器
        img: function (src) {}, // 图片预先加载
        lazyimg: function ({elem = 'img',scrollElem = '',lazyAttr = 'jc-src',style = {},}) {}, // 通过操作DOM实现图片懒加载，用于富文本编辑器输出内容的
        data: function (table, settings) {}, // 持久性储存
        sessionData: function (table, settings) {}, // 会话性储存
        http_build_query: function (param, key, encode) {}, // 将对象转换为URL参数字符串
        compare: function (curV, reqV) {}, // 比较版本号大小
        numberToChinese: function (str,isInt = true,isFloat = false,replace = false) {}, // 人民币数值转中文大写
        time: function () {}, // 秒级时间戳，同php中的time()
        microtime: function (get_as_float) {}, // 毫秒级时间戳
        date: function (format, timestamp) {}, // 日期格式化，同php中的date()
        strtotime: function (str, now) {}, // 将字符串转换为时间戳，同php中的strtotime()
        intval: function (mixed_var) {}, // 将变量转换为整数类型，同php中的intval()
        function_exists: function (func_name) {}, // 判断函数是否存在
        range: function (low, high, step) {},
        strip_tags: function (str, allowable_tags) {}, // 去除字符串中的html标签
        rand: function (min, max) {}, // 返回min到max之间的随机整数
        strtolower: function (str) {}, // 将字符串转换为小写
        strtoupper: function (str) {}, // 将字符串转换为大写
        ucfirst: function (str) {}, // 将字符串的首字母转换为大写
        base_convert: function (number, frombase, tobase) {}, // 在任意进制之间转换数字
        roud: function (number, precision, mode) {}, // 对浮点数进行四舍五入
        floatval: function (mixed_var) {}, // 将变量转换为浮点数类型，同php中的floatval()
        floor: function (number) {}, // 对浮点数进行向下取整
        ceil: function (number) {}, // 对浮点数进行向上取整
        utf8_encode: function (argString) {}, // 将字符串转换为utf8编码
        utf8_decode: function (str_data) {}, // 把 UTF-8 字符串解码为 ISO-8859-1
        urlencode: function (str) {}, // 字符串URL编码
        urldecode: function (str) {}, // 字符串URL解码
        base64Encode: function (data) {}, // base64编码
        base64Decode: function (data) {}, // base64解码
        preg_replace: function (pattern, replacement, subject, limit) {}, // base64解码
        strCut: function (str, iMaxBytes, sSuffix) {}, // 裁剪字符串到指定长度，并支持后缀
        strLength: function (str) {}, // 返回字符串的长度
        implode: function (separator, array) {}, // 返回由数组元素组合成的字符串
        explode: function (separator, str, limit) {}, // 把字符串打散为数组
        setcookie: function (name, value, expire) {}, // 设置coockie
        dateCompare: function (strDate1, strDate2) {}, // 判断第二个日期是否为大于等于第一个日期
        prettyTime: function (time) {}, // 美化时间
        md5: function (string) {}, // md5 加密
    },
    notice: {
        load: function (typeIndex = 0, opt = {}) {}, // 全局加载层
        loadClose: function (ind) {}, // 关闭全局加载层
        message: function (message, option = {}) {}, // 全局message
        alert: function (content, opt = {}, yes = null) {}, // 全局alert
        alertClose: function (ind) {},
        confirm: function (content, title, callback1, callback2) {}, // 全局Confirm
    },
    require: new Require(), // axios
    validate: {
        isset: function () {}, // 判断某个变量是否赋值
        isEmpty: function (mixed_var) {}, // 判断是否为空
        isFunction: function (obj) {}, // 判断是否为函数
        isArray: function (arg) {}, // 判断是否是数组
        isPlainObject: function (obj) {}, // 判断是否为普通对象
        inArray: function (find, collection, argStrict = false) {}, // 判断元素是否存集合中
        isNumber: function (value) {}, // 判断是否为数字
        isMoney: function (num) {}, // 判断是否为最多两位小数
        isInt: function (n, iMin, iMax) {}, // 判断是否为整数
        isFinite: function (value, fMin, fMax) {}, // 判断是否为某个范围的有效数值
        isString: function (str) {}, // 判断是否是字符串
        isJson: function (str) {}, // 判断是否为json
        isChinese: function (str) {}, // 判断是否中文字符串
        isEnglish: function (str) {}, // 判断是否为英文字符串
        isLowerCase: function (str) {}, // 判断是否是小写字母
        isUpperCase: function (str) {}, // 判断是否是大写字母
        isAlphabets: function (str) {}, // 判断是否是大写字母开头
        isIP: function (ip) {}, // 判断是否为IP
        isPort: function (str) {}, // 判断是否是端口号
        isExternal: function (path) {}, // 判读是否为外链
        isUrl: function (url) {}, // 判断是否是传统网址
        isName: function (value) {}, // 判断是否是名称
        isPassword: function (str) {}, // 密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字
        isTel: function (str) {}, // 判断是否为固话
        isPhone: function (str) {}, // 判断是否是手机号
        isQQ: function (num) {}, // 判断是否是QQ号
        isIdCard: function (str) {}, // 判断是否是二代身份证号
        isEmail: function (str) {}, // 判断是否是邮箱
        isZipcode: function (str) {}, // 判断是否为邮政编码
        strExists: function (string = '', find = '') {}, // 判断字符串中是否包含指定字符
        isReg: function (num) {},
    
    },
  }
}
```

```
import jcsoft from 'jcsoft/packages'
Vue.use(jcsoft)
```

完整用法
----------------
完整用法中，处理会将

新建vuetify.js

```
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
const opts = {}
export default new Vuetify(opts)

```

引入vuetify.js

```
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import vuetify from '@/plugins/vuetify' // 注意修改vuetify.js的路径 
import jcsoft from 'jcsoft/packages'
import 'jcsoft/packages/styles/jcsoft.scss'
Vue.use(jcsoft)

if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
  Vue.config.productionTip = true
}

new Vue({
  el: '#app',
  router,
  vuetify,
  mounted() {},
  render: (h) => h(App),
})

```
