import { sign, verify } from 'jsonwebtoken';
import { JwtBody } from '../models/jwt-body';

export class JwtUtils {
  private static secret: string = process.env.JWT_SECRET || '';

  public static getToken = (body: JwtBody): string | null => {
    try {
      if (!this.secret) {
        return null;
      }

      return sign(body, this.secret);
    } catch {
      return null;
    }
  };

  public static verifyToken = (token: string): JwtBody | null => {
    try {
      if (!this.secret) {
        return null;
      }

      const body = verify(token, this.secret);

      return body as JwtBody;
    } catch {
      return null;
    }
  };
}
