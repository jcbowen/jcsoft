<template>
    <div class="layui">
        <h1>Layui 组件/h1>
        <p style="text-indent: 2em;">个人比较习惯于使用layui，所以通过截取部分layui css样式、参考layui源码思路，改写的layui-vue组件。也就是说，灵魂还是<span style="color: #1e9fff;">贤心</span>大佬的。</p>
        <hr>
        <h2>代码演示</h2>
        <layui-code
            :code="code"
            :title="'自定义组件的 v-model'"
            :encode="true"
            :lang="'Vue 2.0'"
        />
    </div>
</template>
<script>
export default {
    name: 'Index',
    data() {
        return {
            code: '',
        }
    },
    created() {
        this.code = `Vue.component('base-checkbox', {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean
    },
    template: '
        <input
            type="checkbox"
            v-bind:checked="checked"
            v-on:change="$emit('change', $event.target.checked)"
        />
    '
})`;
    },
    mounted() {
    },
    methods: {},
}
</script>
