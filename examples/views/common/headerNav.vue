<template>
  <div class="headerNav">
    <p>
      路由：
      <!--      <el-link
        v-for="(item, ind) in navs"
        :key="ind"
        class="aItem"
        type="primary"
        @click="go(item.path)"
      >
        {{ item.title }}
      </el-link>-->
    </p>
  </div>
</template>
<script>
  export default {
    name: 'HeaderNavs',
    props: {},
    data() {
      return {
        navs: [
          {
            path: '/',
            title: '首页',
          },
          {
            path: '/script',
            title: '脚本测试',
          },
          {
            path: '/test',
            title: '其他测试',
          },
        ],
      }
    },
    methods: {
      go(path) {
        if (this.$route.path === path) return true
        return this.$router.push(path)
      },
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
