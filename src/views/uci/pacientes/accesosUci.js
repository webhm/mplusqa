import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import FecthUci from "./fecthUci";
import PacientesUCI from "./pacientesUci";

class Acceso {
    id = null;
    acceso = null;
    ubicacion = null;
    tipo = null;
    inicio = null;
    retiro = null;
    curacion = null;
    condicion = null;
    observacion = null;
    editar = null;
    constructor() {
        this.id = this.id;
        this.acceso = this.acceso;
        this.ubicacion = this.ubicacion;
        this.tipo = this.tipo;
        this.inicio = this.inicio;
        this.retiro = this.retiro;
        this.curacion = this.curacion;
        this.condicion = this.condicion;
        this.observacion = this.observacion;
        this.editar = this.editar;
    }
}


class AccesosUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        AccesosUci.nuevoRegistro = new Acceso();
    }
    static agregarRegistro() {

        AccesosUci.registros.push(AccesosUci.nuevoRegistro);
    }
    static verRegistro(registro) {
        registro.editar = true;
        AccesosUci.nuevoRegistro = registro;
    }
    static editarRegistro() {
        AccesosUci.nuevoRegistro.editar = null;
        AccesosUci.registros.map((_v, _i) => {
            if (_v.nro == AccesosUci.nuevoRegistro.nro) {
                AccesosUci.registros[_i] = AccesosUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        let res = [];
        AccesosUci.registros.map((_v, _i) => {

            if (_v.nro !== obj.nro) {
                res.push(_v);
            }

        });

        AccesosUci.registros = res;

    }
    static getRegistros() {
        return AccesosUci.registros;
    }
}

export default AccesosUci;