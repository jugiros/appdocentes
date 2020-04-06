<template lang="pug">
  file-manager

</template>

<script>



  export default {
    components: {

    },

    data: () => ({
    //    csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),

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
    }
  };

</script>

