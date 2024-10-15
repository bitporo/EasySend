<template>
  <view style="display: flex;flex-direction: column;height: 100vh;justify-content: center;">
    <video :src="playUrl" style="width: 100%;height: 50%;"></video>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        playUrl: ''
      }
    },
    onLoad(option) {
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on('playUrl', (data) => {
        this.playUrl = data.url
      })
    }
  }
</script>

<style>

</style>