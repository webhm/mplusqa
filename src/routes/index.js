import Admisiones from "../views/admisiones/admisiones";
import Login from "../views/login/login";
import Inicio from "../views/inicio/inicio";
import Administracion from '../views/admin/admin';
import Salir from "../views/layout/salir";
import usrMV from "../views/admin/metrovirtual/usrMV";
import usrMPLUS from "../views/admin/metrovirtual/usrMPlus";
import Hospital from "../views/hospital/hospital";
import Pasaportes from "../views/hospital/pasaportes/pasaportes";
import VerPasaporte from "../views/hospital/pasaportes/verPasaporte";
import StepPassport from "../views/hospital/pasaportes/stepPassport";
import Laboratorio from "../views/laboratorio/laboratorio";
import Flebotomista from "../views/laboratorio/flebotomista/flebotomista";
import Imagen from "../views/imagen/imagen";
import AgendaMV from "../views/imagen/agenda/agendaMV";
import Calendario from "../views/imagen/agenda/calendario";
import ConfigAgendaImagen from "../views/imagen/agenda/configAgendas";
import Endo from "../views/endoscopia/endo";
import SingOut from "../views/layout/singOut";
import AgendaEndo from "../views/endoscopia/agenda/agendas";
import ConfigAgEndo from "../views/endoscopia/agenda/config";
import CalendarioEndo4 from "../views/endoscopia/agenda/v2/calendario4";
import InicioFlebotomista from "../views/laboratorio/flebotomista/inicioFlebo";
import Uci from "../views/uci/uci";
import PacientesUCI from "../views/uci/pacientes/pacientesUci";
import PacientesUCINEO from "../views/uci/neo/pacientesUci";
import PacientesUCIINTERMEDIOS from "../views/uci/intermedios/pacientesUci";
import PacientesUCIMINIMOS from "../views/uci/minimos/pacientesUci";
import Contratos from "../views/admisiones/contratos/contratos";
import NuevoContrato from "../views/admisiones/contratos/nuevoContrato";
import VerContrato from "../views/admisiones/contratos/verContrato";
import CalendarioEndo2 from "../views/endoscopia/agenda/calendario2";
import PedidoFlebotomista from "../views/laboratorio/flebotomista/pedidoFlebo";
import PacientesUCIHistorial from "../views/uci/pacientes/historial/pacientesUci";
import BitacoraUCI from "../views/uci/v2/bitacora";
import CalendarComponent from "../views/uci/pacientes/calendar";
import UciCalednar from "../views/uci/pacientes/calendar";
import UciCalendar from "../views/uci/pacientes/calendar";
import PacientesUCINEOHistorial from "../views/uci/neo/historial/pacientesUci";

// Routes here
const Routes = {
    "/": Login,
    "/inicio": Inicio,
    "/admisiones": Admisiones,
    "/admisiones/contrato": VerContrato,
    "/admisiones/contratos": Contratos,
    "/admisiones/contratos/nuevo": NuevoContrato,
    "/administracion": Administracion,
    "/administracion/pacientes/metrovirtual": usrMV,
    "/administracion/medicos/metrovirtual": usrMPLUS,
    "/administracion/metroplus": usrMPLUS,
    "/uci": Uci,
    "/uci/bitacora": BitacoraUCI,
    "/uci/pacientes": PacientesUCI,
    "/uci/pacientes/neo": PacientesUCINEO,
    "/uci/pacientes/neo/historial": PacientesUCINEOHistorial,
    "/uci/pacientes/intermedios": PacientesUCIINTERMEDIOS,
    "/uci/pacientes/minimos": PacientesUCIMINIMOS,
    "/uci/pacientes/historial": PacientesUCIHistorial,
    "/hospitalizacion": Hospital,
    "/hospitalizacion/pasaportes": Pasaportes,
    "/hospitalizacion/pasaporte": VerPasaporte,
    "/laboratorio": Laboratorio,
    "/laboratorio/flebotomista": Flebotomista,
    "/laboratorio/flebotomista/pedido": PedidoFlebotomista,
    "/laboratorio/flebotomista/inicio": InicioFlebotomista,
    "/step-passport": StepPassport,
    "/imagen": Imagen,
    "/imagen/agendas": AgendaMV,
    "/imagen/agendas/configuracion": ConfigAgendaImagen,
    "/imagen/agendas/calendario": Calendario,
    "/endoscopia": Endo,
    "/endoscopia/agendas": AgendaEndo,
    "/endoscopia/agendas/configuracion": ConfigAgEndo,
    "/endoscopia/agendas/calendario": CalendarioEndo2,
    "/salir": Salir,
    "/sing-out": SingOut,
    "/cal": UciCalendar,

};

const DefaultRoute = "/";

export { Routes, DefaultRoute };