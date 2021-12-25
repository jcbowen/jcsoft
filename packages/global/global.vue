<!-- jcsoft 需要通过全局调用的组件，全部引用到该组件中 -->
<template>
  <div class="JcsoftGlobal">
    <jcsoft-loading />
    <jcsoft-message />
    <jcsoft-alert />
  </div>
</template>
<script>
  import JcsoftLoading from '../vuetifykits/loading/src/global'
  import JcsoftMessage from '../vuetifykits/message/src/global'
  import JcsoftAlert from '../vuetifykits/alert/src/global'
  export default {
    name: 'JcsoftGlobal',
    components: { JcsoftAlert, JcsoftMessage, JcsoftLoading },
    data() {
      return {}
    },
  }
</script>
