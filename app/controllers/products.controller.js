const { Products } = require('../models');

// CREAR NUEVO PRODUCTO
exports.createProduct = async (req, res) => {
  try {
    const { lote, name, price, available_quantity, entry_date } = req.body;

    // VALIDAR QUE LOS DATOS SE ENCUENTREN EN LA RESPUESTA
    if (!lote || !name || !price || !available_quantity|| !entry_date) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // BUSCAR EL LOTE REGISTRADO
    const existingProduct = await Products.findOne({ 
      where: { lote } 
    });
    // VALIDAR QUE EL LOTE NO SE ENCUENTRE REGISTRADO
    if (existingProduct) {
      return res.status(409).json({ message: "Ya existe un producto con ese lote" });
    }

     // CREAR OBJETO PRODUCTO
    const product = await Products.create({
      lote,
      name,
      price,
      available_quantity,
      entry_date
    });

    return res.status(201).json({
      message: "Producto creado exitosamente",
      product
    });

  } catch (error) {
    console.error('❌ Error al crear el producto:',error);
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

// LISTAR PRODUCTOS
exports.getProducts = async (req, res) => {
  try {
    const total = await Products.count(); // CONSULTA DE MODELOS CONTAR NUMERO DE REGISTROS 

    const products = await Products.findAll({
      order: [['entry_date', 'DESC']] //CONSULTA DE MODELOS ORDER BY (sequelize)
    });

    return res.status(200).json({
      message: "Lista de productos",
      total,
      products
    });

  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
// ACTUALIZAR PRODUCTO
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;//ID DEL PRODUCTO COMO PARAMETRO PARA UBICARLO
    const { lote, name, price, available_quantity, entry_date } = req.body;

    // BUSCAR EL PRODUCTO 
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    //VALIDAR LOS CAMPOS ENVIADOS
    if (!lote && !name && !price && !available_quantity && !entry_date) {
      return res.status(400).json({ message: "Debes enviar al menos un campo para actualizar" });
    }

    // ACTUALIZAR DATOS DEL PRODUCTO, IGNORANDO LOS DATOS NO ENVIADOS
    if (lote !== undefined) product.lote = lote;
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (available_quantity !== undefined) product.available_quantity = available_quantity;
    if (entry_date !== undefined) product.entry_date = entry_date;

    await product.save();

    return res.status(200).json({
      message: "Producto actualizado exitosamente",
      product
    });

  } catch (error) {
    console.error('❌ Error al actualizar producto:', error);
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
// ELIMINAR PRODUCTO
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // BUSCAR EL PRODUCTO
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // ELIMINAR EL PRODUCTO
    await product.destroy();

    return res.status(200).json({
      message: "Producto eliminado exitosamente"
    });

  } catch (error) {
    console.error('❌ Error al eliminar producto:', error);
    return res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};


