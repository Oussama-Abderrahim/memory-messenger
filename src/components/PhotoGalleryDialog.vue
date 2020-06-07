<template>
  <v-dialog v-model="showDialog" width="600">
    <v-card class="photo-gallery">
      <infinite-scroll-container :items="images">
        <template v-slot="{items}">
          <v-row>
            <v-col v-for="(image, i) in items" :key="i" class="d-flex child-flex" cols="4">
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
          </v-row>
        </template>
      </infinite-scroll-container>
    </v-card>
  </v-dialog>
</template>

<script>
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
export default {
  components: {
    InfiniteScrollContainer
  },
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
    showDialog: false
  }),
  watch: {
    value() {
      this.showDialog = this.value;
      // if (!this.shownImages.length) {
      //   this.shownImages = this.images.slice(0, 12);
      //   this.imageCount = this.shownImages.length;
      // }
    },
    showDialog() {
      this.$emit("input", this.showDialog);
    }
  },
  methods: {
    backTop() {
      if (this.showDialog) this.$refs.scrollbar.$el.scrollTop = 0;
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