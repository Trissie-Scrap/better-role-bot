<template>
  <v-card class="py-2"
    flat
  >
    <v-expansion-panel>
      <v-expansion-panel-content>

        <template v-slot:header>
          <div>
            <!--v-icon v-if="role.color === 0" left>mdi-hexagon-outline</v-icon>
            <v-icon v-else :color="getColourString(role.color)" left>mdi-hexagon-slice-6</v-icon-->
            {{ category.name }}
          </div>
        </template>

        <v-card>

          <!--
            Delete category
            Rename category
            Exclusive?
          -->

          <v-card-text>
            <!-- Text box - Name -->
            <!-- Textarea - Description -->
            <!-- Box of labels - Contained roles -->
            <v-layout
              flex-child
              wrap
            >
              <v-flex
                xs12
                md4
                d-flex
              >
                <v-sheet
                  class="d-flex"
                  color="grey lighten-3"
                >
                  <v-chip>yeet</v-chip>
                </v-sheet>
              </v-flex>
            </v-layout>

          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="error"><v-icon left>mdi-close</v-icon>Delete</v-btn>
          </v-card-actions>

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
    category: Object
  },
  data () {
    return {
      localCategory: {
        description: '',
        name: '',
        exclusive: false
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
  },
  watch: {
    category: {
      handler (newCategory) {
        this.localCategory = { ...newCategory }
      },
      immediate: true,
      deep: true
    }
  }
}
/* assignable, categoryId, color, createdAt, description, guildSnowflake, name, permissions, snowflake, updatedAt */
</script>
