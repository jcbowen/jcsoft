<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-model="drawer" app>
        <!-- 左侧导航内容 -->
        左侧导航内容
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title>
          <header-navs />
        </v-toolbar-title>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
  import HeaderNavs from '@/views/common/headerNav'
  export default {
    name: 'App',
    components: { HeaderNavs },
    data() {
      return { drawer: null }
    },
  }
</script>
<style lang="scss">
  body {
    background-color: #fafafa;
  }
</style>
