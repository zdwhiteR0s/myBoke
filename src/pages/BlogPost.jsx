import { useParams, Link } from 'react-router-dom';
import { Card, Tag, Avatar, Divider, Button, Tooltip, message } from 'antd';
import { 
  UserOutlined, 
  CalendarOutlined, 
  TagOutlined,
  LikeOutlined,
  LikeFilled,
  BookOutlined,
  ShareAltOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CommentSection from '../components/CommentSection';
import CodeBlock from '../components/CodeBlock';
import { getPost } from '../data/blogPosts';

const BlogPost = () => {
  const { id } = useParams();
  const post = getPost(id);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);
  const [showToTop, setShowToTop] = useState(false);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">文章不存在</h2>
        <Link to="/home" className="text-blue-500 hover:text-blue-600">
          返回首页
        </Link>
      </div>
    );
  }

  // 监听滚动
  window.addEventListener('scroll', () => {
    setShowToTop(window.scrollY > 300);
  });

  const handleLike = () => {
    if (!isLiked) {
      setLikeCount(prev => prev + 1);
      message.success('感谢点赞！');
    } else {
      setLikeCount(prev => prev - 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success('链接已复制到剪贴板');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <Link to="/home" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4">
        <ArrowLeftOutlined className="mr-2" />
        返回首页
      </Link>

      <Card className="shadow-lg">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4"
        >
          {post.title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center space-x-4 mb-6 text-gray-600"
        >
          <div className="flex items-center">
            <Avatar src={post.avatar} icon={<UserOutlined />} className="mr-2" />
            {post.author}
          </div>
          <div className="flex items-center">
            <CalendarOutlined className="mr-2" />
            {post.date}
          </div>
          <div>{post.readTime}阅读</div>
          <div>{post.views} 阅读量</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-2 mb-6"
        >
          {post.tags?.map(tag => (
            <Tag key={tag} color="blue">
              <TagOutlined className="mr-1" />
              {tag}
            </Tag>
          ))}
        </motion.div>

        <Divider />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="prose prose-lg max-w-none dark:prose-invert"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <CodeBlock language={match[1]}>
                    {String(children).replace(/\n$/, '')}
                  </CodeBlock>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        <Divider />

        <div className="flex justify-center space-x-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Tooltip title={isLiked ? '取消点赞' : '点赞'}>
              <Button 
                type="text"
                icon={isLiked ? <LikeFilled className="text-blue-500" /> : <LikeOutlined />}
                onClick={handleLike}
              >
                {likeCount}
              </Button>
            </Tooltip>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Tooltip title="收藏">
              <Button type="text" icon={<BookOutlined />}>
                收藏
              </Button>
            </Tooltip>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Tooltip title="分享">
              <Button type="text" icon={<ShareAltOutlined />} onClick={handleShare}>
                分享
              </Button>
            </Tooltip>
          </motion.div>
        </div>

        <CommentSection postId={id} />
      </Card>

      {showToTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-8 right-8"
        >
          <Button 
            type="primary" 
            shape="circle" 
            size="large"
            className="shadow-lg"
            onClick={scrollToTop}
          >
            ↑
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BlogPost; 