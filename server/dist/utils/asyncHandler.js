"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (controllersFn) => (req, res, next) => {
    Promise.resolve(controllersFn(req, res, next)).catch(next);
};
exports.default = asyncHandler;
