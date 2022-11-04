export type CreateUserDetails = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_name: string;
};

export type ValidateUserDetails = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
  userName: string;
}>;

export type FindUserOptions = Partial<{
  selectAll: boolean;
}>;
