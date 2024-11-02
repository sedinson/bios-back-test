const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const users = [{
  id: 1,
  name: "Edinson",
  lastName: "Salas",
  age: 30
}, {
  id: 2,
  name: "Pedro",
  lastName: "Perez",
  age: 20
}]

app.get('/users', function (req, res) {
  res.json(users.filter((user) => !!user))
})

app.get('/users/:id', function (req, res) {
  const user = users.find((user) => user?.id === Number(req.params.id))

  if (!user) {
    res.status(404).json({
      message: "Usuario no encontrado"
    })
    return
  }

  res.json(user)
})

app.post('/users', function (req, res) {
  const user = { ...req.body, id: users.length + 1 }
  users.push(user)
  res.json(user)
})

app.patch('/users/:id', function (req, res) {
  const userIndex = users.findIndex((user) => user.id === Number(req.params.id));

  if (userIndex === -1) {
    res.status(404).json({
      message: "Usuario no encontrado"
    })
    return
  }

  const { id, ...user } = req.body
  const editUser = { ...users[userIndex], ...user }
  users[userIndex] = editUser
  res.json(editUser)
})

app.delete('/users/:id', function (req, res) {
  const userIndex = users.findIndex((user) => user.id === Number(req.params.id));

  if (userIndex === -1) {
    res.status(404).json({
      message: "Usuario no encontrado"
    })
    return
  }

  delete users[userIndex]
  res.json({
    message: "Usuario eliminado"
  })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Ooops, algo ha salido terriblemente mal"
  })
})

app.listen(3000)