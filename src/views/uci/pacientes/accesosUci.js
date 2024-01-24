import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import FecthUci from "./fecthUci";

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
        FecthUci.registrarSeccion(AccesosUci.nuevoRegistro);
        AccesosUci.registros.push(AccesosUci.nuevoRegistro);
    }
    static verRegistro(registro) {
        registro.editar = true;
        AccesosUci.nuevoRegistro = registro;
    }
    static editarRegistro() {

        FecthUci.actualizarRegistro(AccesosUci.nuevoRegistro);

        let res = [];

        AccesosUci.registros.map((_v) => {
            if (_v.id != AccesosUci.nuevoRegistro.id) {
                res.push(_v);
            }
        });

        AccesosUci.registros = res;
        AccesosUci.nuevoRegistro.editar = null;
        AccesosUci.registros.push(AccesosUci.nuevoRegistro);
    }
    static eliminarRegistro() {

        FecthUci.eliminarRegistro(obj);

        let res = [];

        AccesosUci.registros.map((_v) => {
            if (_v.id != obj.id) {
                res.push(_v);
            }
        });

        AccesosUci.registros = res;
        AccesosUci.nuevoRegistro = null;
    }
    static parseSeccion(options) {

        AccesosUci.registros = [];

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                if (obj.IDSECCION === option.id) {
                    let _obj = JSON.parse(obj.DATASECCION);
                    AccesosUci.registros.push(_obj);
                }
            });
        });

    }
    static getAllRegistros(options) {
        AccesosUci.parseSeccion(options);
        return AccesosUci.registros;
    }
    static getRegistros() {
        return AccesosUci.registros;
    }
}

export default AccesosUci;