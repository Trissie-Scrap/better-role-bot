<template>
  <v-app dark>
    <v-toolbar app>
      <router-link to="/">
      <v-toolbar-side-icon>
        <v-img :src="require('@/assets/BetterRoleBot_Icon_NoBg.svg')" />
      </v-toolbar-side-icon>
      </router-link>
      <v-toolbar-title class="headline text-uppercase" :style="cssProps">

        <div class="hidden-sm-and-up"><v-img width="100" :src="require('@/assets/BetterRoleBot_Tag.png')" /></div>

        <span class="appName hidden-xs-only"><span class="firstB">B</span>etter <span class="R">R</span>ole <span class="secondB">B</span>ot</span>

        <span class="font-weight-light hidden-sm-and-down">:For all your role-based needs</span>

      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/strideynet/better-role-bot"
        target="_blank"
      >
        <span class="mr-2 hidden-sm-and-down">Check it out</span>
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container grid-list-md>
        <router-view/>
        <SnackBar :show="!isOnline" color="error">
          <v-flex class="text title" text-xs-center>
            You appear to be lacking an internet connection...<br />
            You're going to need that
          </v-flex>
        </SnackBar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import SnackBar from '@/components/Home/SnackBar.vue'

export default {
  name: 'App',
  components: {
    SnackBar
  },
  created () {
    this.fetchMe()
  },
  data () {
    return {
      isOnline: true
    }
  },
  computed: {
    cssProps () {
      return {
        '--primary-base': this.$vuetify.theme.primary,
        '--secondary-base': this.$vuetify.theme.secondary,
        '--accent-base': this.$vuetify.theme.accent
      }
    }
  },
  methods: {
    ...mapActions('users', ['fetchMe']),
    onOfflineChange (e) { this.isOnline = false },
    onOnlineChange (e) { this.isOnline = true }
  },
  mounted () {
    window.addEventListener('offline', this.onOfflineChange)
    window.addEventListener('online', this.onOnlineChange)
    this.isOnline = window.navigator.onLine
  }
}
</script>

<style scoped>

  .firstB {
    color: var(--accent-base)
  }
  .R {
    color: var(--secondary-base)
  }
  .secondB {
    color: var(--primary-base)
  }

  .appName {
    font-family: 'Share Tech Mono', monospace;
  }
</style>
