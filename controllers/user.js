const { z } = require("zod")
const { User } = require("../models/user")

async function listUsers(req, res) {
  const users = await User.findAll()
  res.json(users)
}

async function getUser(req, res) {
  const user = await User.findByPk(req.params.id)

  if (!user) {
    res.status(404).json({
      message: "Usuario no encontrado"
    })
    return
  }

  res.json(user)
}

async function createUser(req, res) {
  const userSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
    lastName: z.string(),
    age: z.number().min(18).max(36)
  })

  const valid = userSchema.safeParse(req.body)

  if (!valid.success) {
    res.status(400).json({
      message: "Parametros inválidos",
      result: valid.error
    })
    return
  }

  const userExists = await User.findOne({
    where: {
      email: req.body.email
    }
  })

  if (userExists) {
    res.status(403).json({
      message: "Usuario ya registrado"
    })
    return
  }

  const user = await User.create(req.body)
  res.json(user)
}

async function updateUser(req, res) {
  const result = await User.update(req.body, {
    where: {
      id: Number(req.params.id)
    }
  })

  res.json({
    updated: result[0] > 0,
  })
}

async function deleteUser(req, res) {
  const response = await User.destroy({
    where: {
      id: Number(req.params.id)
    }
  })

  res.json({
    removed: response > 0
  })
}

async function authenticateUser(req, res) {
  const loginSchema = z.object({
    email: z.string(),
    password: z.string()
  })

  const valid = loginSchema.safeParse(req.body)

  if (!valid.success) {
    res.status(400).json({
      message: "Parámetros inválidos",
      result: valid.error
    })
    return
  }

  const user = await User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })

  if (!user) {
    res.status(404).json({
      message: "Usuario y/o contraseña inválidos",
    })
    return
  }

  res.json(user)
}

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser, authenticateUser }