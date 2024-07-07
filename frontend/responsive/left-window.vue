<template>
  <view class="container">
    <view style="display: flex;flex-direction: column;justify-content: space-between;height: 100%;">
      <view style="display: flex;align-items: center;">
        <!-- <image src="@/static/logo.png" style="width: 50px;flex-shrink: 0;" mode="widthFix"></image> -->
        <Logo style="width: 50px;height: 50px;" />
        <view>
          <view style="margin: 10px;font-weight: bold;color: var(--p-primary-color);">简传</view>
          <view style="margin: 10px;font-size: 14px;color: var(--p-primary-active-color);">简捷使用，传送方便</view>
        </view>
      </view>
      <view style="font-size: 12px;color: #686868;">
        <view style="display: flex;gap: 10px;">
          <!-- <Button icon="pi pi-palette" text raised rounded aria-label="Theme" @click="changePrimaryColor"/> -->
          <!-- <Button icon="pi pi-sun" text raised rounded aria-label="Toggle" @click="toggleColorScheme()"/> -->
          <Button icon="pi pi-language" text raised rounded aria-label="Language" />
        </view>
        <view style="margin-top: 10px;">
          <uni-link href="https://easysend.channer.cn/">版本 1.2.1（持续更新中）</uni-link>
        </view>
        <view style="margin-top: 10px;">
          Copyright © 2024 EasySend. All Rights Reserved.
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import Button from "primevue/button"
  import Logo from './icons/Logo.vue'
</script>

<style scoped>
  .container {
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
  }
</style>