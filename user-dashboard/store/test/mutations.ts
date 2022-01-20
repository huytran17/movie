import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { TestState } from './index'

const mutations: MutationTree<TestState> = {
  [MutationTypes.SET_INFO] (state, { data }:{data: object}) {
    state.info = data
  }
}

export default mutations
