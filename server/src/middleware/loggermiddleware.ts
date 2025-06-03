import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, url } = req;
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`[${new Date().toLocaleString()}] ${clientIp} ${method} ${url}`);
        next();
    }
}