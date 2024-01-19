import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Cuidado {
    id = null;
    cuidado = null;
    frecuencia = null;
    am = null;
    pm = null;
    hs = null;
    constructor() {
        this.id = this.id;
        this.cuidado = this.cuidado;
        this.frecuencia = this.frecuencia;
        this.am = this.pm;
        this.pm = this.pm;
        this.hs = this.hs;
    }
}


class CuidadosUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = true;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        CuidadosUci.nuevoRegistro = new Cuidado();
    }
    static agregarRegistro() {
        CuidadosUci.registros.push(CuidadosUci.nuevoRegistro);
    }
    static eliminarRegistro(id) {

        let res = [];

        CuidadosUci.registros.map((_v) => {
            if (_v.id != id) {
                res.push(_v);
            }
        });

        CuidadosUci.registros = res;

    }
    static getRegistros() {
        return CuidadosUci.registros;
    }
}

export default CuidadosUci;