import { jwtVerify, SignJWT } from 'jose';

export class JwtUtils {
  private static secret: string = process.env.JWT_SECRET || '';

  public static getToken = async (body: any): Promise<string | null> => {
    try {
      const encoder = new TextEncoder();
      const secretKey = encoder.encode(this.secret);

      const token = await new SignJWT(body as any)
        .setProtectedHeader({ alg: 'HS256' }) // האלגוריתם
        .setIssuedAt()
        .setExpirationTime('1y') // תוקף (לדוגמה שעתיים)
        .sign(secretKey);

      return token;
    } catch {
      return null;
    }
  };

  public static verifyToken = async <T>(token: string): Promise<T | null> => {
    try {
      const encoder = new TextEncoder();
      const secretKey = encoder.encode(this.secret);

      const { payload } = await jwtVerify(token, secretKey);
      return payload as any as T;
    } catch {
      return null;
    }
  };
}
