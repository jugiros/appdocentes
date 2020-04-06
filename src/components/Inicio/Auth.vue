<template>
  <div id="page">
    <v-btn fixed dark fab bottom right color="pink" v-scroll-to="'#inicio'">
      <v-icon>navigation</v-icon>
    </v-btn>
    <v-navigation-drawer dark="" fixed="" :clipped="clipped" v-model="drawer" app="" style="opacity: 0.9; z-index: 100; max-height: 100% !important;">
      <v-list>
        <v-btn class="white--text" flat="">Inicio</v-btn>
        <br>
        <v-btn class="white--text" flat="">Iniciar Sesión</v-btn>
        <br>
        <v-btn class="white--text" flat="">Promosiones</v-btn>
        <br>
        <v-btn class="white--text" flat="">Soluciones</v-btn>
        <br>
        <v-btn class="white--text" flat="">Empresa</v-btn>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="primary white--text"><span class="headline">Iniciar...</span>
          <v-spacer></v-spacer>
          <v-menu bottom="" left="">
            <v-btn icon="" slot="activator" dark="">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(item, i) in items" :key="i">
                <v-icon style="padding-right: 10px;">{{ item.icon }}</v-icon>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-container style="width: 100%;">
          <!--<h3>{{ nombre }}</h3>-->
          <!--<v-flex md12="md12">-->
            <!--<v-text-field label="Usuario" v-model="userSign" append-icon="email"></v-text-field>-->
          <!--</v-flex>-->
          <!--<v-flex md12="md12">-->
            <!--<v-text-field name="input-10-1" label="Contraseña" hint="Ingrese un mínimo de 10 caracteres" v-model="passwordSign" min="10" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() =&gt; (e1 = !e1)" :type="e1 ? 'password' : 'text'" counter=""></v-text-field>-->
          <!--</v-flex>-->
          <!--<v-flex md12="md12" style="padding-top: 10px;"><a>Recuperar Contraseña</a></v-flex>-->
          <!--<v-flex md12="md12" style="padding-top: 10px; padding-bottom: 10px;">-->
            <!--<v-divider></v-divider>-->
          <!--</v-flex>-->
          <!--<v-layout wrap="wrap" text-xs-center="text-xs-center">-->
            <!--<v-flex md6="md6">-->
              <!--<v-btn color="primary" @click.native="onSignin">Iniciar Sesión</v-btn>-->
            <!--</v-flex>-->
            <!--<v-flex md6="md6">-->
              <!--<v-btn color="primary" @click.native="registrar">Registrarse</v-btn>-->
            <!--</v-flex>-->
          <!--</v-layout>-->
          <v-flex md12="md12" style="padding-top: 10px; padding-bottom: 10px;">
            <v-divider></v-divider>
          </v-flex>
          <v-layout wrap="wrap" text-xs-center="text-xs-center" text-md-center="text-md-center" text-lg-center="text-lg-center" text-xl-center="text-xl-center">
            <v-flex md12="md12">
              <div class="text-xs-center" style="padding: 10px;">
                <v-btn style=" min-width: 201px;" round color="red" dark :disabled="loading" :loading="loading" @click.prevent="onSigninGoogle">Iniciar con Google
                  <v-icon right dark>lock_open</v-icon>
                  <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                </v-btn>
              </div>
              <div class="text-xs-center" style="padding: 10px;">
                <v-btn style=" min-width: 201px;" round color="primary" dark :disabled="loading" :loading="loading" @click.prevent="onSigninFacebook">Iniciar con Facebook
                  <v-icon right dark>lock_open</v-icon>
                  <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                </v-btn>
              </div>
              <div class="text-xs-center" style="padding: 10px;">
                <v-btn style=" min-width: 201px;" round dark :disabled="loading" :loading="loading" @click.prevent="onSigninGithub">Iniciar con Github
                  <v-icon right dark>lock_open</v-icon>
                  <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                </v-btn>
              </div>
              <div class="text-xs-center" style="padding: 10px;">
                <v-btn style=" min-width: 201px;" round color="info" dark :disabled="loading" :loading="loading" @click.prevent="onSigninTwitter">Iniciar con Twitter
                  <v-icon right dark>lock_open</v-icon>
                  <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                </v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
        <template v-if="registro">
          <v-card>
            <v-container style="width: 100%;">
              <v-flex md12="md12">
                <v-text-field label="Usuario" v-model="userRegister" append-icon="email"></v-text-field>
              </v-flex>
              <v-flex md12="md12">
                <v-text-field type="password" label="Contraseña" v-model="passwordRegister" min="10" append-icon="visibility"></v-text-field>
              </v-flex>
              <v-flex md12="md12">
                <v-text-field type="password" label="Repetir Contraseña" v-model="passwordRegisterConfirm" min="10" append-icon="visibility"></v-text-field>
              </v-flex>
              <v-layout wrap row>
                <v-flex md6 text-xs-center="text-xs-center">
                  <v-btn @click.native="cancelar">CANCELAR</v-btn>
                </v-flex>
                <v-flex md6>
                  <v-btn color="primary" @click.native="onSignup">INICIAR</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </template>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">
            Salir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <section id="inicio">
      <nav class="colorlib-nav" role="navigation">
        <div id="navscroll" class="top-menu" style="padding: 0px; transition: all 0.5s ease;">
          <div class="container">
            <div class="row">
              <div class="col-xs-1">
                <v-btn class="v-btn__content_view" flat icon @click.native.stop='drawer = !drawer' data-aos='fade-right' data-aos-delay='300'>
                  <v-icon>menu</v-icon>
                </v-btn>
              </div>
              <div class="col-md-2">
                <div id="colorlib-logo"><a data-aos='zoom-in' data-aos-delay='500' href="index.html">DOCFILES</a></div>
              </div>
              <div class="col-md-9 text-right menu-1">
                <ul>
                  <li class="active"><a data-aos='zoom-in' data-aos-delay='100' v-scroll-to="'#inicio'">Inicio</a></li>
                  <li><a data-aos='zoom-in' data-aos-delay='700' v-scroll-to="'#news'">Noticias</a></li>
                  <li><a data-aos='zoom-in' data-aos-delay='300' v-scroll-to="'#services'">Servicios</a></li>
                  <li><a data-aos='zoom-in' data-aos-delay='400' v-scroll-to="'#suscribe'">Suscríbete</a></li>
                  <li><a data-aos='zoom-in' data-aos-delay='500' v-scroll-to="'#contacts'">Contactos</a></li>
                  <li><a data-aos='zoom-in' data-aos-delay='600' v-scroll-to="'#portfolio'">Opiniones</a></li>
                  <li class="btn-cta"><a data-aos='fade-up' data-aos-delay='800' href="#" @click="dialog = true"><span>Iniciar Sesión</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>

    <v-carousel>
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" interval="1000">
        <div class="container-fluid" style="padding-top: 100px;">
          <div class="row">
            <div class="col-md-8 col-sm-12 col-md-offset-2 slider-text">
              <div class="slider-text-inner text-center">
                <h1 data-aos='fade-up' data-aos-delay='500' style="color: white; font-weight: 800; font-family: Montserrat, Helvetica;">Todo lo que necesitas, lo encuentras aquí!</h1>
                <p><a data-aos='fade-up' data-aos-delay='500' @click="dialog = true" class="btn btn-primary btn-lg btn-learn">Registrate</a></p>
              </div>
            </div>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
