import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Cultivo {
    id = null;
    muestra = null;
    envio = null;
    resultado = null;
    constructor() {
        this.id = this.id;
        this.muestra = this.muestra;
        this.envio = this.envio;
        this.resultado = this.resultado;
    }
}


class CultivosUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = true;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        CultivosUci.nuevoRegistro = new Cultivo();
    }
    static agregarRegistro() {
        CultivosUci.registros.push(CultivosUci.nuevoRegistro);
    }
    static eliminarRegistro() {

    }
    static getRegistros() {
        return CultivosUci.registros;
    }
}

export default CultivosUci;