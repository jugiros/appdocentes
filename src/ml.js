import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'

Vue.use(MLInstaller)

export default new MLCreate({
  initial: 'español',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('español').create({
      title: 'Hello {0}!',
      msg: 'You have {f} friends and {l} likes',
      general: {
        buscar: 'BUSCAR',
        salir: 'SALIR',
        cancelar: 'CANCELAR',
        aceptar: 'ACEPTAR',
        actualizar: 'ACTUALIZAR',
        cerrar: 'CERRAR'
      },
      dashboard: {
        titulo: 'DOCENTES',
        menu: 'MENU',
        desplegar: 'DESPLEGAR',
        ocultar: 'OCULTAR',
        administrar: 'ADMINISTRAR',
        bienvenido: 'BIEVENIDO',
        comunidad: 'Comunidad',
        publicaciones: 'Publicaciones',
        mispublicaciones: 'Mis Publicaciones',
        estadisticas: 'Estadísticas',
        misestadisticas: 'Mis Estadísticas',
        tutoriales: 'Tutoriales',
        mistutoriales: 'Mis Tutoriales',
        editPerfil: 'Editar Perfil',
        hblChat: 'Habilitar Chat',
        hblPromociones: 'Habilitar Promociones',
        hblAnuncios: 'Habilitar Anunios',
        cancelCta: 'CANCELAR CUENTA',
        anuncios: 'Anuncios',
        chat: 'Chat',
        promociones: 'Promociones',
        portafolio: 'Portafolio'
      },
      welcome: {
        msgPerfil: 'Por favor complete la información del perfil de usuario.',
        msgCompartir: 'Click para compartir',
        lblCompartir: '¿Que vas a Compartir?',
        txtCompartir: 'Compartir',
        descargar: 'Descargar'
      },
      perfil: {
        nombre: 'Nombre',
        email: 'E-mail',
        celular: 'Celular',
        fecNacimiento: 'Fecha de Nacimiento',
        pais: 'País',
        institucion: 'Institución',
        descripcion: 'Descripción:'
      }
    }),

    new MLanguage('english').create({
      title: 'Oi {0}!',
      msg: 'Você tem {f} amigos e {l} curtidas',
      general: {
        buscar: 'SEARCH',
        salir: 'EXIT',
        cancelar: 'CANCEL',
        aceptar: 'ACCEPT',
        actualizar: 'UPDATE',
        cerrar: 'CLOSE'
      },
      dashboard: {
        titulo: 'TEACHERS',
        menu: 'MENU',
        desplegar: 'DEPLOY',
        ocultar: 'HIDE',
        administrar: 'MANAGE',
        bienvenido: 'WELCOME',
        comunidad: 'Community',
        publicaciones: 'Publications',
        mispublicaciones: 'My Publications',
        estadisticas: 'Statistics',
        misestadisticas: 'My Statistics',
        tutoriales: 'Tutorials',
        mistutoriales: 'My Tutorials',
        editPerfil: 'Edit profile',
        hblChat: 'Enable Chat',
        hblPromociones: 'Enable Promotions',
        hblAnuncios: 'Enable Ads',
        cancelCta: 'CANCEL ACCOUNT',
        anuncios: 'Ad',
        chat: 'Chat',
        promociones: 'Promotions',
        portafolio: 'Portfolio'
      },
      welcome: {
        msgPerfil: 'Please complete the user profile information.',
        msgCompartir: 'Click to share',
        lblCompartir: 'What are you going to share?',
        txtCompartir: 'Share',
        descargar: 'Download'
      },
      perfil: {
        nombre: 'Name',
        email: 'E-mail',
        celular: 'Cell phone',
        fecNacimiento: 'Birthdate',
        pais: 'Country',
        institucion: 'Institution',
        descripcion: 'Description:'
      }
    })
  ],
  middleware: (component, path) => {
    // you can mutate path here
    // you should return path updated
    return path
  }
})
