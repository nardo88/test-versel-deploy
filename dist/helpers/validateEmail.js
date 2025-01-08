"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.REGEXP_EMAIL = void 0;
exports.REGEXP_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateEmail = (email) => exports.REGEXP_EMAIL.test(email);
exports.validateEmail = validateEmail;
//# sourceMappingURL=validateEmail.js.map