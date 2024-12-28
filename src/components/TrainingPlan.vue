<script setup>
import { ref, computed, onMounted } from 'vue';
import { loadProgress, saveProgress, saveHistory, formatTime } from '../helper';
import TrainingStep from './TrainingStep.vue';
import Summary from './Summary.vue';

// 训练计划数据
const plan = [
  { type: '训练', day: '第一天', index: 1, part: '胸', action: '史密斯卧推', sets: 5, reps: '12-15' },
  { type: '训练', day: '第一天', index: 2, part: '胸', action: '蝴蝶机夹胸', sets: 5, reps: '12-15' },
  { type: '训练', day: '第一天', index: 3, part: '二头肌', action: '哑铃二头肌弯举', sets: 5, reps: '12-15' },
  { type: '训练', day: '第二天', index: 1, part: '背', action: '坐姿划船', sets: 5, reps: '12-15' },
  { type: '训练', day: '第二天', index: 2, part: '背', action: '高位下拉', sets: 5, reps: '12-15' },
  { type: '训练', day: '第二天', index: 3, part: '腹肌', action: '仰卧卷腹', sets: 5, reps: '12-15' },
  { type: '训练', day: '第三天', index: 1, part: '肩', action: '坐姿肩推', sets: 5, reps: '12-15' },
  { type: '训练', day: '第三天', index: 2, part: '肩', action: '哑铃侧平举', sets: 5, reps: '12-15' },
  { type: '训练', day: '第三天', index: 3, part: '三头', action: '绳索下拉', sets: 5, reps: '12-15' },
  { type: '训练', day: '第四天', index: 1, part: '腿', action: '倒蹬机', sets: 5, reps: '12-15' },
  { type: '训练', day: '第四天', index: 2, part: '腿', action: '器械腿弯举', sets: 5, reps: '12-15' },
  { type: '训练', day: '第四天', index: 3, part: '腿', action: '器械腿屈伸', sets: 5, reps: '12-15' },
];

const currentIndex = ref(0); // 当前环节索引
const setIndex = ref(0); // 当前 set 索引
const completedSteps = ref([]); // 已完成的环节
const isSummaryVisible = ref(false); // 是否显示总结页面

// 当前环节
const currentStep = computed(() => plan[currentIndex.value]);

// 启动下一个 set 或下一个环节
const nextStep = (beforeStep) => {
  // 这里注意需要深拷贝一下，不然会导致数据异常
  completedSteps.value.push(JSON.parse(JSON.stringify(beforeStep))); // 完成当前环节的所有 set
  if (setIndex.value < currentStep.value.sets - 1) {
    setIndex.value++; // 进入下一个 set
  } else {
    setIndex.value = 0; // 重置 set 索引

    if (currentIndex.value < plan.length - 1) {
      currentIndex.value++; // 进入下一个环节
    } else {
      isSummaryVisible.value = true; // 显示总结页面
      saveHistory({
        date: new Date().toLocaleString(),
        steps: completedSteps.value,
        totalTime: totalTime.value,
      });
      localStorage.removeItem('currentProgress'); // 清除当前进度
    }
  }

  saveProgress(currentIndex.value, completedSteps.value, setIndex.value); // 保存进度
};

// 结束训练
const stopTraining = () => {
  console.log(completedSteps.value)
  isSummaryVisible.value = true;
  saveHistory({
    date: new Date().toLocaleString(),
    steps: completedSteps.value,
    totalTime: totalTime.value,
  });

  localStorage.removeItem('currentProgress'); // 清除当前进度
};

const quitSummary = () => {
  // 退出总结时，重置状态
  isSummaryVisible.value = false;
  currentIndex.value = 0;
  setIndex.value = 0;
  completedSteps.value = [];
  localStorage.removeItem('currentProgress'); // 清除当前进度
};

// 计算总用时
const totalTime = computed(() => {
  return completedSteps.value.reduce((sum, step) => sum + step.time, 0);
});

onMounted(() => {
  const progress = loadProgress();
  if (progress) {
    currentIndex.value = progress.index;
    completedSteps.value = progress.steps;
    setIndex.value = progress.setIndex || 0;
  }
});
</script>

<template>
  <div v-if="isSummaryVisible">
    <Summary :completedSteps="completedSteps" @back="quitSummary" />
  </div>
  <div v-else>
    <TrainingStep :step="currentStep" :setIndex="setIndex" :index="currentIndex" @complete="nextStep"
      @stop="stopTraining" />
      <p class="note-text">
        视频和训练计划来自
        <a href="https://www.bilibili.com/video/BV1NX4y1v7Wq" target="_blank">KymFit</a>
      </p>
    <p class="note-text">运动进度会自动保存到当前环境，运动完直接退出即可。想要重新开始，可以点击结束本轮。</p>
  </div>
</template>

<style>
.note-text {
  font-weight: lighter;
  font-size: 0.5rem;
  color: #888;
  margin-top: 0.25rem;
}
a {
  color: #2196f3;
}
</style>