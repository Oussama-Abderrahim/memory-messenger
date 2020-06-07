<template>
  <perfect-scrollbar v-if="itemsCount" @ps-y-reach-end="showMoreItems">
    <v-container fluid>
      <slot v-bind:items="shownItems"></slot>
    </v-container>
  </perfect-scrollbar>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    shownItems: [],
    itemsCount: 0
  }),
  watch: {
    items() {
      if (
        !(this.items && this.shownItems && this.shownItems[0] == this.items[0])
      ) {
        this.itemsCount = 0;
        // this.backTop();
        this.$nextTick(() => {
          this.showMoreItems();
        });
      }
    }
  },
  mounted() {
    if (!this.shownItems.length) {
      console.log("mounted");
      this.showMoreItems();
    }
  },
  methods: {
    showMoreItems() {
      if (this.itemsCount >= this.items.length) return;
      this.shownItems = this.items.slice(0, this.itemsCount + 10);
      this.itemsCount = this.shownItems.length;
    }
  }
};
</script>

<style scoped>
/* .ps {
  height: 400px;
} */
</style>