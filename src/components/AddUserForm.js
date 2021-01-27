import { unwrapResult } from '@reduxjs/toolkit'
import { Form, Input, Button } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser, updateUser } from '../features/users/usersSlice'

export const AddUserForm = ({ user }) => {
  const [err, setError] = useState(null)
  const [update, setUpdate] = useState(false)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    if (!user) return
    setUpdate(true)
    form.setFieldsValue({
      ...user
    })
  }, [form, user])

  const onFinish = (values) => {
    if (update) {
      dispatch(updateUser({ id: user.id, values }))
        .then((e) => {
          form.resetFields()
          setUpdate(true)
          setError(unwrapResult(e))
        })
        .finally(() => setUpdate(false))
    } else {
      dispatch(createUser(values))
        .then((e) => {
          form.resetFields()
          setUpdate(true)
          setError(unwrapResult(e))
        })
        .finally(() => setUpdate(false))
    }
  }

  // const onReset = () => {
  //   form.resetFields()
  //   setUpdate(false)
  // }

  return (
    <Form
      form={form}
      name="AddUserForm"
      layout="inline"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="username" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input placeholder="email" value="value value" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder="password" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        {user && update ? `Update ${user.username}` : 'Add user'}
      </Button>

      {err && <div style={{ color: 'tomato' }}>{err.message}</div>}
    </Form>
  )
}
