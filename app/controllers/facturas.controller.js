const { User, Products, Facturas, ProductoFactura } = require('../models');

// REGISTRAR COMPRA
exports.createFactura = async (req, res) => {
  const { clienteId, productos } = req.body;

  try {
    // VALIDAR USUARIO CON ROL DE CLIENTE
    const cliente = await User.findByPk(clienteId);
    if (!cliente || cliente.role !== 'Cliente') 
      return res.status(400).json({ msg: 'Cliente no válido' });

    // CALCULAR COSTOS DE IVA, SUB TOTAL Y TOTAL
    let subtotal = 0;
    for (const item of productos) {
      const producto = await Products.findByPk(item.productoId);
      if (!producto) 
        return res.status(400).json({ msg: `Producto ${item.productoId} no encontrado` });
      if (producto.cantidad < item.cantidad) 
        return res.status(400).json({ msg: `Stock insuficiente para ${producto.nombre}` });

      subtotal += producto.price * item.cantidad;
    }
    const iva = subtotal * 0.19; 
    const total = subtotal + iva;

    //  CREAR OBJETO FACTURA
    const factura = await Facturas.create({ clienteId, subtotal, iva, total });

    // CREAR LA RELACION DE PRODUCTO/FACTURA
    for (const item of productos) {
      const producto = await Products.findByPk(item.productoId);

      //CREAR OBJETO PRODUCTO_FACTURA
      await ProductoFactura.create({
        facturaId: factura.id,
        productoId: producto.id,
        cantidad: item.cantidad,
        precioVenta: producto.price
      });
      // DISMINUIR STOCK
      producto.available_quantity -= item.cantidad;
      await producto.save();

    }
    //RETORNA LOS DATOS DE LA FACTURA Y LOS PRODUCTOS COMPRADOS
    const facturaCompleta = await Facturas.findByPk(factura.id, {
      include: {
        model: Products,
        as: 'productos',
        through: { attributes: ['cantidad', 'precioVenta'] }
      }
    });

    res.json({
      id: facturaCompleta.id,
      clienteId: facturaCompleta.clienteId,
      subtotal: facturaCompleta.subtotal,
      iva: facturaCompleta.iva,
      total: facturaCompleta.total,
      fechaCompra: facturaCompleta.createdAt,
      productos: facturaCompleta.productos
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al procesar la compra' });
  }
};
// GET ALL FACTURAS / PRODUCTOS - CLIENTE QUE COMPRA
exports.getFacturas = async (req, res) => {
  try {
    const facturas = await Facturas.findAll({
      include: [
        { model: User, as: 'cliente', attributes: ['id', 'username', 'email'] },
        { model: Products, as: 'productos', through: { attributes: ['cantidad', 'precioVenta'] } }
      ]
    });

    // TRANSFORMAR EL ARREGLO CON .MAP
    const facturasFormateadas = facturas.map(f => ({
      factura: {
        id: f.id,
        subtotal: f.subtotal,
        iva: f.iva,
        total: f.total,
        fechaCompra: f.createdAt
      },
      cliente: {
        id: f.cliente.id,
        username: f.cliente.username,
        email: f.cliente.email
      },
      productos: f.productos.map(p => ({
        id: p.id,
        name: p.name,
        cantidad: p.ProductoFactura.cantidad,
        precioVenta: p.ProductoFactura.precioVenta
      }))
    }));

    res.json(facturasFormateadas);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener facturas' });
  }
};

