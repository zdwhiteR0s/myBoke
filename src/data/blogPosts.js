import { reactTailwindPost } from './posts/react-tailwind-modern-website';
import { typescriptPost } from './posts/typescript-advanced-features';
import { screenAdaptationPost } from './posts/frontend-screen-adaptation';
import { calendarGuidePost } from './posts/react-toast-ui-calendar-guide';
import avatarImg from '../assets/img/avatar.jpg';

// 确保所有文章都被正确导入
const allPosts = {
  1: reactTailwindPost,
  2: typescriptPost,
  3: screenAdaptationPost,
  4: calendarGuidePost
};

// 处理头像路径
Object.values(allPosts).forEach(post => {
  post.avatar = avatarImg;
});

export const blogPosts = allPosts;

// 辅助函数
export const getAllPosts = () => {
  // 获取所有文章并按日期降序排序
  return Object.values(blogPosts)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPost = (id) => {
  return blogPosts[id] || null;
};

export const getPostsByTag = (tag) => {
  const posts = getAllPosts();
  if (!posts || !Array.isArray(posts)) {
    return [];
  }
  return posts.filter(post => post?.tags?.includes(tag)) || [];
};

export const getAllTags = () => {
  const tags = new Set();
  const posts = getAllPosts();
  
  if (!posts || !Array.isArray(posts)) {
    return [];
  }

  posts.forEach(post => {
    if (post && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (tag) {
          tags.add(tag);
        }
      });
    }
  });
  
  return Array.from(tags);
};

export const getRecentPosts = (limit = 5) => {
  const posts = getAllPosts();
  if (!posts || !Array.isArray(posts)) {
    return [];
  }
  
  return posts.slice(0, limit);
};

export const searchPosts = (query) => {
  if (!query) return getAllPosts();
  
  const posts = getAllPosts();
  if (!posts || !Array.isArray(posts)) {
    return [];
  }

  const searchLower = query.toLowerCase();
  return posts.filter(post => 
    post?.title?.toLowerCase().includes(searchLower) ||
    post?.summary?.toLowerCase().includes(searchLower) ||
    post?.tags?.some(tag => tag.toLowerCase().includes(searchLower))
  ) || [];
}; 