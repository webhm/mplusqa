import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Hemodialisis {
    id = null;
    hemo = null;
    ubicacion = null;
    tipo = null;
    inicio = null;
    retiro = null;
    curacion = null;
    condicion = null;
    observacion = null;
    constructor() {
        this.id = this.id;
        this.hemo = this.hemo;
        this.ubicacion = this.ubicacion;
        this.tipo = this.tipo;
        this.inicio = this.inicio;
        this.retiro = this.retiro;
        this.curacion = this.curacion;
        this.condicion = this.condicion;
        this.observacion = this.observacion;
    }
}


class HemodialisisUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        HemodialisisUci.nuevoRegistro = new Hemodialisis();
    }
    static agregarRegistro() {
        HemodialisisUci.registros.push(HemodialisisUci.nuevoRegistro);
    }
    static eliminarRegistro() {

    }
    static getRegistros() {
        return HemodialisisUci.registros;
    }
}

export default HemodialisisUci;