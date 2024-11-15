<template>
  <v-container fill-height fluid class="login-container">
    <v-card flat elevation="0" width="450" color="#FFFFFF" class="mx-auto mt-10">
      <v-card-title>
        <p class="text-center title" style="width: 100%; color: #000000;">
          ¡Inicia sesión para tener acceso a tus datos más recientes!
        </p>
      </v-card-title>
      <v-card-text style="color: #000000;">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <form @submit.prevent="login">
              <v-text-field
                v-model="form.usuario"
                label="Usuario"
                outlined
                dense
                color="blue"
                class="rounded-field black-text-field"
                style="border-radius: 15px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; width: 369px; height: 40px; margin: 10px;"
              />
              <v-text-field
                v-model="form.password"
                label="Password"
                type="password"
                outlined
                dense
                color="blue"
                class="rounded-field black-text-field"
                style="border-radius: 15px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; width: 369px; height: 40px; margin: 10px"
              />
              <v-row v-if="errorMessage" class="error mt-3 text-center">
                {{ errorMessage }}
              </v-row>
            </form>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex flex-column align-center">
        <v-btn color="#0F4C75" class="mb-3" style="border-radius: 15px; width: 369px;" width="100%" @click="login">
          <span style="text-transform: none; color: #FFFFFF">
            Iniciar Sesión
          </span>
        </v-btn>

        <v-btn color="#6C48C5" class="mb-3" style="border-radius: 15px; width: 369px;" width="100%" @click="gotoSignUp">
          <span style="text-transform: none; color: #FFFFFF;" @click="gotoSignUp">
            Registrate
          </span>
        </v-btn>

        <p class="text-center mt-4">
          <a href="/forgot-password" style="color: #6C48C5; text-decoration: underline;">
            ¿Olvidaste la contraseña?
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
      form: {
        usuario: '',
        password: ''
      },
      errorMessage: ''
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
    gotoSignUp () {
      this.$router.push('/signup')
    }
  }
}
</script>

  <style scoped>
  .login-container {
    background-color: #3282B8;
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
    color: red;
    font-weight: bold;
  }

  .rounded-field .v-input__control {
    border-radius: 50px;
  }

  /* Estilo personalizado para el fondo y el texto de los text fields */
  .black-text-field .v-input__control .v-input__slot {
    background-color: black !important;
    color: black !important;
  }

  .black-text-field input {
    color: black !important;
  }
  </style>
