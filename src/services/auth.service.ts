import { CreateToken } from ".";

const generateTokenFn = (username: string, roles: string[]) => {
  const data: any = {};
  const expiredIn = new Date(Date.now());
  expiredIn.setHours(expiredIn.getHours() + 720);

  data.roles = roles;
  data.user = username;
  data.token = CreateToken(data);
  data.expiredIn = expiredIn;

  return data;
}

export const AuthService = {
  generateToken: generateTokenFn
}