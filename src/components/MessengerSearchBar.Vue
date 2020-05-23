<template>
  <v-text-field
    outlined
    dense
    full-width
    filled
    single-line
    label="Search Here"
    hide-details
    prepend-inner-icon="search"
    v-model="query"
    @keyup.enter="search"
  ></v-text-field>
</template>

<script>
import store from "@/store/conversationsStore";
import Vuex from "vuex";

export default {
  store,
  data() {
    return {
      query: ""
    };
  },
  computed: {
    ...Vuex.mapGetters({
      conversation: "currentConversation"
    })
  },
  methods: {
    search() {
      let foundIndexes = [];
      this.conversation.messages.forEach((message, i) => {
        if (
          message.content &&
          message.content.toLowerCase().includes(this.query.toLowerCase())
        ) {
          /* store only the index of the message */
          foundIndexes.push(i);
        }
      });
      this.$emit("search", foundIndexes);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
}
</style>
