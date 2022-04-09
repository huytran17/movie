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
  user_count_analytics: [],
  film_count_analytics: [],
  admin_count_analytics: [],
  user_cumulative_count_analytics: [],
  film_cumulative_count_analytics: [],
  admin_cumulative_count_analytics: [],
  user_date_count_analytics: [],
  film_date_count_analytics: [],
  admin_date_count_analytics: [],
  loading: true,
});

export type AuthState = ReturnType<typeof state>;
