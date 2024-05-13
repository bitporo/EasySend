<template>
  <div class="content">
    <div ref="scrollView" style="flex: 1;overflow-y: scroll;">
      <div class="item-container" v-for="data in messageList" :key="data.id">
        <div class="time">{{ data.dateTime }}</div>
        <div class="item-content">
          {{ data.content }}
        </div>
      </div>
    </div>
    <div style="display: flex;align-items: end;gap: 10px;padding: 20px;">
      <uni-easyinput type="textarea" v-model="contentValue" :maxlength="-1" placeholder="请输入内容"></uni-easyinput>
      <div>
        <div>
          <button size="mini" @click="handleFileSend">传文件</button>
        </div>
        <button type="primary" size="mini" :loading="loading" @click="handleSend()" style="width: 100%;">发送</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    nextTick
  } from 'vue'
  export default {
    data() {
      return {
        textMode: true, // 1：文本，2：文件
        contentValue: '',
        loading: false,
        messageList: [],
        baseUrl: `http://${window.location.hostname}:7071`,
        scrollElement: null
      }
    },
    onLoad() {

    },
    mounted() {
      this.scrollElement = this.$refs.scrollView
      this.getMessageList()
    },
    methods: {
      handleSend(fileData) {
        if (!this.contentValue) {
          uni.showToast({
            icon: 'error',
            title: '内容不能为空！'
          })
          return
        }
        this.loading = true
        const sendData = {
          type: fileData ? 'file' : 'text',
          dateTime: new Date().toLocaleString(),
          content: this.contentValue,
          fileData
        }
        uni.request({
          url: this.baseUrl + '/api/message/addMessageData',
          method: 'POST',
          data: {
            data: sendData
          }
        }).then(res => {
          this.loading = false
          this.contentValue = ''
          this.getMessageList()
        })
      },
      handleFileSend() {
        uni.chooseFile().then((res) => {
          console.log(res.tempFilePaths);
          const that = this
          const uploadTask = uni.uploadFile({
            url: this.baseUrl + '/api/message/uploadFile', //仅为示例，非真实的接口地址
            filePath: res.tempFilePaths[0],
            name: 'file',
            success: (uploadFileRes) => {
              const resObj = JSON.parse(uploadFileRes.data)
              this.contentValue = resObj.data.originalFilename
              that.handleSend(resObj.data)
            }
          });
          uploadTask.onProgressUpdate((res) => {
            console.log('上传进度' + res.progress);
            console.log('已经上传的数据长度' + res.totalBytesSent);
            console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
          });
        });
      },
      getMessageList() {
        uni.request({
          url: this.baseUrl + '/api/message/getMessageList',
          method: 'GET'
        }).then(res => {
          this.messageList = res.data
          nextTick(() => {
            this.scrollElement.scrollTop = this.scrollElement.scrollHeight
          })
        })
      },
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: white;
  }

  .item-container {
    padding: 20px;
  }

  .time {
    text-align: center;
    font-size: 12px;
    color: #888888;
  }

  .item-content {
    margin-top: 10px;
    background-color: #536899;
    padding: 10px;
    color: white;
    border-radius: 8px;
  }

  .scroll {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
  }
</style>