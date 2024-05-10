<template>
  <div class="container">
    <NVirtualList ref="virtualListInst" style="height: 100%" content-style="overflow: hidden;" :item-size="42"
      :items="messageList">
      <template #default="{ item }">
        <MessageItem :data="item" :key="item.id" />
      </template>
    </NVirtualList>
    <NMessageProvider>
      <MessageInput style="position: fixed;bottom: 0;" @send="getMessageListData" />
    </NMessageProvider>
  </div>

</template>

<script setup>
import { NMessageProvider, NVirtualList } from 'naive-ui'
import MessageItem from '../../components/MessageItem.vue';
import MessageInput from '../../components/MessageInput.vue';
import { getMessageList } from '@/api/message.js'
import { nextTick, ref } from 'vue';

defineOptions({
  name: 'MainPage',
})
const messageList = ref([])
const virtualListInst = ref()
function getMessageListData() {
  getMessageList().then(res => {
    messageList.value = res.data
    nextTick(() => {
      virtualListInst.value?.scrollTo({ position: "bottom" });
    })
  })
}

function handleScrollToPosition() {
  virtualListInst.value?.scrollTo({ position: "bottom" });
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
}
</style>