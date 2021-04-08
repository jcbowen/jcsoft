<template>
    <div class="jc-editor">
        <h2>编辑器单独引入演示</h2>
        <my-editor :plugins="plugins" />
    </div>
</template>

<script>
import MyEditor from '../../../packages/JcEditor'

export default {
    name: 'test',
    components: {MyEditor},
    data() {
        return {
            plugins: ['directionality codesample imagetools textpattern autosave indent2em autoresize lineheight formatpainter'
                , 'advlist autolink link lists charmap print preview hr pagebreak'
                , 'searchreplace wordcount visualblocks visualchars insertdatetime media2 nonbreaking'
                , 'table template advcode powerpaste pageembed image help2 wptadv'
            ]
        };
    },
    created() {
    },
    mounted() {

    },
    methods: {},
}
</script>
