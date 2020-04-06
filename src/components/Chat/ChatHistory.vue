<template lang="pug">
  v-layout(row wrap style="height: 100%;")
    v-flex(lg3)
      .chat-history
        v-btn(style='width: 100%; width: 100%; margin: 0px 0px 10px 0px;', color='primary', @click='$router.push("/dashboard/welcome")')
          | REGRESAR
          v-icon(dark='', right='') assignment_return
        v-toolbar.chat-history-toolbar(dense='')
          v-text-field(v-model='search', flat='', solo='', full-width='', clearable='', prepend-icon='search', label='Buscar' @keyup='filterLogueados')
        vue-perfect-scrollbar(style="max-width: 480px;").chat-history--scrollbar
          v-divider
          v-list.chat-history--list(two-line='')
            v-subheader Historial
            template(v-for='(item, index) in arrayLogueadosFilter')
              v-divider(:key='index')
              v-list-tile.chat-list(avatar='' @click='selectUserAction(item)')
                v-list-tile-avatar
                  img(:src='item.photoURL')
                v-list-tile-content
                  v-list-tile-sub-title() {{item.displayName}}
                v-list-tile-action
                  v-list-tile-action-text
                    | {{ item.fec }}
                  v-circle(dot='', small='', color='green')
    v-flex(lg9 style="height: 100%;")
      v-card.chat-room(style="height: 100%;")
        v-toolbar.white.chat-room--toolbar(card='', dense='', flat='', light='')
          v-btn(icon='')
            v-icon(color='text--secondary') keyboard_arrow_left
          template
            <!--v-avatar.avatar-stack(size='32', v-for='(user_id,index) in chat.users', :key='index')-->
              <!--img(:src='getAvatar(user_id)', alt='')-->
          <!--v-spacer-->
          <!--v-toolbar-title-->
            <!--h4 Chat Channel-->
          v-spacer
          v-tooltip(bottom='')
            v-btn(icon='', slot='activator')
              v-icon(color='text--secondary') add
            span Add user
        vue-perfect-scrollbar.chat-room--scrollbar.grey.lighten-5(style="height: 78%;")
          v-container(id="scrollChat", style="height: 100%; max-height: 480px;", class="scroll-y")
            v-list
              v-list-tile(router='', :to='item.to', :key='i', v-for='(item, i) in arrayChats', exact='')
                <!--div-->
                  <!--h3(:class='item.st') {{item.msg}}-->
                <!--br-->
                <!--label(style='font-size: 10px;') {{item.fec}}-->
                .messaging--body.layout.column.mx-2
                  p.pa-2(:value='true', :class="item.st == 'E' ? 'E' : ''")
                    | {{item.msg}}
                  .caption.px-2.text--secondary {{item.fec}}
        v-card-actions
          v-text-field(v-model='msgChat' @keyup.enter='chatMessage', full-width='', flat='', clearable='', solo='', label='Escribir mensaje...  ')
          v-btn(slot='activator', dark='', icon='', @click="chatMessage")
            v-icon(color="primary" style="margin-top: -27px;") send
</template>

<script>
import firebase from 'firebase'
import VCircle from '@/components/circle/VCircle'
import Util from '@/util'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {estaticos} from '../../estaticos'
import $ from 'jquery'

export default {
  components: {
    VuePerfectScrollbar,
    VCircle
  },

  data: () => ({
    chatArray: {
      visualizar: true,
      notificacion: false,
      contador: 0
    },
    arrayLogueadosFilter: [],
    search: '',
    arrayChats: [],
    usuarioLocal: {},
    msgChat: '',
    selectUser: {displayName: 'Chat'},
  }),
  mounted: function () {
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.usuarioLocal = user
        self.listUsers()
      }
    })
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
                arrayChild['photoURL'] = estaticos.userimg
              }
              arrayChild[k] = v
              cont++
            }
          }
        })
        self.arrayLogueadosFilter = self.arrayLogueados
        console.log(self.arrayLogueadosFilter)
      })
    },
    filterLogueados() {
      let self = this
      this.arrayLogueadosFilter = this.arrayLogueados.filter(function (lf) {
        return lf.displayName.toUpperCase().includes(self.search.toUpperCase())
      })
    },
    selectUserAction(item) {
      this.selectUser = item
      let starCountRef = firebase.database().ref("/chatUser/" + this.usuarioLocal.uid + "/" + this.selectUser.uid)
      let self = this
      let arrayEdit = []
      starCountRef.on('value', function (snapshot) {
        let val = JSON.stringify(snapshot.val())
        let array = []
        let arrayChild = {}
        let cont = 0
        let vVal = ''
        self.arrayChats = []
        JSON.parse(val, function (k, v) {
          if (cont == 4) {
            cont = 0
            self.arrayChats.push(arrayChild)
            arrayChild = {}
          } else {
            arrayChild[k] = v
            cont++
          }
        })
        $("#scrollChat").animate({scrollTop: $('#scrollChat')[0].scrollHeight}, 500)
      })
    },
    chatMessage() {
      if (this.selectUser.uid) {
        console.log(this.selectUser.uid)
        console.log(this.msgChat)
        if (this.msgChat != '') {
          var ref = firebase.database().ref("/chatUser/" + this.usuarioLocal.uid + "/" + this.selectUser.uid)
          ref.push({
            msg: this.msgChat,
            st: 'E',
            fec: this.fechHoraActual(),
            v: 0
          })
          var ref = firebase.database().ref("/chatUser/" + this.selectUser.uid + "/" + this.usuarioLocal.uid)
          ref.push({
            msg: this.msgChat,
            st: 'R',
            fec: this.fechHoraActual(),
            v: 0
          })
        }
        this.msgChat = ''
      } else {
        console.log('Error')
      }
    },
    fechHoraActual() {
      var fecha = new Date()
      return fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + " (" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + ")"
    },
  }
};
</script>

