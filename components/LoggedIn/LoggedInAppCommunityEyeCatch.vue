<template>
  <v-parallax
    height="300"
  >
    <v-img
      dark
      src="https://picsum.photos/id/222/1920/1080?blur=1"
      :aspect-ratio="16/9"
    >
      <v-container
        fill-height
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col
            cols="12"
          >
            <v-list
              color="transparent"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-h5 font-weight-bold"
                    style="white-space:pre-line; text-shadow:1px 1px 1px black;"
                  >
                    Agriculture, SDGs ... and so on.
                    many communities and people are here.
                    So, please take part in. ☺︎☺︎☺︎
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
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
