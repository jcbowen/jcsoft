<template>
  <div class="other-notice">
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-card class="pa-2" elevation="3" flat outlined tile>
            <v-card-title>Alert 警告</v-card-title>
            <v-card-text>
              <v-alert dense dismissible outlined text type="success">
                成功提示的文案
              </v-alert>
              <v-alert dense dismissible outlined text type="info">
                消息提示的文案
              </v-alert>
              <v-alert dense dismissible outlined text type="warning">
                警告提示的文案
              </v-alert>
              <v-alert dense dismissible outlined text type="error">
                错误提示的文案
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="pa-2" elevation="3" flat outlined tile>
            <v-card-title>Message 消息提示</v-card-title>
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col>
                    <v-btn
                      color="info"
                      :disabled="loading"
                      :loading="loading"
                      @click="loader = 'loading'"
                    >
                      消息
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="success"
                      :disabled="loading"
                      :loading="loading"
                      @click="loader = 'loading'"
                    >
                      成功
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="warning"
                      :disabled="loading"
                      :loading="loading"
                      @click="loader = 'loading'"
                    >
                      警告
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="error"
                      :disabled="loading"
                      :loading="loading"
                      @click="loader = 'loading'"
                    >
                      错误
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
        <v-col cols="4">
          <v-card class="pa-2" elevation="3" flat outlined tile>
            <v-card-title>Notification Message 消息提示</v-card-title>
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col>
                    <v-btn
                      color="info"
                      :disabled="loading"
                      :loading="loading"
                      @click="loader = 'loading'"
                    >
                      消息
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="success"
                      :disabled="loading"
                      :loading="loading"
                      @click="loader = 'loading'"
                    >
                      成功
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="warning"
                      :disabled="loading"
                      :loading="loading"
                      @click="loader = 'loading'"
                    >
                      警告
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="error"
                      :disabled="loading"
                      :loading="loading"
                      @click="loader = 'loading'"
                    >
                      错误
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
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false,
      }
    },
    watch: {
      loader() {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
    created() {
      window.VM = this
    },
    methods: {
      openLoading(ind, opt) {
        return notice.load(ind, opt)
      },
      closeLoading() {
        notice.loadClose()
      },
    },
  }
</script>
