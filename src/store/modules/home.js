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
    const { result } = await getCategory()
    result.rows.sort((a, b) => a.category_id - b.category_id)
    commit('getCategory', result.rows)
  }
}

export default {
  state,
  mutations,
  actions
}
