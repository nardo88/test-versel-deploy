"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createId = exports.randomString = exports.UNMISTAKABLE_CHARS = void 0;
exports.UNMISTAKABLE_CHARS = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';
const choice = (string) => {
    const index = Math.floor(Math.random() * string.length);
    return string.substr(index, 1);
};
const randomString = (charsCount, alphabet) => {
    let result = '';
    for (let i = 0; i < charsCount; i++) {
        result += choice(alphabet);
    }
    return result;
};
exports.randomString = randomString;
const createId = () => (0, exports.randomString)(17, exports.UNMISTAKABLE_CHARS);
exports.createId = createId;
//# sourceMappingURL=createId.js.map