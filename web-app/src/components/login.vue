<template>
  <v-flex
    xs10
    sm6
    md4
    my-4
  >
    <v-card
      color="#36393F"
    >

      <v-card-title>
        <v-spacer />
        <v-icon large left>mdi-discord</v-icon>
        <span class="title font-weight-light">Login with Discord</span>
        <v-spacer />
      </v-card-title>

      <v-card-text class="text-xs-center">
        Sign in with discord to fiddle with your roles
      </v-card-text>

      <v-card-actions>
        <v-btn color="#5440cd" large block @click="login($route.path)"><v-icon left>mdi-discord</v-icon> Authorise this app</v-btn>
      </v-card-actions>

    </v-card>
  </v-flex>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DiscordLogin',
  data () {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    ...mapActions('users', ['login'])
  }
}
</script>
