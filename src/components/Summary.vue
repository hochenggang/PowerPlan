<script setup>
import { computed } from 'vue';
import { formatTime } from '../helper';


const emits = defineEmits(['back']);
const props = defineProps({
  completedSteps: Array,
});

// 计算总用时
const totalTime = computed(() => {
  return props.completedSteps.reduce((sum, step) => sum + step.time, 0);
});
</script>

<template>
  <div class="summary">
    <h1>🎉 恭喜你完成本轮训练！🎉</h1>
    <div v-if="completedSteps.length > 0" class="completed-steps">
      <h1 class="total-time">总用时: {{ totalTime }} 秒</h1>
      <ul>
        <li v-for="(step, index) in completedSteps" :key="index" class="step-card">
          <p>{{ step.day }} - {{ step.part }} - {{ step.action }} - 第{{ step.setIndex + 1 }}组</p>
          <p>用时 {{ step.time }} 秒 ({{ formatTime(new Date(step.startTime)) }} - {{ formatTime(new Date(step.endTime)) }})</p>
        </li>
      </ul>
      <button @click="emits('back')">返回</button>

    </div>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 0.25rem 0;

}

button {
  padding: 5px;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #4caf50;
  color: #4caf50;
  background-color: #fff;
  border-radius: 5px;
}


.summary {
  color: green;
  font-size: 1.5rem;
}

h1 {

  font-size: 1rem;
  text-align: center;
}

.completed-steps {
  text-align: left;
}


.step-card > p {
  font-size: 0.9rem;
}

.step-card {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.total-time {
  font-weight: bold;
}
</style>