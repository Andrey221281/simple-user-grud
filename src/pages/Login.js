import { Form, Input, Button, Card } from 'antd'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { login } from '../features/auth/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'

export const Login = () => {
  const [err, setError] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: '/' } }

  const onFinish = (values) => {
    dispatch(login(values)).then((e) => setError(unwrapResult(e)))
    // history.replace(from)
  }
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
  )
}
