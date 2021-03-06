import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { ActionTree } from "vuex";
import { UserState } from "./index";
import { RootState } from "../index";
import _ from "lodash";

const actions: ActionTree<UserState, RootState> = {
  /**
   * @description Get all users
   * @param param0
   */
  async [ActionTypes.GET_USERS]({ commit }) {
    const { users } = await this.$axios.$get(`/api/user/all-users`);
    commit(MutationTypes.SET_USERS, { users });
    return users;
  },
  /**
   * @description Get single user, the chosen user state is used in payment.
   * @param param0
   */
  async [ActionTypes.GET_USER]({ commit }, { user_id }) {
    let { data: user } = await this.$axios.$get(`/api/user/${user_id}`);
    return user;
  },

  /**
   * @description Get single user by slug.
   * @param param0
   */
  async [ActionTypes.GET_USER_BY_SLUG]({ commit }, { slug }) {
    let { data: user } = await this.$axios.$get(`/api/user/slug/${slug}`);
    return user;
  },

  /**
   * @description check if user slug is available
   * @param param0
   */
  async [ActionTypes.CHECK_USER_SLUG_AVAILABLE]({ commit }, { slug }) {
    let { data: user } = await this.$axios.$get(`/api/user/slug/${slug}`);
    return user;
  },

  /**
   *
   * @description Update user
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_USER]({ commit }, { user }) {
    const result = await this.$axios.$put(`/api/user/`, user);
    return result;
  },

  /**UPLOAD_EVENT_IMAGE
   * @Description upload a user's profile image
   * @param param0
   */
  async [ActionTypes.UPDATE_USER_AVATAR]({ commit }, { file, user_id }) {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data, is_error, message } = await this.$axios.$post(
      `/api/user/upload-avatar/${user_id}`,
      formData,
      config
    );

    return { data, is_error, message };
  },
};

export default actions;
