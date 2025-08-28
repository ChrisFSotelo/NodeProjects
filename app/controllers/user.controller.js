const bcrypt = require('bcrypt');
const { User } = require('../models');

// CREAR NUEVO USUARIO
exports.createUser = async (req, res) => {

  try {
    const { username, email, password, role } = req.body;

    // VALIDAR QUE LOS DATOS SE ENCUENTREN EN LA RESPUESTA
    if (!username || !email || !password) {
      return res.status(400).json({ error: true, msg: 'Faltan datos obligatorios' });
    }
    // BUSCAR EL EMAIL REGISTRADO
    const existingUser = await User.findOne({
      where: { email }
    });
    // VALIDAR QUE EL EMAIL NO SE ENCUENTRE REGISTRADO
    if (existingUser) {
      return res.status(400).json({ error: true, msg: 'El email ya está registrado' });
    }

    //ENCRIPTAR LA CONTRASEÑA
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREAR OBJETO USUARIO
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'Cliente'
    });
    //ENVIAR DATOS EN LA RESPUESTA
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

//AUTENTICAR USUARIO
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // VALIDAR QUE LOS DATOS SE ENCUENTREN EN LA RESPUESTA
    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son requeridos" });
    }

    // BUSCAR EMAIL RECIBIDO
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // COMPARAR HASH GENEREADO  CON EL HASH EN BD
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // RETORNAR USUARIO AUTENTICADO
    const { password: _, ...userData } = user.toJSON();

    return res.status(200).json({
      message: "Login exitoso",
      user: userData,
    });

  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

