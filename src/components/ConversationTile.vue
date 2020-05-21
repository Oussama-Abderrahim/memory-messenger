<template>
  <v-card class="item" :class="{active: active}" @click="onClick">
    <v-list-item link>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{item.title}}</v-list-item-title>
        <v-list-item-subtitle>
          {{item.preview}}
          <span class="caption">{{item.time}}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
.item {
  background-color: var(--v-secondary-darken2);
  /* margin-top: 5px; */
  margin-bottom: 10px;
  text-overflow: ellipsis;
}

.item.active {
  background-color: var(--v-primary-base);
}
</style>