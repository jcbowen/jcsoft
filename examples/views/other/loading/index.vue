<template>
  <div class="other-notice">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" sm="6">
          <v-card class="pa-2" elevation="3" flat outlined tile>
            <v-card-title>默认 Loading</v-card-title>
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col v-for="(item, ind) in items" :key="ind">
                    <v-btn
                      color="primary"
                      :disabled="loading"
                      :loading="loading"
                      @click="openLoading(ind)"
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
      </v-row>
    </v-container>
  </div>
</template>
<script>
  import store from '../../../../packages/store'
  import notice from 'jcsoft/packages/utils/modules/notice'
  export default {
    data() {
      return {
        loader: null,
        loading: false,
        items: [
          { ind: 0, title: '默认效果' },
          { ind: 1, title: '效果1' },
        ],
      }
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
      get() {
        console.log(store.getters['notice/message'].pool)
      },
    },
  }
</script>
