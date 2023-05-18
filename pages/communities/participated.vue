<template>
  <div>
    <CommunityList
      title="参加しているコミュニティ"
      message="参加しておりません。"
      :communities="participatedCommunities"
      :other-communities="true"
    />
  </div>
</template>

<script>
export default {
  computed: {
    participatedCommunities() {
      const copyParticipatedCommunities = [...this.$store.state.community.participation];
      return copyParticipatedCommunities.sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    },
  }
}
</script>