import { JwtBody } from '../models/jwt-body';
import { jwtVerify, SignJWT } from 'jose';

export class JwtUtils {
  private static secret: string = process.env.JWT_SECRET || '';

  public static getToken = async (body: JwtBody): Promise<string | null> => {
    try {
      const encoder = new TextEncoder();
      const secretKey = encoder.encode(this.secret);

      const token = await new SignJWT(body as any)
        .setProtectedHeader({ alg: 'HS256' }) // האלגוריתם
        .setIssuedAt()
        .setExpirationTime('2h') // תוקף (לדוגמה שעתיים)
        .sign(secretKey);

      return token;
    } catch {
      return null;
    }
  };

  public static verifyToken = async (token: string): Promise<JwtBody | null> => {
    try {
      const encoder = new TextEncoder();
      const secretKey = encoder.encode(this.secret);

      const { payload } = await jwtVerify(token, secretKey);
      return payload as any as JwtBody;
    } catch {
      return null;
    }
  };
}
