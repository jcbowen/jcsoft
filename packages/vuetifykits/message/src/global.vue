<template>
  <div class="JcsoftMessage">
    <template v-for="(item, ind) in messagePool">
      <v-alert
        :key="ind"
        :dark="item.dark"
        dense
        :dismissible="item.dismissible"
        :elevation="item.elevation"
        :height="item.height"
        :icon="item.icon"
        :max-height="item.maxHeight"
        :max-width="item.maxWidth"
        transition="scale-transition"
        :type="item.type"
        :value="true"
        :width="item.width"
      >
        {{ item.message }}
      </v-alert>
    </template>
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
        console.log(store.getters['notice/message'].pool)
        return store.getters['notice/message'].pool
      },
    },
    methods: {
      test() {
        console.log(123)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .JcsoftMessage {
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
