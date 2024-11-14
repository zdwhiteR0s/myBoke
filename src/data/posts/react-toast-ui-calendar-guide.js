export const calendarGuidePost = {
  id: 4,
  title: 'React 集成 TOAST UI Calendar 实现强大的日历功能 - 完整指南',
  summary: '详细介绍如何在 React 项目中集成和使用 TOAST UI Calendar，包括基础配置、高级功能、性能优化、实际应用案例等全方位的内容...',
  content: `
# React 集成 TOAST UI Calendar 实现强大的日历功能 - 完整指南

## 引言
在企业级应用中，日历和日程管理是一个常见而重要的需求。TOAST UI Calendar 作为一个功能强大的日历组件，不仅提供了丰富的功能，还具有高度的可定制性。本文将详细介绍如何在 React 项目中集成和使用这个组件。

## 基础配置

### 1. 安装依赖
\`\`\`bash
# 使用 npm
npm install @toast-ui/react-calendar @toast-ui/calendar
npm install tui-date-picker tui-time-picker

# 或使用 yarn
yarn add @toast-ui/react-calendar @toast-ui/calendar
yarn add tui-date-picker tui-time-picker
\`\`\`

### 2. 基础使用
\`\`\`jsx
import { useRef } from 'react';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

const MyCalendar = () => {
  const calendarRef = useRef(null);

  const calendars = [
    {
      id: 'work',
      name: '工作',
      color: '#ffffff',
      backgroundColor: '#34c38f'
    },
    {
      id: 'personal',
      name: '个人',
      color: '#ffffff',
      backgroundColor: '#556ee6'
    }
  ];

  const initialEvents = [
    {
      id: '1',
      calendarId: 'work',
      title: '项目会议',
      category: 'time',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1))
    }
  ];

  return (
    <Calendar
      ref={calendarRef}
      height="900px"
      view="week"
      week={{
        startDayOfWeek: 1,
        workweek: true
      }}
      calendars={calendars}
      events={initialEvents}
    />
  );
};
\`\`\`

## 高级功能实现

### 1. 事件处理
\`\`\`jsx
const MyCalendar = () => {
  // ... 前面的代码保持不变

  const handleClickEvent = (event) => {
    const { id, title, start, end } = event.event;
    Modal.info({
      title: '事件详情',
      content: (
        <div>
          <p>标题：{title}</p>
          <p>开始时间：{format(start, 'yyyy-MM-dd HH:mm')}</p>
          <p>结束时间：{format(end, 'yyyy-MM-dd HH:mm')}</p>
        </div>
      )
    });
  };

  const handleBeforeCreateEvent = (eventData) => {
    return new Promise((resolve) => {
      Modal.confirm({
        title: '创建新事件',
        content: (
          <Form
            initialValues={{
              title: eventData.title || '新事件',
              calendarId: eventData.calendarId || 'work'
            }}
          >
            <Form.Item label="标题" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="日历" name="calendarId">
              <Select>
                {calendars.map(cal => (
                  <Select.Option key={cal.id} value={cal.id}>
                    {cal.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        ),
        onOk: (values) => {
          resolve({
            ...eventData,
            ...values
          });
        }
      });
    });
  };

  return (
    <Calendar
      // ... 其他属性
      onClickEvent={handleClickEvent}
      onBeforeCreateEvent={handleBeforeCreateEvent}
    />
  );
};
\`\`\`

### 2. 自定义视图
\`\`\`jsx
const CustomToolbar = ({ onViewChange, onDateChange, view, currentDate }) => {
  return (
    <div className="calendar-toolbar">
      <Space>
        <Button onClick={() => onDateChange('prev')}>
          <LeftOutlined />
        </Button>
        <Button onClick={() => onDateChange('next')}>
          <RightOutlined />
        </Button>
        <Button onClick={() => onDateChange('today')}>今天</Button>
        
        <Select value={view} onChange={onViewChange}>
          <Select.Option value="day">日视图</Select.Option>
          <Select.Option value="week">周视图</Select.Option>
          <Select.Option value="month">月视图</Select.Option>
        </Select>
        
        <span className="current-date">
          {format(currentDate, 'yyyy年MM月')}
        </span>
      </Space>
    </div>
  );
};
\`\`\`

### 3. 拖拽功能
\`\`\`jsx
const handleDrop = (dropData) => {
  const { draggingEvent, changes } = dropData;
  
  // 更新事件时间
  const updatedEvent = {
    ...draggingEvent,
    start: changes.start,
    end: changes.end
  };

  // 更新状态或发送到服务器
  updateEvent(updatedEvent);
};

const handleResize = (resizeData) => {
  const { event, changes } = resizeData;
  
  // 更新事件时间
  const updatedEvent = {
    ...event,
    start: changes.start,
    end: changes.end
  };

  // 更新状态或发送到服务器
  updateEvent(updatedEvent);
};
\`\`\`

## 实际应用案例

### 1. 会议室预订系统
\`\`\`jsx
const MeetingRoomCalendar = () => {
  const [rooms] = useState([
    { id: 'room1', name: '会议室A', capacity: 10 },
    { id: 'room2', name: '会议室B', capacity: 20 }
  ]);

  const handleBeforeCreateEvent = (eventData) => {
    // 检查会议室是否可用
    const isRoomAvailable = checkRoomAvailability(
      eventData.calendarId,
      eventData.start,
      eventData.end
    );

    if (!isRoomAvailable) {
      message.error('该时段会议室已被预订');
      return false;
    }

    // 创建预订
    return createBooking(eventData);
  };

  return (
    <Calendar
      // ... 其他配置
      onBeforeCreateEvent={handleBeforeCreateEvent}
    />
  );
};
\`\`\`

### 2. 课程表系统
\`\`\`jsx
const CourseSchedule = () => {
  const template = {
    time(event) {
      return \`
        <div class="course-event">
          <div class="course-name">\${event.title}</div>
          <div class="teacher-name">\${event.teacher}</div>
          <div class="room-name">\${event.room}</div>
        </div>
      \`;
    }
  };

  return (
    <Calendar
      // ... 其他配置
      template={template}
    />
  );
};
\`\`\`

## 性能优化

### 1. 事件处理优化
\`\`\`jsx
const handleEventUpdate = useCallback((event) => {
  // 处理事件更新
}, []);

const handleEventCreate = useCallback((event) => {
  // 处理事件创建
}, []);
\`\`\`

### 2. 渲染优化
\`\`\`jsx
const MemoizedToolbar = React.memo(CustomToolbar);
const MemoizedEventForm = React.memo(EventForm);
\`\`\`

## 样式定制

### 1. 主题配置
\`\`\`javascript
const theme = {
  common: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    holidayColor: '#f43f5e',
    saturday: { color: '#1d4ed8' },
    sunday: { color: '#f43f5e' }
  },
  week: {
    dayName: {
      borderBottom: '1px solid #e5e7eb'
    },
    timeGrid: {
      borderRight: '1px solid #e5e7eb'
    }
  }
};
\`\`\`

### 2. 自定义样式
\`\`\`css
.toastui-calendar-event {
  border-radius: 4px;
  font-size: 12px;
}

.course-event {
  padding: 4px;
}

.course-name {
  font-weight: bold;
}

.teacher-name {
  font-size: 11px;
  color: #666;
}
\`\`\`

## 最佳实践

1. **状态管理**
   - 使用 Redux 或 Context 管理全局状态
   - 实现数据的持久化
   - 处理并发操作

2. **错误处理**
   - 添加错误边界
   - 实现优雅的降级方案
   - 提供友好的错误提示

3. **性能优化**
   - 使用 React.memo 优化组件
   - 实现虚拟滚动
   - 优化大量事件的渲染

4. **用户体验**
   - 添加加载状态
   - 实现平滑的动画效果
   - 提供操作反馈

## 总结

TOAST UI Calendar 是一个功能强大的日历组件，通过合理的配置和使用，可以满足各种复杂的日程管理需求。在实际应用中，需要注意：

1. 合理的组件封装
2. 完善的错误处理
3. 优秀的性能表现
4. 良好的用户体验
5. 可维护的代码结构

通过本文的指导，你应该能够在 React 项目中熟练使用 TOAST UI Calendar，并根据实际需求进行定制和优化。
`,
  author: '戴振朋',
  date: '2024-11-12',
  tags: ['React', '前端开发', 'UI组件', 'Calendar', '实战教程'],
  readTime: '15分钟',
  likes: 15,
  views: 45,
  coverImage: 'https://picsum.photos/800/403'
}; 