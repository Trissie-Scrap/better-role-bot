<template>
  <v-flex>
    <v-img class="flasher" :src="require('../assets/BetterRoleBot_Icon.svg')" />
  </v-flex>
</template>

<script>
export default {
  name: 'FlipLogo',
  data () {
    return { }
  },
  methods: { }

}
</script>

<style scoped>

.flasher {
  animation-name: bounce;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 5s;
}

.flasher:hover {
  animation-name: spin;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 2s;
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
