import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { TestState } from './index'

export const getters: GetterTree<TestState, RootState> = {
  prefix () {
    return '/test'
  },
  info: state => state.info
}

export default getters
