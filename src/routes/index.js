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
import CalendarioEndo2 from "../views/endoscopia/agenda/calendario2";
import InicioFlebotomista from "../views/laboratorio/flebotomista/inicioFlebo";
import Uci from "../views/uci/uci";
import PacientesUCI from "../views/uci/pacientes/pacientesUci";
import Contratos from "../views/admisiones/contratos/contratos";
import NuevoContrato from "../views/admisiones/contratos/nuevoContrato";
import VerContrato from "../views/admisiones/contratos/verContrato";

// Crear una instancia de la clase
// const authManager = new AuthManager();
/*

// Iniciar sesión con un usuario válido
authManager.login({ email: "user@example.com", password: "123456" }).then((result) => {
  if (result) {
    console.log("Login exitoso");
    console.log("Token:", authManager.token);
    console.log("Usuario:", authManager.user);
  } else {
    console.log("Login fallido");
  }
});

// Comprobar si el usuario está autenticado
console.log("Autenticado:", authManager.isAuthenticated());

// Comprobar si el usuario tiene un rol o un perfil específico
console.log("Rol admin:", authManager.hasRole("admin"));
console.log("Perfil editor:", authManager.hasProfile("editor"));

// Cerrar sesión
authManager.logout();
console.log("Logout exitoso");

*/


// Routes here
const Routes = {
    "/": Login,
    "/inicio": Inicio,
    "/admisiones": Admisiones,
    "/admisiones/contrato": VerContrato,
    "/admisiones/contratos": Contratos,
    "/admisiones/contratos/nuevo": NuevoContrato,
    "/administracion": Administracion,
    "/administracion/metrovirtual": usrMV,
    "/administracion/metroplus": usrMPLUS,
    "/uci": Uci,
    "/uci/pacientes": PacientesUCI,
    "/hospitalizacion": Hospital,
    "/hospitalizacion/pasaportes": Pasaportes,
    "/hospitalizacion/pasaporte": VerPasaporte,
    "/laboratorio": Laboratorio,
    "/laboratorio/flebotomista": Flebotomista,
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
};

const DefaultRoute = "/";

export { Routes, DefaultRoute };