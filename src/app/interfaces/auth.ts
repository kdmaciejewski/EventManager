export interface RegisterPostData {
  name: string;
  email: string;
  password: string;
}

export interface User extends RegisterPostData {
  id: string;
}
