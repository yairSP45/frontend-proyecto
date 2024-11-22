<template>
  <v-dialog v-model="dialogCreate" max-width="600px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Agregar Contacto</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isValid">
          <!-- Nombre -->
          <v-text-field
            v-model="nuevoContacto.nombre"
            label="Nombre"
            :rules="[rules.required]"
            required
          />

          <!-- Apellido Paterno -->
          <v-text-field
            v-model="nuevoContacto.apaterno"
            label="Apellido Paterno"
            :rules="[rules.required]"
            required
          />

          <!-- Apellido Materno -->
          <v-text-field
            v-model="nuevoContacto.amaterno"
            label="Apellido Materno"
            :rules="[rules.required]"
            required
          />

          <!-- Dirección -->
          <v-text-field
            v-model="nuevoContacto.direccion"
            label="Dirección"
            :rules="[rules.required]"
            required
          />

          <!-- Ciudad -->
          <v-text-field
            v-model="nuevoContacto.ciudad"
            label="Ciudad"
            :rules="[rules.required]"
            required
          />

          <!-- Estado -->
          <v-text-field
            v-model="nuevoContacto.estado"
            label="Estado"
            :rules="[rules.required]"
            required
          />

          <!-- Teléfono -->
          <v-text-field
            v-model="nuevoContacto.telefono"
            label="Teléfono"
            :rules="[rules.required, rules.phone]"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="dialogCreate = false">
          Cancelar
        </v-btn>
        <v-btn color="blue darken-1" text :disabled="!isValid" @click="guardarContacto">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogCreate: false, // Controla la visibilidad del diálogo
      isValid: false, // Valida si el formulario es válido
      nuevoContacto: {
        nombre: '',
        apaterno: '',
        amaterno: '',
        direccion: '',
        ciudad: '',
        estado: '',
        telefono: ''
      },
      rules: {
        required: value => !!value || 'Este campo es obligatorio',
        phone: value => /^\d{10}$/.test(value) || 'Debe ser un número de 10 dígitos'
      }
    }
  },
  methods: {
    guardarContacto () {
      if (this.$refs.form.validate()) {
        // Lógica para guardar el contacto
        this.$emit('guardado', { ...this.nuevoContacto })
        this.dialogCreate = false
        this.limpiarFormulario()
      }
    },
    limpiarFormulario () {
      this.nuevoContacto = {
        nombre: '',
        apaterno: '',
        amaterno: '',
        direccion: '',
        ciudad: '',
        estado: '',
        telefono: ''
      }
    }
  }
}
</script>
