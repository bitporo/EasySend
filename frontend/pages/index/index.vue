<template>
  <div class="content">
    <div ref="scrollView" style="flex: 1;overflow-y: scroll;">
      <div class="item-container" v-for="data in messageList" :key="data.id">
        <div class="time">{{ data.dateTime }}</div>
        <div class="item-content">
          <div v-if="data.type == 'text'">
            {{ data.content }}
          </div>
          <div v-else-if="data.type == 'file'"
            style="display: flex;align-items: center;justify-content: space-between;">
            <div style="background-color: white;padding: 10px;width: 40%;">
              <uni-icons type="paperclip"></uni-icons>
              <text style="color: black;">{{ data.fileData.originalFilename }}</text>
              <div>
                <progress v-if="onItemId == data.id" :percent="downLoadProcess" stroke-width="3" />
              </div>
            </div>
            <span>{{ computeSize(data.fileData.size) }}</span>
            <div>
              <button type="primary" size="mini" @click="handleDownLoadFile(data)">下载</button>
            </div>
          </div>
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
        scrollElement: null,
        downLoadProcess: 0,
        onItemId: ''
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
        if (!this.contentValue && !fileData) {
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
          url: '/message/addMessageData',
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
          const that = this
          const uploadTask = uni.uploadFile({
            url: '/message/uploadFile', //仅为示例，非真实的接口地址
            filePath: res.tempFilePaths[0],
            name: 'file',
            success: (uploadFileRes) => {
              const resObj = JSON.parse(uploadFileRes.data)
              // this.contentValue = resObj.data.originalFilename
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
          url: '/message/getMessageList',
          method: 'GET'
        }).then(res => {
          this.messageList = res.data
          nextTick(() => {
            this.scrollElement.scrollTop = this.scrollElement.scrollHeight
          })
        })
      },
      computeSize(size) {
        if (size >= 1024) {
          if (size >= 1024 * 1024) { //大于等于1M
            return (size / 1024 / 1024).toFixed(2) + 'M'
          } else { // 不足1M
            return (size / 1024).toFixed(2) + 'KB'
          }
        } else {
          return size + 'B'
        }
      },
      handleDownLoadFile(itemData) {
        const url = '/message/downLoadFile' +
          `?path=${encodeURIComponent(itemData.fileData.filepath)}&name=${encodeURIComponent(itemData.fileData.originalFilename)}`
        this.onItemId = itemData.id
        const downloadTask = uni.downloadFile({
          url: url, //仅为示例，并非真实的资源
          success: (res) => {   
            this.onItemId = ''
            const a = document.createElement('a')
            a.href = res.tempFilePath
            a.download = itemData.fileData.originalFilename
            a.click()
          }
        });
        downloadTask.onProgressUpdate((res) => {
          this.downLoadProcess = (res.totalBytesWritten / itemData.fileData.size) * 100
        });
      }
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