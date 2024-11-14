export const screenAdaptationPost = {
  id: 3,
  title: '前端大屏适配与弹性布局最佳实践',
  summary: '详细介绍大屏项目的自适应方案，包括 scale 缩放、rem 适配、vw/vh 布局等多种实现方式，以及实际项目中的应用案例...',
  content: `
# 前端大屏适配与弹性布局最佳实践

## 引言
在大屏可视化项目中，如何确保页面在不同分辨率下都能完美展示是一个常见的挑战。本文将详细介绍几种常用的适配方案及其实现原理。

## 常见适配方案对比

### 1. Scale 缩放方案
最常用的大屏适配方案，通过等比例缩放实现适配。

\`\`\`javascript
// 核心实现
function setScale() {
  const designWidth = 1920;  // 设计稿宽度
  const designHeight = 1080; // 设计稿高度
  
  const app = document.getElementById('app');
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  
  const scaleX = width / designWidth;
  const scaleY = height / designHeight;
  
  // 取最小的缩放比
  const scale = Math.min(scaleX, scaleY);
  
  app.style.transform = \`scale(\${scale})\`;
  app.style.transformOrigin = 'left top';
}

// 监听窗口变化
window.addEventListener('resize', debounce(setScale, 200));
setScale();
\`\`\`

优点：
- 保持原有比例
- 实现简单
- 适合大屏展示

缺点：
- 可能出现空白区域
- 文字可能模糊

### 2. Rem 适配方案
通过动态设置根元素字体大小实现适配。

\`\`\`javascript
// 核心实现
function setRem() {
  const designWidth = 1920;
  const baseFontSize = 100;
  
  const width = document.documentElement.clientWidth;
  const scale = width / designWidth;
  
  document.documentElement.style.fontSize = baseFontSize * scale + 'px';
}

// 样式示例
.container {
  width: 19.2rem;  // 1920px / 100
  height: 10.8rem; // 1080px / 100
}
\`\`\`

优点：
- 文字清晰
- 可以局部使用
- 适合移动端

缺点：
- 需要单位转换
- 可能有小数点问题

### 3. Viewport 适配方案
使用 vw、vh 单位实现响应式布局。

\`\`\`css
/* 基础布局 */
.screen {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2vw;
  padding: 2vh;
}

.chart {
  width: 100%;
  height: 45vh;
  background: rgba(0, 0, 0, 0.5);
}

/* 响应式调整 */
@media screen and (max-width: 1440px) {
  .chart {
    height: 40vh;
  }
}
\`\`\`

## 实战案例

### 1. 数据大屏项目实现

\`\`\`javascript
class ScreenAdapter {
  constructor(options = {}) {
    this.designWidth = options.designWidth || 1920;
    this.designHeight = options.designHeight || 1080;
    this.mode = options.mode || 'scale';
    this.container = options.container;
    
    this.init();
  }
  
  init() {
    this.setAdapter();
    window.addEventListener('resize', 
      this.debounce(() => this.setAdapter(), 200)
    );
  }
  
  setAdapter() {
    switch(this.mode) {
      case 'scale':
        this.setScale();
        break;
      case 'rem':
        this.setRem();
        break;
      case 'viewport':
        this.setViewport();
        break;
    }
  }
  
  setScale() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const scale = Math.min(
      width / this.designWidth,
      height / this.designHeight
    );
    
    this.container.style.transform = \`scale(\${scale})\`;
    this.container.style.transformOrigin = 'left top';
  }
  
  debounce(fn, delay) {
    let timer = null;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
  }
}
\`\`\`

### 2. 弹性布局实现

\`\`\`javascript
// React 组件示例
const FlexibleLayout = () => {
  return (
    <div className="screen-container">
      <div className="header">
        <Title level={2}>数据监控平台</Title>
      </div>
      
      <div className="content">
        <div className="left-panel">
          {/* 左侧图表 */}
          <ChartComponent />
        </div>
        
        <div className="center-panel">
          {/* 中间地图 */}
          <MapComponent />
        </div>
        
        <div className="right-panel">
          {/* 右侧列表 */}
          <ListComponent />
        </div>
      </div>
      
      <div className="footer">
        {/* 底部图表 */}
        <ChartComponent />
      </div>
    </div>
  );
};

// 对应的样式
const styles = \`
.screen-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 10vh;
  background: rgba(0, 0, 0, 0.5);
}

.content {
  flex: 1;
  display: flex;
  gap: 2vw;
  padding: 2vh 2vw;
}

.left-panel,
.right-panel {
  width: 25%;
}

.center-panel {
  flex: 1;
}

.footer {
  height: 20vh;
  background: rgba(0, 0, 0, 0.5);
}
\`;
\`\`\`

## 性能优化

### 1. 防抖处理
\`\`\`javascript
function debounce(fn, delay) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

window.addEventListener('resize', debounce(setScale, 200));
\`\`\`

### 2. 资源加载优化
\`\`\`javascript
// 确保所有资源加载完成后再进行缩放
window.onload = () => {
  setScale();
  // 初始化图表等操作
};

// 图片懒加载
const lazyImages = document.querySelectorAll('.lazy-image');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
\`\`\`

## 常见问题解决

### 1. 字体模糊问题
\`\`\`css
/* 使用 transform-scale 时的字体优化 */
.text {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
\`\`\`

### 2. 滚动条处理
\`\`\`css
/* 隐藏滚动条但保持功能 */
.container {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
\`\`\`

## 最佳实践

1. **选择合适的方案**
   - Scale 方案适合严格保持比例的场景
   - Rem 方案适合需要局部自适应的场景
   - Viewport 方案适合完全响应式的场景

2. **性能考虑**
   - 使用防抖处理 resize 事件
   - 优化资源加载
   - 注意动画性能

3. **兼容性处理**
   - 考虑浏览器兼容性
   - 添加降级方案
   - 处理极端情况

4. **开发建议**
   - 使用统一的开发规范
   - 做好模块化管理
   - 保持代码可维护性

## 总结

大屏适配是一个综合性的问题，需要根据具体项目需求选择合适的方案。关键点包括：
1. 理解不同适配方案的原理和适用场景
2. 掌握实现技巧和优化方法
3. 注意性能和兼容性问题
4. 遵循最佳实践和开发规范

通过合理运用这些技术和方案，我们可以构建出在各种屏幕尺寸下都能完美展示的大屏项目。
`,
  author: '戴振朋',
  date: '2024-03-21',
  tags: ['前端开发', '响应式布局', '大屏开发'],
  readTime: '10分钟',
  likes: 28,
  views: 76,
  coverImage: 'https://picsum.photos/800/402'
}; 