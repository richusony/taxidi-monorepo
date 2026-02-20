"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
class AdminController {
    __constructor() { }
    login(req, res) {
        console.log("reached admin login controller!!!");
        return res.send(req.path);
    }
}
exports.AdminController = AdminController;
