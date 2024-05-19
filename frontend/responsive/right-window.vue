<template>
  <view class="right-content">
    <view>
      共享访问地址：
    </view>
    <view v-for="ip in ipList">
      <uni-link :href="`http://${ip}:7072`" :text="`http://${ip}:7072`"></uni-link>
    </view>
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
    padding: 20px;
  }
</style>