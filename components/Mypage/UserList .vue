<template>
  <v-container class="my-12">
    <v-row>
      <mypage-menu />
      <v-col md="8" xs="12">
        <v-card flat rounded="lg">
          <v-list>
            <v-list-item>
              <v-list-item-title>
                {{ title }}
              </v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item v-show="!users.length">
              <v-list-item-title>{{ message }}</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-for="(user, i) in users"
              :key="`user-${i}`"
              :to="$my.userLinkToProfile(user.id)"
            >
              <v-list-item-avatar left>
                <v-img :src="user.image_url ? user.image_url : noImg"></v-img>
              </v-list-item-avatar>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import noImg from '~/assets/images/logged-in/no.png'

export default {
  layout: 'logged-in',
  props: {
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      noImg
    };
  },
};
</script>
