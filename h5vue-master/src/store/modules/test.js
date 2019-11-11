const SETARTLIST = 'SETARTLIST'
const SETUSERLIST = 'SETUSERLIST'
const state = {
  artList: [],
  userList: []
}
const actions = {
  async getData (state, data) {
    try {

    } catch (error) {

    }
  }
}
const mutations = {
  [SETARTLIST] (state, data) {
    let artList = data.list
    state.artList = artList
  },
  [SETUSERLIST] (state, data) {
    let userList = data.list
    state.userList = userList
  }
}
const getters = {

}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
