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
    const { data } = await this.$axios.$get(`/admin/user`);

    commit(MutationTypes.SET_USERS, { users: data });
    return data;
  },
  /**
   * @description Get single user, the chosen user state is used in payment.
   * @param param0
   */
  async [ActionTypes.GET_USER]({ commit }, { user_id }) {
    let { data: user } = await this.$axios.$get(`/admin/user/${user_id}`);
    return user;
  },

  /**
   * @description Get single user by slug.
   * @param param0
   */
  async [ActionTypes.GET_USER_BY_SLUG]({ commit }, { slug }) {
    let { data: user } = await this.$axios.$get(`/admin/user/slug/${slug}`);
    return user;
  },

  /**
   * @description check if user slug is available
   * @param param0
   */
  async [ActionTypes.CHECK_USER_SLUG_AVAILABLE]({ commit }, { slug }) {
    let { data: user } = await this.$axios.$get(`/admin/user/slug/${slug}`);
    return user;
  },

  /**
   *
   * @description Update user
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_USER]({ commit }, { user }) {
    const result = await this.$axios.$put(`/admin/user/`, user);
    return result;
  },

  /**
   *
   * @description create user
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_USER]({ commit }, { user }) {
    const { data, is_error, message } = await this.$axios.$post(
      `/admin/user/`,
      { data: user }
    );
    return { data, is_error, message };
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
    const result = await this.$axios.$post(
      `/admin/user/upload-avatar/${user_id}`,
      formData,
      config
    );

    return result;
  },

  /**
   * @Description publish a user to show on mobile app
   * @param {is_published: boolean}
   */
  async [ActionTypes.PUBLISH_USER]({ commit }, { user_id, is_published }) {
    const result = await this.$axios.$post(`/admin/user/publish`, {
      user_id,
      is_published,
    });

    return result;
  },

  /**
   * @Description publish a user to show on mobile app
   * @param {is_published: boolean}
   */
  async [ActionTypes.DELETE_USER]({ commit }, { user_id }) {
    const result = await this.$axios.$delete(`/admin/user/delete/${user_id}`);

    return result;
  },
};

export default actions;
