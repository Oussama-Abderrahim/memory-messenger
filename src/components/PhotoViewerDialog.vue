<template>
  <v-dialog v-model="showDialog" width="600">
    <v-card class="photo-viewer">
      <v-container fluid>
        <v-card flat tile class="d-flex">
          <v-img :src="src" contain aspect-ratio="1" class="image">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <!-- <v-carousel
        v-model="index"
        @change="updateIndex"
        class="photo-viewer"
        hide-delimiters
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(image, i) in images" :key="i">
          <v-sheet height="100%">
            <v-img :src="image.src" continuous contain aspect-ratio="1" class="image">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-container class="carousel-preview">
        <v-row justify="space-around" class="fill-height">
          <v-col cols="2" v-for="(img, i) in previewImages" :key="i" class="fill-height">
            <v-img :src="img.src" class="image" alt="test" />
          </v-col>
        </v-row>
          </v-container>-->
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    image: {
      type: String,
      default: () => ""
    }
  },
  data: () => ({
    showDialog: false,
    src: ""
  }),
  watch: {
    value() {
      this.showDialog = this.value;
    },

    image() {
      this.src = this.image;
    },

    showDialog() {
      this.$emit("input", this.showDialog);
    }
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
.image {
  height: 100%;
}

.photo-viewer {
  height: 70%;
}
</style>