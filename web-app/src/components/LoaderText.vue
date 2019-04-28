<template>
  <p>{{chosenString}}</p>
</template>

<script>
export default {
  name: 'LoaderText',
  data () {
    return {
      chosenString: this.getNewRandomLoadString()
    }
  },
  methods: {
    getNewRandomLoadString: function () {
      return 'Just getting things ready...'
    }
  }
}
</script>

<style>

</style>
