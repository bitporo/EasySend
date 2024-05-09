<template>
  <div class="container">
    <MessageItem v-for="(item, index) in messageList" :data="item" :key="item.id" />
    <MessageInput style="position: fixed;bottom: 0;" @send="getMessageListData" />
  </div>

</template>

<script lang="ts" setup>
import MessageItem from '../../components/MessageItem.vue';
import MessageInput from '../../components/MessageInput.vue';
import { getMessageList } from '@/api/message.js'
import { ref } from 'vue';
defineOptions({
  name: 'MainPage',
})
const messageList = ref([])

function getMessageListData() {
  getMessageList().then(res => {
    messageList.value = res.data
  })
}

getMessageListData()
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 750px;
  background-color: white;
  height: 100%;
  padding-bottom: 100px;
  box-sizing: border-box;
  overflow-y: scroll;
}
</style>