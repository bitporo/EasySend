<template>
  <div class="content" @dragenter="handleDragEnter">
    <div ref="scrollView" class="scroll-view">
      <div class="item-container" v-for="data in messageList" :key="data.id">
        <div class="time">{{ data.dateTime }}</div>
        <div class="item-content">
          <view v-if="data.type == 'text'">
            <!-- {{ data.content }} -->
            <text class="content-text">
              {{ data.content }}
            </text>
          </view>
          <div v-else-if="data.type == 'file'" class="file-container">
            <div class="file-block">
              <div class="file-name">
                <IconFile />
                <text class="content-text" style="color: black">{{ data.fileData.originalFilename }}</text>
              </div>
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
    <div class="input-module">
      <uni-easyinput type="textarea" v-model="contentValue" :maxlength="-1" placeholder="请输入内容"></uni-easyinput>
      <div>
        <div>
          <button size="mini" @click="handleFileChoose">传文件</button>
        </div>
        <button type="primary" size="mini" :loading="loading" @click="handleSend()" style="width: 100%;">发送</button>
      </div>
    </div>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog mode="base" type="warning" title="上传进度" :showClose="false" confirm-text="取消"
        @confirm="cancelUpload">
        <progress style="width: 100%;" :percent="uploadProcess" stroke-width="3" />
      </uni-popup-dialog>
    </uni-popup>
    <div class="dragMask" @dragleave="handleDragLeave" @dragover="handleDragOver" @drop="handleDrop" v-if="hasEnter">
      放开拖拽将上传文件，若不想上传请移出，若多文件只会上传第一个
    </div>
  </div>
</template>
<script>
  import {
    nextTick
  } from 'vue'
  import IconFile from './IconFile.vue'
  export default {
    components: {
      IconFile
    },
    data() {
      return {
        textMode: true, // 1：文本，2：文件
        contentValue: '',
        loading: false,
        messageList: [],
        scrollElement: null,
        downLoadProcess: 0,
        uploadProcess: 0,
        onItemId: '',
        baseUrl: `http://${window.location.hostname}:7071/api`,
        uploadTask: null,
        hasEnter: false,
      }
    },
    onLoad() {

    },
    mounted() {
      this.scrollElement = this.$refs.scrollView
      this.getMessageList()
      this.initSSE()
    },
    methods: {
      initSSE() {
        const eventSource = new EventSource(`http://${window.location.hostname}:7080/sse`);
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data)
          if(data.content == 'Can refresh'){
            // 收到刷新通知，获取新消息
            this.getMessageList()
          }
        };
        eventSource.onerror = (error) => {
          console.error('Error occurred:', error);
        };
      },
      handleDragEnter(e) {
        if (this.hasEnter) {
          return
        }
        e.preventDefault();
        this.hasEnter = true
      },
      handleDragOver(e) {
        e.preventDefault(); // 必须阻止默认行为，以便drop事件能被触发
      },
      handleDragLeave(e) {
        this.hasEnter = false
      },
      handleDrop(e) {
        this.hasEnter = false
        this.$refs.popup.open()
        e.preventDefault(); // 阻止浏览器默认处理文件拖放
        // 获取拖放的文件
        const files = Array.from(e.dataTransfer.files);
        // 暂时只传第一个文件，以后可以完善多文件
        this.uploadTask = uni.uploadFile({
          url: this.baseUrl + '/message/uploadFile', //仅为示例，非真实的接口地址
          file: files[0],
          success: (uploadFileRes) => {
            const resObj = JSON.parse(uploadFileRes.data)
            this.handleSend(resObj.data)
            this.$refs.popup.close()
          }
        });
        this.uploadTask.onProgressUpdate((res) => {
          this.uploadProcess = res.progress
        });
      },
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
          url: this.baseUrl + '/message/addMessageData',
          method: 'POST',
          data: {
            data: sendData
          }
        }).then(res => {
          this.loading = false
          this.contentValue = ''
          // this.getMessageList()
        })
      },
      handleFileChoose() {
        uni.chooseFile().then((res) => {
          const that = this
          this.$refs.popup.open()
          this.uploadTask = uni.uploadFile({
            url: this.baseUrl + '/message/uploadFile', //仅为示例，非真实的接口地址
            filePath: res.tempFilePaths[0],
            name: 'file',
            success: (uploadFileRes) => {
              const resObj = JSON.parse(uploadFileRes.data)
              that.handleSend(resObj.data)
              this.$refs.popup.close()
            }
          });
          this.uploadTask.onProgressUpdate((res) => {
            this.uploadProcess = res.progress
          });
        });
      },
      cancelUpload() {
        this.uploadTask.abort();
      },
      getMessageList() {
        uni.request({
          url: this.baseUrl + '/message/getMessageList',
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
        const url = this.baseUrl + '/message/downLoadFile' +
          `?path=${encodeURIComponent(itemData.fileData.filepath)}&name=${encodeURIComponent(itemData.fileData.originalFilename)}`
        this.onItemId = itemData.id
        const downloadTask = uni.downloadFile({
          url: url,
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
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: white;

    .scroll-view {
      flex: 1;
      overflow-y: scroll;
    }
  }

  .item-container {
    padding: 20px;

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
  }

  .content-text {
    word-break: break-all;
  }

  .file-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .file-block {
      background-color: white;
      padding: 10px;
      width: 40%;
      border-radius: 8px;

      .file-name {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }

  .input-module {
    display: flex;
    align-items: end;
    gap: 10px;
    padding: 20px;
  }

  .dragMask {
    background-color: #000000aa;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
</style>