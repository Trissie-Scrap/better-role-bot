<template>
  <div>
    <h1 class="display-3">Manage Guild</h1>
    <div v-if="!isLoggedIn">
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

    <div v-else-if="!isGuildAdmin">
      <h1> You aren't an admin in this guild, you bleedin idiot </h1>
    </div>

    <div v-else>
      <v-layout
        justify-center
        row
        wrap
      >
        <v-flex md12>
          <v-card>
            <v-card-title>
              <h2 class="display-2">{{ this.selectedGuild.name }}</h2>
            </v-card-title>
            <v-card-text>
              {{ this.selectedGuild }}<br />
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md12>
          <v-card>
            <v-tabs
              grow
            >

              <v-tab ripple>
                Roles
              </v-tab>

              <v-tab ripple>
                Categories
              </v-tab>

              <v-tab-item>
                <v-card-text>
                  <AdminRoleViewer />
                </v-card-text>
              </v-tab-item>

              <v-tab-item>
                <v-card-text>
                  {{ this.selectedCategories }}
                </v-card-text>
              </v-tab-item>

            </v-tabs>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import DiscordLogin from '../components/DiscordLogin'
import FlipLogo from '../components/AnimLogo'
import { mapGetters, mapState, mapActions } from 'vuex'
import AdminRoleViewer from '../components/AdminRoleViewer'

export default {
  name: 'AdminFlow',
  components: {
    DiscordLogin,
    FlipLogo,
    AdminRoleViewer
  },
  created () {
    this.$watch(this.$route.params.snowflake, () => {
      this.fetchGuildData(this.$route.params.snowflake)
    }, { immediate: true })
  },
  computed: {
    ...mapGetters('users', ['isLoggedIn']),
    ...mapGetters('guilds', ['isGuildAdmin']),
    ...mapState('users', {
      loggedInUser: state => state.me
    }),
    ...mapState('guilds', {
      selectedGuild: state => state.selected.guild,
      selectedRoles: state => state.selected.roles,
      selectedCategories: state => state.selected.categories
    })
  },
  methods: {
    ...mapActions('guilds', ['fetchGuildData'])
  }
}
</script>
