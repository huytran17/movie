export const state = () => ({
  user: {},
  login_data: {},
  sign_up_data: {},
  register_data: {},
});

export type AuthState = ReturnType<typeof state>;
