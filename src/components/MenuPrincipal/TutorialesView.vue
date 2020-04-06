<template lang='pug'>
  #app
    v-form(:value="validForm", ref="form", lazy-validation, style="width: 100%")
      v-layout(column='')
        v-flex(xs12='')
          v-card
            v-layout(wrap='')
              <!--img.img_Height(src='@/assets/comunidad.png', style='width: 100%; height: 150px;')-->
              v-flex(xs12='')
                v-toolbar(color='cyan', dark='')
                  v-toolbar-title.usuarios_Style Tutoriales
                  v-spacer
                  v-text-field(v-model='search', append-icon='search', label='Buscar por Título', single-line='', hide-details='', color='white', style='color:white;', @keyup="filterPublicacion")
        v-flex(xs12='')
          v-card(style='margin: 10px; ')
            v-expansion-panel.expansion(v-model='panel', expand='')
              v-expansion-panel-content(v-for='(item,i) in items', :key='i')
                div(slot='header',style='color: blue' )
                  v-icon(large='', style='margin-right: 20px; color: white;') add
                  strong(style="color: white;") Escribir tutorial
                v-layout(row='', wrap='')
                  v-flex(xs12='', text-xs-center)
                    v-text-field(required = true, :rules="[rules.required]", v-model="titulo" , @keyup="titulo = titulo.toUpperCase()", placeholder="Ingresa aqui el Titulo" , style="padding: 0px 20px 0px 20px;", maxlength="20")
                    v-textarea(required = true, :rules="[rules.required]", textarea, label='¿Descripcion del Tutorial', v-model='compartir', @keyup="compartir = compartir.toUpperCase()", style="padding: 0px 20px 0px 20px;", maxlength="50")
                    vue-editor(v-model='htmlForEditor' style="padding: 0px 20px 0px 20px;" )
                    v-btn(@click='cancel') CANCELAR
                    v-btn(color='primary' @click='save') PUBLICAR
          v-divider(style="margin: 20px;")
          v-card
            v-expansion-panel(v-model='totuPanel', expand='')
              v-expansion-panel-content(v-for='(card,i) in cardsFilter', :key='i')
                div(slot='header', style='color: gray' )
                  v-layout(wrap)
                    v-flex(xs1, sm1='')
                      img(:src = 'card.data.photour', alt='' ,style='width: 30px; height: 30px; border-radius: 50%;')
                    v-flex(xs11, sm5, style="padding-left: 20px;")
                      h3(v-text='card.data.titulo')
                    v-flex.ocultar_Display(sm6='', style="padding-left: 20px;")
                      h5(v-text='card.data.descripcion')
                v-card
                  v-layout(wrap, style="padding: 20px")
                    v-flex(xs12)
                      h3(v-text='card.data.titulo')
                    v-flex(xs12)
                      h5(v-text='card.data.descripcion')
                    v-flex(xs12, v-html="card.data.body")
          v-snackbar(v-model='snackbar.visualizar', :bottom='true', :multi-line='true', :right='true', :color='snackbar.color  ')
            | {{ snackbar.mensaje }}
            v-btn(dark, flat='', @click='snackbar.visualizar = false')
              | Cerrar
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
        cards: [],
        cardsFilter: [],
        search: '',
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
      mostrarMensaje(mensaje, color) {
        this.snackbar.visualizar = true
        this.snackbar.mensaje = mensaje
        this.snackbar.color = color
      },
      setEditorContent: function () {
        this.htmlForEditor = '<h1>Html For Edisstor</h1>'
      },
      cancel: function () {
        this.titulo = ''
        this.compartir = ''
        this.htmlForEditor = null
      },
      save: function () {
        if (this.$refs.form.validate()) {
          if (this.htmlForEditor != '' && this.htmlForEditor != null) {
            var ref = firebase.database().ref("tutoriales/")
            ref.push({
              data: {
                fecha: '2018/08/15',
                descripcion: this.compartir,
                body: this.htmlForEditor,
                titulo: this.titulo,
                createdBY: this.currentUser.uid,
                photour: this.currentUser.photoURL
              }
            })
          } else {
            this.mostrarMensaje('Debe ingresar el cuerpo del tutorial', 'error')
          }
        }
      },
      filterPublicacion() {
        let self = this
        this.cardsFilter = this.cards.filter(function (lf) {
          return lf.data.titulo.toUpperCase().includes(self.search.toUpperCase())
        })
      },
      listPost() {
        let starCountRef = firebase.database().ref('tutoriales/')
        let self = this
        starCountRef.on('value', function (snapshot) {
          // self.cards = snapshot.val()
          snapshot.forEach(element =>{
            const y = element.toJSON();
            self.cards.push(y);
          })
        })
        self.cardsFilter = self.cards
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
