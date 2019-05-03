<template >
  <v-flex
    xs12
    sm8
    md6
    my-4
  >
    <v-hover>
      <v-card
        color="#36393F"
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 8 : 2}`"
      >

        <v-card-title>
          <v-spacer />
          <v-icon large left>mdi-discord</v-icon>
          <span class="title font-weight-light">Login with Discord</span>
          <v-spacer />
        </v-card-title>

        <v-card-text class="text-xs-center">
          Sign in with Discord to fiddle with your roles <br /><br />
          <v-expansion-panel popout>
            <v-expansion-panel-content expand-icon="mdi-help-circle">
              <template v-slot:header>
                <div>Permissions we ask for</div>
              </template>
              <v-card>
                <v-card-text>
                  We ask for your Username, User Avatar and the Guilds you're in.<br />
                  <ul>
                    <li> We use your Username to identify you in a Guild</li>
                    <li> We use your avatar to improve your experience (So we can display it on your page).</li>
                    <li> We need to know what Guilds you're in so we can keep things up to date on our end.</li>
                  </ul>
                  We also store cookies on your device to ensure function when redirecting you.
                  By authorising this app, you consent to the use of cookies.
                  This authorisation can be revoked by deleting cookies from your browser,
                  however it may cause the app to stop working
                  <div v-if="showAdminText" >
                    Because you're logging in as an admin, we will also retrieve the following info from this guild:<br />
                    <ul>
                      <li>Guild name &mdash; We need this so your users know what guild they're editing their roles for</li>
                      <li>Guild roles &mdash; Do you really need to ask? Yes? So you can view and edit them here</li>
                      <li>Guild icon &mdash; Pretty UX is very important to us. It should be important to you too</li>
                    </ul>
                  </div>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>

        <v-card-actions>
          <v-btn color="#5440cd" large block @click="login($route.path)">Authorise this app</v-btn>
        </v-card-actions>

      </v-card>
    </v-hover>
  </v-flex>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DiscordLogin',
  props: { asAdmin: Boolean },
  data () {
    return {
      isLoggedIn: false,
      showAdminText: this.asAdmin === true
    }
  },
  methods: {
    ...mapActions('users', ['login'])
  }
}
</script>

<style scoped>
.sidewaysIcon {
  transform: rotateZ(90deg);
}
</style>
