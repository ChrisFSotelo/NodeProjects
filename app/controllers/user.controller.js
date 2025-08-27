const bcrypt = require('bcrypt');
const { User } = require('../models');

// Crear nuevo usuario
exports.createUser = async (req, res) => {

  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: true, msg: 'Faltan datos obligatorios' });
    }

    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: true, msg: 'El email ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

      // CREAR USUARIO
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'Cliente'
    });

    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };

    res.status(201).json({
      error: false,
      msg: 'Usuario creado exitosamente',
      data: userResponse
    });

  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    res.status(500).json({ error: true, msg: 'Error en el servidor' });
  }
};
