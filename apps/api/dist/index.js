"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_routes_1 = __importDefault(require("./v1/routes/admin.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use('/v1/admin', admin_routes_1.default);
app.listen(PORT, () => {
    console.log(`✅ Server running on port: ${PORT}`);
});
