// 加载进度
export const loadProgress = () => {
  const progress = localStorage.getItem('currentProgress');
  return progress ? JSON.parse(progress) : null;
};


  // 保存进度
  export const saveProgress = (index, steps, setIndex) => {
    localStorage.setItem('currentProgress', JSON.stringify({ index, steps, setIndex }));
  };
  
  
  // 加载历史记录
  export const loadHistory = () => {
    const savedHistory = localStorage.getItem('historyRecords');
    if (savedHistory) {
      return JSON.parse(savedHistory);
    }
    return [];
  };
  
  // 保存历史记录
  export const saveHistory = (record) => {
    const history = loadHistory();
    history.push(record);
    localStorage.setItem('historyRecords', JSON.stringify(history));
  };
  
  // 格式化时间
  export const formatTime = (date) => {
    return date.toISOString().replace('T', ' ').split('.')[0];
  };