export const state = () => ({
  version: '1.0.0'
})

export const getters = {
  getVersion: (state) => {
    return state.version
  }
}
