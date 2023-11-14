import EventosCalendario from "../views/endoscopia/agenda/eventosCalendar";

class WebRTCConnection {
    constructor(onId) {




        // Crea una instancia de PeerJS con el peerId y las opciones proporcionadas
        this.peer = new Peer({
            host: "rtc.hospitalmetropolitano.org",
            port: 443,
            path: "/myapp",
            pingInterval: 15000,
            proxied: true
        });

        // Almacena el estado de la conexión (abierta o cerrada) para determinar
        this.connected = false;

        // Almacena la referencia a la conexión de datos con el otro peer
        this.dataConnection = null;

        // Almacena los callbacks para los eventos de conexión, mensaje y error
        this.onConnect = null;
        this.onMessage = null;
        this.onError = null;

        // Escucha el evento 'open' de PeerJS para saber cuando la instancia está lista
        this.peer.on('open', (id) => {
            console.log('PeerJS instance ready');
            onId(id);
        });

        // Escucha el evento 'connection' de PeerJS para aceptar conexiones entrantes de otros peers
        this.peer.on('connection', (dataConnection) => {
            console.log('Connection received from', dataConnection.peer);

            // Establece la conexión de datos con el otro peer
            this.setDataConnection(dataConnection);
        });

        // Escucha el evento 'error' de PeerJS para manejar posibles errores
        this.peer.on('error', (error) => {
            console.error('PeerJS error', error);

            // Invoca el callback de error si existe
            if (this.onError) {
                this.onError(error);
            }
        });
    }

    // Define un método para establecer una conexión de datos con otro peer usando su peerId y enviar un mensaje
    sendTo(peerId) {


        // Crea una conexión de datos con el otro peer usando PeerJS
        let dataConnection = this.peer.connect(peerId);

        // Almacena la referencia a la conexión de datos
        this.dataConnection = dataConnection;

        // Escucha el evento 'open' de la conexión de datos para saber cuando está establecida
        this.dataConnection.on('open', () => {
            this.sendMessage('updateCalendar');
        });




    }

    sendAll(users, usr) {
        return Object.keys(users).map((_i) => {
            if (_i !== usr) {
                this.sendTo(users[_i]);
            }
        });
    }

    // Define un método para establecer la conexión de datos con el otro peer y escuchar sus eventos
    setDataConnection(dataConnection) {
        // Almacena la referencia a la conexión de datos
        this.dataConnection = dataConnection;

        // Escucha el evento 'open' de la conexión de datos para saber cuando está establecida
        this.dataConnection.on('open', () => {
            console.log('Data connection open with', this.dataConnection.peer);

            // Cambia el estado de la conexión a abierta
            this.connected = true;

            // Invoca el callback de conexión si existe
            if (this.onConnect) {
                this.onConnect();
            }
        });

        // Escucha el evento 'data' de la conexión de datos para recibir mensajes del otro peer
        this.dataConnection.on('data', (data) => {

            EventosCalendario.sendEvent();
            console.log('Data received from', this.dataConnection.peer, data);

            // Invoca el callback de mensaje si existe
            if (this.onMessage) {

                this.onMessage(data);
            }
        });

        // Escucha el evento 'close' de la conexión de datos para saber cuando se cierra
        this.dataConnection.on('close', () => {
            console.log('Data connection closed with', this.dataConnection.peer);

            // Cambia el estado de la conexión a cerrada
            this.connected = false;
        });

        // Escucha el evento 'error' de la conexión de datos para manejar posibles errores
        this.dataConnection.on('error', (error) => {
            console.error('Data connection error with', this.dataConnection.peer, error);

            // Invoca el callback de error si existe
            if (this.onError) {
                this.onError(error);
            }
        });
    }

    // Define un método para enviar un mensaje al otro peer a través de la conexión de datos
    sendMessage(message) {
        console.log('Sending message to', this.dataConnection.peer, message);

        // Envía el mensaje usando la conexión de datos
        this.dataConnection.send(message);
    }

    // Define un método para cerrar la conexión con el otro peer y liberar los recursos de PeerJS
    close() {
        console.log('Closing connection with', this.dataConnection.peer);

        // Cierra la conexión de datos con el otro peer
        this.dataConnection.close();

        // Destruye la instancia de PeerJS
        this.peer.destroy();
    }

}



export default WebRTCConnection;