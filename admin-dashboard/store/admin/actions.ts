import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { ActionTree } from "vuex";
import { AdminState } from "./index";
import { RootState } from "../index";
import _ from "lodash";

const actions: ActionTree<AdminState, RootState> = {
  /**
   * @description Get all admins
   * @param param0
   */
  async [ActionTypes.GET_ADMINS]({ commit }) {
    const { data } = await this.$axios.$get(`/admin/admin`);

    commit(MutationTypes.SET_ADMINS, { admins: data });
    return data;
  },
  /**
   * @description Get single admin, the chosen admin state is used in payment.
   * @param param0
   */
  async [ActionTypes.GET_ADMIN]({ commit }, { admin_id }) {
    let { data } = await this.$axios.$get(`/admin/admin/${admin_id}`);
    commit(MutationTypes.SET_ADMIN, { data });

    return data;
  },

  /**
   *
   * @description Update admin
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_ADMIN]({ commit }, { admin }) {
    const result = await this.$axios.$put(`/admin/admin/`, admin);
    commit(MutationTypes.SET_ADMIN, { admin: result });

    return result;
  },

  /**
   *
   * @description Update admin
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_ADMIN]({ commit }, { admin_data }) {
    const result = await this.$axios.$post(`/admin/admin/create-admin`, {
      data: admin_data,
    });

    return result;
  },

  /**UPLOAD_EVENT_IMAGE
   * @Description upload a admin's profile image
   * @param param0
   */
  async [ActionTypes.UPDATE_ADMIN_AVATAR]({ commit }, { file, admin_id }) {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await this.$axios.$post(
      `/admin/admin/upload-avatar/${admin_id}`,
      formData,
      config
    );
    console.log(data);

    commit(MutationTypes.SET_ADMIN, { data });

    return data;
  },

  /**
   * @Description publish a admin to show on mobile app
   * @param {is_published: boolean}
   */
  async [ActionTypes.PUBLISH_ADMIN]({ commit }, { admin_id, is_published }) {
    const result = await this.$axios.$post(`/admin/admin/publish`, {
      admin_id,
      is_published,
    });
    commit(MutationTypes.SET_ADMIN, { admin: result });

    return result;
  },

  /**
   * @Description publish a admin to show on mobile app
   * @param {is_published: boolean}
   */
  async [ActionTypes.DELETE_ADMIN]({ commit }, { admin_id }) {
    const result = await this.$axios.$delete(`/admin/admin/delete/${admin_id}`);

    return result;
  },
};

export default actions;
