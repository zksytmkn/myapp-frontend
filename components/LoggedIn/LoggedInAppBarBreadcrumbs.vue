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
          :style="{ maxWidth: '130px' }"
        >
          {{ item.text }}
        </div>
      </v-breadcrumbs-item>
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

      if (
        currentRouteName.match(/products/) ||
        currentRouteName.match(/product/) &&
        !this.$vuetify.breakpoint.xs
      ) {
        items.unshift({ text: "農産物" })
      }

      if (
        currentRouteName.match(/posts/) ||
        currentRouteName.match(/post/) &&
        !this.$vuetify.breakpoint.xs
      ) {
        items.unshift({ text: "農家の呟き" })
      }

      if (
        currentRouteName.match(/communities/) ||
        currentRouteName.match(/community/) &&
        !this.$vuetify.breakpoint.xs
      ) {
        items.unshift({ text: "コミュニティ" })
      }

      if (
        currentRouteName.match(/settings/) &&
        !currentRouteName.match(/information/) &&
        !this.$vuetify.breakpoint.xs
      ) {
        items.unshift({ text: "設定" })
      }
      return items
    }
  }
}
</script>