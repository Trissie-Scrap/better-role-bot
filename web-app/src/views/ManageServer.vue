<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'ManageServerView',
  data () {
    return {
      adminName: 'Alph',
      adminId: '532977942519742506',
      avatarHash: 'f470aae5fe71092b2c358a7eef518166',
      server: {
        allRoles: [{ name: 'role1', colour: '#000000', id: 0 },
          { name: 'role2', colour: '#ffffff', id: 1 },
          { name: 'role3', colour: '#777777', id: 2 },
          { name: 'role4', colour: '#ff0000', id: 3 },
          { name: 'role5', colour: '#00ff00', id: 4 },
          { name: 'role6', colour: '#0000ff', id: 5 },
          { name: 'role7', colour: '#f0f0f0', id: 6 },
          { name: 'role8', colour: '#0f0f0f', id: 7 }]
      },
      categories: [
        {
          name: 'category1',
          exclusive: false,
          members: [1, 3, 5, 7]
        }
      ]
    }
  }
}
</script>
