<template>
  <div class="JcsoftAlert">
    <template v-for="(item, ind) in alertPool">
      <v-dialog
        :key="ind"
        :ref="'JcsoftAlert-' + item.index"
        :value="item.value"
        width="500"
      >
        <v-card>
          <v-card-title v-if="item.title">{{ item.title }}</v-card-title>
          <v-card-text>
            {{ item.content }}
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="yes(item.index, item.yes)">
              确认
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
  import store from '../../../store'

  export default {
    name: 'JcsoftAlert',
    data() {
      return {}
    },
    computed: {
      alertPool: () => {
        return store.getters['notice/alert'].pool || []
      },
    },
    methods: {
      yes(index, fn) {
        if (typeof fn === 'function') {
          let result = fn(index, this)
          // 如果回调函数返回了false，则终止关闭弹窗
          if (result === false) {
            return false
          }
        }
        store.dispatch('notice/closeAlert', index)
      },
      close(index) {
        store.dispatch('notice/closeAlert', index)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .JcsoftAlert {
    top: 10px;
    left: 50%;
    z-index: 9999;
    display: flex;
    position: fixed;
    min-width: 300px;
    max-width: 460px;
    flex-direction: column;
    transform: translateX(-50%);
  }
</style>
