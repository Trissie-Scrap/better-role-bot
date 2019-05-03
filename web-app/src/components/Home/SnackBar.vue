<template>
  <v-snackbar
    v-model="show"
    :color="currentColour"
    :timeout="0"
    multi-line
  >
    <v-layout>
      <slot />
    </v-layout>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  props: ['show', 'color'],
  data () {
    return {
      snackbar: false,
      showBar: this.show,
      currentColour: this.color
    }
  }
}
</script>
