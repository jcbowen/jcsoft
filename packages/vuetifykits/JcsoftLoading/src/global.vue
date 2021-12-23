<template>
  <div class="JcsoftLoading">
    <v-dialog v-model="loadingStatus" fullscreen>
      <v-container
        class="jcsoft-loading"
        fill-height
        fluid
        :style="'background-color: ' + loadingBackground"
      >
        <v-layout align-center column justify-center>
          <v-card v-if="loadingIndex === 1" color="primary" dark width="300px">
            <v-card-text>
              {{ loadingText }}
              <v-progress-linear class="mb-0" color="white" indeterminate />
            </v-card-text>
          </v-card>
          <template v-else>
            <v-progress-circular color="primary" indeterminate size="48" />
            <p
              class="jcsoft-loading-text grey--text text--darken-2 text-body-1"
            >
              {{ loadingText }}
            </p>
          </template>
        </v-layout>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
  import store from '../../../store'
  export default {
    name: 'JcsoftLoading',
    data() {
      return {}
    },
    computed: {
      loadingIndex: () => {
        return store.getters['notice/loading'].typeIndex || 0
      },
      loadingStatus: () => {
        return store.getters['notice/loading'].status || false
      },
      loadingText: () => {
        return store.getters['notice/loading'].text || '正在加载中...'
      },
      loadingBackground: () => {
        return (
          store.getters['notice/loading'].background || 'hsla(0, 0%, 100%, 0.8)'
        )
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
