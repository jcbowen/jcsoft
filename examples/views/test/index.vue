<template>
    <div>
        <ul v-for="item in navsTop" >
            {{item.title}}
            <li v-for="i in navsChildren[item.id]">
                {{i.title}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Test',
        components: {},
        data() {
            return {
                navsTop: {},
                navsChildren: {}
            }
        },
        created() {
        },
        mounted() {
            this.$jiuchet.require({
                url: '/json/test.json'
                , success: (res) => {
                    console.log(res.data)
                    this.navsTop = res.data.top;
                    this.navsChildren = res.data.children;
                }
            });
        },
        methods: {},
    }
</script>

<style>
    ul{
        border-bottom: 1px solid #c2c2c2;
    }
    li{
        margin-left: 50px;
    }
</style>
