export const userData = {
  valid: {
    id: 1,
    username: 'User',
    role: 'user',
    email: 'admin@admin.com',
    password: 'secret_admin',
  }
}

export const login = {
  valid: {
    email: userData.valid.email,
    password: userData.valid.password,
  },
  emailInvalid: {
    email: undefined,
    password: userData.valid.password,
  },
  userNotExist: {
    email: 'notexist@email.com',
    password: '654321'
  },
  passwordIncorrect: {
    email: 'test@email.com',
    password: 'password_fail',
  },
}
