import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/custom-error'

export const errorHandler = (
	err: Error,
	req: Req,
	res: Response,
	next: NextFunction
) => {
	if(err instanceof CustomError) {
			res.status(err.statusCode).json({ errors: err.serialiseErrors() })
	}

    res.status(500).send({
			errors: [ { message: 'something went wrong' } ]
		});
}