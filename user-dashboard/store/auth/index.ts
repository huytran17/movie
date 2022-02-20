export const state = () => ({
  user: {},
  login_data: {
    email: "",
    password: "",
  },
  sign_up_data: {
    email: "",
    password: "",
    password_confirmation: "",
  },
});

export type AuthState = ReturnType<typeof state>;
