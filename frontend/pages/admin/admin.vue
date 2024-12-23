<template>
  <view style="display: flex;justify-content: space-between;align-items: center;padding: 10px;">
    <view style="cursor: pointer;" @click="goBack"><uni-icons type="left" size="30"></uni-icons></view>
    <view style="font-weight: bold;">管理设置</view>
    <view></view>
  </view>
  <view style="padding: 20px;">
    <view v-if="isAdmin">
      <Fieldset legend="文件迁移" :toggleable="true" v-if="isWindows">
        <view style="display: flex;flex-direction: column;gap: 10px;">
          <view>
            <text style="margin-right: 10px;">原上传路径：{{uploadPath.old}}</text><Button v-if="uploadPath.old" label="打开"
              size="small" @click="openDir(uploadPath.old)" />
          </view>
          <view>
            <text style="margin-right: 10px;">现上传路径：{{uploadPath.now}}</text><Button v-if="uploadPath.now" label="打开"
              size="small" @click="openDir(uploadPath.now)" />
          </view>
          <h6>注：打开文件夹后将【原上传路径】下“编码.格式”（如：eb5b89b68b22c1b943d787800.mp4）的文件剪切（可复制再删除）到【现上传路径】中，旧版本升级到1.4.1及之后版本需要设置，新安装高版本用户可忽略该设置</h6>
        </view>
      </Fieldset>
    </view>
    <view v-else style="text-align: center;">
      仅管理员端可访问当前页面
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
      goBack() {
        uni.redirectTo({
          url:'/pages/index/index'
        })
      },
      openDir(path) {
        uni.request({
          url: this.baseUrl + '/system/openDirectory',
          method: 'POST',
          data: {
            path
          }
        }).then(res => {
          console.log(res)
        })
      },
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
          this.uploadPath = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>