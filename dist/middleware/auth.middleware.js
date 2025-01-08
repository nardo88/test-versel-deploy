"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authStrict = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorCodes_1 = require("../constants/errorCodes");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
function authStrict(req, res, next) {
    var _a;
    try {
        if (req.method === 'OPTIONS') {
            return next();
        }
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(errorCodes_1.ErrorCodes.NOT_AUTH).json({ message: 'not auth' });
    }
}
exports.authStrict = authStrict;
//# sourceMappingURL=auth.middleware.js.map