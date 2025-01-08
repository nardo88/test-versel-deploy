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
exports.getLestForAdmin = void 0;
const Articles_1 = __importDefault(require("../../../models/Articles/Articles"));
const getLestForAdmin = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, category = '', title = '' } = options;
        const articles = yield Articles_1.default.aggregate([
            {
                $match: {
                    category: { $regex: category, $options: 'i' },
                    title: { $regex: title, $options: 'i' },
                },
            },
            {
                $sort: {
                    updatedAt: -1,
                },
            },
            {
                $facet: {
                    data: [
                        {
                            $skip: (page - 1) * Number(limit),
                        },
                        {
                            $limit: Number(limit),
                        },
                        {
                            $project: {
                                id: '$_id',
                                _id: 0,
                                title: 1,
                                category: 1,
                                createdAt: 1,
                                updatedAt: 1,
                            },
                        },
                    ],
                    total: [
                        {
                            $count: 'count',
                        },
                    ],
                },
            },
            {
                $project: {
                    data: 1,
                    total: {
                        $arrayElemAt: ['$total.count', 0],
                    },
                },
            },
        ]);
        return {
            list: articles[0].data || [],
            total: articles[0].total || 0,
        };
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getLestForAdmin = getLestForAdmin;
//# sourceMappingURL=getLestForAdmin.js.map