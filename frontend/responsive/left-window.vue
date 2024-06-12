<template>
  <view class="container">
    <view style="display: flex;flex-direction: column;justify-content: space-between;height: 100%;">
      <view style="padding: 20px 0;display: flex;align-items: center;">
        <image src="../static/logo.png" style="width: 70px;flex-shrink: 0;" mode="widthFix"></image>
        <view>
          <view style="margin: 10px;font-weight: bold;">简传</view>
          <view style="margin: 10px;font-size: 14px;color: #686868;">简单使用，传递方便</view>
        </view>
      </view>
      <view style="font-size: 12px;color: #686868;">
        <view style="margin-top: 10px;">
          <uni-link href="http://www.channer.cn/easysend">版本 1.0.5（持续更新中）</uni-link>
        </view>
        <view style="margin-top: 10px;">
          Copyright © 2024 EasySend. All Rights Reserved.
        </view>
      </view>
    </view>
  </view>
</template>

<script>
</script>

<style scoped>
  .container {
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
  }
</style>