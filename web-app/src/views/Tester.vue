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

    <v-layout>
      <DiscordLogin v-if="!isLoggedIn" />
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
      <v-flex xs5>
        <ManageGuild />
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs10>
        <FlipLogo use-as-load />
      </v-flex>
    </v-layout>
    <br />
  </div>
</template>

<style scoped>

</style>

<script>
import DiscordLogin from '../components/Home/DiscordLogin'
import { mapGetters, mapState } from 'vuex'
import FlipLogo from '../components/Home/AnimLogo.vue'
import ManageGuild from '../components/User/UserManageGuild.vue'

export default {
  name: 'Tester',
  components: {
    DiscordLogin,
    FlipLogo,
    ManageGuild
  },
  computed: {
    ...mapGetters('users', ['isLoggedIn']),
    ...mapState('users', {
      loggedInUser: state => state.me
    })
  }
}
</script>
