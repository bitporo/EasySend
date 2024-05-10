<template>
  <div class="input-container">
    <NInput v-model:value="inputValue" type="textarea" placeholder="" :autosize="{ minRows: 3, maxRows: 5 }" />
    <NButton type="primary" @click="send">发送</NButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { addMessageData } from '@/api/message.js'
import { NButton, NInput, useMessage } from 'naive-ui'
const messageSend = useMessage()
const emit = defineEmits(['send'])
defineOptions({
  name: 'MessageInput',
})
const inputValue = ref('')

function send() {
  if(!inputValue.value){
    messageSend.error('内容不能为空')
    return
  }
  const sendData = {
    id: new Date().getTime(),
    type: 'text',
    dateTime: new Date().toLocaleString(),
    content: inputValue.value
  }
  addMessageData(sendData).then(res => {
    emit('send')
    console.log('addMessageData', res)
  })
}
</script>

<style lang="less" scoped>
.input-container {
  box-sizing: border-box;
  display: flex;
  align-items: start;
  gap: 10px;
  padding: 10px;
  height: 100px;
  width: 750px;
  background-color: white;
}
</style>