<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Jcsoft</v-list-item-title>
          <v-list-item-subtitle>开发工具包(UI/API)</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="#fff">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>
        <header-navs />
      </v-toolbar-title>
    </v-app-bar>
    <v-main class="grey lighten-4">
      <jcsoft-global />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import HeaderNavs from '@/views/common/headerNav'
  export default {
    name: 'App',
    components: { HeaderNavs },
    data() {
      return {
        drawer: null,
        items: [{ title: '首页', icon: 'mdi-home' }],
      }
    },
  }
</script>
<style lang="scss">
  body {
    background-color: #fafafa;
  }
</style>
