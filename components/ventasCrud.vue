<template>
  <div class="right-panel" style="display: flex; flex-direction: column; padding: 20px; background-color: #f9f9f9; border-radius: 8px; height: 100vh; box-sizing: border-box;">
    <div class="container" style="height: 100%; overflow: hidden;">
      <h2 style="font-size: 32px; color: #1B262C; margin: 0; padding-bottom: 20px;">
        {{ pageTitle }}
      </h2>
      <div style="display: flex; justify-content: flex-end; margin-bottom: 10px;">
        <v-select
          v-model="selectedOption"
          :items="options"
          hide-details
          outlined
          dense
          style="flex-shrink: 0; width: 200px; background-color: white; border-radius: 10px;"
          @change="navigateTo"
        />
        <v-btn color="#3282B8" class="add-button" style="background-color: #3282B8; color: white; border-radius: 10px; margin-left: 10px;" @click="crear">
          <v-icon left>
            mdi-account-plus
          </v-icon>
          <span style="text-transform: none;">{{ buttonText }}</span>
        </v-btn>
      </div>

      <!-- Tabla personalizada -->
      <div style="background-color: white; border-radius: 8px;">
        <div style="display: flex; background-color: #3282B8; color: white; padding: 10px; border-radius: 15px; margin: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2)">
          <div v-for="header in headers" :key="header.text" style="flex: 1; text-align: center; font-weight: bold;">
            {{ header.text }}
          </div>
        </div>
        <div v-for="item in items" :key="item.id" style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #ddd; color: black; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2)">
          <div style="display: flex; text-align: center;">
            <div v-for="header in headers" :key="header.value" style="flex: 1;">
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
                  <span> Actualiza: {{ item.numeronota }}</span>
                </v-tooltip>

                <v-tooltip bottom color="red">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      color="#FF7657"
                      v-bind="attrs"
                      @click="deleteCotizacion(item.id)"
                      v-on="on"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span> Borra: {{ item.numeronota }}</span>
                </v-tooltip>
              </div>
              <div v-else>
                {{ item[header.value] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialogBorrar" width="400" persistent>
      <v-card flat elevation="1" class="rounded-lg" color="#FFFFFF">
        <v-card-title style="background-color: #BBE1FA; border-bottom: 1px solid #DADADA;">
          <p class="title" style="width: 100%; color: #333333; justify-content: left; font-size: 22px; font-weight: bold;">
            Borrar Venta
          </p>
        </v-card-title>
        <v-card-text style="color: #555555; display: flex; flex-direction: column; font-size: 18px; padding: 16px;">
          <v-divider class="my-2" />
          <v-row align="center" justify="center" class="pa-2">
            ¿Estás seguro? Vas a borrar la venta.
          </v-row>
          <v-divider class="my-2" />
        </v-card-text>
        <v-card-actions class="d-flex flex-column align-center" style="padding: 16px;">
          <v-row justify="space-between" style="width: 100%;">
            <v-col cols="6">
              <v-btn color="#EBD50F" block style="border-radius: 10px;" @click="dialogBorrar = false">
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="#FF7657" block style="border-radius: 10px;" @click="borralo">
                Borrar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogCreateVentas" width="1000" persistent>
      <crearVenta :inside="true" @click-cancel="dialogCreateVentas = false" @guardado="ventasGuardado" />
    </v-dialog>

    <v-dialog v-model="dialogUpdateVentas" width="1000" persistent>
      <crearVenta
        :inside="true"
        :update="true"
        :venta-update="ventaActualizar"
        @click-cancel="dialogUpdateVentas = false"
        @guardado="ventasGuardado"
      />
    </v-dialog>
    <v-dialog v-model="dialogCreateCotizacion" width="1000" persistent>
      <crear-cotizacion
        :inside="true"
        @click-cancel="dialogCreateCotizacion = false"
        @guardado="cotizacionGuardada"
      />
    </v-dialog>
    <v-dialog v-model="dialogUpdateCotizacion" width="1000" persistent>
      <crear-cotizacion
        :inside="true"
        :update="true"
        :cotizacion-editada="cotizacionActualizar"
        @click-cancel="dialogUpdateCotizacion = false"
        @guardado="cotizacionGuardada"
      />
    </v-dialog>
    <v-dialog v-model="dialogCreateFacturaRecurrente" width="1200" persistent>
      <crear-factura-recurrente :inside="true" @click-cancel="dialogCreateFacturaRecurrente = false" />
    </v-dialog>
  </div>
</template>

<script>
import crearVenta from './crearVenta.vue'
import CrearCotizacion from './crearCotizacion.vue'
import CrearFacturaRecurrente from './crearFacturaRecurrente.vue'

export default {
  components: {
    crearVenta,
    CrearCotizacion,
    CrearFacturaRecurrente
  },
  data () {
    return {
      pageTitle: 'Ventas',
      options: ['Ventas', 'Facturas Recurrentes', 'Cotización'],
      selectedOption: 'Ventas',
      items: [],
      headers: [],
      buttonText: 'Nueva Venta',
      idBorrar: null,
      dialogCreateVentas: false,
      dialogCreateCotizacion: false,
      dialogUpdateVentas: false,
      dialogUpdateCotizacion: false,
      dialogCreateFacturaRecurrente: false,
      dialogBorrar: false,
      ventaActualizar: {},
      cotizacionActualizar: {},
      clientes: {}
    }
  },
  mounted () {
    this.navigateTo()
    this.getData()
    this.getClientes()
  },
  methods: {
    navigateTo () {
      const option = this.selectedOption
      if (option === 'Ventas') {
        this.headers = [
          { text: 'Item', value: 'item' },
          { text: 'Referencia', value: 'ref' },
          { text: 'Precio', value: 'precio' },
          { text: 'Descripción', value: 'descripcion' },
          { text: 'Cantidad', value: 'cantidad' },
          { text: 'Total', value: 'total' },
          { text: 'Acciones', value: 'acciones' }
        ]
        this.buttonText = 'Nueva Factura'
        this.pageTitle = 'Ventas'
        this.getData()
      } else if (option === 'Cotización') {
        this.headers = [
          { text: 'Número de nota', value: 'numeronota' },
          { text: 'Cliente', value: 'cliente' },
          { text: 'Creación', value: 'creacion' },
          { text: 'Vencimiento', value: 'vencimiento' },
          { text: 'Estado', value: 'estado' },
          { text: 'Total', value: 'total' },
          { text: 'Acciones', value: 'acciones' }
        ]
        this.buttonText = 'Nueva Cotización'
        this.pageTitle = 'Cotización'
        this.getData()
      } else if (option === 'Facturas Recurrentes') {
        this.headers = [
          { text: 'Número', value: 'numero' },
          { text: 'Cliente', value: 'cliente' },
          { text: 'Periodo', value: 'periodo' },
          { text: 'Monto', value: 'monto' },
          { text: 'Estado', value: 'estado' },
          { text: 'Acciones', value: 'acciones' }
        ]
        this.buttonText = 'Nueva Factura'
        this.pageTitle = 'Facturas Recurrentes'
      }
    },
    // Función para obtener la ruta dinámica
    getApiEndpoint () {
      if (this.selectedOption === 'Ventas') {
        return '/ventas'
      } else if (this.selectedOption === 'Cotización') {
        return '/cotizaciones'
      } else if (this.selectedOption === 'Facturas Recurrentes') {
        return '/facturas-recurrentes'
      }
      return '/ventas' // Ruta por defecto si no coincide ninguna
    },
    async getClientes () {
      try {
        const res = await this.$axios.get('/clientes')
        if (res && res.data && res.data.success) {
          this.clientes = res.data.clientes.reduce((map, cliente) => {
            map[cliente.id] = cliente.nombre // Asumiendo { id, nombre } en cada cliente
            return map
          }, {})
        }
      } catch (error) {
        console.error('Error al cargar clientes:', error)
      }
    },
    // Reutiliza esta función para todas las categorías
    async getData () {
      const endpoint = this.getApiEndpoint()
      try {
        const res = await this.$axios.get(endpoint)
        if (res && res.data && res.data.success) {
          // Asigna la propiedad correspondiente según la opción seleccionada
          if (this.selectedOption === 'Ventas') {
            this.items = res.data.ventas || [] // Limpia y asigna las ventas
          } else if (this.selectedOption === 'Cotización') {
            // Modificación aquí: Mapea las cotizaciones correctamente
            this.items = res.data.cotizaciones || []
            // Puedes agregar más transformaciones si lo necesitas
            // Limpia y asigna las cotizaciones
          } else if (this.selectedOption === 'Facturas Recurrentes') {
            this.items = res.data.facturas || [] // Limpia y asigna las facturas
          }
        } else {
          this.items = [] // Si la respuesta no tiene éxito, limpia la tabla
        }
      } catch (error) {
        console.error(`Error al obtener datos desde ${endpoint}:`, error)
        this.items = [] // Limpia la tabla en caso de error
      }
    },
    async borralo () {
      const endpoint = this.getApiEndpoint()
      try {
        const borrado = await this.$axios.delete(`${endpoint}/delete/${this.idBorrar}`)
        if (borrado && borrado.data && borrado.data.success) {
          await this.getData()
        }
        this.dialogBorrar = false
      } catch (error) {
        console.error('Error al borrar:', error)
      }
    },
    crear () {
      this.dialogCreateVentas = false
      this.dialogCreateCotizacion = false
      this.dialogCreateFacturaRecurrente = false
      if (this.selectedOption === 'Ventas') {
        this.dialogCreateVentas = true
      } else if (this.selectedOption === 'Cotización') {
        this.dialogCreateCotizacion = true
      } else if (this.selectedOption === 'Facturas Recurrentes') {
      // Aquí puedes agregar lógica para abrir el modal correspondiente
        this.dialogCreateFacturaRecurrente = true
      }
    },
    update (item) {
      this.dialogUpdateVentas = false
      this.dialogUpdateCotizacion = false
      const option = this.selectedOption
      if (option === 'Ventas') {
        this.ventaActualizar = item
        this.dialogUpdateVentas = true
        this.dialogUpdateCotizacion = false
      } else if (option === 'Cotización') {
        this.updateCotizacion(item)
      } else if (option === 'Facturas Recurrentes') {
        console.log('Actualizar Factura Recurrente:', item)
      }
    },
    ventasGuardado () {
      this.getData()
      this.dialogCreateVentas = false
      this.dialogUpdateVentas = false
    },
    deleteVenta (id) {
      this.idBorrar = id
      this.dialogBorrar = true
    },
    cotizacionGuardada () {
      this.getData()
      this.dialogCreateCotizacion = false
      this.dialogUpdateCotizacion = false
    },
    updateCotizacion (items) {
      if (items) {
        this.cotizacionActualizar = items // Asignar la cotización seleccionada
        this.contactoSeleccionado = items.contacto || '' // Asignar el contacto, si existe
        this.telefono = items.telefono || '' // Asignar el teléfono, si existe
        this.numeroNota = items.numero_nota || '' // Asignar el número de la nota, si existe
        this.fecha = items.fecha || '' // Asignar la fecha, si existe
        this.fechaVencimiento = items.fecha_vencimiento || '' // Asignar la fecha de vencimiento, si existe
        this.filas = items.items || [] // Asignar las filas de la tabla (productos), si existen
        this.notas = items.notas || '' // Asignar las notas, si existen

        this.dialogUpdateCotizacion = true // Abrir el modal de edición
      } else {
        console.error('No se proporcionaron datos válidos para la cotización')
      }
    },

    deleteCotizacion (id) {
      this.idBorrar = id
      this.dialogBorrar = true // Abre el modal de confirmación de borrado
    },
    // Función para actualizar el teléfono cuando se cambia el contacto
    actualizarTelefono () {
      const contacto = this.contactos.find(c => c.id === this.contactoSeleccionado)
      if (contacto) {
        this.telefono = contacto.telefono
      }
    },
    async getInventarios () {
      try {
        const res = await this.$axios.get('/inventarios')
        if (res && res.data && res.data.success) {
          this.inventarios = res.data.inventarios || [] // Asignar los inventarios, o un array vacío si no hay inventarios
        } else {
          this.inventarios = [] // En caso de que no haya éxito, aseguramos que el array esté vacío
        }
      } catch (error) {
        console.error('Error al obtener inventarios:', error)
        this.inventarios = [] // Aseguramos que se limpie en caso de error
      } // Esto te ayudará a revisar la respuesta en la consola
    }

  }

}
</script>
