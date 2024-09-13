import m from "mithril";
import ErrorMetroplus from "../../../models/Error";

class FetchUci {

    static validarAtencion(numeroHistoriaClinica, numeroAtencion) {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }


        return m.request({
            method: "GET",
            url: _url + "/turnos-abiertos",
            params: {
                numeroHistoriaClinica: numeroHistoriaClinica,
                numeroAtencion: numeroAtencion,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            extract: function (xhr) {
                return {
                    status: xhr.status,
                    body: JSON.parse(xhr.responseText)
                }
            }
        }).then((response) => {

            if (response.status !== 200) {
                throw new ErrorMetroplus("Error HTTP", { cause: 'La respuesta del servidor no es correcta. Status Response:' + response.status });
            }
            return response.body;

        });


    }
}

export default FetchUci;