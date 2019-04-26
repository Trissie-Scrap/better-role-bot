<template>
  <v-flex>
    <div v-for="category in guild.categories" :key="category.id">
      <CategoryView :guild="guild" :category="category" @chip-clicked="onChipClick" />
    </div>
  </v-flex>
</template>

<script>
import CategoryView from './CategoryView.vue'

export default {
  name: 'ManageGuild',
  components: {
    CategoryView
  },
  data () {
    return {
      adminName: 'Alph',
      adminId: '532977942519742506',
      avatarHash: 'f470aae5fe71092b2c358a7eef518166',
      guild: {
        allRoles: [{ name: 'role0', colour: '#000000', id: 0, has: true, description: '' },
          { name: 'role1', colour: '#ffffff', id: 1, has: true, description: '' },
          { name: 'role2', colour: '#777777', id: 2, has: false, description: '' },
          { name: 'role3', colour: '#ff0000', id: 3, has: true, description: '' },
          { name: 'role4', colour: '#00ff00', id: 4, has: true, description: '' },
          { name: 'role5', colour: '#0000ff', id: 5, has: false, description: '' },
          { name: 'role6', colour: '#f0f0f0', id: 6, has: true, description: '' },
          { name: 'role7', colour: '#0f0f0f', id: 7, has: true, description: '' }],
        categories: [
          {
            name: 'category0',
            id: 0,
            exclusive: false,
            members: [1, 2, 5, 7]
          }
        ],
        id: 1001010001001
      }
    }
  },
  methods: {
    onChipClick: (guildId, categoryId, roleId) => {
      alert(`Guild: ${guildId}, Category: ${categoryId}, Role: ${roleId}`)
    }
  }
}
</script>
