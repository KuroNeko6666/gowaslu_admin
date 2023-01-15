enum role {
  user = 'user',
  admin = 'admin',
  operator = 'operator',
}
export interface AccountCreateInterfaces {
  name : string,
  email: string,
  password: string,
  role: number
}
