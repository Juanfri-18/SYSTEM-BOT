const { Client, LocalAuth, List } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'client-one' }),
    // Configura otras opciones según tus necesidades
});

client.on('ready', async () => {
    const number = '51936732723'; // Reemplaza con el número de teléfono del destinatario
    const optionsList = new List(
        'Elige una opción:',
        '¿Qué deseas hacer?',
        [
            { title: 'Música', id: 'music' },
            { title: 'Grupos', id: 'groups' },
            { title: 'Juegos', id: 'games' },
            { title: 'Imágenes', id: 'images' }
        ],
        'Selecciona una acción'
    );

    const numberDetails = await client.getNumberId(number);
    if (numberDetails) {
        const sendMessageData = await client.sendMessage(numberDetails._serialized, optionsList);
        console.log('Mensaje enviado:', sendMessageData);
    } else {
        console.log('El número de teléfono no está registrado:', number);
    }
});

client.initialize();
