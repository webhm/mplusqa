
import m from "mithril";
import App from "../../../models/App";

class UserManager {
    // Cargar usuarios desde localStorage
    static loadUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Guardar usuarios en localStorage
    static saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Crear un nuevo usuario
    static addUser(user) {
        const users = UserManager.loadUsers();
        users.push(user);
        UserManager.saveUsers(users);
    }

    // Leer todos los usuarios
    static getUsers() {
        return UserManager.loadUsers();
    }

    // Actualizar un usuario existente
    static updateUser(index, updatedUser) {
        const users = UserManager.loadUsers();
        users[index] = updatedUser;
        UserManager.saveUsers(users);
    }

    // Eliminar un usuario
    static deleteUser(index) {
        const users = UserManager.loadUsers();
        users.splice(index, 1);
        UserManager.saveUsers(users);
    }
}

class UserFormComponent {
    static oninit(vnode) {
        vnode.state.user = vnode.attrs.user || { id: '', name: '', email: '' };
        vnode.state.isEdit = !!vnode.attrs.user;
    }

    static view(vnode) {
        return m('form', {

            onsubmit: function (e) {
                e.preventDefault();
                if (vnode.state.isEdit) {
                    vnode.attrs.onSave(vnode.state.user);
                } else {
                    vnode.attrs.onAdd(vnode.state.user);
                }
                vnode.state.user = { id: '', name: '', email: '' };
            }
        }, [
            m('div', [
                m('label', 'ID:'),
                m('input[type=text]', {
                    value: vnode.state.user.id,
                    oninput: function (e) { vnode.state.user.id = e.target.value; }
                })
            ]),
            m('div', [
                m('label', 'Nombre:'),
                m('input[type=text]', {
                    value: vnode.state.user.name,
                    oninput: function (e) { vnode.state.user.name = e.target.value; }
                })
            ]),
            m('div', [
                m('label', 'Email:'),
                m('input[type=text]', {
                    value: vnode.state.user.email,
                    oninput: function (e) { vnode.state.user.email = e.target.value; }
                })
            ]),
            m('button[type=submit]', vnode.state.isEdit ? 'Guardar' : 'Agregar')
        ]);
    }
}

class UserTableComponent {


    // Variables globales para manejar la edición
    static editingIndex = null;




    static oninit(vnode) {
        vnode.state.users = UserManager.getUsers();
    }

    static oncreate(vnode) {

        console.log(66, vnode.dom)


        $.fn.dataTable.ext.errMode = "none";

        let table = $("#userTable").DataTable({
            data: vnode.state.users,
            sort: false,
            dom: 'ltp',
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Todavía no tienes resultados disponibles.",
                sEmptyTable: "Ningún dato disponible en esta tabla",
                sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                sInfoPostFix: "",
                sUrl: "",
                sInfoThousands: ",",
                sLoadingRecords: "Cargando...",
                oPaginate: {
                    sFirst: "Primero",
                    sLast: "Último",
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
                oAria: {
                    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sSortDescending: ": Activar para ordenar la columna de manera descendente",
                },
            },
            cache: false,
            orden: false,
            destroy: true,
            columns: [
                { title: "ID", data: "id" },
                { title: "Nombre", data: "name" },
                { title: "Email", data: "email" },
                {
                    title: "Acciones",
                    data: null,
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {

                                return [
                                    m("button.btn.btn-xs.btn-success[type='button']", {
                                        onclick: () => {
                                            UserTableComponent.editingIndex = iRow;
                                            m.redraw();

                                            setTimeout(() => {
                                                m.mount(document.getElementById('userForm'), {
                                                    view: function () {
                                                        return m(UserFormComponent, {
                                                            user: UserManager.getUsers()[UserTableComponent.editingIndex],
                                                            onSave: function (updatedUser) {
                                                                UserManager.updateUser(UserTableComponent.editingIndex, updatedUser);
                                                                UserTableComponent.editingIndex =null;
                                                                m.redraw();
                                                                $('#userTable').DataTable().clear().rows.add(UserManager.getUsers()).draw();
                                                            }
                                                        });
                                                    }
                                                });
                                            }, 300);

                                            
                                        },
                                    },
                                        'Editar',
                                    ),
                                    m("button.btn.btn-xs.btn-success[type='button']", {
                                        onclick: () => {
                                            if (confirm("¿Está seguro de que desea eliminar este usuario?")) {
                                                UserManager.deleteUser(iRow);
                                                UserTableComponent.editingIndex = null;
                                                m.redraw();
                                                $('#userTable').DataTable().clear().rows.add(UserManager.getUsers()).draw();
                                            }
                                        },
                                    },
                                        'eliminar',
                                    ),

                                ]
                            }
                        });
                    },

                }
            ]
        });

        return table;
    }

    static view() {
        return m('div', [
            m('table', { id: 'userTable', class: 'table table-sm table-bordered table-hover' }),
            
            (UserTableComponent.editingIndex == null ? [
                m(UserFormComponent, {
                    onAdd: function (user) {
                        console.log(user)
                        UserManager.addUser(user);
                        
                        $('#userTable').DataTable().clear().rows.add(UserManager.getUsers()).draw();
                    },
                    onSave: function (user) {
                        console.log(user)
                        UserManager.updateUser(UserTableComponent.editingIndex, user);
                        UserTableComponent.editingIndex = null;
                        $('#userTable').DataTable().clear().rows.add(UserManager.getUsers()).draw();

                    }
                })
            ] : [
                m('div', { id: 'userForm' }),
            ])
        ]);
    }
}



// Calendario
class UciCalendar extends App {


    constructor() {
        super();
        App.setTitle("Agenda Centralizada Endoscopía");

    }


    view() {

        return m(UserTableComponent)

    }

}

export default UciCalendar;
