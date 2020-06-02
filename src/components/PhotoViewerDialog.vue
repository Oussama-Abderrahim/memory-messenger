<template>
  <v-dialog v-model="showDialog" width="600">
    <v-carousel
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
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    imageIndex: {
      type: Number,
      default: -1
    },
    images: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    showDialog: false,
    src: "",
    index: 0
  }),
  watch: {
    value() {
      this.showDialog = this.value;
    },

    imageIndex() {
      // this.src = this.images[this.imageIndex];
      this.index = this.imageIndex;
    },

    showDialog() {
      this.$emit("input", this.showDialog);
    }
  },
  methods: {
    updateIndex(arg) {
      console.log("update", arg);
    }
  }
};
</script>

<style lang='scss' scoped>
.image {
  height: 100%;
}
.photo-viewer {
}
</style>