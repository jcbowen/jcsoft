<template>
  <div class="other-notice">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" sm="6">
          <v-card class="pa-2" elevation="3" flat outlined tile>
            <v-card-title>默认 Loading</v-card-title>
            <v-card-subtitle>仅遮罩app范围</v-card-subtitle>
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col v-for="ind in 2" :key="ind">
                    <v-btn
                      color="primary"
                      :disabled="loading"
                      :loading="loading"
                      @click="openLoading(ind - 1)"
                    >
                      {{ ind === 1 ? '默认效果' : '效果' + (ind - 1) }}
                    </v-btn>
                  </v-col>
                  <v-spacer />
                  <v-spacer />
                  <v-spacer />
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="6">
          <v-card class="pa-2" elevation="3" flat outlined tile>
            <v-card-title>dialog Loading</v-card-title>
            <v-card-subtitle>遮罩全屏</v-card-subtitle>
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col v-for="ind in 2" :key="ind">
                    <v-btn
                      color="primary"
                      :disabled="loading"
                      :loading="loading"
                      @click="openLoading2(ind - 1)"
                    >
                      {{ ind === 1 ? '默认效果' : '效果' + (ind - 1) }}
                    </v-btn>
                  </v-col>
                  <v-spacer />
                  <v-spacer />
                  <v-spacer />
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  import notice from 'jcsoft/packages/utils/modules/notice'
  export default {
    data() {
      return {
        loader: null,
        loading: false,
      }
    },
    created() {
      window.VM = this
    },
    methods: {
      openLoading(ind, opt) {
        opt = {
          text: opt,
        }
        return notice.load(ind, opt)
      },
      openLoading2(ind, opt) {
        opt = {
          text: opt,
          type: 'dialog',
        }
        return notice.load(ind, opt)
      },
    },
  }
</script>
