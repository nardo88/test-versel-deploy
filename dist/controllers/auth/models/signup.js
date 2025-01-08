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
exports.signup = void 0;
const errorCodes_1 = require("../../../constants/errorCodes");
const createId_1 = require("../../../helpers/createId");
const validateEmail_1 = require("../../../helpers/validateEmail");
const Users_1 = __importDefault(require("../../../models/Users/Users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function signup(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = options;
            const candidate = yield Users_1.default.findOne({ email }, { _id: 1 }).lean();
            if (candidate) {
                return {
                    status: errorCodes_1.ErrorCodes.BAD_REQUEST,
                    message: errorCodes_1.ErrorMessages.ALREADY_EXISTS,
                };
            }
            if (!(0, validateEmail_1.validateEmail)(email) || !password.trim()) {
                return {
                    status: errorCodes_1.ErrorCodes.BAD_REQUEST,
                    message: errorCodes_1.ErrorMessages.INVALID_DATA,
                };
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = new Users_1.default({
                _id: (0, createId_1.createId)(),
                email,
                password: hashedPassword,
            });
            yield user.save();
            return {
                status: 201,
            };
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.signup = signup;
//# sourceMappingURL=signup.js.map