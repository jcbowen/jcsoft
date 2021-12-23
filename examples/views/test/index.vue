<template>
  <div class="Test">
    <!--    <jcsoft-loading text="123" />-->
    <jcsoft-message />
  </div>
</template>
<script>
  import store from 'jcsoft/packages/store'
  import JcsoftMessage from '../../../packages/vuetifykits/message/src/global'
  export default {
    components: { JcsoftMessage },
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
