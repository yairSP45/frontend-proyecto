<template>
  <div class="right-panel" style="display: flex; flex-direction: column; padding: 20px; background-color: #f9f9f9; border-radius: 8px; height: 100vh; box-sizing: border-box;">
    <div class="container" style="height: 100%; overflow: hidden;">
      <h2 style="font-size: 32px; color: #1B262C; margin: 0; padding-bottom: 20px;">
        Clientes
      </h2>
      <div style="display: flex; justify-content: flex-end; margin-bottom: 10px;">
        <v-btn color="#3282B8" class="add-button" style="background-color: #3282B8; color: white; border-radius: 10px;" @click="dialogCreate = true">
          <v-icon left>
            mdi-account-plus
          </v-icon>
          <span style="text-transform: none;">Agregar nuevo Contacto</span>
        </v-btn>
      </div>
      <!-- Tabla personalizada -->
      <div style="background-color: white; border-radius: 8px;">
        <!-- Encabezado de la tabla -->
        <div style="display: flex; background-color: #3282B8; color: white; padding: 10px; border-radius: 15px; margin: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2)">
          <div v-for="header in headers" :key="header.text" style="flex: 1; text-align: center; font-weight: bold;">
            {{ header.text }}
          </div>
        </div>
        <!-- Filas de datos -->
        <div v-for="item in empleados" :key="item.nombre" style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #ddd; color: black; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2)">
          <div style="display: flex; text-align: center;">
            <div v-for="header in headers" :key="header.value" style="flex: 1;">
              <!-- Acciones específicas -->
              <div v-if="header.text === 'Acciones'">
                <v-tooltip bottom color="green">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      color="#EBD50F"
                      v-bind="attrs"
                      @click="update(item)"
                      v-on="on"
                    >
                      <v-icon>mdi-account-box-edit-outline</v-icon>
                    </v-btn>
                  </template>
                  <span> Actualiza al empleado: {{ item.nombre }}</span>
                </v-tooltip>
                <v-tooltip bottom color="red">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      color="#FF7657"
                      v-bind="attrs"
                      @click="deleteEmpleado(item.nombre)"
                      v-on="on"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span> Borra al empleado: {{ item.nombre }}</span>
                </v-tooltip>
              </div>
              <!-- Mostrar valores normales -->
              <div v-else>
                {{ item[header.value] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <crearContacto />
  </div>
</template>

<script>
import crearContacto from './crearContacto.vue'
export default {
  components: {
    crearContacto
  },
  data () {
    return {
      empleados: [
        {
          nombre: 'Víctor Manuel',
          apaterno: 'López',
          amaterno: 'Hernández',
          direccion: 'Calle Falsa 123',
          ciudad: 'Guadalajara',
          estado: 'Jalisco',
          telefono: '314502365'
        },
        {
          nombre: 'Víctor Manuel',
          apaterno: 'López',
          amaterno: 'Hernández',
          direccion: 'Calle Falsa 123',
          ciudad: 'Guadalajara',
          estado: 'Jalisco',
          telefono: '314502365'
        }
      ],
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'A. Paterno', value: 'apaterno' },
        { text: 'A. Materno', value: 'amaterno' },
        { text: 'Dirección', value: 'direccion' },
        { text: 'Ciudad', value: 'ciudad' },
        { text: 'Estado', value: 'estado' },
        { text: 'Teléfono', value: 'telefono' },
        { text: 'Acciones', value: 'acciones' }
      ],
      dialogCreate: false,
      dialogUpdate: false,
      dialogBorrar: false,
      empleadoActualizar: {}
    }
  },
  methods: {
    update (item) {
      this.empleadoActualizar = item
      this.dialogUpdate = true
    },
    deleteEmpleado (id) {
      this.empleados = this.empleados.filter(empleado => empleado.nombre !== id)
      this.dialogBorrar = false
    }
  }
}
</script>
