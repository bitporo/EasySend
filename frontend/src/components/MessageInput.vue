<template>
  <div class="input-container">
    <div>
      <textarea v-model="inputValue"></textarea>
      <button @click="send">发送</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { addMessageData } from '@/api/message.js'
const emit = defineEmits(['send'])
defineOptions({
  name: 'MessageInput',
})
const inputValue = ref('')

function send() {
  const sendData = {
    id: new Date().getTime(),
    type: 'text',
    dateTime: new Date().toLocaleString(),
    content: inputValue.value
  }
  addMessageData(sendData).then(res => {
    emit('send')
    console.log('addMessageData',res)
  })
}
</script>

<style lang="less" scoped>
.input-container {
  display: flex;
  height: 100px;
  width: 750px;
  background-color: white;
}
</style>