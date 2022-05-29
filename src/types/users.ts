interface BaseUser {
  name: string;
  username: string;
  email: string ; 
}
interface User extends BaseUser {
  password: string;
}

export { User, BaseUser };
