const routes = require('./app/routes');
const env = require('./app/utils/config');
const express = require('express');
const cors = require('cors');

const { sequelize, User } = require('./app/models');  

const app = express();

app.use(express.json());
app.use(cors());
app.use(env.API, routes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // 🔹 Esto ahora sí incluye User
    await sequelize.sync({ alter: true });
    console.log('📦 Modelos sincronizados con la base de datos.');

    app.listen(env.PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${env.PORT}${env.API}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    process.exit(1);
  }
})();
