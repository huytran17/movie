import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { ActionTree } from "vuex";
import { FilmState } from "./index";
import { RootState } from "../index";
import _ from "lodash";

const actions: ActionTree<FilmState, RootState> = {
  /**
   * @description Get all films
   * @param param0
   */
  async [ActionTypes.GET_FILMS]({ commit }) {
    const { data } = await this.$axios.$get(`/admin/film`);

    commit(MutationTypes.SET_FILMS, { films: data });
    return data;
  },
  /**
   * @description Get single film, the chosen film state is used in payment.
   * @param param0
   */
  async [ActionTypes.GET_FILM]({ commit }, { film_id }) {
    let { data } = await this.$axios.$get(`/admin/film/${film_id}`);
    commit(MutationTypes.SET_FILM, { data });

    return data;
  },

  /**
   *
   * @description Update admin
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_FILM]({ commit, state }) {
    const { data, is_error, message } = await this.$axios.$post(
      `/admin/film/create-film`,
      {
        data: state.new_film,
      }
    );

    return { data, is_error, message };
  },

  /**
   *
   * @description Update film
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_FILM]({ commit, state }, { film_id }) {
    const { data, is_error, message } = await this.$axios.$put(
      `/admin/film/${film_id}`,
      {
        data: state.film,
      }
    );

    if (!is_error) {
      commit(MutationTypes.SET_FILM, { data });
    }

    return { data, is_error, message };
  },

  /**UPLOAD_EVENT_IMAGE
   * @Description upload a film's profile image
   * @param param0
   */
  async [ActionTypes.UPDATE_FILM_THUMBNAIL]({ commit }, { file, film_id }) {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data, is_error, message } = await this.$axios.$post(
      `/admin/film/upload-thumbnail/${film_id}`,
      formData,
      config
    );
    if (!is_error) {
      commit(MutationTypes.SET_FILM, { data });
    }

    return { data, is_error, message };
  },

  /**UPLOAD_EVENT_IMAGE
   * @Description upload a film's profile image
   * @param param0
   */
  async [ActionTypes.UPLOAD_FILM]({ commit }, { file, film_id }) {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data, is_error, message } = await this.$axios.$post(
      `/admin/film/upload/${film_id}`,
      formData,
      config
    );

    if (!is_error) {
      commit(MutationTypes.SET_FILM, { data });
    }

    return { data, is_error, message };
  },

  async [ActionTypes.UPLOAD_FILM_TRAILER]({ commit }, { file, film_id }) {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data, is_error, message } = await this.$axios.$post(
      `/admin/film/upload-trailer/${film_id}`,
      formData,
      config
    );

    if (!is_error) {
      commit(MutationTypes.SET_FILM, { data });
    }

    return { data, is_error, message };
  },

  /**
   * @Description publish a film to show on mobile app
   * @param {is_published: boolean}
   */
  async [ActionTypes.PUBLISH_FILM]({ commit }, { film_id, is_published }) {
    const result = await this.$axios.$post(`/admin/film/publish`, {
      film_id,
      is_published,
    });
    commit(MutationTypes.SET_FILM, { film: result });

    return result;
  },

  /**
   * @Description publish a film to show on mobile app
   * @param {is_published: boolean}
   */
  async [ActionTypes.DELETE_FILM]({ commit }, { film_id }) {
    const { data, is_error, message } = await this.$axios.$delete(
      `/admin/film/delete/${film_id}`
    );

    return { data, is_error, message };
  },
};

export default actions;
