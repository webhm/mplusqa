import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Cateter {
    id = null;
    cateter = null;
    am = null;
    pm = null;
    hs = null;
    observacion = null;
    constructor() {
        this.id = this.id;
        this.cateter = this.cateter;
        this.am = this.am;
        this.pm = this.pm;
        this.hs = this.hs;
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
        CateterUci.nuevoRegistro.nro = (CateterUci.registros.length > 0 ? (CateterUci.registros.length + 1) : 1);
        let res = [];
        CateterUci.registros.map((_v, _i) => {
            res.push(_v);
        });
        res.push(CateterUci.nuevoRegistro);
        CateterUci.registros = res;

    }
    static verRegistro(registro) {
        registro.editar = true;
        CateterUci.nuevoRegistro = registro;
    }
    static editarRegistro() {

        CateterUci.nuevoRegistro.editar = null;
        let res = [];
        CateterUci.registros.map((_v) => {
            if (_v.nro != CateterUci.nuevoRegistro.nro && _v.numeroTurno == PacientesUCI.numeroTurno) {
                res.push(_v);
            }
        });
        res.push(CateterUci.nuevoRegistro);
        CateterUci.registros = res;

    }
    static eliminarRegistro(obj) {

        let res = [];
        CateterUci.registros.map((_v) => {
            if (_v.nro != obj.nro && _v.numeroTurno == PacientesUCI.numeroTurno) {
                res.push(_v);
            }
        });
        CateterUci.registros = res;

    }
    static parseSeccion(options) {


        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    CateterUci.registros.push(_obj);
                }
            });
        });



    }
    static getAllRegistros(options) {
        CateterUci.parseSeccion(options);
        return CateterUci.registros;
    }
    static getRegistros() {
        return CateterUci.registros;
    }
}

export default CateterUci;