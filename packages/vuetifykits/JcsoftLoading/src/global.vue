<template>
  <div class="JcsoftLoading">
    <v-dialog v-model="loadingStatus" fullscreen>
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
  import store from '../../../store'
  export default {
    name: 'JcsoftLoading',
    props: {
      text: {
        type: String,
        default: () => '正在加载中...',
      },
    },
    data() {
      return {}
    },
    computed: {
      loadingStatus: {
        get() {
          return store.getters['notice/loading'].status
        },
        set(loadingStatus) {
          return loadingStatus
        },
      },
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