<section id="news">
      <div class="colorlib-blog colorlib-light-grey">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center colorlib-heading animate-box">
              <h2 data-aos='fade-down' data-aos-delay='300'>NOTICIAS RECIENTES</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 animate-box">
              <article class="article-entry" data-aos='fade-right' data-aos-delay='300'>
                <a  class="blog-img" :style="{ backgroundImage: `url('${image}')` }">
                  <p class="meta"><span class="day">23</span><span class="month">Oct</span></p>
                </a>
                <div class="desc" data-aos='fade-left' data-aos-delay='50'>
                  <h2><a>Quiero Ser Maestro 6</a></h2>
                  <p class="admin"><span>Posted by:</span> <span>Mao Tene</span></p>
                  <p>El proceso QUIERO SER MAESTRO 6 se encuentra en la etapa de ELEGIBILIDAD, aun no se conoce un pronunciamiento oficial de cuando empieza la otra etapa del concurso. </p>
                </div>
              </article>
            </div>
            <div class="col-md-6">
              <div class="f-blog animate-box" data-aos='fade-left' data-aos-delay='100'>
                <a  class="blog-img" :style="{ backgroundImage: `url('${image}')` }">
                </a>
                <div class="desc">
                  <h2><a >Como inscribirse en el concurso</a></h2>
                  <p class="admin"><span>23 Octubre 2018</span></p>
                  <p>Todos los aspirantes que hayan alcanzado el puntaje minimo podran inscribirse al concurso de meritos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="services">
      <div id="colorlib-services">
        <div class="container">
          <div class="row">
            <div class="col-md-3 text-center animate-box" data-aos='zoom-in' data-aos-delay='100'>
              <div class="services">
							<span class="icon">
								<i class="flaticon-books"></i>
							</span>
                <div class="desc">
                  <h3>Material Educativo</h3>
                  <p>Encuentra gran variedad de material para las diferentes áreas del conocimiento</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 text-center animate-box" data-aos='zoom-in' data-aos-delay='300'>
              <div class="services">
							<span class="icon">
								<i class="flaticon-professor"></i>
							</span>
                <div class="desc">
                  <h3>Red Social</h3>
                  <p>Contacta, comparte y chatea con tus colegas para agrandar nuestra red de  conocimientos</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 text-center animate-box" data-aos='zoom-in' data-aos-delay='500'>
              <div class="services">
							<span class="icon">
								<i class="flaticon-book"></i>
							</span>
                <div class="desc">
                  <h3>Tutoriales</h3>
                  <p>Encuentra y comparte Tutoriales sobre tu profesión.</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 text-center animate-box" data-aos='zoom-in' data-aos-delay='700'>
              <div class="services">
							<span class="icon">
								<i class="flaticon-diploma"></i>
							</span>
                <div class="desc">
                  <h3>Brinda Servicios</h3>
                  <p>Usa nuestra plataforma para brindar servicios a la comunidad y saca beneficio de tu vocacion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contacts">
      <v-container grid-list-xl="">
        <v-layout class="my-5" row="" wrap="" justify-center="">
          <v-flex xs12="" sm4="">
            <v-card class="elevation-0 transparent">
              <v-card-title class="layout justify-center" primary-title="">
                <div data-aos='fade-down' data-aos-delay='100' class="headline">Empresa</div>
              </v-card-title>
              <v-card-text data-aos='fade-up' data-aos-delay='300'>Somos una empresa ecuatoiana dedicada al desarrollo de soluciones tecnológicas, para facilitar todas tus tareas. Contamos con servicio de Software dedicado y personalizado a tu medida. Tambien brindamos asesoria en los temas que requieras.</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12="" sm4="" offset-sm1="">
            <v-card class="elevation-0 transparent">
              <v-card-title class="layout justify-center" primary-title="">
                <div data-aos='fade-down' data-aos-delay='100' class="headline">Contáctanos</div>
              </v-card-title>
              <v-card-text data-aos='fade-left' data-aos-delay='300'>Comunícate con nuestos asesores para mayor información.</v-card-text>
              <v-list class="transparent">
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="primary--text" data-aos='flip-left' data-aos-delay='100'>phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title data-aos='fade-left' data-aos-delay='100'>099-898888</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="primary--text" data-aos='flip-left' data-aos-delay='300'>place</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title data-aos='fade-left' data-aos-delay='300'>Cuenca, Ecuador</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="primary--text" data-aos='flip-left' data-aos-delay='500'>email</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title data-aos='fade-left' data-aos-delay='500'>jugiros1@hotmail.com</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section id="portfolio">
      <v-parallax class="subs-img" :src="require('@/assets/images/img_bg_2.jpg')" height="auto">
        <v-carousel>
          <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center colorlib-heading animate-box">
              <h2 data-aos='fade-down' data-aos-delay='300' style="color: white;">¿Que opinand de nuestro sitio?</h2>
            </div>
          </div>
          <v-carousel-item>
            <v-layout wrap row justify-center>
              <v-flex md6>
                <blockquote>
                  <span style="color: white" data-aos='fade-up' data-aos-delay='300'>Juan Perez</span>
                  <p style="color: white" data-aos='fade-up' data-aos-delay='300'>Muy buen contenido. Siempre aportando material nuevo y de mucha ayuda para las labores de los docentes. ¡Exitos, sigan adelante!.</p>
                </blockquote>
              </v-flex>
            </v-layout>
            <v-layout wrap row justify-center>
              <div md4 style="padding-top: 20px;">
                <v-avatar size="100" data-aos='fade-up' data-aos-delay='300'>
                  <img src="@/assets/images/person1.jpg" alt="John">
                </v-avatar>
              </div>
            </v-layout>
          </v-carousel-item>
          <v-carousel-item>
            <v-layout wrap row justify-center>
              <v-flex md6>
                <blockquote>
                  <span style="color: white" data-aos='fade-up' data-aos-delay='300'>Hilda Zh.</span>
                  <p style="color: white" data-aos='fade-up' data-aos-delay='300'>Me parece muy bueno el material que aqui se comparte. A demás siempre estan al dia con las novedades y te ayudan en cualquier requeriiento.</p>
                </blockquote>
              </v-flex >
            </v-layout>
            <v-layout wrap row justify-center>
              <div md4 style="padding-top: 20px;">
                <v-avatar size="100" data-aos='fade-up' data-aos-delay='300'>
                  <img src="@/assets/images/person2.jpg" alt="John">
                </v-avatar>
              </div>
            </v-layout>
          </v-carousel-item>

        </v-carousel>
      </v-parallax>
    </section>

    <footer id="colorlib-footer">
      <div class="container">
        <div class="row row-pb-md">
            <div class="col-md-3 colorlib-widget">
            <h4>Acerca de DOCFILES</h4>
            <p>En esta plataforma podras encontrar y compartir toda clase de material referente a la docencia. A demás cuentas con la red social en donde podras interactuar con tus colegas</p>
            <ul class="colorlib-social-icons">
              <li><a href="#"><i class="icon-twitter"></i></a></li>
              <li><a href="#"><i class="icon-facebook"></i></a></li>
              <li><a href="#"><i class="icon-linkedin"></i></a></li>
              <li><a href="#"><i class="icon-dribbble"></i></a></li>
            </ul>
          </div>



          <div class="col-md-3 colorlib-widget">
            <h4>Contact Info</h4>
            <ul class="colorlib-footer-links">
              <li>291 South 21th Street, <br> Suite 721 New York NY 10016</li>
              <li><a href="tel://1234567920"><i class="icon-phone"></i> + 1235 2355 98</a></li>
              <li><a href="mailto:info@yoursite.com"><i class="icon-envelope"></i> info@yoursite.com</a></li>
              <li><a href="http://luxehotel.com"><i class="icon-location4"></i> yourwebsite.com</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="copy">
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center">
              <p>
                <small class="block">Copy right &copy; All rights reserved | jugiros</small><br>
                <small class="block">Demo Images: <a href="http://unsplash.co/" target="_blank">Unsplash</a>, <a href="http://pexels.com/" target="_blank">Pexels</a></small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import firebaseui from 'firebaseui'
  import {config} from '../../helpers/firebaseConfig';

  export default {
    name: 'auth',
    data() {
      return {
        userSign: '',
        passwordSign: '',
        userRegister: '',
        passwordRegister: '',
        passwordRegisterConfirm: '',
        clipped: true,
        dialog: false,
        drawer: false,
        title: 'DOCENTES',
        friends: 5,
        image: require('@/assets/images/blog-1.jpg'),
        image2: require('@/assets/images/blog-2.jpg'),
        image3: require('@/assets/images/blog-3.jpg'),
        icons: [
          'fab fa-facebook',
          'fab fa-twitter',
          'fab fa-google-plus',
          'fab fa-linkedin',
          'fab fa-instagram'
        ],
        fbSignInParams: {
          scope: 'email,user_likes',
          return_scopes: true
        },
        e1: true,
        registro: false,
        items: [
          {
            src:require('@/assets/images/doc1.jpeg')
          }
        ],
        nombre: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/dashboard/welcome')
        }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {email: this.userSign, password: this.passwordSign})
      },
      onSignup () {
        if (this.passwordRegister === this.passwordRegisterConfirm) {
          this.$store.dispatch('signUserUp', {email: this.userRegister, password: this.passwordRegister})
        } else {
          alert('Las contraseñas deben coincidir revisar método')
        }
      },
      onSigninGoogle () {
        this.$store.dispatch('signUserInGoogle')
      },
      onSigninFacebook () {
        this.$store.dispatch('signUserInFacebook')
      },
      onSigninGithub () {
        this.$store.dispatch('signUserInGithub')
      },
      onSigninTwitter () {
        this.$store.dispatch('signUserInTwitter')
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      iniciarSesion() {
        this.inicio = false
      },
      registrar() {
        this.registro = true
      },
      cancelar() {
        this.registro = false
      },
      onSignInSuccess(response) {
        FB.api('/me', dude => {
          this.$router.push('/dashboard/welcome')
        })
      },
      onSignInError(error) {
      }
    },
    mounted() {
      var uiConfig = {
        signInSuccessUrl: '/dashboard/welcome',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
      };
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
      document.getElementById('navscroll').classList.add('displayTransparent')
      window.onscroll = function () {
        if (window.pageYOffset > 200) {
          console.log('1')
          if (document.getElementById('navscroll')) {
            document.getElementById('navscroll').classList.add('navbarFix')
          }
        } else {
          console.log('2')
          if (document.getElementById('navscroll')) {
            document.getElementById('navscroll').classList.remove('navbarFix')
          }
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/css/bootstrap.css';
  @import '../../assets/css/style.css';
  @import '../../assets/fonts/flaticon/font/flaticon.css';
</style>

<style scoped>
  .navbarFix {
    margin-top: -50px;
    position: fixed;
    background: #fff;
    z-index: 3;
    width: 100%;
    height: auto;
  }
  .v-parallax__content {
    background: rgba(0, 0, 0, 0.5);
  }
  .v-expansion-panel__header {
    transition:all 1s ease;
  }
  .v-expansion-panel__header:hover {
    background: #000;
    color: #fff;
  }
  .v-btn__content_view {
    display: none !important;
  }
  @media screen and (max-width: 560px) {
    .v-btn__content_view {
      display: block !important;
    }
  }
</style>
