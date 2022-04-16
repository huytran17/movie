import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({
  // show_confirm_dialog: false,
});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
  // show_confirm_dialog: (state) => state.show_confirm_dialog,
};

export const mutations: MutationTree<RootState> = {
  /**
   * @description to set show drawer variable
   * @param state
   * @param param1
   */
  // SET_SHOW_CONFIRM_DIALOG(state, { data }: { data: boolean }) {
  //   // console.log("data", data);
  //   state.show_confirm_dialog = data;
  // },
};
