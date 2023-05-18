<template>
  <div>
    <UserList
      title="$auth.user.id === $auth.user.id ? 'あなたのフォロー' : $auth.user.name + 'さんのフォロー'"
      message="フォローしておりません。"
      :users="followingUsers"
    />
  </div>
</template>

<script>
export default {
  computed: {
    followingUsers() {
      return this.$store.state.user.relationship.following;
    }
  }
}
</script>
