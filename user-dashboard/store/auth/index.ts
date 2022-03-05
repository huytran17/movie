export const state = () => ({
  user: {},
  sign_in_data: {
    email: "",
    password: "",
  },
  sign_up_data: {
    email: "",
    password: "",
    password_confirmation: "",
  },
  has_user: false,
});

export type AuthState = ReturnType<typeof state>;
