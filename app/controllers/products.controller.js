const { Products } = require('../models');
const validarUsuarioAdmin = require('../helpers/validarUsuarioAdmin');

// CREAR NUEVO PRODUCTO
exports.createProduct = async (req, res) => {
  try {
    const { userId, lote, name, price, available_quantity, entry_date } = req.body;

    // VALIDAR USUARIO ADMINISTRADOR
    await validarUsuarioAdmin(userId);

    // VALIDAR QUE LOS DATOS SE ENCUENTREN EN LA RESPUESTA
    if (!lote || !name || !price || !available_quantity || !entry_date) {
      return res.status(400).json({ message: "TODOS LOS CAMPOS SON OBLIGATORIOS" });
    }

    // BUSCAR EL LOTE REGISTRADO
    const existingProduct = await Products.findOne({ where: { lote } });
    if (existingProduct) {
      return res.status(409).json({ message: "YA EXISTE UN PRODUCTO CON ESE LOTE" });
    }

    // CREAR OBJETO PRODUCTO
    const product = await Products.create({ lote, name, price, available_quantity, entry_date });

    return res.status(201).json({ message: "PRODUCTO CREADO EXITOSAMENTE", product });

  } catch (error) {
    console.error('❌ ERROR AL CREAR EL PRODUCTO:', error);
    return res.status(error.status || 500).json({ message: error.message, error: error.message });
  }
};

// LISTAR PRODUCTOS
exports.getProducts = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;

    // VALIDAR USUARIO ADMINISTRADOR
    await validarUsuarioAdmin(userId);

    const total = await Products.count(); // CONTAR NUMERO DE REGISTROS
    const products = await Products.findAll({ order: [['entry_date', 'DESC']] });

    return res.status(200).json({ message: "LISTA DE PRODUCTOS", total, products });

  } catch (error) {
    console.error('❌ ERROR AL OBTENER PRODUCTOS:', error);
    return res.status(error.status || 500).json({ message: error.message, error: error.message });
  }
};

// ACTUALIZAR PRODUCTO
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, lote, name, price, available_quantity, entry_date } = req.body;

    // VALIDAR USUARIO ADMINISTRADOR
    await validarUsuarioAdmin(userId);

    // BUSCAR EL PRODUCTO
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "PRODUCTO NO ENCONTRADO" });
    }

    // VALIDAR LOS CAMPOS ENVIADOS
    if (!lote && !name && !price && !available_quantity && !entry_date) {
      return res.status(400).json({ message: "DEBES ENVIAR AL MENOS UN CAMPO PARA ACTUALIZAR" });
    }

    // ACTUALIZAR DATOS DEL PRODUCTO
    if (lote !== undefined) product.lote = lote;
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (available_quantity !== undefined) product.available_quantity = available_quantity;
    if (entry_date !== undefined) product.entry_date = entry_date;

    await product.save();

    return res.status(200).json({ message: "PRODUCTO ACTUALIZADO EXITOSAMENTE", product });

  } catch (error) {
    console.error('❌ ERROR AL ACTUALIZAR PRODUCTO:', error);
    return res.status(error.status || 500).json({ message: error.message, error: error.message });
  }
};

// ELIMINAR PRODUCTO
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId || req.query.userId;

    // VALIDAR USUARIO ADMINISTRADOR
    await validarUsuarioAdmin(userId);

    // BUSCAR EL PRODUCTO
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "PRODUCTO NO ENCONTRADO" });
    }

    // ELIMINAR EL PRODUCTO
    await product.destroy();

    return res.status(200).json({ message: "PRODUCTO ELIMINADO EXITOSAMENTE" });

  } catch (error) {
    console.error('❌ ERROR AL ELIMINAR PRODUCTO:', error);
    return res.status(error.status || 500).json({ message: error.message, error: error.message });
  }
};
