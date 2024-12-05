<template>
  <div>
    <!-- Cabecera del Facturador -->
    <div class="container-header">
      <v-toolbar-title class="header-title">
        Facturador
      </v-toolbar-title>
      <v-spacer />
    </div>

    <!-- Resto del contenido -->
    <div class="facturador-layout">
      <div style="margin: 20px;">
        <div class="panel">
          <!-- Panel de productos -->
          <div class="panel-productos">
            <div class="toolbar">
              <div class="icon-container" style="background-color: #3282B8; width: 74px; height: 47px; display: flex; justify-content: center; align-items: center; border-radius: 4px;">
                <button class="icon-button">
                  <i class="mdi mdi-magnify" style="font-size: 18.71px; width: 18.71px;" />
                </button>
              </div>
              <input type="text" class="input-busqueda" placeholder="PRODUCTOS" style="height: 47px;">
              <div class="icon-container" style="width: 74px; height: 47px; margin-left: 50px;">
                <button class="agregar-button">
                  <i class="mdi mdi-file-plus-outline" style="font-size: 35px; width: 28px;" /> Agregar
                </button>
              </div>
            </div>
            <ul class="lista-productos">
              <li
                v-for="product in products"
                :key="product.id"
                class="producto-item"
                :style="{
                  marginBottom: '15px',
                  padding: '10px',
                  borderBottom: '1px solid #ddd',
                  color: 'black',
                  borderRadius: '15px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  backgroundColor: selectedProduct === product.id ? '#BBE1FA' : 'transparent'
                }"
                @click="selectProduct(product)"
              >
                <div class="producto-info">
                  <span class="producto-codigo">{{ product.ref }}</span>
                </div>
                <div>
                  <span class="producto-nombre">{{ product.item }}</span>
                </div>
                <div class="producto-precio">
                  ${{ product.precio.toLocaleString() }}
                </div>
                <button class="icon-button" style="color: #C4C4C4;" @click="addToCart(product)">
                  <i class="mdi mdi-star-outline" />
                </button>
              </li>
            </ul>
          </div>

          <!-- Panel de ventas -->
          <div class="panel-ventas">
            <div class="container" style="width: 569px; height: 68px; background-color: #3282B8; color: white; display: flex; justify-content: center; align-items: center; text-align: center;">
              Ventas
            </div>
            <div class="container" style="width: 569px; height: 68px; background-color: white; color: white; display: flex; justify-content: center; align-items: center; text-align: center;">
              <div class="toolbar" style="width: 100%; display: flex; align-items: center;">
                <div>
                  <v-autocomplete
                    v-model="selectedClient"
                    :items="clientes"
                    item-text="fullName"
                    item-value="id"
                    label="Selecciona un cliente"
                    placeholder="Clientes"
                    style="width: 373px; height: 50px; margin-left: 30px;"
                    outlined
                  />
                </div>
                <div class="icon-container" style="width: 74px; height: 47px; margin-right: 10px;">
                  <button class="agregar-button">
                    <i class="mdi mdi-file-plus-outline" style="font-size: 25px; width: 25px;" /> Agregar
                  </button>
                </div>
              </div>
            </div>
            <div style="width: 100%; height: 3px; background-color: #C4C4C4; margin-top: 10px;" />
            <ul class="lista-ventas">
              <li v-for="item in cart" :key="item.id" class="venta-item">
                <!-- Nombre del producto y precio -->
                <div class="venta-item-info">
                  <span class="producto-nombre">{{ item.item }}</span>
                  <div class="producto-info">
                    <span class="producto-precio" style="margin-right: 50px;">${{ item.precio.toLocaleString() }}</span>
                    <span class="producto-codigo">{{ item.ref }}</span>
                  </div>
                </div>

                <!-- Código del producto (puedes ocultarlo si no lo necesitas) -->

                <!-- Control de cantidad -->
                <div class="cantidad-control">
                  <button class="cantidad-btn" @click="updateQuantity(item, -1)">
                    <span class="mdi mdi-minus-thick" />
                  </button>
                  <span class="cantidad">{{ item.quantity }}</span>
                  <button class="cantidad-btn" @click="updateQuantity(item, 1)">
                    <span class="mdi mdi-hospital" />
                  </button>
                </div>

                <!-- Precio total por producto -->
                <span class="total-producto">${{ (item.precio * item.quantity).toLocaleString() }}</span>

                <!-- Botón de eliminar -->
                <button class="eliminar-btn" @click="removeFromCart(item)">
                  <i class="mdi mdi-delete" />
                </button>
              </li>
            </ul>

            <div class="container" style="height: 300px;" />
            <div style="width: 569px;">
              <button
                class="vendido-button"
                style="display: flex; justify-content: space-between; align-items: center; padding: 0 15px;"
                @click="validarVenta"
              >
                <span>Vendido</span>
                <span>${{ total.toLocaleString() }}</span>
              </button>
            </div>
            <div style="width: 569px;">
              <button
                class="cancelar-button"
                style="display: flex; justify-content: flex-end; align-items: center; gap: 8px;"
                @click="cancelSale"
              >
                <div style="margin-right: 8px;">
                  CANCELAR ACTUAL
                </div>
                <i class="mdi mdi-delete" style="font-size: 18px;" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialogCreateFactura" width="1000" persistent>
      <factura-archivo
        :inside="true"
        :factura-lista="facturaEnviar"
        @click-cancel="dialogCreateFactura = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import facturaArchivo from './facturaArchivo.vue'
