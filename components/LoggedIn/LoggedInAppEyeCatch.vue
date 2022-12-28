<template>
  <v-parallax
    height="300"
  >
    <v-img
      dark
      src="https://picsum.photos/id/56/1920/1080?blur=1"
      :aspect-ratio="16/9"
      gradient="to top right, rgba(19,84,122,.25), rgba(128,208,199,.25)"
    >
      <v-container
        fill-height
      >
        <v-row>
          <v-col
            cols="12"
          >
            <v-list-item>
              <v-list-item-title
                class="text-h5 font-weight-bold"
                style="white-space: pre-line;"
              >
                <template>
                  <slot></slot>
                </template>
              </v-list-item-title>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-parallax>
</template>

<script>
export default {
}
</script>
