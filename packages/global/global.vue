<!-- jcsoft 需要通过全局调用的组件，全部引用到该组件中 -->
<template>
  <div class="JcsoftGlobal">
    <jcsoft-loading />
  </div>
</template>
<script>
  import JcsoftLoading from '../vuetifykits/JcsoftLoading/src/global'
  export default {
    name: 'JcsoftGlobal',
    components: { JcsoftLoading },
    data() {
      return {}
    },
  }
</script>
