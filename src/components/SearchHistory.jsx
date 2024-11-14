import { Tag, Card } from 'antd';
import { ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const SearchHistory = ({ history, onSelect, onClear }) => {
  if (!history.length) return null;

  return (
    <Card 
      size="small" 
      title={
        <div className="flex justify-between items-center">
          <span>搜索历史</span>
          <DeleteOutlined 
            className="cursor-pointer text-gray-400 hover:text-red-500"
            onClick={onClear}
          />
        </div>
      }
      className="mb-4"
    >
      <div className="flex flex-wrap gap-2">
        {history.map((item, index) => (
          <Tag
            key={index}
            className="cursor-pointer"
            icon={<ClockCircleOutlined />}
            onClick={() => onSelect(item)}
          >
            {item}
          </Tag>
        ))}
      </div>
    </Card>
  );
};

export default SearchHistory; 