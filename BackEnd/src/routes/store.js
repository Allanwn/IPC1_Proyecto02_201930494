const express=require('express');
const router=express.Router();

const {newProduct,allProducts,login, allProductosOrdenados}= require('../controllers/product');
const {newCliente,allCliente, clientesPorEdad} = require('../controllers/cliente');



// Endpoint para crear un nuevo producto
router.post('/store/new-product',newProduct);

router.post('/store/new-cliente',newCliente)

// Endpoint para devolver todos los productos en el sistema

router.get('/store/get-products',allProducts);

router.get('/store/get-clientes',allCliente);

// Endpoint para el login
router.post('/store/login',login);

/// Endpoint para obtener los productos ordenados por precio
router.get('/store/get-estadis-prod',allProductosOrdenados);

/// Endpoint para obtener los productos ordenados por edad
router.get('/store/get-estadis-clie',clientesPorEdad);

module.exports=router;

