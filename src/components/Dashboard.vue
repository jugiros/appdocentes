<template lang='pug'>
  div#layoutPrincipal
    v-tour(name='myTour', :steps='steps', style="position: relative; z-index: 200;")
    div
      v-navigation-drawer.secondary.drawer_Style(fixed='', :mini-variant='miniVariant', :clipped='clipped', v-model='drawer', app='', style='opacity: 0.9; z-index: 100; max-height: 100% !important; background-image: linear-gradient(#fff, #fff);')
        div
          v-layout(align-center='', justify-space-around='', wrap='')
            v-avatar.avatar
              v-tooltip(bottom='', color='primary')
                img.avatar(:src='photo', alt='John', style='margin-top: 20px;', slot="activator")
                span {{email}}
            h3(v-if='!miniVariant', style='padding: 10px;') {{name}}
          #v-step-2
          v-divider(style="margin: 10px;")
          v-list
            v-list-tile(router='', :to='item.to', :key='i', v-for='(item, i) in items', exact='')
              v-tooltip(right='', color='primary')
                v-list-tile-action(slot='activator')
                  v-icon(v-html='item.icon')
                span {{$ml.get('dashboard.'+item.title)}}
              v-list-tile-content
                v-list-tile-title(v-text='$ml.get("dashboard."+item.title)')
          v-divider(style="margin: 10px;")
          .text-xs-center
            v-tooltip(bottom='', color='primary')
              v-chip(outline='', color='green', slot='activator', @click='$router.push("/dashboard/mispublicaciones")')
                v-icon(center='') assignment
              span {{$ml.get('dashboard.mispublicaciones')}}
            v-tooltip(bottom='', color='primary')
              v-chip(outline='', color='primary', slot='activator', @click='$router.push("/dashboard/mistutoriales")')
                v-icon(center='') description
              span {{$ml.get('dashboard.mistutoriales')}}
            v-tooltip(bottom='', color='primary')
              v-chip(outline='', color='red', slot='activator', @click='$router.push("/dashboard/misestadisticas")')
                v-icon(center='') timeline
              span {{$ml.get('dashboard.misestadisticas')}}
      v-toolbar#v-step-0.primary.white--text(fixed='', app='', :clipped-left='clipped', height='50px;')
        v-toolbar-title(v-text='$ml.get("dashboard.titulo")')
        v-tooltip(bottom='', color='primary')
          v-toolbar-side-icon#v-step-1(@click.native.stop='drawer = !drawer', style='color: white;', slot='activator')
          span {{$ml.get('dashboard.menu')}}
        v-tooltip(bottom='', color='primary')
          v-btn.ocultar_Style(icon='', @click.native.stop='miniVariant = !miniVariant', style='color: white;', slot='activator')
            v-icon(v-html="miniVariant ? 'chevron_right' : 'chevron_left'")
          span {{miniVariant ? $ml.get('dashboard.desplegar') : $ml.get('dashboard.ocultar')}}
        v-spacer
        <!--v-text-field#v-step-3.entrada.ocultar_Style(append-icon='search', :label='$ml.get("general.buscar")', single-line='', hide-details='', color='white', style='color:white;')-->
        v-tooltip(bottom='', color='primary', style="margin: 0px 25px 0px 0px;")
          v-badge(left, overlap, color='red', style='font-size: 5px !important;', slot="activator")
            span(slot='badge', v-if="chatArray.notificacion") {{chatArray.contador}}
            v-icon(color='secondary')
              | sms
          span {{$ml.get('dashboard.chat')}}
        v-tooltip(bottom='', color='primary', style="margin: 0px 15px 0px 0px;")
          v-badge(left, overlap, color='red', style='font-size: 5px !important;', slot="activator")
            span(slot='badge', v-if="chatArray.notificacion") {{chatArray.contador}}
            v-icon(color='secondary')
              | notification_important
          span Notificaciones
        v-tooltip(bottom='', color='primary')
          v-btn(icon='', @click.native.stop='rightDrawer = !rightDrawer', slot='activator')
            v-icon#v-step-4(style='color: white;') more_horiz
          span {{$ml.get('dashboard.administrar')}}
        v-menu(bottom='', left='')
          v-btn(slot='activator', dark='', icon='')
            v-icon language
          v-list
            v-list-tile(v-for='(lang,i) in $ml.list', :key='lang', @click="$ml.change(lang)")
              v-list-tile-title {{ lang }}
        v-tooltip(bottom='', color='primary')
          v-btn(icon='', @click.native='logOut', slot='activator')
            v-icon(style='color: white;')  close
          span {{$ml.get('general.salir')}}
      v-content
        v-container(fluid='')
          v-slide-y-transition(mode='out-in')
            div
              router-view
              <!--v-btn(dark, fab, fixed, bottom, right, color='green', style='transform-origin: center center 0px; bottom: 64px; margin-right: 300px;')-->
                <!--v-icon(style='padding-top: 15px;') keyboard_arrow_up-->
      v-navigation-drawer.secondary.drawer_Style(fixed='', :right='right', v-model='rightDrawer', app='', style='opacity: 0.9; padding-bottom: 0px; z-index: 102;')
        .text-xs-center
          v-menu(v-model='menu', :close-on-content-click='false', :nudge-width='200', offset-x='')
            v-btn(slot='activator', style='background-color: transparent; border: none; box-shadow: none;')
              v-icon(style='color: black; padding-right: 20px;')  build
              | {{$ml.get('dashboard.administrar')}}
            v-btn(slot='activator', @click.native.stop='rightDrawer = !rightDrawer', style='background-color: transparent; border: none; box-shadow: none;')
              v-icon(style='color: black; padding-right: 20px;') keyboard_arrow_down
            v-card
              v-list
                v-list-tile(avatar='')
                  v-list-tile-avatar
                    img(:src='photo', alt='Mao')
                  v-list-tile-content
                    v-list-tile-title {{name}}
                    v-list-tile-sub-title {{email}}
                  v-list-tile-action
                  v-tooltip(bottom='', color='primary')
                    v-list-tile-action(slot='activator', style='padding-left: 20px;')
                      v-btn(icon='', @click='$router.push("/dashboard/perfil")')
                        v-icon account_circle
                    span {{$ml.get('dashboard.editPerfil')}}
              v-divider
              v-list
                v-list-tile
                  v-list-tile-action
                    v-switch(v-model='chatArray.visualizar', color='purple')
                  v-list-tile-title {{$ml.get('dashboard.hblChat')}}
                <!--v-list-tile-->
                  <!--v-list-tile-action-->
                    <!--v-switch(v-model='arrayPromociones.visualizar', color='purple')-->
                  <!--v-list-tile-title {{$ml.get('dashboard.hblPromociones')}}-->
                <!--v-list-tile-->
                  <!--v-list-tile-action-->
                    <!--v-switch(v-model='arrayAnuncios.visualizar', color='purple')-->
                  <!--v-list-tile-title {{$ml.get('dashboard.hblAnuncios')}}-->
              v-divider
              v-flex(md12, sm12, xs12, text-xs-center,style='padding: 5px;')
                v-tooltip(bottom='', color='primary')
                  v-btn(color='primary', slot='activator', @click='') {{$ml.get('dashboard.cancelCta')}}
                  span Cancela la cuenta del Usuario
              v-divider
              v-card-actions
                v-spacer
                v-btn(flat='', @click='menu = false') {{$ml.get('general.salir')}}
        v-divider
        #v-step-5
        chat-page
        <!--v-tabs(v-model='active', color='primary', dark='', slider-color='yellow')-->
          <!--v-tab(ripple='', v-if='chatArray.visualizar')-->
            <!--div(v-if='chatArray.visualizar')-->
              <!--v-tooltip(bottom='', color='primary')-->
                <!--div(slot='activator', style='padding: 5px 5px 0px 5px;')-->
                  <!--v-badge(color='red', style='font-size: 25px !important;')-->
                    <!--span(slot='badge', v-if="chatArray.notificacion") {{chatArray.contador}}-->
                    <!--v-icon(large='', color='gray')-->
                      <!--| sms-->
                <!--span {{$ml.get('dashboard.chat')}}-->
          <!--v-tab-item-->
            <!--chat-page-->
          <!--v-tab(ripple='', v-if='arrayAnuncios.visualizar')-->
            <!--div(v-if='arrayAnuncios.visualizar')-->
              <!--v-tooltip(bottom='', color='primary')-->
                <!--div(slot='activator', style='padding: 5px 5px 0px 5px;')-->
                  <!--v-badge(color='blue', style='font-size: 25px !important;')-->
                    <!--span(slot='badge', v-if="arrayAnuncios.notificacion") {{arrayAnuncios.contador}}-->
                    <!--v-icon(large='', color='gray')-->
                      <!--| chrome_reader_mode-->
                <!--span {{$ml.get('dashboard.anuncios')}}-->
          <!--v-tab-item-->
            <!--anuncios-page-->
          <!--v-tab(ripple='', v-if='arrayPromociones.visualizar')-->
            <!--div(v-if='arrayPromociones.visualizar')-->
              <!--v-tooltip(bottom='', color='primary')-->
                <!--div(slot='activator', style='padding: 5px 5px 0px 5px;')-->
                  <!--v-badge(color='green', style='font-size: 25px !important;')-->
                    <!--span(slot='badge', v-if="arrayPromociones.notificacion") {{arrayPromociones.contador}}-->
                    <!--v-icon(large='', color='gray')-->
                      <!--| book-->
                <!--span {{$ml.get('dashboard.promociones')}}-->
          <!--v-tab-item-->
            <!--promociones-page-->
        v-divider
      v-snackbar(v-model='snackbar', :bottom='true', :multi-line='true', :right='true', :color='color  ')
        | {{ mensaje }}
        v-btn(dark, flat='', @click='snackbar = false')
          | Cerrar
    v-dialog(v-model='dialogDashInit', persistent='', max-width='700', style="max-height: 95%;")
      v-card
        perfil-view(:dialogParam="dialogDashInit" @dialogChanged="dialogDashInit = $event")
