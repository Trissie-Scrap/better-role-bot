<template>
  <v-card class="py-2"
    flat
  >
    <v-expansion-panel>
      <v-expansion-panel-content>

        <template v-slot:header>
          <div>
            <v-icon v-if="role.color === 0" left>mdi-hexagon-outline</v-icon>
            <v-icon v-else :color="getColourString(role.color)" left>mdi-hexagon-slice-6</v-icon>
            {{ role.name }}
          </div>
        </template>

        <v-card>

          <!--
            Delete category
            Rename category
            Exclusive?
          -->

        </v-card>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { getColourString } from '@/utils.js'

export default {
  name: 'AdminCategoryViewer',
  props: {
    id: Number
  },
  data () {
    return {
      localCategory: {
        categoryId: 0
      }
    }
  },
  computed: {
    ...mapState('guilds', {
      guildCategories: state => state.selected.categories,
      roles: state => state.selected.roles
    })
  },
  methods: {
    getColourString
  }
}
/* assignable, categoryId, color, createdAt, description, guildSnowflake, name, permissions, snowflake, updatedAt */
</script>
