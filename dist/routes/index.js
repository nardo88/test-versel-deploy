"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const users_1 = require("./users");
const articles_1 = require("./articles");
var RouterEnum;
(function (RouterEnum) {
    RouterEnum["AUTH_ROUTERS"] = "authRouter";
    RouterEnum["USER_ROUTER"] = "userRouter";
    RouterEnum["CATALOG_ROUTERS"] = "catalogRouter";
})(RouterEnum || (RouterEnum = {}));
const createRoutes = () => {
    const authRouter = (0, auth_1.createAuthRouter)();
    const userRouter = (0, users_1.createUserRouter)();
    const catalogRouter = (0, articles_1.createArticleRouter)();
    return {
        authRouter,
        userRouter,
        catalogRouter,
    };
};
exports.default = createRoutes;
//# sourceMappingURL=index.js.map