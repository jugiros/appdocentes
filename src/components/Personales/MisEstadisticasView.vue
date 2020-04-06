<template lang='pug'>
  v-form(style='width: 100%')
    v-breadcrumbs(divider='/')
      v-breadcrumbs-item(v-for='item in itemsBreadcrumbs', :key='item.text', :disabled='item.disabled')
        | {{ item.text }}
    v-layout(column='', justify-center='')
      v-subheader Today
      v-expansion-panel(popout='')
        v-expansion-panel-content(v-for='(message, i) in messages', :key='i', hide-actions='')
          v-layout(slot='header', align-center='', row='', spacer='')
            v-flex(xs4='', sm2='', md1='')
              v-avatar(slot='activator', size='36px')
                img(v-if='message.avatar', src='https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', alt='Avatar')
                v-icon(v-else='', :color='message.color', v-text='message.icon')
            v-flex(sm5='', md3='', hidden-xs-only='')
              strong(v-html='message.name')
              span.grey--text(v-if='message.total')
                | ({{ message.total }})
            v-flex(no-wrap='', xs5='', sm3='')
              v-chip.ml-0(v-if='message.new', :color='`${message.color} lighten-4`', label='', small='')
                | {{ message.new }} new
              strong(v-html='message.title')
            v-flex.grey--text(v-if='message.excerpt', ellipsis='', hidden-sm-and-down='')
              | —
              | {{ message.excerpt }}
          v-card
            v-divider
            v-card-text(v-text='lorem')
    v-divider
    v-container(fluid='', grid-list-md='')
      v-data-iterator(:items='items', :rows-per-page-items='rowsPerPageItems', :pagination.sync='pagination', content-tag='v-layout', row='', wrap='')
        v-flex(slot='item', slot-scope='props', xs12='', sm6='', md4='', lg3='')
          v-card
            v-card-title
              h4 {{ props.item.name }}
            v-divider
            v-list(dense='')
              v-list-tile
                v-list-tile-content Calories:
                v-list-tile-content.align-end {{ props.item.calories }}
              v-list-tile
                v-list-tile-content Fat:
                v-list-tile-content.align-end {{ props.item.fat }}
              v-list-tile
                v-list-tile-content Carbs:
                v-list-tile-content.align-end {{ props.item.carbs }}
              v-list-tile
                v-list-tile-content Protein:
                v-list-tile-content.align-end {{ props.item.protein }}
              v-list-tile
                v-list-tile-content Sodium:
                v-list-tile-content.align-end {{ props.item.sodium }}
              v-list-tile
                v-list-tile-content Calcium:
                v-list-tile-content.align-end {{ props.item.calcium }}
              v-list-tile
                v-list-tile-content Iron:
                v-list-tile-content.align-end {{ props.item.iron }}
    v-divider
    v-card(style='margin: 10px; background-color: #1976d2;')
      v-expansion-panel.expansion(v-model='panel', expand='')
        v-expansion-panel-content(v-for='(item,i) in itemsExpansion', :key='i')
          div(slot='header')
            v-icon(large='', style='margin-right: 20px; color: white;') person_add
            strong AGREGAR USUARIO
          v-layout(row='', wrap='')
            v-flex(xs12='', sm6='', md4='', style='padding: 10px;')
              v-select(label='Tipo de identificación', :items='tiposIdentificacion', v-model='tipoIdentificacion', item-text="descripcion", item-value="id_tipoidentificacion")
            v-flex(xs12='', sm6='', md4='', style='padding: 10px;')
              v-text-field(required = true, label='Identificación', append-icon='account_box', :rules="[rules.required]")
            v-flex(xs12='', sm6='', md4='', style='padding: 10px;')
              v-text-field(required = true, label='Nombre', append-icon='question_answer', :rules="[rules.required]")
            v-flex(xs12='', sm6='', md4='', style='padding: 10px;')
              v-select(label='País', :items='paises', v-model='pais', item-text="pais", item-value="id_pais")
            v-flex(xs12='', sm6='', md4='', style='padding: 10px;')
              v-select(label='Provincia', :items='provincias', v-model='provincia', item-text="descripcion", item-value="provincia", @change='obtenerCiudades')
            v-flex(xs12='', sm6='', md4='', style='padding: 10px;')
              v-select(label='Ciudad', :items='ciudades', v-model='ciudad', item-text="descripcion", item-value="ciudad")
            v-flex(xs12='', sm6='', md4='', style='padding: 10px;')
              v-text-field(required = true, label='Dirección', append-icon='add_location', :rules="[rules.required]")
            v-flex(xs12='', sm6='', md4='', style='padding: 10px;')
              v-text-field(:mask='masks.phoneMask', label='Teléfono', append-icon='phone_in_talk')
            v-flex(xs12='', sm6='', md4='', style='padding: 10px;')
              v-text-field(:mask='masks.cellMask', label='Celular', append-icon='device_unknown')
            v-flex(xs12='', sm6='', md4='', style='padding: 10px;')
              v-text-field(required = true, label='Email', :rules="[rules.email]", append-icon='email')
            v-flex(md12, sm12, xs12, text-xs-center,style='padding-bottom: 20px;')
              v-tooltip(top)
                v-btn(color='primary', slot='activator', @click='agregarUsuario') AGREGAR USUARIO
                span Agregar Usuario
    v-card(style='margin: 10px; margin-bottom: 20px;')
      div
        v-alert(v-model='alert', dismissible='', type='info')
          | Click sobre cada usuario para visualizar el resto de acciones.
      v-card-title
        v-spacer
        v-text-field(v-model='search', append-icon='search', label='Buscar', single-line='', hide-details='')
      v-data-table(:headers='headers', :items='usuarios', :search='search', item-key='cod', rowsPerPageText='Filas por página: ', noDataText='No tiene fichas registradas')
        template(slot='items', slot-scope='props')
          tr(@click="props.expanded = !props.expanded")
            td {{ props.item.cod }}
            td.text-xs-right {{ props.item.nombre }}
            td.text-xs-right {{ props.item.cedula }}
            td.text-xs-right {{ props.item.desripcion }}
        template(slot="expand", slot-scope="props")
          v-layout
            v-btn.primary(flat, icon)
              v-icon mode_edit
            v-btn.primary(flat, icon)
              v-icon delete
        v-alert(slot='no-results', :value='true', color='error', icon='warning')
          | Su búsqueda para "{{ search }}" no tiene resultados.
        v-flex(xs12='', sm10='', offset-sm1='')
    v-snackbar(v-model='snackbar', :bottom='true', :multi-line='true', :right='true', :color='color  ')
      | {{ mensaje }}
      v-btn(dark, flat='', @click='snackbar = false')
        | Cerrar
