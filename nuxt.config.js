import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - frontend-proyecto',
    title: 'frontend-proyecto',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/chart.js'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  target: 'static',
  // Configuración para generación estática
  generate: {
    dir: 'dist' // Esto debe coincidir con tu `output_location` en el flujo de trabajo
  },

  server: {
    port: process.env.PORT,
    host: '0.0.0.0'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // Aquí puedes agregar archivos CSS globales si los tienes
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // Aquí puedes agregar tus plugins si es necesario
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module', // ESLint para calidad de código
    '@nuxtjs/vuetify' // Vuetify para la UI
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth-next', // Autenticación para la aplicación
    '@nuxtjs/axios' // Axios para realizar peticiones HTTP
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BACKEND // La URL de tu API backend
  },

  // Configuración de autenticación
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get' }
        }
      }
    },
    redirect: {
      login: '/', // Redirección a la página de login
      logout: '/', // Redirección al logout
      home: '/dashboard' // Página a la que se redirige después del login
    }
  },

  // Configuración de Vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'], // Archivos SCSS personalizados para Vuetify
    theme: {
      dark: false, // No activar el tema oscuro por defecto
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // Aquí puedes agregar configuraciones personalizadas para el proceso de construcción
  }
}
