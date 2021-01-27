const fs = require('fs')
const jwt = require('jsonwebtoken')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

const userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))
const accessTokenSecret = 'secret'

function createToken(payload) {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: '365d' })
}

const admin = {
  email: 'test@test.ru',
  password: '123'
}

function isAuthenticated({ email, password }) {
  return admin.email === email && admin.password === password
}
const authenticateJWTMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        console.log('user', err)
        return res.sendStatus(403)
      }
      req.user = user
      next()
    })
  } else {
    res.sendStatus(401).json({ message: 'Unauthorized (401)' })
  }
}
// login
server.post('/auth/login', (req, res, next) => {
  const { email, password } = req.body
  if (!isAuthenticated({ email, password })) {
    res.json({ message: 'Incorrect email or password' })
    return
  }
  const token = createToken({ email })
  res.status(200).json({ token })
})

// Get all users
server.get('/users', authenticateJWTMiddleware, (req, res) => {
  res.status(200).json({ users: userdb.users })
})

// Get user
server.get('/user/:name', authenticateJWTMiddleware, (req, res) => {
  const searchParam = req.params.name.toLowerCase()
  const searchUserByName = userdb.users.find(
    (user) => user.username.toLowerCase() === searchParam
  )

  res.status(200).json({ user: searchUserByName })
})

// Delete user
server.post('/user/:id', authenticateJWTMiddleware, (req, res) => {
  const searchParam = req.params.id
  const newUserdb = userdb.users.filter(
    (user) => user.id !== Number(searchParam)
  )
  const jsonData = JSON.stringify({ users: newUserdb })

  fs.writeFileSync('./db.json', jsonData, 'UTF-8')
  res.status(200).json({ users: newUserdb })
})

// Create user
server.post('/user', authenticateJWTMiddleware, (req, res) => {
  fs.writeFileSync('./db.json', req.body, 'UTF-8')
  res.status(200).json({ users: userdb.users })
})

// Update user
server.post('/user/update/:id', authenticateJWTMiddleware, (req, res) => {
  const searchParam = req.params.id
  const { username, email, password } = req.body

  let newUserdb = userdb.users.filter((user) => user.id !== Number(searchParam))

  newUserdb.push({
    username,
    email,
    password,
    id: Number(req.params.id)
  })

  const jsonData = JSON.stringify({ users: newUserdb })
  fs.writeFileSync('./db.json', jsonData, 'UTF-8')

  res.status(200).json({ users: newUserdb })
})

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
