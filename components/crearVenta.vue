<template>
  <v-container fill-height fluid class="login-container">
    <v-card flat elevation="0" width="600" color="#FFFFFF">
      <v-card-title>
        <p class="title" style="width: 100%; color: #000000; justify-content: left;">
          {{ inside && update ? 'Actualiza la Venta' : (inside ? 'Registrar Nueva Venta' : '') }}
        </p>
      </v-card-title>
      <v-card-text style="color: #000000; justify-content: center; display: flex; flex-direction: column; height: 100%;">
        <v-row justify="center" align="center">
          <v-col>
            <form @submit.prevent="registrarVenta">
              <!-- Primera fila de campos -->
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="venta.item"
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
                    :value="venta.ref"
                    label="Referencia (Automática)"
                    outlined
                    dense
                    color="blue"
                    class="rounded-field black-text-field"
                    style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                    readonly
                  />
                </v-col>
              </v-row>

              <!-- Segunda fila de campos -->
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="venta.precio"
                    label="Precio"
                    outlined
                    dense
                    color="blue"
                    class="rounded-field black-text-field"
                    style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                    @input="calcularTotal"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="venta.descripcion"
                    label="Descripcion"
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
                  <v-select
                    v-model="venta.cantidad"
                    :items="cantidades"
                    label="Cantidad"
                    outlined
                    dense
                    color="blue"
                    class="rounded-field black-text-field"
                    style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                    @change="calcularTotal"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :value="venta.total"
                    label="Total (Automático)"
                    outlined
                    dense
                    color="blue"
                    class="rounded-field black-text-field"
                    style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                    readonly
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
        <!-- Botón para crear nueva venta -->
        <v-btn color="#1B262C" class="mb-3" style="border-radius: 15px; width: 369px;" @click="registrarVenta">
          <span style="text-transform: none; color: #FFFFFF;">
            {{ inside && update ? 'Actualizar' : (inside ? 'Crear Nueva' : '') }}
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
    ventaUpdate: { type: Object, default: null } // Datos del registro a editar
  },
  data () {
    return {
      venta: {
        item: '',
        ref: Math.floor(Math.random() * 1000), // Generar referencia por defecto
        precio: '',
        descripcion: '',
        cantidad: null,
        total: ''
      },
      errorMessage: '',
      cantidades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  watch: {
    // Si se actualizan las propiedades externas, reiniciamos el formulario
    ventaUpdate: {
      immediate: true,
      handler (newValue) {
        if (newValue && this.update) {
          this.venta = { ...newValue }
        }
      }
    },
    update: {
      immediate: true,
      handler (isUpdate) {
        if (!isUpdate) {
          this.limpiarFormulario()
        }
      }
    }
  },
  mounted () {
    this.inicializarFormulario()
  },
  methods: {
    inicializarFormulario () {
      if (this.update && this.ventaUpdate) {
        // Cargar datos existentes para edición
        this.venta = { ...this.ventaUpdate }
      } else {
        // Limpieza para nuevo registro
        this.limpiarFormulario()
      }
    },
    limpiarFormulario () {
      this.venta = {
        item: '',
        ref: Math.floor(Math.random() * 1000), // Generar nueva referencia
        precio: '',
        descripcion: '',
        cantidad: null,
        total: ''
      }
      this.errorMessage = ''
    },
    calcularTotal () {
      const precio = parseFloat(this.venta.precio) || 0
      const cantidad = parseInt(this.venta.cantidad) || 0
      this.venta.total = precio * cantidad
    },
    async registrarVenta () {
      if (
        !this.venta.item ||
        !this.venta.ref ||
        !this.venta.precio ||
        !this.venta.descripcion ||
        !this.venta.cantidad ||
        !this.venta.total
      ) {
        this.errorMessage = 'Todos los campos son obligatorios.'
        return
      }
      try {
        let response
        if (this.update) {
          // Actualizar registro existente
          response = await this.$axios.put(
            `/ventas/update/${this.venta.id}`,
            this.venta
          )
        } else {
          // Crear nuevo registro
          response = await this.$axios.post('/ventas/create', this.venta)
        }
        if (response.data.success) {
          this.$emit('guardado')
          this.limpiarFormulario()
        } else {
          this.errorMessage = response.data.message || 'Error al guardar.'
        }
      } catch (error) {
        this.errorMessage = 'Error en la comunicación con el servidor.'
        console.error(error)
      }
    },
    cancelar () {
      this.$emit('click-cancel')
      this.limpiarFormulario()
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
