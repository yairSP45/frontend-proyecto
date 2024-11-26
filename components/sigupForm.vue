<template>
  <v-container fill-height fluid class="login-container">
    <v-card flat elevation="0" width="1216" color="#FFFFFF" class="mx-auto mt-10">
      <v-card-title>
        <p class="title" style="width: 100%; color: #000000; justify-content: left;">
          Registrate
        </p>
      </v-card-title>
      <v-card-text style="color: #000000; justify-content: center;">
        <v-row justify="center" align="center">
          <v-col cols="12" md="8" lg="6">
            <form @submit.prevent="login">
              <v-text-field
                v-model="usuario.usuario"
                label="Usuario"
                outlined
                dense
                color="blue"
                class="rounded-field black-text-field"
                style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; width: 868px; height: 40px; margin-top: 20px;"
              />
              <v-text-field
                v-model="usuario.password"
                label="Password"
                type="password"
                outlined
                dense
                color="blue"
                class="rounded-field black-text-field"
                style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; width: 868px; height: 40px; margin-top: 20px;"
              />
              <v-text-field
                v-model="confirmPassword"
                label="Confirmar Password"
                type="password"
                outlined
                dense
                color="blue"
                class="rounded-field black-text-field"
                style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; width: 868px; height: 40px; margin-top: 20px;"
              />
              <v-text-field
                v-model="usuario.apodo"
                label="Apodo"
                type="text"
                outlined
                dense
                color="blue"
                class="rounded-field black-text-field"
                style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; width: 868px; height: 40px; margin-top: 20px;"
              />
              <v-combobox
                v-model="usuario.rol"
                :items="['Admin', 'Compras']"
                label="Rol"
                outlined
                dense
                color="blue"
                class="rounded-field black-text-field"
                style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; width: 868px; height: 40px; margin-top: 20px;"
              />
            </form>
          </v-col>
        </v-row>
        <v-row v-if="errorMessage" class="error mt-3 text-center">
          {{ errorMessage }}
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex flex-column align-center">
        <v-btn color="#1B262C" class="mb-3" style="border-radius: 15px; width: 369px;" width="100%" @click="registrarUsuario">
          <span style="text-transform: none; color: #FFFFFF;">
            Registrate
          </span>
        </v-btn>

        <p class="text-center mt-4">
          <a style="color: #3C2F3D; text-decoration: underline;" @click="gotoLogin">
            ¿Tienes cuenta? Inicia sesión
          </a>
        </p>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      usuario: {},
      confirmPassword: ''
    }
  },
  methods: {
    async login () {
      try {
        const res = await this.$auth.loginWith('local', {
          data: this.form
        })
        if (res && res.data && res.data.token) {
          this.$router.push('/dashboard')
        }
      } catch (error) {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.'
      }
    },
    gotoLogin () {
      this.$router.push('/')
    },
    async registrarUsuario () {
      // Validar que todos los campos estén completos
      if (!this.usuario.usuario || !this.usuario.password || !this.confirmPassword || !this.usuario.apodo || !this.usuario.rol) {
        this.errorMessage = 'Todos los campos son obligatorios.'
        return
      }

      // Validar que las contraseñas coincidan
      if (this.usuario.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden.'
        return
      }

      console.log('Datos enviados al backend:', this.usuario)

      try {
        const response = await this.$axios.post('/empleados/create', this.usuario)
        if (response.data.success) {
          this.$router.push('/') // Redirige a la página principal o a donde desees
        } else {
          this.errorMessage = 'Error al registrar el usuario.'
        }
      } catch (error) {
        this.errorMessage = 'Ocurrió un error al registrar el usuario.'
        console.error(error)
      }
    }

  }
}
</script>

  <style scoped>
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
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
