<template>
  <v-flex>
    <div v-if="this">
    <v-card v-for="role in this.roles" :key="role.snowflake" @click="$emit('chip-clicked', guild.snowflake, category.snowflake, role.snowflake)">
      <v-card-text text-xs-center>
        <v-icon :color="getColourString(role.colour)" v-if="role.has" left>mdi-hexagon-slice-{{sliceNumber}}</v-icon>
        <v-icon :color="getColourString(role.colour)" v-if="!role.has" left>mdi-hexagon-outline</v-icon>

        {{role.snowflake}} - {{role.name}} - {{ role.colour }} ({{getColourString(role.colour)}})
      </v-card-text>
    </v-card>
    </div>
  </v-flex>
</template>

<script>
export default {
  name: 'UserCategoryView',
  props: { 'guild': Object, 'category': Object },
  data () {
    return {
      roles: [],
      sliceNumber: 6
    }
  },
  created () {
    setInterval(() => {
      this.sliceNumber += 1
      if (this.sliceNumber === 7) { this.sliceNumber = 1 }
    }, 500)

    this.updateRoles()
  },
  methods: {
    updateRoles () {
      if (this.guild === undefined) {
        this.roles = []
      } else {
        this.roles = this.guild.allRoles.filter(role => this.category.members.includes(role.snowflake))
      }
    },
    getColourString: (colourAsNumber) => {
      let colourAsString = colourAsNumber.toString(16)
      while (colourAsString.length < 6) {
        colourAsString = '0' + colourAsString
      }
      /* console.log('number: ' + colourAsNumber)
      console.log('  Result: ' + colourAsString)
      console.log() */
      return '#' + colourAsString
    }
  }
}
</script>
