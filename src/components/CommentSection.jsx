import { Avatar, Form, Button, Input, List } from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [commentValue, setCommentValue] = useState('');

  const handleSubmitComment = () => {
    if (!commentValue) return;
    setSubmitting(true);
    
    setTimeout(() => {
      setComments([
        ...comments,
        {
          author: '访客',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: commentValue,
          datetime: new Date().toLocaleString()
        }
      ]);
      setCommentValue('');
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">评论</h3>
      
      <Form className="mb-6">
        <Form.Item>
          <TextArea
            rows={4}
            value={commentValue}
            onChange={e => setCommentValue(e.target.value)}
            placeholder="写下你的评论..."
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            loading={submitting}
            onClick={handleSubmitComment}
            type="primary"
          >
            发表评论
          </Button>
        </Form.Item>
      </Form>

      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} alt={item.author} />}
              title={item.author}
              description={item.content}
            />
            <div className="text-gray-400 text-sm">{item.datetime}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommentSection; 