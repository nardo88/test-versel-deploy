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
exports.getCatalog = void 0;
const translate_1 = require("../../../helpers/translate");
const Articles_1 = __importDefault(require("../../../models/Articles/Articles"));
const getCatalog = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, pageCount, filter = '' } = options;
        const data = yield Articles_1.default.aggregate([
            {
                $match: {
                    $or: [
                        { title: { $regex: filter, $options: 'i' } },
                        { title: { $regex: (0, translate_1.translate)(filter), $options: 'i' } },
                    ],
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $facet: {
                    data: [
                        { $skip: pageCount * (page - 1) },
                        { $limit: pageCount },
                        {
                            $project: {
                                id: '$_id',
                                _id: 0,
                                category: 1,
                                description: 1,
                                title: 1,
                                createdAt: 1,
                                image: 1,
                            },
                        },
                    ],
                    total: [{ $count: 'count' }],
                },
            },
            { $project: { total: { $arrayElemAt: ['$total.count', 0] }, data: 1 } },
        ]);
        return {
            data: data[0].data,
            total: data[0].total || 0,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getCatalog = getCatalog;
//# sourceMappingURL=getCatalog.js.map