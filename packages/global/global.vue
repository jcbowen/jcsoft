<!-- jcsoft 需要通过全局调用的组件，全部引用到该组件中 -->
<template>
  <div class="JcsoftGlobal">
    <jcsoft-loading />
    <jcsoft-message />
  </div>
</template>
<script>
  import JcsoftLoading from '../vuetifykits/JcsoftLoading/src/global'
  import JcsoftMessage from '../vuetifykits/message/src/global'
  export default {
    name: 'JcsoftGlobal',
    components: { JcsoftMessage, JcsoftLoading },
    data() {
      return {}
    },
  }
</script>
