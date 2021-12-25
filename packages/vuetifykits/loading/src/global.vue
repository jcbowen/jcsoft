<template>
  <div class="JcsoftLoading">
    <v-fade-transition group>
      <template v-for="(item, ind) in loadingPool">
        <v-overlay
          v-if="item.type === 'overlay'"
          :key="ind"
          class="jcsoft-loading"
          :color="item.background"
          :opacity="1"
          :style="item.typeIndex !== 1 ? 'text-align: center' : ''"
          :value="item.value"
        >
          <v-card
            v-if="item.typeIndex === 1"
            color="primary"
            dark
            width="300px"
          >
            <v-card-text>
              {{ item.text }}
              <v-progress-linear class="mb-0" color="white" indeterminate />
            </v-card-text>
          </v-card>
          <template v-else>
            <v-progress-circular color="primary" indeterminate size="48" />
            <p
              class="jcsoft-loading-text grey--text text--darken-2 text-body-1"
            >
              {{ item.text }}
            </p>
          </template>
        </v-overlay>
        <v-dialog v-else :key="ind" v-model="item.value" fullscreen>
          <v-container
            class="jcsoft-loading"
            fill-height
            fluid
            :style="'background-color: ' + item.background"
          >
            <v-layout align-center column justify-center>
              <v-card
                v-if="item.typeIndex === 1"
                color="primary"
                dark
                width="300px"
              >
                <v-card-text>
                  {{ item.text }}
                  <v-progress-linear class="mb-0" color="white" indeterminate />
                </v-card-text>
              </v-card>
              <template v-else>
                <v-progress-circular color="primary" indeterminate size="48" />
                <p
                  class="jcsoft-loading-text grey--text text--darken-2 text-body-1"
                >
                  {{ item.text }}
                </p>
              </template>
            </v-layout>
          </v-container>
        </v-dialog>
      </template>
    </v-fade-transition>
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
      loadingPool: () => {
        return store.getters['notice/loading'].pool || []
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
