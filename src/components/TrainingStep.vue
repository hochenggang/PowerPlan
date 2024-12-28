<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    step: Object,
    index: Number,
    setIndex: Number
});

const emit = defineEmits(['complete', 'stop']);

const currentSecondsDoing = ref(0); // 当前环节已用时间
const currentSecondsRelax = ref(0); // 当前环节已用时间
const isStarted = ref(false); // 当前环节是否已开始
const intervalDoing = ref(null); // 计时器
const intervalRelax = ref(null); // 计时器

const currentStep = ref(props.step);

watch(props, () => {
    currentStep.value = props.step
})

// 开始记录已用时间
const startElapsedTimer = () => {
    intervalDoing.value = setInterval(() => {
        currentSecondsDoing.value++;
    }, 1000);
    if (intervalRelax.value) {
        clearInterval(intervalRelax.value);
        intervalRelax.value = null;
    }
};

// 停止记录已用时间
const stopElapsedTimer = () => {
    if (intervalDoing.value) {
        clearInterval(intervalDoing.value);
        intervalDoing.value = null;
    }
    intervalRelax.value = setInterval(() => {
        currentSecondsRelax.value++;
    }, 1000);
};


// 用户点击“开始”按钮
const startStepAction = () => {
    isStarted.value = true;
    const step = currentStep.value;
    step.startTime = new Date(); // 记录开始时间
    startElapsedTimer(); // 开始记录已用时间
};

// 用户点击“完成”按钮
const completeStep = () => {
    currentSecondsRelax.value = 0
    currentSecondsDoing.value = 0
    isStarted.value = false;
    stopElapsedTimer() // 停止记录已用时间
    const step = currentStep.value;
    step.endTime = new Date() // 记录结束时间
    step.setIndex = props.setIndex
    step.time = Math.floor((step.endTime - step.startTime) / 1000) // 计算用时（秒）
    emit('complete', currentStep.value);
    console.log(currentStep.value)
    currentStep.value = null;
};


// 用户点击“结束”按钮
const stopTraining = () => {
    const ok = confirm('确定要结束本轮训练吗？');
    if (ok) {
        stopElapsedTimer();
        emit('stop');
    }
};

</script>

<template>
    <div class="step" v-if="currentStep">
        <h2>{{ step.day }} 练{{ step.part }}</h2>
        <div class="step-content">
            <span>{{ { 1: '①', 2: '②', 3: '③' }[step.index] }}{{ step.action }} </span>
            <span> 共{{ step.sets }}组 </span>
            <span>每组{{ step.reps }}次</span>
        </div>
        <p v-if="isStarted && intervalDoing">已锻炼 <span class="step-time breathing-effect">{{ currentSecondsDoing }}秒</span></p>
        <p v-if="!isStarted && intervalRelax">已休息 <span class="relax-time breathing-effect" :class="{'red-color':currentSecondsRelax>90}">{{ currentSecondsRelax }}秒</span></p>
        <video :src="`/videos/${step.action}.mp4`" controls></video>
        <button v-if="!isStarted" @click="startStepAction">开始 <{{ step.action }}> 第{{ props.setIndex + 1 }}组</button>
        <button class="button-complet" v-if="isStarted" @click="completeStep">已完成 <{{ step.action }}> 第{{ props.setIndex + 1 }}组</button>
        <button class="button-finish " v-if="props.index > 0 || props.setIndex > 0" @click="stopTraining">结束本轮</button>
    </div>
</template>


<style scoped>
.step {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
}

h2 {
    font-weight: bold;
    margin: 0.5rem 0;
}

.step-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0.5rem 0;
}

.step-content>span {
    color: #111;
    border-radius: 5px;
    margin: 3px;
    background-color: #fff;
    border: 1px solid #2196f3;
    padding: 5px 10px;
    font-size: 0.9rem;
    font-weight: lighter;
    line-height: 1rem;
}

button {
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid #2196f3;
    color: #2196f3;
    border-radius: 5px;
    margin: 5px;
    background-color: #fff;
}


video {
    width: 100%;
    padding: 5px;
    border-radius: 10px;
}

.button-finish {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px 10px;
    font-size: 0.8em;
    background-color: #ffcccc;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.7;
    color: #fff;
}

.button-complet {
    border: 1px solid #4caf50;
    color: #4caf50;
}

.step-time {
    font-size: 2rem;
    font-weight: bolder;
    color: #2196f3;
    display: inline-block;
}

.relax-time {
    font-size: 2rem;
    font-weight: bolder;
    color: #4caf50;
    display: inline-block;
}

.red-color {
    color: #af4c4c;

}

@keyframes breathe {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }
}

.breathing-effect {
    animation: breathe 1.5s ease-in-out infinite;
}
</style>