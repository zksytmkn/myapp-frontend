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
      const currentProduct = this.$store.state.product.current
      if (
        currentProduct &&
        currentRouteName.match(/product/) &&
        !this.$vuetify.breakpoint.xs
      ) {
        items.unshift({ text: currentProduct.name })
      }
      return items
    }
  }
}
</script>