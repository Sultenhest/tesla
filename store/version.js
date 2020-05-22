export const state = () => ({
  version: '1.0.2'
})

export const getters = {
  getVersion: (state) => {
    return state.version
  }
}
