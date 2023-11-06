import m from 'mithril';
import App from '../../models/App';

class Salir extends App {
    constructor() {
        super();
        App.setTitle("Cerrar Sesión");
        try {
            App._logoutMsi();
        } catch (error) {
            App.logout();
        }
    }

    view() {

    }
}

export default Salir;