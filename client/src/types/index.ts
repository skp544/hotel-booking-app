export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AppContext = {
  success: boolean;
  isAuth: () => void;
};

export type SignInFormData = {
  email: string;
  password: string;
};
