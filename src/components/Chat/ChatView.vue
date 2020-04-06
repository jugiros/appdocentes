<template lang="pug">
  div
    v-card(style='margin: 10px; margin-bottom: 20px;', v-if='chatArray.visualizar')
      v-card-title(style='padding: 0px;')
        v-layout(row='', wrap='', justify-space-around='')
          v-flex(md12='', style='padding: 10px;')
            v-text-field(v-model='search', append-icon='search', label='Buscar', single-line='', hide-details='', @keyup='filterLogueados')
        v-container(id="scroll-target", style="max-height: 150px; min-height: 150px; padding: 0px 0px 20px 0px;", class="scroll-y")
          v-list
            v-list-tile(router='', :to='item.to', :key='i', v-for='(item, i) in arrayLogueadosFilter', exact='', style='margin: 20px;')
              v-tooltip(right='', color='primary')
                v-list-tile-action(slot='activator')
                  v-avatar
                    img(:src='item.photoURL', alt='')
                span {{item.email}}
              a(@click='selectUserAction(item)') {{item.displayName}}
    v-divider
    v-card(style='margin: 10px; margin-bottom: 20px;', v-if='chatArray.visualizar')
      v-card-title(style='padding: 0px;')
        v-layout.primary(row, wrap)
          v-flex(md6)
            h3(style='color: white; width: 100%; padding: 10px;') {{selectUser.displayName}}
          v-flex(md6 text-xs-right)
            v-btn(icon='', @click="largeChat")
              v-icon#v-step-4(style='color: white;') crop_square
        v-container(id="scrollChat", style="height: 100%; padding: 0px 0px 10px 0px; max-height: 160px; min-height: 160px;", class="scroll-y")
          v-list
            v-list-tile(router='', :to='item.to', :key='i', v-for='(item, i) in arrayChats', exact='')
              div
                h3(:class='item.st') {{item.msg}}
              br
              label(style='font-size: 10px;') {{item.fec}}
        v-text-field(@keyup.enter='chatMessage', append-icon='sms', label='Mensaje', single-line='', hide-details='', style="font-size: 15px; margin-top: 0px; padding: 0px 10px 0px 10px;", v-model='msgChat')
        v-btn(color='primary', slot='activator', @click='chatMessage', style='width: 94%;') ENVIAR
</template>

<script>
  import firebase from 'firebase'
  import {estaticos} from '../../estaticos'
  import $ from 'jquery'

  export default {
    data: () => ({
      chatArray: {
        visualizar: true,
        notificacion: false,
        contador: 0
      },
      arrayLogueadosFilter: [],
      arrayChats: [],
      usuarioLocal: {},
      msgChat: '',
      selectUser: {displayName: 'Chat'},
      search: ''
    }),
    methods: {
      fechHoraActual() {
        var fecha = new Date()
        return fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + " (" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + ")"
      },
      chatMessage() {
        if (this.selectUser.uid) {
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
          this.mostrarMensaje('Seleccione un usuario para iniciar el chat.', 'error')
        }
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
        })
      },
      filterLogueados() {
        let self = this
        this.arrayLogueadosFilter = this.arrayLogueados.filter(function (lf) {
          return lf.displayName.toUpperCase().includes(self.search.toUpperCase())
        })
      },
      largeChat() {
        this.$router.replace({name: 'ChatMessaging'})
      }
    },
    mounted: function () {
      let self = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          self.usuarioLocal = user
          self.listUsers()
        }
      })
    }
  }
</script>

<style>
.v-list__tile {
    height: 100% !important;
    padding-top: 5px !important;
    padding-bottom: 5px !important;
}
</style>
