<template>
  <div>
    <PostTable
      title="いいね"
      message="いいねしておりません。"
      :posts="likePosts"
      :other-posts="true"
    />
  </div>
</template>

<script>
export default {
  computed: {
    likePosts() {
      return [...this.$store.state.post.favorite].sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    }
  },
}
</script>
