<script setup>
import { ref, onMounted } from 'vue';
import { loadHistory } from '../helper';
import Summary from './Summary.vue';


const historyRecords = ref([]); // 历史记录
const selectedRecord = ref(null);
onMounted(() => {
  historyRecords.value = loadHistory();
});

</script>

<template>
  <div class="history">
    <h2>轮次记录</h2>
    <ul v-if="!selectedRecord">
      <li v-for="(record, index) in historyRecords" :key="index" class="history-card">
        <div class="history-card-left">
          <p>日期: {{ record.date }}</p>
          <p>总用时: {{ record.totalTime }} 秒</p>
        </div>
        <button class="button-enter"
          @click="selectedRecord = record">查看详情</button>
      </li>
    </ul>

    <div v-if="selectedRecord">
      <Summary :completedSteps="selectedRecord.steps" @back="selectedRecord = null" />
    </div>
  </div>

</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.history-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.history-card-left {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
}

.history-card-left>p {
  width: 100%;
  text-align: left;
}

.button-enter {
  padding: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  border: 1px solid #4caf50;
  color: #4caf50;
  border-radius: 5px;
  margin: 5px;
  background-color: #fff;
}
</style>