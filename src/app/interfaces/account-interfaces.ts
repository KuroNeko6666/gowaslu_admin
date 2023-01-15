enum role {
  user = 'user',
  admin = 'admin',
  operator = 'operator',
}
export interface AccountInterfaces {
  name: string,
  email: string,
  role: number
}
