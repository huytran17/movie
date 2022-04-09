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
    first_name: "",
    last_name: "",
  },
  has_user: false,
  is_edited: false,
});

export type AuthState = ReturnType<typeof state>;
