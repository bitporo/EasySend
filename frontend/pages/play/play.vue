<template>
  <view style="display: flex;flex-direction: column;height: 100vh;justify-content: center;">
    <view v-if="waiting" style="padding: 20px 0;text-align: center;">正在加载视频请稍等...</view>
    <video v-if="playUrl" :src="playUrl" style="width: 100%;height: 100%;" @waiting="playWait" @loadedmetadata="playWait"></video>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        playUrl: '',
        waiting: true
      }
    },
    onLoad(option) {
      this.playUrl = option.url
    },
    methods: {
      playWait(event){
        this.waiting = false
        console.log(event.detail )
      }
    }
  }
</script>

<style>

</style>