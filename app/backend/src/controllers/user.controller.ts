import { Request, Response } from 'express';
import UserService from '../services/user.service';
import JWTtoken from '../utils/tokenDecode';

export default class UserController {
  service = new UserService();
  token = new JWTtoken();

  public loginValidate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const data = await this.service.loginAuth(authorization || 'string');

    return res.status(200).json({ role: data && data.role });
  };

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const data = await this.service.loginValidate(email, password);

    if (data === 400) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (data === 401) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    if (data === 200) { return res.status(200).json({ token: this.token.newToken(req.body) }); }
  };
}
