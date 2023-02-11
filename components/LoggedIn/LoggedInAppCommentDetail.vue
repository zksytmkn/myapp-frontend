<template>
  <v-menu
    app
    offset-x
    offset-y
    max-width="200"
  >
    <template
      v-slot:activator="{ on }"
    >
      <v-btn
        icon
        v-on="on"
      >
        <v-icon>
          mdi-dots-horizontal
        </v-icon>
      </v-btn>
    </template>
    <v-list
      dense
    >
      <template
        v-for="(menu, i) in menus"
      >
        <v-divider
          v-if="menu.divider"
          :key="`menu-divider-${i}`"
        />

        <v-list-item
          :key="`menu-list-${i}`"
        >
          <v-list-item-title>
            {{ $my.pageTitle(menu.name) }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        { name: 'comment-edit' },
        { name: 'comment-delete' }
      ]
    }
  }
}
</script>
