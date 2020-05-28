<template>
  <v-dialog v-model="value" width="500">
    <v-card class="photo-gallery">
      <perfect-scrollbar @ps-y-reach-end="1">
        <v-container fluid>
          <v-row>
            <v-col v-for="(image, i) in images" :key="i" class="d-flex child-flex" cols="4">
              <v-card flat tile class="d-flex">
                <v-img :src="image" aspect-ratio="1" class="grey lighten-2 image">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </perfect-scrollbar>
    </v-card>
  </v-dialog>
</template>

<script>
import PerfectScrollbar from "@/components/PhotoGalleryDialog";
export default {
  components: {
    PerfectScrollbar
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    images: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({}),
  watch: {
    value() {
      this.$emit("input", this.value);
    }
  }
};
</script>

<style lang='scss' scoped>
.photo-gallery {
  .ps {
    height: 400px;
  }
}
</style>