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
        CuidadosUci.nuevoRegistro.nro = (CuidadosUci.registros.length > 0 ? (CuidadosUci.registros.length + 1) : 1);
        let res = [];
        CuidadosUci.registros.map((_v, _i) => {
            res.push(_v);
        });
        res.push(CuidadosUci.nuevoRegistro);
        CuidadosUci.registros = res;
    }
    static verRegistro(registro) {
        registro.editar = true;
        CuidadosUci.nuevoRegistro = registro;
    }
    static editarRegistro() {

        CuidadosUci.nuevoRegistro.editar = null;
        let res = [];
        CuidadosUci.registros.map((_v) => {
            if (_v.nro != CuidadosUci.nuevoRegistro.nro && _v.numeroTurno == PacientesUCI.numeroTurno) {
                res.push(_v);
            }
        });
        res.push(CuidadosUci.nuevoRegistro);
        CuidadosUci.registros = res;

    }
    static eliminarRegistro(obj) {

        let res = [];
        CuidadosUci.registros.map((_v) => {
            if (_v.nro != obj.nro && _v.numeroTurno == PacientesUCI.numeroTurno) {
                res.push(_v);
            }
        });
        CuidadosUci.registros = res;

    }
    static parseSeccion(options) {

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
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