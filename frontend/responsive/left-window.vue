<template>
  <view class="container">
    <view style="display: flex;flex-direction: column;justify-content: space-between;height: 100%;">
      <view style="padding: 20px 0;display: flex;align-items: center;">
        <image src="../static/logo.png" style="width: 80px;flex-shrink: 0;" mode="widthFix"></image>
        <view>
          <view style="margin: 10px;font-weight: bold;">简传</view>
          <view style="margin: 10px;font-size: 14px;color: #686868;">便捷的局域网共享小软件，使用起来简单，仅需一处安装就能多端共享传送，无需联网，支持文本文件传输</view>
        </view>
      </view>
      <view style="font-size: 12px;color: #686868;">
        <view style="margin-top: 10px;">
          <uni-link href="https://easysend.channer.cn">版本 1.0.0（持续更新中）</uni-link>
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