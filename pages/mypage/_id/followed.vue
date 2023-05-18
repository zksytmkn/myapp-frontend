<template>
  <div>
    <UserList
      title="$auth.user.id === $auth.user.id ? 'あなたのフォロワー' : $auth.user.name + 'さんのフォロワー'"
      message="フォローされておりません。"
      :users="followedUsers"
    />
  </div>
</template>

<script>
export default {
  computed: {
    followedUsers() {
      return this.$store.state.user.relationship.followed;
    },
  },
};
</script>
