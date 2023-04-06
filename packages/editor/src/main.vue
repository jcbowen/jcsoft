<template>
  <div class="JcsoftEditor">
    <editor
      v-model="myValue"
      :disabled="disabled"
      :init="init"
      @onClick="onClick"
    />
  </div>
</template>

<script>
  import validate from '../../utils/modules/validate'
  // import * as $require from '../../utils/modules/require'

  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'

  import 'tinymce/themes/silver'
  import 'tinymce/icons/default/icons'

  // 载入全部插件
  let tinymcePlugins = require.context('tinymce/plugins', true, /index\.js$/)
  // 不需要载入的插件
  let filterPlugins = [
    'anchor',
    'bbcode',
    'code',
    'colorpicker',
    'contextmenu',
    'emoticons',
    'fullpage',
    'fullscreen',
    'help',
    'importcss',
    'media',
    'noneditable',
    'paste',
    'quickbars',
    'save',
    'spellchecker',
    'tabfocus',
    'textcolor',
    'toc',
  ]
  tinymcePlugins.keys().forEach((key) => {
    const pathArr = key.split('/')
    if (!validate.inArray(pathArr[1], filterPlugins)) {
      tinymcePlugins(key)
    }
  })

  let hookPlugins = require.context('../plugins', true, /plugin\.min\.js$/)
  hookPlugins.keys().forEach((key) => {
    hookPlugins(key)
  })

  export default {
    name: 'JcsoftEditor',
    components: {
      Editor,
    },
    model: {
      prop: 'value',
      event: 'modelEvent',
    },
    props: {
      successCode: {
        type: [String, Number, Array],
        default: () => {
          return [200, 0]
        },
      },
      value: {
        type: String,
        default: '',
      },
      // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
      // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
      baseUrl: {
        type: String,
        default: './tinymce',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      height: {
        type: [Number, String],
        default: '300',
      },
      minHeight: {
        type: [Number, String],
        default: '300',
      },
      width: {
        type: [Number, String],
        default: '100%',
      },
      plugins: {
        type: [String, Array],
        default: () => {
          // code undo redo restoredraft | formatpainter removeformat | bold italic underline strikethrough hr forecolor backcolor link | alignleft aligncenter alignright alignjustify | outdent indent indent2em lineheight bullist numlist | blockquote subscript superscript | table image media2 codesample pageembed | styleselect fontselect fontsizeselect | cut copy paste pastetext | axupimgs preview print | help2'
          return 'directionality lists image table wordcount'
        },
      },
      menubar: {
        type: [String, Boolean],
        // 'file edit view insert format tools table'
        default: false,
      },
      entities: {
        type: String,
        default: '160,nbsp,162,cent,8364,euro,163,pound',
      },
      toolbar: {
        type: [String, Array],
        default: () => {
          //code undo redo restoredraft | formatpainter removeformat | bold italic underline strikethrough hr forecolor backcolor link | alignleft aligncenter alignright alignjustify | outdent indent indent2em lineheight bullist numlist | blockquote subscript superscript | table image media2 codesample pageembed | styleselect fontselect fontsizeselect | cut copy paste pastetext | axupimgs preview print | help2'
          return [
            'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent',
          ]
        },
      },
      toolbarMode: {
        type: String,
        default: 'sliding',
      },
      toolbarSticky: {
        type: Boolean,
        default: false,
      },
      entityEncoding: {
        type: String,
        default: 'named',
      },
      fontsizeFormats: {
        type: [String, Array],
        default: '8px 10px 12px 14px 16px 18px 20px 24px 36px',
      },
      contextmenu: {
        type: [String, Array],
        default: 'link image imagetools media2 forecolor backcolor table',
      },
      contentCss: {
        type: [String, Array],
        default: () => {
          return []
        },
      },
      colorMap: {
        type: Array,
        default: () => {
          return [
            '#009688',
            '通常用于按钮、及任何修饰元素',
            '#5FB878',
            '一般用于选中状态',
            '#1E9FFF',
            '比较适合一些鲜艳色系的页面',
            '#01AAED',
            '用于文字着色，如链接文本',
            '#428bca',
            '沉稳蓝',

            '#FFB800',
            '暖色系，一般用于提示性元素',
            '#FF5722',
            '比较引人注意的颜色',
            '#fb6638',
            'JC',
            '#e36c09',
            '标注红',
            '#c00000',
            '暗红色',

            '#000000',
            '黑',
            '#2F4056',
            '侧边或底部普遍采用的颜色',
            '#393D49',
            '通常用于导航',
            '#c2c2c2',
            '灰7',
            '#d2d2d2',
            '灰6',

            '#dddddd',
            '灰5',
            '#e2e2e2',
            '灰4',
            '#eeeeee',
            '灰3',
            '#f2f2f2',
            '灰2',
            '#F0F0F0',
            '灰1',

            '#ffffff',
            '白',
          ]
        },
      },
      // 图片上传接口
      imagesUploadUrl: {
        type: String,
        default: '',
      },
      imagesUploadCredentials: {
        type: Boolean,
        default: true,
      },
      imagesUploadHandler: {
        type: Function,
        default: (blobInfo, success, failure) => {
          // if (this.images_upload_url === '') {
          // 直接转换为base64图片输出
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          if (img) {
            success(img)
          } else {
            failure('上传失败')
          }
          /*} else {
          var formData = new FormData()
          formData.append('upload_type', 'image')
          formData.append('file', blobInfo.blob(), blobInfo.filename())
          $require({
            url: this.imagesUploadUrl,
            method: 'post',
            data: formData,
          })
            .then((res) => {
              const codeVerificationArray = validate.isArray(this.successCode)
                ? [...this.successCode]
                : [...[this.successCode]]
              if (codeVerificationArray.includes(res.code)) {
                success(res.data['url'])
              } else {
                // console.error('tinymce: ' + res.msg);
                failure(res.msg)
              }
            })
            .catch((err) => {
              console.log(err)
              failure('网络错误')
            })
        }*/
        },
      },
    },
    data() {
      return {
        myValue: '',
        init: {
          base_url: this.baseUrl,
          cache_suffix: '?v=20230406',

          language_url: `${this.baseUrl}/langs/zh_CN.js`,
          language: 'zh_CN',
          skin_url: `${this.baseUrl}/skins/ui/oxide`,
          height: this.height,
          min_height: this.minHeight,
          width: this.width,
          plugins: this.plugins,
          toolbar: this.toolbar,
          toolbar_mode: this.toolbarMode, // 工具栏模式
          toolbar_sticky: this.toolbarSticky,
          // , toolbar_sticky: false // 工具栏粘连顶部(官方的，不确认是否兼容的情况下，保持关闭)
          // , my_toolbar_sticky: true // 工具栏粘连顶部（自主封装的写法）
          // , my_toolbar_sticky_top: 0 // 工具栏粘连顶部时，和顶部的间距
          branding: false, // 品牌化显示
          menubar: this.menubar, // 顶部工具栏
          entities: this.entities, // 转义字符
          entity_encoding: this.entityEncoding, //处理实体/字符的转换方式
          fontsize_formats: this.fontsizeFormats,
          powerpaste_allow_local_images: true,
          powerpaste_word_import: 'prompt',
          powerpaste_html_import: 'prompt',
          contextmenu: this.contextmenu, // 上下文菜单
          contextmenu_never_use_native: true,
          content_css: this.contentCss
            ? this.contentCss
            : `${this.baseUrl}/skins/content/default/content.css`,
          color_map: this.colorMap,
          extended_valid_elements:
            'i[class|style],#p[class|style|vj-options],iframe[name|class|src|width|height|style|frameborder=0|title|align|onmouseover|onmouseout|onload|onload],span[style|class],br', //扩展有效元素
          elementpath: true, //显示元素路径
          auto_focus: false, // 渲染结束后自动焦点
          typeahead_urls: true, // 输入网址判断

          images_upload_url: this.imagesUploadUrl,
          images_upload_credentials: this.imagesUploadCredentials, // 是否携带cookie
          images_upload_handler: (blobInfo, success, failure) => {
            return this.imagesUploadHandler(blobInfo, success, failure)
          },
          video_template_callback: function (data) {
            return `
                        <span class="vj" vj-options="{}">
                            <video class="video-js vj2021" ${
                              data.poster
                                ? ' poster="' + data.poster + '" '
                                : ''
                            }controls="controls" preload="none" width="${
              data.width
            }" height="${data.height}" src="${data.source}">
                                <source src="${data.source}" ${
              data.sourcemime ? ' type="' + data.sourcemime + '"' : ''
            } />
                            </video>
                        </span>`
          },
        },
      }
    },
    watch: {
      value(newValue) {
        this.myValue = newValue
      },
      myValue(newValue) {
        this.$emit('modelEvent', newValue)
        this.$emit('input', newValue)
      },
    },
    beforeCreate() {
      this.$emit('Editor', tinymce)
    },
    mounted() {
      this.$nextTick(() => {
        tinymce.init({})
      })
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
      },
    },
  }
</script>
