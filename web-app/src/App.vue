<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-side-icon>
        <v-img :src="require('./assets/BetterRoleBot_Icon_NoBg.svg')" />
      </v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span class="appName">Better Role Bot</span>
        <span class="font-weight-light">: For all your role-based needs</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/strideynet/better-role-bot"
        target="_blank"
      >
        <span class="mr-2">Check it out</span>
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style scoped>
  .appName {
    font-family: 'Share Tech Mono', monospace;
  }
</style>
