import { getCategory } from '@/api'

const state = {
  categoryList: []
}

const mutations = {
  getCategory(state, data) {
    state.categoryList = data
  }
}

const actions = {
  async getCategory({ commit }) {
    const res = await getCategory()
    commit('getCategory', res)
  }
}

export default {
  state,
  mutations,
  actions
}
