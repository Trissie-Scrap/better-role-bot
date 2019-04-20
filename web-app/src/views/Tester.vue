<template>
  <div>
    <v-layout
      flex-child
      wrap
    >

      <v-flex
        xs3
      >
        <v-sheet
          class="d-flex"
          color="primary"
          height="160"
        ><sheet-footer>Primary</sheet-footer></v-sheet>
      </v-flex>

      <v-flex
        xs3
      >
        <v-sheet
          class="d-flex"
          color="secondary"
          height="160"
        ><sheet-footer>Secondary</sheet-footer></v-sheet>
      </v-flex>

      <v-flex
        xs3
      >
        <v-sheet
          class="d-flex"
          color="accent"
          height="160"
        ><sheet-footer>Accent</sheet-footer></v-sheet>
      </v-flex>

      <v-flex
        xs3
      >
        <v-sheet
          class="d-flex"
          color="error"
          height="160"
        ><sheet-footer>Error</sheet-footer></v-sheet>
      </v-flex>

    </v-layout>

    <v-layout
      flex-child
      wrap
    >

      <v-flex
        xs4
      >
        <v-sheet
          class="d-flex"
          color="warning"
          height="160"
        ><sheet-footer>Warning</sheet-footer></v-sheet>
      </v-flex>

      <v-flex
        xs4
      >
        <v-sheet
          class="d-flex"
          color="info"
          height="160"
        ><sheet-footer>Info</sheet-footer></v-sheet>
      </v-flex>

      <v-flex
        xs4
      >
        <v-sheet
          class="d-flex"
          color="success"
          height="160"
        ><sheet-footer>Success</sheet-footer></v-sheet>
      </v-flex>

    </v-layout>

    <v-layout>
      <DiscordLogin />
    </v-layout>
  </div>
</template>

<script>
import DiscordLogin from '../components/login'
export default {
  name: 'Tester',
  components: {
    DiscordLogin
  }
}
</script>
