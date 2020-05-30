<template>
  <v-dialog v-model="showDialog" width="600">
    <v-card class="photo-gallery">
      <perfect-scrollbar ref="scrollbar" v-if="imageCount" @ps-y-reach-end="showMoreImages">
        <v-container fluid>
          <v-row>
            <v-col v-for="(image, i) in shownImages" :key="i" class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex" @click.stop="onImageClick(image.index)">
                <v-img :src="image.src" aspect-ratio="1" class="grey lighten-2 image">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
            <!-- <div v-if="shownImages.length" v-observe-visibility="onScrollBottom"></div> -->
          </v-row>
        </v-container>
      </perfect-scrollbar>
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
    images: {
      type: Array,
      default: () => ({ index: 0, src: "" })
    }
  },
  data: () => ({
    showDialog: false,
    shownImages: [],
    imageCount: 0
  }),
  watch: {
    value() {
      this.showDialog = this.value;
      if (!this.shownImages.length) {
        this.shownImages = this.images.slice(0, 12);
        this.imageCount = this.shownImages.length;
      }
    },
    images() {
      if (
        !(
          this.images &&
          this.shownImages &&
          this.shownImages[0] == this.images[0]
        )
      ) {
        this.imageCount = 0;
        // this.backTop();
        this.$nextTick(() => {
          this.showMoreImages();
        });
      }
    },
    showDialog() {
      this.$emit("input", this.showDialog);
    }
  },
  methods: {
    backTop() {
      if (this.showDialog) this.$refs.scrollbar.$el.scrollTop = 0;
    },
    onScrollBottom(visible) {
      if (visible) this.showMoreImages();
    },
    showMoreImages() {
      if (this.imageCount >= this.images.length) return;
      this.shownImages = this.images.slice(0, this.imageCount + 6);
      this.imageCount = this.shownImages.length;
    },
    onImageClick(i) {
      this.$emit("imageClick", i);
    }
  }
};
</script>

<style lang='scss' scoped>
.image:hover {
  border: 2px solid grey;
}
.photo-gallery {
  .ps {
    height: 400px;
  }
}
</style>