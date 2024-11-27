<template>
  <div class="right-panel" style="display: flex; flex-direction: column; padding: 20px; background-color: #f9f9f9; border-radius: 8px; height: 100vh; box-sizing: border-box;">
    <div class="container" style="height: 100%; overflow: hidden;">
      <h2 style="font-size: 32px; color: #1B262C; margin: 0; padding-bottom: 20px;">
        Ventas
      </h2>
      <div style="display: flex; justify-content: flex-end; margin-bottom: 10px;">
        <v-btn color="#3282B8" class="add-button" style="background-color: #3282B8; color: white; border-radius: 10px;" @click="dialogCreate = true">
          <v-icon left>
            mdi-account-plus
          </v-icon>
          <span style="text-transform: none;">Nueva Venta</span>
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
        <div v-for="item in ventas" :key="item.item" style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #ddd; color: black; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2)">
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
                  <span> Actualiza Venta: {{ item.item }}</span>
                </v-tooltip>
                <v-tooltip bottom color="red">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      color="#FF7657"
                      v-bind="attrs"
                      @click="deleteVenta(item.id)"
                      v-on="on"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span> Borra Venta: {{ item.item }}</span>
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
    <v-dialog
      v-model="dialogBorrar"
      width="400"
      persistent
    >
      <v-card flat elevation="1" class="rounded-lg" color="#FFFFFF">
        <!-- Título del diálogo -->
        <v-card-title style="background-color: #BBE1FA; border-bottom: 1px solid #DADADA;">
          <p class="title" style="width: 100%; color: #333333; justify-content: left; font-size: 22px; font-weight: bold;">
            Borrar Venta
          </p>
        </v-card-title>

        <!-- Texto del contenido -->
        <v-card-text style="color: #555555; display: flex; flex-direction: column; font-size: 18px; padding: 16px;">
          <v-divider class="my-2" />
          <v-row align="center" justify="center" class="pa-2">
            ¿Estás seguro?
          </v-row>
          <v-row align="center" justify="center" class="pa-2">
            <span>Vas a borrar la Venta.</span>
          </v-row>
          <v-divider class="my-2" />
        </v-card-text>
        <!-- Botones de acción -->
        <v-card-actions class="d-flex flex-column align-center" style="padding: 16px;">
          <v-row justify="space-between" style="width: 100%;">
            <v-col cols="6">
              <v-btn
                color="#EBD50F"
                block
                class="mb-3"
                style="border-radius: 10px; font-size: 16px; text-transform: none;"
                @click="dialogBorrar = false"
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="#FF7657"
                block
                class="mb-3"
                style="border-radius: 10px; font-size: 16px; text-transform: none;"
                @click="borralo"
              >
                Borrar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogCreate"
      width="600"
      persistent
    >
      <crearVenta
        :inside="true"
        @click-cancel="dialogCreate = false"
        @guardado="ventasGuardado"
      />
    </v-dialog>
    <v-dialog
      v-model="dialogUpdate"
      width="600"
      persistent
    >
      <crearVenta
        :inside="true"
        :update="true"
        :venta-update="ventaActualizar"
        @click-cancel="dialogUpdate = false"
        @guardado="ventasGuardado"
      />
    </v-dialog>
  </div>
</template>

<script>
import crearVenta from './crearVenta.vue'
export default {
  components: {
    crearVenta
  },
  data () {
    return {
      ventas: [],
      headers: [
        { text: 'Item', value: 'item' },
        { text: 'Referencia', value: 'ref' },
        { text: 'Precio', value: 'precio' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Total', value: 'total' },
        { text: 'Acciones', value: 'acciones' }
      ],
      idBorrar: null,
      dialogCreate: false,
      dialogBorrar: false,
      dialogUpdate: false,
      ventaActualizar: {}
    }
  },
  mounted () {
    this.getVentas()
  },
  methods: {
    update (item) {
      this.ventaActualizar = item
      this.dialogUpdate = true
    },
    deleteVenta (id) {
      this.idBorrar = id
      this.dialogBorrar = true
    },
    async borralo () {
      const borrado = await this.$axios.delete(`/ventas/delete/${this.idBorrar}`)
      if (borrado && borrado.data && borrado.data.success) {
        await this.getVentas()
      }
      console.log('@@@ borrado =>', borrado)
      this.dialogBorrar = false
    },
    async getVentas () {
      const res = await this.$axios.get('/ventas')
      if (res && res.data && res.data.success) {
        this.ventas = []
        this.ventas = res.data.ventas
      }
      console.log('@@@ res =>', res)
    },
    ventasGuardado () {
      this.getVentas()
      this.dialogCreate = false
      this.dialogUpdate = false
    }
  }
}
</script>