import m from 'mithril';


// Clase para el componente
class DataTableComponent {
    static data = [];
    static filteredData = [];
    static sortOrder = 'asc';
    static editing = false; // Para rastrear si la tabla está en modo de edición
    static editingCell = null; // Para rastrear la celda que se está editando individualmente

    // Método estático para obtener datos del servicio HTTP (simulado)
    static fetchData() {
        // Simulación de datos JSON
        const result = [
            { "id": 1, "name": "Alice", "status": "active" },
            { "id": 2, "name": "Bob", "status": "inactive" },
            { "id": 3, "name": "Charlie", "status": "active" },
            { "id": 4, "name": "David", "status": "inactive" },
            { "id": 5, "name": "Eve", "status": "active" }
        ];

        DataTableComponent.data = result;
        DataTableComponent.filteredData = DataTableComponent.filterData(DataTableComponent.data);
        DataTableComponent.sortData();
        m.redraw();
    }
    

    // Método estático para filtrar los datos
    static filterData(data) {
        return data.filter(item => item.status === 'active'); // Ejemplo de filtro
    }

    // Método estático para ordenar los datos
    static sortData() {
        DataTableComponent.filteredData.sort((a, b) => {
            if (DataTableComponent.sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    }

    // Método estático para inicializar DataTables
    static initDataTable() {
        $('#dataTable').DataTable({
            dom: 'ltp',
        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });
    }

    // Método para manejar el cambio de valor en el campo de entrada
    static handleChange(e, item, field) {
        item[field] = e.target.value;
    }

    // Método para alternar el modo de edición
    static toggleEdit() {
        DataTableComponent.editing = !DataTableComponent.editing;
        DataTableComponent.editingCell = null; // Desactivar edición individual si se activa/desactiva la edición global
        m.redraw();
    }

    // Método para manejar el doble clic y activar la edición individual
    static handleDblClick(item, field) {
        DataTableComponent.editingCell = { item, field };
        m.redraw();
    }

    // Método para manejar la pérdida de foco o la tecla Enter en la edición individual
    static handleBlurOrEnter(e) {
        if (e.type === 'blur' || (e.type === 'keydown' && e.key === 'Enter')) {
            DataTableComponent.editingCell = null;
            m.redraw();
        }
    }

    oninit() {
        DataTableComponent.fetchData();
    }

    // Método de montaje del componente
    oncreate() {

        DataTableComponent.initDataTable();
    }

    // Método de renderizado del componente
    view() {
        return [
            m('button', { onclick: DataTableComponent.toggleEdit }, DataTableComponent.editing ? 'Deseditar' : 'Editar'),
            m('table#dataTable.display', [
                m('thead', [
                    m('tr', [
                        m('th', 'ID'),
                        m('th', 'Name'),
                        m('th', 'Status')
                    ])
                ]),
                m('tbody', DataTableComponent.filteredData.map(item =>
                    m('tr', [
                        m('td', item.id),
                        m('td',
                            DataTableComponent.editing || (DataTableComponent.editingCell && DataTableComponent.editingCell.item === item && DataTableComponent.editingCell.field === 'name')
                                ? m('input.form-control.tx-13.tx-semibold[type=text]', {
                                    value: item.name,
                                    oninput: (e) => DataTableComponent.handleChange(e, item, 'name'),
                                    onblur: (e) => DataTableComponent.handleBlurOrEnter(e),
                                    onkeydown: (e) => DataTableComponent.handleBlurOrEnter(e)
                                })
                                : m('span', { ondblclick: () => DataTableComponent.handleDblClick(item, 'name') }, item.name)
                        ),
                        m('td', DataTableComponent.editing || (DataTableComponent.editingCell && DataTableComponent.editingCell.item === item && DataTableComponent.editingCell.field === 'status')
                            ? m('input.form-control.tx-13.tx-semibold[type=text]', {
                                value: item.status,
                                oninput: (e) => DataTableComponent.handleChange(e, item, 'status'),
                                onblur: (e) => DataTableComponent.handleBlurOrEnter(e),
                                onkeydown: (e) => DataTableComponent.handleBlurOrEnter(e)
                            })
                            : m('span', { ondblclick: () => DataTableComponent.handleDblClick(item, 'status') }, item.status))
                    ])
                ))
            ])
        ];
    }
}

export default DataTableComponent;