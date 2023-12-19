import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Via {
    via = null;
    ubicacion = null;
    tipo = null;
    inicio = null;
    curacion = null;
    condicion = null;
    observacion = null;
    constructor() {
        this.via = this.via;
        this.ubicacion = this.ubicacion;
        this.tipo = this.tipo;
        this.inicio = this.inicio;
        this.curacion = this.curacion;
        this.condicion = this.condicion;
        this.observacion = this.observacion;
    }
}


class AccesosUci {
    static registros = [];
    static nuevoRegistro = null;
    static validarRegistro() {

    }
    static agregarRegistro() {
        AccesosUci.nuevoRegistro = new Via();
        AccesosUci.registros.push(AccesosUci.nuevoRegistro);
    }
    static eliminarRegistro() {

    }
    static getRegistros() {
        return AccesosUci.registros;
    }
}

export default AccesosUci;