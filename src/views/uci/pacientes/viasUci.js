import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import FecthUci from "./fecthUci";
import PacientesUCI from "./pacientesUci";

class Via {
    id = null;
    via = null;
    ubicacion = null;
    tipo = null;
    inicio = null;
    inicio_fecha = null;
    inicio_hora = null;
    retiro = null;
    curacion = null;
    condicion = null;
    observacion = null;
    editar = null;
    constructor() {
        this.id = this.id;
        this.via = this.via;
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


class ViasUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        ViasUci.nuevoRegistro = new Via();
    }
    static agregarRegistro() {
        ViasUci.nuevoRegistro.nro = (ViasUci.registros.length > 0 ? (ViasUci.registros.length + 1) : 1);
        let res = [];
        ViasUci.registros.map((_v, _i) => {
            res.push(_v);
        });
        res.push(ViasUci.nuevoRegistro);
        ViasUci.registros = res;

    }
    static verRegistro(registro) {
        registro.editar = true;
        ViasUci.nuevoRegistro = registro;
    }
    static editarRegistro() {

        ViasUci.nuevoRegistro.editar = null;
        let res = [];
        ViasUci.registros.map((_v) => {
            if (_v.nro != ViasUci.nuevoRegistro.nro && _v.numeroTurno == PacientesUCI.numeroTurno) {
                res.push(_v);
            }
        });
        res.push(ViasUci.nuevoRegistro);
        ViasUci.registros = res;

    }
    static eliminarRegistro(obj) {

        let res = [];
        ViasUci.registros.map((_v) => {
            if (_v.nro != obj.nro && _v.numeroTurno == PacientesUCI.numeroTurno) {
                res.push(_v);
            }
        });
        ViasUci.registros = res;

    }
    static parseSeccion(options) {


        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    ViasUci.registros.push(_obj);
                }
            });
        });




    }
    static getAllRegistros(options) {
        ViasUci.parseSeccion(options);
        return ViasUci.registros;
    }
    static getRegistros() {
        return ViasUci.registros;
    }
}

export default ViasUci;