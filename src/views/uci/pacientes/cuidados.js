import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import PacientesUCI from "./pacientesUci";

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
        let lasElement = { nro: 0 };
        if (CuidadosUci.registros.length > 0) {
            lasElement = CuidadosUci.registros[CuidadosUci.registros.length - 1];
        }
        CuidadosUci.nuevoRegistro.nro = (lasElement.nro + 2);
        CuidadosUci.registros.push(CuidadosUci.nuevoRegistro);
    }
    static verRegistro(registro) {
        registro.editar = true;
        CuidadosUci.nuevoRegistro = registro;
    }
    static editarRegistro() {
        CuidadosUci.nuevoRegistro.editar = null;
        CuidadosUci.registros.map((_v, _i) => {
            if (_v.nro == CuidadosUci.nuevoRegistro.nro && _v.numeroTurno == PacientesUCI.numeroTurno) {
                CuidadosUci.registros[_i] = CuidadosUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        let res = [];
        CuidadosUci.registros.map((_v, _i) => {
            if (_v.numeroTurno !== PacientesUCI.numeroTurno) {
                res.push(_v);
            }
            if (_v.nro !== obj.nro && _v.numeroTurno == PacientesUCI.numeroTurno) {
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