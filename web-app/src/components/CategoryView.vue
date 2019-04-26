<template>
  <v-flex>
    <div v-if="this">
    <v-card v-for="role in this.roles" :key="role.id" @click="$emit('chip-clicked', guild.id, category.id, role.id)">
      <v-card-text text-xs-center>
        <v-icon :color="role.colour" v-if="role.has" left>mdi-hexagon-slice-6</v-icon>
        <v-icon :color="role.colour" v-if="!role.has" left>mdi-hexagon-outline</v-icon>

        {{role.id}} - {{role.name}} - {{ role.colour }}
      </v-card-text>
    </v-card>
    </div>
  </v-flex>
</template>

<script>
export default {
  name: 'CategoryView',
  props: { 'guild': Object, 'category': Object },
  data () {
    return {
      roles: []
    }
  },
  created () {
    if (this.guild === undefined) {
      this.roles = []
    } else {
      this.roles = this.guild.allRoles.filter(role => this.category.members.includes(role.id))
    }
  }
}
</script>
