<template>
  <v-dialog v-model="showDialog" width="600">
    <v-card class="photo-viewer">
      <v-container fluid>
        <v-card flat tile class="d-flex">
          <v-img :src="src" aspect-ratio="1" class="grey lighten-2 image">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
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
      default: () => ("")
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
.image:hover {
  border: 2px solid grey;
}
.photo-viewer {
}
</style>