export default {
  components: { facturaArchivo },
  data () {
    return {
      products: [],
      cart: [],
      clientes: [],
      selectedClient: null, // Debe contener el objeto completo del cliente
      selectedProduct: null,
      dialogCreateFactura: false,
      facturaEnviar: {}
    }
  },
  computed: {
    total () {
      // Calcula el total considerando la cantidad de cada producto
      const totalAmount = this.cart.reduce(
        (sum, item) => sum + Number(item.precio) * item.quantity,
        0
      )
      return totalAmount.toLocaleString('es-MX') // Formatea el número con separador de miles
    }
  },
  mounted () {
    this.getClientes()
    this.getInventarios()
  },
  methods: {
    cancelSale () {
      this.cart = []
    },
    selectProduct (product) {
      // Establecer el producto seleccionado
      this.selectedProduct = product.id
    },
    selectClient (client) {
      this.selectedClient = client.id // Asigna el cliente completo, no solo el ID
      console.log('Cliente seleccionado:', this.selectedClient.nombre)
    },
    async getInventarios () {
      const res = await this.$axios.get('/inventarios')
      if (res && res.data && res.data.success) {
        this.products = res.data.inventarios
      }
    },
    updateQuantity (item, change) {
      if (item.quantity + change > 0) {
        item.quantity += change
      }
    },
    // Elimina un producto del carrito
    removeFromCart (item) {
      this.cart = this.cart.filter(cartItem => cartItem.id !== item.id)
    },
    // Lógica para agregar un producto al carrito
    addToCart (product) {
    // Verificamos si el producto ya está en el carrito
      const cartItem = this.cart.find(item => item.id === product.id)
      if (cartItem) {
      // Si el producto ya está en el carrito, aumentamos la cantidad
        cartItem.quantity++
      } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
        this.cart.push({ ...product, quantity: 1 })
      }
    },
    async getClientes () {
      const res = await this.$axios.get('/clientes')
      if (res && res.data && res.data.success) {
        this.clientes = res.data.clientes.map(cliente => ({
          ...cliente,
          fullName: `${cliente.nombre} ${cliente.apaterno} ${cliente.amaterno}`.trim() // Asignar nombre completo
        }))
        console.log('Clientes cargados:', this.clientes) // Verificar el formato completo
      }
    },

    validarVenta () {
      // Verifica que se haya seleccionado un cliente
      if (!this.selectedClient) {
        alert('Por favor selecciona un cliente.')
        return
      }

      // Busca el cliente por ID en la lista de clientes
      const clienteSeleccionado = this.clientes.find(cliente => cliente.id === this.selectedClient)

      // Si el cliente está en la lista, usamos su fullName
      if (clienteSeleccionado) {
        const fullName = clienteSeleccionado.fullName || 'Cliente no definido'

        // Calcula el subtotal sumando los subtotales de cada producto en el carrito
        this.subtotal = this.cart.reduce((sum, item) => {
          // Calcula el subtotal de cada producto: precio * cantidad
          const itemSubtotal = Number(item.precio) * item.quantity
          return sum + itemSubtotal // Suma todos los subtotales
        }, 0)

        // Calcula el IVA (16%) basado en el subtotal
        this.iva = this.subtotal * 0.16

        // Calcula el total como la suma del subtotal y el IVA
        this.total = this.subtotal + this.iva

        // Crea la factura con los datos completos
        this.facturaEnviar = {
          cliente: fullName, // Usa el nombre completo
          creacion: new Date().toLocaleString(),
          items: this.cart.map(item => ({
            item: item.item, // Nombre del producto
            referencia: item.referencia, // Referencia del producto
            precio: item.precio, // Precio del producto
            descuento: item.descuento || 0, // Descuento del producto (si aplica)
            cantidad: item.quantity, // Cantidad en el carrito
            total: Number(item.precio) * item.quantity // Total de este producto
          })),
          subtotal: this.subtotal, // Suma de los subtotales de todos los productos
          iva: this.iva, // 16% del subtotal
          total: this.subtotal + this.iva // Suma de subtotal + IVA
        }

        console.log('Factura Enviar:', this.facturaEnviar) // Verificar los datos enviados
        this.dialogCreateFactura = true
      } else {
        alert('Cliente no encontrado.')
      }
    }

  }
}
</script>

