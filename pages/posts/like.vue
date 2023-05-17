<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          いいね（{{ likePosts.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-list
        v-show="!likePosts.length"
        color="transparent"
      >
        <v-list-item>
          <v-list-item-title>
            いいねしておりません。
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-btn
              class="font-weight-bold"
              color="orange"
              outlined
              dark
              to="/posts/list"
            >
              つぶやきを見る
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>
    <PostTable
      :posts="likePosts"
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
