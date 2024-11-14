import { Card, Space, Tag, Input, Row, Col, Button, Avatar, Divider, Popover } from 'antd';
import { Link } from 'react-router-dom';
import { 
  SearchOutlined, 
  ClockCircleOutlined, 
  TagOutlined,
  WechatOutlined,
  QqOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import { getAllPosts, searchPosts, getAllTags, getRecentPosts } from '../data/blogPosts';
import SearchHistory from '../components/SearchHistory';
import avatarImg from '../assets/img/avatar.jpg';

const { Search } = Input;

// 更新技术栈数据
const skillsData = {
  '前端框架': [
    { name: 'Vue', color: 'green' },
    { name: 'React', color: 'blue' },
    { name: 'Umi', color: 'purple' },
    { name: 'UniApp', color: 'green' },
    { name: '微信小程序', color: 'cyan' },
  ],
  '基础技术': [
    { name: 'HTML5', color: 'red' },
    { name: 'CSS3', color: 'blue' },
    { name: 'JavaScript', color: 'orange' },
    { name: 'jQuery', color: 'blue' },
  ],
  'UI框架': [
    { name: 'Element UI', color: 'cyan' },
    { name: 'Ant Design', color: 'blue' },
    { name: 'Vant', color: 'green' },
    { name: 'LayUI', color: 'black' },
    { name: 'Bootstrap', color: 'purple' },
  ],
  '布局技术': [
    { name: '流式布局', color: 'orange' },
    { name: 'Flex布局', color: 'green' },
    { name: 'Rem适配', color: 'blue' },
    { name: 'VW适配', color: 'cyan' },
  ],
  '开发工具': [
    { name: 'Git', color: 'orange' },
    { name: 'Nginx', color: 'green' },
    { name: 'Mock', color: 'blue' },
    { name: 'ECharts', color: 'red' },
  ]
};

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [displayPosts, setDisplayPosts] = useState(getAllPosts() || []);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [sortOrder, setSortOrder] = useState('newest');

  // 社交媒体信息
  const socialInfo = [
    {
      icon: <WechatOutlined />,
      title: '微信',
      content: 'WeChat_123456',
      color: 'text-green-600'
    },
    {
      icon: <QqOutlined />,
      title: 'QQ',
      content: '123456789',
      color: 'text-blue-500'
    },
    {
      icon: <PhoneOutlined />,
      title: '电话',
      content: '13812345678',
      color: 'text-red-500'
    },
    {
      icon: <MailOutlined />,
      title: '邮箱',
      content: 'example@email.com',
      color: 'text-yellow-500'
    }
  ];

  // 搜索处理函数
  const handleSearch = (value) => {
    if (value && value.trim()) {
      setSearchHistory(prev => {
        const newHistory = [value, ...prev.filter(item => item !== value)].slice(0, 10);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        return newHistory;
      });
      const results = searchPosts(value) || [];
      setDisplayPosts(results);
    } else {
      setDisplayPosts(getAllPosts() || []);
    }
  };

  // 搜索框值改变时只更新输入框内容
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <Row gutter={24}>
      <Col xs={24} lg={16}>
        <div className="mb-8">
          <Search
            placeholder="搜索文章..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={handleSearchChange}
            onSearch={handleSearch}
          />
          
          <SearchHistory
            history={searchHistory}
            onSelect={(value) => {
              setSearchText(value);
              handleSearch(value);
            }}
            onClear={() => {
              setSearchHistory([]);
              localStorage.removeItem('searchHistory');
            }}
          />

          <div className="flex justify-between items-center mt-4 mb-6">
            <Button
              icon={sortOrder === 'newest' ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
              onClick={() => {
                const newOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
                setSortOrder(newOrder);
                const sorted = [...displayPosts].sort((a, b) => {
                  const dateA = new Date(a.date);
                  const dateB = new Date(b.date);
                  return newOrder === 'newest' ? dateB - dateA : dateA - dateB;
                });
                setDisplayPosts(sorted);
              }}
            >
              {sortOrder === 'newest' ? '最新文章' : '最早文章'}
            </Button>
          </div>
        </div>

        {displayPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            没有找到相关文章
          </div>
        ) : (
          <div className="space-y-6">
            {displayPosts.map(post => (
              <Card
                key={post.id}
                hoverable
                cover={
                  <img
                    alt={post.title}
                    src={post.coverImage}
                    className="h-48 object-cover"
                  />
                }
              >
                <Link to={`/post/${post.id}`}>
                  <h2 className="text-xl font-bold mb-2 hover:text-blue-600">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4">{post.summary}</p>
                <div className="flex justify-between items-center">
                  <Space size={[0, 8]} wrap>
                    {post.tags && post.tags.map(tag => (
                      <Tag key={tag} color="blue">
                        <TagOutlined className="mr-1" />
                        {tag}
                      </Tag>
                    ))}
                  </Space>
                  <span className="text-gray-400">
                    <ClockCircleOutlined className="mr-1" />
                    {post.date}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Col>
      
      <Col xs={24} lg={8}>
        <div className="sticky top-24 space-y-6">
          <Card className="text-center">
            <div className="flex items-start space-x-4 mb-6">
              <Avatar
                size={100}
                src={avatarImg}
                icon={<UserOutlined />}
              />
              <div className="text-left flex-1">
                <h2 className="text-xl font-bold mb-2">戴振朋</h2>
                <p className="text-gray-600 mb-2">前端开发工程师</p>
                <p className="text-gray-600 text-sm mb-2">
                  本科 · 计算机软件工程专业
                </p>
                <p className="text-gray-600 text-sm">
                  3年半前端开发相关工作经验
                </p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-6 text-xl mb-4">
              {socialInfo.map((item, index) => (
                <Popover
                  key={index}
                  content={
                    <div className="text-center">
                      <div className="font-bold mb-1">{item.title}</div>
                      <div>{item.content}</div>
                    </div>
                  }
                  trigger="hover"
                  placement="bottom"
                >
                  <span className={`${item.color} hover:scale-110 transition-transform cursor-pointer`}>
                    {item.icon}
                  </span>
                </Popover>
              ))}
            </div>

            <Divider />

            <div className="text-left">
              <div className="mb-6">
                <h3 className="font-bold mb-3">技术栈</h3>
                {Object.entries(skillsData).map(([category, skills]) => (
                  <div key={category} className="mb-3">
                    <h4 className="text-sm text-gray-500 mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <Tag 
                          key={skill.name} 
                          color={skill.color}
                          className="cursor-default"
                        >
                          {skill.name}
                        </Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h3 className="font-bold mb-2">个人简介</h3>
                <p className="text-gray-600 text-sm">
                  专注于前端开发，拥有扎实的前端基础知识和丰富的实践经验。
                  熟练掌握多个主流框架和技术栈，擅长响应式布局和移动端适配。
                  具有良好的编码习惯和团队协作能力。
                </p>
              </div>

              <div className="text-sm text-gray-500">
                <div className="mb-1">
                  文章：{getAllPosts().length} 篇
                </div>
                <div>
                  标签：{getAllTags().length} 个
                </div>
              </div>
            </div>
          </Card>

          <Card title="标签云" className="mb-6">
            <div className="flex flex-wrap gap-2">
              {getAllTags()?.map(tag => (
                <Tag 
                  key={tag} 
                  color="blue" 
                  className="cursor-pointer"
                  onClick={() => {
                    setSearchText(tag);
                    handleSearch(tag);
                  }}
                >
                  {tag}
                </Tag>
              )) || null}
            </div>
          </Card>
          
          <Card title="最新文章">
            <ul className="space-y-2">
              {getRecentPosts(5)?.map(post => (
                <li key={post.id}>
                  <Link to={`/post/${post.id}`} className="text-gray-600 hover:text-blue-600">
                    {post.title}
                  </Link>
                </li>
              )) || null}
            </ul>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default Home; 