</template>

<script>
  export default {
    data () {
      return {
        alert: true,
        masks: {
          phoneMask: '(##) #-###-###',
          cellMask: '##########'
        },
        rules: {
          required: value => !!value || 'Campo Requerido.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email Incorrecto.'
          }
        },
        tiposIdentificacion: [],
        tipoIdentificacion: '',
        paises: [],
        pais: '',
        provincias: [],
        provincia: '',
        ciudades: [],
        ciudad: '',
        snackbar: false,
        mensaje: '',
        color: 'success',
        itemsBreadcrumbs: [
          {
            text: 'Dashboard',
            disabled: false
          },
          {
            text: 'Link 1',
            disabled: false
          },
          {
            text: 'Link 2',
            disabled: true
          }
        ],
        search: '',
        headers: [
          { text: 'Id Usuario', align: 'center', value: 'cod' },
          { text: 'Nombre', align: 'center', value: 'nombre' },
          { text: 'Cedula', align: 'center', value: 'cedula' },
          { text: 'Desripción', align: 'center', value: 'descripcion' }
        ],
        usuarios: [],
        panel: [],
        itemsExpansion: 1,
        messages: [
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider',
            title: 'Welcome to Vuetify.js!',
            excerpt: 'Thank you for joining our community...'
          },
          {
            color: 'red',
            icon: 'people',
            name: 'Social',
            new: 1,
            total: 3,
            title: 'Twitter'
          },
          {
            color: 'teal',
            icon: 'local_offer',
            name: 'Promos',
            new: 2,
            total: 4,
            title: 'Shop your way',
            exceprt: 'New deals available, Join Today'
          }
        ],
        lorem: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.',
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 4
        },
        items: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%'
          }
        ]
      }
    },
    methods: {
      obtenerProvincias () {
        this.$axios.post(`/getProvincia`, {pais: this.pais}).then(response => {
          this.provincias = response.data.provincias
          this.provincia = response.data.provincias[0].provincia
          this.$axios.post(`/getCiudad`, {pais: this.pais, provincia: this.provincia}).then(response => {
            this.ciudades = response.data.ciudades
            this.ciudad = response.data.ciudades[0].ciudad
          }).catch(e => {
            this.mostrarMensaje('Error al cargar las ciudades.', 'error')
          })
        }).catch(e => {
          this.mostrarMensaje('Error al cargar las provincias', 'error')
        })
      },
      obtenerCiudades () {
        var self = this
        setTimeout(function () {
          self.$axios.post(`/getCiudad`, {pais: self.pais, provincia: self.provincia}).then(response => {
            self.ciudades = response.data.ciudades
            self.ciudad = response.data.ciudades[0].ciudad
          }).catch(e => {
            this.mostrarMensaje('Error al cargar las ciudades.', 'error')
          })
        }, 100)
      },
      agregarUsuario () {
        this.mostrarMensaje('Error al cargar usuario', 'error')
      },
      mostrarMensaje (mensaje, color) {
        this.snackbar = true
        this.mensaje = mensaje
        this.color = color
      }
    },
    created: function () {
      this.$axios.post(`/getData`, {cod: '1'}).then(response => {
        this.usuarios = response.data.prueba
      }).catch(e => {
        this.mostrarMensaje('Error al cargar los tipos de identificación.', 'error')
      })
    }
  }
</script>

<style scoped>
  .expansion {
  }
  .expansion .v-expansion-panel__header {
    background-color: rgb(0, 188, 212);
    color: white;
  }
</style>
