import { ActionTree } from 'vuex'
import { RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { TestState } from './index'

const actions: ActionTree<TestState, RootState> = {
  [ActionTypes.GET_INFO] ({ commit }) {
    const info = {
      name: 'Huy',
      age: 22
    }
    commit(MutationTypes.SET_INFO, { data: info })
  }
}

export default actions
