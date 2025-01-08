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
exports.ArticleController = void 0;
const getCatalog_1 = require("./modules/getCatalog");
const errorCodes_1 = require("../../constants/errorCodes");
const pagination_1 = require("../../helpers/pagination");
const escapingCharacters_1 = require("../../helpers/escapingCharacters");
const getLestForAdmin_1 = require("./modules/getLestForAdmin");
const Articles_1 = __importDefault(require("../../models/Articles/Articles"));
const createId_1 = require("../../helpers/createId");
class ArticleController {
    constructor() {
        this.getCatalog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, pageCount } = (0, pagination_1.pagination)(req.query);
                const { filter } = req.query;
                const { data, total } = yield (0, getCatalog_1.getCatalog)({
                    page,
                    pageCount,
                    filter: (0, escapingCharacters_1.escapingCharacters)(filter === null || filter === void 0 ? void 0 : filter.toLocaleString()),
                });
                res.json({ data, total });
            }
            catch (e) {
                res
                    .status(500)
                    .json({ details: e.message, message: 'Что то пошло не так!' });
            }
        });
        this.getList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { roles } = req.user;
                if (!roles.includes('admin')) {
                    return res.status(403).json({ message: 'Access denied' });
                }
                const { page, pageCount } = (0, pagination_1.pagination)(req.query);
                const { category = '', title = '' } = req.query;
                const { list, total } = yield (0, getLestForAdmin_1.getLestForAdmin)({
                    page,
                    limit: pageCount,
                    category: (0, escapingCharacters_1.escapingCharacters)(category.toLocaleString()),
                    title: (0, escapingCharacters_1.escapingCharacters)(title.toLocaleString()),
                });
                return res.json({ list, total });
            }
            catch (e) {
                res
                    .status(500)
                    .json({ details: e.message, message: 'Что то пошло не так!' });
            }
        });
        this.getForEdit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { roles } = req.user;
                if (!roles.includes('admin')) {
                    return res.status(403).json({ message: 'Access denied' });
                }
                const { id } = req.params;
                const article = yield Articles_1.default.findOne({ _id: id }).lean();
                return res.json(Object.assign({}, article));
            }
            catch (e) {
                res
                    .status(500)
                    .json({ details: e.message, message: 'Что то пошло не так!' });
            }
        });
        this.getForView = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const article = yield Articles_1.default.findOne({ _id: id }, { body: 1 }).lean();
                return res.json((article === null || article === void 0 ? void 0 : article.body) || []);
            }
            catch (e) {
                res
                    .status(500)
                    .json({ details: e.message, message: 'Что то пошло не так!' });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, title, body, description, image } = req.body;
                const { userId, roles } = req.user;
                if (!roles.includes('admin')) {
                    return res
                        .status(errorCodes_1.ErrorCodes.FORBIDDEN)
                        .json({ message: errorCodes_1.ErrorMessages.FORBIDDEN });
                }
                const newArticle = new Articles_1.default({
                    _id: (0, createId_1.createId)(),
                    category,
                    title,
                    userId,
                    body,
                    description,
                    image,
                });
                yield newArticle.save();
                return res.status(201).json({ id: newArticle._id });
            }
            catch (e) {
                res
                    .status(500)
                    .json({ details: e.message, message: 'Что то пошло не так!' });
            }
        });
        this.remove = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { roles } = req.user;
                const { id } = req.params;
                if (!roles.includes('admin')) {
                    return res
                        .status(errorCodes_1.ErrorCodes.FORBIDDEN)
                        .json({ message: errorCodes_1.ErrorMessages.FORBIDDEN });
                }
                yield Articles_1.default.findOneAndDelete({ _id: id });
                return res.sendStatus(200);
            }
            catch (e) {
                res
                    .status(500)
                    .json({ details: e.message, message: 'Что то пошло не так!' });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, title, body, description, image } = req.body;
                const { id } = req.params;
                const { userId, roles } = req.user;
                if (!roles.includes('admin')) {
                    return res
                        .status(errorCodes_1.ErrorCodes.FORBIDDEN)
                        .json({ message: errorCodes_1.ErrorMessages.FORBIDDEN });
                }
                yield Articles_1.default.findOneAndUpdate({ _id: id }, {
                    category,
                    title,
                    userId,
                    body,
                    description,
                    image,
                });
                return res.sendStatus(200);
            }
            catch (e) {
                res
                    .status(500)
                    .json({ details: e.message, message: 'Что то пошло не так!' });
            }
        });
        this.preview = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield Articles_1.default.aggregate([
                    {
                        $project: {
                            id: '$_id',
                            _id: 0,
                            title: 1,
                            category: 1,
                        },
                    },
                    {
                        $group: {
                            _id: '$category',
                            titles: {
                                $push: {
                                    title: '$title',
                                    id: '$id',
                                },
                            },
                        },
                    },
                    {
                        $sort: {
                            _id: 1,
                        },
                    },
                ]);
                res.json(articles);
            }
            catch (e) {
                res
                    .status(500)
                    .json({ details: e.message, message: 'Что то пошло не так!' });
            }
        });
    }
}
exports.ArticleController = ArticleController;
//# sourceMappingURL=index.js.map