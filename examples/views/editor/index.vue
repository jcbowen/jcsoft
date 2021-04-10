<template>
    <div class="jc-editor">
        <h2>编辑器单独引入演示</h2>
<!--        <el-row>-->
<!--            <el-button type="primary">主要按钮</el-button>-->
<!--        </el-row>-->
        <my-editor :toolbar="toolbar" :plugins="plugins" @Editor="getEditor"/>
    </div>
</template>

<script>
import MyEditor from '../../../packages/JcEditor'

export default {
    name: 'test',
    components: {MyEditor},
    data() {
        return {
            tinyMce: null,
            plugins: ['directionality codesample imagetools textpattern autosave indent2em autoresize lineheight formatpainter'
                , 'advlist autolink link lists charmap print preview hr pagebreak'
                , 'searchreplace wordcount visualblocks visualchars insertdatetime media2 nonbreaking'
                , 'table template advcode powerpaste pageembed image help2 wptadv'
                , 'image2'
            ],
            toolbar: 'code | image2'
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        getEditor: (tinymce) => {
            let that =this;
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
    },
}
</script>
<style lang="scss" scoped>
.el-row{
    margin-bottom: 10px;
}

</style>
