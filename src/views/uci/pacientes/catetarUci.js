import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Cateter {
    id = null;
    cateter = null;
    am = null;
    pm = null;
    hs = null;
    observacion = null;
    constructor() {
        this.id = this.id;
        this.cateter = this.cateter;
        this.am = this.am;
        this.pm = this.pm;
        this.hs = this.hs;
        this.observacion = this.observacion;
    }
}


class CateterUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        CateterUci.nuevoRegistro = new Cateter();
    }
    static agregarRegistro() {
        CateterUci.registros.push(CateterUci.nuevoRegistro);
    }
    static eliminarRegistro() {

    }
    static getRegistros() {
        return CateterUci.registros;
    }
}

export default CateterUci;