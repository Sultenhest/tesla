export const state = () => ({
  version: '1.0.1'
})

export const getters = {
  getVersion: (state) => {
    return state.version
  }
}
