export const reactTailwindPost = {
  id: 1,
  title: '使用 React 和 Tailwind 构建现代化网站',
  summary: '本文详细介绍了如何使用 React 和 Tailwind CSS 构建一个现代化的响应式网站，包括项目搭建、组件开发、样式配置等全方位内容...',
  content: `
# 使用 React 和 Tailwind 构建现代化网站

## 引言
在现代前端开发中，React 和 Tailwind CSS 的组合越来越受欢迎。本文将详细介绍如何使用这两个强大的工具构建一个现代化的响应式网站。

## 项目初始化

### 1. 创建项目
使用 Vite 创建 React 项目：

\`\`\`bash
npm create vite@latest my-project -- --template react
cd my-project
npm install
\`\`\`

### 2. 安装依赖

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npm install @headlessui/react @heroicons/react
npx tailwindcss init -p
\`\`\`

## Tailwind 配置

### 1. 基础配置
创建 tailwind.config.js：

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        secondary: '#722ed1',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}
\`\`\`

### 2. 样式引入
在 src/index.css 中添加：

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors;
  }
}
\`\`\`

## 组件开发实践

### 1. 响应式导航栏

\`\`\`jsx
import { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-primary">
              Logo
            </a>
          </div>
          
          {/* 移动端菜单按钮 */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* 桌面端菜单 */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <a href="/" className="text-gray-500 hover:text-primary">首页</a>
            <a href="/about" className="text-gray-500 hover:text-primary">关于</a>
            <a href="/contact" className="text-gray-500 hover:text-primary">联系</a>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 text-gray-500 hover:text-primary">首页</a>
            <a href="/about" className="block px-3 py-2 text-gray-500 hover:text-primary">关于</a>
            <a href="/contact" className="block px-3 py-2 text-gray-500 hover:text-primary">联系</a>
          </div>
        </div>
      )}
    </nav>
  );
};
\`\`\`

### 2. 卡片组件

\`\`\`jsx
const Card = ({ title, description, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};
\`\`\`

## 性能优化

### 1. 图片优化

\`\`\`jsx
// 使用现代图片格式
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <source srcSet="/image.jpg" type="image/jpeg" /> 
  <img 
    src="/image.jpg"
    alt="Description"
    loading="lazy"
    className="w-full h-auto"
  />
</picture>
\`\`\`

### 2. 代码分割

\`\`\`jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

## 最佳实践

### 1. 组件设计原则
- 保持组件的单一职责
- 提取可复用的逻辑
- 使用适当的组件分割
- 注意性能优化

### 2. Tailwind 使用技巧
- 使用 @apply 抽取重复样式
- 合理使用主题配置
- 避免过度使用自定义样式
- 保持一致的命名规范

### 3. 响应式设计
- 移动端优先
- 使用合适的断点
- 测试不同设备
- 考虑性能影响

## 总结
React 和 Tailwind CSS 的组合为现代化网站开发提供了强大的工具支持。通过合理的项目结构、组件设计和性能优化，我们可以构建出高效、美观、易维护的网站。

关键要点：
1. 项目配置要合理
2. 组件设计要规范
3. 样式管理要统一
4. 性能优化要到位
5. 响应式要周到
`,
  author: '戴振朋',
  date: '2024-03-20',
  tags: ['React', 'Tailwind', '前端开发'],
  readTime: '5分钟',
  likes: 42,
  views: 128,
  coverImage: 'https://picsum.photos/800/400'
}; 