import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../index'

export const errorHandler = (
	err: Error,
	req: Req,
	res: Response,
	next: NextFunction
) => {
	if(err instanceof CustomError) {
			return res.status(err.statusCode).json({ errors: err.serialiseErrors() })
	}

    res.status(500).send({
			errors: [ { message: 'something went wrong' } ]
		});
}