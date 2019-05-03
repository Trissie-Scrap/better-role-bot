<template>
  <v-card class="pa-3" color="primary darken-1">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Create New Category</h3>
      </div>
    </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-layout wrap row>
          <v-flex grow>
            <v-text-field
              v-model="currentCat.name"
              :rules="rules.name"
              :counter="rules.maxNameLength"
              label="Category name"
              required
            />
          </v-flex>

          <v-flex xs2>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-switch
                  v-on="on"
                  v-model="currentCat.exclusive"
                  label="Exclusive"
                />
              </template>
              <span>Make only one role selectable at a time</span>
            </v-tooltip>
          </v-flex>

        </v-layout>
        <v-layout>

          <v-flex xs12>
            <v-textarea
              v-model="currentCat.description"
              :rules="rules.description"
              :counter="rules.maxDescriptionLength"
              label="Category description"
            />
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
        dark
        @click="submit"
        color="#2f4f4f"
        :loading="$wait.is('guilds.createCategory')"
      >
        <v-icon left>mdi-plus</v-icon> add category
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

const MAX_NAME_LENGTH = 255
const MAX_DESCRIPTION_LENGTH = 511
const EMPTY_CAT = { // this cat empty
  name: '',
  description: '',
  exclusive: false// YEEET
}

export default {
  name: 'AdminCategoryCreator',
  data () {
    return {
      currentCat: { ...EMPTY_CAT }, // meow
      valid: false,
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
  methods: {
    ...mapActions('guilds', ['createCategory']),
    submit: function () {
      this.createCategory(this.currentCat)
      this.currentCat = { ...EMPTY_CAT }
      this.$refs.form.reset()
    }
  }
}
</script>

<style>

</style>
