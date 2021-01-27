import { Table, Input, Button } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddUserForm } from '../components/AddUserForm'
import {
  deleteUser,
  getUsers,
  selectorUsers
} from '../features/users/usersSlice'
import { SearchOutlined } from '@ant-design/icons'
import { logout } from '../features/auth/authSlice'

import './home.css'

export const Home = () => {
  const [filteredInfo, setfilteredInfo] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const { users, status } = useSelector(selectorUsers)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleChange = (e) => {
    setfilteredInfo({ username: [e.target.value] } || null)
  }

  const hanldeUser = (record) => {
    setUser(record)
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '6%',
      ellipsis: true,
      editable: true,
      align: 'center'
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: '37%',
      filteredValue: filteredInfo.username || null,
      onFilter: (value, record) =>
        record.username.toLowerCase().includes(value.toLowerCase()),
      ellipsis: true,
      editable: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '37%',
      ellipsis: true,
      editable: true
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',
      align: 'center',
      render: (text, record) => (
        <>
          <Button
            danger
            style={{ display: 'inline' }}
            onClick={() => dispatch(deleteUser(record.id))}
          >
            Delete
          </Button>
          <Button
            style={{ display: 'inline', marginLeft: '1em' }}
            onClick={() => hanldeUser(record)}
          >
            Update
          </Button>
        </>
      )
    }
  ]

  return (
    <div className="wrap">
      <header>
        <span>Users</span>
        <Button
          type="primary"
          className="logout"
          onClick={() => dispatch(logout())}
        >
          logout
        </Button>
      </header>

      <Input
        className="input-search"
        placeholder="search user"
        prefix={<SearchOutlined />}
        onChange={handleChange}
      />
      <AddUserForm user={user} />

      <Table
        loading={status === 'loading'}
        columns={columns}
        dataSource={users}
        rowKey={(record) => record.id}
        bordered
        handleChange={handleChange}
      />
    </div>
  )
}
