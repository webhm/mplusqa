import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Cateter {
    id = null;
    cateter = null;
    ubicacion = null;
    tipo = null;
    inicio = null;
    retiro = null;
    curacion = null;
    condicion = null;
    observacion = null;
    constructor() {
        this.id = this.id;
        this.cateter = this.cateter;
        this.ubicacion = this.ubicacion;
        this.tipo = this.tipo;
        this.inicio = this.inicio;
        this.retiro = this.retiro;
        this.curacion = this.curacion;
        this.condicion = this.condicion;
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