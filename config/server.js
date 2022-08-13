// Importar o modulo do framework express
var express = require('express');

// importar um modulo do consign
var consign = require('consign');

// importar o modulo do body-parser
var bodyParser = require('body-parser');

// importar o modulo do express-validator
var expressValidator = require('express-validator');

// iniciar o objeto do express
var app = express();

// setar as variáveis 'view engine' e 'views' do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

// configurar o middleware  express.static
app.use(express.static('./app/public'));

// configurar o middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// configurar o middleware express-validator
app.use(expressValidator());

// efetuar o autoload das rotas, dos models e dos controllers para o objeto app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .then('app');

// exportar o objeto app 
module.exports = app;