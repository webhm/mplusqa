class ErrorMetroplus extends Error {
    constructor(message, options) {
        // Need to pass `options` as the second parameter to install the "cause" property.
        super(message, options);
    }
}

export default ErrorMetroplus;