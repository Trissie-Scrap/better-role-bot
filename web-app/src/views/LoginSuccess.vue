<template>
  <div>
    <p>You logged in succesfully... redirecting.</p>
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
