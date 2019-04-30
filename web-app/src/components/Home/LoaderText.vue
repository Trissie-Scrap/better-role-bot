<template>
  <v-flex text-xs-center><p>{{chosenString}}{{dots}}</p></v-flex>
</template>

<script>
export default {
  name: 'LoaderText',
  data () {
    return {
      chosenString: this.getNewRandomLoadString(),
      dots: ''
    }
  },
  methods: {
    getNewRandomLoadString: function () {
      return 'Just getting things ready'
    }
  },
  mounted () {
    setInterval(() => {
      this.dots = this.dots === '...' ? '' : this.dots + '.'
    }, 100)
  }
}
</script>

<style>

</style>
