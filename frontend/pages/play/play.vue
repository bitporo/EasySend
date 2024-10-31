<template>
  <view style="display: flex;flex-direction: column;height: 100vh;justify-content: center;">
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
      uni.showLoading({
        title: '视频加载中'
      })
    },
    methods: {
      playWait(event){
        uni.hideLoading()
      }
    }
  }
</script>

<style>

</style>