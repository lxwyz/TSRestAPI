"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db/db");
const todoRouter_1 = __importDefault(require("./routes/todoRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config({
    path: ".env"
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.use((0, cookie_parser_1.default)());
app.use(errorHandler_1.default);
app.use("/api/todos", todoRouter_1.default);
app.use("/api/users", userRouter_1.default); // Added the base path for user routes
app.listen(PORT, () => {
    (0, db_1.connectDB)();
    console.log(`Server running on port ${PORT}`);
});
