<template>
  <div
    id="posts"
  >
    <logged-in-app-eye-catch>
      <template
        v-slot
      >
        Many farmers post about agriculture here !
        Please look around and enjoy it !
      </template>
    </logged-in-app-eye-catch>
    
    <v-container>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
          :sm="container.sm"
          :md="container.md"
        >
          <v-card-title
            class="font-weight-bold"
          >
            最近の呟き
          </v-card-title>

          <v-divider
            class="mb-4"
          />

          <v-row
            align="center"
          >
            <v-col
              cols="12"
              :sm="card.sm"
              :md="card.md"
            >
              <v-btn
                block
                :height="card.height"
                :elevation="card.elevation"
              >
                <div>
                  <v-icon
                    size="24"
                    class="my-2"
                  >
                    mdi-plus
                  </v-icon>
                  <div
                    class="caption"
                  >
                    呟きを追加する
                  </div>
                </div>
              </v-btn>
            </v-col>

            <v-col
              v-for="(post, i) in recentposts.slice(0, 5)"
              :key="`card-post-${i}`"
              cols="12"
              :sm="card.sm"
              :md="card.md"
            >
              <v-card
                block
                :height="card.height"
                :elevation="card.elevation"
                :to="$my.postLinkTo(post.id)"
                class="v-btn text-capitalize"
              >
                <v-card-title
                  class="pb-1 d-block text-truncate"
                >
                  {{ post.name }}
                </v-card-title>
                <v-card-text
                  class="caption"
                >
                  <v-icon
                    size="14"
                  >
                    mdi-update
                  </v-icon>
                  {{ $my.dataFormat(post.updatedAt) }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row
        justify="center"
      >
        <v-col
          cols="12"
          :sm="container.sm"
          :md="container.md"
        >
          <v-card-title
            class="font-weight-bold"
          >
            全ての呟き
          </v-card-title>

          <v-divider
            class="mb-4"
          />

          <v-data-table
            :headers="tableHeaders"
            :items="recentposts"
            item-key="id"
            hide-default-footer
          >
            <template
              v-slot:[`item.name`]="{ item }"
            >
              <nuxt-link
                :to="$my.postLinkTo(item.id)"
                class="text-decoration-none"
              >
                {{ item.name }}
              </nuxt-link>
            </template>
            <template
              v-slot:[`item.updatedAt`]="{ item }"
            >
              {{ $my.dataFormat(item.updatedAt) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      class="my-6"
      v-model="page"
      :length="4"
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
      page: '1',
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
      tableHeaders: [
        {
          text: '表題',
          value: 'name'
        },
        {
          text: '更新日',
          width: 150,
          value: 'updatedAt'
        }
      ]
    }
  },
  computed: {
    recentposts () {
      const copyposts = Array.from(this.$store.state.post.list)
      return copyposts.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) { return -1 }
        if (a.updatedAt < b.updatedAt) { return 1 }
        return 0
      })
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