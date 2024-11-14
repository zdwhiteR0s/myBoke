import { Card, Avatar, Divider, Tag, Timeline, Popover } from 'antd';
import { 
  UserOutlined, 
  WechatOutlined,
  QqOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  TrophyOutlined,
  BookOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import avatarImg from '../assets/img/avatar.jpg';

// 复用 Home 页面的技能数据
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

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 基本信息卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <div className="flex items-start space-x-8">
            <Avatar
              size={120}
              src={avatarImg}
              icon={<UserOutlined />}
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-4">戴振朋</h1>
              <div className="space-y-2 text-gray-600">
                <p><UserOutlined className="mr-2" />专注前端开发的工程师</p>
                <p><BookOutlined className="mr-2" />本科 · 计算机软件工程专业</p>
                <p><EnvironmentOutlined className="mr-2" />郑州</p>
                <p><TeamOutlined className="mr-2" />4年前端开发相关工作经验</p>
              </div>
              
              <Divider />
              
              <div className="flex space-x-6 text-xl">
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
            </div>
          </div>
        </Card>
      </motion.div>

      {/* 个人简介卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card title="关于我">
          <p className="text-gray-600 leading-relaxed">
            专注于前端开发，拥有扎实的前端基础知识和丰富的实践经验。
            熟练掌握多个主流框架和技术栈，擅长响应式布局和移动端适配。
            具有良好的编码习惯和团队协作能力。热爱技术分享和开源项目，
            持续关注前端领域的新技术发展。
          </p>
        </Card>
      </motion.div>

      {/* 技能专长卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card title="技能专长">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <TrophyOutlined className="mr-2 text-yellow-500" />
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <Tag 
                    key={skill.name} 
                    color={skill.color}
                    className="px-3 py-1"
                  >
                    {skill.name}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </Card>
      </motion.div>

      {/* 工作经历卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card title="工作经历">
          <Timeline>
            <Timeline.Item>
              <div className="mb-4">
                <h3 className="text-lg font-bold">中级前端开发工程师</h3>
                <p className="text-gray-500">郑州聊豆科技有限公司 · 2024.06.12-至今</p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>负责公司前端项目的开发和维护</li>
                  <li>参与技术方案设计和技术选型</li>
                  <li>负责前端性能优化和用户体验改善</li>
                </ul>
              </div>
            </Timeline.Item>

            <Timeline.Item>
              <div className="mb-4">
                <h3 className="text-lg font-bold">中级前端开发工程师</h3>
                <p className="text-gray-500">东华软件智能科技有限公司 · 2022.07.01-2024.06</p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>负责 AI 智能平台项目的前端开发工作</li>
                  <li>负责中国建筑建造一体化合同管理系统的开发</li>
                  <li>参与项目架构设计和技术方案制定</li>
                  <li>与产品、后端团队紧密协作，确保项目顺利交付</li>
                </ul>
              </div>
            </Timeline.Item>

            <Timeline.Item>
              <div className="mb-4">
                <h3 className="text-lg font-bold">中级前端开发工程师</h3>
                <p className="text-gray-500">中国新能源汽车有限公司 · 2021.03.01-2022.04.27</p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>参与公司前端项目开发</li>
                  <li>负责系统功能模块的实现和维护</li>
                  <li>配合团队完成项目开发和技术攻关</li>
                </ul>
              </div>
            </Timeline.Item>
          </Timeline>
        </Card>
      </motion.div>

      {/* 项目经验卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card title="项目经验">
          <Timeline>
            <Timeline.Item>
              <div className="mb-6">
                <h3 className="text-lg font-bold">AI智能平台</h3>
                <p className="text-gray-500 mb-2">东华软件智能科技有限公司</p>
                <div className="mb-3">
                  <h4 className="font-bold text-gray-700 mb-2">项目描述</h4>
                  <p className="text-gray-600">
                    全功能企业级AI开发平台，一站式完成模型构建、训练、部署的全部工作。
                    主要包含图形分类、物体检测、时序表格预测等AI模型，自动数据采集，智能数据清洗。
                    支持多人数据标注，AI模型使用流程简单创建模型，导入模型，训练模型，一键部署，
                    发布模型服务接口、大文件上传、OCR识别、视频图像监测。
                  </p>
                </div>
                <div className="mb-3">
                  <h4 className="font-bold text-gray-700 mb-2">技术栈</h4>
                  <div className="flex flex-wrap gap-2">
                    <Tag color="green">Vue3</Tag>
                    <Tag color="blue">Ant Design</Tag>
                    <Tag color="purple">Fabricjs</Tag>
                    <Tag color="orange">ECharts</Tag>
                    <Tag color="cyan">Webpack</Tag>
                    <Tag color="blue">Less</Tag>
                    <Tag color="red">jsencrypt</Tag>
                    <Tag color="purple">vue-ace-editor</Tag>
                  </div>
                </div>
                <div className="mb-3">
                  <h4 className="font-bold text-gray-700 mb-2">主要职责</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>作为唯一前端开发人员，负责整个项目的前端工作</li>
                    <li>设计和开发项目的前端架构和技术选型</li>
                    <li>负责项目用户界面的交互逻辑和数据展示</li>
                    <li>与产品、后端密切合作，确保数据交互和接口对接</li>
                  </ul>
                </div>
              </div>
            </Timeline.Item>

            <Timeline.Item>
              <div className="mb-6">
                <h3 className="text-lg font-bold">中国建筑建造一体化合同管理系统</h3>
                <p className="text-gray-500 mb-2">东华软件智能科技有限公司</p>
                <div className="mb-3">
                  <h4 className="font-bold text-gray-700 mb-2">项目描述</h4>
                  <p className="text-gray-600">
                    为中建开发的现代化定制化合同管理系统，旨在提高管理效率和信息透明度。
                    该系统提升了集团项目合同的管理效率和经营透明度。
                  </p>
                </div>
                <div className="mb-3">
                  <h4 className="font-bold text-gray-700 mb-2">技术栈</h4>
                  <div className="flex flex-wrap gap-2">
                    <Tag color="blue">React</Tag>
                    <Tag color="cyan">TypeScript</Tag>
                    <Tag color="purple">Umi</Tag>
                    <Tag color="blue">Ant Design</Tag>
                    <Tag color="green">valtio</Tag>
                    <Tag color="orange">ahooks</Tag>
                    <Tag color="cyan">Less</Tag>
                    <Tag color="red">ESLint</Tag>
                  </div>
                </div>
                <div className="mb-3">
                  <h4 className="font-bold text-gray-700 mb-2">负责模块</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>合同起草、合同分类</li>
                    <li>合同审批、合同签批</li>
                    <li>同变更、合同谈判</li>
                    <li>性能优化：实现懒加载、CDN加速等优化措施</li>
                  </ul>
                </div>
              </div>
            </Timeline.Item>
          </Timeline>
        </Card>
      </motion.div>
    </div>
  );
};

export default About; 