import m from 'mithril';
import App from '../../models/App';

class Salir extends App {
    constructor() {
        super();
        try {
            App._logoutMsi();
        } catch (error) {
            m.route.set("/");
        }
    }

    view() {

    }
}

export default Salir;