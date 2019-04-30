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
          <v-card-text>

            <v-alert :value="!role.assignable" type="warning">
              Not Assignable: BRB cannot assign this role to users as it is not high enough in the role order<br />
              You can still add this role to a category but users will not be able to add it to themselves
            </v-alert>

          </v-card-text>

          <v-card-actions>
            <v-layout wrap align-center justify-space-between>
              <v-flex xs4>
                Role Category
                <v-select :items="categories" item-value="id" item-text="name" v-model="localRole.categoryId"/>
              </v-flex>
              <v-flex xs3>
                <v-btn block color="accent"><v-icon left>mdi-content-save-settings</v-icon> Save</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { getColourString } from '../utils.js'

export default {
  name: 'AdminRoleViewer',
  props: {
    snowflake: String
  },
  data () {
    return {
      localRole: {
        categoryId: ''
      }
    }
  },
  computed: {
    ...mapState('guilds', {
      guildCategories: state => state.selected.categories,
      roles: state => state.selected.roles
    }),
    role () {
      return this.roles.find((role) => role.snowflake === this.snowflake)
    },
    categories () {
      return [
        {
          id: '',
          name: 'None Assigned'
        },
        ...this.guildCategories
      ]
    }
  },
  methods: {
    getColourString
  }
}
/* assignable, categoryId, color, createdAt, description, guildSnowflake, name, permissions, snowflake, updatedAt */
</script>
