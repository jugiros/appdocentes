<template lang="pug">
  v-layout(wrap)
    v-flex(xs12='')
      v-card
        v-carousel(hide-delimiters='', style="height: 200px;")
          v-carousel-item(v-for='(item,i) in items', :key='i', :src='item.src')
        v-card-title(primary-title='')
          div
            h3.headline.mb-0 Kangaroo Valley Safari
            div
              | Located two hours south of Sydney in the
              br
              | Southern Highlands of New South Wales, ...
        v-card-actions
          v-btn(flat='', color='orange') Compartir
          v-btn(flat='', color='orange') Explorar
    v-flex(xs12='')
      v-card
        v-carousel(hide-delimiters='', style="height: 200px;")
          v-carousel-item(v-for='(item,i) in items', :key='i', :src='item.src')
        v-card-title(primary-title='')
          div
            h3.headline.mb-0 Kangaroo Valley Safari
            div
              | Located two hours south of Sydney in the
              br
              | Southern Highlands of New South Wales, ...
        v-card-actions
          v-btn(flat='', color='orange') Compartir
          v-btn(flat='', color='orange') Explorar
    v-flex(xs12='')
      v-card
        v-carousel(hide-delimiters='', style="height: 200px;")
          v-carousel-item(v-for='(item,i) in items', :key='i', :src='item.src')
        v-card-title(primary-title='')
          div
            h3.headline.mb-0 Kangaroo Valley Safari
            div
              | Located two hours south of Sydney in the
              br
              | Southern Highlands of New South Wales, ...
        v-card-actions
          v-btn(flat='', color='orange') Compartir
          v-btn(flat='', color='orange') Explorar
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            src: 'https://www.upf.edu/documents/3151170/3151211/DSC9981web.jpg/5dfd9503-8374-4635-83bb-bff8e7c0e2d0?t=1452780157560'
          },
          {
            src: 'https://static-frm.ie.edu/university/wp-content/uploads/sites/6/2016/11/IMG_6827.jpg'
          },
          {
            src: 'https://universitariperfi.files.wordpress.com/2014/05/class.jpg'
          },
          {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfahbrcekXpf5nsmPzJX9lO5YncNoJdvbJzYbF3FBEt0ZNWAy9qQ'
          }
        ]
      }
    }
  }
</script>
