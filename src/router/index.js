import VueRouter from 'vue-router'
import Auth from '@/components/Inicio/Auth.vue'
import AuthSuccess from '@/components/Inicio/AuthSuccess.vue'
import Dashboard from '@/components/Dashboard.vue'
import Welcome from '@/components/MenuPrincipal/WelcomeView.vue'
import Publicaciones from '@/components/MenuPrincipal/PublicacionesView.vue'
import Perfil from '@/components/Administrar/Perfil.vue'
import Estadisticas from '@/components/MenuPrincipal/EstadisticasView.vue'
import Comunidad from '@/components/MenuPrincipal/ComunidadView.vue'
import Tutoriales from '@/components/MenuPrincipal/TutorialesView.vue'
import Portafolio from '@/components/MenuPrincipal/PortafolioView.vue'
import MisTutoriales from '@/components/Personales/MisTutorialesView.vue'
import MisPublicaciones from '@/components/Personales/MisPublicacionesView.vue'
import MisEstadisticas from '@/components/Personales/MisEstadisticasView.vue'
import Detalles from '@/components/MenuPrincipal/detalles.vue'
import ChatMessaging from '@/components/Chat/ChatMessaging.vue'
import Documentos from '@/components/MenuPrincipal/Documentos.vue'

import Vue from 'vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Auth },
    { path: '/auth', component: Auth },
    { path: '/success', component: AuthSuccess },
    { path: '/messaging', name: 'ChatMessaging', component: ChatMessaging },
    { path: '/dashboard', component: Dashboard,
      children: [
        { path: 'welcome', name: 'welcome', component: Welcome },
        { path: 'portafolio', name: 'portafolio', component: Portafolio },
        { path: 'publicaciones', name: 'publicaciones', component: Publicaciones },
        { path: 'perfil', name: 'perfil', component: Perfil },
        { path: 'tutoriales', name: 'tutoriales', component: Tutoriales },
        { path: 'estadisticas', name: 'estadisticas', component: Estadisticas },
        { path: 'comunidad', name: 'comunidad', component: Comunidad },
        { path: 'mistutoriales', name: 'mistutoriales', component: MisTutoriales },
        { path: 'mispublicaciones', name: 'mispublicaciones', component: MisPublicaciones },
        { path: 'misestadisticas', name: 'misestadisticas', component: MisEstadisticas },
        { path: 'detalles', name: 'detalles', component: Detalles },
        { path: 'documentos', name: 'documentos', component: Documentos }
      ]
    }
  ]
})

export default router;

