const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

connection = mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', (error) => {
  console.error(error);
});

require('../models/Vacantes');
require('../models/Usuarios');