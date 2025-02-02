import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
	interface Req extends Request {
		session?: any,
		currentUser?: any,
		uploaderError?: any,
	}
}

export const currentUser = (jwt_key: string) => {
	console.log(jwt_key)
	return (
		req: Req,
		res: Response,
		next: NextFunction
	) => {
		if (!req.session?.jwt) {
			return next();
		}

		try {
			const payload = jwt.verify(
				req.session.jwt,
				jwt_key!
			)
			req.currentUser = payload;
		} catch (err) {
			next(err)
		}

		next();
	}
}