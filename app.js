// Importar as configurações do servidor
var app = require('./config/server');

// Parametrizar a porta de escuta
app.listen(5500, function () {
    console.log('Servidor online');
});