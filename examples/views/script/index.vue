<template>
  <div class="TestScript">
    <h2>脚本测试</h2>
    <h3>
      本页面将引入包中的各个脚本，暴露到window全局变量中，可在控制器中进行测试
    </h3>
    <p>已暴露变量如下：</p>
    <layui-code :code="code" title="javascript" />
    <br />
    <p>this.$jcUtils结构</p>
    <layui-code :code="methods" title="javascript" />
  </div>
</template>

<script>
  export default {
    name: 'ScriptIndex',
    components: {},
    data() {
      return {
        code: 'window.VM = this\n' + 'window.util = this.$jcUtils',
        methods:
          '$jcUtils: {\n' +
          '    // AES加解密\n' +
          '    aes: {\n' +
          '        encrypt: function (str, key, iv) {},\n' +
          '        decrypt: function (str, key, iv) {},\n' +
          '    },\n' +
          '    base: {\n' +
          '        extend: function () {}, // 用于将一个或多个对象的内容合并到目标对象，用法同jQuery.extend\n' +
          '        each: function (collection, predicate) {}, // 类似forEach，但不区分数组和对象\n' +
          '        translateDataToTree: function (data) {}, // 根据数据中的parent_id，将数据转换成树形结构\n' +
          '        translateTreeToData: function (tree) {}, // 根据数据中的children，树形结构转回数据\n' +
          '        loadJs: function (url) {}, // 外部js 加载器\n' +
          '        link: function (url) {href, callBack, cssName}, // 外部css 加载器\n' +
          '        img: function (src) {}, // 图片预先加载\n' +
          "        lazyimg: function ({elem = 'img',scrollElem = '',lazyAttr = 'jc-src',style = {},}) {}, // 通过操作DOM实现图片懒加载，用于富文本编辑器输出内容的\n" +
          '        data: function (table, settings) {}, // 持久性储存\n' +
          '        sessionData: function (table, settings) {}, // 会话性储存\n' +
          '        http_build_query: function (param, key, encode) {}, // 将对象转换为URL参数字符串\n' +
          '        compare: function (curV, reqV) {}, // 比较版本号大小\n' +
          '        numberToChinese: function (str,isInt = true,isFloat = false,replace = false) {}, // 人民币数值转中文大写\n' +
          '        time: function () {}, // 秒级时间戳，同php中的time()\n' +
          '        microtime: function (get_as_float) {}, // 毫秒级时间戳\n' +
          '        date: function (format, timestamp) {}, // 日期格式化，同php中的date()\n' +
          '        strtotime: function (str, now) {}, // 将字符串转换为时间戳，同php中的strtotime()\n' +
          '        intval: function (mixed_var) {}, // 将变量转换为整数类型，同php中的intval()\n' +
          '        function_exists: function (func_name) {}, // 判断函数是否存在\n' +
          '        range: function (low, high, step) {},\n' +
          '        strip_tags: function (str, allowable_tags) {}, // 去除字符串中的html标签\n' +
          '        rand: function (min, max) {}, // 返回min到max之间的随机整数\n' +
          '        strtolower: function (str) {}, // 将字符串转换为小写\n' +
          '        strtoupper: function (str) {}, // 将字符串转换为大写\n' +
          '        ucfirst: function (str) {}, // 将字符串的首字母转换为大写\n' +
          '        base_convert: function (number, frombase, tobase) {}, // 在任意进制之间转换数字\n' +
          '        roud: function (number, precision, mode) {}, // 对浮点数进行四舍五入\n' +
          '        floatval: function (mixed_var) {}, // 将变量转换为浮点数类型，同php中的floatval()\n' +
          '        floor: function (number) {}, // 对浮点数进行向下取整\n' +
          '        ceil: function (number) {}, // 对浮点数进行向上取整\n' +
          '        utf8_encode: function (argString) {}, // 将字符串转换为utf8编码\n' +
          '        utf8_decode: function (str_data) {}, // 把 UTF-8 字符串解码为 ISO-8859-1\n' +
          '        urlencode: function (str) {}, // 字符串URL编码\n' +
          '        urldecode: function (str) {}, // 字符串URL解码\n' +
          '        base64Encode: function (data) {}, // base64编码\n' +
          '        base64Decode: function (data) {}, // base64解码\n' +
          '        preg_replace: function (pattern, replacement, subject, limit) {}, // base64解码\n' +
          '        strCut: function (str, iMaxBytes, sSuffix) {}, // 裁剪字符串到指定长度，并支持后缀\n' +
          '        strLength: function (str) {}, // 返回字符串的长度\n' +
          '        implode: function (separator, array) {}, // 返回由数组元素组合成的字符串\n' +
          '        explode: function (separator, str, limit) {}, // 把字符串打散为数组\n' +
          '        setcookie: function (name, value, expire) {}, // 设置coockie\n' +
          '        dateCompare: function (strDate1, strDate2) {}, // 判断第二个日期是否为大于等于第一个日期\n' +
          '        prettyTime: function (time) {}, // 美化时间\n' +
          '        md5: function (string) {}, // md5 加密\n' +
          '    },\n' +
          '    notice: {\n' +
          '        load: function (typeIndex = 0, opt = {}) {}, // 全局加载层\n' +
          '        loadClose: function (ind) {}, // 关闭全局加载层\n' +
          '        message: function (message, option = {}) {}, // 全局message\n' +
          '        alert: function (content, opt = {}, yes = null) {}, // 全局alert\n' +
          '        alertClose: function (ind) {},\n' +
          '        confirm: function (content, title, callback1, callback2) {}, // 全局Confirm\n' +
          '    },\n' +
          '    require: new Require(), // axios\n' +
          '    validate: {\n' +
          '        isset: function () {}, // 判断某个变量是否赋值\n' +
          '        isEmpty: function (mixed_var) {}, // 判断是否为空\n' +
          '        isFunction: function (obj) {}, // 判断是否为函数\n' +
          '        isArray: function (arg) {}, // 判断是否是数组\n' +
          '        isPlainObject: function (obj) {}, // 判断是否为普通对象\n' +
          '        inArray: function (find, collection, argStrict = false) {}, // 判断元素是否存集合中\n' +
          '        isNumber: function (value) {}, // 判断是否为数字\n' +
          '        isMoney: function (num) {}, // 判断是否为最多两位小数\n' +
          '        isInt: function (n, iMin, iMax) {}, // 判断是否为整数\n' +
          '        isFinite: function (value, fMin, fMax) {}, // 判断是否为某个范围的有效数值\n' +
          '        isString: function (str) {}, // 判断是否是字符串\n' +
          '        isJson: function (str) {}, // 判断是否为json\n' +
          '        isChinese: function (str) {}, // 判断是否中文字符串\n' +
          '        isEnglish: function (str) {}, // 判断是否为英文字符串\n' +
          '        isLowerCase: function (str) {}, // 判断是否是小写字母\n' +
          '        isUpperCase: function (str) {}, // 判断是否是大写字母\n' +
          '        isAlphabets: function (str) {}, // 判断是否是大写字母开头\n' +
          '        isIP: function (ip) {}, // 判断是否为IP\n' +
          '        isPort: function (str) {}, // 判断是否是端口号\n' +
          '        isExternal: function (path) {}, // 判读是否为外链\n' +
          '        isUrl: function (url) {}, // 判断是否是传统网址\n' +
          '        isName: function (value) {}, // 判断是否是名称\n' +
          '        isPassword: function (str) {}, // 密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字\n' +
          '        isTel: function (str) {}, // 判断是否为固话\n' +
          '        isPhone: function (str) {}, // 判断是否是手机号\n' +
          '        isQQ: function (num) {}, // 判断是否是QQ号\n' +
          '        isIdCard: function (str) {}, // 判断是否是二代身份证号\n' +
          '        isEmail: function (str) {}, // 判断是否是邮箱\n' +
          '        isZipcode: function (str) {}, // 判断是否为邮政编码\n' +
          "        strExists: function (string = '', find = '') {}, // 判断字符串中是否包含指定字符\n" +
          '        isReg: function (num) {},\n' +
          '    \n' +
          '    },\n' +
          '  }',
      }
    },
    created() {},
    mounted() {
      window.VM = this
      window.util = this.$jcUtils
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .TestScript {
    padding: 20px;
    background: #fff;
    min-height: 80vh;
  }
</style>
