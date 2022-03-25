<template>
  <div class="JcsoftEditorDemo">
    <h1>TinyMce</h1>
    <p>已暴露window.VM到控制台，可通过VM.content查看与编辑器之间的双向绑定</p>
    <jcsoft-editor
      v-model="content"
      :images-upload-url="images_upload_url"
      :menubar="menubar"
      :plugins="plugins"
      :toolbar="toolbar"
      @Editor="getEditor"
    />
  </div>
</template>
<script>
  import JcsoftEditor from 'jcsoft/packages/editor'
  export default {
    name: 'JcsoftEditorDemo',
    components: { JcsoftEditor },
    data() {
      return {
        content: '这是测试内容',
        plugins: [
          'directionality codesample imagetools textpattern autosave indent2em autoresize lineheight formatpainter',
          'advlist autolink link lists charmap print preview hr pagebreak',
          'searchreplace wordcount visualblocks visualchars insertdatetime media2 nonbreaking',
          'table template advcode powerpaste pageembed image help2 wptadv',
          'image2',
        ],
        menubar: 'file edit view insert format tools table',
        toolbar:
          'code undo redo restoredraft | formatpainter removeformat | bold italic underline strikethrough hr forecolor backcolor link | alignleft aligncenter alignright alignjustify | outdent indent indent2em lineheight bullist numlist | blockquote subscript superscript | table image media2 codesample pageembed | styleselect fontselect fontsizeselect | cut copy paste pastetext | axupimgs preview print | help2',
        images_upload_url: '',
      }
    },
    created() {
      window.VM = this
    },
    methods: {
      getEditor: function (tinymce) {
        // var that = this
        // 增加图片选择器插件
        tinymce.PluginManager.add('image2', function (editor) {
          // 注册一个工具栏按钮名称
          editor.ui.registry.addButton('image2', {
            // text: '<i class="fa fa-home" title="图片选择器" aria-hidden="true" ></i>',
            // text: '图片选择器',
            icon: 'image',
            onAction: function () {
              console.log(666)
              /*selector.image(function (res) {
                  if (typeof res !== 'object') return;
                  if (0 != res.length) {
                      var e = "";
                      for (let i in res) e += '<p><img src="' + res[i].url + '" _src="' + res[i].attachment + '" alt="' + res[i].filename + '" style="max-width: 100%"/></p>';
                      editor.insertContent(e);
                  }
              }, {isedit: 2})*/
              // that.$message('321123')
            },
          })

          // 注册一个菜单项名称 menu/menubar
          editor.ui.registry.addMenuItem('image2', {
            text: '图片选择器',
            icon: 'image',
            onAction: function () {
              console.log(666)
            },
          })

          return {
            getMetadata: function () {
              return {
                //插件名和链接会显示在“帮助”→“插件”→“已安装的插件”中
                name: '玖祺图片选择器',
                url: 'http://www.jiuchet.com',
              }
            },
          }
        })
      },
    },
  }
</script>
