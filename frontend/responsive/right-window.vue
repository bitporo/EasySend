<template>
  <view class="right-content">
    <view class="intro-title">共享访问地址：</view>
    <view v-for="ip in ipList">
      <uni-link :href="`http://${ip}:7072`" :text="`http://${ip}:7072`" color="#007BFF"></uni-link>
    </view>
    <view class="intro-title">反馈交流</view>
    <view class="intro-content">QQ群: 3233634619</view>
    <view class="intro-title">使用方法</view>
    <view class="intro-content">使用浏览器访问“共享访问地址”即可</view>
    <view class="intro-title">适用场景</view>
    <view class="intro-content">局域网文文本文件共享、虚拟机与宿主机共享等</view>
    <view class="intro-title">注意事项</view>
    <view class="intro-content">本软件传送的任何文本文件均在本地，不获取上传任何用户数据至网络，请放心使用，但请注意谨慎发送敏感文本及文件（局域网任何人都可以访问），以及禁止用于违法犯罪活动，也概不承担使用本软件造成的损失责任问题，有使用问题及软件问题欢迎加入QQ群反馈</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        ipList: []
      }
    },
    mounted() {
      this.getHost()
    },
    methods: {
      getHost() {
        console.log(this.baseUrl)
        uni.request({
          url: `http://${window.location.hostname}:7071/api` + '/system/getHostIp',
          method: 'GET'
        }).then(res => {
          this.ipList = res.data.filter(item => {
            const arr = item.split('.')
            // 判断ip最后一位是否为1
            return !(/^1$/.test(arr[arr.length - 1]))
          })
        })
      },
    }
  }
</script>

<style scoped>
  .right-content {
    font-size: 14px;
    padding: 20px;
  }
  .intro-title{
    padding: 10px 0;
    font-weight: bold;
  }
  .intro-content{
    color: #666666;
  }
</style>