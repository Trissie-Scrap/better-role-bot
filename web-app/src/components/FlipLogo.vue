<template>
  <v-flex>
    <section>
      <v-img class="flasher" :src="require('../assets/BetterRoleBot_Icon.svg')" />
    </section>
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
section {
  position: relative;
}

section v-img {
  position: absolute
}

.flasher {
  animation-name: fade;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 5s;
}
@keyframes fade {
  0% {
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

  70% {
    transform: rotateZ(-1.5deg);
  }

  75% {
    transform: rotateZ(1.5deg);
  }

  80% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: translateY(0%);
  }

}
</style>
