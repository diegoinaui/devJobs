const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const { validationResult, check } = require('express-validator');

exports.formCrearCuenta = async (req, res) => {
  res.render('crear-cuenta',
    {
      nombrePagina: 'Crea tu cuenta en devJobs',
      taglinea: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    });
};

exports.validarRegistro = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (e) {
    req.flash('error', e.errors.map(x => x.msg));

    res.render('crear-cuenta',
      {
        nombrePagina: 'Crea tu cuenta en devJobs',
        taglinea: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
        mensajes: req.flash()
      });
  }
};

exports.crearUsuario = async (req, res, next) => {
  const usuario = new Usuario(req.body);

  const nuevoUsuario = await usuario.save();

  if (!nuevoUsuario) return next();

  res.redirect('/iniciar-sesion',);
};

exports.formIniciarSesion = async (req, res) => {
  res.render('iniciar-sesion',
    { nombrePagina: 'Iniciar sesión en DevJobs' });
};