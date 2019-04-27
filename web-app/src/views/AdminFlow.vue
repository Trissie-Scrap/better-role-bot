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
      v-if="!isLoggedIn"
    >
      <DiscordLogin />
    </v-layout>

    <v-layout
      justify-center
      row
      v-else
    >
      {{ this.selectedGuild }}
      {{ this.selectedRoles }}
      {{ this.selectedCategories }}
      {{ this.heldRoles }}
    </v-layout>

  </div>
</template>

<script>
import DiscordLogin from '../components/DiscordLogin'
import FlipLogo from '../components/AnimLogo'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'AdminFlow',
  components: {
    DiscordLogin,
    FlipLogo
  },
  created () {
    this.$watch(this.$route.params.snowflake, () => {
      this.fetchGuildData(this.$route.params.snowflake)
    }, { immediate: true })
  },
  computed: {
    ...mapGetters('users', ['isLoggedIn']),
    ...mapState('users', {
      loggedInUser: state => state.me
    }),
    ...mapState('guilds', {
      selectedGuild: state => state.selected.guild,
      selectedRoles: state => state.selected.roles,
      selectedCategories: state => state.selected.categories,
      heldRoles: state => state.selected.heldRoles
    })
  },
  methods: {
    ...mapActions('guilds', ['fetchGuildData'])
  }
}
</script>
