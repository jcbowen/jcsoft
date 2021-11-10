<template>
    <div class="headerNav">
        <p>
            路由：
            <el-link v-for="(item, ind) in navs" @click="go(item.path)"
                     :key="ind"
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
                    path: '/test',
                    title: '其他测试'
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
