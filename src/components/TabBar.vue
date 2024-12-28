<script setup>
const props = defineProps({
  activeTab: String,
});

const emit = defineEmits(['update:activeTab']);

const setActiveTab = (tab) => {
  emit('update:activeTab', tab);
};
</script>

<template>
  <div class="tab-bar">
    <button :class="{ active: activeTab === 'training' }" @click="setActiveTab('training')">训练</button>
    <button :class="{ active: activeTab === 'history' }" @click="setActiveTab('history')">记录</button>
  </div>
</template>

<style scoped>
.tab-bar {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 4rem;
  width: 100%;
}

.tab-bar button {
  flex: 1;
  margin: 0 5px;
  padding: 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.tab-bar button.active {
  background-color: #2196f3;
  color: white;
}
</style>