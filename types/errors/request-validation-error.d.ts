import { ValidationError } from 'express-validator';
import { CustomError } from '../';
export declare class RequestValidationError extends CustomError {
    errors: ValidationError[];
    statusCode: number;
    constructor(errors: ValidationError[]);
    serialiseErrors(): {
        message: any;
        field: string;
    }[];
}
