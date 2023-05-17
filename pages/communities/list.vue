<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title class="font-weight-bold">
          全てのコミュニティ（{{ communities.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>
    <CommunityList
      :communities="communities"
    />
  </div>
</template>

<script>
export default {
  computed: {
    communities () {
      return [...this.$store.state.community.list].sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    }
  }
}
</script>