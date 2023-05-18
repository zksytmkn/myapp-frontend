<template>
  <div>
    <CommunityList
      title="全てのコミュニティ"
      message="コミュニティはありませんでした。"
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