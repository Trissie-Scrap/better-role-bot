<template>
  <v-card class="py-2"
    flat
  >
    <transition name="fade">
      <v-expansion-panel>
        <v-expansion-panel-content>

          <template v-slot:header>
            <div>
              <!--v-icon v-if="role.color === 0" left>mdi-hexagon-outline</v-icon>
              <v-icon v-else :color="getColourString(role.color)" left>mdi-hexagon-slice-6</v-icon-->
                <v-icon small left color="error" v-if="hasChange">mdi-alert-circle</v-icon>
                <v-icon small left color="info" v-else>mdi-checkbox-marked-circle</v-icon>
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

                  <v-flex grow>
                    <v-chip :color="localCategory.exclusive ? 'info' : 'success'">
                      <v-avatar class="success darken-4">
                        <v-icon v-if="localCategory.exclusive">mdi-numeric-1</v-icon>
                        <v-icon v-else>mdi-check-all</v-icon>
                      </v-avatar>
                      {{ localCategory.exclusive ? 'Exclusive' : 'Non-exclusive' }}
                    </v-chip>
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

              <transition name="fade">
                <v-btn
                  v-show="hasChange && formValid"
                  color="info"
                  @click="saveChanges"
                >
                  <v-icon left>mdi-content-save-settings</v-icon>
                  Save
                </v-btn>
              </transition>

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
    </transition>
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
    }),
    hasChange () {
      for (const key in this.localCategory) {
        if (this.localCategory[key] === this.category[key]) {
          continue
        } else {
          return true
        }
      }
      return false
    },
    formValid () {
      return this.$refs.form.validate()
    }
  },
  methods: {
    ...mapActions('guilds', ['deleteCategory', 'updateCategory']),
    doDeleteCategory () {
      alert(`deleting the category`)
      this.deleteCategory(this.category.id)
    },
    getColourString,
    saveChanges () {
      this.updateCategory({
        categoryId: this.category.id,
        updatedFields: this.localCategory
      })
    }
  },
  watch: {
    category: {
      handler (newCategory) {
        this.localCategory = { ...newCategory }
        console.log('handle it')
      },
      immediate: true,
      deep: true
    }
  }
}
/* assignable, categoryId, color, createdAt, description, guildSnowflake, name, permissions, snowflake, updatedAt */
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
