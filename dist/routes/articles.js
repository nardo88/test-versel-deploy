"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticleRouter = void 0;
const articles_1 = require("../controllers/articles");
const auth_middleware_1 = require("../middleware/auth.middleware");
const express_1 = require("express");
const createArticleRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new articles_1.ArticleController();
    router.get('/', auth_middleware_1.authStrict, controller.getList);
    router.get('/get-one/:id', auth_middleware_1.authStrict, controller.getForView);
    router.get('/catalog', controller.getCatalog);
    router.get('/get-for-edit/:id', auth_middleware_1.authStrict, controller.getForEdit);
    router.get('/preview', auth_middleware_1.authStrict, controller.preview);
    router.post('/create', auth_middleware_1.authStrict, controller.create);
    router.put('/update/:id', auth_middleware_1.authStrict, controller.update);
    router.delete('/remove/:id', auth_middleware_1.authStrict, controller.remove);
    return router;
};
exports.createArticleRouter = createArticleRouter;
//# sourceMappingURL=articles.js.map