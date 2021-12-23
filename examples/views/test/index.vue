<template>
  <div class="Test">
    <!--    <jcsoft-loading text="123" />-->
  </div>
</template>
<script>
  import store from 'jcsoft/packages/store'
  export default {
    data() {
      return {}
    },
    created() {
      window.VM = this
    },
    methods: {
      openLoading() {
        store.dispatch('notice/openLoading')
      },
      closeLoading() {
        store.dispatch('notice/closeLoading')
      },
      get() {
        console.log(store.getters['notice/loading'])
      },
    },
  }
</script>
