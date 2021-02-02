import { Form, Input, Button, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';

export const Login = () => {
  const [err, setError] = useState(null);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(login(values)).then((err) => err && setError(unwrapResult(err)));
  };

  // unmount err
  useEffect(() => {
    return () => {
      setError(false);
    };
  }, []);

  return (
    <Card style={{ width: '400px', margin: '10em auto' }}>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your username!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {err && (
            <div style={{ color: 'tomato', marginLeft: 'auto' }}>
              {err.message}
            </div>
          )}
        </div>
      </Form>
    </Card>
  );
};
