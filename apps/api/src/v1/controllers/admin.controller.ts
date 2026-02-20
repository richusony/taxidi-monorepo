import { Request, Response } from "express";

export class AdminController {
    __constructor() {}

    login(req: Request, res:Response) {
        console.log("reached admin login controller!!!");
        return res.json({message: "Admin login endpoint reached"});
    }
}