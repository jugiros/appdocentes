<template lang="pug">
  v-layout(wrap='')
    v-flex(xs12='')
      v-card
        v-layout(wrap='')
          <!--img.img_Height(src='@/assets/comunidad.png', style='width: 100%; height: 150px;')-->
          v-flex(xs12='')
            v-toolbar(color='cyan', dark='')
              v-toolbar-title.usuarios_Style Comunidad
              v-spacer
              v-text-field(v-model='search', append-icon='search', label='Buscar por Nombre', single-line='', hide-details='', color='white', style='color:white;', @keyup='filterLogueados')
          v-flex(md4='', class="scroll-y", style="min-height: 355px; max-height: 355px;")
            v-list(three-line='')
              template(v-for='(item, index) in arrayLogueadosFilter')
                v-subheader(v-if='item.header', :key='item.header')
                  | {{ item.header }}
                v-divider(v-else-if='item.divider', :inset='item.inset', :key='index')
                v-list-tile(v-else='', :key='item.title', avatar='', @click='getDataUser(item.uid, item.avatar, item.title)')
                  v-list-tile-avatar
                    img(:src='item.avatar')
                  v-list-tile-content
                    v-list-tile-title(v-html='item.title')
                    v-list-tile-sub-title(v-html='item.subtitle')
          v-flex(md8='')
            h3(style="padding: 10px;") Datos Personales
            v-list(two-line='')
              v-list-tile(@click='')
                v-list-tile-action
                  v-icon(color='indigo') phone
                v-list-tile-content
                  v-list-tile-title {{celular}}
                  v-list-tile-sub-title Celular
              v-divider(inset='')
              v-list-tile(@click='')
                v-list-tile-action
                  v-icon(color='indigo') location_on
                v-list-tile-content
                  v-list-tile-title {{pais}}
                  v-list-tile-sub-title País
              v-divider(inset='')
              v-list-tile(@click='')
                v-list-tile-action
                  v-icon(color='indigo') location_city
                v-list-tile-content
                  v-list-tile-title {{institucion}}
                  v-list-tile-sub-title Institución
              v-divider(inset='')
              v-list-tile(@click='')
                v-list-tile-action
                  v-icon(color='indigo') date_range
                v-list-tile-content
                  v-list-tile-title {{fechanacimiento}}
                  v-list-tile-sub-title Fecha de Nacimiento
    v-flex(sm12='', style='padding: 10px;')
      v-text-field(textarea, :label='$ml.get("perfil.descripcion")', v-model='descripcion', disabled=true)
    v-flex(xs12='')
      v-divider(style="padding: 10px;")
    v-layout(column='', justify-center='')
      v-expansion-panel(popout='')
        v-expansion-panel-content
          v-layout(slot='header', align-center='', row='', spacer='')
            v-flex(xs2)
              v-avatar(slot='activator', size='36px')
                img(v-if='true', :src='avatarSelect')
            v-flex(xs4='', sm2='', md1='')
              v-icon(large='', color='red darken-2') book
            v-flex(xs4)
              | {{nombreSelect}}
            v-flex(xs4)
              | PUBLICACIONES
            v-flex(xs2)
              v-chip.ml-0(color='red lighten-4', label='', small='')
                | {{ publicaciones.length }} Publicaciones
          v-card
            v-container(fluid='', grid-list-md='', style='padding: 0px;')
              v-layout(wrap='')
                v-flex(xs12, style='padding: 0px 40px 10px 40px;')
                  v-text-field(v-model='searchPublicaciones', append-icon='search', label='Buscar por Título', single-line='', hide-details='', @keyup='filterPosts')
                v-flex(xs12, v-for='card in publicacionesFilter', v-bind='{ [`xs${card.flex}`]: true }', :key='card.photour')
                  <!--h1 Hola-->
                  v-card
                    v-card-media(height='100px')
                      v-container(fill-height='', fluid='', pa-2='')
                        v-layout(fill-height='')
                          img(:src = 'card.data.photour', alt='' ,style='margin-left: 40px; color: white; width: 30px; height: 30px; border-radius: 50%;')
                        v-layout(style="padding-left: 50px;")
                          v-flex(sm4='', align-end='left', flexbox='', text-xs-left)
                            h4(v-text='card.data.body')
                    v-flex(sm4='', offset-sm1, v-for='archivos in card.data.archivos',:key='archivos.url')
                      v-card
                        v-card-media(height='50px')
                          v-container(fill-height='', fluid='', pa-2='')
                            img(src = '@/assets/images/file.png', alt='archivos.url' ,style='margin-right: 50px; width: 40px; height: 40px;')
                            v-tooltip(bottom='', color='primary')
                              v-btn(icon, slot='activator', @click='descaragrArchivo(archivos.url)')
                                v-icon(color="primary") cloud_download
                              span {{$ml.get('welcome.descargar')}}
                            span {{archivos.titulo}}
                    v-card-actions
                      v-spacer
                      v-tooltip(bottom='', color='primary')
                        v-btn(icon='', slot="activator")
                          v-icon share
                        span Compartir
                      v-tooltip(bottom='', color='primary')
                        v-btn(flat='', icon='', color='blue lighten-2', slot="activator")
                          v-icon thumb_up
                        span Me Gusta
                      v-tooltip(bottom='', color='primary')
                        v-btn(flat='', icon='', color='red lighten-2', slot="activator")
                          v-icon thumb_down
                        span No me Gusta
      v-divider(style="padding: 10px;")
      v-expansion-panel(popout='')
        v-expansion-panel-content
          v-layout(slot='header', align-center='', row='', spacer='')
            v-flex(xs2)
              v-avatar(slot='activator', size='36px')
                img(v-if='true', :src='avatarSelect')
            v-flex(xs4='', sm2='', md1='')
              v-icon(large='', color='blue darken-2') description
            v-flex(xs4)
              | {{nombreSelect}}
            v-flex(xs4)
              | TUTORIALES
            v-flex(xs2)
              v-chip.ml-0(color='blue lighten-4', label='', small='')
                | {{ tutoriales.length }} Tutoriales
          v-card
            v-flex(xs12, style='padding: 0px 40px 10px 40px;')
              v-text-field(v-model='searchTutoriales', append-icon='search', label='Buscar por Título', single-line='', hide-details='', @keyup='filterPublicacion')
            v-expansion-panel(v-model='totuPanel', expand='')
              v-expansion-panel-content(v-for='(card,i) in tutorialesFilter', :key='i')
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
</template>

