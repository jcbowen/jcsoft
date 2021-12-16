<template>
    <div class="jc-editor">
        <h2>编辑器单独引入演示</h2>
        <!--        <el-row>-->
        <!--            <el-button type="primary">主要按钮</el-button>-->
        <!--        </el-row>-->
        <my-editor
            v-model="content"
            :plugins="plugins"
            :menubar="menubar"
            :toolbar="toolbar"
            :images_upload_url="images_upload_url"
            @Editor="getEditor"/>
    </div>
</template>

<script>
import MyEditor from '../../../packages/JcEditor'

export default {
    name: 'test',
    components: {MyEditor},
    data() {
        return {
            content: '这是测试内容',
            plugins: ['directionality codesample imagetools textpattern autosave indent2em autoresize lineheight formatpainter'
                , 'advlist autolink link lists charmap print preview hr pagebreak'
                , 'searchreplace wordcount visualblocks visualchars insertdatetime media2 nonbreaking'
                , 'table template advcode powerpaste pageembed image help2 wptadv'
                , 'image2'
            ],
            menubar: 'file edit view insert format tools table',
            toolbar: 'code undo redo restoredraft | formatpainter removeformat | bold italic underline strikethrough hr forecolor backcolor link | alignleft aligncenter alignright alignjustify | outdent indent indent2em lineheight bullist numlist | blockquote subscript superscript | table image media2 codesample pageembed | styleselect fontselect fontsizeselect | cut copy paste pastetext | axupimgs preview print | help2',
            images_upload_url: ''
        };
    },
    methods: {
        getEditor: function (tinymce) {
            var that = this;
            // 增加图片选择器插件
            tinymce.PluginManager.add('image2', function (editor, url) {
                // 注册一个工具栏按钮名称
                editor.ui.registry.addButton('image2', {
                    // text: '<i class="fa fa-home" title="图片选择器" aria-hidden="true" ></i>',
                    // text: '图片选择器',
                    icon: 'image',
                    onAction: function () {
                        /*selector.image(function (res) {
                            if (typeof res !== 'object') return;
                            if (0 != res.length) {
                                var e = "";
                                for (let i in res) e += '<p><img src="' + res[i].url + '" _src="' + res[i].attachment + '" alt="' + res[i].filename + '" style="max-width: 100%"/></p>';
                                editor.insertContent(e);
                            }
                        }, {isedit: 2})*/

                        that.$message('321123')
                    }
                });

                // 注册一个菜单项名称 menu/menubar
                editor.ui.registry.addMenuItem('image2', {
                    text: '图片选择器',
                    icon: 'image',
                    onAction: function () {
                        selector.image(function (res) {
                            if (typeof res !== 'object') return;
                            if (0 != res.length) {
                                var e = "";
                                for (let i in res) e += '<p><img src="' + res[i].url + '" _src="' + res[i].attachment + '" alt="' + res[i].filename + '" style="max-width: 100%"/></p>';
                                editor.insertContent(e);
                            }
                        }, {isedit: 2})
                    }
                });

                return {
                    getMetadata: function () {
                        return {
                            //插件名和链接会显示在“帮助”→“插件”→“已安装的插件”中
                            name: "玖祺图片选择器",
                            url: "http://www.jiuchet.com"
                        };
                    }
                };
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.el-row {
    margin-bottom: 10px;
}

</style>
