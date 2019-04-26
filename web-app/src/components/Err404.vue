<template>
  <v-container class="404">
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex>
        <h1>Error: Page not found {{ this.displayFace }}</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Err404',
  props: ['face'],
  data () {
    return { myFace: '' }
  },
  computed: {
    displayFace: function () {
      if (this.face === '' || this.face === null || this.face === undefined) {
        return ' ¯\\_(°~°)_/¯'
      } else {
        return this.face
      }
    }
  }
}
</script>
