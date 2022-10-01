// Importar as configurações do servidor
var app = require('./config/server');
// const skt = require('socket.io');

// Parametrizar a porta de escuta
var server = app.listen(process.env.PORT || 5555, function () {
    console.log('Servidor online');
})

// var io = new skt.server(server);
const serveIo = require('socket.io');
const io = new serveIo.Server(server);
app.set('io', io);

// criar a conexão do websocket
io.on('connection', function (socket) {
    console.log('Usuário conectou');

    socket.on('disconnect', function () {
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', function (data) {

        // dialogo
        socket.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        socket.broadcast.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        // participantes
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit(
                'participantesParaCliente',
                { apelido: data.apelido }
            );

            socket.broadcast.emit(
                'participantesParaCliente',
                { apelido: data.apelido }
            );
        }
    });
});
