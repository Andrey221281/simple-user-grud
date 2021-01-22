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

function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  )
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
server.post('/auth/login', (req, res, next) => {
  const { email, password } = req.body

  if (!isAuthenticated({ email, password })) {
    res.json({ message: 'Incorrect email or password' })
    return
  }

  const token = createToken({ email })

  res.status(200).json({ token })
})

server.get('/users', authenticateJWTMiddleware, (req, res) => {
  res.status(200).json({ users: userdb.users })
})

server.get('/user/:name', authenticateJWTMiddleware, (req, res) => {
  console.log(req.params.name)

  const searchParam = req.params.name.toLowerCase()

  const searchUserByName = userdb.users.find(
    (user) => user.username.toLowerCase() === searchParam
  )

  res.status(200).json({ user: searchUserByName })
})

server.post('/user', authenticateJWTMiddleware, (req, res) => {
  fs.writeFileSync('./db.json', req.body, 'UTF-8')

  res.status(200).json({ users: userdb.users })
})

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
