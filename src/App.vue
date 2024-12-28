<script setup>
import { ref } from 'vue';
import TrainingPlan from './components/TrainingPlan.vue';
import History from './components/History.vue';
import TabBar from './components/TabBar.vue';

const activeTab = ref('training'); // 当前激活的 Tab

</script>

<template>
  <main>
    <TrainingPlan v-if="activeTab === 'training'" />
    <History v-if="activeTab === 'history'" />
  </main>

  <footer>
    <TabBar v-model:activeTab="activeTab" />
  </footer>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

.stop-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  font-size: 0.8em;
  background-color: #ffcccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.7;
}

.stop-button:hover {
  opacity: 1;
}

main {
  text-align: center;
  padding-bottom: 60px;
  /* 为底部 Tab 栏留出空间 */
}
</style>