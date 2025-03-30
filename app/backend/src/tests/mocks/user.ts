export const token = {
  'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc' 
}

export const userData = {
  valid: {
    id: 1,
    username: 'User',
    role: 'user',
    email: 'test@email.com',
    password: '123456',
  }
}

export const login = {
  valid: {
    email: 'test@email.com',
    password: '123456',
  },
  emailInvalid: {
    email: 'test.com',
    password: '123456',
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
