<template>
  <v-breadcrumbs
    :items="items"
    class="d-block text-truncate"
  >
    <template
      v-slot:item="{ item }"
    >
      <v-breadcrumbs-item>
        <div
          class="text-truncate"
          :style="{ maxWidth: '120px' }"
        >
          {{ item.text }}
        </div>
      </v-breadcrumbs-item>
    </template>
    <template
      v-slot:divider
    >
      <v-icon>
        mdi-chevron-right
      </v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  computed: {
    items () {
      const currentRouteName = this.$route.name
      const items = [
        { text: this.$my.pageTitle(currentRouteName) }
      ]
      const currentProject = this.$store.state.project.current
      if (
        currentProject &&
        currentRouteName.match(/project/) &&
        !this.$vuetify.breakpoint.xs
      ) {
        items.unshift({ text: currentProject.name })
      }
      return items
    }
  }
}
</script>