<template>
  <div>
    <v-layout
      justify-center
    >
      <v-flex
        xs4
      >
        <v-img :src="require('../assets/BetterRoleBot_Icon.svg')" />
      </v-flex>
    </v-layout>

    <v-layout
      justify-center
    >

      <DiscordLogin />

    </v-layout>

    </div>
</template>

<script>
import DiscordLogin from '../components/login'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    DiscordLogin
  },
  computed: {
    ...mapGetters('users', ['isLoggedIn']),
    ...mapState('users', {
      loggedInUser: state => state.me
    })
  }
}
</script>
