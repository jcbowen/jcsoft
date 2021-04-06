/* 直接注册为组件的方式，但TinymceHook需要多个系统中的来使用，则不支持这么做
import TinymceHook from './src/TinymceHook.vue'

TinymceHook.install = function (Vue) {
    Vue.component(TinymceHook.name, TinymceHook)

}

export default TinymceHook*/


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

import './plugins/media2/plugin'// 插入视频插件
import './plugins/indent2em/plugin'
import './plugins/lineheight/plugin'
import './plugins/formatpainter/plugin.min'
import './plugins/advcode/plugin.min'
import './plugins/advcode/customeditor.min'
import './plugins/powerpaste/plugin.min'
import './plugins/pageembed/plugin.min'
import './plugins/help2/plugin.min'
import './plugins/wptadv/plugin.min'

export {tinymce, Editor}
