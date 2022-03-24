<template>
  <div class="Test">
    <jcsoft-editor />
  </div>
</template>
<script>
  import JcsoftEditor from 'jcsoft/packages/editor/src/main'
  export default {
    components: { JcsoftEditor },
    data() {
      return {}
    },
    created() {
      window.VM = this
    },
    methods: {},
  }
</script>
