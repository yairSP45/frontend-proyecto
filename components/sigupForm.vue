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
                v-model="form.usuario"
                label="Usuario"
                outlined
                dense
                color="blue"
                class="rounded-field black-text-field"
                style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; width: 868px; height: 40px; margin-top: 20px;"
              />
              <v-text-field
                v-model="form.password"
                label="Password"
                type="password"
                outlined
                dense
                color="blue"
                class="rounded-field black-text-field"
                style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; width: 868px; height: 40px; margin-top: 20px;"
              />
              <v-text-field
                v-model="form.password"
                label="Confirmar Password"
                type="password"
                outlined
                dense
                color="blue"
                class="rounded-field black-text-field"
                style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; width: 868px; height: 40px; margin-top: 20px;"
              />
              <v-text-field
                v-model="form.password"
                label="Apodo"
                type="text"
                outlined
                dense
                color="blue"
                class="rounded-field black-text-field"
                style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; width: 868px; height: 40px; margin-top: 20px;"
              />
              <v-row v-if="errorMessage" class="error mt-3 text-center">
                {{ errorMessage }}
              </v-row>
            </form>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex flex-column align-center">
        <v-btn color="#1B262C" class="mb-3" style="border-radius: 15px; width: 369px;" width="100%" @click="gotoSignUp">
          <span style="text-transform: none; color: #FFFFFF;" @click="gotoSignUp">
            Registrate
          </span>
        </v-btn>

        <p class="text-center mt-4">
          <a href="/" style="color: #3C2F3D; text-decoration: underline;">
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

  .black-text-field .v-input__control {
    background-color: #F0F0F0 !important;
  }

  .black-text-field input {
    color: black !important;
  }
  </style>
