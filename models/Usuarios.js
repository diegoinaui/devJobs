const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const usuariosSchema = new mongoose.Schema({
  email: {
    type: String,
    uniqe: true,
    lowercase: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: 'Agrega tu nombre',
  },
  password: {
    type: String,
    trim: true,
    required: true,
    trim: true
  },
  token: String,
  expira: Date
});

usuariosSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
});

usuariosSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next('Ese correo ya esta registrado');
  }

  next(error);
});

usuariosSchema.methods = {
  compararPassword: function (password) {
    return bcrypt.compareSync(password, this.password);
  }
};

module.exports = mongoose.model('Usuario', usuariosSchema);