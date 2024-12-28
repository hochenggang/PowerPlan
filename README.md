# PowerPlan

## 简介

PowerPlan 是一个基于 Vue 3 开发的轻量健身训练管理页面。它帮助你制定、跟踪和管理健身计划，支持实时进度跟踪、历史记录查看、训练总结等功能。[Demo](https://do.imhcg.cn/)

---

## 功能特性

### 1. **训练计划**
   - 提供预定义的训练计划，涵盖胸、背、肩、腿等多个部位。
   - 每个训练计划包含多个动作，每个动作分为多组（`sets`）和多次（`reps`）。

### 2. **实时进度跟踪**
   - 记录每一组训练的时间等数据。
   - 自动保存当前训练进度，支持中途退出后继续训练。

### 3. **历史记录**
   - 查看每次训练的详细数据，包括总用时、每组的表现等。
   - 支持导出历史记录，方便用户分析长期进展。

### 4. **训练总结**
   - 训练完成后，显示本次训练的总结，包括完成的动作、总用时等。

### 5. **数据持久化**
   - 使用 `localStorage` 保存用户的训练进度和历史记录，确保数据不丢失。

### 6. **视频指导**
   - 每个训练动作附带视频指导，帮助用户正确完成动作。

---

## 技术栈

- **前端框架**: Vue 3
- **状态管理**: Vue Reactive API
- **数据持久化**: `localStorage`
- **构建工具**: Vite
- **UI 组件**: 原生 HTML + CSS

---

## 项目结构

```
fitness-app/
├── src/
│   ├── assets/               # 静态资源（如图片、样式）
│   ├── components/           # 组件
│   │   ├── TrainingStep.vue  # 训练环节组件
│   │   ├── Summary.vue       # 总结页面组件
│   │   ├── History.vue       # 历史记录组件
│   │   └── TabBar.vue        # 底部导航栏组件
│   ├── helper.js          # 数据保存和加载工具
│   ├── App.vue               # 根组件
│   └── main.js               # 项目入口
├── public/                   # 公共资源
├── README.md                 # 项目说明
└── package.json              # 项目依赖
```

---

## 安装与运行

### 1. 克隆项目

```bash
git clone ...
```

### 2. 安装依赖

```bash
npm install
```

### 3. 运行项目

```bash
npm run dev
```

### 4. 构建项目

```bash
npm run build
```

---

## 使用说明

1. **开始训练**
   - 进入页面后，点击“开始”按钮。
   - 点击“完成”进入下一组。

2. **查看历史记录**
   - 在历史记录页面，查看以往的训练数据。

3. **继续训练**
   - 如果中途退出，重新进入页面时会自动加载上次的训练进度。

4. **训练总结**
   - 训练完成后，查看本次训练的总结，包括完成的动作、总用时等。

---

## 数据

训练计划：

```javascript
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

```

---

## 自定义训练计划

你可以根据自己的需求修改 `TrainingPlan.vue` 中的 `plan` 数据，添加或删除训练动作，调整组数和次数。

```javascript
const plan = [
  { type: '训练', day: '第一天', index: 1, part: '胸', action: '史密斯卧推', sets: 5, reps: '12-15' },
  // 添加更多训练动作
];
```

---


## 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。视频资源来自[KymFit](https://www.bilibili.com/video/BV1NX4y1v7Wq)，版权归原作者所有。

---

## 联系方式

如有任何问题或建议，请issue：

---

## 特别感谢

- 训练计划灵感来自 [KymFit](https://www.bilibili.com/video/BV1NX4y1v7Wq)。
- Vue 3 和 Vite 提供了强大的开发体验。

---

## 开源初衷

本项目旨在帮助自己更好的完成健身目标，改变瘦弱的自己，同时也为开发者提供一个基于 Vue 3 的实战项目参考。欢迎大家基于此项目开发自己的健身页面。

---

感谢使用 PowerPlan！祝你健身顺利，早日达成目标！💪