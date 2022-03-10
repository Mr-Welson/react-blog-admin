import React, { useState } from 'react';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { withRouter, useHistory } from 'react-router-dom';
import './index.less';
import { Card, Input, Button, Spin, message } from 'antd';
import Service from '@/service';
import { TOKEN_KEY } from '@/utils/auth';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('123456');
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const onCheckLogin = async () => {
    if (!username.trim()) {
      return message.error('用户名不能为空');
    }
    if (!password.trim()) {
      return message.error('密码不能为空');
    }
    setLoading(true);
    try {
      const result = await Service.user.login({ username, password });
      setLoading(false);
      if (result.code !== 200) {
        return message.error(result.message);
      }
      // 身份验证信息
      sessionStorage.setItem(TOKEN_KEY, result.data);
      history.push('/');
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className='login-div'>
      <Spin tip='Loading...' spinning={loading}>
        <Card title='Blog System' bordered={true} style={{ width: 400 }}>
          <Input
            id='userName'
            size='large'
            value={username}
            placeholder='Enter your userName'
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id='password'
            size='large'
            value={password}
            placeholder='Enter your password'
            prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type='primary' size='large' block onClick={onCheckLogin}>
            {' '}
            Login in{' '}
          </Button>
        </Card>
      </Spin>
    </div>
  );
};

export default withRouter(Login);
