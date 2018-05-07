import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

@Middleware()
export class PayloadConverterMiddleware implements NestMiddleware {
    resolve(...args: any[]): ExpressMiddleware {
        return (req, res, next) => {
            console.log('Request...', req);
            req.body.payload = this.convertBufferToString(req.body.payload);
            next();
        };
    }

    convertBufferToString(payload) {
        if(payload instanceof Buffer) {
            return payload.toString();
        };

        if(payload.type && payload.type.toLowerCase() === "buffer"){
            return Buffer.from(payload).toString()
        };

        return 'error'
    }
}
