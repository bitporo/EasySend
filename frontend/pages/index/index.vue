<template>
  <div class="content" @dragenter="handleDragEnter">
    <div ref="scrollView" class="scroll-view">
      <div class="item-container" v-for="(data, index) in messageList" :key="data.id">
        <div class="time">{{ data.dateTime }}</div>
        <div class="item-content" @contextmenu="onItemRightClick($event, data, index)">
          <view v-if="data.type == 'text'">
            <text :ref="`textRef${index}`" class="content-text">
              {{ data.content }}
            </text>
          </view>
          <div v-else-if="data.type == 'file'" class="file-container">
            <div class="file-block" v-if="data.fileData.mimetype.includes('image')">
              <Image :src="getUrl(data)" alt="图片加载失败" width="100%" preview />
              <div style="margin-top: 5px;">
                <text class="content-text">{{ data.fileData.originalFilename }}</text>
              </div>
            </div>
            <div class="file-block" v-else>
              <div class="file-name">
                <i class="pi" :class="[getFileIconType(data.fileData.mimetype)]"></i>
                <text class="content-text">{{ data.fileData.originalFilename }}</text>
              </div>
              <div v-if="data.downLoadProcess" style="margin-top: 10px;">
                <progress :percent="data.downLoadProcess" stroke-width="3" activeColor="var(--p-primary-color)" />
              </div>
            </div>
            <Button v-if="data.fileData.mimetype.includes('video')" rounded icon="pi pi-play-circle" aria-label="播放"
              severity="secondary" @click="playVideo(data)" />
            <text style="color: var(--p-primary-contrast-color)">{{ computeSize(data.fileData.size) }}</text>
            <div>
              <Button icon="pi pi-download" aria-label="下载" severity="secondary" @click="handleDownLoadFile(data)" />
            </div>
          </div>
          <view v-if="data.ip" style="margin-top: 5px;"><text
              style="font-size: 12px;color: var(--p-app-ip);">{{ipShow(data.ip)}}</text></view>
        </div>
      </div>
    </div>
    <div class="input-module">
      <Textarea v-model="contentValue" placeholder="请输入内容, Ctrl+Enter可快捷发送" rows="4" style="flex: 1;"
        @keyup.ctrl.enter="handleSend()" @keyup.ctrl.v="handleCopy" />
      <div style="display: flex;flex-direction: column;gap: 10px;">
        <Button icon="pi pi-file-arrow-up" aria-label="传文件" severity="secondary" @click="handleFileChoose" />
        <Button icon="pi pi-send" aria-label="传文本" :loading="loading" @click="handleSend()" />
      </div>
    </div>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog mode="base" type="warning" title="上传进度" :showClose="false" confirm-text="取消"
        @confirm="cancelUpload">
        <progress style="width: 100%;" :percent="uploadProcess" activeColor="var(--p-primary-color)" stroke-width="3" />
      </uni-popup-dialog>
    </uni-popup>
    <div class="dragMask" @dragleave="handleDragLeave" @dragover="handleDragOver" @drop="handleDrop" v-if="hasEnter">
      放开拖拽将上传文件，若不想上传请移出，若多文件只会上传第一个
    </div>
    <ContextMenu ref="contextMenuRef" :model="contextMenu" />
  </div>
