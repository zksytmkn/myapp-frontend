<template>
  <div>
    <v-container>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold"
        >
          全てのつぶやき（{{ posts.length }}件）
        </v-list-item-title>
      </v-list-item>
      <v-divider/>
    </v-container>
    <PostTable
      :posts="posts"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      container: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 6,
        md: 4,
        height: 110,
        elevation: 4
      },
    }
  },
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
