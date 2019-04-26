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

      <DiscordLogin />

    </v-layout>

    </div>
</template>

<script>
import DiscordLogin from '../components/login'
import FlipLogo from '../components/FlipLogo'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    DiscordLogin,
    FlipLogo
  },
  computed: {
    ...mapGetters('users', ['isLoggedIn']),
    ...mapState('users', {
      loggedInUser: state => state.me
    })
  }
}
</script>
