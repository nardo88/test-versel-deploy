"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = exports.ErrorCodes = void 0;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    ErrorCodes[ErrorCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ErrorCodes[ErrorCodes["NOT_AUTH"] = 401] = "NOT_AUTH";
    ErrorCodes[ErrorCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["ALREADY_EXISTS"] = "already_exists";
    ErrorMessages["INVALID_DATA"] = "invalid_data";
    ErrorMessages["NOT_FOUND"] = "not_found";
    ErrorMessages["FORBIDDEN"] = "access_denied";
})(ErrorMessages || (exports.ErrorMessages = ErrorMessages = {}));
//# sourceMappingURL=errorCodes.js.map