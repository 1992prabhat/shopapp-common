import jwt from 'jsonwebtoken';
import { JwtPayload } from '../constants/globals';
import { scrypt, randomBytes }  from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class AuthenticationService {
	generateJwt(payload: JwtPayload, JWT_KEY: string) {
		return jwt.sign(payload, JWT_KEY)
	}

	async pwdToHash(password: string) {
		const salt = randomBytes(8).toString('hex');
		const buf = (await scryptAsync(password, salt, 64)) as Buffer;

		return `${buf.toString('hex')}.${salt}`
	}

	async pwdCompare(storedPwd: string, suppiedPwd: string) {
		const [hashedPwd, salt] = storedPwd.split('.');

		const buf = (await scryptAsync(suppiedPwd, salt, 64)) as Buffer;

		return buf.toString('hex') === hashedPwd;
	}

	verifyJwt(jwtToken: string, JWT_KEY: string) {
		return jwt.verify(jwtToken, JWT_KEY) as JwtPayload;
	}
}

