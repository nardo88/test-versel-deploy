"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = void 0;
const auth_1 = require("../controllers/auth");
const express_1 = require("express");
const createAuthRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new auth_1.AuthController();
    router.post('/signin', controller.signin);
    router.post('/signup', controller.signup);
    return router;
};
exports.createAuthRouter = createAuthRouter;
//# sourceMappingURL=auth.js.map