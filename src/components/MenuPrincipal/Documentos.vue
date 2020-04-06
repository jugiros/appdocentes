<template lang='pug'>
  v-layout(wrap='')
    v-card
      v-layout(wrap='')
        v-flex(md6, v-for='card in cards', v-bind='{ [`xs${card.flex}`]: true }', :key='card.photour')
          v-flex(md12='', offset-sm1, v-for='archivos in card.data.archivos',:key='archivos.url')
            img(:src = 'archivos.url', alt='' ,style='width: 250px; height: 200px;')
            v-flex(xs12='')
            v-tooltip(bottom='', color='primary')
              v-btn(icon, slot='activator', @click='descaragrArchivo(archivos.url)')
                v-icon(color="primary") cloud_download
              span {{$ml.get('welcome.descargar')}}
            v-flex(xs12='')
            h3(v-text='archivos.titulo')
    v-snackbar(v-model='snackbar.visualizar', :bottom='true', :multi-line='true', :right='true', :color='snackbar.color  ')
      | {{ snackbar.mensaje }}
      v-btn(dark, flat='', @click='snackbar.visualizar = false')
        | Cerrar
</template>

<script>
  import firebase from 'firebase'

  export default {
    data: () => ({
      alert: true,
      arrayArchivos: [],
      progressUpload: 0,
      file: File,
      uploadTask: '',
      cards: [],
      panel: [],
      items: 1,
      body: '',
      archivo: '',
      arrayPost: [],
      promesas: [],
      currentUser: null,
      compartir: '',
      snackbar: {
        visualizar: false,
        mensaje: '',
        color: 'success'
      }
    }),
    methods: {
      mostrarMensaje(mensaje, color) {
        this.snackbar.visualizar = true
        this.snackbar.mensaje = mensaje
        this.snackbar.color = color
      },
      detectFiles(fileList) {
        if (this.compartir != '') {
          this.arrayArchivos = []
          Array.from(Array(fileList.length).keys()).map(x => {
            self.archivo = fileList[x]
            this.upload(fileList[x])
          })
          Promise.all(this.promesas).then(values => {
            var ref = firebase.database().ref("post/")
            ref.push({
              data: {
                fecha: '2018/08/15',
                archivos: this.arrayArchivos,
                body: this.compartir,
                photour: this.currentUser.photoURL,
                createdBY: this.currentUser.uid
              }
            })
            this.mostrarMensaje('Publicación realizada de manera correcta.', 'success')
            this.compartir = ''
          }).catch(error => {
            this.mostrarMensaje('Error al subir los archivos.', 'error')
          })
        } else {
          this.mostrarMensaje('Porfavor ingrese una descripción de su publicación.', 'error')
        }
      },
      upload(file) {
        const storage = firebase.storage()
        this.uploadTask = storage.ref('imagenes/' + file.name).put(file);
        var pathReference = storage.ref('imagenes/' + file.name);
        let arrayChild = {}
        let self = this
        this.promesas.push(pathReference.getDownloadURL().then(function (url) {
          arrayChild['titulo'] = file.name
          arrayChild['url'] = url
          self.arrayArchivos.push(arrayChild)
        }))
      },
      descaragrArchivo(url) {
        window.open(url)
      },
      listPost() {
        let starCountRef = firebase.database().ref('post/')
        let self = this
        starCountRef.on('value', function (snapshot) {
          self.cards = snapshot.val()
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
    watch: {
      uploadTask: function () {
        this.uploadTask.on('state_changed', sp => {
            this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
          },
          null,
          () => {
            this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.$emit('url', downloadURL)
            })
          })
      }
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
  .expansion .application .theme--light.v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .header__icon .v-icon, .theme--light .v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .header__icon .v-icon {
    color: rgba(255, 255, 255, 1);
  }
  ::-webkit-file-upload-button {
    background: #1e801a;
    color: white;
    border: none;
    border-radius: 2px;
    height: 35.99px;
    padding-bottom: 3px;
    font-weight: bold;
    margin-left: 10px;
  }
  ::-webkit-file-upload-button:hover {
    background: #41803b;
  }
</style>
