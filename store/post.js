export const state = () => {
  return {

    draft: []
  }
}

// 存放的是同步修改state的方法
export const mutations = {
  setdraft(state, data) {
    state.draft.push(data)
  },
  deldraft(state, index) {
    state.draft.splice(index, 1)
  }
}
