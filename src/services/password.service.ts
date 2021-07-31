import b from 'bcrypt';

const hashFn = function (plaintextPassword: string) {
  const salt = b.genSaltSync(PasswordService.saltRounds);

  return b.hashSync(plaintextPassword, salt);
}

const compareFn = (plantext: string, hash: string) => b.compareSync(plantext, hash);

export const PasswordService = {
  saltRounds: 10,
  hash: hashFn,
  compare: compareFn
}