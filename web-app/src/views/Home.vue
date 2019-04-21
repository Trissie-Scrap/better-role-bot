<template>
  <div>
    <v-layout
      justify-center
    >
      <v-flex
        xs4
      >
        <v-img :src="require('../assets/BetterRoleBot_Icon.svg')" />
      </v-flex>
    </v-layout>

    <v-layout
      justify-center
      flex-child
      wrap
    >
      <v-flex
        text-xs-center
        xs10
      >
        <h2>Please log in with <i>Discord <v-icon>mdi-discord</v-icon></i> to continue</h2>
      </v-flex>
    </v-layout>
    </div>
</template>

<script>

export default {
  components: { }
}
</script>
