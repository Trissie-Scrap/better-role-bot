<template>
  <v-flex>
    <v-card class="py-2"
      flat
      v-for="role in this.roles"
      :key="role.id"
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
                Not Assignable: BRB cannot assign this role to users as it is not high enough in the role order
              </v-alert>

            </v-card-text>

            <v-card-actions>
              <v-layout wrap align-center justify-space-between>
                <v-flex xs4>
                  <v-select :items="roles" label="oof" />
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
  </v-flex>
</template>

<script>
import { mapState } from 'vuex'
import { getColourString } from '../utils.js'

export default {
  name: 'AdminRoleViewer',
  computed: {
    ...mapState('guilds', {
      roles: state => state.selected.roles,
      selectedCategories: state => state.selected.categories
    })
  },
  methods: {
    getColourString
  }
}
/* assignable, categoryId, color, createdAt, description, guildSnowflake, name, permissions, snowflake, updatedAt */
</script>
