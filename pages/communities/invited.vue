<template>
  <div>
    <CommunityList
      title="招待されているコミュニティ"
      message="招待されておりません。"
      :communities="invitedCommunities"
      :other-communities="true"
    />
  </div>
</template>

<script>
export default {
  computed: {
    invitedCommunities() {
      const copyInvitedCommunities = [...this.$store.state.community.invitation];
      return copyInvitedCommunities.sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    },
  }
}
</script>