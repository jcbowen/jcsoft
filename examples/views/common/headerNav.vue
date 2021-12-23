<template>
  <div class="headerNav">
    <v-btn
      v-for="(item, ind) in navs"
      :key="ind"
      :color="item.active ? 'primary' : ''"
      :outlined="item.active"
      :text="!item.active"
      @click="go(item.path)"
    >
      {{ item.title }}
    </v-btn>
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
            active: true,
          },
          {
            path: '/script',
            title: '脚本测试',
            active: false,
          },
          {
            path: '/test',
            title: '其他测试',
            active: false,
          },
        ],
      }
    },
    watch: {
      '$route.path'(newPath) {
        this.checkCurrentNav(newPath)
      },
    },
    beforeMount() {
      this.checkCurrentNav(this.$route.path)
    },
    methods: {
      go(path) {
        if (this.$route.path === path) return true
        return this.$router.push(path)
      },
      checkCurrentNav(path) {
        if (this.$utils.validate.isEmpty(path)) return
        let navs = []
        this.$utils.base.each(this.navs, (item) => {
          item.active = item.path === path
          navs.push(item)
        })
        this.navs = navs
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
