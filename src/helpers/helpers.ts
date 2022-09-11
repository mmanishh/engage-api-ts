import { Request, Response } from 'express'
import { OPERATION_COMPLETED, SOMETHING_WENT_WRONG } from './messages';

export const successResponse = (req: Request,res: Response, data:any, message = OPERATION_COMPLETED, code = 200):Response => {
    res.status(code);
    res.send({
        code,
        success: true,
        message,
        data,
    });
    return res;
};

export const errorResponse = (req: Request, res: Response, message = SOMETHING_WENT_WRONG, code = 500):Response => {
    res.status(code);
    res.send({
        code,
        success: false,
        message,
        data: null,
    });
    return res
};