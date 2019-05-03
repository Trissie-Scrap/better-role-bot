<template>
  <div>
    <v-layout
      flex-child
      wrap
    >

      <v-flex
        xs3
      >
        <v-sheet
          class="d-flex"
          color="primary"
          height="160"
        >Primary</v-sheet>
      </v-flex>

      <v-flex
        xs3
      >
        <v-sheet
          class="d-flex"
          color="secondary"
          height="160"
        >Secondary</v-sheet>
      </v-flex>

      <v-flex
        xs3
      >
        <v-sheet
          class="d-flex"
          color="accent"
          height="160"
        >Accent</v-sheet>
      </v-flex>

      <v-flex
        xs3
      >
        <v-sheet
          class="d-flex"
          color="error"
          height="160"
        >Error</v-sheet>
      </v-flex>

    </v-layout>

    <v-layout
      flex-child
      wrap
    >

      <v-flex
        xs4
      >
        <v-sheet
          class="d-flex"
          color="warning"
          height="160"
        >Warning</v-sheet>
      </v-flex>

      <v-flex
        xs4
      >
        <v-sheet
          class="d-flex"
          color="info"
          height="160"
        >Info</v-sheet>
      </v-flex>

      <v-flex
        xs4
      >
        <v-sheet
          class="d-flex"
          color="success"
          height="160"
        >Success</v-sheet>
      </v-flex>

    </v-layout>

    <v-layout wrap justify-center>
      <DiscordLogin v-if="!isLoggedIn" />
      <div v-else>
        <p>
          Hello {{ loggedInUser.username }}
        </p>
      </div>

      <DiscordLogin v-if="!isLoggedIn" as-admin />
      <div v-else>
        <p>
          Hello {{ loggedInUser.username }}
        </p>
      </div>
    </v-layout>

    <v-layout
      wrap
      flex-child
    >
      <v-flex>
        <v-img max-width="512" :src="require('../assets/BetterRoleBot_Icon.svg')" />
      </v-flex>

      <v-flex>
        <v-img max-width="512" :src="require('../assets/BetterRoleBot_Icon_NoBg.svg')" />
      </v-flex>

      <v-flex>
        <FlipLogo :use-as-load="false" />
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <DiscordLogin as-admin/>
    </v-layout>

    <v-layout justify-center wrap>
      <v-flex xs10>
        <FlipLogo use-as-load />
      </v-flex>
      <v-flex xs12>
        <v-btn block @click="hasConnection = !hasConnection">
          <v-icon left>mdi-hexagon-{{ hasConnection ? 'outline' : 'slice-6' }}</v-icon>
          Click to test internettiness
          <v-icon right>mdi-hexagon-{{ hasConnection ? 'outline' : 'slice-6' }}</v-icon>
        </v-btn>
        <SnackBar :color="'error'" :show="hasConnection" >
          <v-flex class="text title" text-xs-center>
            You appear to be lacking an internet connection...<br />
            You're going to need that
          </v-flex>
        </SnackBar>
      </v-flex>
    </v-layout>
    <br />
  </div>
</template>

<style scoped>

</style>

<script>
import DiscordLogin from '@/components/Home/DiscordLogin'
import { mapGetters, mapState } from 'vuex'
import FlipLogo from '@/components/Home/AnimLogo.vue'
import SnackBar from '@/components/Home/SnackBar.vue'
// import ManageGuild from '@/components/User/UserManageGuild.vue'

export default {
  name: 'Tester',
  components: {
    DiscordLogin,
    FlipLogo,
    SnackBar // ,
    // ManageGuild
  },
  data () {
    return { hasConnection: true }
  },
  computed: {
    ...mapGetters('users', ['isLoggedIn']),
    ...mapState('users', {
      loggedInUser: state => state.me
    })
  }
}
</script>
