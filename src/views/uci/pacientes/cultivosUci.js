import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import PacientesUCI from "./pacientesUci";

class Cultivo {
    id = null;
    muestra = null;
    envio = null;
    resultado = null;
    editar = null;
    constructor() {
        this.id = this.id;
        this.muestra = this.muestra;
        this.envio = this.envio;
        this.resultado = this.resultado;
        this.editar = this.editar;
    }
}


class CultivosUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        CultivosUci.nuevoRegistro = new Cultivo();
    }
    static agregarRegistro() {

        CultivosUci.registros.push(CultivosUci.nuevoRegistro);
    }
    static verRegistro(registro) {
        registro.editar = true;
        CultivosUci.nuevoRegistro = registro;
    }
    static editarRegistro() {
        CultivosUci.nuevoRegistro.editar = null;
        CultivosUci.registros.map((_v, _i) => {
            if (_v.nro == CultivosUci.nuevoRegistro.nro) {
                CultivosUci.registros[_i] = CultivosUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        let res = [];
        CultivosUci.registros.map((_v, _i) => {

            if (_v.nro !== obj.nro) {
                res.push(_v);
            }

        });

        CultivosUci.registros = res;

    }
    static getRegistros() {
        return CultivosUci.registros;
    }
}

export default CultivosUci;