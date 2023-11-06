import * as Msal from "@azure/msal-browser";


class AuthMSA {

    static loginRequest;
    static myMSALObj;
    static msalConfig;
    static myMSALObj;
    static accountId;

    constructor() {

        this.loginRequest = {
            scopes: ["User.ReadWrite"],
        };

        this.accountId = "";

        this.myMSALObj = null;

        // Objeto Configuración 
        this.msalConfig = {
            auth: {
                clientId: "a29bcf0f-e889-4181-b2d5-62d630d502ee", // this is a fake id
                authority: "https://login.microsoftonline.com/266e577b-cdf0-42b2-9523-4dac3f7f4bc7",
                redirectUri: window.location.origin,
                postLogoutRedirectUri: window.location.origin + '/sing-out',

            },
            cache: {
                cacheLocation: "localStorage", // This configures where your cache will be stored
                storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
            },
            system: {
                allowNativeBroker: true,
            },
        };



        // Inicializa el Objeto MSAL
        this.myMSALObj = new Msal.PublicClientApplication(this.msalConfig);

        this.logoutRequest = {
            account: this.myMSALObj.getAccountByHomeId(this.accountId),
            mainWindowRedirectUri: window.location.origin + '/sing-out',
        };


    }


}

export default AuthMSA;