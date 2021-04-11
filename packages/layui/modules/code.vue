<template>
    <div class="LayuiCode">
        <pre :class="'layui-code layui-box layui-code-view ' + (skin ? 'layui-code-' + skin : '')"
             lay-title="JavaScript">
            <h3 class="layui-code-h3">{{ showTitle(title) }}<a v-if="lang" href="javascript:;">{{ lang }}</a></h3>
            <div v-if="html" v-html="html"></div>
        </pre>
    </div>
</template>
<script>
import jiuchet from "../../utils/jiuchet";
import util from "../../utils/jiuchet";

export default {
    name: 'LayuiCode',
    props: {
        title: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: ''
        },
        encode: {
            type: Boolean,
            default: false
        },
        skin: {
            type: String,
            default: ''// notepad
        },
        lang: {
            type: [String, Boolean],
            default: 'code'
        },
        code: {
            default: ''
        }
    },
    data() {
        return {
            html: false,
            olStyle: false
        }
    },
    created() {
        // 代码内容处理
        if (this.code === '') return this.html = false;

        let ol = document.createElement('ol');
        ol.className = 'layui-code-ol';

        let li = '';
        li = JSON.parse(JSON.stringify(this.code))
        if (this.encode) {
            li = li.replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;').replace(/"/g, '&quot;')
        }
        li = '<li>' + li.replace(/[\r\t\n]+/g, '</li><li>' + '</i>');

        ol.innerHTML = li;

        // 按行数适配左边距
        let $li = ol.querySelectorAll('li');
        if (($li.length / 100 | 0) > 0) {
            ol.style.marginLeft = (ol.find('li').length / 100 | 0) + 'px';
        }

        // 设置最大高度
        if (this.height && this.height !== '') {
            ol.style.maxHeight = this.height;
        }

        ol = ol.outerHTML;
        this.html = ol;
    },
    methods: {
        showTitle: (title) => {
            if (!title) return '</>';
            return title;
        }
    }
}
</script>
<style lang="scss">
.LayuiCode {
    line-height: 1.6;
    color: rgba(0, 0, 0, .85);
    font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

    a {
        text-decoration: none;
    }

    blockquote, button, dd, div, dl, dt, form, h1, h2, h3, h4, h5, h6, input, li, ol, p, pre, td, textarea, th, ul {
        margin: 0;
        padding: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: 400;
    }

    pre {
        font-family: monospace;
        white-space: pre;
    }

    pre {
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
    }

    .layui-code {
        position: relative;
        margin: 10px 0;
        padding: 15px;
        line-height: 0;
        border: 1px solid #eee;
        border-left-width: 6px;
        background-color: #FAFAFA;
        color: #333;
        font-family: Courier New, cursive;
        font-size: 12px;
    }

    .layui-box, .layui-box * {
        box-sizing: content-box;
    }

    li {
        list-style: none;
    }

    /**

     @Name: layui.code
     @Description：Classic modular front-end UI framework
     @License：MIT

     */

    /* 加载就绪标志 */
    html #layuicss-skincodecss {
        display: none;
        position: absolute;
        width: 1989px;
    }

    /* 默认风格 */
    .layui-code-view {
        display: block;
        position: relative;
        margin: 10px 0;
        padding: 0;
        border: 1px solid #eee;
        border-left-width: 6px;
        background-color: #FAFAFA;
        color: #333;
        font-family: Courier New;
        font-size: 12px;
    }

    .layui-code-h3 {
        position: relative;
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
        font-size: 12px;
    }

    .layui-code-h3 a {
        position: absolute;
        right: 10px;
        top: 0;
        color: #999;
    }

    .layui-code-view .layui-code-ol {
        position: relative;
        overflow: auto;
    }

    .layui-code-view .layui-code-ol li {
        position: relative;
        margin-left: 45px;
        line-height: 20px;
        padding: 0 10px;
        border-left: 1px solid #e2e2e2;
        list-style-type: decimal-leading-zero;
        *list-style-type: decimal;
        background-color: #fff;
    }

    .layui-code-view .layui-code-ol li:first-child {
        padding-top: 10px;
    }

    .layui-code-view .layui-code-ol li:last-child {
        padding-bottom: 10px;
    }

    .layui-code-view pre {
        margin: 0;
    }

    /* notepadd++风格 */
    .layui-code-notepad {
        border: 1px solid #0C0C0C;
        border-left-color: #3F3F3F;
        background-color: #0C0C0C;
        color: #C2BE9E
    }

    .layui-code-notepad .layui-code-h3 {
        border-bottom: none;
    }

    .layui-code-notepad .layui-code-ol li {
        background-color: #3F3F3F;
        border-left: none;
    }

    /* 代码预览 */
    .layui-code-demo .layui-code {
        visibility: visible !important;
        margin: -15px;
        border-top: none;
        border-right: none;
        border-bottom: none;
    }

    .layui-code-demo .layui-tab-content {
        padding: 15px;
        border-top: none
    }
}

</style>
