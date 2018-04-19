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
    }
  },
  actions: {
    SavePageData({ commit }, data) {
      let temp = JSON.parse(JSON.stringify(data, function(k, v){
          if(v === undefined){
              return "";
          }else{
              return v;
          }
      }))
      // console.log('save page data ' + data.id)
      commit('SET_PAGE_DATA', temp)
    },
    DeletePageData({ commit }, id) {
      // console.log('delete page data ' + id)
      commit('DELETE_PAGE_DATA', id)
    }
  }
}

export default pageData