</template>

<script>
  import firebase from 'firebase'
  import Promociones from "./Administrar/PromocionesView.vue"
  import Anuncios from "./Administrar/AnunciosView.vue"
  import Chat from "./Chat/ChatView.vue"
  import Perfil from "./Administrar/Perfil.vue"

  export default {
    components: {
      "promociones-page": Promociones,
      "anuncios-page": Anuncios,
      "chat-page": Chat,
      "perfil-view": Perfil
    },
    data: () => ({
      dialogDashInit: false,
      image: require('@/assets/images/blog-1.jpg'),
      active: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      snackbar: false,
      mensaje: '',
      color: 'success',
      usuarioLocal: {},
      photo: '',
      name: '',
      email: '',
      fav: true,
      menu: false,
      chatArray: {
        visualizar: true,
        notificacion: false,
        contador: 0
      },
      arrayAnuncios: {
        visualizar: false,
        notificacion: false,
        contador: 0
      },
      arrayPromociones: {
        visualizar: false,
        notificacion: false,
        contador: 0
      },
      promociones: true,
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        {icon: 'apps', title: 'bienvenido', to: '/dashboard/welcome'},
        {icon: 'work', title: 'portafolio', to: '/dashboard/portafolio'},
        {icon: 'contacts', title: 'comunidad', to: '/dashboard/comunidad'},
        {icon: 'assignment', title: 'publicaciones', to: '/dashboard/publicaciones'},
        {icon: 'description', title: 'tutoriales', to: '/dashboard/tutoriales'},
        {icon: 'timeline', title: 'estadisticas', to: '/dashboard/estadisticas'}
      ],
      arrayLogueados: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      steps: [
        {
          target: '#v-step-0',  // We're using document.querySelector() under the hood
          content: `BIENVENIDO <strong>Ala Red Social para docentes</strong>!`
        },
        {
          target: '#v-step-1',  // We're using document.querySelector() under the hood
          content: `MENU PRINCIPAL <strong>Accedes a todos los módulos de la red.</strong>!`
        },
        {
          target: '#v-step-2',
          content: `<strong>Todos los módulos de nuestra RED.</strong>!`
        },
        {
          target: '#v-step-3',
          content: `BUSCAR <strong>Busca información relevante para tus necesidades.</strong>!`
        },
        {
          target: '#v-step-4',
          content: `ADMINISTRAR <strong>Administra tus preferencias del perfil.</strong>!`
        },
        {
          target: '#v-step-5',
          content: `<strong>Podras realizar chat con los usuarios asi como ver los anuncios y promociones reelevantes.</strong>!`,
          params: {
            placement: 'top'
          },
        }
      ]
    }),
    methods: {
      exit() {
        location.reload()
      },
      logOut() {
        firebase.auth().signOut()
      },
      mostrarMensaje(mensaje, color) {
        this.snackbar = true
        this.mensaje = mensaje
        this.color = color
      },
      saveUser(user) {
        var ref = firebase.database().ref("/usersLogged/" + user.uid)
        ref.orderByChild('uid').equalTo(user.uid).once('value').then(function (snapshot) {
          if (!snapshot.val()) {
            ref.set({
              data: {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                activo: true
              }
            })
          }
        })
      },
      obtenerNoficicaciones() {
        let starCountRef = firebase.database().ref("/chatUser/" + this.usuarioLocal.uid);
        // starCountRef.orderByChild("data/createdBY").equalTo("VveGxwR6z3cbJEbo7oRhSkQpKYz1").on('value', function (snapshot) {
        //   console.log(snapshot.val())
        //   self.cards = snapshot.val()
        // });
        let self = this;
        starCountRef.on('value', function (snapshot) {
          let val = JSON.stringify(snapshot.val());
          self.chatArray.contador = self.chatArray.contador + 1;
          var audio = new Audio('http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3');
          audio.play();
          if (self.chatArray.contador > 1) {
            self.chatArray.notificacion = true
          }
        })
      }
    },
    created: function () {
      this.$router.replace({name: 'welcome'})
      var vm = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          vm.usuarioLocal = user
          vm.saveUser(user)
          vm.photo = user.photoURL ? user.photoURL : '@/assets/user.png'
          vm.name = user.displayName
          vm.email = user.email
          vm.obtenerNoficicaciones()
        } else {
          FB.api('/me', dude => {
            vm.name = dude.name


          })
          FB.api(
            '/me/picture',
            'GET',
            {"redirect": "false"},
            function (response) {
              // Insert your code here
              vm.photo = response.data.url
            }
          )
        }
      })
    },
    mounted: function () {
      let width = document.getElementById("layoutPrincipal").offsetWidth
      if (width > 560) {
        this.drawer = true
        this.rightDrawer = true
      }
      this.$tours['myTour'].start()
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  .avatar {
    height: 70% !important;
    width: 70% !important;
  }
  .entrada input {
    color: white !important;
  }
  .entrada .v-label {
    color: white !important;
  }
  .entrada .v-icon {
    color: white !important;
  }
  .E {
    background: #90f590;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 10px;
    font-size: 15px;
    text-align: left;
    width: 100%;
  }
  .R {
    background: #6b78fd;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 10px;
    font-size: 15px;
    text-align: right;
    width: 100%;
  }
  .flright {
    float: right;
  }
  .flleft {
    float: left;
  }
  .material-icons {
    font-size: 24px !important;
  }
  .v-dialog:not(.v-dialog--fullscreen) {
    max-height: 98% !important;
  }
  @media screen and (max-width: 560px) {
    .drawer_Style {
      width: 100% !important;
    }
    .v-navigation-drawer[data-booted=true] {
      transform: translateX(-100%) !important;
    }
    .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close), .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
      transform: translateX(0px) !important;
    }
    .ocultar_Style {
      display: none !important;
    }
    .v-menu__content {
      left: 0px !important;
      top: 0px !important;
    }
  }
</style>
