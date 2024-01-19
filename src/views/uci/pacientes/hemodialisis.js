import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Hemodialisis {
    id = null;
    hemo = null;
    am = null;
    pm = null;
    hs = null;
    observacion = null;
    constructor() {
        this.id = this.id;
        this.hemo = this.hemo;
        this.am = this.am;
        this.pm = this.pm;
        this.hs = this.hs;
        this.observacion = this.observacion;
    }
}


class HemodialisisUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = true;
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