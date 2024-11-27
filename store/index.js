export const state = () => ({
    token: null,
    showAlert: false,
    type: '',
    color: '',
    mensaje: ''
  })
  
  export const mutations = {
    setToken (state, token) {
      state.token = token
    },
    setShowAlert (state, showAlert) {
      state.showAlert = showAlert
    },
    setType (state, type) {
      state.type = type
    },
    setColor (state, color) {
      state.color = color
    },
    setMensaje (state, mensaje) {
      state.mensaje = mensaje
    }
  }