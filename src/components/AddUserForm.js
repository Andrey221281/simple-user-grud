import { unwrapResult } from '@reduxjs/toolkit'
import { Form, Input, Button } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../features/users/usersSlice'

export const AddUserForm = () => {
  const [err, setError] = useState(null)
  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(createUser(values)).then((e) => setError(unwrapResult(e)))
  }

  return (
    <Form
      name="AddUserForm"
      layout="inline"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        // label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="username" />
      </Form.Item>

      <Form.Item
        name="email"
        placeholder="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input placeholder="email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder="password" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      {err && <div style={{ color: 'tomato' }}>{err.message}</div>}
    </Form>
  )
}
