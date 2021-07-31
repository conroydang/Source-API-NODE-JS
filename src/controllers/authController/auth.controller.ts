import { Collection } from 'mongodb';
import { LoginModel, RegisterModel } from '../../model';
import { AuthService, PasswordService } from '../../services';

export const AuthController = {
  login: async function (collection: Collection<any>, model: { body: LoginModel }): Promise<any> {
    // Check if user exists
    const user = await collection.findOne({
      username: model.body.username
    });

    if (user && PasswordService.compare(model.body.password, user?.password ?? '')) {
      return AuthService.generateToken(user.username, user?.roles ?? []);
    }
    
    throw new Error('Username or Password were wrong');
  },
  register: async function (collection: Collection<any>, model: { body: RegisterModel }): Promise<any> {
    // Check if user exists
    let user = await collection.findOne({
      username: model.body.username
    });

    if (user) {
      throw new Error('User exists');
    } else {
      user = {
        username: model.body.username,
        fullname: model.body.fullname,
        password: PasswordService.hash(model.body.password),
        roles: [
          'user'
        ]
      }
      await collection.insertOne(user);
      
      return AuthService.generateToken(user.username, user?.roles ?? []);
    }
  }
}