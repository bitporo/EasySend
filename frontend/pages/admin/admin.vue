<template>
  <view style="padding: 20px;">
    <view v-if="isAdmin">
      <Fieldset legend="文件上传设置" :toggleable="true" v-if="isWindows">
        <view style="display: flex;flex-direction: column;gap: 10px;">
          <view>
            <text style="margin-right: 10px;">原上传路径：{{uploadPath.old}}</text><Button label="打开" size="small" />
          </view>
          <view>
            <text style="margin-right: 10px;">现上传路径：{{uploadPath.now}}</text><Button label="打开" size="small" />
          </view>
          <h6>注：打开文件夹将原上传路径“编码.格式”（如：eb5b89b68b22c1b943d787800.mp4）文件剪切到现上传路径中</h6>
        </view>
      </Fieldset>
    </view>
    <view v-else style="text-align: center;">
      请在管理端访问当前页面
    </view>
  </view>
</template>

<script>
  import Card from 'primevue/card';
  import Fieldset from 'primevue/fieldset';
  import Button from 'primevue/button';
  import {
    mapState
  } from 'pinia'
  import {
    useSystemStore
  } from '@/store/system.js'
  import {
    ipc
  } from '@/utils/ipcRenderer';
  export default {
    components: {
      Card,
      Fieldset,
      Button
    },
    data() {
      return {
        uploadPath: {},
        isWindows: false
      }
    },
    computed: {
      ...mapState(useSystemStore, ['myIp', 'baseUrl']),
      isAdmin() {
        return this.myIp == '127.0.0.1' || this.myIp == window.location.hostname
      }
    },
    onLoad() {
      this.getUploadPath()
      this.getPlatform()
    },
    methods: {
      getPlatform() {
        uni.request({
          url: this.baseUrl + '/system/getPlatform',
          method: 'GET'
        }).then(res => {
          this.isWindows = res.data.platform == 'Windows_NT' ? true : false
        })
      },
      getUploadPath() {
        uni.request({
          url: this.baseUrl + '/system/getUploadPath',
          method: 'GET'
        }).then(res => {
          console.log(res)
          this.uploadPath = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>