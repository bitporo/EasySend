<template>
  <div class="item-container">
    <div class="time">{{ data.dateTime }}</div>
    <div class="item-content">
      {{ data.content }}
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'MessageItem',
})
const props = defineProps(['data'])
</script>

<style lang="less" scoped>
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
  background-color: #234567;
  padding: 10px;
  color: white;
  border-radius: 8px;
}
</style>