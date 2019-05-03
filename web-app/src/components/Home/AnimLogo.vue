<template>
  <v-flex>
    <v-img :max-height="load ? '70%' : null" :class="load ? 'spinner' : 'bouncer'" :src="require('@/assets/BetterRoleBot_Icon.svg')" />
  </v-flex>
</template>

<script>
// import Anime from 'animejs'

export default {
  name: 'FlipLogo',
  props: { useAsLoad: Boolean },
  data () {
    return {
      load: this.useAsLoad === true
    }
  }
}

</script>

<style scoped>
.bouncer {
  animation-name: bounce;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 5s;
}

.spinner {
  animation-name: spin;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 4s;
}

@keyframes spin {
  0% {
    transform: rotateY(0deg);
  }

  50% {
    transform: rotateY(180deg)
  }

  100% {
    transform: rotateY(0deg);
  }
}

@keyframes bounce {

  0% {
    opacity: 1;
    transform: translateY(0%);
  }

  35% {
    transform: translateY(0%);
  }

  50% {
    transform: translateY(-2.5%);
  }

  65% {
    transform: translateY(0%);
    transform: rotateZ(0deg);
  }

  71% {
    transform: rotateZ(-1deg);
  }

  74% {
    transform: rotateZ(1deg);
  }

  80% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: translateY(0%);
  }

}
</style>
