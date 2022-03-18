import { getCityName } from '@/api'

const state = {
  cityList: []
}

const mutations = {
  cityName(state, data) {
    state.cityList = data
  }
}

const actions = {
  async cityName({ commit }) {
    const { code, result } = await getCityName()
    const arr = []
    function treeCity(arr, pid = 0) {
      result.forEach(item => {
        if (item.pid === pid) {
          arr.push(item)
          treeCity((item.children = []), item.id)
          if (item.children.length === 0) {
            delete item.children
          }
        }
      })
    }
    if (code === 200) {
      treeCity(arr)
    }
    console.log(arr)
    // commit('cityName', result.rows)
  }
}

export default {
  state,
  mutations,
  actions
}
