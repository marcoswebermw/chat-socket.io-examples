var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (requisicao, resposta) => {
    resposta.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Um usuário conectado.');

    socket.on('msg-chat', (msg) =>{
        console.log('Mensagem: ' + msg);
        msg_amigo = `<b>Amigo: ${msg}</b><br>`;
        socket.broadcast.emit('msg-servidor', msg_amigo );
        msg_eu = `Eu: ${msg}<br>`;
        socket.emit('msg-servidor', msg_eu);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

var porta = 3000;

http.listen(porta, () => {
    console.log(`Escutando na porta ${porta}`);
});
