const pageData = {
  state: {
  	pageDatas: []
  },
  mutations: {
    SET_PAGE_DATA: (state, data) => {
      if (state.pageDatas.find(d => d.id === data.id)) {
      	return
      }
      state.pageDatas.push(data)
    },
    DELETE_PAGE_DATA: (state, id) => {
      for (const [i, p] of state.pageDatas.entries()) {
        if (p.id === id) {
          state.pageDatas.splice(i, 1)
          break
        }
      }
    },
    DEL_OTHERS_PAGE_DATA: (state, id) => {
      for (const [i, v] of state.pageDatas.entries()) {
        if (v.id === id) {
          state.pageDatas = state.pageDatas.slice(i, i + 1)
          break
        }
      }
    },
    DEL_ALL_PAGE_DATA: (state) => {
      state.pageDatas = []
    }
  },
  actions: {
    savePageData({ commit }, data) {
      let temp = JSON.parse(JSON.stringify(data, function(k, v){
          if(v === undefined){
              return "";
          }else{
              return v;
          }
      }))
      commit('SET_PAGE_DATA', temp)
    },
    deletePageData({ commit }, id) {
      commit('DELETE_PAGE_DATA', id)
    },
    delOthersViews({ commit, state }, id) {
      commit('DEL_OTHERS_PAGE_DATA', id)
    },
    delAllViews({ commit, state }) {
      commit('DEL_ALL_PAGE_DATA')
    }
  }
}

export default pageData