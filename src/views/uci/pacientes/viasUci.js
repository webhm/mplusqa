import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import FecthUci from "./fecthUci";
import PacientesUCI from "./pacientesUci";

class Via {
    id = null;
    nro = null;
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
        this.nro = this.nro;
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
        if (ViasUci.registros.length == 0) {
            ViasUci.nuevoRegistro.nro = 1;
            ViasUci.registros.push(ViasUci.nuevoRegistro);
        } else {
            ViasUci.nuevoRegistro.nro = (ViasUci.registros[ViasUci.registros.length - 1].nro + 1);
            ViasUci.registros.push(ViasUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        ViasUci.nuevoRegistro = registro;
    }
    static editarRegistro() {
        ViasUci.nuevoRegistro.editar = null;
        ViasUci.registros.map((_v, _i) => {
            if (_v.nro == ViasUci.nuevoRegistro.nro) {
                ViasUci.registros[_i] = ViasUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        let res = [];
        ViasUci.registros.map((_v, _i) => {

            if (_v.nro !== obj.nro) {
                res.push(_v);
            }

        });

        ViasUci.registros = res;

    }
    static getRegistros() {
        return ViasUci.registros;
    }


}

export default ViasUci;