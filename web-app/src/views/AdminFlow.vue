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
        <DiscordLogin as-admin />
      </v-layout>
    </div>

    <v-wait v-else for="guilds.fetchGuildData">
      <template slot="waiting">
        <v-layout justify-center>
          <v-flex xs8>
            <FlipLogo use-as-load /><br />
            <LoaderText />
          </v-flex>
        </v-layout>
      </template>

      <div v-if="!selectedGuild.snowflake">
        <h1> This guild doesn't exist </h1>
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
                <h2 class="display-2">{{ selectedGuild.name }}</h2>
              </v-card-title>
              <v-card-text>
                {{ selectedGuild }}<br />
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
                    <AdminRoleViewer
                      v-for="role in this.roles"
                      :key="role.snowflake"
                      :role="role"
                    />
                  </v-card-text>
                </v-tab-item>

                <v-tab-item>
                  <v-card-text>
                    <AdminCategoryViewer
                      v-for="category in this.categories"
                      :key="category.id"
                      :category="category"
                    />

                    <AdminCategoryCreator />
                  </v-card-text>
                </v-tab-item>

              </v-tabs>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </v-wait>
  </div>
</template>

<script>
import DiscordLogin from '@/components/Home/DiscordLogin'
import FlipLogo from '@/components/Home/AnimLogo'
import { mapGetters, mapState, mapActions } from 'vuex'
import AdminRoleViewer from '@/components/Admin/AdminRoleViewer'
import LoaderText from '@/components/Home/LoaderText'
import AdminCategoryCreator from '@/components/Admin/AdminCategoryCreator'
import AdminCategoryViewer from '@/components/Admin/AdminCategoryViewer'

export default {
  name: 'AdminFlow',
  components: {
    DiscordLogin,
    FlipLogo,
    AdminRoleViewer,
    LoaderText,
    AdminCategoryCreator,
    AdminCategoryViewer
  },
  watch: {
    '$route.params.snowflake': {
      handler (snowflake) {
        this.fetchGuildData(snowflake)
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters('users', ['isLoggedIn']),
    ...mapGetters('guilds', ['isGuildAdmin']),
    ...mapState('users', {
      loggedInUser: state => state.me
    }),
    ...mapState('guilds', {
      selectedGuild: state => state.selected.guild,
      roles: state => state.selected.roles,
      categories: state => state.selected.categories
    })
  },
  methods: {
    ...mapActions('guilds', ['fetchGuildData'])
  }
}
</script>
