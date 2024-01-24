import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";

class Cuidado {
    id = null;
    cuidado = null;
    frecuencia = null;
    am = null;
    pm = null;
    hs = null;
    editar = null;
    constructor() {
        this.id = this.id;
        this.cuidado = this.cuidado;
        this.frecuencia = this.frecuencia;
        this.am = this.pm;
        this.pm = this.pm;
        this.hs = this.hs;
        this.editar = this.editar;
    }
}


class CuidadosUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;

    static validarRegistro() {

    }
    static iniciarRegistro() {
        CuidadosUci.nuevoRegistro = new Cuidado();
    }
    static agregarRegistro() {
        FecthUci.registrarSeccion(CuidadosUci.nuevoRegistro);
        CuidadosUci.registros.push(CuidadosUci.nuevoRegistro);
    }
    static verRegistro(registro) {
        registro.editar = true;
        CuidadosUci.nuevoRegistro = registro;
    }
    static editarRegistro() {

        FecthUci.actualizarRegistro(CuidadosUci.nuevoRegistro);

        let res = [];

        CuidadosUci.registros.map((_v) => {
            if (_v.id != CuidadosUci.nuevoRegistro.id) {
                res.push(_v);
            }
        });

        CuidadosUci.registros = res;
        CuidadosUci.nuevoRegistro.editar = null;
        CuidadosUci.registros.push(CuidadosUci.nuevoRegistro);
    }
    static eliminarRegistro(obj) {

        FecthUci.eliminarRegistro(obj);

        let res = [];

        CuidadosUci.registros.map((_v) => {
            if (_v.id != obj.id) {
                res.push(_v);
            }
        });

        CuidadosUci.registros = res;
        CuidadosUci.nuevoRegistro = null;

    }
    static parseSeccion(options) {

        CuidadosUci.registros = [];

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                if (obj.IDSECCION === option.id) {
                    let _obj = JSON.parse(obj.DATASECCION);
                    CuidadosUci.registros.push(_obj);
                }
            });
        });

    }

    static getAllRegistros(options) {

        CuidadosUci.parseSeccion(options);
        return CuidadosUci.registros;
    }

    static getRegistros() {

        return CuidadosUci.registros;
    }
}

export default CuidadosUci;