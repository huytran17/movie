export const state = () => ({
  user: {},
  login_data: {},
  register_data: {},
});

export type AuthState = ReturnType<typeof state>;