<script>
  import firebase from 'firebase'
  import {estaticos} from '../../estaticos'
  export default {
    data () {
      return {
        searchPublicaciones: '',
        searchTutoriales: '',
        avatarSelect: '',
        nombreSelect: 'Nombre Usuario',
        totuPanel: [],
        tutoriales: [],
        tutorialesFilter: [],
        publicaciones: [],
        publicacionesFilter: [],
        search: '',
        celular: '',
        pais: '',
        institucion: '',
        fechanacimiento: '',
        descripcion: '',
        arrayLogueados: [
          { header: 'Today' }
        ],
        arrayLogueadosFilter: [],
        messages: [
          {
            color: 'red',
            icon: 'assignment',
            name: 'Publicaciones',
            new: 1,
            total: 3,
            title: 'Docentes',
            data: []
          },
          {
            color: 'teal',
            icon: 'description',
            name: 'Tutoriales',
            new: 2,
            total: 4,
            title: 'Primaria Escolar',
            data: []
          }
        ]
      }
    },
    methods: {
      listUsers() {
        let starCountRef = firebase.database().ref('usersLogged')
        let self = this
        starCountRef.on('value', function (snapshot) {
          let val = JSON.stringify(snapshot.val())
          let array = []
          let arrayChild = {}
          let cont = 0
          self.arrayLogueados = []
          JSON.parse(val, function (k, v) {
            if (k != "data" && k != v) {
              if (cont == 5) {
                cont = 0
                self.arrayLogueados.push(arrayChild)
                arrayChild = {}
              } else {
                if (cont == 0) {
                  arrayChild['avatar'] = estaticos.userimg
                }
                switch(k) {
                  case 'displayName':
                    arrayChild['title'] = v
                    break
                  case 'email':
                    arrayChild['subtitle'] = v
                    break
                  case 'photoURL':
                    arrayChild['avatar'] = v
                    break
                  case 'uid':
                    arrayChild['uid'] = v
                    break
                }
                cont++
              }
            }
          })
          self.arrayLogueadosFilter = self.arrayLogueados
        })
      },
      filterLogueados() {
        let self = this
        this.arrayLogueadosFilter = this.arrayLogueados.filter(function (lf) {
          return lf.title.toUpperCase().includes(self.search.toUpperCase())
        })
      },
      filterPosts() {
        let self = this
        this.publicacionesFilter = this.publicaciones.filter(function (lf) {
          return lf.data.body.toUpperCase().includes(self.searchPublicaciones.toUpperCase())
        })
      },
      filterPublicacion() {
        let self = this
        this.tutorialesFilter = this.tutoriales.filter(function (lf) {
          return lf.data.titulo.toUpperCase().includes(self.searchTutoriales.toUpperCase())
        })
      },
      getDataUser (uid, avatar, nombre) {
        this.avatarSelect = avatar
        this.nombreSelect = nombre
        let starCountRef = firebase.database().ref("/personalInformation/" + uid)
        let self = this
        starCountRef.on('value', function (snapshot) {
          let val = JSON.stringify(snapshot.val())
          if (val != 'null') {
            JSON.parse(val, function (k, v) {
              switch (k) {
                case 'celular':
                  self.celular = v
                  break
                case 'descripcion':
                  self.descripcion = v
                  break
                case 'fechaNacimiento':
                  self.fechanacimiento = v
                  break
                case 'institucion':
                  self.institucion = v
                  break
                case 'pais':
                  self.pais = v
                  break
              }
            })
          } else {
            self.celular = ''
            self.descripcion = ''
            self.fechanacimiento = ''
            self.institucion = ''
            self.pais = ''
          }
        })
        self.publicaciones = []
        self.publicacionesFilter = []
        self.tutoriales = []
        self.tutorialesFilter = []
        let publicacionesFirebase = firebase.database().ref('post/')
        publicacionesFirebase.orderByChild("data/createdBY").equalTo(uid).on('value', function (snapshot) {
          // self.cards = snapshot.val()
          snapshot.forEach(element =>{
            const y = element.toJSON();
            self.publicaciones.push(y);
          })
        })
        self.publicacionesFilter = self.publicaciones
        let tutorialesFirebase = firebase.database().ref('tutoriales/')
        tutorialesFirebase.orderByChild("data/createdBY").equalTo(uid).on('value', function (snapshot) {
          // self.cards = snapshot.val()
          snapshot.forEach(element =>{
            const y = element.toJSON();
            self.tutoriales.push(y);
          })
        })
        self.tutorialesFilter = self.tutoriales
      }
    },
    mounted: function () {
      this.listUsers()
    }
  }
</script>

<style scoped>
  @media screen and (max-width: 560px) {
    .usuarios_Style {
      display: none !important;
    }
    .img_Height {
      height: 50px !important;
    }
  }
</style>
