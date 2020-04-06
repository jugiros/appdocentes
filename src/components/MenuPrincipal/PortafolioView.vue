<template lang='pug'>
  v-layout(wrap='')
    v-flex
      v-card
        v-layout(wrap='')
          <!--img.img_Height(src='@/assets/comunidad.png', style='width: 100%; height: 150px;')-->
          v-flex(xs12='')
            v-toolbar(color='cyan', dark='')
              v-toolbar-title.usuarios_Style Mi Portafolio
              v-spacer
              v-text-field(append-icon='search', label='Buscar', single-line='', hide-details='', color='white', style='color:white;')
          v-flex(xs12='')
          v-list(two-line='', subheader='')
            v-subheader(inset='') Portafolio
            v-list-tile(v-for='item in cards', :key='item.title', avatar='', @click='$router.push("/dashboard/"+item.title)')
              v-list-tile-avatar
                v-icon(:class=['grey lighten-1 white--text']) {{ 'folder' }}
              v-list-tile-content
                v-list-tile-title {{ item.title}}
                v-list-tile-sub-title {{ item.subtitle }}
              v-list-tile-action
                v-btn(icon='', ripple='')
                  v-icon(color='grey lighten-1') info
            <!--v-divider(inset='')-->
            <!--v-subheader(inset='') Material2-->
            <!--v-list-tile(v-for='item in cards', :key='item.title', avatar='', @click='')-->
            <!--v-list-tile-avatar-->
            <!--v-icon(:class='[item.iconClass]') {{ item.icon }}-->
            <!--v-list-tile-content-->
            <!--v-list-tile-title {{ item.title }}-->
            <!--v-list-tile-sub-title {{ item.subtitle }}-->
            <!--v-list-tile-action-->
            <!--v-btn(icon='', ripple='')-->
            <!--v-icon(color='grey lighten-1') info-->
</template>

<script>
  import {VueEditor} from 'vue2-editor'
  import firebase from 'firebase'

  export default {
    components: {
      VueEditor
    },
    data() {
      return {
        validForm: true,
        htmlForEditor: null,
        compartir: '',
        titulo: '',
        items: 1,
        tutoriales: 1,
        panel: [],
        totuPanel: [],
        currentUser: null,
        cards2: [],
        cards: [
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Documentos', subtitle: 'Jan 9, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Fotos', subtitle: 'Jan 17, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Material', subtitle: 'Jan 28, 2014' }
        ],
        rules: {
          required: value => !!value || 'Campo Requerido.'
        },
        snackbar: {
          visualizar: false,
          mensaje: '',
          color: 'success'
        }
      }
    },
    methods: {
      mostrarMensaje(mensaje, color) {
        this.snackbar.visualizar = true
        this.snackbar.mensaje = mensaje
        this.snackbar.color = color
      },

      listPost() {
        console.log('maooooooooo tene')
        let storage = firebase.storage();
        let storageRef = storage.ref();

console.log(storageRef)

      },
      cambiarruta() {
        $router.push("/dashboard/detalles")
        console.log('mao')
      }
    },
    mounted: function () {
      let self = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          self.currentUser = user
          self.listPost()
        }
      })
    },

  }
</script>

<style scoped>
  .expansion {

  }
  .expansion .v-expansion-panel__header {
    background-color: rgb(0, 188, 212);
    color: white;
  }
  .ocultar_Display {
    display: block;
  }
  @media screen and (max-width: 560px) {
    .ocultar_Display {
      display: none !important;
    }
  }
</style>
