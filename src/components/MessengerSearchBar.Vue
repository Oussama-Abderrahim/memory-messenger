<template>
  <v-text-field
    light
    class="search-bar"
    flat
    label="Solo"
    placeholder="Mot, phrase ou synonyme"
    solo
    append-icon="search"
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
        if (message.content && message.content.search(this.query) !== -1) {
          /* store only the index of the message */
          foundIndexes.push(i);
        }
      });
      this.$emit("input", foundIndexes);
      this.$emit("searched", foundIndexes);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
}
</style>
