<template>
  <div class="Test">
    <v-alert type="success" />
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        barcodeValue: 'SL1617953309Of8',
        format: 'CODE128',
        width: '1',
        height: '40',
        displayValue: true,
        flat: true,
      }
    },
    created() {
      window.VM = this
    },
  }
</script>
