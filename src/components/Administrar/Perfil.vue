<template lang='pug'>
  v-layout(row='', wrap='', justify-space-around='')
    v-flex(md12='', style='padding: 10px;')
      h2 Debe registrar su perfil para pertenecer a la comunidad
    v-flex(md6='', style='padding: 10px;')
      img(:src='photo', alt='John', style='width: 250px; margin-left: 50px; margin-top: 20px; border-radius: 50%;')
    v-flex(sm6='', style='padding: 10px;')
      v-layout(row='', wrap='', justify-space-around='')
        v-flex(md12='', style='padding: 10px;')
          v-text-field(v-model='name', append-icon='account_circle', :label='$ml.get("perfil.nombre")', hide-details='')
        v-flex(md12='', style='padding: 10px;')
          v-text-field(v-model='email', append-icon='email', :label='$ml.get("perfil.email")', hide-details='', disabled=true)
        v-flex(md12='', style='padding: 10px;')
          v-text-field(:mask='masks.celular', v-model='celular', append-icon='settings_cell', :label='$ml.get("perfil.celular")', hide-details='')
        v-flex(md12='', style='padding: 10px;')
          v-menu(lazy='', :close-on-content-click='false', transition='scale-transition', offset-y='', full-width='', :nudge-right='40', max-width='290px', min-width='290px')
            v-text-field(disabled=true, slot='activator', :label='$ml.get("perfil.fecNacimiento")', append-icon='event', v-model='fechanacimiento')
            v-date-picker(no-title='', scrollable='', actions='', locale='es-EC', v-model='fechanacimiento')
    v-flex(sm6='', style='padding: 10px;')
      v-select(:label='$ml.get("perfil.pais")', :items='paises', v-model='pais', item-text="name", item-value="alpha3Code", autocomplete)
    v-flex(sm6='', style='padding: 10px;')
      v-text-field(v-model='institucion', append-icon='account_balance', :label='$ml.get("perfil.institucion")', hide-details='', @keyup="institucion = institucion.toUpperCase()")
    v-flex(sm12='', style='padding: 10px;')
      v-text-field(textarea, :label='$ml.get("perfil.descripcion")', v-model='descripcion', @keyup="descripcion = descripcion.toUpperCase()")
    v-flex(sm12='', style='padding: 10px;', text-xs-center)
      v-tooltip(top)
        v-btn(slot='activator', @click='cancel()') {{$ml.get('general.cancelar')}}
        span {{$ml.get('general.cancelar')}} {{$ml.get('general.actualizar')}}
      v-tooltip(top)
        v-btn(color='primary', slot='activator', @click='actualizarUsuario') {{$ml.get('general.actualizar')}}
        span {{$ml.get('general.actualizar')}}
    v-snackbar(v-model='snackbar.visualizar', :bottom='true', :multi-line='true', :right='true', :color='snackbar.color  ')
      | {{ snackbar.mensaje }}
      v-btn(dark, flat='', @click='snackbar.visualizar = false')
        | Cerrar
</template>

<script>
  import firebase from 'firebase'

  export default {
    props: [ 'dialogParam' ],
    data: () => ({
      msgChat: '',
      photo: '',
      name: '',
      email: '',
      celular: '',
      descripcion: '',
      fechanacimiento: '',
      pais: '',
      institucion: '',
      info: null,
      paises: null,
      masks: {
        celular: '##########'
      },
      snackbar: {
        visualizar: false,
        mensaje: '',
        color: 'success'
      }
    }),
    methods: {
      cancel(){
        if (this.dialogParam) {
          this.$emit('dialogChanged', false)
          firebase.auth().signOut()
        } else {
          this.$emit('dialogChanged', false)
          this.$router.push("/dashboard/welcome")
        }
      },
      mostrarMensaje(mensaje, color) {
        this.snackbar.visualizar = true
        this.snackbar.mensaje = mensaje
        this.snackbar.color = color
      },
        cargarDatosPersonales(uid) {
        this.$axios
          .get('https://restcountries.eu/rest/v2/all')
          .then((response) => {
            this.paises = response.data
          })
        let starCountRef = firebase.database().ref("/personalInformation/" + uid)
        let self = this
        starCountRef.on('value', function (snapshot) {
          let val = JSON.stringify(snapshot.val())
          if (snapshot.val() != null && snapshot.val() != 'null') {
            self.$emit('dialogChanged', false)
          } else {
            self.$emit('dialogChanged', true)
          }
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
        })
      },
      actualizarDatosPersonales(uid) {
        var ref = firebase.database().ref("/personalInformation/" + uid)
        ref.set({
          celular: this.celular,
          fechaNacimiento: this.fechanacimiento,
          pais: this.pais,
          institucion: this.institucion,
          descripcion: this.descripcion
        })
      },
      actualizarUsuario() {
        let self = this
        var user = firebase.auth().currentUser
        user.updateProfile({
          displayName: self.name
        }).then(function () {
          self.actualizarDatosPersonales(user.uid)
          self.mostrarMensaje('Usuario actualizado de manera exitosa', 'success')
          self.$emit('dialogChanged', false)
        }).catch(function (error) {
          self.mostrarMensaje('Error al Actualiza el usuario', 'error')
        })
      }
    },
    mounted: function () {
      let self = this
      setTimeout(function(){
        var user = firebase.auth().currentUser
        if (user) {
          self.photo = user.photoURL ? user.photoURL : '@/assets/user.png'
          self.name = user.displayName ? user.displayName : ''
          self.email = user.email ? user.email : ''
          self.cargarDatosPersonales(user.uid)
        } else {
          firebase.auth().signOut();
        }
      }, 500)
    }
  }
</script>

<style scoped>
  @media screen and (max-width: 560px) {
    .v-autocomplete__content.v-menu__content, .v-autocomplete__content.v-menu__content .v-card {
      top: 400px !important;
    }
  }
</style>
