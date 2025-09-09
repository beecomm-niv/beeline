import { sign, verify } from 'jsonwebtoken';
import { JwtBody } from '../models/jwt-body';

export class JwtUtils {
  private static secret: string = '1234';

  public static getToken = (body: JwtBody): string | null => {
    try {
      return sign(body, this.secret);
    } catch {
      return null;
    }
  };

  public static verifyToken = (token: string): JwtBody | null => {
    try {
      const body = verify(token, this.secret);

      return body as JwtBody;
    } catch {
      return null;
    }
  };
}
