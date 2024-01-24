import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Marcapaso {
    id = null;
    hora = null;
    am = null;
    pm = null;
    hs = null;
    observacion = null;
    constructor() {
        this.id = this.id;
        this.hora = this.hora;
        this.am = this.am;
        this.pm = this.pm;
        this.hs = this.hs;
        this.observacion = this.observacion;
    }
}


class MarcapasosUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        MarcapasosUci.nuevoRegistro = new Marcapaso();
    }
    static agregarRegistro() {
        MarcapasosUci.registros.push(MarcapasosUci.nuevoRegistro);
    }
    static eliminarRegistro() {

    }
    static getRegistros() {
        return MarcapasosUci.registros;
    }
}

export default MarcapasosUci;