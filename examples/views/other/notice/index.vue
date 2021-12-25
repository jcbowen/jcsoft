<template>
  <div class="other-notice">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" sm="6">
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
        <v-col cols="12" md="4" sm="6">
          <v-card class="pa-2" elevation="3" flat outlined tile>
            <v-card-title>Message 消息提示</v-card-title>
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col v-for="(item, ind) in items" :key="ind">
                    <v-btn
                      :color="item.type"
                      :disabled="loading"
                      :loading="loading"
                      @click="callMsg(item)"
                    >
                      {{ item.title }}
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
            <v-card-title>Alert 普通信息框</v-card-title>
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col v-for="(item, ind) in alertItems" :key="ind">
                    <v-btn
                      :color="item.type"
                      :disabled="loading"
                      :loading="loading"
                      @click="callAlert(item)"
                    >
                      {{ item.title }}
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
        <!-- <v-col cols="4">
          <v-card class="pa-2" elevation="3" flat outlined tile>
            <v-card-title>Notification Message 消息提示</v-card-title>
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col v-for="(item, ind) in items" :key="ind">
                    <v-btn
                      :color="item.type"
                      :disabled="loading"
                      :loading="loading"
                      @click="loader = 'loading'"
                    >
                      {{ item.title }}
                    </v-btn>
                  </v-col>
                  <v-spacer />
                  <v-spacer />
                  <v-spacer />
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>-->
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
        items: [
          { type: undefined, title: '默认' },
          { type: 'info', title: '消息' },
          { type: 'success', title: '成功' },
          { type: 'warning', title: '警告' },
          { type: 'error', title: '错误' },
        ],
        alertItems: [
          { type: 'primary', title: '默认', content: '这是一条消息' },
          {
            type: 'primary',
            title: '修改标题',
            content: '标题可以任意设置',
            opt: {
              title: '自定义标题',
            },
            yes: null,
          },
          {
            type: 'primary',
            title: '延迟关闭',
            content: '可以通过确认回调，进行延迟关闭',
            opt: {},
            yes: (index, alert) => {
              notice.message('将在3秒后关闭')
              setTimeout(() => {
                alert.close(index)
              }, 3000)
              return false
            },
          },
        ],
      }
    },
    methods: {
      callMsg(item) {
        notice.message(item.title, item.type)
      },
      callAlert(item) {
        notice.alert(item.content, item.opt, item.yes)
      },
    },
  }
</script>
