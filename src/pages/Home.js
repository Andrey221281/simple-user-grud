import { Table, Space, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddUserForm } from '../components/AddUserForm'
import { getUsers, selectorUsers } from '../features/users/usersSlice'
import { SearchOutlined } from '@ant-design/icons'

const { Column } = Table
const { Search } = Input

export const Home = () => {
  const [filteredInfo, setfilteredInfo] = useState('Andrey')
  const dispatch = useDispatch()
  const { users, status } = useSelector(selectorUsers)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '10em auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2em'
        }}
      >
        <Search
          style={{ width: '400px' }}
          placeholder="search user"
          loading={false}
          enterButton
        />
        <AddUserForm />
      </div>
      <Table
        onChange={handleChange}
        loading={status === 'loading'}
        dataSource={users}
        bordered
        rowKey={(record) => record.id}
      >
        <Column widt="10" title="Id" dataIndex="id" key="id" />
        <Column
          title="Username"
          dataIndex="username"
          key="username"
          filteredValue={filteredInfo.username || null}
          onFilter={(value, record) => record.username.includes(value)}
        />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Action"
          key="company.catchPhrase"
          render={(text, record) => (
            <Space size="middle">
              <a>Invite {record.name}</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
      {/* {state.map((user) => (
        <div key={user.id}>
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>
      ))} */}
    </div>
  )
}
