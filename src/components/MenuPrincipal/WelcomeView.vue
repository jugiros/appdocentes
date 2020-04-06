<template lang='pug'>
  v-layout(wrap)
    v-flex(xs12='')
      v-card
        v-layout(wrap='')
          <!--img.img_Height(src='@/assets/comunidad.png', style='width: 100%; height: 150px;')-->
          v-flex(xs12='')
            v-toolbar(color='cyan', dark='')
              v-toolbar-title.usuarios_Style Bienvenido
              v-spacer
              v-text-field(v-model="search", append-icon='search', label='Buscar por Título', single-line='', hide-details='', color='white', style='color:white;', @keyup='filterNoticias')
          v-flex(md6='',v-for='(card,i) in cardsFilter', :key='i',style='padding: 10px')
            v-card
              v-layout(wrap, style="padding: 20px; height: 500px;")
                v-card-title(primary-title='')
                  div
                    h3(v-text='card.data.titulo')
                v-flex(xs12='')
                  img(:src = 'card.data.photour', alt='' ,style='width: 250px; height: 150px;')
                v-flex(xs12)
                  h5(v-text='card.data.descripcion')
                v-flex(xs12, v-html="card.data.body")
              div
                h6(v-text='card.data.fuente')
              v-btn(flat='', @click='$router.push("/dashboard/detalles")') Saber mas
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
        search: "",
        validForm: true,
        htmlForEditor: null,
        compartir: '',
        titulo: '',
        items: 1,
        tutoriales: 1,
        panel: [],
        totuPanel: [],
        currentUser: null,
        cards: [],
        cardsFilter: [],
        customToolbar: [],
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
      filterNoticias() {
        let self = this
        this.cardsFilter = this.cards.filter(function (cd) {
          return cd.data.titulo.toUpperCase().includes(self.search.toUpperCase())
        })
      },
      mostrarMensaje(mensaje, color) {
        this.snackbar.visualizar = true
        this.snackbar.mensaje = mensaje
        this.snackbar.color = color
      },
      listPost() {
        let starCountRef = firebase.database().ref('noticias/')
        let self = this
        starCountRef.on('value', function (snapshot) {
          // self.cards = snapshot.val()
          snapshot.forEach(element =>{
            const y = element.toJSON();
            self.cards.push(y);
          })
          self.cardsFilter = self.cards
        })
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
    mao() {
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
  .ocultar_Display {
    display: block;
  }
  @media screen and (max-width: 560px) {
    .ocultar_Display {
      display: none !important;
    }
  }
</style>
