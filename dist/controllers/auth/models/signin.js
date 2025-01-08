"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
const errorCodes_1 = require("../../../constants/errorCodes");
const createJWT_1 = require("../../../helpers/createJWT");
const Users_1 = __importDefault(require("../../../models/Users/Users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function signin(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = options;
            const user = yield Users_1.default.findOne({ email }, { password: 1, roles: 1 }).lean();
            if (!user) {
                return {
                    status: errorCodes_1.ErrorCodes.NOT_FOUND,
                    message: 'user not found',
                };
            }
            const valid = yield bcryptjs_1.default.compare(password, user.password);
            if (!valid) {
                return {
                    status: errorCodes_1.ErrorCodes.BAD_REQUEST,
                    message: 'invalid data',
                };
            }
            const jwt = (0, createJWT_1.createJWT)({ userId: user._id, roles: user.roles });
            return {
                status: 200,
                token: jwt,
            };
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.signin = signin;
//# sourceMappingURL=signin.js.map