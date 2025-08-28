// app/helpers/validarUsuarioAdmin.js
const { User } = require('../models');

// FUNCION PARA VALIDAR USUARIO ADMINISTRADOR
const validarUsuarioAdmin = async (userId) => {
  // OBTENER EL USUARIO LOGUEADO DESDE LA BASE DE DATOS
  const loggedUser = await User.findByPk(userId);
  if (!loggedUser) {
    const error = new Error("USUARIO NO ENCONTRADO");
    error.status = 404;
    throw error;
  }

  // VERIFICAR QUE EL USUARIO SEA ADMINISTRADOR
  if (loggedUser.role !== 'Administrador') {
    const error = new Error("ACCESO DENEGADO: SOLO ADMINISTRADORES");
    error.status = 403;
    throw error;
  }

  return loggedUser;
};

module.exports = validarUsuarioAdmin;
