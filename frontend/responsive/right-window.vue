<template>
  <view class="right-content">
    <Card style="background-color: var(--p-primary-secondary-color);">
      <template #content>
        <view style="color: var(--p-primary-color);">
          <view class="intro-title">共享访问地址：</view>
          <view v-for="(url, inedx) in urlList" style="margin-bottom: 10px;">
            <uni-link :href="url" color="var(--p-primary-color)">
              <text ref="urlLink">{{ url }}</text>
            </uni-link>
            <i class="pi pi-clone icon-button" @click="onCopy(inedx)"></i>
            <i class="pi pi-qrcode icon-button" @click="onQrcode(`${url}/#/pages/qrcode/qrcode?url=${url}`)"></i>
          </view>
        </view>
      </template>
    </Card>
    <view>
      <Accordion>
        <AccordionPanel value="0">
          <AccordionHeader>反馈交流</AccordionHeader>
          <AccordionContent class="intro-content">
            <view>
              <text>
                加作者微信进群，或QQ群: 793644362
              </text>
              <view style="background-color: #f5f5f5;padding: 10px;margin-top: 10px;">
                <image src="../static/wx.png" style="width: 50%;" mode="aspectFit"></image>
                <image src="../static/qun.jpg" style="width: 50%;" mode="aspectFit"></image>
              </view>
            </view>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1">
          <AccordionHeader>使用方法</AccordionHeader>
          <AccordionContent class="intro-content">
            <view>只需在一台主机上启动软件，其余客户端使用浏览器访问“共享访问地址”即可，支持拖拽发送文件，支持点击图片预览，右键全选复制文本、删除消息，若需要复制图片请在浏览器端，点击图片后右键复制</view>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="2">
          <AccordionHeader>适用场景</AccordionHeader>
          <AccordionContent class="intro-content">
            <view>局域网文本文件共享、虚拟机与宿主机共享、电脑手机共享等</view>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="3">
          <AccordionHeader>注意事项</AccordionHeader>
          <AccordionContent class="intro-content">
            <view>
              本软件传送的任何文本、文件均保存在本地，不获取上传任何发送的数据至云端，请放心使用，但请注意谨慎发送敏感文本及文件（局域网任何人都能访问到），禁止用于违法犯罪活动，概不承担使用本软件造成的损失责任问题，有使用问题及软件问题欢迎加入QQ群反馈
            </view>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="4">
          <AccordionHeader>赞助作者</AccordionHeader>
          <AccordionContent class="intro-content">
            <view style="text-align: center;">
              <image src="../static/wxalipay.jpg" style="width: 100%;" mode="aspectFit"></image>
              <view>如果本软件帮到了您，可赞助作者</view>
            </view>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </view>
  </view>
</template>

<script>
  import Card from 'primevue/card';
  import Accordion from 'primevue/accordion';
  import AccordionPanel from 'primevue/accordionpanel';
  import AccordionHeader from 'primevue/accordionheader';
  import AccordionContent from 'primevue/accordioncontent';
  export default {
    components: {
      Card,
      Accordion,
      AccordionPanel,
      AccordionHeader,
      AccordionContent
    },
    data() {
      return {
        urlList: []
      }
    },
    mounted() {
      this.getHost()
      this.getMyHost()
    },
    methods: {
      getHost() {
        uni.request({
          url: `http://${window.location.hostname}:7071/api` + '/system/getHostIp',
          method: 'GET'
        }).then(res => {
          const ipList = res.data.filter(item => {
            const arr = item.split('.')
            // 判断ip最后一位是否为1
            return !(/^1$/.test(arr[arr.length - 1]))
          })
          this.urlList = ipList.map(ip => `http://${ip}:7072`)
        })
      },
      getMyHost() {
        uni.request({
          url: `http://${window.location.hostname}:7071/api` + '/system/getMyIp',
          method: 'GET'
        }).then(res => {
          getApp().globalData.myIp = res.data.ip
        })
      },
      onCopy(index) {
        window.getSelection().selectAllChildren(this.$refs.urlLink[index].$el)
        document.execCommand('copy')
        uni.showToast({
          icon: 'none',
          title: '已复制'
        })
      },
      onQrcode(url) {
        window.open(url)
      }
    }
  }
</script>

<style scoped>
  .right-content {
    font-size: 14px;
    padding: 20px;
    display: flex;
    box-sizing: border-box;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
  }

  .intro-title {
    /* padding: 10px 0; */
    margin-bottom: 10px;
    font-weight: bold;
  }

  .intro-content {
    background-color: var(--p-highlight-color);
    /*    padding: 15px;
    color: #666666; */
  }

  .icon-button {
    cursor: pointer;
    margin-left: 10px;
  }
</style>