"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRouter = void 0;
const Users_1 = require("../controllers/users/Users");
const auth_middleware_1 = require("../middleware/auth.middleware");
const express_1 = require("express");
const createUserRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new Users_1.UsersController();
    router.get('/get-user', auth_middleware_1.authStrict, controller.getUser);
    return router;
};
exports.createUserRouter = createUserRouter;
//# sourceMappingURL=users.js.map