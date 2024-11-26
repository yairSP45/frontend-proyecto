<template>
  <v-container fill-height fluid class="login-container">
    <v-card flat elevation="0" width="600" color="#FFFFFF">
      <v-card-title>
        <p class="title" style="width: 100%; color: #000000; justify-content: left;">
          {{ inside && update ? 'Actualiza el Contacto' : (inside ? 'Registra un Nuevo Contacto' : '') }}
        </p>
      </v-card-title>
      <v-card-text style="color: #000000; justify-content: center; display: flex; flex-direction: column; height: 100%;">
        <v-row justify="center" align="center">
          <v-col>
            <form @submit.prevent="registrarUsuario">
              <!-- Primera fila de campos -->
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="usuario.nombre"
                    label="Nombre"
                    outlined
                    dense
                    color="blue"
                    class="rounded-field black-text-field"
                    style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="usuario.apaterno"
                    label="A. Paterno"
                    outlined
                    dense
                    color="blue"
                    class="rounded-field black-text-field"
                    style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                  />
                </v-col>
              </v-row>

              <!-- Segunda fila de campos -->
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="usuario.amaterno"
                    label="A. Materno"
                    outlined
                    dense
                    color="blue"
                    class="rounded-field black-text-field"
                    style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="usuario.direccion"
                    label="Dirección"
                    outlined
                    dense
                    color="blue"
                    class="rounded-field black-text-field"
                    style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                  />
                </v-col>
              </v-row>

              <!-- Tercera fila de campos -->
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="usuario.ciudad"
                    label="Ciudad"
                    outlined
                    dense
                    color="blue"
                    class="rounded-field black-text-field"
                    style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="usuario.estado"
                    label="Estado"
                    outlined
                    dense
                    color="blue"
                    class="rounded-field black-text-field"
                    style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                  />
                </v-col>
              </v-row>

              <!-- Cuarta fila de campos -->
              <v-row>
                <v-col md="6" justify="center" cols="1">
                  <v-text-field
                    v-model="usuario.telefono"
                    label="Teléfono"
                    outlined
                    dense
                    color="blue"
                    class="rounded-field black-text-field"
                    style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                  />
                </v-col>
              </v-row>

              <v-row v-if="errorMessage" class="error mt-3 text-center">
                {{ errorMessage }}
              </v-row>
            </form>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex flex-column align-center">
        <!-- Botón para crear un nuevo usuario -->
        <v-btn color="#1B262C" class="mb-3" style="border-radius: 15px; width: 369px;" @click="registrarUsuario">
          <span style="text-transform: none; color: #FFFFFF;">
            {{ inside && update ? 'Actualizar' : (inside ? 'Crear Nuevo' : '') }}
          </span>
        </v-btn>

        <!-- Botón para cancelar -->
        <v-btn color="grey" class="mb-3" style="border-radius: 15px; width: 369px;" @click="cancelar">
          <span style="text-transform: none; color: #FFFFFF;">
            Cancelar
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    inside: { type: Boolean, default: false },
    update: { type: Boolean, default: false },
    empleadoUpdate: { type: Object, default: null }
  },
  data () {
    return {
      usuario: {},
      errorMessage: ''
    }
  },
  mounted () {
    if (this.update && this.empleadoUpdate) {
      this.usuario = this.empleadoUpdate
    }
  },
  methods: {
    gotoLogin () {
      this.$router.push('/')
    },
    async registrarUsuario () {
      // Validar que los campos obligatorios estén llenos
      if (!this.usuario.nombre || !this.usuario.apaterno || !this.usuario.amaterno || !this.usuario.direccion || !this.usuario.ciudad || !this.usuario.estado || !this.usuario.telefono) {
        this.errorMessage = 'Todos los campos son obligatorios.'
        return
      }

      console.log('Datos enviados:', this.usuario)

      // Asegurar valores por defecto para campos no obligatorios
      const usuarioData = {
        nombre: this.usuario.nombre || '',
        apaterno: this.usuario.apaterno || '',
        amaterno: this.usuario.amaterno || '',
        direccion: this.usuario.direccion || '',
        ciudad: this.usuario.ciudad || '',
        estado: this.usuario.estado || '',
        telefono: this.usuario.telefono || ''
      }

      let response
      try {
        if (this.update) {
          // Llamada a la API para actualizar
          response = await this.$axios.put(`/clientes/update/${this.usuario.id}`, usuarioData)
        } else {
          // Llamada a la API para crear
          response = await this.$axios.post('/clientes/create', usuarioData)
        }
        console.log('@@@ response =>', response)
        if (response.data.success) {
          this.usuario = {}
          this.errorMessage = ''
          if (this.inside) {
            if (this.update) {
              this.$store.commit('setType', 'warning')
              this.$store.commit('setColor', 'warning')
              this.$store.commit('setMensaje', 'El usuario fue actualizado exitosamente')
              this.$store.commit('setShowAlert', true)
            } else {
              this.$store.commit('setType', 'success')
              this.$store.commit('setColor', 'green')
              this.$store.commit('setMensaje', 'El usuario fue creado exitosamente')
              this.$store.commit('setShowAlert', true)
            }
            this.$emit('guardado')
          } else {
            this.$router.push('/')
          }
        } else {
          this.errorMessage = response.data.message || 'Algo salió mal.'
          this.$store.commit('setType', 'error')
          this.$store.commit('setColor', 'red')
          this.$store.commit('setMensaje', this.errorMessage)
          this.$store.commit('setShowAlert', true)
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error)
        this.errorMessage = 'Error en la comunicación con el servidor.'
        this.$store.commit('setType', 'error')
        this.$store.commit('setColor', 'red')
        this.$store.commit('setMensaje', this.errorMessage)
        this.$store.commit('setShowAlert', true)
      }
    },
    // Función para el botón de cancelar
    cancelar () {
      this.$emit('click-cancel') // Redirige al inicio o donde desees al cancelar
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
}

.title {
  font-weight: bold;
  font-size: 1.2rem;
}

.error {
  color: #ffffff; /* Rojo vibrante para mayor visibilidad */
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
}

.rounded-field .v-input__control {
  border-radius: 50px;
}

.black-text-field .v-input__control {
  background-color: #F0F0F0 !important;
}

.black-text-field input {
  color: black !important;
}
</style>
