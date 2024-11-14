import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, UserOutlined, FolderOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/home',
      icon: <HomeOutlined />,
      label: <Link to="/home">首页</Link>,
    },
    {
      key: '/archive',
      icon: <FolderOutlined />,
      label: <Link to="/archive">归档</Link>,
    },
    {
      key: '/about',
      icon: <UserOutlined />,
      label: <Link to="/about">关于</Link>,
    },
  ];

  return (
    <AntLayout className="min-h-screen">
      <Header className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/home" className="text-2xl font-bold text-primary">
            戴码印记
          </Link>
          <Menu 
            mode="horizontal" 
            selectedKeys={[location.pathname.replace('/myBoke', '')]}
            items={menuItems}
            className="border-0"
          />
        </div>
      </Header>
      
      <Content className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {children}
      </Content>
      
      <Footer className="text-center bg-white">
        戴码印记 ©{new Date().getFullYear()} Created with React + Ant Design
      </Footer>
    </AntLayout>
  );
};

export default Layout; 