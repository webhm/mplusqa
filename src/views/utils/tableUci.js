import m from "mithril";

class TableUCI {
    idTable = '';
    dataTable = null;
    arqTable = {};
    constructor(_data) {
        this.idTable = _data.attrs.idTable;
        this.dataTable = _data.attrs.dataTable;
        this.arqTable = _data.attrs.arqTable;
    }
    oncreate() {

        $.fn.dataTable.ext.errMode = "none";

        this.arqTable.data = this.dataTable;
        let table = $("#" + this.idTable).DataTable(this.arqTable);

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });

        return table;
    }

    view() {
        if (this.dataTable.length !== null) {
            return [
                m("table.table.table-sm.table-bordered.table-hover[width='100%']", {
                    id: this.idTable
                })
            ]
        }

    }
}


export default TableUCI;