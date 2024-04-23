import m from "mithril";
// Importar la librería crypto-js para usar el algoritmo AES
import CryptoJS from "crypto-js";
import CalendarioEndo2 from "./calendario2";

// Definir la clave secreta para la encriptación y desencriptación
const secretKey = "metroplus";

// Crear la clase JsonEncryptor
class JsonEncryptor {
    // El constructor recibe el nombre del item de localstorage y el json inicial
    constructor(itemName, initialJson) {
        // Guardar el nombre del item
        this.itemName = itemName;
        // Encriptar el json inicial con la clave secreta
        let encryptedJson = CryptoJS.AES.encrypt(
            JSON.stringify(initialJson),
            secretKey
        ).toString();
        // Guardar el json encriptado en localstorage
        localStorage.setItem(itemName, encryptedJson);
    }

    // Método para desencriptar el json y devolverlo como un objeto
    decryptJson() {
        // Obtener el json encriptado de localstorage
        let encryptedJson = localStorage.getItem(this.itemName);
        // Desencriptar el json con la clave secreta
        let decryptedJson = CryptoJS.AES.decrypt(encryptedJson, secretKey).toString(
            CryptoJS.enc.Utf8
        );
        // Parsear el json y devolverlo como un objeto
        return JSON.parse(decryptedJson);
    }

    // Método para obtener el estado actual del json
    getStatus() {
        // Desencriptar el json y guardarlo en una variable
        let decryptedJson = this.decryptJson();
        // Recorrer las propiedades del json y mostrar su valor por consola
        for (let key in decryptedJson) {
            console.log(key + ": " + decryptedJson[key]);
        }
    }
}


class EventosCalendario {
    static timeSleep = 2200;
    static statusCalendar = null;
    static getStatus(peerId) {
        try {
            return m.request({
                method: "GET",
                url: "https://apidate.hospitalmetropolitano.org/v1/date/calendar/status",
                params: {
                    peerId: peerId
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": localStorage.userToken
                }
            }).then(function(res) {
                EventosCalendario.statusCalendar = new JsonEncryptor("statusCalendar", res.data);
                return EventosCalendario.statusCalendar.decryptJson();
            }).catch(function(e) {
                console.log('error', e);

            });
        } catch (error) {
            console.log('error', error);
        }

    }
    static sendEvent() {
        CalendarioEndo2.reloadFetchAgenda();

    }


}

export default EventosCalendario;