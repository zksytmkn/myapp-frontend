<template>
  <div>
    <UserList
      :title="CurrentUser.id === $auth.user.id ? 'あなたのフォロー' : $auth.user.name + 'さんのフォロー'"
      message="フォローしておりません。"
      :users="followingUsers"
    />
  </div>
</template>

<script>
export default {
  middleware: ['get-user-current', 'get-user-relationship'],
  computed: {
    CurrentUser() {
      return this.$store.state.user.current
    },
    followingUsers() {
      return this.$store.state.user.relationship.following;
    },
  }
}
</script>
