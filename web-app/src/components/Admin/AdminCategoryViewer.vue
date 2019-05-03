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
              justify-center
            >
              <v-flex
                md8
                sm10
                xs12
                d-flex
                text-xs-center
              >
                <v-sheet
                  color="grey lighten"
                >
                  <v-chip>yeet</v-chip>
                  <v-chip>yeet</v-chip>
                  <v-chip>yeet</v-chip>
                  <v-chip>yeet</v-chip>
                </v-sheet>
              </v-flex>
            </v-layout>

          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="error" @click="doDeleteCategory"><v-icon left>mdi-close</v-icon>Delete</v-btn>
          </v-card-actions>

        </v-card>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    ...mapActions('guilds', ['deleteCategory']),
    doDeleteCategory () {
      alert(`deleting the category`)
      this.deleteCategory(category.id)
    },
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
