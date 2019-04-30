<template>
  <div>
    <v-layout
      row
      justify-center
    >
      <v-flex
        xs4
      >
        <FlipLogo />
      </v-flex>
    </v-layout>

    <v-layout
      justify-center
      row
    >

      <h4>Put some instructions on this page for using the bot or adding to guild</h4>

    </v-layout>

    </div>
</template>

<script>
import FlipLogo from '@/components/Home/AnimLogo'

export default {
  name: 'Home',
  components: {
    FlipLogo
  }
}
</script>
