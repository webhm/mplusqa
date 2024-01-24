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
        AccesosUci.nuevoRegistro.nro = (AccesosUci.registros.length > 0 ? (AccesosUci.registros.length + 1) : 1);
        let res = [];
        AccesosUci.registros.map((_v, _i) => {
            res.push(_v);
        });
        res.push(AccesosUci.nuevoRegistro);
        AccesosUci.registros = res;

    }
    static verRegistro(registro) {
        registro.editar = true;
        AccesosUci.nuevoRegistro = registro;
    }
    static editarRegistro() {

        AccesosUci.nuevoRegistro.editar = null;
        let res = [];
        AccesosUci.registros.map((_v) => {
            if (_v.nro != AccesosUci.nuevoRegistro.nro && _v.numeroTurno == PacientesUCI.numeroTurno) {
                res.push(_v);
            }
        });
        res.push(AccesosUci.nuevoRegistro);
        AccesosUci.registros = res;

    }
    static eliminarRegistro(obj) {

        let res = [];
        AccesosUci.registros.map((_v) => {
            if (_v.nro != obj.nro && _v.numeroTurno == PacientesUCI.numeroTurno) {
                res.push(_v);
            }
        });
        AccesosUci.registros = res;

    }
    static parseSeccion(options) {


        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
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