</template>
<script>
  import {
    nextTick
  } from 'vue'
  import {
    ipc
  } from '@/utils/ipcRenderer';
  import IconFile from './IconFile.vue'
  import Button from "primevue/button"
  import Textarea from 'primevue/textarea';
  import ContextMenu from 'primevue/contextmenu';
  import Image from 'primevue/image';
  export default {
    components: {
      IconFile,
      Textarea,
      Button,
      ContextMenu,
      Image
    },
    data() {
      return {
        contentValue: '',
        loading: false,
        messageList: [],
        scrollElement: null,
        downLoadProcess: 0,
        uploadProcess: 0,
        onDownLoadItemId: '',
        onRightClickItem: '',
        baseUrl: `http://${window.location.hostname}:7071/api`,
        uploadTask: null,
        hasEnter: false,
        hasSelectContent: false, // 是否有选中文本
        contextMenu: [{
          visible: () => {
            return this.hasSelectContent
          },
          label: '复制',
          icon: 'pi pi-copy',
          command: () => {
            document.execCommand('copy')
            uni.showToast({
              icon: 'success',
              title: '已复制',
            })
          }
        }, {
          disabled: () => {
            if (getApp().globalData.myIp != '127.0.0.1' && getApp().globalData.myIp != window.location
              .hostname) { // 如果不是在主机访问
              return this.onRightClickItem?.ip != getApp().globalData.myIp // 则只有自己发布的才能删除
            } else {
              return false
            }
          },
          label: '删除',
          icon: 'pi pi-trash',
          command: () => {
            uni.showModal({
              title: '提示',
              content: '确认删除吗？',
              confirmColor: 'var(--p-primary-950)',
              cancelColor: 'var(--p-surface-500)',
              success: (res) => {
                if (res.confirm) {
                  this.deleteItems([this.onRightClickItem])
                }
              }
            })
          }
        }]
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
      getFileIconType(mimetype) {
        if (mimetype.includes('msword') || mimetype.includes('wordprocessing')) {
          return 'pi-file-word'
        } else if (mimetype.includes('powerpoint') || mimetype.includes('presentation')) {
          return 'pi-file'
        } else if (mimetype.includes('excel') || mimetype.includes('sheet')) {
          return 'pi-file-excel'
        } else if (mimetype.includes('pdf')) {
          return 'pi-file-pdf'
        } else {
          return 'pi-file'
        }
      },
      playVideo(itemData) {
        const url = this.getUrl(itemData)
        window.open(`/#/pages/play/play?url=${url}`)
        // uni.navigateTo({
        //   url: '/pages/play/play',
        //   success(res) {
        //     res.eventChannel.emit('playUrl', {
        //       url
        //     })
        //   }
        // })
      },
      handleCopy(e) {
        console.log(e);
      },
      ipShow(ip) {
        if (ip == '127.0.0.1' || getApp().globalData.ipList.includes(ip)) {
          return '主机'
        } else if (ip == getApp().globalData.myIp) {
          return '本机'
        } else {
          return ip
        }
      },
      initSSE() {
        const eventSource = new EventSource(`http://${window.location.hostname}:7080/sse`);
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data)
          if (data.content == 'Can refresh') {
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
        if (!e.dataTransfer.types.includes('Files')) {
          return
        }
        // console.log('handleDragEnter--->', e.dataTransfer.types)
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
          url: this.baseUrl + '/message/uploadFile',
          file: files[0],
          timeout: 1000 * 4000,
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
            url: this.baseUrl + '/message/uploadFile',
            filePath: res.tempFilePaths[0],
            name: 'file',
            timeout: 1000 * 4000,
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
      deleteItems(data) {
        uni.request({
          url: this.baseUrl + '/message/deleteMessages',
          method: 'POST',
          data: {
            data
          }
        }).then(res => {
          if (res.data.code == 200) {
            uni.showToast({
              icon: 'success',
              title: '消息删除成功！'
            })
          } else {
            uni.showToast({
              icon: 'error',
              title: res.data.message
            })
          }
        })
      },
      computeSize(size) {
        if (size >= 1024) {
          if (size >= 1024 * 1024) { //大于等于1M
            if (size >= 1024 * 1024 * 1024) {
              return (size / 1024 / 1024 / 1024).toFixed(2) + 'G'
            } else {
              return (size / 1024 / 1024).toFixed(2) + 'M'
            }
          } else { // 不足1M
            return (size / 1024).toFixed(2) + 'KB'
          }
        } else {
          return size + 'B'
        }
      },
      getUrl(itemData) {
        return this.baseUrl + '/message/downLoadFile' +
          `?fileName=${encodeURIComponent(itemData.fileData.newFilename)}&name=${encodeURIComponent(itemData.fileData.originalFilename)}&size=${itemData.fileData.size}`
      },
      handleDownLoadFile(itemData) {
        const url = this.getUrl(itemData)
        // 暂停使用通过接口获取文件数据再触发浏览器下载，因blob限制有大文件下载问题
        // const downloadTask = uni.downloadFile({
        //   url: url,
        //   success: (res) => {
        //     this.onDownLoadItemId = ''
        //     const a = document.createElement('a')
        //     a.href = res.tempFilePath
        //     a.download = itemData.fileData.originalFilename
        //     a.click()
        //   }
        // });
        // downloadTask.onProgressUpdate((res) => {
        //   this.downLoadProcess = (res.totalBytesWritten / itemData.fileData.size) * 100
        // });
        // window.open(url)

        // 在electron里，ipc存在
        if (ipc) {
          if (!!this.onDownLoadItemId) {
            uni.showToast({
              icon: 'error',
              title: '请等待其他文件下载完成！'
            })
            return
          }
          this.onDownLoadItemId = itemData.id
          // ipc.removeListener('progress');
          ipc.removeAllListeners('progress');
          ipc.on('progress', (event, result) => {
            // 下载成功提示
            if (result == 'success') {
              uni.showToast({
                icon: 'success',
                title: '下载完成！'
              })
              this.onDownLoadItemId = ''
            } else if (result == 'failed') {
              // 若下载失败或取消下载，重置进度条
              itemData.downLoadProcess = 0
              this.onDownLoadItemId = ''
            } else {
              // 下载进度
              itemData.downLoadProcess = result * 100
              if (itemData.downLoadProcess == 100) {
                itemData.downLoadProcess = 0
              }
            }
          })
        }
        const a = document.createElement('a')
        a.href = url
        a.click()
      },
      onItemRightClick(event, itemData, index) {
        const selection = window.getSelection();
        if (itemData.type == 'text') { // 如果是文本消息，则自动选中所有文本
          selection.removeAllRanges()
          const range = document.createRange()
          range.selectNode(this.$refs[`textRef${index}`][0].$el);
          selection.addRange(range)
          this.hasSelectContent = true
        } else if (selection.toString()) { // 如果是其他消息，但有文本选中
          this.hasSelectContent = true
        } else {
          this.hasSelectContent = false
        }
        this.onRightClickItem = itemData
        this.$refs.contextMenuRef.show(event);
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    // background-color: white;
    border: 1px solid var(--p-content-border-color);

    .scroll-view {
      flex: 1;
      overflow-y: scroll;
      // scrollbar-width: thin;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--p-surface-100);
    border-radius: 8px;
  }

  // ::-webkit-scrollbar-track {
  //   background: var(--p-surface-100);
  //   border-radius: 16px;
  // }

  /* 针对不支持::-webkit-scrollbar-*的浏览器的样式调整 */
  @supports not (selector(::-webkit-scrollbar)) {
    html {
      scrollbar-width: thin;
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
      background-color: var(--p-primary-color);
      padding: 15px;
      color: var(--p-primary-contrast-color);
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
    color: var(--p-primary-color);

    .file-block {
      background-color: var(--p-primary-secondary-color);
      padding: 15px;
      max-width: 50%;
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
    border-top: 1px solid var(--p-content-border-color);
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