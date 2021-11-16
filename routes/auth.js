const {Router} = require('express');
const router = Router();
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.post(
    '/new', 
    [   // Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de minimo 6 caracteres').isLength({min:6}),
        validarCampos
    ], 
    crearUsuario 
);

router.post(
    '/', 
    [ // Middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de minimo 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario
);

router.post(
    '/',
    revalidarToken
);

module.exports = router;