<style scoped>
/* Cabecera del Facturador */
.container-header {
  background-color: #0f4c75;
  color: white;
  border-radius: 8px;
  width: 96%; /* El ancho será del 96% */
  margin: 0 auto; /* Centra horizontalmente */
  box-sizing: border-box; /* Incluye el padding dentro del ancho total */
  padding: 15px 20px; /* Ajusta el padding para mantener espacio interno */
  display: flex;
  align-items: center;
}

.header-title {
  font-weight: 800;
  font-size: 28px;
  line-height: 30px;
}

/* Resto del contenido */
.facturador-layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 1rem;
}

.panel {
  display: flex;
  justify-content: space-between;
  overflow-x: hidden;
}

.panel-productos{
  width: 44%;
}.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;;
  }

  .input-busqueda {
    flex-grow: 1;
    padding: 0.5rem;
    border: 2px solid #0F4C75;
    border-radius: 4px;
  }

  .agregar-button {
    color: #0F4C75;
    border: none;
    width: 15px; height: 15px;
  }

  .icon-button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .lista-productos{
    list-style: none;
    padding: 0;
    margin-top: 35px;
  }

  .producto-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cancelar-button {
    background-color: #BBE1FA;
    color: #0F4C75;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    width: 569px;
    height: 68px;
  }
  .vendido-button{
    background-color: #0F4C75;
    color: #FFFFFF;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    width: 569px;
    height: 68px;
  }
  html, body {
  overflow-x: hidden;
  width: 100%;
}

.panel-ventas {
  width: 44%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 625px; /* Establece una altura máxima para el panel */
  overflow: hidden;  /* Oculta cualquier contenido que desborde del panel */
}

.lista-ventas {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 680px;
  max-height: 800px;  /* Establece una altura máxima para la lista de productos */
  overflow-y: auto;   /* Habilita el scroll solo cuando sea necesario */
}

.venta-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px; /* Espaciado entre productos */
  background-color: white;
  height: 50px; /* Ajusta la altura de los productos */
}

.venta-item-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.producto-nombre {
  font-weight: bold;
  font-size: 16px;
}

.producto-precio {
  font-size: 14px;
  color: #555;
}

.producto-codigo {
  font-size: 12px;
  color: #888;
}

.cantidad-control {
  display: flex;
  align-items: center;
  gap: 5px;
}

.cantidad-btn {
  background-color: white;
  color: #3282B8;
  border: 1px;
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 4px;
}

.cantidad {
  font-size: 16px;
}

.total-producto {
  font-weight: bold;
  font-size: 16px;
}

.eliminar-btn {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 20px;
  cursor: pointer;
}

</style>
