<template>
  <view class="qrcode-content">
    <view>
      <view class="title"><text>扫码访问</text></view>
      <uqrcode ref="uqrcode" canvas-id="qrcode" :value="codeUrl" :options="{ margin: 10 }"></uqrcode>
    </view>
  </view>
</template>

<script setup>
  import {
    onLoad
  } from '@dcloudio/uni-app'
  import {
    ref
  } from 'vue';
  const codeUrl = ref('')
  onLoad((query) => {
    codeUrl.value = query.url
  })
</script>

<style scoped lang="scss">
  .qrcode-content {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    text-align: center;
    padding: 10px 0;
  }
</style>