<template>
  <div>
    <PostTable
      title="全てのつぶやき"
      message="つぶやきはありませんでした。"
      :posts="posts"
    />
  </div>
</template>

<script>
export default {
  computed: {
    posts () {
      return [...this.$store.state.post.list].sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
    },
  },
}
</script>
