import bcrypt = require('bcryptjs');
import Users from '../database/models/UsersModel';
import JWTtoken from '../utils/tokenDecode';

export default class UserService {
  public jwt = new JWTtoken();

  constructor(private users = Users) { }

  public loginAuth = async (authorization: string) => {
    const jwt = this.jwt.tokenValidate(authorization);
    const user = await this.users.findOne({
      where: { email: jwt.email },
    });
    return user;
  };

  public loginValidate = async (email: string, password: string) => {
    if (!email || !password) return 400;
    const user = await this.users.findOne({ where: { email } });
    const passwordCompare = user && bcrypt.compareSync(password, user.password);
    if (passwordCompare) return 200;
    return 401;
  };
};
