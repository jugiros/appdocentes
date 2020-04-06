<template lang="pug">
  #e3.grey.lighten-3(style='margin: auto; padding-bottom: 20px;')
    v-toolbar(color='pink', dark='')
      v-toolbar-title Promociones
      v-spacer
      v-btn(icon='')
        v-icon search
    v-card
      v-container(fluid='', grid-list-lg='', style="padding: 10px !important;")
        v-layout(row='', wrap='')
          v-flex(xs12='')
            v-card.white--text(color='blue-grey darken-2')
              v-card-title(primary-title='')
                .headline Unlimited music now
                div
                  | Listen to your favorite artists and albums whenever and wherever, online and offline.
              v-card-actions
                v-btn(flat='', dark='') Listen now
          v-flex(xs12='')
            v-card.white--text(color='cyan darken-2')
              v-layout
                v-flex(xs5='')
                  v-card-media(src='https://cdn.vuetifyjs.com/images/cards/foster.jpg', height='125px', contain='')
                v-flex(xs7='')
                  v-card-title(primary-title='')
                    div
                      .headline Supermodel
                      div Foster the People
                      div (2014)
              v-divider(light='')
              v-card-actions.pa-3
                | Rate this album
                v-spacer
                v-icon star_border
                v-icon star_border
                v-icon star_border
                v-icon star_border
                v-icon star_border
          v-flex(xs12='')
            v-card.white--text(color='purple')
              v-layout(row='')
                v-flex(xs7='')
                  v-card-title(primary-title='')
                    div
                      .headline Halycon Days
                      div Ellie Goulding
                      div (2013)
                v-flex(xs5='')
                  v-card-media(src='https://cdn.vuetifyjs.com/images/cards/halcyon.png', height='125px', contain='')
              v-divider(light='')
              v-card-actions.pa-3
                | Rate this album
                v-spacer
                v-icon star_border
                v-icon star_border
                v-icon star_border
                v-icon star_border
                v-icon star_borde
</template>
