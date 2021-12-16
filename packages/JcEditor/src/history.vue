<template>
    <editor v-model="myValue" :init="init" :disabled="disabled" @onClick="onClick"></editor>
</template>
<script>
import jiuchet from "../../utils/jiuchet";
import {isArray} from "../../utils/validate";

import tinymce from "tinymce/tinymce";
import Editor from '@tinymce/tinymce-vue'

import 'tinymce/themes/silver'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/print'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/wordcount'// 字数统计插件
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/template'
import 'tinymce/plugins/image'// 插入上传图片插件

import '../plugins/media2/plugin'// 插入视频插件
import '../plugins/indent2em/plugin'
import '../plugins/lineheight/plugin'
import '../plugins/formatpainter/plugin.min'
import '../plugins/advcode/plugin.min'
import '../plugins/advcode/customeditor.min'
import '../plugins/powerpaste/plugin.min'
import '../plugins/pageembed/plugin.min'
import '../plugins/help2/plugin.min'
import '../plugins/wptadv/plugin.min'

export default {
    name: 'JcEditor',
    components: {Editor},
    model: {
        prop: 'value',
        event: 'modelEvent'
    },
    props: {
        successCode: {
            type: [String, Number, Array],
            default: () => {
                return [200, 0];
            }
        },
        value: {
            type: String,
            default: ''
        },
        // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
        // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
        baseUrl: {
            type: String,
            default: '/tinymce'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        height: {
            type: [Number, String],
            default: '300'
        },
        min_height: {
            type: [Number, String],
            default: '300'
        },
        width: {
            type: [Number, String],
            default: '100%'
        },
        plugins: {
            type: [String, Array],
            default: () => {
                return 'directionality lists image table wordcount';
            }
        },
        menubar: {
            type: [String, Boolean]
            // 'file edit view insert format tools table'
            , default: false
        },
        toolbar: {
            type: [String, Array],
            default: () => {
                //code undo redo restoredraft | formatpainter removeformat | bold italic underline strikethrough hr forecolor backcolor link | alignleft aligncenter alignright alignjustify | outdent indent indent2em lineheight bullist numlist | blockquote subscript superscript | table image media2 codesample pageembed | styleselect fontselect fontsizeselect | cut copy paste pastetext | axupimgs preview print | help2'
                return [
                    'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent',
                ];
            }
        },
        toolbar_mode: {
            type: String,
            default: 'sliding'
        },
        toolbar_sticky: {
            type: Boolean
            , default: false
        },
        entity_encoding: {
            type: String,
            default: 'named'
        },
        fontsize_formats: {
            type: [String, Array],
            default: "8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt"
        },
        contextmenu: {
            type: [String, Array],
            default: 'link image imagetools media2 forecolor backcolor table'
        },
        content_css: {
            type: [String, Array],
            default: () => {
                return [];
            }
        },
        color_map: {
            type: Array,
            default: () => {
                return [
                    '#009688', '通常用于按钮、及任何修饰元素',
                    '#5FB878', '一般用于选中状态',
                    '#1E9FFF', '比较适合一些鲜艳色系的页面',
                    '#01AAED', '用于文字着色，如链接文本',
                    '#428bca', '沉稳蓝',

                    '#FFB800', '暖色系，一般用于提示性元素',
                    '#FF5722', '比较引人注意的颜色',
                    '#fb6638', 'JC',
                    '#e36c09', '标注红',
                    '#c00000', '暗红色',

                    '#000000', '黑',
                    '#2F4056', '侧边或底部普遍采用的颜色',
                    '#393D49', '通常用于导航',
                    '#c2c2c2', '灰7',
                    '#d2d2d2', '灰6',

                    '#dddddd', '灰5',
                    '#e2e2e2', '灰4',
                    '#eeeeee', '灰3',
                    '#f2f2f2', '灰2',
                    '#F0F0F0', '灰1',

                    '#ffffff', '白',
                ];
            }
        },
        // 图片上传接口
        images_upload_url: {
            type: String
            , default: ''
        },
        images_upload_credentials: {
            type: Boolean
            , default: true
        },
    },
    data() {
        return {
            init: {
                base_url: this.baseUrl,
                cache_suffix: '?v=20210127',

                language_url: `${this.baseUrl}/langs/zh_CN.js`,
                language: 'zh_CN',
                skin_url: `${this.baseUrl}/skins/ui/oxide`,
                height: this.height,
                width: this.width,
                min_height: this.min_height,
                plugins: this.plugins,
                toolbar: this.toolbar,
                toolbar_mode: this.toolbar_mode, // 工具栏模式
                toolbar_sticky: this.toolbar_sticky,
                // , toolbar_sticky: false // 工具栏粘连顶部(官方的，不确认是否兼容的情况下，保持关闭)
                // , my_toolbar_sticky: true // 工具栏粘连顶部（自主封装的写法）
                // , my_toolbar_sticky_top: 0 // 工具栏粘连顶部时，和顶部的间距

                branding: false, // 品牌化显示
                menubar: this.menubar, // 顶部工具栏
                entity_encoding: this.entity_encoding, //处理实体/字符的转换方式
                fontsize_formats: this.fontsize_formats,
                powerpaste_allow_local_images: true,
                powerpaste_word_import: 'prompt',
                powerpaste_html_import: 'prompt',
                contextmenu: this.contextmenu, // 上下文菜单
                contextmenu_never_use_native: true,
                content_css: this.content_css ? this.content_css : `${this.baseUrl}/skins/content/default/content.css`,
                color_map: this.color_map,
                extended_valid_elements: 'i[class|style],#p[class|style|vj-options],iframe[name|class|src|width|height|style|frameborder=0|title|align|onmouseover|onmouseout|onload|onload],span[style|class],br', //扩展有效元素
                elementpath: true, //显示元素路径
                auto_focus: false, // 渲染结束后自动焦点
                typeahead_urls: true, // 输入网址判断

                images_upload_url: this.images_upload_url,
                images_upload_credentials: this.images_upload_credentials, // 是否携带cookie
                images_upload_handler: (blobInfo, success, failure) => {
                    if (this.images_upload_url === '') {
                        // 直接转换为base64图片输出
                        const img = 'data:image/jpeg;base64,' + blobInfo.base64()
                        success(img)
                    } else {
                        var formData = new FormData();
                        formData.append('upload_type', 'image');
                        formData.append('file', blobInfo.blob(), blobInfo.filename());
                        jiuchet.require({
                            url: this.images_upload_url,
                            dataType: 'json',
                            type: 'post',
                            data: formData,
                            transformData: false,
                            success: function (res) {
                                const codeVerificationArray = isArray(successCode) ? [...successCode] : [...[successCode]]
                                if (codeVerificationArray.includes(res.code)) {
                                    success(res.data['url']);
                                } else {
                                    // console.error('tinymce: ' + res.msg);
                                    failure(res.msg);
                                }

                            },
                            error: function (res) {
                                // console.log(res)
                                failure("网络错误：" + res.msg);
                            }
                        });
                    }
                },
                video_template_callback: function (data) {
                    return `
                        <span class="vj" vj-options="{}">
                            <video class="video-js vj2021" ${data.poster ? ' poster="' + data.poster + '" ' : ''}controls="controls" preload="none" width="${data.width}" height="${data.height}" src="${data.source}">
                                <source src="${data.source}" ${data.sourcemime ? ' type="' + data.sourcemime + '"' : ''} />
                            </video>
                        </span>`;

                }
            }
            , myValue: this.value
        }
    },
    beforeCreate() {
        this.$emit('Editor', tinymce);
    },
    created() {
    },
    mounted() {
        tinymce.init({});
    },
    methods: {
        // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
        // 需要什么事件可以自己增加
        onClick(e) {
            this.$emit('onClick', e, tinymce)
        },
        // 可以添加一些自己的自定义事件，如清空内容
        clear() {
            this.myValue = ''
        }
    },
    watch: {
        value(newValue) {
            this.myValue = newValue
        },
        myValue(newValue) {
            this.$emit('modelEvent', newValue)
            this.$emit('input', newValue)
        }
    }
}
</script>
