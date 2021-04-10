<template>
    <div id="app">
        <div class="headerNav">
            <p>
                路由：
                <el-link href="#/" class="aItem" type="primary">首页</el-link>
                <el-link href="#/test-script" class="aItem" type="primary">脚本测试</el-link>
                <el-link href="#/editor" class="aItem" type="primary">编辑器组件演示</el-link>
            </p>
        </div>
        <router-view/>
    </div>
</template>

<script>

export default {
    name: 'App',
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.headerNav {
    .aItem {
        margin-right: 10px;
    }
}
</style>
