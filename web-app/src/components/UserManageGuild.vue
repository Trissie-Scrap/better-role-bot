<template>
  <v-flex>
    <div v-for="category in guild.categories" :key="category.snowflake">
      <CategoryView :guild="guild" :category="category" @chip-clicked="onChipClick" />
    </div>
  </v-flex>
</template>

<script>
import CategoryView from './UserCategoryView.vue'

export default {
  name: 'UserManageGuild',
  components: {
    CategoryView
  },
  data () {
    return {
      adminName: 'Alph',
      adminsnowflake: '532977942519742506',
      avatarHash: 'f470aae5fe71092b2c358a7eef518166',
      guild: {
        allRoles: [{ name: 'role0', colour: 0, snowflake: 0, has: true, description: '' },
          { name: 'role1', colour: 16777215, snowflake: 1, has: true, description: '' },
          { name: 'role2', colour: 7829367, snowflake: 2, has: false, description: '' },
          { name: 'role3', colour: 16711680, snowflake: 3, has: true, description: '' },
          { name: 'role4', colour: 65280, snowflake: 4, has: true, description: '' },
          { name: 'role5', colour: 255, snowflake: 5, has: false, description: '' },
          { name: 'role6', colour: 15790320, snowflake: 6, has: true, description: '' },
          { name: 'role7', colour: 986895, snowflake: 7, has: true, description: '' }],
        categories: [
          {
            name: 'category0',
            snowflake: 0,
            exclusive: false,
            members: [1, 2, 5, 7]
          }
        ],
        snowflake: 1001010001001
      }
    }
  },
  methods: {
    onChipClick: (guildsnowflake, categorysnowflake, rolesnowflake) => {
      alert(`Guild: ${guildsnowflake}, Category: ${categorysnowflake}, Role: ${rolesnowflake}`)
    }
  }
}
</script>
