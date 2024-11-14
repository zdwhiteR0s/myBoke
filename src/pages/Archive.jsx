import { Timeline, Card, Tag, Divider, Select } from 'antd';
import { Link } from 'react-router-dom';
import { 
  ClockCircleOutlined, 
  TagOutlined, 
  CalendarOutlined,
  EyeOutlined,
  LikeOutlined 
} from '@ant-design/icons';
import { useState } from 'react';
import { getAllPosts } from '../data/blogPosts';
import { motion } from 'framer-motion';

const Archive = () => {
  const [selectedYear, setSelectedYear] = useState('all');
  const allPosts = getAllPosts();

  // 获取所有年份
  const years = [...new Set(allPosts.map(post => 
    new Date(post.date).getFullYear()
  ))].sort((a, b) => b - a);

  // 按年月对文章进行分组
  const groupPostsByDate = (posts) => {
    const grouped = posts.reduce((groups, post) => {
      const date = new Date(post.date);
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!groups[yearMonth]) {
        groups[yearMonth] = [];
      }
      groups[yearMonth].push(post);
      return groups;
    }, {});

    // 对每个月份内的文章按日期排序
    Object.keys(grouped).forEach(month => {
      grouped[month].sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    return grouped;
  };

  // 筛选文章
  const filterPosts = () => {
    if (selectedYear === 'all') {
      return allPosts;
    }
    return allPosts.filter(post => 
      new Date(post.date).getFullYear() === Number(selectedYear)
    );
  };

  const groupedPosts = groupPostsByDate(filterPosts());
  const sortedMonths = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">文章归档</h1>
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            onChange={setSelectedYear}
            options={[
              { value: 'all', label: '全部年份' },
              ...years.map(year => ({
                value: year,
                label: `${year}年`
              }))
            ]}
          />
        </div>

        <div className="mb-6">
          <div className="text-gray-500 mb-4">
            共计 {filterPosts().length} 篇文章
          </div>
          <Divider />
        </div>
        
        <Timeline>
          {sortedMonths.map(month => (
            <Timeline.Item 
              key={month} 
              dot={<CalendarOutlined className="text-blue-500" />}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-xl font-bold mb-4 text-blue-600">
                  {month}
                </h2>
                <div className="space-y-4">
                  {groupedPosts[month].map(post => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <Link 
                        to={`/post/${post.id}`}
                        className="group"
                      >
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
                          <span>
                            <ClockCircleOutlined className="mr-1" />
                            {post.date}
                          </span>
                          <span>
                            <EyeOutlined className="mr-1" />
                            {post.views} 阅读
                          </span>
                          <span>
                            <LikeOutlined className="mr-1" />
                            {post.likes} 点赞
                          </span>
                        </div>
                        <div className="mt-2">
                          {post.tags.map(tag => (
                            <Tag key={tag} color="blue" className="mr-2">
                              <TagOutlined className="mr-1" />
                              {tag}
                            </Tag>
                          ))}
                        </div>
                        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                          {post.summary}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </div>
  );
};

export default Archive; 