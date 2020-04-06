<template lang='pug'>
  section#login
    v-parallax(:src="require('@/assets/doc2.jpg')", height='800')
      v-layout(row='')
        v-flex(xs10='', offset-xs1, sm6='', offset-sm3='', md4='', offset-sm4='', style='    opacity: 0.9; padding-top: 50px;')
          v-card(height='200px')
            v-card-title.primary.white--text
              span.headline Iniciar...
              v-spacer
              v-menu(bottom='', left='')
                v-btn(icon='', slot='activator', dark='')
                  v-icon more_vert
                v-list
                  v-list-tile(v-for='(item, i) in items', :key='i', @click='')
                    v-icon(style='padding-right: 10px;') {{ item.icon }}
                    v-list-tile-title {{ item.title }}
            v-card
              v-container
                h3 {{ nombre }}
                v-flex(md12)
                  v-text-field(label='Usuario', append-icon='email')
                v-flex(md12)
                  v-text-field(name='input-10-1', label='Contraseña', hint='Ingrese un mínimo de 10 caracteres', v-model='password', min='10', :append-icon="e1 ? 'visibility' : 'visibility_off'", :append-icon-cb='() => (e1 = !e1)', :type="e1 ? 'password' : 'text'", counter='')
                v-flex(md12, style='padding-top: 10px;')
                  a Recuperar Contraseña
                v-flex(md12, style='padding-top: 10px; padding-bottom: 10px;')
                  v-divider
                v-layout(wrap, text-xs-center)
                  v-flex(md6)
                    v-btn(color="primary", @click.native="iniciarSesion")
                      | Iniciar Sesión
                  v-flex(md6)
                    v-btn(color="primary", @click.native="registrar")
                      | Registrarse
                v-flex(md12, style='padding-top: 10px; padding-bottom: 10px;')
                  v-divider
                v-flex(md12)
                  v-subheader Iniciar sesión con:
                v-layout(wrap, text-xs-center, text-md-center, text-lg-center, text-xl-center)
                  v-flex(md12)
                    fb-signin-button(:params='fbSignInParams',     @success='onSignInSuccess', @error='onSignInError')
                      | Sign in with Facebook
                    #firebaseui-auth-container
            template(v-if='registro')
              v-card
                v-container
                  v-subheader Registro:
                  v-text-field(label='Ingrese su correo')
                  v-flex(md12)
                    v-btn(color="primary", @click.native="cancelar")
                      | CANCELAR
  section#empresa
    v-container(grid-list-xl='')
      v-layout.my-5(row='', wrap='', justify-center='')
        v-flex(xs12='', sm4='')
          v-card.elevation-0.transparent
            v-card-title.layout.justify-center(primary-title='')
              .headline Empresa
            v-card-text
              | Somos una empresa ecuatoiana dedicada al desarrollo de soluciones tecnológicas, brindandote un servicio que permita facilitar tus tareas ya sean estas cotidianas o de tu trabajo.
        v-flex(xs12='', sm4='', offset-sm1='')
          v-card.elevation-0.transparent
            v-card-title.layout.justify-center(primary-title='')
              .headline Contáctanos
            v-card-text
              | Comunícate con nuestos asesores para mayor información.
            v-list.transparent
              v-list-tile
                v-list-tile-action
                  v-icon.primary--text phone
                v-list-tile-content
                  v-list-tile-title 777-867-5309
              v-list-tile
                v-list-tile-action
                  v-icon.primary--text place
                v-list-tile-content
                  v-list-tile-title Cuenca, Ecuador
              v-list-tile
                v-list-tile-action
                  v-icon.primary--text email
                v-list-tile-content
                  v-list-tile-title jugiros1@hotmail.com
  v-footer.primary.footer_Style(dark='', height='auto', style='font-family: Roboto,sans-serif; z-index: 101  ;')
    v-card.flex(flat='', tile='')
      v-card-title(style='height: 35px;')
        strong.subheading Esta página esta destinada al servicio de los docentes.
        v-spacer
        v-btn.mx-3(v-for='icon in icons', :key='icon', dark='', icon='')
          v-icon(size='24px') {{ icon }}
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        title: 'DOCENTES'
      }
    }
  };
</script>
