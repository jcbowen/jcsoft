<template>
  <div class="JcsoftLoading">
    <v-dialog v-model="loading" fullscreen>
      <v-container
        class="jcsoft-loading"
        fill-height
        fluid
        style="background-color: hsla(0, 0%, 100%, 0.8)"
      >
        <v-layout align-center column justify-center>
          <v-progress-circular color="primary" indeterminate size="48" />
          <p class="jcsoft-loading-text grey--text text--darken-2 text-body-1">
            {{ text }}
          </p>
        </v-layout>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'JcsoftLoading',
    props: {
      text: {
        type: String,
        default: () => '正在加载中...',
      },
    },
    data() {
      return {
        loading: true,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .jcsoft-loading {
    .jcsoft-loading-text {
      margin-top: revert;
    }
  }
</style>
