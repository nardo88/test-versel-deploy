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
exports.UsersController = void 0;
const errorCodes_1 = require("../../constants/errorCodes");
const Users_1 = __importDefault(require("../../models/Users/Users"));
class UsersController {
    constructor() {
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                const current = yield Users_1.default.findOne({ _id: userId }, { password: 0 }).lean();
                if (!current) {
                    return res
                        .status(errorCodes_1.ErrorCodes.NOT_FOUND)
                        .json({ message: errorCodes_1.ErrorMessages.NOT_FOUND });
                }
                return res.json(Object.assign({}, current));
            }
            catch (e) {
                res
                    .status(500)
                    .json({ message: 'Что-то пошло не так', details: e.message || e });
            }
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=Users.js.map