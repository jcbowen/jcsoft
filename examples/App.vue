<template>
    <div id="app">
        <header-nav />
        <router-view />
        <main-footer />
    </div>
</template>

<script>
import HeaderNav from "@/views/common/headerNav";
import mainFooter from '@/views/common/mainFooter'

export default {
    name: 'App',
    components: {mainFooter, HeaderNav}
}
</script>
<style lang="scss">
#app{
    max-width: 750px;
    margin: 0 auto;
}
</style>
