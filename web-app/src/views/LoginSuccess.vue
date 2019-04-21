<template>
  <div>
    <v-layout
      flex-child
      wrap
    >
      <v-flex>
        <p>You logged in succesfully... redirecting.</p>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginSuccess',
  methods: {
    ...mapActions('users', ['fetchMe'])
  },
  mounted () {
    this.fetchMe().then(() => {
      this.$router.push({ path: this.$route.query.return })
    })
  }
}
</script>
