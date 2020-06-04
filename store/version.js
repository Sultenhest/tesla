export const state = () => ({
  version: '1.0.3'
})

export const getters = {
  getVersion: (state) => {
    return state.version
  }
}
