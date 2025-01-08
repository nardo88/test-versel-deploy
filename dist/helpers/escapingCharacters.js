"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapingCharacters = exports.chars = void 0;
exports.chars = /[\*\(\)\[\]\?\\]/;
const escapingCharacters = (str) => {
    if (typeof str !== 'string')
        return '';
    return str
        .split('')
        .map((char) => char.replace(exports.chars, (match) => `\\${match}`))
        .join('');
};
exports.escapingCharacters = escapingCharacters;
//# sourceMappingURL=escapingCharacters.js.map