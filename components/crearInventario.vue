<template>
    <v-container fill-height fluid class="login-container">
      <v-card flat elevation="0" width="600" color="#FFFFFF">
        <v-card-title>
          <p class="title" style="width: 100%; color: #000000; justify-content: left;">
            {{ inside && update ? 'Actualiza Item en el Inventario' : (inside ? 'Registrar Nuevo Item en el Inventario' : '') }}
          </p>
        </v-card-title>
        <v-card-text style="color: #000000; justify-content: center; display: flex; flex-direction: column; height: 100%;">
          <v-row justify="center" align="center">
            <v-col>
              <form @submit.prevent="registrarInventario">
                <!-- Primera fila de campos -->
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="inventario.item"
                      label="Item"
                      outlined
                      dense
                      color="blue"
                      class="rounded-field black-text-field"
                      style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      :value="inventario.ref"
                      label="Referencia"
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
                      v-model="inventario.precio"
                      label="Precio"
                      outlined
                      dense
                      color="blue"
                      class="rounded-field black-text-field"
                      style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="inventario.descripcion"
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
                    <v-text-field
                      v-model="inventario.cantidad"
                      label="Cantidad"
                      outlined
                      dense
                      color="blue"
                      class="rounded-field black-text-field"
                      style="border-radius: 20px; -webkit-text-fill-color: #000000; background-color: #F0F0F0; height: 40px; margin-top: 20px; width: 100%;"
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
          <!-- Botón para crear nuevo inventario -->
          <v-btn color="#1B262C" class="mb-3" style="border-radius: 15px; width: 369px;" @click="registrarInventario">
            <span style="text-transform: none; color: #FFFFFF;">
              {{ inside && update ? 'Actualizar' : (inside ? 'Crear Nuevo' : '') }}
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
      inventarioUpdate: { type: Object, default: null }
    },
    data() {
      return {
        inventario: {
          item: '',
          ref: Math.floor(Math.random() * 1000),
          precio: '',
          descripcion: '',
          cantidad: '' // Ahora es un campo libre
        },
        errorMessage: ''
      };
    },
    methods: {
      inicializarFormulario() {
        if (this.update && this.inventarioUpdate) {
          this.inventario = { ...this.inventarioUpdate };
        } else {
          this.limpiarFormulario();
        }
      },
      limpiarFormulario() {
        this.inventario = {
          item: '',
          ref: Math.floor(Math.random() * 1000),
          precio: '',
          descripcion: '',
          cantidad: ''
        };
        this.errorMessage = '';
      },
      async registrarInventario() {
        if (!this.inventario.item || !this.inventario.ref || !this.inventario.precio || !this.inventario.descripcion || !this.inventario.cantidad) {
          this.errorMessage = 'Todos los campos son obligatorios.';
          return;
        }
        try {
          let response;
          if (this.update) {
            response = await this.$axios.put(
              `/inventarios/update/${this.inventario.id}`,
              this.inventario
            );
          } else {
            response = await this.$axios.post('/inventarios/create', this.inventario);
          }
          if (response.data.success) {
            this.$emit('guardado');
            this.limpiarFormulario();
          } else {
            this.errorMessage = response.data.message || 'Error al guardar.';
          }
        } catch (error) {
          this.errorMessage = 'Error en la comunicación con el servidor.';
          console.error(error);
        }
      },
      cancelar() {
        this.$emit('click-cancel');
        this.limpiarFormulario();
      }
    },
    watch: {
      inventarioUpdate: {
        immediate: true,
        handler(newValue) {
          if (newValue && this.update) {
            this.inventario = { ...newValue };
          }
        }
      },
      update: {
        immediate: true,
        handler(isUpdate) {
          if (!isUpdate) {
            this.limpiarFormulario();
          }
        }
      }
    }
  };
  </script>
  