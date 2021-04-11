<template>
    <div class="headerNav">
        <p>
            路由：
            <el-link v-for="item in navs" @click="go(item.path)"
                     class="aItem" type="primary">
                {{ item.title }}
            </el-link>
        </p>
    </div>
</template>
<script>
export default {
    name: 'headerNavs',
    props: {},
    data() {
        return {
            navs: [
                {
                    path: '/',
                    title: '首页'
                },
                {
                    path: '/script',
                    title: '脚本测试'
                },
                {
                    path: '/layui',
                    title: 'Layui'
                },
                {
                    path: '/editor',
                    title: '富文本编辑器'
                },
                {
                    path: '/readIdCard',
                    title: '身份证读卡器'
                },
            ]
        }
    },
    methods: {
        go(path) {
            if (this.$route.path === path) return true;
            return this.$router.push(path)
        }
    }
}
</script>
<style lang="scss" scoped>
.headerNav {

    .aItem {
        margin-right: 10px;
    }
}
</style>
