import { Request, Response, NextFunction } from 'express';
import User from '../../src/models/user';
import { NotAuthorizedError } from '../'

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.currentUser) throw new NotAuthorizedError()

    const user = await User.findById(req.currentUser?.userId);

    if(!user) throw new NotAuthorizedError()

    next()
} 
