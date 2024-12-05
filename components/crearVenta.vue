<template>
  <v-container class="quote-container" width="1000">
    <v-card flat elevation="0" color="#FFFFFF">
      <v-card-title>
      <div class="d-flex justify-space-between align-center">
        <h1 class="title">
          {{ inside && update ? 'Actualiza la Factura' : (inside ? 'Registra Nueva Factura' : '') }}
        </h1>
      </div>
    </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="guardarVenta">
          <!-- Información general -->
          <v-row>
            <v-col cols="12" sm="4" class="d-flex align-center">
              <h4 class="mr-2">
                No. Nota
              </h4>
              <v-text-field
                v-model="numeroNota"
                label="No. Nota"
                dense
                outlined
                class="text-right"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4" class="d-flex align-center">
              <h4 class="mr-2">
                Contacto
              </h4>
              <v-select
                v-model="contactoSeleccionado"
                :items="contactos"
                item-text="nombre"
                item-value="id"
                label="Contacto"
                dense
                outlined
                required
                @change="actualizarTelefono"
              />
            </v-col>
            <v-col cols="12" sm="4" class="d-flex align-center">
              <h4 class="mr-2">
                Teléfono
              </h4>
              <v-text-field
                v-model="telefono"
                label="Teléfono"
                dense
                outlined
                disabled
                required
                readonly
              />
            </v-col>

            <v-col cols="12" sm="4" class="d-flex align-center">
              <h4 class="mr-2">
                Tipo de pago
              </h4>
              <v-select
                v-model="tipoPago"
                :items="['Contado', 'Crédito']"
                label="Tipo de pago"
                dense
                outlined
                required
              />
            </v-col>
          </v-row>

          <!-- Fechas -->
          <v-row>

            <v-col cols="12" sm="4" class="d-flex align-center">
              <h4 class="mr-2">
                Fecha
              </h4>
              <v-menu
                ref="menuFecha"
                v-model="menuInicioFecha"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="inicioFecha"
                    label="Fecha"
                    readonly
                    dense
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="inicioFecha" @input="menuInicioFecha = false" />
              </v-menu>        
            </v-col>

            <v-col cols="12" sm="3" class="d-flex align-center">
              <h4 class="mr-2">
                Término
              </h4>
              <v-menu
                ref="menuTermino"
                v-model="menuTerminoVisible"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="terminoFecha"
                    label="Término"
                    readonly
                    dense
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="terminoFecha" @input="menuTerminoVisible = false" />
              </v-menu>
            </v-col>

            <v-col cols="12" sm="4" class="d-flex align-center">
              <h4 class="mr-2">
                Fecha de Vencimiento
              </h4>
              <v-menu
                ref="menuVencimiento"
                v-model="menuVencimiento"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="fechaVencimiento"
                    label="Fecha de Vencimiento"
                    readonly
                    dense
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="fechaVencimiento"
                  @input="menuVencimiento = false"
                />
              </v-menu>
            </v-col>

          </v-row>

          <!-- Tabla de ítems -->
          <v-divider />
          <div class="mt-3">
            <div class="table-header">
              <div v-for="header in headers" :key="header.text" class="table-cell">
                {{ header.text }}
              </div>
            </div>
            <div
              v-for="(fila, index) in filas"
              :key="index"
              class="table-row"
            >
              <v-select
                v-model="fila.item"
                :items="productos"
                item-text="item"
                item-value="id"
                label="Producto"
                dense
                outlined
                class="table-cell"
                @change="actualizarPrecio(index)"
              />
              <div class="table-cell">
                {{ fila.referencia }}
              </div>
              <div class="table-cell">
                {{ fila.precio }}
              </div>
              <v-text-field
                v-model="fila.descuento"
                type="number"
                dense
                outlined
                class="table-cell"
                @input="calcularTotal(index)"
              />
              <v-text-field
                v-model="fila.impuesto"
                type="number"
                dense
                outlined
                class="table-cell"
                @input="calcularTotal(index)"
              />
              <div class="table-cell">
                {{ fila.descripcion }}
              </div>
              <v-text-field
                v-model="fila.cantidad"
                type="number"
                dense
                outlined
                class="table-cell"
                @input="calcularTotal(index)"
              />
              <div class="table-cell">
                {{ fila.total }}
              </div>
              <v-btn
                icon
                color="red"
                class="table-cell"
                @click="eliminarFila(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
            <v-btn
              class="my-3"
              color="blue"
              outlined
              @click="agregarFila"
            >
              Agregar nueva fila
            </v-btn>
          </div>

          <div class="totales-container">
            <v-row>
              <v-col cols="12" sm="4" offset-sm="8">
                <v-row>
                  <v-col>
                    <p><strong>Subtotal:</strong> {{ subtotal }}</p>
                    <p><strong>Impuestos:</strong> {{ impuestos }}</p>
                    <p><strong>Total:</strong> {{ total }}</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>

          <!-- Totales -->
          <v-divider />
          <v-row>
            <v-col cols="12" sm="4">
              <h4 class="mr-2">
                Términos y condiciones
              </h4>
              <v-textarea
                v-model="terminos"
                label="Términos y condiciones"
                dense
                outlined
              />
            </v-col>
            <v-col cols="12" sm="4">
              <h4 class="mr-2">
                Notas
              </h4>
              <v-textarea v-model="notas" label="Notas" dense outlined />
            </v-col>
            <v-col cols="12" sm="4">
              <h4 class="mr-2">
                Texto de Resolución
              </h4>
              <v-textarea
                v-model="textoResolucion"
                label="Texto de Resolución"
                dense
                outlined
              />
            </v-col>
          </v-row>

          <!-- Botones -->
          <v-divider />
          <v-row>
            <v-col cols="12" class="d-flex justify-space-between">
              <v-btn outlined color="grey" @click="cancelar">
                Cancelar
              </v-btn>
              <v-btn outlined color="grey">
                Previsualizar
              </v-btn>
              <v-btn color="blue" @click="guardarVenta">
                {{ inside && update ? 'Actualizar' : (inside ? 'Enviar y agregar pago' : '') }}
              </v-btn>
              <v-menu>
                <template #activator="{ on, attrs }">
                  <v-btn color="blue" v-bind="attrs" v-on="on">
                    Guardar
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Guardar como borrador</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Guardar y enviar por email</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    inside: { type: Boolean, default: false },
    update: { type: Boolean, default: false },
    ventaEditada: { type: Object, default: null } // Nueva propiedad para la factura a editar
  },
  data () {
    return {
      headers: [
        { text: 'Producto' },
        { text: 'Referencia' },
        { text: 'Precio' },
        { text: 'Descuento' },
        { text: 'Impuesto' },
        { text: 'Descripción' },
        { text: 'Cantidad' },
        { text: 'Total' },
        { text: 'Acciones' }
      ],
      contactos: [], // Lista de contactos obtenida desde la API
      productos: [], // Lista de productos obtenida desde la API
      filas: [
        {
          item: null,
          referencia: '',
          precio: 0,
          descuento: 0,
          impuesto: 0,
          descripcion: '',
          cantidad: 1,
          total: 0
        }
      ],
      subtotal: 0,
      impuestos: 0,
      total: 0,
      telefono: '',
      contactoSeleccionado: null,
      numeroNota: '',
      inicioFecha: '',
      terminoFecha: '',
      fechaVencimiento: '',
      menuInicioFecha: false,
      menuTerminoVisible: false,
      menuVencimiento: false,
      notas: ''
    }
  },
  watch: {
    ventaEditada(newValue) {
      if (newValue) {
        this.cargarVenta(newValue)
      }
    }
  },
  mounted () {
    this.getContactos()
      .then(() => this.getProductos())
      .then(() => {
        if (this.update && this.ventaEditada) {
          this.cargarVenta(this.ventaEditada)
        }
      })
  },
  methods: {
    async getContactos () {
      try {
        const res = await this.$axios.get('/clientes')
        if (res.data && res.data.success) {
          this.contactos = res.data.clientes
        }
      } catch (error) {
        console.error('Error al obtener los contactos:', error)
      }
    },
    async getProductos () {
      try {
        const res = await this.$axios.get('/inventarios')
        if (res.data && res.data.success) {
          this.productos = res.data.inventarios
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      }
    },
    cargarVenta (venta) {

      this.contactoSeleccionado = null
      this.telefono = ''
      this.filas = [{
        item: null,
        referencia: '',
        precio: 0,
        descuento: 0,
        impuesto: 0,
        descripcion: '',
        cantidad: 1,
        total: 0
      }]

      const contacto = this.contactos.find(c => c.nombre.trim() === venta.cliente.trim())

      if (contacto) {
        this.contactoSeleccionado = contacto.id
        this.telefono = contacto.telefono
      } 

      // Asignar datos básicos
      this.numeroNota = venta.nonota || ''
      this.tipoPago = venta.tipopago || ''
      this.inicioFecha = venta.fechainicio || ''
      this.terminoFecha = venta.fechatermino || ''
      this.fechaVencimiento = venta.fechavencimiento || ''
      this.terminos = venta.terminos || ''
      this.notas = venta.notas || ''
      this.textoResolucion = venta.resolucion || ''

      // Asignar productos a las filas
      this.filas = venta.producto.map((producto) => {
        const prod = this.productos.find(p => p.item.trim() === producto.nombreproducto.trim())
        if (prod) {
          return {
            item: prod.id,
            referencia: producto.referencia || '',
            precio: producto.precio || 0,
            descuento: producto.descuento || 0,
            impuesto: producto.impuesto || 0,
            descripcion: producto.descripcion || '',
            cantidad: producto.cantidad || 1,
            total: producto.total || 0
          }
        } 
          return {
            item: null,
            referencia: producto.referencia || '',
            precio: producto.precio || 0,
            descuento: producto.descuento || 0,
            impuesto: producto.impuesto || 0,
            descripcion: producto.descripcion || '',
            cantidad: producto.cantidad || 1,
            total: producto.total || 0
          }
      })

      // Recalcular totales
      this.calcularTotales()
    },
    agregarFila () {
      this.filas.push({
        item: null,
        referencia: '',
        precio: 0,
        descuento: 0,
        impuesto: 0,
        descripcion: '',
        cantidad: 1,
        total: 0
      })
    },
    eliminarFila (index) {
      this.filas.splice(index, 1)
      this.calcularTotales()
    },
    actualizarPrecio (index) {
      const productoSeleccionado = this.filas[index].item
      const producto = this.productos.find(prod => prod.id === productoSeleccionado)

      if (producto) {
        // Asignar los valores correctamente
        this.filas[index].precio = producto.precio
        this.filas[index].referencia = producto.ref // Asegúrate de que este campo sea correcto
        this.filas[index].descripcion = producto.descripcion // Ahora se asigna la descripcion correctamente

        // Ahora asignamos el nombre del producto al campo 'item', no el objeto completo
        this.calcularTotal(index)
      }
    },
    calcularTotal (index) {
      const fila = this.filas[index]
      const subtotal = fila.precio * fila.cantidad
      const descuento = (fila.descuento / 100) * subtotal
      const impuesto = (fila.impuesto / 100) * (subtotal - descuento)
      fila.total = subtotal - descuento + impuesto
      this.calcularTotales()
    },
    calcularTotales () {
      this.subtotal = this.filas.reduce((sum, fila) => sum + fila.total, 0)
      this.impuestos = this.filas.reduce((sum, fila) => sum + (fila.impuesto / 100) * (fila.precio * fila.cantidad), 0)
      this.total = this.subtotal + this.impuestos
    },
    guardarVenta () {
      const productos = this.filas.map((fila) => {
        const producto = this.productos.find(prod => prod.id === fila.item)
        return {
          nombreproducto: producto?.item || '',
          referencia: fila.referencia || '',
          precio: parseFloat(fila.precio) || 0,
          descuento: parseFloat(fila.descuento) || 0,
          impuesto: parseFloat(fila.impuesto) || 0,
          descripcion: fila.descripcion || '',
          cantidad: parseInt(fila.cantidad) || 0,
          total: parseFloat(fila.total) || 0
        }
      })

      const productosValidos = productos.every(p =>
    p.nombreproducto &&
    p.referencia &&
    p.precio >= 0 &&
    p.cantidad > 0 &&
    p.total >= 0
      )

      if (!productosValidos) {
        alert('Hay errores en los datos de los productos. Por favor, verifica.')
        return
      }

      const contacto = this.contactos.find(c => c.id === this.contactoSeleccionado)

      const ventaData = {
        nonota: this.numeroNota,
        cliente: contacto.nombre,
        telefono: contacto.telefono,
        tipopago: this.tipoPago,
        fechainicio: this.inicioFecha,  
        fechatermino: this.terminoFecha,
        fechavencimiento: this.fechaVencimiento,
        producto: productos,
        terminos: this.terminos,
        notas: this.notas,
        resolucion: this.textoResolucion,
        total: this.total
      }

      if (this.update) {
        // Si estamos en modo edición, actualiza la cotización
        this.$axios.put(`/ventas/update/${this.ventaEditada.id}`, ventaData)
          .then((response) => {
            if (response.data.success) {
              this.limpiarFormulario()
              this.$emit('guardado')
            } else {
              console.error(response.data.message)
            }
          })
          .catch((error) => {
            console.error('Error al actualizar la factura', error)
          })
      } else {
        // Si estamos creando una factura nueva
        this.$axios.post('/ventas/create', ventaData)
          .then((response) => {
            if (response.data.success) {
              this.limpiarFormulario()
              this.$emit('guardado')
            } else {
              console.error(response.data.message)
            }
          })
          .catch((error) => {
            console.error('Error al guardar la factura', error)
          })
      }
    },
    limpiarFormulario () {
      this.contactoSeleccionado = null
      this.numeroNota = ''
      this.tipoPago = ''
      this.inicioFecha = ''
      this.terminoFecha = ''
      this.fechaVencimiento = ''
      this.terminos = ''
      this.filas = [{
        item: null,
        referencia: '',
        precio: 0,
        descuento: 0,
        impuesto: 0,
        descripcion: '',
        cantidad: 1,
        total: 0
      }]
      this.subtotal = 0
      this.impuestos = 0
      this.total = 0
      this.textoResolucion = ''
      this.notas = ''
    },
    actualizarTelefono () {
      const contacto = this.contactos.find(c => c.id === this.contactoSeleccionado)
      this.telefono = contacto ? contacto.telefono : ''
    },
    cancelar () {
      this.$emit('click-cancel')
    }

  }
}
</script>

<style scoped>
/* Estilo para el contenedor de la tabla */
.table-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* Encabezado de la tabla */
.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr 1fr 1fr auto;
  gap: 10px;
  background-color: #3282B8;
  color: white;
  padding: 10px;
  border-radius: 15px;
  font-weight: bold;
}

/* Filas de la tabla */
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr 1fr 1fr auto;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

/* Botón de eliminar en la fila */
.table-row .delete-button {
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.table-row .delete-button:hover {
  background-color: #d62828;
}

/* Alternar colores para filas pares e impares */
.table-row:nth-child(even) {
  background-color: #f9f9f9;
}

.table-row:nth-child(odd) {
  background-color: #ffffff;
}

/* Estilo de los inputs dentro de la tabla */
.table-row input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
}

/* Botón agregar fila */
.add-row-button {
  background-color: #3282B8;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.add-row-button:hover {
  background-color: #205375;
}
</style>