<template>
  <div
    id="posts"
  >
    <logged-in-app-post-eye-catch>
      <template
        v-slot
      >
        Many farmers post about agriculture here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-post-eye-catch>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          おすすめ
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
      <v-container
        v-show="!recommendPosts.length"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <p>
              いいねしてみましょう。
              <br/>
              ＊おすすめはいいねに基づいております。
            </p>
            <v-btn
              class="font-weight-bold"
              color="orange"
              outlined
              dark
              to="/posts/list"
            >
              呟きを見てみる
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
      </v-container>
    </v-container>
    <v-pagination
      class="my-6"
      v-model="page"
      v-show="recommendPosts.length"
      :length="Math.ceil(this.recommendPosts.length/this.pageSize)"
      circle
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  middleware: ['get-post-list'],
  data () {
    return {
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    recommendPosts () {
      const copyRecommendPosts = Array.from(this.$store.state.post.list.filter((x) => x.recommend === true))
      return copyRecommendPosts.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      }).slice(this.pageSize*(this.page-1),this.pageSize*(this.page))
    }
  }
}
</script>

<style lang="scss">
#posts {
  .v-parallax__content {
    padding: 0;
  }
}
</style>