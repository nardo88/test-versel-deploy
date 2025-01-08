"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = ({ page, pageCount, }) => {
    let offset = 1;
    let limit = 10;
    if (page) {
        offset = Number(page);
    }
    if (pageCount) {
        limit = Number(pageCount);
    }
    return { page: offset, pageCount: limit };
};
exports.pagination = pagination;
//# sourceMappingURL=pagination.js.map