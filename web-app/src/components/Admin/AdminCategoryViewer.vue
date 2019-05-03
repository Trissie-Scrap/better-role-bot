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
            <v-form ref="form">
              <v-layout
                wrap
                row
              >
                <!-- Text box - Name -->
                <v-flex
                  xs8
                  sm6
                  md5
                >
                  <v-text-field
                    v-model="localCategory.name"
                    :rules="rules.name"
                    :counter="rules.maxNameLength"
                    label="Category name"
                    required
                    class="pa-3"
                  />
                </v-flex>
              </v-layout>
                <!-- Textarea - Description -->

              <v-layout
                wrap
                row
              >
                <v-flex
                  xs12
                >
                  <v-textarea
                    v-model="localCategory.description"
                    :rules="rules.description"
                    :counter="rules.maxDescriptionLength"
                    label="Category description"
                  />
                </v-flex>
              </v-layout>

                <!-- Box of labels - Contained roles -->
              <v-layout
                wrap
                row
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
            </v-form>

          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="info"
            >
              <v-icon left>mdi-content-save-settings</v-icon>
            </v-btn>

            <v-btn
              color="error"
              @click="doDeleteCategory"
              :loading="$wait.is(`guilds.deleteCategory.${category.id}`)"
            >
                <v-icon left>mdi-close</v-icon>Delete
            </v-btn>
          </v-card-actions>

        </v-card>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getColourString } from '@/utils.js'

const MAX_NAME_LENGTH = 255
const MAX_DESCRIPTION_LENGTH = 511

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
      },
      rules: {
        name: [
          n => !!n || 'We need you to name this. Sorry.',
          n => n.length <= MAX_NAME_LENGTH || 'No one needs that long a category name. Not even you.'
        ],
        description: [
          d => d.length <= MAX_DESCRIPTION_LENGTH || 'Long descriptions are good, but are they really going to read all that?'
        ],
        maxNameLength: MAX_NAME_LENGTH,
        maxDescriptionLength: MAX_DESCRIPTION_LENGTH
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
      this.deleteCategory(this.category.id)
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
