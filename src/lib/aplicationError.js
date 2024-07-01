function createAplicationError(msg, errorCode, cause) {
    const error = Error(msg, cause);
    error.errorCode = errorCode;
    error.isAplicationError = true;
    return error;
}

export default createAplicationError;