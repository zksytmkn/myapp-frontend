<template>
  <div>
    <UserList
      :title="CurrentUser.id === $auth.user.id ? 'あなたのフォロワー' : $auth.user.name + 'さんのフォロワー'"
      message="フォローされておりません。"
      :users="followedUsers"
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
    followedUsers() {
      return this.$store.state.user.relationship.followers;
    },
  },
};
</script>
