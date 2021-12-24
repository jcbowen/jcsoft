<template>
  <div class="JcsoftMessage">
    <v-scroll-y-reverse-transition group>
      <template v-for="(item, ind) in messagePool">
        <div
          :key="ind"
          :style="
            item.outlined || item.text
              ? 'background-color: #fff; border-radius: 4px'
              : ''
          "
        >
          <v-alert
            :color="item.color"
            :dark="item.dark"
            :dense="item.dense"
            :dismissible="item.dismissible"
            :elevation="item.elevation"
            :height="item.height"
            :icon="item.icon"
            :max-height="item.maxHeight"
            :max-width="item.maxWidth"
            :outlined="item.outlined"
            :text="item.text"
            transition="scale-transition"
            :type="item.type"
            :value="item.value"
            :width="item.width"
          >
            {{ item.message }}
          </v-alert>
        </div>
      </template>
    </v-scroll-y-reverse-transition>
  </div>
</template>

<script>
  import store from '../../../store'
  export default {
    name: 'JcsoftMessage',
    data() {
      return {}
    },
    computed: {
      messagePool: () => {
        return store.getters['notice/message'].pool
      },
    },
  }
</script>

<style lang="scss" scoped>
  .JcsoftMessage {
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
