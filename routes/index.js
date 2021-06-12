const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const { body, check } = require('express-validator');

module.exports = () => {
  router.get('/', homeController.mostrarTrabajos);

  router.get('/vacantes/nueva', vacantesController.formularioNuevaVacante);

  router.post('/vacantes/nueva', vacantesController.agregarVacante);

  router.get('/vacantes/:url', vacantesController.mostrarVacante);

  router.get('/vacantes/editar/:url', vacantesController.formEditarVacante);

  router.post('/vacantes/editar/:url', vacantesController.editarVacante);

  router.get('/crear-cuenta', usuariosController.formCrearCuenta);

  router.post('/crear-cuenta',
    body('nombre').trim().escape(),
    body('email').trim().escape(),
    body('password').trim().escape(),
    body('confirmar').trim().escape(),
    check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    check('email').isEmail().withMessage('El email debe ser válido'),
    check('password').notEmpty().withMessage('El password no puede ir vacío'),
    check('confirmar').notEmpty().withMessage('Confirmar no puede ir vacío'),
    check('confirmar').custom((value, { req }) => value === req.body.password).withMessage('El password es diferente'),
    usuariosController.validarRegistro,
    usuariosController.crearUsuario
  );

  router.get('/iniciar-sesion', usuariosController.formIniciarSesion);

  router.post('/iniciar-sesion', authController.autenticarUsuario);

  return router;
};